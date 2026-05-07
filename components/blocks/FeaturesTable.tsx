import { FeaturesTableData } from "@/types/blocks"

export default function FeaturesTable({ data }: { data: FeaturesTableData }) {
    return (
        <div className="my-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-4">{data.title}</h2>
            )}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-800 text-white">
                            <th className="text-left px-5 py-3 font-semibold">Aspect</th>
                            <th className="text-left px-5 py-3 font-semibold">Feature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data.rows || []).map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                <td className="px-5 py-3 font-medium text-slate-900 border-b border-slate-100">{row.aspect}</td>
                                <td className="px-5 py-3 text-slate-700 border-b border-slate-100">{row.feature}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {data.note && (
                <p className="text-xs text-slate-400 mt-2 italic">Note: {data.note}</p>
            )}
        </div>
    )
}