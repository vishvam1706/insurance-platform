import { Metadata } from "next"
import Link from "next/link"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import { ArrowRight, Shield, Award, CheckCircle2, Phone, Sparkles, BookOpen, Clock } from "lucide-react"

export const revalidate = 1800 // Cache static page on Edge CDN, revalidate at most every 30 minutes

export const metadata: Metadata = {
    title: "Term Life Insurance — Complete Guide | PM Partners Insurance",
    description: "Learn how pure term life insurance protects your family at the lowest premium. Read certified guides and consult with expert planners.",
}

async function getTermPages() {
    await connectDB()
    const docs = await PageContent.find({ section: "term-life", published: true })
        .select("pageKey title seo")
        .sort({ updatedAt: -1 })
        .lean()
    return JSON.parse(JSON.stringify(docs))
}

export default async function TermLifeHubPage() {
    const pages = await getTermPages()

    // Determine featured article and regular articles
    const featuredPage = pages[0] || null
    const regularPages = pages.slice(1)

    return (
        <div className="relative min-h-screen bg-slate-50/40 pb-32 overflow-hidden">
            {/* Background mesh gradients */}
            <div className="absolute inset-0 gold-mesh opacity-50 pointer-events-none" />
            <div className="absolute top-12 left-12 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-[0.03]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
            <div className="absolute bottom-12 right-12 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-[0.03]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />

            {/* ── Editorial Hero ── */}
            <section className="relative overflow-hidden pt-20 lg:pt-28 pb-24">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">
                        
                        {/* Left Column: Copy & Badges */}
                        <div className="text-left space-y-7">
                            <span 
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm select-none animate-fade-in"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                <Shield className="w-4 h-4 text-emerald-600 animate-pulse" />
                                Comprehensive Protection
                            </span>
                            
                            <h1
                                className="text-4xl sm:text-5xl lg:text-6.5xl font-extrabold leading-tight text-slate-900 tracking-tight"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Your Ultimate Guide to<br />
                                <span className="italic font-normal text-emerald-600 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Term Life Insurance.</span>
                            </h1>
                            
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-medium" style={{ fontFamily: "var(--font-body)" }}>
                                Pure protection for your family at the lowest possible cost. From fundamental concepts to comparing and picking the ideal coverage — explore our verified guides.
                            </p>

                            {/* Trust badges */}
                            <div className="grid sm:grid-cols-2 gap-4 pt-2">
                                {[
                                    "IRDAI Certified Advice",
                                    "Zero Spam Guaranteed",
                                    "100% Free Consultation",
                                    "Dedicated Claims Support",
                                ].map((trust) => (
                                    <div key={trust} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-700 transition-transform duration-200 hover:translate-x-1">
                                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                                        {trust}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6">
                                <Link 
                                    href="/contact" 
                                    className="inline-flex items-center gap-2.5 text-white font-black text-xs uppercase tracking-widest px-8 py-4.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-[0_8px_25px_rgba(0,179,134,0.25)]"
                                    style={{
                                        background: "linear-gradient(135deg, var(--brand) 0%, #009c74 100%)",
                                    }}
                                >
                                    <Phone className="w-4 h-4 shrink-0 animate-pulse" />
                                    Book Free Consultation
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Custom Illustration Frame with slow float */}
                        <div className="relative group transition-all duration-500 hover:scale-[1.02]">
                            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-emerald-100 to-teal-100 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
                            <div className="relative rounded-[36px] overflow-hidden border border-emerald-100 bg-white p-5 shadow-[0_32px_60px_-15px_rgba(0,179,134,0.08)]">
                                <img
                                    src="/uploads/term_life_hero.png"
                                    alt="Term Life Insurance Guarding Family"
                                    className="w-full h-96 object-cover rounded-2xl border border-emerald-50 shadow-sm"
                                />
                                <div className="absolute top-9 right-9 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-100 flex items-center gap-1.5 shadow-sm">
                                    <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest font-sans">Verified Guides</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Guide directory ── */}
            <section className="relative z-10 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* Directory title */}
                    <div className="flex items-center gap-4 mb-14 text-left">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 block mb-0.5">Directory Hub</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                                Educational Guides & Resources
                            </h2>
                            <p className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5">Written by certified experts. Zero technical jargon.</p>
                        </div>
                    </div>

                    {pages.length === 0 ? (
                        <div className="text-center py-28 border border-dashed border-emerald-100 rounded-[32px] bg-white shadow-sm">
                            <Shield className="w-14 h-14 mx-auto mb-4 opacity-20 text-emerald-600 animate-pulse" />
                            <p className="font-bold text-slate-400">No guide articles published yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            
                            {/* Featured Article (First Guide) */}
                            {featuredPage && (
                                <Link
                                    href={`/${featuredPage.pageKey}`}
                                    className="group grid md:grid-cols-[1.3fr_0.7fr] gap-8 bg-white border border-emerald-100/70 hover:border-emerald-500/50 rounded-[36px] p-8 sm:p-12 shadow-[0_8px_30px_rgba(0,179,134,0.01)] hover:shadow-[0_24px_50px_rgba(0,179,134,0.07)] hover:-translate-y-1.5 transition-all duration-300 text-left relative overflow-hidden"
                                >
                                    {/* Accent background glow */}
                                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[90px] pointer-events-none opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />

                                    <div className="flex flex-col justify-between space-y-8">
                                        <div className="space-y-4">
                                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm select-none">
                                                <Award className="w-3.5 h-3.5 text-emerald-600 animate-pulse" /> Featured Article
                                            </span>
                                            
                                            <h3 
                                                className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors"
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

                                        <span className="inline-flex items-center gap-2 text-sm sm:text-base font-extrabold text-emerald-600 group-hover:gap-3.5 transition-all">
                                            Read Complete Guide <ArrowRight className="w-4.5 h-4.5 shrink-0" />
                                        </span>
                                    </div>

                                    {/* Premium featured mock container */}
                                    <div 
                                        className="relative rounded-3xl overflow-hidden border border-emerald-500/10 flex flex-col justify-between p-8 min-h-[260px] shadow-sm select-none group-hover:scale-[1.01] transition-transform duration-300"
                                        style={{ background: "linear-gradient(135deg, #070e20 0%, #0d1a37 100%)" }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                                <Shield className="w-5 h-5 animate-pulse" />
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-emerald-500" /> 10 Min Read
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                                                Expert Core Cover
                                            </p>
                                            <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                                                Complete layout of required document claims, claim settlement indices, and premium cost-benefit analysis.
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
                                            className="group flex flex-col h-full rounded-[32px] p-8 sm:p-9 bg-white border border-emerald-100/60 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1.5 text-left relative overflow-hidden"
                                            style={{ 
                                                boxShadow: "0 10px 30px rgba(0, 179, 134, 0.01)",
                                            }}
                                        >
                                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-7 border border-emerald-100 bg-slate-50 group-hover:bg-emerald-50 transition-colors duration-300 text-emerald-600 shadow-sm shadow-emerald-50">
                                                <Shield className="w-5.5 h-5.5 shrink-0" />
                                            </div>
                                            
                                            <h4
                                                className="font-extrabold text-xl mb-3.5 leading-snug transition-colors group-hover:text-emerald-700"
                                                style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
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
                                            
                                            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-600 group-hover:gap-3 transition-all mt-auto border-t border-slate-50 pt-4.5">
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