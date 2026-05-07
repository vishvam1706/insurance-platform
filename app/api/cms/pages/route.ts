import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import { getAuthUser } from "@/lib/auth"
import { CreatePageSchema } from "@/lib/validations/page.schema"

export async function GET(req: NextRequest) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        await connectDB()

        const { searchParams } = new URL(req.url)
        const section = searchParams.get("section")
        const search = searchParams.get("search")
        const published = searchParams.get("published")

        const filter: Record<string, unknown> = {}
        if (section) filter.section = section
        if (published !== null && published !== "") {
            filter.published = published === "true"
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { pageKey: { $regex: search, $options: "i" } },
            ]
        }

        const pages = await PageContent.find(filter)
            .select("-blocks")
            .sort({ updatedAt: -1 })
            .lean()

        return NextResponse.json({ pages })
    } catch (err) {
        console.error("GET /api/cms/pages:", err)
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
        const parsed = CreatePageSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0].message },
                { status: 400 }
            )
        }

        await connectDB()

        const existing = await PageContent.findOne({ pageKey: parsed.data.pageKey })
        if (existing) {
            return NextResponse.json(
                { error: "A page with this URL slug already exists" },
                { status: 409 }
            )
        }

        const page = await PageContent.create({
            ...parsed.data,
            updatedBy: user.email,
        })

        return NextResponse.json({ success: true, page }, { status: 201 })
    } catch (err) {
        console.error("POST /api/cms/pages:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}