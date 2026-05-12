import { CheckCircle2, X } from "lucide-react"

const ROWS = [
    {
        category: "Expert Guidance",
        subtitle: "Talk to real IRDAI-certified advisors",
        ditto: "Talk to IRDAI certified experts — never pushy salesmen",
        other: "Talk to agents who earn commission on every sale",
        dittoGood: true,
    },
    {
        category: "Shortlisting",
        subtitle: "Identifying a policy that best suits your financial & medical needs",
        ditto: "Get 2-3 carefully selected policy recommendations, backed by clear explanations tailored to your needs",
        other: "Minimal or no human guidance, with policies recommended based on sales targets",
        dittoGood: true,
    },
    {
        category: "Application Assistance",
        subtitle: "Help with the paperwork & health declaration",
        ditto: "Step-by-step form filling with a dedicated advisor checking every detail",
        other: "Self-serve with little or no support",
        dittoGood: true,
    },
    {
        category: "Claim Support",
        subtitle: "Being there when it matters most",
        ditto: "Dedicated claims team on call — we walk you through every document",
        other: "No post-sale support; you're on your own at claim time",
        dittoGood: true,
    },
]

export default function ComparisonSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="grid lg:grid-cols-[1fr_auto_auto] gap-6 items-end mb-10">
                    <div>
                        <h2
                            className="text-3xl font-extrabold mb-2"
                            style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                        >
                            Insurance Buying<br />Experience
                        </h2>
                        <p className="text-sm" style={{ color: "#6B7280" }}>
                            What customers experience throughout their insurance journey with Ditto versus other platforms
                        </p>
                    </div>

                    {/* Column headers */}
                    <div className="text-center min-w-[160px]">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <div className="flex -space-x-2">
                                {["AM", "RK"].map((initials, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold"
                                        style={{ background: i === 0 ? "#6366F1" : "#0F172A", color: "#fff" }}
                                    >
                                        {initials}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm font-bold" style={{ color: "#111827" }}>Ditto</p>
                    </div>
                    <div className="text-center min-w-[160px]">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold" style={{ background: "#9CA3AF", color: "#fff" }}>
                                    RS
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold" style={{ background: "#D1D5DB", color: "#6B7280" }}>
                                    ?
                                </div>
                            </div>
                        </div>
                        <p className="text-sm font-bold" style={{ color: "#6B7280" }}>Other Platforms</p>
                    </div>
                </div>

                {/* Comparison rows */}
                <div className="divide-y" style={{ borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
                    {ROWS.map((row) => (
                        <div key={row.category} className="grid lg:grid-cols-[1fr_auto_auto] gap-6 py-8 items-start">
                            {/* Label */}
                            <div>
                                <p className="font-bold mb-1" style={{ color: "#111827" }}>{row.category}</p>
                                <p className="text-sm" style={{ color: "#9CA3AF" }}>{row.subtitle}</p>
                            </div>

                            {/* Ditto column */}
                            <div
                                className="rounded-2xl p-5 min-w-[160px] lg:min-w-[220px]"
                                style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}
                            >
                                <CheckCircle2 className="w-5 h-5 mb-3" style={{ color: "#16A34A" }} />
                                <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{row.ditto}</p>
                            </div>

                            {/* Other column */}
                            <div
                                className="rounded-2xl p-5 min-w-[160px] lg:min-w-[220px]"
                                style={{ background: "#F9FAFB" }}
                            >
                                <X className="w-5 h-5 mb-3" style={{ color: "#EF4444" }} />
                                <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>{row.other}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
