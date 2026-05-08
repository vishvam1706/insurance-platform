import { Metadata } from "next"
import { notFound } from "next/navigation"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import PageRenderer from "@/components/blocks/PageRenderer"
import Breadcrumb from "@/components/public/Breadcrumb"
import ArticleLayout from "@/components/public/ArticleLayout"

interface Props { params: Promise<{ slug: string }> }

async function getPage(slug: string) {
    "use cache"
    await connectDB()
    const doc = await PageContent.findOne({
        pageKey: `health/${slug}`,
        published: true,
    }).lean()
    return doc ? JSON.parse(JSON.stringify(doc)) : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const page = await getPage(slug)
    if (!page) return { title: "Not Found" }
    const p = page as any
    return {
        title: p.seo?.metaTitle || p.title,
        description: p.seo?.metaDescription || "",
        keywords: p.seo?.keywords?.join(", "),
    }
}

export default async function HealthSlugPage({ params }: Props) {
    const { slug } = await params
    const page = await getPage(slug)
    if (!page) notFound()
    const p = page as any

    return (
        <>
            {/* Breadcrumb bar */}
            <div className="bg-white" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3">
                    <Breadcrumb items={[
                        { label: "Health Insurance", href: "/health" },
                        { label: p.title },
                    ]} />
                </div>
            </div>

            <ArticleLayout defaultType="health">
                <PageRenderer blocks={p.blocks || []} />
            </ArticleLayout>
        </>
    )
}