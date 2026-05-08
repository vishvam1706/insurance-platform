import { PolicyFeaturesListData } from "@/types/blocks"

export default function PolicyFeaturesList({ data }: { data: PolicyFeaturesListData }) {
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
            <div className="space-y-8">
                {(data.features || []).map((feature, i) => (
                    <div key={i} id={`feature-${i}`}>
                        <h3
                            className="font-semibold mb-2 flex items-center gap-3"
                            style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                        >
                            <span
                                className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                                style={{
                                    background: "#EFF6FF",
                                    color: "#2563EB",
                                    border: "1px solid #BFDBFE",
                                    fontFamily: "var(--font-heading)",
                                }}
                            >
                                {i + 1}
                            </span>
                            {feature.title}
                        </h3>
                        <p
                            className="text-sm leading-relaxed pl-9"
                            style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}
                        >
                            {feature.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}