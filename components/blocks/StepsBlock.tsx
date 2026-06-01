import { StepsBlockData } from "@/types/blocks"

export default function StepsBlock({ data, isHome = false }: { data: StepsBlockData, isHome?: boolean }) {
    return (
        <div className={isHome ? "py-16 sm:py-20" : "my-12"}>
            <div className={isHome ? "max-w-5xl mx-auto px-6 lg:px-8" : "w-full"}>
                {data.title && (
                <h2 className="font-bold mb-8" style={{ fontSize: "var(--fs-h2)", fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                    {data.title}
                </h2>
            )}
            <div className="space-y-2">
                {(data.steps || []).map((step: any, i: number) => {
                    // Support both {title, body} and {text} shapes
                    const stepTitle = step.title || ""
                    const stepBody = step.body || step.text || ""
                    return (
                        <div key={i} className="flex gap-5">
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-10 h-10 rounded-full text-base font-bold flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105 duration-200"
                                    style={{ 
                                        background: "var(--text-primary)", 
                                        color: "#FFFFFF", 
                                        border: "2px solid var(--brand)",
                                        fontFamily: "var(--font-heading)" 
                                    }}
                                >
                                    {i + 1}
                                </div>
                                {i < (data.steps?.length ?? 0) - 1 && (
                                    <div className="w-[3px] flex-1 my-2 rounded-full" style={{ background: "var(--brand-200)", minHeight: 36 }} />
                                )}
                            </div>
                            <div className="pb-8 flex-1">
                                {stepTitle && (
                                    <h3 className="font-bold text-base md:text-lg mb-1.5" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                                        {stepTitle}
                                    </h3>
                                )}
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
                                    {stepBody}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            </div>
        </div>
    )
}

