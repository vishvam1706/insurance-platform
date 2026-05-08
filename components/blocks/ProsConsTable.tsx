import { ProsConsTableData } from "@/types/blocks"
import { CheckCircle2, XCircle } from "lucide-react"

export default function ProsConsTable({ data }: { data: ProsConsTableData }) {
    return (
        <div className="my-10">
            {data.title && (
                <h2
                    className="text-2xl font-bold mb-5"
                    style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                >
                    {data.title}
                </h2>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
                {/* Pros */}
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid #BBF7D0" }}
                >
                    <div
                        className="px-5 py-3 font-semibold text-sm"
                        style={{
                            background: "#F0FDF4",
                            color: "#15803D",
                            fontFamily: "var(--font-heading)",
                            borderBottom: "1px solid #BBF7D0",
                        }}
                    >
                        Advantages
                    </div>
                    <ul style={{ background: "#FFFFFF" }}>
                        {(data.pros || []).map((pro, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-3 px-5 py-3"
                                style={{ borderBottom: i < (data.pros || []).length - 1 ? "1px solid #F0FDF4" : "none" }}
                            >
                                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#22C55E" }} />
                                <span className="text-sm" style={{ color: "#374151", fontFamily: "var(--font-body)" }}>{pro}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Cons */}
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid #FECACA" }}
                >
                    <div
                        className="px-5 py-3 font-semibold text-sm"
                        style={{
                            background: "#FEF2F2",
                            color: "#DC2626",
                            fontFamily: "var(--font-heading)",
                            borderBottom: "1px solid #FECACA",
                        }}
                    >
                        Disadvantages
                    </div>
                    <ul style={{ background: "#FFFFFF" }}>
                        {(data.cons || []).map((con, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-3 px-5 py-3"
                                style={{ borderBottom: i < (data.cons || []).length - 1 ? "1px solid #FEF2F2" : "none" }}
                            >
                                <XCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#F87171" }} />
                                <span className="text-sm" style={{ color: "#374151", fontFamily: "var(--font-body)" }}>{con}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}