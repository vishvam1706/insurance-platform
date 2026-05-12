import { StepsBlockData } from "@/types/blocks"

export default function StepsBlock({ data }: { data: StepsBlockData }) {
    return (
        <div className="my-10">
            {data.title && (
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                    {data.title}
                </h2>
            )}
            <div className="space-y-4">
                {(data.steps || []).map((step: any, i: number) => {
                    // Support both {title, body} and {text} shapes
                    const stepTitle = step.title || ""
                    const stepBody = step.body || step.text || ""
                    return (
                        <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center shrink-0"
                                    style={{ background: "var(--brand)", color: "#FFFFFF", fontFamily: "var(--font-heading)" }}
                                >
                                    {i + 1}
                                </div>
                                {i < (data.steps?.length ?? 0) - 1 && (
                                    <div className="w-0.5 flex-1 mt-2" style={{ background: "var(--brand-100)", minHeight: 24 }} />
                                )}
                            </div>
                            <div className="pb-4 flex-1">
                                {stepTitle && (
                                    <h3 className="font-bold mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                                        {stepTitle}
                                    </h3>
                                )}
                                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
                                    {stepBody}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
