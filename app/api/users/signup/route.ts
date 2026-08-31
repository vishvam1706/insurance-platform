export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/lib/models/User"
import { EmployeeSignupSchema } from "@/lib/validations/user.schema"
import { isRateLimited } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
    try {
        // ── Rate limit: 5 signup attempts per IP per 30 minutes ──
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1"
        const limited = await isRateLimited(`ratelimit:ip:${ip}:signup`, { limit: 5, windowMs: 30 * 60 * 1000 })
        if (limited) {
            return NextResponse.json(
                { error: "Too many signup attempts. Please try again later." },
                { status: 429 }
            )
        }

        const body = await req.json()
        const parsed = EmployeeSignupSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0].message },
                { status: 400 }
            )
        }

        await connectDB()

        const existing = await User.findOne({
            email: parsed.data.email.toLowerCase(),
        })
        if (existing) {
            return NextResponse.json(
                { error: "An account with this email already exists" },
                { status: 409 }
            )
        }

        const passwordHash = await bcrypt.hash(parsed.data.password, 12)

        await User.create({
            name: parsed.data.name,
            email: parsed.data.email.toLowerCase(),
            passwordHash,
            role: "employee",
            state: parsed.data.state,
            language: parsed.data.language,
            states: [parsed.data.state],
            languages: [parsed.data.language],
            status: "pending",   // ← pending until admin approves
        })

        return NextResponse.json({
            success: true,
            message: "Account created. Please wait for admin approval before logging in.",
        }, { status: 201 })
    } catch (err) {
        console.error("POST /api/users/signup:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}