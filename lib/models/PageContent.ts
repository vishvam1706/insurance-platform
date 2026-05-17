import mongoose, { Schema, Document, Model } from "mongoose"

const BlockSchema = new Schema(
    {
        id: { type: String, required: true },
        type: { type: String, required: true },
        data: { type: Schema.Types.Mixed, default: {} },
        tocExclude: { type: Boolean, default: false },
        tocLabel: { type: String, default: null },
    },
    { _id: false }
)

export interface PageContentDocument extends Document {
    pageKey: string
    title: string
    section: string
    blocks: { id: string; type: string; data: Record<string, unknown> }[]
    seo?: {
        metaTitle?: string
        metaDescription?: string
        keywords?: string[]
    }
    published: boolean
    updatedBy?: string
    createdAt: Date
    updatedAt: Date
}

const PageContentSchema = new Schema<PageContentDocument>(
    {
        pageKey: { type: String, required: true, unique: true, trim: true },
        title: { type: String, required: true, trim: true },
        section: {
            type: String,
            enum: ["term-life", "health", "home", "articles", "tools", "other"],
            required: true,
        },
        blocks: { type: [BlockSchema], default: [] },
        seo: {
            metaTitle: { type: String },
            metaDescription: { type: String },
            keywords: [{ type: String }],
        },
        published: { type: Boolean, default: false },
        updatedBy: { type: String },
    },
    { timestamps: true }
)

// pageKey index is already created by unique:true on the field above
PageContentSchema.index({ section: 1 })
PageContentSchema.index({ published: 1 })

const PageContent: Model<PageContentDocument> =
    mongoose.models.PageContent ||
    mongoose.model<PageContentDocument>("PageContent", PageContentSchema)

export default PageContent