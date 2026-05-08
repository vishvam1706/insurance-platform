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
        <div
            className="my-10 rounded-2xl p-6"
            style={{
                background: "#F8F9FA",
                border: "1px solid #E5E7EB",
            }}
        >
            <h2
                className="font-bold mb-2"
                style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
            >
                {data.label}
            </h2>
            {data.helpText && (
                <p
                    className="text-sm mb-6"
                    style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}
                >
                    {data.helpText}
                </p>
            )}

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-8">
                {(data.insurers || []).map((insurer) => {
                    const isSelected = selected.includes(insurer.slug)
                    return (
                        <button
                            key={insurer.slug}
                            onClick={() => toggle(insurer.slug)}
                            className={cn(
                                "flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 text-xs font-semibold",
                            )}
                            style={{
                                border: isSelected ? "2px solid #2563EB" : "1px solid #E5E7EB",
                                background: isSelected ? "#EFF6FF" : "#FFFFFF",
                                color: isSelected ? "#1D4ED8" : "#374151",
                                fontFamily: "var(--font-body)",
                            }}
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
                                <div
                                    className="w-12 h-8 rounded flex items-center justify-center text-xs font-bold"
                                    style={{ background: "#F3F4F6", color: "#9CA3AF" }}
                                >
                                    {insurer.name.substring(0, 2).toUpperCase()}
                                </div>
                            )}
                            <span className="text-center leading-tight">{insurer.name}</span>
                        </button>
                    )
                })}
            </div>

            <div className="flex items-center gap-4">
                <Button
                    onClick={handleCompare}
                    disabled={selected.length < 2}
                    className="font-semibold px-6 py-2 rounded-full transition-all active:scale-95 disabled:active:scale-100 disabled:opacity-50"
                    style={{
                        background: "#2563EB",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-body)",
                    }}
                >
                    Compare {selected.length > 0 ? `(${selected.length} selected)` : ""}
                </Button>
                {selected.length > 0 && (
                    <button
                        onClick={() => setSelected([])}
                        className="text-sm font-medium transition-colors"
                        style={{ color: "#9CA3AF" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#4B5563")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
                    >
                        Clear
                    </button>
                )}
                {selected.length < 2 && (
                    <p className="text-xs" style={{ color: "#9CA3AF", fontFamily: "var(--font-body)" }}>
                        Select at least 2 insurers to compare
                    </p>
                )}
            </div>
        </div>
    )
}