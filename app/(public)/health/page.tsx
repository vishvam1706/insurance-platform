import { Metadata } from "next"
import Link from "next/link"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import { ArrowRight, Heart } from "lucide-react"

export const revalidate = 1800 // Cache static page on Edge CDN, revalidate at most every 30 minutes

export const metadata: Metadata = {
    title: "Health Insurance — Complete Guide",
    description: "Everything you need to know about health insurance in India.",
}

async function getHealthPages() {
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
            <section className="relative overflow-hidden border-b border-[var(--brand-100)]" style={{ background: "var(--surface)" }}>
                {/* Gold mesh effect */}
                <div className="absolute inset-0 gold-mesh opacity-90 pointer-events-none" />
                
                {/* Subtle radial gold glow */}
                <div
                    className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-[80px]"
                    style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
                />
                
                <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-28">
                    <div className="max-w-3xl">
                        <span className="badge-green mb-6 inline-flex">
                            <Heart className="w-3.5 h-3.5" />
                            Health Insurance
                        </span>
                        <h1
                            className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
                            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                        >
                            Health insurance that<br />
                            <span className="italic font-normal" style={{ color: "var(--brand-dark)" }}>actually makes sense.</span>
                        </h1>
                        <p className="text-xl leading-relaxed max-w-xl" style={{ color: "var(--text-secondary)" }}>
                            Comprehensive health insurance for you and your family.
                        </p>
                        <div className="mt-8">
                            <Link 
                                href="/contact" 
                                className="btn-primary inline-flex items-center gap-2.5 rounded-2xl shadow-md"
                            >
                                Compare Health Plans
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Articles grid ── */}
            <section className="py-24" style={{ background: "var(--surface-muted)" }}>
                <div className="max-w-7xl mx-auto px-6">
                    {pages.length === 0 ? (
                        <div className="text-center py-28 border border-dashed border-[var(--brand-200)] rounded-[32px] bg-white">
                            <Heart className="w-14 h-14 mx-auto mb-4 opacity-20" style={{ color: "var(--brand)" }} />
                            <p className="font-bold" style={{ color: "var(--text-muted)" }}>No guide articles published yet.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pages.map((page: any, i: number) => (
                                <Link
                                    key={page.pageKey}
                                    href={`/${page.pageKey}`}
                                    className="group flex flex-col h-full rounded-[28px] overflow-hidden p-8 bg-white border border-[var(--brand-100)] transition-all duration-300 hover:border-[var(--brand)] hover:-translate-y-1 animate-fade-up animate-border-card"
                                    style={{ 
                                        boxShadow: "0 10px 30px rgba(10, 17, 40, 0.01)",
                                        animationDelay: `${i * 80}ms` 
                                    }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-[var(--brand-100)] transition-colors duration-300 bg-[var(--surface-muted)] text-[var(--brand-dark)] group-hover:bg-[var(--brand)] group-hover:text-white group-hover:border-[var(--brand-dark)] icon-box"
                                    >
                                        <Heart className="w-5 h-5" />
                                    </div>
                                    
                                    <h2
                                        className="font-extrabold text-xl mb-3 leading-snug transition-colors group-hover:text-[var(--brand-dark)]"
                                        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                                    >
                                        {page.title}
                                    </h2>
                                    
                                    {page.seo?.metaDescription && (
                                        <p
                                            className="text-sm line-clamp-3 mb-6 flex-grow leading-relaxed"
                                            style={{ color: "var(--text-secondary)" }}
                                        >
                                            {page.seo.metaDescription}
                                        </p>
                                    )}
                                    
                                    <span
                                        className="inline-flex items-center gap-1.5 text-sm font-black mt-auto group-hover:gap-3 transition-all"
                                        style={{ color: "var(--brand-dark)" }}
                                    >
                                        Read complete guide <ArrowRight className="w-4 h-4" />
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