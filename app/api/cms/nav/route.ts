import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"

// Public endpoint — no auth required, cached for 60 seconds
export const revalidate = 60

export async function GET() {
    try {
        await connectDB()

        const pages = await PageContent.find({ published: true })
            .select("pageKey title section")
            .sort({ updatedAt: -1 })
            .lean()

        // Group by section
        const sections: Record<string, { label: string; href: string }[]> = {
            "term-life": [],
            "health": [],
        }

        for (const page of pages as any[]) {
            const { section, pageKey, title } = page
            if (section === "term-life" || section === "health") {
                sections[section].push({
                    label: title,
                    href: `/${pageKey}`,
                })
            }
        }

        return NextResponse.json({ sections })
    } catch {
        // On error, return empty so the client falls back to static links
        return NextResponse.json({ sections: { "term-life": [], "health": [] } })
    }
}
