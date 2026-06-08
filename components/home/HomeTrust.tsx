"use client"

import { HomeTrustBlockData } from "@/types/blocks"
import { ShieldCheck, HeartHandshake, Coins, Award, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const TRUST_ICONS = [
    <ShieldCheck className="w-5 h-5 text-orange-500 transition-transform duration-300 group-hover:scale-110" key="0" />,
    <Coins className="w-5 h-5 text-orange-500 transition-transform duration-300 group-hover:scale-110" key="1" />,
    <HeartHandshake className="w-5 h-5 text-orange-500 transition-transform duration-300 group-hover:scale-110" key="2" />,
    <Award className="w-5 h-5 text-orange-500 transition-transform duration-300 group-hover:scale-110" key="3" />,
    <Sparkles className="w-5 h-5 text-orange-500 transition-transform duration-300 group-hover:scale-110" key="4" />
]

export default function HomeTrust({ data }: { data: HomeTrustBlockData }) {
    const items = data.items || []

    return (
        <section className="py-14 sm:py-20 bg-[#F8FAFC] relative overflow-x-clip border-y border-slate-200/60">
            {/* Ambient decorative gradient */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full pointer-events-none blur-[100px] opacity-[0.05] bg-[radial-gradient(circle,_var(--brand)_0%,_transparent_70%)]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none blur-[100px] opacity-[0.03] bg-[radial-gradient(circle,_#F59E0B_0%,_transparent_70%)]" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-16 items-start">
                    
                    {/* Left Sticky Sidebar */}
                    <div className="lg:sticky lg:top-24 space-y-6">
                        <div className="space-y-4 text-left">
                            <div className="flex items-center gap-3">
                                <span className="h-[2px] w-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
                                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-600 font-heading">
                                    Our Credentials
                                </span>
                            </div>

                            {data.title && (
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-heading">
                                    {data.title}
                                </h2>
                            )}
                        </div>

                        {/* Interactive Verification Badge */}
                        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.02)] flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-5 h-5 text-orange-500" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-black uppercase tracking-widest text-orange-600 font-heading">
                                    Certified Advisors
                                </p>
                                <p className="text-xs text-slate-600 font-semibold mt-1 leading-relaxed font-body">
                                    Operating with complete compliance under direct regulatory frameworks.
                                </p>
                            </div>
                        </div>

                        {/* Advisor Trust Callout with photo */}
                        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.02)] flex items-center gap-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={data.advisorImage || "/images/person2.png"}
                                alt="Expert Advisor"
                                className="w-12 h-12 rounded-full object-cover object-center bg-slate-100 border border-slate-200 shadow-xs shrink-0 animate-pulse"
                            />
                            <div className="text-left">
                                <p className="text-xs font-bold text-slate-900 font-heading">
                                    {data.advisorTitle || "Confused about coverage?"}
                                </p>
                                <p className="text-[11px] text-slate-600 font-semibold leading-normal mt-0.5 font-body">
                                    {data.advisorText || "Talk to MS Bhati or any certified advisor for free. No spam, ever."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium Interactive Trust Timeline */}
                    <div className="space-y-0">
                        {items.map((item, idx) => {
                            const stepNumber = (idx + 1).toString().padStart(2, "0")
                            const icon = TRUST_ICONS[idx % TRUST_ICONS.length]
                            const isLast = idx === items.length - 1

                            return (
                                <motion.div
                                    key={idx}
                                    className="group relative flex gap-5 sm:gap-7 items-stretch"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.06 }}
                                >
                                    {/* Left Side: Mathematically Centered Timeline Icon & Line segment */}
                                    <div className="flex flex-col items-center shrink-0">
                                        <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs transition-all duration-300 group-hover:border-orange-300 group-hover:bg-orange-50 group-hover:shadow-md">
                                            {icon}
                                            {/* Dot glow on active */}
                                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-white scale-0 transition-transform duration-300 group-hover:scale-100" />
                                        </div>
                                        
                                        {!isLast && (
                                            <div className="w-[2px] flex-1 my-2 bg-slate-300/80 group-hover:bg-orange-200 transition-colors duration-300" />
                                        )}
                                    </div>

                                    {/* Right Side: The Editorial Card */}
                                    <div className="relative flex-1 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/70 shadow-sm transition-all duration-300 group-hover:border-orange-200 group-hover:shadow-[0_12px_30px_rgba(249,115,22,0.04)] overflow-hidden text-left mb-6 sm:mb-8">
                                        
                                        {/* Colored sliding top accent on hover */}
                                        <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-orange-500 to-amber-500" />

                                        {/* Header area with custom step badge */}
                                        <div className="flex items-center justify-between mb-3.5">
                                            <span className="text-[10px] font-black tracking-widest text-slate-500 group-hover:text-orange-600 transition-colors font-heading uppercase">
                                                Trust Factor {stepNumber}
                                            </span>
                                            <span className="text-xs font-bold text-slate-400 group-hover:text-orange-400 transition-colors font-heading select-none">
                                                #{stepNumber}
                                            </span>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight leading-tight group-hover:text-orange-600 transition-colors font-heading mb-2">
                                            {item.heading}
                                        </h3>
                                        <p className="leading-relaxed text-slate-600 font-medium text-xs sm:text-[13px] font-body">
                                            {item.body}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </section>
    )
}
