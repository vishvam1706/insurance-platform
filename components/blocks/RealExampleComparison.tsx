import { RealExampleComparisonData } from "@/types/blocks"
import { CheckCircle2, XCircle, Star } from "lucide-react"
import Image from "next/image"

export default function RealExampleComparison({ data }: { data: RealExampleComparisonData }) {
    const p1 = data.plan1
    const p2 = data.plan2
    return (
        <div className="my-10">
            {data.title && (
                <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>{data.title}</h2>
            )}
            <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid var(--border)" }}>
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ background: "var(--surface-muted)", borderBottom: "1px solid var(--border)" }}>
                            <th className="text-left px-5 py-4 font-semibold w-1/3" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}>Insurance Parameters</th>
                            {[p1, p2].map((plan, pi) => (
                                <th key={pi} className="px-5 py-4">
                                    <div className="flex flex-col items-center gap-1.5">
                                        {plan?.logo && <Image src={plan.logo} alt={plan.insurer || ""} width={60} height={30} className="object-contain" />}
                                        <p className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>{plan?.insurer}</p>
                                        <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>{plan?.planName}</p>
                                        {plan?.recommended && (
                                            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full mt-1" style={{ background: "#FEF3C7", color: "#B45309", border: "1px solid #FDE68A", fontFamily: "var(--font-body)" }}>
                                                <Star className="w-2.5 h-2.5" /> Recommended
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(data.rows || []).map((row, i) => (
                            <tr key={i} style={{ background: i % 2 === 0 ? "#FFFFFF" : "var(--surface-muted)" }}>
                                <td className="px-5 py-3.5 font-semibold" style={{ borderBottom: "1px solid var(--border-light)", color: "var(--text-primary)", fontFamily: "var(--font-body)" }}>{row.parameter}</td>
                                <td className="px-5 py-3.5 text-center" style={{ borderBottom: "1px solid var(--border-light)" }}><Cell value={row.plan1Value} good={row.plan1Good} /></td>
                                <td className="px-5 py-3.5 text-center" style={{ borderBottom: "1px solid var(--border-light)" }}><Cell value={row.plan2Value} good={row.plan2Good} /></td>
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
        <div className="flex flex-col items-center gap-1.5">
            {good ? <CheckCircle2 className="w-4 h-4" style={{ color: "var(--brand)" }} /> : <XCircle className="w-4 h-4" style={{ color: "#F87171" }} />}
            <span className="text-xs font-medium" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>{value}</span>
        </div>
    )
}
