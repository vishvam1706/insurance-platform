"use client"

import { FaqBlockData } from "@/types/blocks"
import { useState } from "react"
import { Plus, Minus, HelpCircle } from "lucide-react"

export default function FaqBlock({ data }: { data: FaqBlockData }) {
    const [open, setOpen] = useState<number | null>(null)

    return (
        <div className="-mx-6 sm:-mx-8 my-12 animate-fade-up">
            <div
                className="px-8 sm:px-16 py-16 bg-slate-50/20 border-t border-b border-emerald-100 relative overflow-hidden"
            >
                <div className="absolute inset-0 gold-mesh opacity-30 pointer-events-none" />

                {/* Ambient glows */}
                <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full pointer-events-none opacity-[0.02] blur-[60px]"
                    style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />

                {/* Header */}
                <div className="mb-12 text-center md:text-left relative z-10">
                    <span
                        className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm"
                        style={{ background: "var(--brand-light)", color: "var(--brand-dark)", border: "1px solid var(--brand-100)" }}
                    >
                        <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                        FAQ
                    </span>
                    <h2
                        className="text-3.5xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* Accordion items */}
                <div className="space-y-4 max-w-3xl relative z-10 text-left">
                    {(data.items || []).map((item, i) => {
                        const isOpen = open === i
                        const itemNumber = i + 1

                        return (
                            <div
                                key={i}
                                className="relative overflow-hidden rounded-2xl transition-all duration-300 border bg-white"
                                style={{
                                    borderColor: isOpen ? "var(--brand)" : "var(--brand-100)",
                                    boxShadow: isOpen ? "0 12px 30px rgba(0, 179, 134, 0.05)" : "0 4px 20px rgba(10, 17, 40, 0.01)",
                                }}
                            >
                                {/* Left green active highlight line */}
                                <div 
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#00B386] transition-transform duration-300 origin-left"
                                    style={{
                                        transform: isOpen ? "scaleX(1)" : "scaleX(0)",
                                    }}
                                />

                                {/* Question Header */}
                                <button
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between gap-5 px-6 py-5 text-left transition-colors duration-300"
                                    style={{ background: isOpen ? "var(--brand-light)" : "#FFFFFF" }}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Number prefix */}
                                        <span
                                            className="shrink-0 w-7 h-7 rounded-full text-[11px] font-black flex items-center justify-center border transition-all"
                                            style={{
                                                background: isOpen ? "var(--text-primary)" : "#FFFFFF",
                                                borderColor: isOpen ? "var(--text-primary)" : "var(--brand-100)",
                                                color: isOpen ? "#FFFFFF" : "var(--brand-dark)",
                                            }}
                                        >
                                            {itemNumber < 10 ? `0${itemNumber}` : itemNumber}
                                        </span>

                                        <span
                                            className="font-extrabold text-sm sm:text-base leading-snug text-slate-800 transition-colors group-hover:text-emerald-700"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {item.question}
                                        </span>
                                    </div>

                                    {/* Plus / Minus Indicator */}
                                    <span
                                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all border"
                                        style={{
                                            background: isOpen ? "var(--brand-dark)" : "#FFFFFF",
                                            borderColor: isOpen ? "var(--brand-dark)" : "var(--brand-100)",
                                            color: isOpen ? "#FFFFFF" : "var(--text-muted)",
                                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                        }}
                                    >
                                        {isOpen ? (
                                            <Minus className="w-3.5 h-3.5" />
                                        ) : (
                                            <Plus className="w-3.5 h-3.5" />
                                        )}
                                    </span>
                                </button>

                                {/* Answer container — CSS Grid high performance transition */}
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                                        transition: "grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
                                    }}
                                >
                                    <div style={{ overflow: "hidden" }}>
                                        <div 
                                            className="px-6 pb-6 pl-[56px] text-left"
                                            style={{
                                                borderTop: "1px solid var(--brand-100)",
                                            }}
                                        >
                                            <p
                                                className="text-xs sm:text-sm leading-relaxed pt-4 text-slate-600 font-medium"
                                                style={{ fontFamily: "var(--font-body)" }}
                                            >
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
