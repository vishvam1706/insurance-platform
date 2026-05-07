"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { InsurerSelectorData } from "@/types/blocks"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function InsurerSelector({ data }: { data: InsurerSelectorData }) {
    const router = useRouter()
    const [selected, setSelected] = useState<string[]>([])

    function toggle(slug: string) {
        setSelected((prev) =>
            prev.includes(slug)
                ? prev.filter((s) => s !== slug)
                : prev.length < 4 ? [...prev, slug] : prev
        )
    }

    function handleCompare() {
        if (selected.length < 2) return
        router.push(`/health/compare?plans=${selected.join(",")}`)
    }

    return (
        <div className="my-8 bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h2 className="font-semibold text-slate-900 mb-1">{data.label}</h2>
            {data.helpText && (
                <p className="text-slate-500 text-sm mb-5">{data.helpText}</p>
            )}

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-6">
                {(data.insurers || []).map((insurer) => {
                    const isSelected = selected.includes(insurer.slug)
                    return (
                        <button
                            key={insurer.slug}
                            onClick={() => toggle(insurer.slug)}
                            className={cn(
                                "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-xs font-medium",
                                isSelected
                                    ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                            )}
                        >
                            {insurer.logo ? (
                                <Image
                                    src={insurer.logo}
                                    alt={insurer.name}
                                    width={48}
                                    height={32}
                                    className="object-contain h-8"
                                />
                            ) : (
                                <div className="w-12 h-8 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-400">
                                    {insurer.name.substring(0, 2)}
                                </div>
                            )}
                            <span className="text-center leading-tight">{insurer.name}</span>
                        </button>
                    )
                })}
            </div>

            <div className="flex items-center gap-3">
                <Button
                    onClick={handleCompare}
                    disabled={selected.length < 2}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                    Compare {selected.length > 0 ? `(${selected.length} selected)` : ""}
                </Button>
                {selected.length > 0 && (
                    <button
                        onClick={() => setSelected([])}
                        className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        Clear
                    </button>
                )}
                {selected.length < 2 && (
                    <p className="text-xs text-slate-400">Select at least 2 insurers to compare</p>
                )}
            </div>
        </div>
    )
}