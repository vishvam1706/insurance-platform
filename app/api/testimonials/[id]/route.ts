export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Testimonial from "@/lib/models/Testimonial"
import { getAuthUser } from "@/lib/auth"

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const { id } = await context.params
        const body = await req.json()
        
        await connectDB()

        const testimonial = await Testimonial.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        )

        if (!testimonial) {
            return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true, testimonial })
    } catch (err) {
        console.error("PUT /api/testimonials/[id]:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const { id } = await context.params

        await connectDB()

        const testimonial = await Testimonial.findByIdAndDelete(id)

        if (!testimonial) {
            return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: "Testimonial deleted successfully" })
    } catch (err) {
        console.error("DELETE /api/testimonials/[id]:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
