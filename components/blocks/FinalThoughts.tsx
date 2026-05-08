import { FinalThoughtsData } from "@/types/blocks"

export default function FinalThoughts({ data }: { data: FinalThoughtsData }) {
    return (
        <div
            className="my-10 pt-8"
            style={{ borderTop: "1px solid #E5E7EB" }}
        >
            {data.title && (
                <h2
                    className="text-2xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                >
                    {data.title}
                </h2>
            )}
            <div
                className="prose max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
                dangerouslySetInnerHTML={{ __html: data.body || "" }}
            />
        </div>
    )
}