import { FinalThoughtsData } from "@/types/blocks"

export default function FinalThoughts({ data }: { data: FinalThoughtsData }) {
    return (
        <div
            className="my-10 rounded-2xl p-7"
            style={{ background: "var(--brand-light)", border: "1px solid var(--brand-200)" }}
        >
            <h3
                className="text-lg font-extrabold mb-3"
                style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
            >
                {data.title || "Final Thoughts"}
            </h3>
            <div
                className="text-sm leading-relaxed prose prose-sm max-w-none"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
                dangerouslySetInnerHTML={{ __html: data.body || "" }}
            />
        </div>
    )
}
