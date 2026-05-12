"use client"

import { FaqBlockData } from "@/types/blocks"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FaqBlock({ data }: { data: FaqBlockData }) {
    const [open, setOpen] = useState<number | null>(null)

    return (
        <div className="-mx-6 sm:-mx-8 my-0">
            <div
                className="px-8 sm:px-12 py-12"
                style={{
                    background: "linear-gradient(180deg, #F0FDF8 0%, #F7F8FA 100%)",
                    borderTop: "1px solid var(--brand-100)",
                    borderBottom: "1px solid var(--brand-100)",
                }}
            >
                {/* Header */}
                <div className="mb-8">
                    <span
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                        style={{ background: "var(--brand-light)", color: "var(--brand)", border: "1px solid var(--brand-100)" }}
                    >
                        FAQ
                    </span>
                    <h2
                        className="text-2xl font-bold"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                    >
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* Accordion items */}
                <div className="space-y-2.5 max-w-2xl">
                    {(data.items || []).map((item, i) => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-xl transition-all duration-200"
                            style={{
                                border: "1px solid var(--border)",
                                background: "#FFFFFF",
                                boxShadow: open === i ? "0 4px 16px rgba(0,179,134,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
                            }}
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-150"
                                style={{ background: open === i ? "var(--brand-light)" : "#FFFFFF" }}
                            >
                                <span
                                    className="text-sm font-semibold pr-4"
                                    style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                                >
                                    {item.question}
                                </span>
                                <ChevronDown
                                    className={cn("w-4 h-4 shrink-0 transition-transform duration-200", open === i && "rotate-180")}
                                    style={{ color: open === i ? "var(--brand)" : "var(--text-muted)" }}
                                />
                            </button>
                            <div className={cn("overflow-hidden transition-all duration-200", open === i ? "max-h-96" : "max-h-0")}>
                                <p
                                    className="px-5 pb-5 text-sm leading-relaxed pt-3"
                                    style={{
                                        color: "var(--text-secondary)",
                                        fontFamily: "var(--font-body)",
                                        borderTop: "1px solid var(--border-light)",
                                    }}
                                >
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
