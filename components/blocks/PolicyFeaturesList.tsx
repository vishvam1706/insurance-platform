import { PolicyFeaturesListData } from "@/types/blocks"

export default function PolicyFeaturesList({ data, isHome = false }: { data: PolicyFeaturesListData, isHome?: boolean }) {
    return (
        <div className={isHome ? "py-12 sm:py-16" : "my-12"}>
            <div className={isHome ? "max-w-4xl mx-auto px-6 lg:px-8" : "w-full"}>
                {data.title && (
                <h2 className="font-bold mb-8" style={{ fontSize: "var(--fs-h2)", fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                    {data.title}
                </h2>
            )}
            <div className="space-y-8">
                {(data.features || []).map((feature, i) => (
                    <div key={i} id={`feature-${i}`} className="group transition-all duration-200">
                        <h3 className="font-bold mb-3 flex items-center gap-3" style={{ fontSize: "var(--fs-h3)", fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                            <span
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 shadow-sm transition-transform group-hover:scale-105"
                                style={{ background: "var(--brand-light)", color: "var(--brand-dark)", border: "1px solid var(--brand)", fontFamily: "var(--font-heading)" }}
                            >
                                {i + 1}
                            </span>
                            {feature.title}
                        </h3>
                        <p className="text-sm md:text-base leading-relaxed pl-11" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
                            {feature.body}
                        </p>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}

