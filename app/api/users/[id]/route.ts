import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/lib/models/User"
import { getAuthUser } from "@/lib/auth"
import { UpdateUserSchema } from "@/lib/validations/user.schema"
import { sendEmployeeApprovalEmail } from "@/lib/email"

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = await getAuthUser()
        if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (authUser.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const { id } = await params
        await connectDB()

        const user = await User.findById(id)
            .select("-passwordHash")
            .populate("createdBy", "name email")
            .lean()

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

        return NextResponse.json({ user })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = await getAuthUser()
        if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (authUser.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const { id } = await params
        const body = await req.json()
        const parsed = UpdateUserSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0].message },
                { status: 400 }
            )
        }

        await connectDB()

        const prevUser = await User.findById(id)
        if (!prevUser) return NextResponse.json({ error: "User not found" }, { status: 404 })

        // Only super_admin can change roles
        if (parsed.data.role && authUser.role !== "super_admin") {
            return NextResponse.json({ error: "Only Super Admin can change roles" }, { status: 403 })
        }

        const updated = await User.findByIdAndUpdate(
            id,
            { $set: parsed.data },
            { new: true }
        ).select("-passwordHash")

        // Send email if status changed to active (approval)
        if (
            parsed.data.status === "active" &&
            prevUser.status === "pending"
        ) {
            sendEmployeeApprovalEmail({
                to: prevUser.email,
                name: prevUser.name,
                approved: true,
            }).catch(console.error)
        }

        if (
            parsed.data.status === "inactive" &&
            prevUser.status === "active"
        ) {
            sendEmployeeApprovalEmail({
                to: prevUser.email,
                name: prevUser.name,
                approved: false,
            }).catch(console.error)
        }

        return NextResponse.json({ success: true, user: updated })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = await getAuthUser()
        if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        // Only super_admin can delete users
        if (authUser.role !== "super_admin") {
            return NextResponse.json({ error: "Only Super Admin can delete users" }, { status: 403 })
        }

        const { id } = await params

        // Prevent self-deletion
        if (id === authUser.userId) {
            return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 })
        }

        await connectDB()
        await User.findByIdAndDelete(id)

        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}