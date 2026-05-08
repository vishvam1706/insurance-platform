import { InsurerMetricsData } from "@/types/blocks"
import { cn } from "@/lib/utils"

const VERDICT_STYLES: Record<string, { bg: string; text: string; border: string }> = {
    good: { bg: "#F0FDF4", text: "#16A34A", border: "#BBF7D0" },
    okay: { bg: "#FFFBEB", text: "#D97706", border: "#FDE68A" },
    avoid: { bg: "#FEF2F2", text: "#DC2626", border: "#FECACA" },
}

export default function InsurerMetrics({ data }: { data: InsurerMetricsData }) {
    return (
        <div className="my-10 space-y-8">
            {data.title && (
                <h2
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                >
                    {data.title}
                </h2>
            )}
            {(data.metrics || []).map((metric) => (
                <div
                    key={metric.number}
                    className="pl-5"
                    style={{ borderLeft: "3px solid #2563EB" }}
                >
                    <div className="flex items-center gap-2.5 mb-2">
                        <span
                            className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
                            style={{
                                background: "#EFF6FF",
                                color: "#2563EB",
                                border: "1px solid #BFDBFE",
                                fontFamily: "var(--font-heading)",
                            }}
                        >
                            {metric.number}
                        </span>
                        <h3
                            className="font-semibold"
                            style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                        >
                            {metric.title}
                        </h3>
                    </div>
                    <p
                        className="text-sm leading-relaxed mb-3"
                        style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}
                    >
                        {metric.body}
                    </p>

                    {metric.thresholds && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {metric.thresholds.map((t, i) => {
                                const style = VERDICT_STYLES[t.verdict] || VERDICT_STYLES.okay
                                return (
                                    <span
                                        key={i}
                                        className="text-xs px-3 py-1 rounded-full font-medium"
                                        style={{
                                            background: style.bg,
                                            color: style.text,
                                            border: `1px solid ${style.border}`,
                                            fontFamily: "var(--font-body)",
                                        }}
                                    >
                                        {t.label} — {t.verdict}
                                    </span>
                                )
                            })}
                        </div>
                    )}

                    {metric.csrTable && metric.csrTable.length > 0 && (
                        <div
                            className="overflow-x-auto mt-3 rounded-2xl"
                            style={{ border: "1px solid #E5E7EB" }}
                        >
                            <table className="w-full text-sm">
                                <thead>
                                    <tr style={{ background: "#F8F9FA", borderBottom: "1px solid #E5E7EB" }}>
                                        <th
                                            className="text-left px-4 py-2.5 font-semibold"
                                            style={{ color: "#374151", fontFamily: "var(--font-heading)" }}
                                        >
                                            Company
                                        </th>
                                        <th
                                            className="text-left px-4 py-2.5 font-semibold"
                                            style={{ color: "#374151", fontFamily: "var(--font-heading)" }}
                                        >
                                            Claim Settlement Ratio (avg. 3 years)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {metric.csrTable.map((row, i) => {
                                        const val = parseFloat(row.csr)
                                        const color = val >= 90 ? "#16A34A" : val >= 80 ? "#D97706" : "#DC2626"
                                        return (
                                            <tr
                                                key={i}
                                                style={{ background: i % 2 === 0 ? "#FFFFFF" : "#F8F9FA" }}
                                            >
                                                <td
                                                    className="px-4 py-2.5 font-medium"
                                                    style={{ borderBottom: "1px solid #F3F4F6", color: "#111827", fontFamily: "var(--font-body)" }}
                                                >
                                                    {row.company}
                                                </td>
                                                <td
                                                    className="px-4 py-2.5 font-semibold"
                                                    style={{ borderBottom: "1px solid #F3F4F6", color, fontFamily: "var(--font-body)" }}
                                                >
                                                    {row.csr}
                                                </td>
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
    )
}