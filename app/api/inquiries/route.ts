export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Inquiry from "@/lib/models/Inquiry"
import User from "@/lib/models/User"
import { getAuthUser } from "@/lib/auth"
import { InquirySchema } from "@/lib/validations/inquiry.schema"
import { sendInquiryConfirmation } from "@/lib/email"
import { inquiryEmitter } from "@/lib/inquiry-events"
import { hasActiveOtp } from "@/lib/otp-store"


export async function GET(req: NextRequest) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        await connectDB()

        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get("page") || "1")
        const limit = parseInt(searchParams.get("limit") || "20")
        const status = searchParams.get("status")
        const type = searchParams.get("type")
        const state = searchParams.get("state")
        const search = searchParams.get("search")
        const dateFrom = searchParams.get("dateFrom")
        const dateTo = searchParams.get("dateTo")

        // Employees only see inquiries assigned to them
        const filter: Record<string, unknown> = {}
        if (user.role === "employee") {
            const { ObjectId } = await import("mongodb")
            try {
                filter.assignedTo = new ObjectId(user.userId)
            } catch {
                filter.assignedTo = user.userId
            }
        }

        if (status) filter.status = status
        if (type) filter.insuranceType = type
        if (state && user.role !== "employee") filter.state = state

        // Admin/Super Admin can filter by assignedTo employee
        const assignedTo = searchParams.get("assignedTo")
        if (assignedTo && user.role !== "employee") {
            if (assignedTo === "unassigned") {
                filter.assignedTo = null
            } else {
                const { ObjectId } = await import("mongodb")
                try {
                    filter.assignedTo = new ObjectId(assignedTo)
                } catch {
                    filter.assignedTo = assignedTo
                }
            }
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ]
        }

        if (dateFrom || dateTo) {
            filter.createdAt = {}
            if (dateFrom) (filter.createdAt as Record<string, unknown>).$gte = new Date(dateFrom)
            if (dateTo) {
                const end = new Date(dateTo)
                end.setHours(23, 59, 59, 999)
                    ; (filter.createdAt as Record<string, unknown>).$lte = end
            }
        }

        const skip = (page - 1) * limit
        const total = await Inquiry.countDocuments(filter)

        const inquiries = await Inquiry.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("assignedTo", "name email")
            .lean()

        return NextResponse.json({
            inquiries,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        })
    } catch (err) {
        console.error("GET /api/inquiries:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const parsed = InquirySchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0].message },
                { status: 400 }
            )
        }

        await connectDB()

        const { phone } = parsed.data
        const isPhoneVerified = await hasActiveOtp(`verified:phone:${phone}`)

        if (!isPhoneVerified) {
            return NextResponse.json(
                { error: "Mobile number verification required or expired. Please verify your phone." },
                { status: 400 }
            )
        }

        // Automatic distribution logic: Match active employees with the pincode, fallback to state/language, then pick least-loaded
        const User = await import("@/lib/models/User").then(m => m.default)
        const activeEmployees = await User.find({ role: "employee", status: "active" }).lean()
        let assignedEmployeeId: any = undefined

        if (activeEmployees.length > 0) {
            // Match by pincode first
            let candidates = activeEmployees.filter(emp => emp.pincodes && emp.pincodes.includes(parsed.data.pincode))

            // Fallback: match by state AND language
            if (candidates.length === 0) {
                candidates = activeEmployees.filter(emp => {
                    const empStates = emp.states && emp.states.length > 0 ? emp.states : (emp.state ? [emp.state] : [])
                    const empLangs = emp.languages && emp.languages.length > 0 ? emp.languages : (emp.language ? [emp.language] : [])
                    return empStates.includes(parsed.data.state) && empLangs.includes(parsed.data.language)
                })
            }

            // Distribute based on least workload (new and contacted inquiries)
            if (candidates.length > 0) {
                const candidateIds = candidates.map(c => c._id)
                const counts = await Inquiry.aggregate([
                    { $match: { assignedTo: { $in: candidateIds }, status: { $in: ["new", "contacted"] } } },
                    { $group: { _id: "$assignedTo", count: { $sum: 1 } } }
                ])

                const countMap = new Map(counts.map(item => [item._id.toString(), item.count]))

                candidates.sort((a, b) => {
                    const countA = countMap.get(a._id.toString()) || 0
                    const countB = countMap.get(b._id.toString()) || 0
                    return countA - countB
                })

                assignedEmployeeId = candidates[0]._id
            }
        }

        const inquiry = await Inquiry.create({
            ...parsed.data,
            assignedTo: assignedEmployeeId
        })

        // Push real-time update to admin panel via SSE
        inquiryEmitter.emit("new_inquiry", inquiry.toObject())

        // Send confirmation email (non-blocking)
        sendInquiryConfirmation({
            to: inquiry.email,
            name: inquiry.name,
            insuranceType: inquiry.insuranceType,
            preferredSlot: inquiry.preferredSlot,
        }).catch(console.error)

        return NextResponse.json({ success: true, inquiry }, { status: 201 })
    } catch (err) {
        console.error("POST /api/inquiries:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}