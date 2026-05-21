import { RealExampleComparisonData } from "@/types/blocks"
import { CheckCircle2, XCircle, Star } from "lucide-react"
import Image from "next/image"

export default function RealExampleComparison({ data }: { data: RealExampleComparisonData }) {
    const p1 = data.plan1
    const p2 = data.plan2
    return (
        <div className="my-12">
            {data.title && (
                <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>{data.title}</h2>
            )}
            <div className="overflow-x-auto rounded-2xl shadow-sm border border-[var(--border)] bg-white">
                <table className="w-full border-collapse">
                    <thead>
                        <tr style={{ background: "var(--surface-muted)", borderBottom: "1px solid var(--border)" }}>
                            <th className="text-left px-6 py-5 font-semibold w-1/3 text-sm md:text-base" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>Insurance Parameters</th>
                            {[p1, p2].map((plan, pi) => (
                                <th key={pi} className="px-6 py-5">
                                    <div className="flex flex-col items-center gap-2">
                                        {plan?.logo && (
                                            <div className="h-10 flex items-center justify-center mb-1">
                                                <Image src={plan.logo} alt={plan.insurer || ""} width={70} height={35} className="object-contain max-h-full" />
                                            </div>
                                        )}
                                        <p className="font-bold text-sm md:text-base" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>{plan?.insurer}</p>
                                        <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>{plan?.planName}</p>
                                        {plan?.recommended && (
                                            <span className="flex items-center gap-1.5 text-[10px] md:text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full mt-2 shadow-sm" style={{ background: "var(--brand-light)", color: "var(--brand-dark)", border: "1px solid var(--brand)", fontFamily: "var(--font-body)" }}>
                                                <Star className="w-3 h-3 fill-[var(--brand)] text-[var(--brand)]" /> Recommended
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(data.rows || []).map((row, i) => (
                            <tr key={i} className="transition-colors hover:bg-[var(--surface-muted)]" style={{ background: i % 2 === 0 ? "#FFFFFF" : "var(--surface-muted)" }}>
                                <td className="px-6 py-4.5 font-semibold text-sm md:text-base" style={{ borderBottom: "1px solid var(--border-light)", color: "var(--text-primary)", fontFamily: "var(--font-body)" }}>{row.parameter}</td>
                                <td className="px-6 py-4.5 text-center" style={{ borderBottom: "1px solid var(--border-light)" }}><Cell value={row.plan1Value} good={row.plan1Good} /></td>
                                <td className="px-6 py-4.5 text-center" style={{ borderBottom: "1px solid var(--border-light)" }}><Cell value={row.plan2Value} good={row.plan2Good} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function Cell({ value, good }: { value: string; good: boolean }) {
    return (
        <div className="flex flex-col items-center gap-1.5 py-1">
            {good ? (
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
            ) : (
                <XCircle className="w-5 h-5 text-[#EF4444]" />
            )}
            <span className="text-xs md:text-sm font-medium" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>{value}</span>
        </div>
    )
}

