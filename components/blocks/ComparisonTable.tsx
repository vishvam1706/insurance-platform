import { ComparisonTableData } from "@/types/blocks"

export default function ComparisonTable({ data }: { data: ComparisonTableData }) {
    const columns = data.columns || []
    const rows = data.rows || []

    return (
        <div className="my-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-4">{data.title}</h2>
            )}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-800 text-white">
                            {columns.map((col, i) => (
                                <th key={i} className="text-left px-4 py-3 font-semibold">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, ri) => (
                            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                {row.map((cell, ci) => (
                                    <td
                                        key={ci}
                                        className={`px-4 py-3 border-b border-slate-100 leading-relaxed ${ci === 0 ? "font-medium text-slate-900" : "text-slate-700"}`}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}