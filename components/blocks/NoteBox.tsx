import { NoteBoxData } from "@/types/blocks"
import { Info } from "lucide-react"

export default function NoteBox({ data }: { data: NoteBoxData }) {
    return (
        <div
            className="my-6 rounded-xl p-5"
            style={{
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
            }}
        >
            <div className="flex items-start gap-3">
                <Info className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#2563EB" }} />
                <div>
                    {data.label && (
                        <p
                            className="text-sm font-bold mb-1"
                            style={{ fontFamily: "var(--font-heading)", color: "#1E40AF" }}
                        >
                            {data.label}
                        </p>
                    )}
                    <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#374151", fontFamily: "var(--font-body)" }}
                    >
                        {data.content}
                    </p>
                </div>
            </div>
        </div>
    )
}