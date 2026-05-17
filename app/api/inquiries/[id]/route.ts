export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Inquiry from "@/lib/models/Inquiry"
import { getAuthUser } from "@/lib/auth"
import { UpdateInquirySchema } from "@/lib/validations/inquiry.schema"

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        const { id } = await params
        await connectDB()

        const inquiry = await Inquiry.findById(id)
            .populate("assignedTo", "name email")
            .lean()

        if (!inquiry) {
            return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
        }

        // Employee can only view their state's inquiries
        if (user.role === "employee" && (inquiry as any).state !== user.state) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        return NextResponse.json({ inquiry })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        const { id } = await params
        const body = await req.json()
        const parsed = UpdateInquirySchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0].message },
                { status: 400 }
            )
        }

        await connectDB()

        // Use NATIVE MongoDB collection to bypass Mongoose's cached model
        const { ObjectId } = await import("mongodb")
        const collection = Inquiry.collection
        const oid = new ObjectId(id)

        // Fetch current to compare status
        const current = await collection.findOne({ _id: oid })
        if (!current) {
            return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
        }

        const oldStatus = current.status
        const newStatus = parsed.data.status
        const statusChanged = newStatus && newStatus !== oldStatus

        console.log("🔍 PATCH DEBUG:", { id, oldStatus, newStatus, statusChanged, user: user.name })

        // Build raw MongoDB update
        const $set: Record<string, any> = { updatedAt: new Date() }
        if (newStatus) $set.status = newStatus
        if (parsed.data.notes !== undefined) $set.notes = parsed.data.notes
        if (parsed.data.assignedTo) $set.assignedTo = parsed.data.assignedTo

        const update: Record<string, any> = { $set }

        if (statusChanged) {
            update.$push = {
                statusHistory: {
                    status: newStatus,
                    changedBy: user.name || user.email || "Unknown",
                    changedAt: new Date(),
                    note: parsed.data.notes || "",
                }
            }
            console.log("✅ Will push history entry")
        }

        await collection.updateOne({ _id: oid }, update)

        // Fetch updated document directly from MongoDB
        const inquiry = await collection.findOne({ _id: oid })
        console.log("📤 RESPONSE statusHistory:", JSON.stringify(inquiry?.statusHistory))

        return NextResponse.json({ success: true, inquiry })
    } catch (err) {
        console.error("PATCH /api/inquiries/[id]:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}


export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        if (user.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const { id } = await params
        await connectDB()

        await Inquiry.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}