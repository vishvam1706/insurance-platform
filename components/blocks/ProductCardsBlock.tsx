"use client"

import { ProductCardsBlockData } from "@/types/blocks"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    Shield, Heart, TrendingUp, Umbrella,
    GraduationCap, Briefcase, ArrowRight, Sparkles, Check
} from "lucide-react"
import { motion } from "framer-motion"

const ICON_MAP: Record<string, React.ReactNode> = {
    term: <Shield className="w-5 h-5" />,
    health: <Heart className="w-5 h-5" />,
    wealth: <TrendingUp className="w-5 h-5" />,
    retirement: <Umbrella className="w-5 h-5" />,
    child: <GraduationCap className="w-5 h-5" />,
    business: <Briefcase className="w-5 h-5" />,
}

const DEFAULT_IMAGES: Record<string, string> = {
    term: "/uploads/card_term_insurance.png",
    health: "/uploads/card_health_insurance.png",
    wealth: "/uploads/card_wealth_plans.png",
    retirement: "/uploads/card_retirement.png",
    child: "/uploads/card_child_future.png",
    business: "/uploads/card_business_keyman.png",
}

const getIconKey = (href = "", title = "") => {
    const h = href.toLowerCase(), t = title.toLowerCase()
    if (h.includes("term") || t.includes("term")) return "term"
    if (h.includes("health") || t.includes("health")) return "health"
    if (h.includes("wealth") || h.includes("investment") || t.includes("wealth") || t.includes("investment")) return "wealth"
    if (h.includes("retirement") || t.includes("retirement")) return "retirement"
    if (h.includes("child") || t.includes("child")) return "child"
    if (h.includes("business") || t.includes("business")) return "business"
    return "term"
}

const THEMES: Record<string, {
    badge: string; cta: string
    icon: string; badgeCls: string; accentBar: string
    topBar: string; checkIcon: string; arrow: string
    features: { label: string; href?: string }[]
    titleOverride?: string
    sortOrder: number
}> = {
    term: {
        badge: "Best for Family Protection", cta: "Explore Term Cover",
        titleOverride: "Pure Protection (Term Insurance)",
        sortOrder: 1,
        icon: "text-orange-600 bg-orange-50 border-orange-200",
        badgeCls: "text-orange-700 bg-orange-50 border-orange-200",
        accentBar: "bg-orange-500",
        topBar: "bg-orange-500",
        checkIcon: "text-orange-600 bg-orange-50 border-orange-200",
        arrow: "group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white",
        features: [
            { label: "Sudden death — family gets full sum assured instantly", href: "/term-life/sudden-death" },
            { label: "Return of premium at age 60 — zero-cost exit" },
            { label: "10×–15× annual income pure life cover" }
        ]
    },
    health: {
        badge: "Best for Medical Costs", cta: "Explore Health Cover",
        sortOrder: 2,
        icon: "text-orange-600 bg-orange-50 border-orange-200",
        badgeCls: "text-orange-700 bg-orange-50 border-orange-200",
        accentBar: "bg-orange-500",
        topBar: "bg-orange-500",
        checkIcon: "text-orange-600 bg-orange-50 border-orange-200",
        arrow: "group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white",
        features: [
            { label: "Fear of leaving family with medical debt — fully covered", href: "/health/fear-of-leaving" },
            { label: "No room rent caps or co-payments" },
            { label: "Pre-existing illnesses covered in 2 years" }
        ]
    },
    retirement: {
        badge: "Best for Structured Income", cta: "Explore Retirement Plans",
        sortOrder: 3,
        icon: "text-orange-600 bg-orange-50 border-orange-200",
        badgeCls: "text-orange-700 bg-orange-50 border-orange-200",
        accentBar: "bg-orange-500",
        topBar: "bg-orange-500",
        checkIcon: "text-orange-600 bg-orange-50 border-orange-200",
        arrow: "group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white",
        features: [
            { label: "Fear of living too long — guaranteed income for life" },
            { label: "Compounding corpus with inflation shielding" },
            { label: "Immediate & deferred annuity structures" }
        ]
    },
    child: {
        badge: "Best for Kids Education", cta: "Explore Child Plans",
        sortOrder: 4,
        icon: "text-orange-600 bg-orange-50 border-orange-200",
        badgeCls: "text-orange-700 bg-orange-50 border-orange-200",
        accentBar: "bg-orange-500",
        topBar: "bg-orange-500",
        checkIcon: "text-orange-600 bg-orange-50 border-orange-200",
        arrow: "group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white",
        features: [
            { label: "Insurer pays remaining premium on parent's death" },
            { label: "Milestone payouts for higher education goals" },
            { label: "Built for school & college fee inflation" }
        ]
    },
    wealth: {
        badge: "Best for Wealth Creation", cta: "Explore Wealth Plans",
        sortOrder: 5,
        icon: "text-orange-600 bg-orange-50 border-orange-200",
        badgeCls: "text-orange-700 bg-orange-50 border-orange-200",
        accentBar: "bg-orange-500",
        topBar: "bg-orange-500",
        checkIcon: "text-orange-600 bg-orange-50 border-orange-200",
        arrow: "group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white",
        features: [
            { label: "Tax-free wealth growth + active life cover" },
            { label: "Multi-cap & index fund market-linked growth" },
            { label: "Maturity fully exempt under Sec 10(10D)" }
        ]
    },
    business: {
        badge: "Best for Business Risk", cta: "Explore Business Cover",
        titleOverride: "Business & Keyman Insurance",
        sortOrder: 6,
        icon: "text-orange-600 bg-orange-50 border-orange-200",
        badgeCls: "text-orange-700 bg-orange-50 border-orange-200",
        accentBar: "bg-orange-500",
        topBar: "bg-orange-500",
        checkIcon: "text-orange-600 bg-orange-50 border-orange-200",
        arrow: "group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white",
        features: [
            { label: "Premiums deductible as business expenses" },
            { label: "Keyman cover for essential team members" },
            { label: "Safeguards partnership & asset liability" }
        ]
    },
}

