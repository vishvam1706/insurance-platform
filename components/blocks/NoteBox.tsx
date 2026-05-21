import { NoteBoxData } from "@/types/blocks"
import { Info } from "lucide-react"

export default function NoteBox({ data }: { data: NoteBoxData }) {
    // Support both field naming conventions: label/content (type def) and title/body (old renderer)
    const title = (data as any).title || data.label
    const body = (data as any).body || data.content

    return (
        <div
            className="my-8 rounded-2xl p-6 flex gap-4 border-l-4 border-l-[var(--brand)] shadow-sm"
            style={{ background: "var(--brand-light)", borderTop: "1px solid var(--brand-100)", borderRight: "1px solid var(--brand-100)", borderBottom: "1px solid var(--brand-100)" }}
        >
            <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--brand-dark)" }} />
            <div>
                {title && (
                    <p className="font-bold mb-1.5 text-base" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                        {title}
                    </p>
                )}
                <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
                    {body}
                </p>
            </div>
        </div>
    )
}

