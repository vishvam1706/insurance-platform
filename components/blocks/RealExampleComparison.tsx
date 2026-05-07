import { RealExampleComparisonData } from "@/types/blocks"
import { CheckCircle2, XCircle, Star } from "lucide-react"
import Image from "next/image"

export default function RealExampleComparison({ data }: { data: RealExampleComparisonData }) {
    const p1 = data.plan1
    const p2 = data.plan2

    return (
        <div className="my-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-5">{data.title}</h2>
            )}

            <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-5 py-4 font-semibold text-slate-700 w-1/3">
                                Insurance Parameters
                            </th>

                            {[p1, p2].map((plan, pi) => (
                                <th key={pi} className="px-5 py-4">
                                    <div className="flex flex-col items-center gap-1">
                                        {plan?.logo && (
                                            <Image src={plan.logo} alt={plan.insurer || ""} width={60} height={30} className="object-contain" />
                                        )}
                                        <p className="font-bold text-slate-900 text-sm">{plan?.insurer}</p>
                                        <p className="text-xs text-slate-500">{plan?.planName}</p>
                                        {plan?.recommended && (
                                            <span className="flex items-center gap-1 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                                                <Star className="w-3 h-3" /> Recommended
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(data.rows || []).map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                <td className="px-5 py-3 font-medium text-slate-700 border-b border-slate-100">
                                    {row.parameter}
                                </td>
                                <td className="px-5 py-3 text-center border-b border-slate-100">
                                    <Cell value={row.plan1Value} good={row.plan1Good} />
                                </td>
                                <td className="px-5 py-3 text-center border-b border-slate-100">
                                    <Cell value={row.plan2Value} good={row.plan2Good} />
                                </td>
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
        <div className="flex flex-col items-center gap-1">
            {good
                ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                : <XCircle className="w-4 h-4 text-red-400" />
            }
            <span className="text-xs text-slate-600">{value}</span>
        </div>
    )
}