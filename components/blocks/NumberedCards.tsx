import { NumberedCardsData } from "@/types/blocks"

export default function NumberedCards({ data }: { data: NumberedCardsData }) {
    return (
        <div className="my-10">
            {data.title && (
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                    {data.title}
                </h2>
            )}
            {data.quickTake && (
                <p className="text-sm mb-6 italic" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                    {data.quickTake}
                </p>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
                {(data.cards || []).map((card) => (
                    <div
                        key={card.number}
                        className="rounded-2xl p-6"
                        style={{ background: "#FFFFFF", border: "1px solid var(--border)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                    >
                        <div
                            className="w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center mb-4"
                            style={{ background: "var(--brand-light)", color: "var(--brand)", border: "1px solid var(--brand-100)", fontFamily: "var(--font-heading)" }}
                        >
                            {card.number}
                        </div>
                        <h3 className="font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                            {card.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
                            {card.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
