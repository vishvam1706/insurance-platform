import { StepsBlockData } from "@/types/blocks"

export default function StepsBlock({ data }: { data: StepsBlockData }) {
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
            <ol className="space-y-5">
                {(data.steps || []).map((step, i) => (
                    <li key={i} className="flex gap-4">
                        <div
                            className="w-7 h-7 rounded-full text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: "#2563EB", fontFamily: "var(--font-heading)" }}
                        >
                            {i + 1}
                        </div>
                        <p
                            className="leading-relaxed pt-0.5"
                            style={{ color: "#374151", fontFamily: "var(--font-body)" }}
                        >
                            {step.text}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    )
}