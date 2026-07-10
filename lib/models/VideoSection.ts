import mongoose, { Schema, Document, Model } from "mongoose"

export interface VideoCard {
    label: string          // e.g. "Health Insurance"
    badge: string          // e.g. "Most Popular"
    thumbnailUrl: string   // uploaded image path
    youtubeUrl: string     // full YouTube URL or video ID
    description: string    // one-line teaser under the label
}

export interface VideoCategory {
    title: string          // "Health Insurance" or "Pure Protection (Term Insurance)"
    subtitle: string       // Explainer text
    badge: string          // e.g. "Best Value"
    cards: VideoCard[]     // Array of 2 videos
}

export interface VideoSectionDocument extends Document {
    key: string             // always "home_video_section"
    sectionTitle: string
    sectionSubtitle: string
    visible: boolean
    categories: VideoCategory[]
    updatedBy?: string
    createdAt: Date
    updatedAt: Date
}

const VideoCardSchema = new Schema<VideoCard>(
    {
        label:        { type: String, required: true, trim: true },
        badge:        { type: String, trim: true, default: "" },
        thumbnailUrl: { type: String, trim: true, default: "" },
        youtubeUrl:   { type: String, trim: true, default: "" },
        description:  { type: String, trim: true, default: "" },
    },
    { _id: false }
)

const VideoCategorySchema = new Schema<VideoCategory>(
    {
        title:     { type: String, required: true, trim: true },
        subtitle:  { type: String, trim: true, default: "" },
        badge:     { type: String, trim: true, default: "" },
        cards:     { type: [VideoCardSchema], default: [] }
    },
    { _id: false }
)

const VideoSectionSchema = new Schema<VideoSectionDocument>(
    {
        key:             { type: String, default: "home_video_section", unique: true },
        sectionTitle:    { type: String, default: "See How We Help" },
        sectionSubtitle: { type: String, default: "Watch short explainers on the two policies every Indian family needs." },
        visible:         { type: Boolean, default: true },
        categories:      { type: [VideoCategorySchema], default: [] },
        updatedBy:       { type: String },
    },
    { timestamps: true }
)

const VideoSection: Model<VideoSectionDocument> =
    mongoose.models.VideoSection ||
    mongoose.model<VideoSectionDocument>("VideoSection", VideoSectionSchema)

export default VideoSection
