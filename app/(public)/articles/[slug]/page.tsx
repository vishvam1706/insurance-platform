import { Metadata } from "next"
import { notFound } from "next/navigation"
import { connection } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import PageRenderer from "@/components/blocks/PageRenderer"
import Breadcrumb from "@/components/public/Breadcrumb"
import ArticleLayout from "@/components/public/ArticleLayout"

interface Props { params: Promise<{ slug: string }> }

async function getArticle(slug: string) {
    await connection()
    await connectDB()
    const doc = await PageContent.findOne({
        pageKey: `articles/${slug}`,
        published: true,
    }).lean()
    return doc ? JSON.parse(JSON.stringify(doc)) : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const page = await getArticle(slug)
    if (!page) return { title: "Not Found" }
    const p = page as any
    return {
        title: p.seo?.metaTitle || p.title,
        description: p.seo?.metaDescription || "",
    }
}

export default async function ArticleSlugPage({ params }: Props) {
    const { slug } = await params
    const page = await getArticle(slug)
    if (!page) notFound()
    const p = page as any

    return (
        <>
            {/* Breadcrumb bar */}
            <div className="bg-white" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3">
                    <Breadcrumb items={[
                        { label: "Articles", href: "/articles" },
                        { label: p.title },
                    ]} />
                </div>
            </div>

            <ArticleLayout showSidebar={true}>
                <PageRenderer blocks={p.blocks || []} />
            </ArticleLayout>
        </>
    )
}