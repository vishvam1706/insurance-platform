import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/lib/models/User"
import { signToken, COOKIE_NAME, COOKIE_OPTIONS } from "@/lib/auth"
import { LoginSchema } from "@/lib/validations/user.schema"

export async function POST(req: NextRequest) {
    try {
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