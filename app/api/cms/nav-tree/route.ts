export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import NavItem from "@/lib/models/NavItem"
import { getAuthUser } from "@/lib/auth"

// GET — return full tree
export async function GET() {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        await connectDB()
        const items = await NavItem.find({}).sort({ order: 1 }).lean()

        return NextResponse.json({ items })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

// POST — create a new nav item (category or page link)
export async function POST(req: NextRequest) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

        const body = await req.json()
        const { label, href, pageKey, parentId, type } = body

        if (!label?.trim() || !href?.trim()) {
            return NextResponse.json({ error: "Label and href are required" }, { status: 400 })
        }

        await connectDB()

        // Get the next order number for this parent
        const maxOrder = await NavItem.findOne({ parentId: parentId || null })
            .sort({ order: -1 })
            .select("order")
            .lean()

        const item = await NavItem.create({
            label: label.trim(),
            href: href.trim(),
            pageKey: pageKey || null,
            parentId: parentId || null,
            type: type || "page",
            order: (maxOrder as any)?.order != null ? (maxOrder as any).order + 1 : 0,
        })

        return NextResponse.json({ success: true, item }, { status: 201 })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

// PUT — bulk update order/parent (for drag-and-drop reorder)
export async function PUT(req: NextRequest) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

        const body = await req.json()
        const { updates } = body as {
            updates: { _id: string; parentId: string | null; order: number; label?: string; href?: string }[]
        }

        if (!Array.isArray(updates)) {
            return NextResponse.json({ error: "updates array required" }, { status: 400 })
        }

        await connectDB()

        const ops = updates.map((u) => ({
            updateOne: {
                filter: { _id: u._id },
                update: {
                    $set: {
                        parentId: u.parentId,
                        order: u.order,
                        ...(u.label ? { label: u.label } : {}),
                        ...(u.href ? { href: u.href } : {}),
                    },
                },
            },
        }))

        await NavItem.bulkWrite(ops)

        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

// DELETE — remove a nav item (and orphan its children to root)
export async function DELETE(req: NextRequest) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")
        if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })

        await connectDB()

        // Move children to root before deleting
        await NavItem.updateMany({ parentId: id }, { $set: { parentId: null } })
        await NavItem.findByIdAndDelete(id)

        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
