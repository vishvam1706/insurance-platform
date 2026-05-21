import { Metadata } from "next"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import PageRenderer from "@/components/blocks/PageRenderer"
import HomeHero from "@/components/home/HomeHero"
import PmPartnersExperience from "@/components/home/PmPartnersExperience"
import ComparisonSection from "@/components/home/ComparisonSection"
import InsuranceChecklist from "@/components/home/InsuranceChecklist"
import HomeFaq from "@/components/home/HomeFaq"
import ChoosePmPartnersCta from "@/components/home/ChoosePmPartnersCta"
import { Shield, Heart, ArrowRight, Star, CheckCircle2, Users, Phone, Sparkles } from "lucide-react"
import Link from "next/link"

export const revalidate = 1800 // Cache static page on Edge CDN, revalidate at most every 30 minutes

export const metadata: Metadata = {
    title: "PM Partners Insurance — Expert Advice, Free Consultation",
    description:
        "Get expert advice on term life and health insurance. Get a free consultation with our expert advisors. No spam, no pressure.",
}

async function getHomePage() {
    await connectDB()
    const doc = await PageContent.findOne({ pageKey: "home", published: true }).lean()
    return doc ? JSON.parse(JSON.stringify(doc)) : null
}

export default async function HomePage() {
    const page = await getHomePage()

    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMsg = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    // If CMS blocks exist, render those
    if (page && (page as any).blocks?.length > 0) {
        return (
            <div className="max-w-none">
                <PageRenderer blocks={(page as any).blocks} />
            </div>
        )
    }

    // Otherwise render the hardcoded PM Partners-style homepage
    return (
        <>
            {/* 1. HERO */}
            <HomeHero waUrl={waUrl} />

            {/* 3. THE PM PARTNERS EXPERIENCE */}
            <PmPartnersExperience waUrl={waUrl} />

            {/* 4. COMPARISON — PM Partners vs Other Platforms */}
            <ComparisonSection />

            {/* 5. PRODUCTS — Term Life & Health */}
            <section className="py-14 relative overflow-hidden border-b border-[var(--brand-100)] bg-[var(--brand-light)]/45">
                <div className="absolute inset-0 gold-mesh opacity-40 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div className="text-left">
                            <span
                                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-xs"
                                style={{ background: "var(--brand-light)", color: "var(--brand-dark)", border: "1px solid var(--brand-100)" }}
                            >
                                What we cover
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                                PM Partners Offers Two Products.<br />
                                <span className="italic font-normal text-emerald-600 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Expert guidance on both.</span>
                            </h2>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {[
                            {
                                href: "/term-life",
                                icon: <Shield className="w-6 h-6 text-emerald-600" />,
                                title: "Term Life Insurance",
                                body: "Pure protection for your family at the lowest possible premium. We help you find the right cover amount and the right insurer.",
                                tags: ["₹1 Cr+ cover", "Low premiums", "Claim support"],
                                badge: "Best for Family Protection",
                                cta: "Explore Term Insurance",
                                imageUrl: "/uploads/term_life_hero.png",
                            },
                            {
                                href: "/health",
                                icon: <Heart className="w-6 h-6 text-emerald-600" />,
                                title: "Health Insurance",
                                body: "Comprehensive coverage for you and your family. We compare plans across every major insurer so you don't have to.",
                                tags: ["Family floater", "Cashless hospitals", "No sub-limits"],
                                badge: "Best for Medical Protection",
                                cta: "Explore Health Insurance",
                                imageUrl: "/uploads/1778580730304-wqg8vkb869c.jpg",
                            },
                        ].map((p) => {
                            const isHealth = p.href.includes("health")
                            const isPhotoCard = !!p.imageUrl

                            return (
                                <Link
                                    key={p.href}
                                    href={p.href}
                                    className="group relative rounded-[24px] overflow-hidden border border-slate-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:border-[var(--brand)]/30 hover:shadow-[0_16px_32px_rgba(0,179,134,0.03)] transition-all duration-300 hover:-translate-y-0.5 grid grid-cols-1 sm:grid-cols-[1.35fr_0.65fr] h-full min-h-[220px]"
                                >
                                    {/* Left Content Column */}
                                    <div className="p-5 sm:p-6 flex flex-col justify-between h-full order-last sm:order-first space-y-4">
                                        <div className="space-y-2.5 text-left">
                                            {/* Dynamic Badges */}
                                            <div className="flex flex-wrap gap-1.5">
                                                <span 
                                                    className="text-[9px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 select-none"
                                                    style={{ 
                                                        background: "var(--brand-light)", 
                                                        color: "var(--brand-dark)", 
                                                        borderColor: "var(--brand-100)" 
                                                    }}
                                                >
                                                    <Sparkles className="w-2.5 h-2.5 text-[var(--brand)] animate-pulse" />
                                                    {p.badge}
                                                </span>
                                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-50 text-slate-400 border border-slate-100 select-none">
                                                    Expert Guidance
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3
                                                className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight transition-colors duration-300 group-hover:text-[var(--brand-dark)]"
                                                style={{ fontFamily: "var(--font-heading)" }}
                                            >
                                                {p.title}
                                            </h3>

                                            {/* Description */}
                                            <p
                                                className="text-xs text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-3"
                                                style={{ fontFamily: "var(--font-body)" }}
                                            >
                                                {p.body}
                                            </p>
                                        </div>

                                        {/* Action link */}
                                        <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[var(--brand-dark)] group-hover:text-[var(--brand)] transition-colors pt-2 border-t border-slate-50 w-full justify-between">
                                            <span className="group-hover:translate-x-0.5 transition-transform duration-200">{p.cta}</span>
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[var(--brand)]" />
                                        </div>
                                    </div>

                                    {/* Right Visual Media Column */}
                                    <div className="order-first sm:order-last relative w-full min-h-[140px] sm:min-h-full overflow-hidden bg-slate-50 border-b sm:border-b-0 sm:border-l border-slate-100">
                                        {isPhotoCard ? (
                                            <>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={p.imageUrl}
                                                    alt={p.title}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                {/* Modern overlay glow */}
                                                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                                            </>
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--brand-light)]/40 to-emerald-50/10">
                                                <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-[var(--brand)]/5 blur-md pointer-events-none" />
                                                <div className="absolute -left-6 -top-6 w-20 h-20 rounded-full bg-[var(--brand)]/5 blur-md pointer-events-none" />
                                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-[var(--brand-100)] shadow-xs transition-transform duration-500 group-hover:scale-110 relative z-10">
                                                    {p.icon}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* 6. INSURANCE CHECKLIST */}
            <InsuranceChecklist waUrl={waUrl} />

            {/* 7. TESTIMONIALS */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <span
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                            style={{ background: "var(--brand-light)", color: "var(--brand)", border: "1px solid var(--brand-100)" }}
                        >
                            Customer Feedback
                        </span>
                        <h2 className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-heading)", color: "#111827" }}>
                            People trust us with their families.
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { name: "Arjun Mehta", role: "Software Engineer, Bengaluru", initials: "AM", body: "I had been putting off insurance for years because it felt overwhelming. One call changed that. They explained everything clearly and helped me get a ₹1 Cr term plan within a week." },
                            { name: "Priya Nair", role: "Teacher, Kerala", initials: "PN", body: "No pushy sales pitch at all. They actually told me which plan NOT to buy. That kind of honesty is rare. I now have a family floater I understand completely." },
                            { name: "Rohit Sharma", role: "Business Owner, Delhi", initials: "RS", body: "Best decision I made for my family's security. The advisor was incredibly patient and answered every question. Highly recommend to anyone confused about insurance." },
                        ].map((r) => (
                            <div key={r.name} className="rounded-3xl p-7" style={{ background: "#F8FAFC", border: "1px solid #E5E7EB" }}>
                                <div className="flex gap-0.5 mb-4">
                                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4" style={{ color: "#F59E0B", fill: "#F59E0B" }} />)}
                                </div>
                                <p className="text-sm leading-relaxed mb-5" style={{ color: "#374151" }}>"{r.body}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--brand-light)", color: "var(--brand)" }}>
                                        {r.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold" style={{ color: "#111827" }}>{r.name}</p>
                                        <p className="text-xs" style={{ color: "#9CA3AF" }}>{r.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. FAQ */}
            <HomeFaq />

            {/* 9. CHOOSE PM PARTNERS CTA */}
            <ChoosePmPartnersCta waUrl={waUrl} />
        </>
    )
}