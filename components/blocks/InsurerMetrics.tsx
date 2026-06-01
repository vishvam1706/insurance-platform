import { InsurerMetricsData } from "@/types/blocks"

const VERDICT_STYLES: Record<string, { bg: string; text: string; border: string }> = {
    good:  { bg: "var(--brand-light)", text: "var(--brand-dark)", border: "var(--brand-200)" },
    okay:  { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A" },
    avoid: { bg: "#FEF2F2", text: "#B91C1C", border: "#FCA5A5" },
}

export default function InsurerMetrics({ data, isHome = false }: { data: InsurerMetricsData, isHome?: boolean }) {
    return (
        <div className={isHome ? "py-12 sm:py-16" : "my-10"}>
            <div className={isHome ? "max-w-7xl mx-auto px-6 lg:px-8" : "w-full space-y-8"}>
                <div className={isHome ? "space-y-8" : ""}>
            {data.title && (
                <h2 className="font-bold" style={{ fontSize: "var(--fs-h2)", fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                    {data.title}
                </h2>
            )}
            {(data.metrics || []).map((metric) => (
                <div key={metric.number} className="pl-5" style={{ borderLeft: "3px solid var(--brand)" }}>
                    <div className="flex items-center gap-2.5 mb-2">
                        <span
                            className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0"
                            style={{ background: "var(--brand-light)", color: "var(--brand-dark)", border: "1px solid var(--brand-100)", fontFamily: "var(--font-heading)" }}
                        >
                            {metric.number}
                        </span>
                        <h3 className="font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                            {metric.title}
                        </h3>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
                        {metric.body}
                    </p>

                    {metric.thresholds && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {metric.thresholds.map((t, i) => {
                                const s = VERDICT_STYLES[t.verdict] || VERDICT_STYLES.okay
                                return (
                                    <span key={i} className="text-xs px-3 py-1 rounded-full font-medium"
                                        style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}`, fontFamily: "var(--font-body)" }}>
                                        {t.label} — {t.verdict}
                                    </span>
                                )
                            })}
                        </div>
                    )}

                    {metric.csrTable && metric.csrTable.length > 0 && (
                        <div className="overflow-x-auto mt-3 rounded-2xl" style={{ border: "1px solid var(--border)" }}>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr style={{ background: "var(--surface-muted)", borderBottom: "1px solid var(--border)" }}>
                                        <th className="text-left px-4 py-2.5 font-semibold" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}>Company</th>
                                        <th className="text-left px-4 py-2.5 font-semibold" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}>Claim Settlement Ratio (avg. 3 years)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {metric.csrTable.map((row, i) => {
                                        const val = parseFloat(row.csr)
                                        const color = val >= 90 ? "#047857" : val >= 80 ? "#B45309" : "#B91C1C"
                                        return (
                                            <tr key={i} style={{ background: i % 2 === 0 ? "#FFFFFF" : "var(--surface-muted)" }}>
                                                <td className="px-4 py-2.5 font-medium" style={{ borderBottom: "1px solid var(--border-light)", color: "var(--text-primary)", fontFamily: "var(--font-body)" }}>{row.company}</td>
                                                <td className="px-4 py-2.5 font-semibold" style={{ borderBottom: "1px solid var(--border-light)", color, fontFamily: "var(--font-body)" }}>{row.csr}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ))}
                </div>
            </div>
        </div>
    )
}
