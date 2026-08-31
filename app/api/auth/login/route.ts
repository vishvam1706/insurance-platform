export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/lib/models/User"
import { signToken, COOKIE_NAME, COOKIE_OPTIONS } from "@/lib/auth"
import { LoginSchema } from "@/lib/validations/user.schema"
import { isRateLimited } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
    try {
        // ── Rate limit: 10 login attempts per IP per 15 minutes ──
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1"
        const limited = await isRateLimited(`ratelimit:ip:${ip}:login`, { limit: 10, windowMs: 15 * 60 * 1000 })
        if (limited) {
            return NextResponse.json(
                { error: "Too many login attempts. Please try again in 15 minutes." },
                { status: 429 }
            )
        }

        const body = await req.json()
        const parsed = LoginSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0].message },
                { status: 400 }
            )
        }

        const { email, password } = parsed.data

        await connectDB()

        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            )
        }

        if (user.status === "pending") {
            return NextResponse.json(
                { error: "Your account is pending approval. Please wait for an admin to activate it." },
                { status: 403 }
            )
        }

        if (user.status === "inactive") {
            return NextResponse.json(
                { error: "Your account has been deactivated. Please contact an administrator." },
                { status: 403 }
            )
        }

        const isValid = await bcrypt.compare(password, user.passwordHash)
        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            )
        }

        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
            state: user.state,
            language: user.language,
        })

        const response = NextResponse.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                state: user.state,
                language: user.language,
                status: user.status,
            },
        })

        response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS)
        return response
    } catch (err) {
        console.error("Login error:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}