"use client"

import { HomeProcessBlockData } from "@/types/blocks"
import { BarChart2, GitCompare, Languages, FileText, ShieldCheck, Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const ICONS = [
    <BarChart2 className="w-5 h-5" key="0" />,
    <GitCompare className="w-5 h-5" key="1" />,
    <Languages className="w-5 h-5" key="2" />,
    <FileText className="w-5 h-5" key="3" />,
    <ShieldCheck className="w-5 h-5" key="4" />
]

const METADATA = [
    { duration: "Takes 10 mins", outcome: "Goal-aligned assessment" },
    { duration: "30+ plans analyzed", outcome: "100% unbiased shortlist" },
    { duration: "Jargon-free overview", outcome: "100% exclusions clarified" },
    { duration: "Form & medical assist", outcome: "Hassle-free coordinates" },
    { duration: "24/7 dedicated support", outcome: "Lifetime claim protection" }
]

export default function HomeProcess({ data }: { data: HomeProcessBlockData }) {
    const steps = data.steps || []

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 }
        }
    } as const

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 80, damping: 18 }
        }
    } as const

    return (
        <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
            {/* Elegant organic background grids */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

            {/* Soft decorative background glows */}
            <div className="absolute top-0 left-[10%] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20 bg-orange-500/10" />
            <div className="absolute bottom-0 right-[5%] w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-10 bg-amber-500/5" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

                {/* ── Section Header ── */}
                <div className="max-w-3xl mb-16 sm:mb-20 text-left">
                    <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                        <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">The Journey</span>
                    </div>

                    {data.title && (
                        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold !text-white tracking-tight leading-[1.08] font-heading max-w-2xl">
                            {data.title}
                        </h2>
                    )}
                    {data.subtitle && (
                        <p className="text-slate-400 leading-relaxed text-sm sm:text-base font-medium max-w-xl mt-4 font-body">
                            {data.subtitle}
                        </p>
                    )}
                </div>

                {/* ── Staggered Timeline Track ── */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-5 items-stretch mt-8 relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {/* Continuous horizontal flow track behind the cards */}
                    <div className="hidden lg:block absolute top-[140px] left-[5%] right-[5%] h-[2px] bg-slate-800 -z-10" />

                    {steps.map((step, idx) => {
                        const icon = ICONS[idx % ICONS.length]
                        const meta = METADATA[idx % METADATA.length]
                        const isEven = idx % 2 === 1

                        return (
                            <motion.div
                                key={idx}
                                className={`flex flex-col justify-between group relative bg-slate-900/50 border border-slate-800/60 rounded-[28px] p-6 min-h-[380px] transition-all duration-300 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-black/50
                                    ${isEven ? "lg:translate-y-8" : "lg:-translate-y-4"}`}
                                variants={itemVariants}
                            >
                                {/* Active Left Indicator Bar */}
                                <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-md bg-orange-500 transition-transform duration-300 scale-y-0 group-hover:scale-y-100" />

                                <div>
                                    {/* Card Header visual track node */}
                                    <div className="flex items-center justify-between w-full mb-6 shrink-0">
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-orange-500/10 border border-orange-500/20 text-orange-400 transition-all duration-300 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white shrink-0">
                                            {icon}
                                        </div>
                                        <span className="text-[10px] font-black tracking-widest text-slate-500 group-hover:text-orange-400 transition-colors uppercase shrink-0">
                                            Stage {String(idx + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* Main Copy Block */}
                                    <div className="space-y-2 text-left">
                                        <h3 className="text-[17px] font-black !text-white tracking-tight font-heading group-hover:!text-orange-400 transition-colors leading-tight">
                                            {step.title || `Stage ${idx + 1}`}
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed text-[12.5px] font-medium font-body line-clamp-4">
                                            {step.text}
                                        </p>
                                    </div>
                                </div>

                                {/* Custom Hand-crafted Metadata outcomes to eliminate "AI generated" feel */}
                                <div className="mt-6 pt-5 border-t border-slate-800/60 space-y-2 text-left shrink-0">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-orange-400 transition-colors" />
                                        <span>{meta.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10.5px] font-black text-slate-200">
                                        <ArrowRight className="w-3 h-3 text-orange-400" />
                                        <span>{meta.outcome}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Visual padding offset block to account for staggered translation */}
                <div className="h-10 lg:h-20" />
            </div>
        </section>
    )
}
