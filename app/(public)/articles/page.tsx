import { Metadata } from "next"
import Link from "next/link"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import { ArrowRight, BookOpen } from "lucide-react"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = {
    title: "Insurance Articles & Guides",
    description: "Expert articles and guides on term life and health insurance.",
}

async function getArticles() {
    "use cache"
    await connectDB()
    const docs = await PageContent.find({ section: "articles", published: true })
        .select("pageKey title seo updatedAt")
        .sort({ updatedAt: -1 })
        .lean()
    return JSON.parse(JSON.stringify(docs))
}

export default async function ArticlesPage() {
    const articles = await getArticles()

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-2xl mb-10">
                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
                    <BookOpen className="w-4 h-4" /> Articles
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                    Insurance Articles & Guides
                </h1>
                <p className="text-slate-600">
                    Expert content to help you make informed insurance decisions.
                </p>
            </div>

            {articles.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                    <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p>No articles published yet.</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {articles.map((article: any) => (
                        <Link
                            key={article.pageKey}
                            href={`/${article.pageKey}`}
                            className="group border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all bg-white"
                        >
                            <p className="text-xs text-slate-400 mb-2">
                                {formatDate(article.updatedAt)}
                            </p>
                            <h2 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                                {article.title}
                            </h2>
                            {article.seo?.metaDescription && (
                                <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                                    {article.seo.metaDescription}
                                </p>
                            )}
                            <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                                Read article <ArrowRight className="w-3 h-3" />
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}