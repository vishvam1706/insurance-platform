export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import { getAuthUser } from "@/lib/auth"
import { UpdatePageSchema } from "@/lib/validations/page.schema"

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        await connectDB()

        // slug param may use "__" instead of "/" for URL safety
        const pageKey = slug.replace(/__/g, "/")
        const page = await PageContent.findOne({ pageKey }).lean()

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 })
        }

        return NextResponse.json({ page })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const { slug } = await params
        const pageKey = slug.replace(/__/g, "/")
        const body = await req.json()
        const parsed = UpdatePageSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0].message },
                { status: 400 }
            )
        }

        await connectDB()

        // If pageKey is being changed, check for conflicts
        if (parsed.data.pageKey && parsed.data.pageKey !== pageKey) {
            const conflict = await PageContent.findOne({ pageKey: parsed.data.pageKey })
            if (conflict) {
                return NextResponse.json(
                    { error: "A page with this URL already exists" },
                    { status: 409 }
                )
            }
        }

        const page = await PageContent.findOneAndUpdate(
            { pageKey },
            { $set: { ...parsed.data, updatedBy: user.email } },
            { new: true }
        )

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true, page })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role !== "super_admin") {
            return NextResponse.json(
                { error: "Only Super Admin can delete pages" },
                { status: 403 }
            )
        }

        const { slug } = await params
        const pageKey = slug.replace(/__/g, "/")

        await connectDB()
        await PageContent.findOneAndDelete({ pageKey })

        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}