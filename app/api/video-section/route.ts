export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import VideoSection from "@/lib/models/VideoSection"
import { getAuthUser } from "@/lib/auth"

const DEFAULT_CATEGORIES = [
    {
        title: "Health Insurance",
        subtitle: "Protect your family from crushing medical bills with the right health plan.",
        badge: "Most Popular",
        cards: [
            {
                label: "Cashless Benefits",
                badge: "Video 1",
                thumbnailUrl: "/uploads/video_health_portrait.png",
                youtubeUrl: "",
                description: "How cashless hospitalisation keeps you stress-free during emergencies."
            },
            {
                label: "Critical Illness Rider",
                badge: "Video 2",
                thumbnailUrl: "/uploads/health_video_2.png",
                youtubeUrl: "",
                description: "Lump sum payout on major illness diagnosis to protect family savings."
            }
        ]
    },
    {
        title: "Pure Protection (Term Insurance)",
        subtitle: "Maximum life cover at the lowest premium — essential for every earning family.",
        badge: "Best Value",
        cards: [
            {
                label: "High Cover Benefit",
                badge: "Video 1",
                thumbnailUrl: "/uploads/video_term_portrait.png",
                youtubeUrl: "",
                description: "Get 10x-15x income replacement cover for your family's future."
            },
            {
                label: "Return of Premium",
                badge: "Video 2",
                thumbnailUrl: "/uploads/term_video_2.png",
                youtubeUrl: "",
                description: "Get all paid premiums back at maturity if you survive the term."
            }
        ]
    }
]

// ── Public GET ─────────────────────────────────────────────────────────────────
export async function GET() {
    try {
        await connectDB()
        let doc = await VideoSection.findOne({ key: "home_video_section" }).lean()
        if (!doc) {
            // Seed defaults on first access
            doc = await VideoSection.create({ key: "home_video_section", categories: DEFAULT_CATEGORIES })
            doc = doc.toObject()
        }
        // If data is old schema format, auto-migration fallback
        if (doc && !doc.categories && (doc as any).cards) {
            doc = await VideoSection.findOneAndUpdate(
                { key: "home_video_section" },
                { $set: { categories: DEFAULT_CATEGORIES }, $unset: { cards: "" } },
                { new: true }
            ).lean()
        }
        return NextResponse.json({ data: JSON.parse(JSON.stringify(doc)) })
    } catch (err) {
        console.error("GET /api/video-section:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

// ── Admin PUT ──────────────────────────────────────────────────────────────────
export async function PUT(req: NextRequest) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        const body = await req.json()
        await connectDB()

        const updated = await VideoSection.findOneAndUpdate(
            { key: "home_video_section" },
            {
                $set: {
                    sectionTitle:    body.sectionTitle,
                    sectionSubtitle: body.sectionSubtitle,
                    visible:         body.visible ?? true,
                    categories:      body.categories,
                    updatedBy:       user.email || user.userId,
                },
            },
            { upsert: true, new: true }
        ).lean()

        return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(updated)) })
    } catch (err) {
        console.error("PUT /api/video-section:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
