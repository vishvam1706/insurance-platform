"use client"

import { FeaturesTableData } from "@/types/blocks"
import { ShieldCheck, ClipboardList, Info } from "lucide-react"
import { motion } from "framer-motion"

function renderFeatureDetail(featureText: string) {
    const trimmed = featureText.trim()
    const lower = trimmed.toLowerCase()

    // High value keywords
    if (
        lower === "no limits" || 
        lower === "no limit" || 
        lower === "unlimited" || 
        lower === "no co-payment" || 
        lower === "no co-pay" || 
        lower === "covered" || 
        lower === "100% covered" ||
        lower === "available"
    ) {
        return (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm select-none">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {featureText}
            </span>
        )
    }

    // Percentage or numeric features
    const isPercentage = /^\d+(\.\d+)?%$/.test(trimmed)
    if (isPercentage) {
        return (
            <span className="inline-flex items-center bg-emerald-50/70 border border-emerald-100/60 px-3 py-1 rounded-xl text-sm font-black text-emerald-800 font-mono shadow-sm">
                {trimmed}
            </span>
        )
    }

    return (
        <span className="text-slate-500 font-medium text-sm md:text-base leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {featureText}
        </span>
    )
}

export default function FeaturesTable({ data }: { data: FeaturesTableData }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    } as const

    const rowVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 80, damping: 15 }
        }
    } as const

    return (
        <div className="my-16">
            {data.title && (
                <div className="flex items-center gap-3 mb-6 text-left">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                        <ClipboardList className="w-5 h-5" />
                    </div>
                    <h3 
                        className="text-xl md:text-2xl font-black text-slate-900 tracking-tight" 
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {data.title}
                    </h3>
                </div>
            )}
            
            <div className="overflow-x-auto rounded-[32px] shadow-[0_4px_30px_rgba(0,179,134,0.01)] hover:shadow-[0_20px_50px_rgba(0,179,134,0.06)] border border-slate-100 bg-white transition-all duration-300">
                <table className="w-full border-collapse">
                    <thead>
                        <tr style={{ background: "linear-gradient(180deg, #FAFAF9 0%, #F5F5F4 100%)", borderBottom: "1px solid #E7E5E4" }}>
                            <th 
                                className="text-left px-8 py-5.5 font-extrabold text-xs md:text-sm tracking-widest uppercase select-none w-1/3" 
                                style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
                            >
                                Aspect / Parameter
                            </th>
                            <th 
                                className="text-left px-8 py-5.5 font-extrabold text-xs md:text-sm tracking-widest uppercase select-none" 
                                style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
                            >
                                Coverage details
                            </th>
                        </tr>
                    </thead>
                    <motion.tbody
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {(data.rows || []).map((row, i) => (
                            <motion.tr 
                                key={i} 
                                className="transition-colors hover:bg-emerald-50/20 group/row" 
                                style={{ background: i % 2 === 0 ? "#FFFFFF" : "#FAF9F6" }}
                                variants={rowVariants}
                            >
                                <td
                                    className="px-8 py-5 md:py-6 align-top"
                                    style={{ borderBottom: i < data.rows.length - 1 ? "1px solid #F1F0EC" : "none" }}
                                >
                                    <div className="flex items-start gap-2.5 transition-transform duration-200 group-hover/row:translate-x-0.5">
                                        <span className="w-1.5 h-5 rounded-full bg-emerald-500/80 shrink-0 mt-0.5" />
                                        <span 
                                            className="font-extrabold text-slate-800 text-sm md:text-base tracking-tight" 
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {row.aspect}
                                        </span>
                                    </div>
                                </td>
                                <td
                                    className="px-8 py-5 md:py-6 align-top"
                                    style={{ borderBottom: i < data.rows.length - 1 ? "1px solid #F1F0EC" : "none" }}
                                >
                                    <div className="transition-transform duration-200 group-hover/row:translate-x-0.5">
                                        {renderFeatureDetail(row.feature)}
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </div>
            
            {data.note && (
                <div className="flex items-start gap-2 mt-4 px-2 select-none">
                    <Info className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                    <p className="text-xs md:text-sm italic text-slate-400 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                        * {data.note}
                    </p>
                </div>
            )}
        </div>
    )
}

