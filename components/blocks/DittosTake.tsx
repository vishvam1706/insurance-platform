import { DittosTakeData } from "@/types/blocks"
import { Lightbulb } from "lucide-react"

export default function DittosTake({ data }: { data: DittosTakeData }) {
    return (
        <div
            className="my-10 rounded-2xl p-6"
            style={{
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
            }}
        >
            <div className="flex items-center gap-2.5 mb-3">
                <Lightbulb className="w-5 h-5" style={{ color: "#2563EB" }} />
                <h3
                    className="font-bold"
                    style={{ fontFamily: "var(--font-heading)", color: "#1E40AF" }}
                >
                    {data.title || "Ditto's Take"}
                </h3>
            </div>
            <div
                className="text-sm leading-relaxed prose prose-sm max-w-none"
                style={{ color: "#374151", fontFamily: "var(--font-body)" }}
                dangerouslySetInnerHTML={{ __html: data.body || "" }}
            />
        </div>
    )
}