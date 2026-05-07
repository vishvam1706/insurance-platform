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

        const inquiry = await Inquiry.findByIdAndUpdate(
            id,
            { $set: parsed.data },
            { new: true }
        ).lean()

        if (!inquiry) {
            return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true, inquiry })
    } catch {
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