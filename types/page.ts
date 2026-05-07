import { Block } from "./blocks"

export interface IPageContent {
    _id: string
    pageKey: string
    title: string
    section: "term-life" | "health" | "home" | "articles" | "tools" | "other"
    blocks: Block[]
    seo?: {
        metaTitle?: string
        metaDescription?: string
        keywords?: string[]
    }
    published: boolean
    updatedAt: Date
    updatedBy?: string
}