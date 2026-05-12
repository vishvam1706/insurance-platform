import { DittosTakeData } from "@/types/blocks"
import { Lightbulb } from "lucide-react"

export default function DittosTake({ data }: { data: DittosTakeData }) {
    return (
        <div
            className="my-10 rounded-2xl p-6"
            style={{ background: "var(--brand-light)", border: "1px solid var(--brand-100)" }}
        >
            <div className="flex items-center gap-2.5 mb-3">
                <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--brand)", flexShrink: 0 }}
                >
                    <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <h3
                    className="font-bold"
                    style={{ fontFamily: "var(--font-heading)", color: "#065F46" }}
                >
                    {data.title || "Ditto's Take"}
                </h3>
            </div>
            <div
                className="text-sm leading-relaxed prose prose-sm max-w-none"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
                dangerouslySetInnerHTML={{ __html: data.body || "" }}
            />
        </div>
    )
}
