import { Metadata } from "next"
import { notFound } from "next/navigation"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import PageRenderer from "@/components/blocks/PageRenderer"
import Breadcrumb from "@/components/public/Breadcrumb"
import ArticleLayout from "@/components/public/ArticleLayout"

export const revalidate = 1800 // Cache static page on Edge CDN, revalidate at most every 30 minutes

interface Props { params: Promise<{ slug: string }> }

async function getPage(slug: string) {
    await connectDB()
    const doc = await PageContent.findOne({
        pageKey: `term-life/${slug}`,
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

export default async function TermLifeSlugPage({ params }: Props) {
    const { slug } = await params
    const page = await getPage(slug)
    if (!page) notFound()
    const p = page as any

    return (
        <>
            {/* Breadcrumb bar */}
            <div
                style={{
                    background: "linear-gradient(to right, rgba(0,179,134,0.04), rgba(255,255,255,1) 60%)",
                    borderBottom: "1px solid var(--brand-100)",
                }}
            >
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3.5">
                    <Breadcrumb items={[
                        { label: "Term Life Insurance", href: "/term-life" },
                        { label: p.title },
                    ]} />
                </div>
            </div>

            <ArticleLayout defaultType="term">
                <PageRenderer blocks={p.blocks || []} />
            </ArticleLayout>
        </>
    )
}