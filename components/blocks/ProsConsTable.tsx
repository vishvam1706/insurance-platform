import { ProsConsTableData } from "@/types/blocks"
import { CheckCircle2, XCircle } from "lucide-react"

export default function ProsConsTable({ data }: { data: ProsConsTableData }) {
    return (
        <div className="my-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-4">{data.title}</h2>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="border border-green-200 rounded-xl overflow-hidden">
                    <div className="bg-green-600 text-white px-4 py-2.5 font-semibold text-sm">
                        Advantages
                    </div>
                    <ul className="divide-y divide-green-100">
                        {(data.pros || []).map((pro, i) => (
                            <li key={i} className="flex items-start gap-3 px-4 py-3">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                <span className="text-sm text-slate-700">{pro}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="border border-red-200 rounded-xl overflow-hidden">
                    <div className="bg-red-500 text-white px-4 py-2.5 font-semibold text-sm">
                        Disadvantages
                    </div>
                    <ul className="divide-y divide-red-100">
                        {(data.cons || []).map((con, i) => (
                            <li key={i} className="flex items-start gap-3 px-4 py-3">
                                <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                                <span className="text-sm text-slate-700">{con}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}