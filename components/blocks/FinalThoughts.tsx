import { FinalThoughtsData } from "@/types/blocks"

export default function FinalThoughts({ data, isHome = false }: { data: FinalThoughtsData, isHome?: boolean }) {
    return (
        <div className={isHome ? "py-12" : "my-10"}>
            <div className={isHome ? "max-w-4xl mx-auto px-6 lg:px-8" : "w-full"}>
                <div
                    className="rounded-2xl p-7"
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
            </div>
        </div>
    )
}
