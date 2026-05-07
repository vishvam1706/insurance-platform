import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getAuthUser } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import User from "@/lib/models/User"
import { z } from "zod"

export async function GET() {
    try {
        const payload = await getAuthUser()
        if (!payload) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await connectDB()
        const user = await User.findById(payload.userId).select("-passwordHash")
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ user })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8),
})

export async function PATCH(req: NextRequest) {
    try {
        const payload = await getAuthUser()
        if (!payload) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const parsed = ChangePasswordSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0].message },
                { status: 400 }
            )
        }

        await connectDB()
        const user = await User.findById(payload.userId)
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

        const valid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash)
        if (!valid) {
            return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
        }

        user.passwordHash = await bcrypt.hash(parsed.data.newPassword, 12)
        await user.save()

        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}