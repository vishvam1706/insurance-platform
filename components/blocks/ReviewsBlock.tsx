"use client"

import { useState } from "react"
import { ReviewsBlockData } from "@/types/blocks"
import { Star, ShieldCheck, Quote, Sparkles, Check, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const VERIFIED_BADGES = [
    "Verified Term Cover",
    "Verified Health Floater",
    "Verified Buyer",
    "Verified Claim Support"
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
} as const

const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 16 } }
} as const

export default function ReviewsBlock({ data, isHome = false }: { data: ReviewsBlockData, isHome?: boolean }) {
    const rating = data.rating || 4.9
    const totalCount = data.totalCount || 21000
    const items = data.items || []

    const [showAll, setShowAll] = useState(false)

    // Smoothly limit list initially to 4 items so it is compact, staggering beautifully
    const visibleItems = showAll ? items : items.slice(0, 4)
    const hasMore = items.length > 4

    return (
        <section className={`py-16 sm:py-24 bg-slate-950 border-t border-slate-900 relative overflow-x-clip ${isHome ? "py-20 sm:py-32" : ""}`}>

            {/* Elegant backdrop blobs */}
            <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-[0.04] bg-orange-500" />
            <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-[0.03] bg-amber-500" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

                {/* ── Asymmetric Layout Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.5fr] gap-12 lg:gap-16 items-start">

                    {/* ── Left Column: Sticky Trust Board ── */}
                    <div className="lg:sticky lg:top-28 space-y-8 text-left">

                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">Client Reviews</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold !text-white tracking-tight leading-[1.08] font-heading">
                                People trust us with their families.
                            </h2>

                            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-body">
                                Read genuine feedback from {totalCount.toLocaleString()}+ Indian families who protected their future with Policymine's spam-free advisory.
                            </p>
                        </div>

                        {/* Interactive Satisfaction Board */}
                        <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 space-y-5 shadow-sm">
                            <div className="flex items-center gap-3 pb-4 border-b border-slate-800/60">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-4 h-4 fill-orange-500 text-orange-500" />
                                    ))}
                                </div>
                                <span className="text-sm font-black text-slate-200">
                                    {rating} / 5.0 Rating
                                </span>
                            </div>

                            <ul className="space-y-3">
                                {[
                                    "100K+ protected Indian families",
                                    "₹400Cr+ premium active assets managed",
                                    "24/7 dedicated priority claims desk"
                                ].map((stat, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-[12px] font-bold text-slate-300">
                                        <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-orange-400 stroke-[3.5px]" />
                                        </div>
                                        <span>{stat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ── Right Column: Testimonials Grid & Show More ── */}
                    <div className="space-y-8 flex flex-col items-center">
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                        >
                            <AnimatePresence mode="popLayout">
                                {visibleItems.map((review, i) => {
                                    const badgeText = VERIFIED_BADGES[i % VERIFIED_BADGES.length]
                                    const isEven = i % 2 === 1

                                    return (
                                        <motion.div
                                            key={review.name + i}
                                            layout
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className={`group relative overflow-hidden rounded-[26px] p-6 sm:p-7 border border-slate-800/80 bg-slate-900/40 flex flex-col justify-between min-h-[300px] transition-all duration-300 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-black/50
                                                ${isEven ? "md:translate-y-6" : ""}`}
                                        >
                                            {/* Quote Graphic Overlay */}
                                            <Quote className="absolute right-6 top-6 w-12 h-12 text-orange-500/[0.04] pointer-events-none select-none transition-transform duration-500 group-hover:scale-110" />

                                            <div>
                                                {/* Card Header: Verification Pill + Rating */}
                                                <div className="flex items-center justify-between w-full mb-5 pb-3 border-b border-slate-800/60 shrink-0">
                                                    <span className="inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full border bg-orange-500/10 border-orange-500/20 text-orange-400 uppercase tracking-wider">
                                                        <ShieldCheck className="w-3 h-3 text-orange-400 shrink-0" />
                                                        {badgeText}
                                                    </span>
                                                    <div className="flex gap-0.5">
                                                        {[1, 2, 3, 4, 5].map((s) => (
                                                            <Star key={s} className="w-3 h-3 fill-orange-500 text-orange-500" />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Review Quote Body */}
                                                <p className="text-[13px] leading-relaxed font-semibold text-slate-300 font-body text-left line-clamp-5">
                                                    &ldquo;{review.body}&rdquo;
                                                </p>
                                            </div>

                                            {/* Author Footer info */}
                                            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-3 shrink-0 text-left">
                                                {/* Custom Avatar Gradient */}
                                                <div className="w-9 h-9 rounded-full text-[11px] font-black flex items-center justify-center shrink-0 bg-gradient-to-tr from-orange-500 to-amber-500 text-white select-none">
                                                    {review.initials}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black !text-white leading-none">
                                                        {review.name}
                                                    </p>
                                                    <p className="text-[9.5px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
                                                        Verified Customer
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </motion.div>

                        {/* Stagger Offset Spacing adjustment for expandable button */}
                        <div className="h-4" />

                        {/* Interactive Show More / Show Less Branded Toggle Button */}
                        {hasMore && (
                            <motion.button
                                layout
                                onClick={() => setShowAll(!showAll)}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/20 bg-orange-500/10 hover:bg-orange-500/20 text-xs font-black uppercase tracking-wider text-orange-400 transition-all duration-200 shrink-0 cursor-pointer shadow-sm active:scale-[0.98]"
                            >
                                <span>{showAll ? "Show Less Reviews" : `Show All Reviews (${items.length})`}</span>
                                {showAll ? (
                                    <ChevronUp className="w-4 h-4 transition-transform duration-200 stroke-[3px]" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 transition-transform duration-200 stroke-[3px]" />
                                )}
                            </motion.button>
                        )}
                    </div>

                </div>
            </div>
        </section>
    )
}
