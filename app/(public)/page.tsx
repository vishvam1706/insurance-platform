import { Metadata } from "next"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import PageRenderer from "@/components/blocks/PageRenderer"
import InquiryForm from "@/components/public/InquiryForm"
import {
    Shield, Phone, Heart, MessageCircle,
    CheckCircle2, Star, ArrowRight, Users, BadgeCheck, Clock
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Insurance Platform — Expert Advice, Free Consultation",
    description:
        "Get expert advice on term life and health insurance. Book a free call with our IRDAI-certified advisors. No spam, no pressure.",
}

async function getHomePage() {
    "use cache"
    await connectDB()
    const doc = await PageContent.findOne({ pageKey: "home", published: true }).lean()
    return doc ? JSON.parse(JSON.stringify(doc)) : null
}

export default async function HomePage() {
    const page = await getHomePage()

    if (page && (page as any).blocks?.length > 0) {
        return (
            <div className="max-w-none">
                <PageRenderer blocks={(page as any).blocks} />
            </div>
        )
    }

    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMsg = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    return (
        <>
            {/* ══════════════════════════════════════════════════════════════
                HERO — dot grid + split layout
            ══════════════════════════════════════════════════════════════ */}
            <section className="relative overflow-hidden bg-white">
                {/* Dot grid pattern layer */}
                <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

                {/* Soft blue radial glow top-right */}
                <div
                    className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
                    style={{
                        background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">

                        {/* ── Left column ── */}
                        <div className="animate-fade-up animate-delay-0">
                            {/* Badge */}
                            <span className="badge-blue mb-8 inline-flex">
                                <BadgeCheck className="w-3 h-3" />
                                IRDAI-Certified Advisors
                            </span>

                            {/* Headline */}
                            <h1
                                className="text-[3.25rem] font-extrabold leading-[1.1] tracking-tight mb-6"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Insurance advice
                                <br />
                                <span className="gradient-text">you can actually trust.</span>
                            </h1>

                            <p
                                className="text-lg leading-relaxed mb-8 max-w-md"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                No jargon, no pressure, no commissions-first thinking.
                                Just honest guidance from experts who are on your side.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <Link href="/contact" className="btn-primary">
                                    <Phone className="w-4 h-4" />
                                    Book Free Call
                                </Link>
                                <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-full border transition-all duration-200 hover:bg-gray-50"
                                    style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
                                >
                                    <MessageCircle className="w-4 h-4" style={{ color: "var(--whatsapp)" }} />
                                    Chat on WhatsApp
                                </a>
                            </div>

                            {/* Trust signals row */}
                            <div
                                className="flex flex-wrap items-center gap-5 pt-8"
                                style={{ borderTop: "1px solid var(--border)" }}
                            >
                                {[
                                    { icon: <Users className="w-4 h-4" />, text: "8 Lakh+ customers" },
                                    { icon: <Star className="w-4 h-4" style={{ fill: "var(--star)", color: "var(--star)" }} />, text: "4.9/5 rating" },
                                    { icon: <CheckCircle2 className="w-4 h-4" />, text: "100% free" },
                                ].map((t) => (
                                    <div
                                        key={t.text}
                                        className="flex items-center gap-2 text-sm font-medium"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        <span style={{ color: "var(--blue-600)" }}>{t.icon}</span>
                                        {t.text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Right column — Inquiry form card ── */}
                        <div className="animate-fade-up animate-delay-2">
                            <div
                                className="rounded-3xl p-8 relative overflow-hidden"
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 60px rgba(37,99,235,0.08)",
                                }}
                            >
                                {/* Card inner glow top */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                                    style={{ background: "linear-gradient(90deg, #2563EB, #7C3AED)" }}
                                />

                                <div className="pt-2">
                                    <h2
                                        className="text-xl font-extrabold mb-1"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        Get Expert Advice
                                    </h2>
                                    <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                                        Free · No spam · Response within 2 hours
                                    </p>
                                    <InquiryForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                STATS STRIP
            ══════════════════════════════════════════════════════════════ */}
            <section style={{ background: "var(--text-primary)" }}>
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "8,00,000+", label: "Customers helped", suffix: "" },
                            { value: "4.9", label: "Average rating", suffix: "/5" },
                            { value: "₹0", label: "Consultation cost", suffix: "" },
                            { value: "15 min", label: "Avg. call duration", suffix: "" },
                        ].map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`text-center animate-fade-up`}
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                <p
                                    className="text-3xl font-extrabold text-white mb-1"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {stat.value}
                                    <span className="text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        {stat.suffix}
                                    </span>
                                </p>
                                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                PRODUCTS — creative asymmetric layout
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-24" style={{ background: "var(--surface-muted)" }}>
                <div className="max-w-7xl mx-auto px-6">

                    {/* Section label */}
                    <div className="text-center mb-16">
                        <span className="badge-blue mb-4 inline-flex">What we cover</span>
                        <h2
                            className="text-4xl font-extrabold"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Two products. Expert guidance on both.
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Term Life — large card */}
                        <Link
                            href="/term-life"
                            className="group relative rounded-3xl p-10 overflow-hidden card-hover"
                            style={{
                                background: "#FFFFFF",
                                border: "1px solid var(--border)",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                            }}
                        >
                            {/* Background icon watermark */}
                            <div
                                className="absolute -bottom-8 -right-8 opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.07]"
                                style={{ transform: "rotate(-10deg)" }}
                            >
                                <Shield className="w-48 h-48 text-blue-600" />
                            </div>

                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                                style={{ background: "var(--blue-50)", border: "1px solid var(--blue-100)" }}
                            >
                                <Shield className="w-7 h-7" style={{ color: "var(--blue-600)" }} />
                            </div>

                            <h3
                                className="text-2xl font-extrabold mb-3"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Term Life Insurance
                            </h3>
                            <p className="leading-relaxed mb-6 max-w-sm" style={{ color: "var(--text-secondary)" }}>
                                Pure protection for your family at the lowest possible premium.
                                We help you find the right cover amount and the right insurer.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {["₹1 Cr+ cover", "Low premiums", "Claim support"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-semibold px-3 py-1 rounded-full"
                                        style={{
                                            background: "var(--blue-50)",
                                            color: "var(--blue-600)",
                                            border: "1px solid var(--blue-100)",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <span
                                className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all"
                                style={{ color: "var(--blue-600)" }}
                            >
                                Explore Term Insurance
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>

                        {/* Health — large card */}
                        <Link
                            href="/health"
                            className="group relative rounded-3xl p-10 overflow-hidden card-hover"
                            style={{
                                background: "#FFFFFF",
                                border: "1px solid var(--border)",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                            }}
                        >
                            <div
                                className="absolute -bottom-8 -right-8 opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.07]"
                                style={{ transform: "rotate(-10deg)" }}
                            >
                                <Heart className="w-48 h-48 text-blue-600" />
                            </div>

                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                                style={{ background: "var(--blue-50)", border: "1px solid var(--blue-100)" }}
                            >
                                <Heart className="w-7 h-7" style={{ color: "var(--blue-600)" }} />
                            </div>

                            <h3
                                className="text-2xl font-extrabold mb-3"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Health Insurance
                            </h3>
                            <p className="leading-relaxed mb-6 max-w-sm" style={{ color: "var(--text-secondary)" }}>
                                Comprehensive coverage for you and your family. We compare plans
                                across every major insurer so you don't have to.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {["Family floater", "Cashless hospitals", "No sub-limits"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-semibold px-3 py-1 rounded-full"
                                        style={{
                                            background: "var(--blue-50)",
                                            color: "var(--blue-600)",
                                            border: "1px solid var(--blue-100)",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <span
                                className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all"
                                style={{ color: "var(--blue-600)" }}
                            >
                                Explore Health Insurance
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                HOW IT WORKS — 3 steps
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-16">
                        <span className="badge-blue mb-4 inline-flex">How it works</span>
                        <h2
                            className="text-4xl font-extrabold"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Three steps to the right plan.
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting line (desktop only) */}
                        <div
                            className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px"
                            style={{ background: "var(--blue-100)" }}
                        />

                        {[
                            {
                                step: "01",
                                title: "Book a free call",
                                body: "Pick a time that suits you. Our expert reaches out within the hour.",
                                icon: <Phone className="w-6 h-6" style={{ color: "var(--blue-600)" }} />,
                            },
                            {
                                step: "02",
                                title: "We analyse your needs",
                                body: "No generic advice. We look at your income, family and goals first.",
                                icon: <Users className="w-6 h-6" style={{ color: "var(--blue-600)" }} />,
                            },
                            {
                                step: "03",
                                title: "Get the right plan",
                                body: "A shortlist of the best plans for you with a clear, honest recommendation.",
                                icon: <CheckCircle2 className="w-6 h-6" style={{ color: "var(--blue-600)" }} />,
                            },
                        ].map((step, i) => (
                            <div
                                key={step.step}
                                className="animate-fade-up text-center"
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 relative"
                                    style={{
                                        background: "var(--blue-50)",
                                        border: "1px solid var(--blue-100)",
                                    }}
                                >
                                    {step.icon}
                                    {/* Step number bubble */}
                                    <span
                                        className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full text-[10px] font-extrabold flex items-center justify-center text-white"
                                        style={{ background: "var(--blue-600)", fontFamily: "var(--font-heading)" }}
                                    >
                                        {step.step.replace("0", "")}
                                    </span>
                                </div>
                                <h3
                                    className="text-lg font-bold mb-2"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "var(--text-secondary)" }}>
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                TESTIMONIALS
            ══════════════════════════════════════════════════════════════ */}
            <section className="py-24" style={{ background: "var(--surface-muted)" }}>
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-16">
                        <span className="badge-blue mb-4 inline-flex">
                            <Star className="w-3 h-3" style={{ fill: "currentColor" }} />
                            4.9 / 5 rating
                        </span>
                        <h2
                            className="text-4xl font-extrabold"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            People trust us with their families.
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Arjun Mehta",
                                role: "Software Engineer, Bengaluru",
                                body: "I had been putting off insurance for years because it felt overwhelming. One call changed that. They explained everything clearly and helped me get a ₹1 Cr term plan within a week.",
                                initials: "AM",
                            },
                            {
                                name: "Priya Nair",
                                role: "Teacher, Kerala",
                                body: "No pushy sales pitch at all. They actually told me which plan NOT to buy. That kind of honesty is rare. I now have a family floater I understand completely.",
                                initials: "PN",
                            },
                            {
                                name: "Rohit Sharma",
                                role: "Business Owner, Delhi",
                                body: "Best decision I made for my family's security. The advisor was incredibly patient and answered every question. Highly recommend to anyone confused about insurance.",
                                initials: "RS",
                            },
                        ].map((r, i) => (
                            <div
                                key={r.name}
                                className="rounded-3xl p-7 animate-fade-up"
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                                    animationDelay: `${i * 80}ms`,
                                }}
                            >
                                {/* Stars */}
                                <div className="flex gap-0.5 mb-5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star
                                            key={s}
                                            className="w-4 h-4"
                                            style={{ color: "var(--star)", fill: "var(--star)" }}
                                        />
                                    ))}
                                </div>

                                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                                    "{r.body}"
                                </p>

                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                                        style={{
                                            background: "var(--blue-50)",
                                            color: "var(--blue-600)",
                                            fontFamily: "var(--font-heading)",
                                        }}
                                    >
                                        {r.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold" style={{ fontFamily: "var(--font-heading)" }}>{r.name}</p>
                                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{r.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════
                FINAL CTA BANNER
            ══════════════════════════════════════════════════════════════ */}
            <section
                className="py-24"
                style={{
                    background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 60%, #1D4ED8 100%)",
                }}
            >
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="animate-fade-up">
                        <p
                            className="text-sm font-bold uppercase tracking-widest mb-4 opacity-60 text-white"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Get started today
                        </p>
                        <h2
                            className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            The best time to get insured
                            <br />
                            is right now.
                        </h2>
                        <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
                            Every day without coverage is a risk. Book a free call and let our
                            experts guide you to the right plan in under 20 minutes.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold text-sm px-8 py-4 rounded-full transition-all hover:bg-blue-50 active:scale-95"
                                style={{ fontFamily: "var(--font-body)", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
                            >
                                <Phone className="w-4 h-4" />
                                Book Free Call
                            </Link>
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-white font-semibold text-sm px-8 py-4 rounded-full border border-white/30 backdrop-blur hover:bg-white/10 transition-all active:scale-95"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp us
                            </a>
                        </div>

                        {/* Reassurance */}
                        <div className="flex flex-wrap justify-center gap-6 mt-8">
                            {["No credit card", "No spam calls", "Cancel anytime"].map((r) => (
                                <div key={r} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                                    <CheckCircle2 className="w-4 h-4 opacity-70" />
                                    {r}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}