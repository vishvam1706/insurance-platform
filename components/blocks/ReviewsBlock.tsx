import { ReviewsBlockData } from "@/types/blocks"

export default function ReviewsBlock({ data }: { data: ReviewsBlockData }) {
    return (
        <div className="my-10">
            {/* Rating summary */}
            <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold text-slate-900">{data.rating}</span>
                <div>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <span key={s} className={`text-lg ${s <= Math.round(data.rating) ? "text-amber-400" : "text-slate-200"}`}>★</span>
                        ))}
                    </div>
                    <p className="text-sm text-slate-500">
                        {data.totalCount?.toLocaleString("en-IN")} reviews
                    </p>
                </div>
            </div>

            {/* Review cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(data.items || []).map((review, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                                {review.initials}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <span key={s} className="text-amber-400 text-xs">★</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{review.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}