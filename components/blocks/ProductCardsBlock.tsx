import { ProductCardsBlockData } from "@/types/blocks"
import Link from "next/link"
import { Shield } from "lucide-react"

export default function ProductCardsBlock({ data }: { data: ProductCardsBlockData }) {
    const cards = data.cards || []

    return (
        <section className="bg-slate-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {data.title && (
                    <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
                        {data.title}
                    </h2>
                )}
                <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {cards.map((card, i) => (
                        <Link
                            key={i}
                            href={card.href}
                            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all group"
                        >
                            <div className={`w-10 h-10 ${card.colorClass || "bg-blue-600"} rounded-xl flex items-center justify-center mb-4`}>
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {card.title}
                            </h3>
                            <p className="text-slate-500 text-sm">{card.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
