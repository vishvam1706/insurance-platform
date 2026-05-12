"use client"

import { PlansTableData } from "@/types/blocks"

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-sm" style={{ color: s <= Math.round(rating) ? "#F59E0B" : "var(--border)" }}>★</span>
                ))}
            </div>
            <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>{rating.toFixed(2)}/5</span>
        </div>
    )
}

export default function PlansTable({ data }: { data: PlansTableData }) {
    return (
        <div className="my-10">
            {data.title && (
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>{data.title}</h2>
            )}
            {data.introText && (
                <p className="text-sm mb-6" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>{data.introText}</p>
            )}
            <div className="space-y-3">
                {(data.rows || []).map((row, i) => (
                    <div
                        key={i}
                        className="rounded-2xl p-5 transition-all duration-200 cursor-pointer"
                        style={{ border: "1px solid var(--border)", background: "#FFFFFF", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--brand-100)"
                            ;(e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,179,134,0.08)"
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"
                            ;(e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"
                        }}
                    >
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>{row.plan}</h3>
                                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>{row.riders}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-xs mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                                    CSR: <span className="font-semibold" style={{ color: "var(--text-secondary)" }}>{row.csr}</span>
                                </p>
                                {row.dittoRating ? <StarRating rating={row.dittoRating} /> : (
                                    <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>{row.rating}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
