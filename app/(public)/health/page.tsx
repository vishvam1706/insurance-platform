import { Metadata } from "next"
import Link from "next/link"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import { ArrowRight, Heart } from "lucide-react"

export const metadata: Metadata = {
    title: "Health Insurance — Complete Guide",
    description: "Everything you need to know about health insurance in India.",
}

async function getHealthPages() {
    "use cache"
    await connectDB()
    const docs = await PageContent.find({ section: "health", published: true })
        .select("pageKey title seo")
        .sort({ updatedAt: -1 })
        .lean()
    return JSON.parse(JSON.stringify(docs))
}

export default async function HealthHubPage() {
    const pages = await getHealthPages()

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-2xl mb-10">
                <div className="flex items-center gap-2 text-teal-600 text-sm font-medium mb-3">
                    <Heart className="w-4 h-4" /> Health Insurance
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                    Health Insurance Guide
                </h1>
                <p className="text-slate-600">
                    Compare plans, understand coverage, and find the right health insurance for you and your family.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map((page: any) => (
                    <Link
                        key={page.pageKey}
                        href={`/${page.pageKey}`}
                        className="group border border-slate-200 rounded-xl p-5 hover:border-teal-300 hover:shadow-sm transition-all bg-white"
                    >
                        <h2 className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors mb-2 text-sm leading-snug">
                            {page.title}
                        </h2>
                        {page.seo?.metaDescription && (
                            <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                                {page.seo.metaDescription}
                            </p>
                        )}
                        <span className="text-xs text-teal-600 font-medium flex items-center gap-1">
                            Read more <ArrowRight className="w-3 h-3" />
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}