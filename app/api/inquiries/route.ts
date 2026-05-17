export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Inquiry from "@/lib/models/Inquiry"
import { getAuthUser } from "@/lib/auth"
import { InquirySchema } from "@/lib/validations/inquiry.schema"
import { sendInquiryConfirmation } from "@/lib/email"
import { inquiryEmitter } from "@/lib/inquiry-events"

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

        // Employees only see their state
        const filter: Record<string, unknown> = {}
        if (user.role === "employee" && user.state) {
            filter.state = user.state
        }

        if (status) filter.status = status
        if (type) filter.insuranceType = type
        if (state && user.role !== "employee") filter.state = state

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
        const inquiry = await Inquiry.create(parsed.data)

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