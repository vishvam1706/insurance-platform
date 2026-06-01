"use client"

import { ComparisonTableData } from "@/types/blocks"
import { Check, X, Scale } from "lucide-react"
import { motion } from "framer-motion"

function renderCellContent(cell: string, colIndex: number) {
    const trimmed = cell.trim()
    const lower = trimmed.toLowerCase()
    
    if (lower === "yes" || lower === "true" || lower === "✓" || lower === "available") {
        return (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-[var(--brand-light)] text-[var(--brand-dark)] border border-[var(--brand-100)] shadow-sm select-none">
                <Check className="w-3.5 h-3.5 text-[var(--brand)] stroke-[3]" />
                <span>Yes</span>
            </span>
        )
    }
    if (lower === "no" || lower === "false" || lower === "✗" || lower === "not available") {
        return (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-50 text-slate-400 border border-slate-100 select-none">
                <X className="w-3.5 h-3.5 text-slate-400 stroke-[3]" />
                <span>No</span>
            </span>
        )
    }
    
    // Check if it's a percentage (e.g. 98.5% or 99%)
    const isPercentage = /^\d+(\.\d+)?%$/.test(trimmed)
    if (isPercentage) {
        return (
            <span className="inline-flex items-center bg-[var(--brand-light)]/70 border border-[var(--brand-100)]/60 px-3 py-1 rounded-xl text-sm font-black text-[var(--brand-dark)] font-mono shadow-sm">
                {trimmed}
            </span>
        )
    }

    // Check if it is a number or currency (e.g. Rs. 5000 or ₹10,000 or 15 Lakhs)
    const isNumeric = /^[₹$]?\d+/.test(trimmed) || trimmed.toLowerCase().includes("lakh") || trimmed.toLowerCase().includes("crore")
    if (isNumeric && colIndex > 0) {
        return (
            <span className="text-slate-800 font-extrabold text-sm md:text-base font-mono">
                {trimmed}
            </span>
        )
    }

    // Default rendering
    return (
        <span 
            className={colIndex === 0 ? "font-extrabold text-slate-800 text-sm md:text-base tracking-tight" : "text-slate-500 font-medium text-sm md:text-base"}
            style={{ fontFamily: colIndex === 0 ? "var(--font-heading)" : "var(--font-body)" }}
        >
            {cell}
        </span>
    )
}

export default function ComparisonTable({ data, isHome = false }: { data: ComparisonTableData, isHome?: boolean }) {
    const columns = data.columns || []
    const rows = data.rows || []

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
        <div className={isHome ? "py-12 sm:py-16" : "my-12 sm:my-16"}>
            <div className={isHome ? "max-w-7xl mx-auto px-6 lg:px-8" : "w-full"}>
            {data.title && (
                <div className="flex items-center gap-3 mb-6 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[var(--brand-light)] border border-[var(--brand-100)] flex items-center justify-center text-[var(--brand)] shadow-sm shrink-0">
                        <Scale className="w-5 h-5" />
                    </div>
                    <h3 
                        className="font-black text-slate-900 tracking-tight" 
                        style={{ fontSize: "var(--fs-h2)", fontFamily: "var(--font-heading)" }}
                    >
                        {data.title}
                    </h3>
                </div>
            )}
            
            <div className="overflow-x-auto rounded-[32px] shadow-[0_4px_30px_rgba(249,115,22,0.01)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.06)] border border-slate-100 bg-white transition-all duration-300">
                <table className="w-full border-collapse">
                    <thead>
                        <tr style={{ background: "linear-gradient(180deg, #FAFAF9 0%, #F5F5F4 100%)", borderBottom: "1px solid #E7E5E4" }}>
                            {columns.map((col, i) => (
                                <th 
                                    key={i} 
                                    className="text-left px-8 py-5.5 font-extrabold text-xs md:text-sm tracking-widest uppercase select-none" 
                                    style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <motion.tbody
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {rows.map((row, ri) => (
                            <motion.tr 
                                key={ri} 
                                className="transition-colors hover:bg-[var(--brand-light)]/40 group/row" 
                                style={{ background: ri % 2 === 0 ? "#FFFFFF" : "#FAF9F6" }}
                                variants={rowVariants}
                            >
                                {row.map((cell, ci) => (
                                    <td 
                                        key={ci} 
                                        className="px-8 py-5 md:py-6 align-middle leading-relaxed" 
                                        style={{
                                            borderBottom: ri < rows.length - 1 ? "1px solid #F1F0EC" : "none",
                                        }}
                                    >
                                        <div className="transition-transform duration-200 group-hover/row:translate-x-0.5">
                                            {renderCellContent(cell, ci)}
                                        </div>
                                    </td>
                                ))}
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </div>
            </div>
        </div>
    )
}

