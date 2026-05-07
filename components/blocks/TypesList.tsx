import { TypesListData } from "@/types/blocks"

export default function TypesList({ data }: { data: TypesListData }) {
    return (
        <div className="my-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-5">{data.title}</h2>
            )}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-slate-800 text-white">
                            <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">Type</th>
                            <th className="text-left px-4 py-3 font-semibold">Feature</th>
                            <th className="text-left px-4 py-3 font-semibold rounded-tr-lg">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data.items || []).map((item, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                <td className="px-4 py-3 font-medium text-slate-900 border-b border-slate-100">{item.type}</td>
                                <td className="px-4 py-3 text-slate-700 border-b border-slate-100 leading-relaxed">{item.feature}</td>
                                <td className="px-4 py-3 text-slate-500 border-b border-slate-100 text-xs">{item.example}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {data.note && (
                <p className="text-xs text-slate-400 mt-2 italic">{data.note}</p>
            )}
        </div>
    )
}