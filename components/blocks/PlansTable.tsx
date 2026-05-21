"use client"

import { PlansTableData } from "@/types/blocks"
import { Star, Award, ShieldCheck, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="inline-flex items-center gap-1.5 bg-amber-50/70 border border-amber-100/60 px-3 py-1 rounded-xl shrink-0 select-none shadow-sm">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
            <span className="text-sm font-black text-amber-800 font-mono leading-none">{rating.toFixed(2)}</span>
        </div>
    )
}

export default function PlansTable({ data }: { data: PlansTableData }) {
    // Stagger animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            }
        }
    } as const

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    } as const

    const riderVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 150, damping: 12 }
        }
    } as const

    return (
        <div className="my-20">
            {/* Header section with badge and subtitle */}
            {data.title && (
                <div className="mb-10 text-left">
                    <span 
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm select-none"
                        style={{ background: "var(--brand-light)", color: "var(--brand-dark)", border: "1px solid var(--brand-100)" }}
                    >
                        <Award className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                        PM Partners Recommended Term Plans
                    </span>
                    <h2 
                        className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight" 
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {data.title}
                    </h2>
                    {data.introText && (
                        <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed max-w-3xl font-medium" style={{ fontFamily: "var(--font-body)" }}>
                            {data.introText}
                        </p>
                    )}
                </div>
            )}

            {/* List of plans */}
            <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {(data.rows || []).map((row, i) => {
                    // Split comma-separated riders into neat tags
                    const riderTags = row.riders 
                        ? row.riders.split(",").map(r => r.trim()).filter(Boolean)
                        : []

                    return (
                        <motion.div
                            key={i}
                            className="group relative rounded-[32px] p-8 sm:p-10 border border-emerald-100 bg-white shadow-[0_4px_25px_rgba(0,179,134,0.01)] overflow-hidden cursor-default"
                            variants={cardVariants}
                            whileHover={{ 
                                y: -6,
                                borderColor: "rgba(0,179,134,0.35)",
                                boxShadow: "0 20px 50px rgba(0,179,134,0.08)"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {/* Gradient glow line on top hover */}
                            <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="flex flex-col gap-8">
                                {/* Desktop Horizontal Grid */}
                                <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] gap-6 items-center">
                                    
                                    {/* Column 1: Plan / Insurer Name */}
                                    <div className="text-left space-y-2">
                                        <div className="flex items-center gap-2.5 flex-wrap">
                                            <h3 
                                                className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight transition-colors duration-200 group-hover:text-emerald-700"
                                                style={{ fontFamily: "var(--font-heading)" }}
                                            >
                                                {row.plan}
                                            </h3>
                                            {i === 0 && (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 select-none animate-pulse">
                                                    <Sparkles className="w-3 h-3 shrink-0" /> Best Choice
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Column 2: Claim Settlement Ratio */}
                                    <div className="flex flex-col items-start lg:items-center text-left">
                                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                                            Claim Settlement
                                        </p>
                                        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-2xl shadow-sm">
                                            <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                                            <span className="text-sm sm:text-base font-extrabold text-emerald-700 font-mono">{row.csr}</span>
                                        </div>
                                    </div>

                                    {/* Column 3: PM Partners Rating */}
                                    <div className="flex flex-col items-start lg:items-center text-left">
                                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                                            PM Partners Rating
                                        </p>
                                        {row.pmpartnersRating ? (
                                            <StarRating rating={row.pmpartnersRating} />
                                        ) : (
                                            <span className="text-base font-extrabold text-slate-700 font-mono">{row.rating}</span>
                                        )}
                                    </div>

                                    {/* Column 4: Consult Button */}
                                    <div className="flex justify-start lg:justify-end">
                                        <motion.div 
                                            className="w-full sm:w-auto"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <Link 
                                                href="/contact"
                                                className="btn-primary flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-widest rounded-2xl w-full sm:w-auto shadow-md"
                                                style={{
                                                    background: "linear-gradient(135deg, var(--brand) 0%, #009c74 100%)",
                                                }}
                                            >
                                                Consult Free
                                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
                                            </Link>
                                        </motion.div>
                                    </div>

                                </div>

                                {/* Divider between main info and riders */}
                                {riderTags.length > 0 && (
                                    <div className="h-px bg-slate-100 w-full" />
                                )}

                                {/* Bottom section inside card: Rider Badges */}
                                {riderTags.length > 0 && (
                                    <div className="text-left space-y-3.5">
                                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400" style={{ fontFamily: "var(--font-heading)" }}>
                                            Included Essential Coverages & Perks
                                        </p>
                                        <div className="flex flex-wrap gap-2.5">
                                            {riderTags.map((tag, idx) => (
                                                <motion.span 
                                                    key={idx}
                                                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl text-xs font-bold bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-emerald-100 group-hover:bg-emerald-50/20 group-hover:text-slate-800 transition-all duration-300"
                                                    style={{ fontFamily: "var(--font-body)" }}
                                                    variants={riderVariants}
                                                >
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                                    {tag}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    )
}
