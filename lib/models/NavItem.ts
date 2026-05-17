import mongoose, { Schema, Document, Model } from "mongoose"

export interface NavItemDocument extends Document {
    label: string
    href: string
    pageKey?: string          // Links to a CMS page (auto-populated)
    parentId: string | null   // null = top-level category
    order: number             // Sort order within parent
    type: "category" | "page" // Category = folder, Page = leaf
    children?: NavItemDocument[]
    createdAt: Date
    updatedAt: Date
}

const NavItemSchema = new Schema<NavItemDocument>(
    {
        label: { type: String, required: true, trim: true },
        href: { type: String, required: true, trim: true },
        pageKey: { type: String, default: null },
        parentId: { type: String, default: null },
        order: { type: Number, default: 0 },
        type: { type: String, enum: ["category", "page"], default: "page" },
    },
    { timestamps: true }
)

NavItemSchema.index({ parentId: 1, order: 1 })
NavItemSchema.index({ pageKey: 1 })

const NavItem: Model<NavItemDocument> =
    mongoose.models.NavItem ||
    mongoose.model<NavItemDocument>("NavItem", NavItemSchema)

export default NavItem
