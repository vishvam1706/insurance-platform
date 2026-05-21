import { MetadataRoute } from "next"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    // Core static routes
    const routes = [
        "",
        "/term-life",
        "/health",
        "/articles",
        "/contact",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: route === "" ? 1.0 : 0.8,
    }))

    try {
        await connectDB()
        // Get all published dynamic pages from CMS PageContent collection
        const pages = await PageContent.find({ published: true })
            .select("pageKey updatedAt")
            .lean()

        const dynamicRoutes = pages.map((page: any) => ({
            url: `${baseUrl}/${page.pageKey}`,
            lastModified: new Date(page.updatedAt || Date.now()),
            changeFrequency: "weekly" as const,
            priority: 0.6,
        }))

        return [...routes, ...dynamicRoutes]
    } catch (err) {
        console.error("Sitemap generation error:", err)
        return routes // Fallback to core static routes if DB is not connected
    }
}
