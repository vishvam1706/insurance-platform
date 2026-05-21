import { ProsConsTableData } from "@/types/blocks"
import { CheckCircle2, XCircle } from "lucide-react"

export default function ProsConsTable({ data }: { data: ProsConsTableData }) {
    return (
        <div className="my-10">
            {data.title && (
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>{data.title}</h2>
            )}
            <div className="grid sm:grid-cols-2 gap-6">
                {/* Advantages Panel */}
                <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid #D1FAE5" }}>
                    <div className="px-6 py-4 font-semibold text-sm uppercase tracking-wider" style={{ background: "#ECFDF5", color: "#065F46", fontFamily: "var(--font-heading)", borderBottom: "1px solid #D1FAE5" }}>
                        Advantages
                    </div>
                    <ul style={{ background: "#FFFFFF" }}>
                        {(data.pros || []).map((pro, i) => (
                            <li key={i} className="flex items-start gap-3 px-6 py-4 transition-colors hover:bg-[#F9FBF9]" style={{ borderBottom: i < (data.pros || []).length - 1 ? "1px solid #ECFDF5" : "none" }}>
                                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#10B981" }} />
                                <span className="text-sm md:text-base" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>{pro}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Disadvantages Panel */}
                <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid #FEE2E2" }}>
                    <div className="px-6 py-4 font-semibold text-sm uppercase tracking-wider" style={{ background: "#FEF2F2", color: "#991B1B", fontFamily: "var(--font-heading)", borderBottom: "1px solid #FEE2E2" }}>
                        Disadvantages
                    </div>
                    <ul style={{ background: "#FFFFFF" }}>
                        {(data.cons || []).map((con, i) => (
                            <li key={i} className="flex items-start gap-3 px-6 py-4 transition-colors hover:bg-[#FDF9F9]" style={{ borderBottom: i < (data.cons || []).length - 1 ? "1px solid #FEF2F2" : "none" }}>
                                <XCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#EF4444" }} />
                                <span className="text-sm md:text-base" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>{con}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

