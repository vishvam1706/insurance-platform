import mongoose, { Schema, Document, Model } from "mongoose"

export interface HeroStepImage {
    label: string
    image: string
}

export interface HeroContentDocument extends Document {
    key: string
    headlineLine1: string
    headlineLine2: string
    subtitle: string
    heroImage: string
    stepImages: HeroStepImage[]
    ctaText: string
    ctaLink: string
    secondaryCtaText: string
    secondaryCtaLink: string
    phoneNumbers: string[]
    backgroundGradient: {
        from: string
        to: string
    }
    createdAt: Date
    updatedAt: Date
}

const HeroContentSchema = new Schema<HeroContentDocument>(
    {
        key: { type: String, default: "home_hero", unique: true },
        headlineLine1: { type: String, default: "EVERY AGE" },
        headlineLine2: { type: String, default: "HAS A RISK" },
        subtitle: { type: String, default: "Every stage needs a insurance plan" },
        heroImage: { type: String, default: "/uploads/hero_staircase.png" },
        stepImages: [
            {
                label: { type: String, default: "" },
                image: { type: String, default: "" },
                _id: false,
            },
        ],
        ctaText: { type: String, default: "Book Free Consultation" },
        ctaLink: { type: String, default: "/contact" },
        secondaryCtaText: { type: String, default: "Get WhatsApp Support" },
        secondaryCtaLink: { type: String, default: "" },
        phoneNumbers: [{ type: String }],
        backgroundGradient: {
            from: { type: String, default: "#1a3a5c" },
            to: { type: String, default: "#0d2137" },
        },
    },
    { timestamps: true }
)

const HeroContent: Model<HeroContentDocument> =
    mongoose.models.HeroContent ||
    mongoose.model<HeroContentDocument>("HeroContent", HeroContentSchema)

export default HeroContent
