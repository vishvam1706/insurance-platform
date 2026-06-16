import { Metadata } from "next"
import Link from "next/link"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import { ArrowRight, Heart, Award, CheckCircle2, Phone, Sparkles, BookOpen, Clock } from "lucide-react"

export const revalidate = 1800

export const metadata: Metadata = {
    title: "Health Insurance — Smarter Family Protection | Policymine",
    description: "Learn everything about health insurance in India. Read certified guides on plans, benefits, family coverage, and tax savings. Compare top insurers and consult experts for free.",
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

    const featuredPage = pages[0] || null
    const regularPages = pages.slice(1)

    return (
        <div className="relative min-h-screen bg-slate-50/40 pb-32 overflow-hidden text-left">
            {/* Background mesh gradients */}
            <div className="absolute inset-0 gold-mesh opacity-50 pointer-events-none" />
            <div className="absolute top-12 left-12 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-[0.03]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
            <div className="absolute bottom-12 right-12 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-[0.03]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />

            {/* ── Editorial Hero ── */}
            <section className="relative overflow-hidden pt-20 lg:pt-28 pb-24">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">

                        {/* Left Column */}
                        <div className="text-left space-y-7">
                            <span
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest"
                                style={{ background: "var(--brand-light)", color: "var(--brand-dark)", border: "1px solid var(--brand-100)", fontFamily: "var(--font-heading)" }}
                            >
                                <Heart className="w-4 h-4 animate-pulse" style={{ color: "var(--brand)" }} />
                                Complete Health Protection
                            </span>

                            <h1
                                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 tracking-tight"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Your Ultimate Guide to<br />
                                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Health Insurance.</span>
                            </h1>

                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-medium" style={{ fontFamily: "var(--font-body)" }}>
                                Protect your family from rising medical costs with the right health plan. Expert-certified guides with zero jargon.
                            </p>

                            {/* Trust badges */}
                            <div className="grid sm:grid-cols-2 gap-4 pt-2">
                                {[
                                    "IRDAI-Certified Advisors",
                                    "Zero Spam Guaranteed",
                                    "100% Free Consultation",
                                    "Dedicated Claims Support",
                                ].map((trust) => (
                                    <div key={trust} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-700 transition-transform duration-200 hover:translate-x-1">
                                        <CheckCircle2 className="w-4.5 h-4.5 shrink-0" style={{ color: "var(--brand)" }} />
                                        {trust}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6">
                                <Link
                                    href="/contact"
                                    className="btn-primary inline-flex items-center gap-2.5 rounded-2xl shadow-md"
                                >
                                    <Phone className="w-4 h-4 shrink-0 animate-pulse" />
                                    Compare Health Plans
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Illustration Frame */}
                        <div className="relative group transition-all duration-500 hover:scale-[1.02]">
                            <div className="absolute -inset-4 rounded-[40px] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
                            <div className="relative rounded-[36px] overflow-hidden border bg-white p-5 shadow-[0_32px_60px_-15px_rgba(15,23,42,0.03)]" style={{ borderColor: "var(--brand-100)" }}>
                                <div className="w-full h-96 rounded-2xl border flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", borderColor: "var(--brand-light)" }}>
                                    <div className="text-center space-y-4 p-8">
                                        <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center" style={{ background: "var(--brand-light)" }}>
                                            <Heart className="w-10 h-10" style={{ color: "var(--brand-dark)" }} />
                                        </div>
                                        <p className="font-black text-slate-800 text-xl" style={{ fontFamily: "var(--font-heading)" }}>Health Insurance Guides</p>
                                        <p className="text-slate-500 text-sm font-medium">Expert-reviewed, zero jargon</p>
                                        <div className="flex justify-center gap-3 pt-2">
                                            {["Plans", "Benefits", "Family", "Tax"].map((tag) => (
                                                <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "var(--brand-100)", color: "var(--brand-dark)" }}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-9 right-9 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm border" style={{ borderColor: "var(--brand-100)" }}>
                                    <Sparkles className="w-4 h-4 animate-pulse" style={{ color: "var(--brand-dark)" }} />
                                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest font-sans">Verified Guides</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Guide Directory ── */}
            <section className="relative z-10 py-16">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Directory title */}
                    <div className="flex items-center gap-4 mb-14 text-left">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border" style={{ background: "var(--brand-light)", borderColor: "var(--brand-100)", color: "var(--brand-dark)" }}>
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-[9px] font-black uppercase tracking-widest block mb-0.5" style={{ color: "var(--brand-dark)" }}>Directory Hub</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                                Health Insurance Guides & Resources
                            </h2>
                            <p className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5">Written by certified experts. Zero technical jargon.</p>
                        </div>
                    </div>

                    {pages.length === 0 ? (
                        <div className="text-center py-28 border border-dashed rounded-[32px] bg-white shadow-sm" style={{ borderColor: "var(--brand-100)" }}>
                            <Heart className="w-14 h-14 mx-auto mb-4 opacity-20 animate-pulse" style={{ color: "var(--brand-dark)" }} />
                            <p className="font-bold text-slate-400">No guide articles published yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-10">

                            {/* Featured Article */}
                            {featuredPage && (
                                <Link
                                    href={`/${featuredPage.pageKey}`}
                                    className="group grid md:grid-cols-[1.3fr_0.7fr] gap-8 bg-white rounded-[36px] p-8 sm:p-12 shadow-[0_8px_30px_rgba(15,23,42,0.01)] hover:shadow-[0_24px_50px_rgba(249,115,22,0.06)] hover:-translate-y-1.5 transition-all duration-300 text-left relative overflow-hidden border animate-border-card"
                                    style={{ borderColor: "var(--brand-100)" }}
                                >
                                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[90px] pointer-events-none opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />

                                    <div className="flex flex-col justify-between space-y-8">
                                        <div className="space-y-4">
                                            <span
                                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-xs"
                                                style={{ background: "var(--brand-light)", color: "var(--brand-dark)", borderColor: "var(--brand-100)" }}
                                            >
                                                <Award className="w-3.5 h-3.5 animate-pulse" style={{ color: "var(--brand)" }} /> Featured Article
                                            </span>

                                            <h3
                                                className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-snug group-hover:text-orange-500 transition-colors"
                                                style={{ fontFamily: "var(--font-heading)" }}
                                            >
                                                {featuredPage.title}
                                            </h3>

                                            {featuredPage.seo?.metaDescription && (
                                                <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium max-w-2xl" style={{ fontFamily: "var(--font-body)" }}>
                                                    {featuredPage.seo.metaDescription}
                                                </p>
                                            )}
                                        </div>

                                        <span className="inline-flex items-center gap-2 text-sm sm:text-base font-extrabold group-hover:gap-3.5 transition-all" style={{ color: "var(--brand)" }}>
                                            Read Complete Guide <ArrowRight className="w-4.5 h-4.5 shrink-0" />
                                        </span>
                                    </div>

                                    {/* Premium featured mock container */}
                                    <div
                                        className="relative rounded-3xl overflow-hidden flex flex-col justify-between p-8 min-h-[260px] shadow-sm select-none group-hover:scale-[1.01] transition-transform duration-300 border"
                                        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderColor: "var(--brand-100)" }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-orange-400 border border-slate-750" style={{ background: "rgba(249, 115, 22, 0.1)" }}>
                                                <Heart className="w-5 h-5 animate-pulse" />
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-orange-500" /> 10 Min Read
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-orange-400 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                                                Expert Health Cover
                                            </p>
                                            <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                                                Complete layout of plan features, CSR comparison, family coverage strategies, and tax benefit maximisation.
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Regular Articles Grid */}
                            {regularPages.length > 0 && (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {regularPages.map((page: any, i: number) => (
                                        <Link
                                            key={page.pageKey}
                                            href={`/${page.pageKey}`}
                                            className="group flex flex-col h-full rounded-[32px] p-8 sm:p-9 bg-white border hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1.5 text-left relative overflow-hidden animate-border-card"
                                            style={{
                                                borderColor: "var(--brand-100)",
                                                boxShadow: "0 10px 30px rgba(15,23,42,0.01)",
                                            }}
                                        >
                                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-7 border transition-colors duration-300 shadow-sm icon-box" style={{ background: "var(--surface-muted)", borderColor: "var(--brand-100)", color: "var(--brand-dark)" }}>
                                                <Heart className="w-5.5 h-5.5 shrink-0" />
                                            </div>

                                            <h4
                                                className="font-extrabold text-xl mb-3.5 leading-snug transition-colors group-hover:text-orange-500"
                                                style={{ fontFamily: "var(--font-heading)", color: "#0F172A" }}
                                            >
                                                {page.title}
                                            </h4>

                                            {page.seo?.metaDescription && (
                                                <p
                                                    className="text-sm line-clamp-3 mb-7 flex-grow leading-relaxed text-slate-500 font-medium"
                                                    style={{ fontFamily: "var(--font-body)" }}
                                                >
                                                    {page.seo.metaDescription}
                                                </p>
                                            )}

                                            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all mt-auto border-t border-slate-50 pt-4.5" style={{ color: "var(--brand-dark)" }}>
                                                Read Guide <ArrowRight className="w-4 h-4 shrink-0" />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}

                        </div>
                    )}

                </div>
            </section>
        </div>
    )
}