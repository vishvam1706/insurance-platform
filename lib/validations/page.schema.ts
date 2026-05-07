import { z } from "zod"

export const BlockSchema = z.object({
    id: z.string(),
    type: z.string(),
    data: z.any(),
})

export const SeoSchema = z.object({
    metaTitle: z.string().max(80).optional(),
    metaDescription: z.string().max(200).optional(),
    keywords: z.array(z.string()).optional(),
})

export const CreatePageSchema = z.object({
    pageKey: z
        .string()
        .min(1, "Page key is required")
        .regex(/^[a-z0-9-/]+$/, "Only lowercase letters, numbers, hyphens and slashes"),
    title: z.string().min(1, "Title is required"),
    section: z.enum(["term-life", "health", "home", "articles", "tools", "other"]),
    blocks: z.array(BlockSchema).default([]),
    seo: SeoSchema.optional(),
    published: z.boolean().default(false),
})

export const UpdatePageSchema = z.object({
    title: z.string().min(1).optional(),
    section: z.enum(["term-life", "health", "home", "articles", "tools", "other"]).optional(),
    blocks: z.array(BlockSchema).optional(),
    seo: SeoSchema.optional(),
    published: z.boolean().optional(),
})

export type CreatePageInput = z.infer<typeof CreatePageSchema>
export type UpdatePageInput = z.infer<typeof UpdatePageSchema>