import { Metadata } from "next"
import { notFound } from "next/navigation"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import PageRenderer from "@/components/blocks/PageRenderer"
import Breadcrumb from "@/components/public/Breadcrumb"

interface Props {
    params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
    "use cache"
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Breadcrumb items={[
                { label: "Articles", href: "/articles" },
                { label: p.title },
            ]} />
            <article>
                <PageRenderer blocks={p.blocks || []} />
            </article>
        </div>
    )
}