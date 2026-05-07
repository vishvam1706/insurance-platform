"use client"

import { FaqBlockData } from "@/types/blocks"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FaqBlock({ data }: { data: FaqBlockData }) {
    const [open, setOpen] = useState<number | null>(null)

    return (
        <div className="my-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-5">
                Frequently Asked Questions
            </h2>
            <div className="space-y-2">
                {(data.items || []).map((item, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                            onClick={() => setOpen(open === i ? null : i)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                        >
                            <span className="text-sm font-semibold text-slate-900 pr-4">
                                {item.question}
                            </span>
                            {open === i
                                ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                                : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                            }
                        </button>
                        <div className={cn(
                            "overflow-hidden transition-all duration-200",
                            open === i ? "max-h-96" : "max-h-0"
                        )}>
                            <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                                {item.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}