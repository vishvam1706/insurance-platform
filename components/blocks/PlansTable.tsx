import { PlansTableData } from "@/types/blocks"

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={`text-sm ${s <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`}>★</span>
                ))}
            </div>
            <span className="text-xs font-semibold text-slate-700">{rating.toFixed(2)}/5</span>
        </div>
    )
}

export default function PlansTable({ data }: { data: PlansTableData }) {
    return (
        <div className="my-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-2">{data.title}</h2>
            )}
            {data.introText && (
                <p className="text-slate-500 text-sm mb-5">{data.introText}</p>
            )}
            <div className="space-y-4">
                {(data.rows || []).map((row, i) => (
                    <div
                        key={i}
                        className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-900 text-sm mb-1">{row.plan}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{row.riders}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-xs text-slate-400 mb-1">CSR: <span className="font-semibold text-slate-700">{row.csr}</span></p>
                                {row.dittoRating ? (
                                    <StarRating rating={row.dittoRating} />
                                ) : (
                                    <p className="text-xs font-semibold text-slate-700">{row.rating}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}