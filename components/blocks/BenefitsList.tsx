import { BenefitsListData } from "@/types/blocks"
import { CheckCircle2 } from "lucide-react"

export default function BenefitsList({ data }: { data: BenefitsListData }) {
    return (
        <div className="my-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-5">{data.title}</h2>
            )}
            <div className="space-y-4">
                {(data.items || []).map((item, i) => (
                    <div key={i} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold text-slate-900">{item.heading}</p>
                            <p className="text-slate-600 text-sm mt-0.5 leading-relaxed">{item.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}