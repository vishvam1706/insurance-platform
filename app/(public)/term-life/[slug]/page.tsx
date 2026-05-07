import { Metadata } from "next"
import { notFound } from "next/navigation"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import PageRenderer from "@/components/blocks/PageRenderer"
import Breadcrumb from "@/components/public/Breadcrumb"
import InquiryForm from "@/components/public/InquiryForm"

interface Props {
    params: Promise<{ slug: string }>
}

async function getPage(slug: string) {
    "use cache"
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Breadcrumb items={[
                { label: "Term Life Insurance", href: "/term-life" },
                { label: p.title },
            ]} />

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Main content */}
                <article className="lg:col-span-2">
                    <PageRenderer blocks={p.blocks || []} />
                </article>

                {/* Sticky sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                            <h3 className="font-semibold text-slate-900 mb-1 text-sm">
                                Get Expert Advice
                            </h3>
                            <p className="text-slate-400 text-xs mb-4">
                                Free consultation · No spam
                            </p>
                            <InquiryForm defaultType="term" />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}