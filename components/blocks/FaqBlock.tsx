"use client"

import { FaqBlockData } from "@/types/blocks"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FaqBlock({ data }: { data: FaqBlockData }) {
    const [open, setOpen] = useState<number | null>(null)

    return (
        <div className="my-10">
            <h2
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
            >
                Frequently Asked Questions
            </h2>
            <div className="space-y-3">
                {(data.items || []).map((item, i) => (
                    <div
                        key={i}
                        className="overflow-hidden rounded-xl transition-shadow duration-200"
                        style={{
                            border: "1px solid #E5E7EB",
                            background: "#FFFFFF",
                        }}
                    >
                        <button
                            onClick={() => setOpen(open === i ? null : i)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-150"
                            style={{ background: open === i ? "#F8F9FA" : "#FFFFFF" }}
                        >
                            <span
                                className="text-sm font-semibold pr-4"
                                style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                            >
                                {item.question}
                            </span>
                            <ChevronDown
                                className={cn(
                                    "w-4 h-4 shrink-0 transition-transform duration-200",
                                    open === i && "rotate-180"
                                )}
                                style={{ color: "#9CA3AF" }}
                            />
                        </button>
                        <div
                            className={cn(
                                "overflow-hidden transition-all duration-200",
                                open === i ? "max-h-96" : "max-h-0"
                            )}
                        >
                            <p
                                className="px-5 pb-5 text-sm leading-relaxed pt-3"
                                style={{
                                    color: "#6B7280",
                                    fontFamily: "var(--font-body)",
                                    borderTop: "1px solid #F3F4F6",
                                }}
                            >
                                {item.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}