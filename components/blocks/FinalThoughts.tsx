import { FinalThoughtsData } from "@/types/blocks"

export default function FinalThoughts({ data }: { data: FinalThoughtsData }) {
    return (
        <div
            className="my-10 rounded-2xl p-7"
            style={{ background: "#1A1A2E", border: "1px solid #2D3748" }}
        >
            <h3
                className="text-lg font-extrabold mb-3"
                style={{ fontFamily: "var(--font-heading)", color: "#FFFFFF" }}
            >
                {data.title || "Final Thoughts"}
            </h3>
            <div
                className="text-sm leading-relaxed prose prose-sm max-w-none prose-invert"
                style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}
                dangerouslySetInnerHTML={{ __html: data.body || "" }}
            />
        </div>
    )
}
