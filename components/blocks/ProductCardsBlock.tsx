"use client"

import { ProductCardsBlockData } from "@/types/blocks"
import Link from "next/link"
import { Shield, Heart, ArrowRight, Sparkles } from "lucide-react"

const ICON_MAP: Record<string, React.ReactNode> = {
    term: <Shield className="w-8 h-8 text-[var(--brand-dark)]" />,
    health: <Heart className="w-8 h-8 text-[var(--brand-dark)]" />,
}

export default function ProductCardsBlock({ data }: { data: ProductCardsBlockData }) {
    const cards = data.cards || []

    return (
        <section className="py-12 bg-[var(--brand-light)]/45 border-b border-[var(--brand-100)]/60 relative overflow-hidden animate-fade-up">
            <div className="absolute inset-0 gold-mesh opacity-20 pointer-events-none" />
            
            {/* Soft decorative ambient blurs */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-[0.03]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-[0.03]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div className="text-left">
                        <span 
                            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2.5 shadow-xs border"
                            style={{ 
                                background: "var(--brand-light)", 
                                color: "var(--brand-dark)", 
                                borderColor: "var(--brand-100)", 
                                fontFamily: "var(--font-heading)" 
                            }}
                        >
                            PM Partners Offers
                        </span>
                        {data.title && (
                            <h2
                                className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {data.title}
                            </h2>
                        )}
                    </div>
                </div>

                {/* Symmetrical Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                    {cards.map((card: any, i: number) => {
                        const isHealth = card.href?.includes("health")
                        const icon = ICON_MAP[isHealth ? "health" : "term"]
                        const badgeText = card.badge || (isHealth ? "Best for Medical Protection" : "Best for Family Protection")
                        const buttonLabel = card.ctaText || (isHealth ? "Explore Health Insurance" : "Explore Term Insurance")

                        const isPhotoCard = !!card.imageUrl

                        return (
                            <Link
                                key={i}
                                href={card.href || "#"}
                                className="group relative rounded-[24px] overflow-hidden border border-slate-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:border-[var(--brand)]/30 hover:shadow-[0_16px_32px_rgba(0,179,134,0.03)] transition-all duration-300 hover:-translate-y-0.5 grid grid-cols-1 sm:grid-cols-[1.35fr_0.65fr] h-full min-h-[220px]"
                            >
                                {/* Left Content Column */}
                                <div className="p-5 sm:p-6 flex flex-col justify-between h-full order-last sm:order-first space-y-4">
                                    <div className="space-y-1.5 text-left">
                                        {/* Dynamic Badges */}
                                        <div className="flex flex-wrap gap-1.5 mb-1">
                                            <span 
                                                className="text-[9px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 select-none"
                                                style={{ 
                                                    background: "var(--brand-light)", 
                                                    color: "var(--brand-dark)", 
                                                    borderColor: "var(--brand-100)" 
                                                }}
                                            >
                                                <Sparkles className="w-2.5 h-2.5 text-[var(--brand)] animate-pulse" />
                                                {badgeText}
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
                                            {card.title}
                                        </h3>

                                        {/* Description */}
                                        <p
                                            className="text-xs text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-3 mt-1"
                                            style={{ fontFamily: "var(--font-body)" }}
                                        >
                                            {card.desc}
                                        </p>
                                    </div>

                                    {/* Action link */}
                                    <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[var(--brand-dark)] group-hover:text-[var(--brand)] transition-colors pt-2 border-t border-slate-50 w-full justify-between">
                                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">{buttonLabel}</span>
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[var(--brand)]" />
                                    </div>
                                </div>

                                {/* Right Visual Media Column */}
                                <div className="order-first sm:order-last relative w-full min-h-[140px] sm:min-h-full overflow-hidden bg-slate-50 border-b sm:border-b-0 sm:border-l border-slate-100">
                                    {isPhotoCard ? (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={card.imageUrl}
                                                alt={card.title}
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
                                                {icon}
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
    )
}
