export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Testimonial from "@/lib/models/Testimonial"
import { getAuthUser } from "@/lib/auth"

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const isAdminQuery = searchParams.get("admin") === "true"

        await connectDB()

        let filter = { active: true }
        if (isAdminQuery) {
            const user = await getAuthUser()
            if (!user || user.role === "employee") {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
            }
            filter = {} as any // Admins see all
        }

        const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 }).lean()
        return NextResponse.json({ testimonials })
    } catch (err) {
        console.error("GET /api/testimonials:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const body = await req.json()
        const { name, role, body: testimonialBody, rating, initials, active, photo } = body

        if (!name || !role || !testimonialBody || !initials) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        await connectDB()

        const testimonial = await Testimonial.create({
            name,
            role,
            body: testimonialBody,
            rating: rating ?? 5,
            initials,
            active: active ?? true,
            photo
        })

        return NextResponse.json({ success: true, testimonial }, { status: 201 })
    } catch (err) {
        console.error("POST /api/testimonials:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
