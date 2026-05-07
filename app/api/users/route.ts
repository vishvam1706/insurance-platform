import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/lib/models/User"
import { getAuthUser, requireRole } from "@/lib/auth"
import { CreateUserSchema } from "@/lib/validations/user.schema"

export async function GET(req: NextRequest) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        await connectDB()

        const { searchParams } = new URL(req.url)
        const role = searchParams.get("role")
        const status = searchParams.get("status")
        const search = searchParams.get("search")
        const page = parseInt(searchParams.get("page") || "1")
        const limit = parseInt(searchParams.get("limit") || "20")

        const filter: Record<string, unknown> = {}
        if (role) filter.role = role
        if (status) filter.status = status
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ]
        }

        const skip = (page - 1) * limit
        const total = await User.countDocuments(filter)

        const users = await User.find(filter)
            .select("-passwordHash")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("createdBy", "name email")
            .lean()

        return NextResponse.json({
            users,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        })
    } catch (err) {
        console.error("GET /api/users:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        await requireRole(["super_admin", "admin"])

        const body = await req.json()
        const parsed = CreateUserSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0].message },
                { status: 400 }
            )
        }

        await connectDB()

        const existing = await User.findOne({ email: parsed.data.email.toLowerCase() })
        if (existing) {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 })
        }

        const user = await getAuthUser()
        const passwordHash = await bcrypt.hash(parsed.data.password, 12)

        const newUser = await User.create({
            name: parsed.data.name,
            email: parsed.data.email.toLowerCase(),
            passwordHash,
            role: parsed.data.role,
            state: parsed.data.state,
            language: parsed.data.language,
            status: "active",
            createdBy: user?.userId,
        })

        const safe = newUser.toObject()
        delete (safe as any).passwordHash

        return NextResponse.json({ success: true, user: safe }, { status: 201 })
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Something went wrong"
        const status = msg === "Unauthorized" ? 401 : msg === "Forbidden" ? 403 : 500
        return NextResponse.json({ error: msg }, { status })
    }
}