import { BenefitsListData } from "@/types/blocks"
import { CheckCircle2 } from "lucide-react"

export default function BenefitsList({ data }: { data: BenefitsListData }) {
    return (
        <div className="my-10">
            {data.title && (
                <h2
                    className="text-2xl font-bold mb-6"
                    style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                >
                    {data.title}
                </h2>
            )}
            <div className="space-y-5">
                {(data.items || []).map((item, i) => (
                    <div key={i} className="flex gap-4">
                        <CheckCircle2
                            className="w-5 h-5 mt-0.5 shrink-0"
                            style={{ color: "#2563EB" }}
                        />
                        <div>
                            <p
                                className="font-semibold"
                                style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                            >
                                {item.heading}
                            </p>
                            <p
                                className="text-sm mt-1 leading-relaxed"
                                style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}
                            >
                                {item.body}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}