export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import HeroContent from "@/lib/models/HeroContent"
import { getAuthUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// GET — public, no auth needed (used by the homepage SSR)
export async function GET() {
    try {
        await connectDB()

        let hero = await HeroContent.findOne({ key: "home_hero" }).lean()

        // If not initialized yet, seed defaults
        if (!hero) {
            hero = await HeroContent.create({
                key: "home_hero",
                headlineLine1: "EVERY AGE",
                headlineLine2: "HAS A RISK",
                subtitle: "Every stage needs an insurance plan",
                heroImage: "/uploads/hero_staircase.png",
                stepImages: [
                    { label: "Childhood", image: "/uploads/step_child.png" },
                    { label: "Education", image: "/uploads/step_teenager.png" },
                    { label: "Career", image: "/uploads/step_young_adult.png" },
                    { label: "Family", image: "/uploads/step_middleage.png" },
                    { label: "Retirement", image: "/uploads/step_elderly.png" },
                ],
                ctaText: "Book Free Consultation",
                ctaLink: "/contact",
                secondaryCtaText: "Get WhatsApp Support",
                secondaryCtaLink: "",
                phoneNumbers: [],
                backgroundGradient: { from: "#FFFFFF", to: "#FFFFFF" },
            })
        } else if (!hero.stepImages || hero.stepImages.length === 0) {
            // Migration: if hero exists but doesn't have stepImages, update it
            const defaultSteps = [
                { label: "Childhood", image: "/uploads/step_child.png" },
                { label: "Education", image: "/uploads/step_teenager.png" },
                { label: "Career", image: "/uploads/step_young_adult.png" },
                { label: "Family", image: "/uploads/step_middleage.png" },
                { label: "Retirement", image: "/uploads/step_elderly.png" },
            ]
            await HeroContent.updateOne({ key: "home_hero" }, { $set: { stepImages: defaultSteps } })
            hero.stepImages = defaultSteps
        }

        return NextResponse.json({ hero })
    } catch (err) {
        console.error("GET /api/cms/hero:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

// PUT — admin only
export async function PUT(req: NextRequest) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const body = await req.json()
        const {
            headlineLine1,
            headlineLine2,
            subtitle,
            heroImage,
            stepImages,
            ctaText,
            ctaLink,
            secondaryCtaText,
            secondaryCtaLink,
            phoneNumbers,
            backgroundGradient,
        } = body

        await connectDB()

        const updateObj: Record<string, unknown> = {}
        if (headlineLine1 !== undefined) updateObj.headlineLine1 = headlineLine1
        if (headlineLine2 !== undefined) updateObj.headlineLine2 = headlineLine2
        if (subtitle !== undefined) updateObj.subtitle = subtitle
        if (heroImage !== undefined) updateObj.heroImage = heroImage
        if (stepImages !== undefined) updateObj.stepImages = stepImages
        if (ctaText !== undefined) updateObj.ctaText = ctaText
        if (ctaLink !== undefined) updateObj.ctaLink = ctaLink
        if (secondaryCtaText !== undefined) updateObj.secondaryCtaText = secondaryCtaText
        if (secondaryCtaLink !== undefined) updateObj.secondaryCtaLink = secondaryCtaLink
        if (phoneNumbers !== undefined) updateObj.phoneNumbers = phoneNumbers
        if (backgroundGradient !== undefined) updateObj.backgroundGradient = backgroundGradient

        const hero = await HeroContent.findOneAndUpdate(
            { key: "home_hero" },
            { $set: updateObj },
            { new: true, upsert: true }
        )

        revalidatePath("/", "layout")

        return NextResponse.json({ success: true, hero })
    } catch (err) {
        console.error("PUT /api/cms/hero:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
