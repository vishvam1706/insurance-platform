import { NumberedCardsData } from "@/types/blocks"

export default function NumberedCards({ data }: { data: NumberedCardsData }) {
    return (
        <div className="my-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-2">{data.title}</h2>
            )}
            {data.quickTake && (
                <p className="text-slate-500 text-sm mb-5 italic">{data.quickTake}</p>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
                {(data.cards || []).map((card) => (
                    <div key={card.number} className="border border-slate-200 rounded-xl p-5">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mb-3">
                            {card.number}
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">{card.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{card.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}