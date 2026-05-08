"use client"

import { PlansTableData } from "@/types/blocks"

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                    <span
                        key={s}
                        className="text-sm"
                        style={{ color: s <= Math.round(rating) ? "#F59E0B" : "#E5E7EB" }}
                    >
                        ★
                    </span>
                ))}
            </div>
            <span
                className="text-xs font-semibold"
                style={{ color: "#374151", fontFamily: "var(--font-body)" }}
            >
                {rating.toFixed(2)}/5
            </span>
        </div>
    )
}

export default function PlansTable({ data }: { data: PlansTableData }) {
    return (
        <div className="my-10">
            {data.title && (
                <h2
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                >
                    {data.title}
                </h2>
            )}
            {data.introText && (
                <p
                    className="text-sm mb-6"
                    style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}
                >
                    {data.introText}
                </p>
            )}
            <div className="space-y-3">
                {(data.rows || []).map((row, i) => (
                    <div
                        key={i}
                        className="rounded-2xl p-5 transition-all duration-200"
                        style={{
                            border: "1px solid #E5E7EB",
                            background: "#FFFFFF",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "#BFDBFE"
                            ;(e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)"
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"
                            ;(e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"
                        }}
                    >
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex-1 min-w-0">
                                <h3
                                    className="font-semibold text-sm mb-1"
                                    style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                                >
                                    {row.plan}
                                </h3>
                                <p
                                    className="text-xs leading-relaxed"
                                    style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}
                                >
                                    {row.riders}
                                </p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-xs mb-1" style={{ color: "#9CA3AF", fontFamily: "var(--font-body)" }}>
                                    CSR: <span className="font-semibold" style={{ color: "#374151" }}>{row.csr}</span>
                                </p>
                                {row.dittoRating ? (
                                    <StarRating rating={row.dittoRating} />
                                ) : (
                                    <p
                                        className="text-xs font-semibold"
                                        style={{ color: "#374151", fontFamily: "var(--font-body)" }}
                                    >
                                        {row.rating}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}