const DEFAULT_THEME = THEMES.term

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
} as const

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 16 } }
} as const

export default function ProductCardsBlock({ data }: { data: ProductCardsBlockData; isHome?: boolean }) {
    const router = useRouter()
    const cards = data.cards || []

    return (
        <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">

            {/* Ambient blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-300 rounded-full blur-[140px] opacity-[0.05] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300 rounded-full blur-[120px] opacity-[0.05] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

                {/* ── Header ── */}
                <div className="max-w-3xl mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200">
                        <Sparkles className="w-3 h-3 text-orange-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Our Insurance Solutions</span>
                    </div>

                    {data.title && (
                        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                            {data.title}
                        </h2>
                    )}
                </div>

                {/* ── Cards Grid ── */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {[...cards].sort((a: any, b: any) => {
                        const keyA = getIconKey(a.href, a.title)
                        const keyB = getIconKey(b.href, b.title)
                        const orderA = (THEMES[keyA] ?? DEFAULT_THEME).sortOrder
                        const orderB = (THEMES[keyB] ?? DEFAULT_THEME).sortOrder
                        return orderA - orderB
                    }).map((card: any, i: number) => {
                        const key = getIconKey(card.href, card.title)
                        const icon = ICON_MAP[key]
                        const theme = THEMES[key] ?? DEFAULT_THEME
                        const badge = card.badge || theme.badge
                        const label = card.ctaText || theme.cta
                        const resolvedImage = card.imageUrl || DEFAULT_IMAGES[key]
                        const isPhoto = !!resolvedImage
                        const displayTitle = theme.titleOverride || card.title

                        return (
                            <motion.div key={i} variants={cardVariants}>
                                <div
                                    role="link"
                                    tabIndex={0}
                                    onClick={() => router.push(card.href || "#")}
                                    onKeyDown={(e) => e.key === "Enter" && router.push(card.href || "#")}
                                    className="group relative rounded-[24px] overflow-hidden border border-slate-200 bg-white flex flex-col min-h-[390px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-200/80 hover:border-slate-300 cursor-pointer animate-border-card"
                                >
                                    {/* Coloured top bar */}
                                    <div className={`h-1 w-full ${theme.topBar} rounded-t-[23px] shrink-0`} />

                                    {/* Image or Icon header */}
                                    {isPhoto ? (
                                        <div className="relative w-full h-[155px] overflow-hidden shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={resolvedImage}
                                                alt={card.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {/* Gradient fade into card body */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent pointer-events-none" />
                                            {/* Badge overlay — frosted glass */}
                                            <div className="absolute top-3 left-3 z-10">
                                                <span className="inline-flex items-center gap-1 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider bg-white/85 backdrop-blur-sm text-orange-700 border border-orange-200 shadow-sm">
                                                    <Sparkles className="w-2.5 h-2.5" />
                                                    {badge}
                                                </span>
                                            </div>
                                            {/* Icon pill — bottom right */}
                                            <div className="absolute bottom-3 right-3 z-10">
                                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-md bg-white/90 backdrop-blur-sm ${theme.icon}`}>
                                                    {icon}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="px-6 pt-6 pb-2 flex items-start justify-between shrink-0">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 group-hover:shadow-md icon-box ${theme.icon}`}>
                                                {icon}
                                            </div>
                                            <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wider mt-1 ${theme.badgeCls}`}>
                                                <Sparkles className="w-2.5 h-2.5" />
                                                {badge}
                                            </span>
                                        </div>
                                    )}

                                    {/* Body */}
                                    <div className="px-6 pt-4 pb-3 flex flex-col gap-4 flex-1">

                                        {/* Title + desc */}
                                        <div className="space-y-1.5">
                                            <h3 className="text-[18px] font-black text-slate-900 tracking-tight leading-snug">
                                                {displayTitle}
                                            </h3>
                                            <p className="text-slate-500 text-[12.5px] font-medium leading-relaxed line-clamp-2">
                                                {card.desc}
                                            </p>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-px bg-slate-100" />

                                        {/* Features */}
                                        <ul className="space-y-2.5 flex-1">
                                            {theme.features.map((feat, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5">
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${theme.checkIcon}`}>
                                                        <Check className="w-2.5 h-2.5 stroke-[3px]" />
                                                    </div>
                                                    {feat.href ? (
                                                        <Link
                                                            href={feat.href}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-[11.5px] font-semibold text-orange-600 leading-relaxed underline underline-offset-2 decoration-orange-300 hover:text-orange-700 hover:decoration-orange-500 transition-colors duration-150"
                                                        >
                                                            {feat.label}
                                                        </Link>
                                                    ) : (
                                                        <span className="text-[11.5px] font-semibold text-slate-600 leading-relaxed">{feat.label}</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA Footer */}
                                    <div className="px-6 pb-6 pt-2 shrink-0">
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <span className="text-[11px] font-black uppercase tracking-widest text-slate-700 group-hover:text-slate-900 transition-colors">
                                                {label}
                                            </span>
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center border border-slate-200 bg-white transition-all duration-200 shrink-0 ${theme.arrow}`}>
                                                <ArrowRight className="w-3.5 h-3.5 transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}