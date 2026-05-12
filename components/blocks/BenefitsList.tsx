import { BenefitsListData } from "@/types/blocks"
import { CheckCircle2 } from "lucide-react"

export default function BenefitsList({ data }: { data: BenefitsListData }) {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {data.title && (
                    <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: "var(--font-heading)", color: "#111827" }}>
                        {data.title}
                    </h2>
                )}
                <div className="grid md:grid-cols-2 gap-8">
                    {(data.items || []).map((item, i) => (
                        <div key={i} className="flex gap-4 p-5 rounded-2xl transition-all hover:bg-slate-50" style={{ border: "1px solid #F1F5F9" }}>
                            <CheckCircle2 className="w-6 h-6 mt-0.5 shrink-0" style={{ color: "var(--brand)" }} />
                            <div>
                                <p className="font-bold" style={{ fontFamily: "var(--font-heading)", color: "#111827" }}>
                                    {item.heading}
                                </p>
                                <p className="text-sm mt-1 leading-relaxed" style={{ color: "#4B5563", fontFamily: "var(--font-body)" }}>
                                    {item.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
