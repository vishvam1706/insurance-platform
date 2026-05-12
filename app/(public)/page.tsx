import { Metadata } from "next"
import { connection } from "next/server"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import PageRenderer from "@/components/blocks/PageRenderer"
import HomeHero from "@/components/home/HomeHero"
import DittoExperience from "@/components/home/DittoExperience"
import ComparisonSection from "@/components/home/ComparisonSection"
import InsuranceChecklist from "@/components/home/InsuranceChecklist"
import HomeFaq from "@/components/home/HomeFaq"
import ChooseDittoCta from "@/components/home/ChooseDittoCta"
import { Shield, Heart, ArrowRight, Star, CheckCircle2, Users, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Ditto Insurance — Expert Advice, Free Consultation",
    description:
        "Get expert advice on term life and health insurance. Book a free call with our IRDAI-certified advisors. No spam, no pressure.",
}

async function getHomePage() {
    await connection()
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

    // Otherwise render the hardcoded Ditto-style homepage
    return (
        <>
            {/* 1. HERO */}
            <HomeHero waUrl={waUrl} />

            {/* 2. STATS STRIP */}
            <section style={{ background: "#0F172A" }} className="overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: "8,00,000+", label: "Customers helped" },
                            { value: "4.9", label: "Average rating" },
                            { value: "₹0", label: "Consultation cost" },
                            { value: "21,000+", label: "Google reviews" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center min-w-0">
                                <p className="text-2xl sm:text-3xl font-extrabold mb-1 truncate" style={{ fontFamily: "var(--font-heading)", color: "#FFFFFF" }}>
                                    {stat.value}
                                </p>
                                <p className="text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. THE DITTO EXPERIENCE */}
            <DittoExperience waUrl={waUrl} />

            {/* 4. COMPARISON — Ditto vs Other Platforms */}
            <ComparisonSection />

            {/* 5. PRODUCTS — Term Life & Health */}
            <section className="py-20" style={{ background: "#F8FAFC" }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <span
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                            style={{ background: "var(--brand-light)", color: "var(--brand)", border: "1px solid var(--brand-100)" }}
                        >
                            What we cover
                        </span>
                        <h2 className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-heading)", color: "#111827" }}>
                            Two products. Expert guidance on both.
                        </h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                        {[
                            {
                                href: "/term-life",
                                icon: <Shield className="w-7 h-7" style={{ color: "var(--brand)" }} />,
                                title: "Term Life Insurance",
                                body: "Pure protection for your family at the lowest possible premium. We help you find the right cover amount and the right insurer.",
                                tags: ["₹1 Cr+ cover", "Low premiums", "Claim support"],
                                cta: "Explore Term Insurance",
                            },
                            {
                                href: "/health",
                                icon: <Heart className="w-7 h-7" style={{ color: "var(--brand)" }} />,
                                title: "Health Insurance",
                                body: "Comprehensive coverage for you and your family. We compare plans across every major insurer so you don't have to.",
                                tags: ["Family floater", "Cashless hospitals", "No sub-limits"],
                                cta: "Explore Health Insurance",
                            },
                        ].map((p) => (
                            <Link
                                key={p.href}
                                href={p.href}
                                className="group relative rounded-3xl p-10 overflow-hidden transition-all hover:-translate-y-1"
                                style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                            >
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ background: "var(--brand-light)", border: "1px solid var(--brand-100)" }}>
                                    {p.icon}
                                </div>
                                <h3 className="text-2xl font-extrabold mb-3" style={{ fontFamily: "var(--font-heading)", color: "#111827" }}>{p.title}</h3>
                                <p className="leading-relaxed mb-6" style={{ color: "#6B7280" }}>{p.body}</p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {p.tags.map((tag) => (
                                        <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "var(--brand-light)", color: "var(--brand)", border: "1px solid var(--brand-100)" }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <span className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all" style={{ color: "var(--brand)" }}>
                                    {p.cta} <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        ))}
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
                            ★ 4.9 / 5 rating
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

            {/* 9. CHOOSE DITTO CTA */}
            <ChooseDittoCta waUrl={waUrl} />
        </>
    )
}