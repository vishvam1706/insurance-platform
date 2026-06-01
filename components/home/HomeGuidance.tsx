"use client"

import { HomeGuidanceBlockData } from "@/types/blocks"
import { motion } from "framer-motion"

export default function HomeGuidance({ data }: { data: HomeGuidanceBlockData }) {
    const items = data.items || []

    return (
        <section className="py-14 sm:py-20 bg-white relative overflow-x-clip">

            {/* Asymmetric accent shapes */}
            <div className="absolute top-12 right-[8%] w-[180px] h-[180px] rounded-full pointer-events-none bg-[radial-gradient(circle,_rgba(249,115,22,0.06)_0%,_transparent_70%)]" />
            <div className="absolute bottom-20 left-[5%] w-[120px] h-[120px] rounded-full pointer-events-none bg-[radial-gradient(circle,_rgba(251,191,36,0.08)_0%,_transparent_70%)]" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Section header — editorial style */}
                <motion.div
                    className="max-w-2xl mb-10 sm:mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {/* Eyebrow with hand-drawn line */}
                    <div className="flex items-center gap-3 mb-5">
                        <span className="h-[2px] w-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600 font-heading">
                            Our Approach
                        </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.08] mb-5 text-slate-900 font-heading">
                        {data.title || "Insurance Guidance, Not Just Policy Selling"}
                    </h2>

                    {data.subtitle && (
                        <p className="leading-relaxed font-medium text-slate-600 text-sm sm:text-base max-w-[520px] font-body">
                            {data.subtitle}
                        </p>
                    )}
                </motion.div>

                {/* Main content grid: cards left, quote right */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.42fr] gap-10 lg:gap-14 items-start">

                    {/* Cards — staggered layout */}
                    <div className="space-y-0">
                        {/* Featured first card */}
                        {items.length > 0 && (
                            <motion.div
                                className="group relative mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                            >
                                <div className="relative rounded-2xl bg-white p-7 sm:p-8 overflow-hidden transition-all duration-300 group-hover:shadow-lg border border-slate-200/70 shadow-sm">
                                    {/* Thick left accent */}
                                    <div className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-2xl bg-gradient-to-b from-orange-500 to-amber-400" />

                                    <div className="flex items-start gap-5 pl-3">
                                        <span className="shrink-0 text-2xl font-black leading-none mt-0.5 select-none bg-gradient-to-br from-orange-500 to-orange-400 bg-clip-text text-transparent font-heading">
                                            01
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-bold tracking-tight mb-1.5 transition-colors duration-200 group-hover:text-orange-600 text-slate-800 font-heading">
                                                {items[0].title}
                                            </h3>
                                            <p className="leading-relaxed font-medium text-slate-600 text-sm font-body">
                                                {items[0].desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Remaining cards — 2-column grid with connected numbers */}
                        {items.length > 1 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                {items.slice(1).map((item, idx) => {
                                    const num = (idx + 2).toString().padStart(2, "0")
                                    return (
                                        <motion.div
                                            key={idx}
                                            className="group relative"
                                            initial={{ opacity: 0, y: 16 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-40px" }}
                                            transition={{
                                                duration: 0.4,
                                                ease: "easeOut",
                                                delay: idx * 0.07,
                                            }}
                                        >
                                            <div className="relative h-full rounded-2xl bg-white p-6 sm:p-7 overflow-hidden transition-all duration-300 group-hover:shadow-lg border border-slate-200/70 shadow-sm">
                                                {/* Hover top border reveal */}
                                                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-500 to-amber-400" />

                                                {/* Number */}
                                                <span className="block text-sm font-black mb-4 select-none text-slate-400 font-heading">
                                                    {num}
                                                </span>

                                                <h3 className="text-base font-bold tracking-tight mb-2 transition-colors duration-200 group-hover:text-orange-600 text-slate-800 font-heading">
                                                    {item.title}
                                                </h3>
                                                <p className="leading-relaxed font-medium text-slate-600 text-xs sm:text-[13px] font-body">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Quote column — editorial pull-quote style */}
                    {data.quote && (
                        <motion.div
                            className="lg:sticky lg:top-28"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                        >
                            <div className="relative rounded-2xl p-7 sm:p-8 overflow-hidden bg-gradient-to-br from-orange-50/80 via-orange-50/20 to-white border border-orange-100">
                                {/* Large decorative quote mark */}
                                <span className="absolute -top-2 -left-1 text-[7rem] leading-none font-black pointer-events-none select-none text-orange-500/10 font-serif">
                                    &ldquo;
                                </span>

                                <div className="relative z-10">
                                    <p className="font-semibold leading-[1.65] mb-6 text-slate-800 text-sm sm:text-base font-body">
                                        {data.quote}
                                    </p>

                                    {/* Divider */}
                                    <div className="w-10 h-[2px] rounded-full mb-5 bg-gradient-to-r from-orange-500 to-amber-400" />

                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 select-none bg-gradient-to-br from-orange-500 to-orange-400 text-white shadow-md">
                                            GB
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold leading-none text-slate-900">
                                                Gaurav Bhat
                                            </p>
                                            <p className="text-[11px] font-medium mt-1 text-slate-500">
                                                Lead Advisor, Policymine
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Small trust badge below quote */}
                            <div className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-emerald-500" />
                                <span className="text-[11px] font-semibold text-slate-600 font-body">
                                    Advice-first approach since 2018
                                </span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
}
