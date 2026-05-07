import { InsurerMetricsData } from "@/types/blocks"
import { cn } from "@/lib/utils"

const VERDICT_STYLES = {
    good: "bg-green-100 text-green-700",
    okay: "bg-amber-100 text-amber-700",
    avoid: "bg-red-100 text-red-700",
}

export default function InsurerMetrics({ data }: { data: InsurerMetricsData }) {
    return (
        <div className="my-8 space-y-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900">{data.title}</h2>
            )}
            {(data.metrics || []).map((metric) => (
                <div key={metric.number} className="border-l-4 border-blue-600 pl-5">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                            {metric.number}
                        </span>
                        <h3 className="font-semibold text-slate-900">{metric.title}</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{metric.body}</p>

                    {metric.thresholds && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {metric.thresholds.map((t, i) => (
                                <span
                                    key={i}
                                    className={cn("text-xs px-2.5 py-1 rounded-full font-medium", VERDICT_STYLES[t.verdict])}
                                >
                                    {t.label} — {t.verdict}
                                </span>
                            ))}
                        </div>
                    )}

                    {metric.csrTable && metric.csrTable.length > 0 && (
                        <div className="overflow-x-auto mt-3 rounded-xl border border-slate-200">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Company</th>
                                        <th className="text-left px-4 py-2.5 font-semibold text-slate-700">Claim Settlement Ratio (avg. 3 years)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {metric.csrTable.map((row, i) => {
                                        const val = parseFloat(row.csr)
                                        const color = val >= 90 ? "text-green-600" : val >= 80 ? "text-amber-600" : "text-red-500"
                                        return (
                                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                                <td className="px-4 py-2.5 font-medium text-slate-900 border-b border-slate-100">{row.company}</td>
                                                <td className={`px-4 py-2.5 font-semibold border-b border-slate-100 ${color}`}>{row.csr}</td>
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