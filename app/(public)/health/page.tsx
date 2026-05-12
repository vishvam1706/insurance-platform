import { Metadata } from "next"
import Link from "next/link"
import { connection } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import { ArrowRight, Heart } from "lucide-react"

export const metadata: Metadata = {
    title: "Health Insurance — Complete Guide",
    description: "Everything you need to know about health insurance in India.",
}

async function getHealthPages() {
    await connection()
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
                            <Heart className="w-3 h-3" />
                            Health Insurance
                        </span>
                        <h1
                            className="text-5xl font-extrabold leading-tight mb-5"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Health insurance that
                            <br />
                            <span className="gradient-text">actually makes sense.</span>
                        </h1>
                        <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            Compare plans, understand coverage, and find the right health insurance
                            for you and your family.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Articles grid ── */}
            <section className="py-16" style={{ background: "var(--surface-muted)" }}>
                <div className="max-w-7xl mx-auto px-6">
                    {pages.length === 0 ? (
                        <div className="text-center py-24">
                            <Heart className="w-12 h-12 mx-auto mb-4 opacity-10" />
                            <p style={{ color: "var(--text-muted)" }}>No articles published yet.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pages.map((page: any, i: number) => (
                                <Link
                                    key={page.pageKey}
                                    href={`/${page.pageKey}`}
                                    className="group flex flex-col h-full rounded-3xl p-7 bg-white border border-gray-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 animate-fade-up"
                                    style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors group-hover:bg-emerald-100"
                                        style={{ background: "var(--brand-light)" }}
                                    >
                                        <Heart className="w-5 h-5" style={{ color: "var(--brand)" }} />
                                    </div>
                                    <h2
                                        className="font-bold text-lg mb-3 leading-snug group-hover:text-emerald-600 transition-colors"
                                        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                                    >
                                        {page.title}
                                    </h2>
                                    {page.seo?.metaDescription && (
                                        <p
                                            className="text-sm line-clamp-2 mb-5 flex-grow leading-relaxed"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            {page.seo.metaDescription}
                                        </p>
                                    )}
                                    <span
                                        className="inline-flex items-center gap-1.5 text-sm font-bold mt-auto group-hover:gap-3 transition-all"
                                        style={{ color: "var(--brand)" }}
                                    >
                                        Read more <ArrowRight className="w-4 h-4" />
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