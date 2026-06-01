"use client"

import { policymineTakeData } from "@/types/blocks"
import { Sparkles, Check, ShieldCheck, Quote } from "lucide-react"
import { motion } from "framer-motion"

export default function policymineTake({ data, isHome = false }: { data: policymineTakeData, isHome?: boolean }) {
    const rawBody = data.body || ""
    const advisorImage = data.advisorImage
    
    // Dynamically split into intro text and bullet points if "Highlights include:" is present
    let introText = rawBody
    let highlights: string[] = []
    
    if (rawBody.includes("Highlights include:")) {
        const parts = rawBody.split("Highlights include:")
        introText = parts[0].trim()
        if (parts[1]) {
            highlights = parts[1].split(",").map(item => item.trim()).filter(Boolean)
        }
    }

    const cardContent = (
        <div
            className="rounded-[32px] p-8 sm:p-10 relative overflow-hidden bg-white border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.025)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.055)] hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 group"
        >
            {/* Absolute Decorative Big Quote Accent - high-end editorial look */}
            <div className="absolute right-8 bottom-6 text-slate-100 pointer-events-none select-none transition-transform duration-500 group-hover:scale-105 group-hover:text-orange-50/50">
                <Quote className="w-32 h-32 stroke-[0.5]" />
            </div>

            {/* Left Brand Gradient Stripe */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-500 to-amber-400" />

            {/* Ambient Background glows */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[60px] pointer-events-none opacity-[0.03]" style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)" }} />
            <div className="absolute -bottom-10 left-10 w-40 h-40 rounded-full blur-[50px] pointer-events-none opacity-[0.02]" style={{ background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)" }} />

            {/* Header: Title and Badge Row */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                {/* Title */}
                <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-orange-50 border border-orange-100 shrink-0 shadow-sm text-orange-500">
                        <Sparkles className="w-5 h-5 animate-[pulse_2s_infinite]" />
                    </div>
                    <div>
                        <span className="text-[10px] font-black tracking-widest text-orange-600 uppercase">Expert Advisory Review</span>
                        <h3
                            className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-none mt-1 font-heading"
                        >
                            {data.title || "Policymine's Take"}
                        </h3>
                    </div>
                </div>

                {/* Unbiased Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 self-start sm:self-auto shrink-0 select-none">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">100% Unbiased</span>
                </div>
            </div>

            {/* Body copy / rich content */}
            <div className="relative z-10 space-y-6 text-left">
                {/* Intro Body Text */}
                {rawBody.startsWith("<") ? (
                    <div 
                        className="text-[15px] sm:text-base leading-relaxed text-slate-600 font-medium font-body prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: introText }}
                    />
                ) : (
                    <p 
                        className="text-[15px] sm:text-base leading-relaxed text-slate-600 font-medium font-body"
                    >
                        {introText}
                    </p>
                )}

                {/* Custom split highlights */}
                {highlights.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                        {highlights.map((highlight, idx) => (
                            <div key={idx} className="flex gap-3 items-start bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100 hover:border-orange-100 hover:bg-orange-50/10 transition-colors duration-200">
                                <div className="w-5 h-5 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                    <Check className="w-3 h-3 text-orange-500 stroke-[3]" />
                                </div>
                                <span 
                                    className="text-[13px] font-bold text-slate-700 leading-snug font-body"
                                >
                                    {highlight}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Verified Advisor Sign-off card ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 mt-8 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                        {/* Advisor Avatar */}
                        {advisorImage ? (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={advisorImage} alt="Policymine Advisor" className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-xs font-black text-white shrink-0 shadow-sm border-2 border-white">
                                PM
                            </div>
                        )}
                        <div className="leading-tight text-left">
                            <div className="flex items-center gap-1">
                                <p className="text-xs font-black text-slate-900 font-heading">Policymine Advisory Desk</p>
                                <span className="inline-flex w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-xs">
                                    <Check className="w-2 h-2 text-white stroke-[3.5]" />
                                </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">IRDAI Certified Advisors</p>
                        </div>
                    </div>

                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-left sm:text-right">
                        <span>Verified Expert Opinion</span>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <section className={isHome ? "py-20 sm:py-28 bg-[#FFFFFF] relative overflow-hidden" : "my-10"}>
            <div className={isHome ? "max-w-5xl mx-auto px-6 lg:px-8" : "w-full"}>
                {isHome ? (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ type: "spring", stiffness: 85, damping: 18 }}
                    >
                        {cardContent}
                    </motion.div>
                ) : (
                    cardContent
                )}
            </div>
        </section>
    )
}
