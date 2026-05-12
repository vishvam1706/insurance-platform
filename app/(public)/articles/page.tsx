import { Metadata } from "next"
import Link from "next/link"
import { connection } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import { ArrowRight, BookOpen } from "lucide-react"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = {
    title: "Insurance Articles & Guides",
    description: "Expert articles and guides on term life and health insurance.",
}

async function getArticles() {
    await connection()
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
        <>
            {/* ── Hero ── */}
            <section className="relative overflow-hidden bg-white">
                <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
                <div
                    className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(0,179,134,0.06) 0%, transparent 70%)" }}
                />
                <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20">
                    <div className="max-w-2xl">
                        <span className="badge-green mb-6 inline-flex">
                            <BookOpen className="w-3 h-3" />
                            Articles & Guides
                        </span>
                        <h1
                            className="text-5xl font-extrabold leading-tight mb-5"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Read before you
                            <br />
                            <span className="gradient-text">buy any insurance.</span>
                        </h1>
                        <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            Honest, expert-written content to help you make smarter insurance
                            decisions for yourself and your family.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Articles grid ── */}
            <section className="py-16" style={{ background: "var(--surface-muted)" }}>
                <div className="max-w-7xl mx-auto px-6">
                    {articles.length === 0 ? (
                        <div className="text-center py-24">
                            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-10" />
                            <p style={{ color: "var(--text-muted)" }}>No articles published yet.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article: any, i: number) => (
                                <Link
                                    key={article.pageKey}
                                    href={`/${article.pageKey}`}
                                    className="group flex flex-col h-full rounded-3xl p-7 bg-white border border-gray-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 animate-fade-up"
                                    style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    <p
                                        className="text-xs font-semibold uppercase tracking-widest mb-4"
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        {formatDate(article.updatedAt)}
                                    </p>
                                    <h2
                                        className="font-bold text-lg mb-3 leading-snug group-hover:text-emerald-600 transition-colors flex-grow"
                                        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                                    >
                                        {article.title}
                                    </h2>
                                    {article.seo?.metaDescription && (
                                        <p
                                            className="text-sm line-clamp-2 mb-5 leading-relaxed"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            {article.seo.metaDescription}
                                        </p>
                                    )}
                                    <span
                                        className="inline-flex items-center gap-1.5 text-sm font-bold mt-auto group-hover:gap-3 transition-all"
                                        style={{ color: "var(--brand)" }}
                                    >
                                        Read article <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}