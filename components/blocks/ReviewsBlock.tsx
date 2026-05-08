import { ReviewsBlockData } from "@/types/blocks"

export default function ReviewsBlock({ data }: { data: ReviewsBlockData }) {
    return (
        <div className="my-10">
            {/* Rating summary */}
            <div className="flex items-center gap-4 mb-8">
                <span
                    className="text-5xl font-extrabold"
                    style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                >
                    {data.rating}
                </span>
                <div>
                    <div className="flex gap-0.5 mb-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <span
                                key={s}
                                className="text-lg"
                                style={{ color: s <= Math.round(data.rating) ? "#F59E0B" : "#E5E7EB" }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <p
                        className="text-sm"
                        style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}
                    >
                        {data.totalCount?.toLocaleString("en-IN")} reviews
                    </p>
                </div>
            </div>

            {/* Review cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(data.items || []).map((review, i) => (
                    <div
                        key={i}
                        className="rounded-2xl p-5 transition-shadow duration-200 hover:shadow-sm"
                        style={{
                            background: "#FFFFFF",
                            border: "1px solid #E5E7EB",
                        }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className="w-9 h-9 rounded-full text-sm font-bold flex items-center justify-center shrink-0"
                                style={{
                                    background: "#EFF6FF",
                                    color: "#2563EB",
                                    fontFamily: "var(--font-heading)",
                                }}
                            >
                                {review.initials}
                            </div>
                            <div>
                                <p
                                    className="text-sm font-semibold"
                                    style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                                >
                                    {review.name}
                                </p>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <span key={s} className="text-xs" style={{ color: "#F59E0B" }}>★</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p
                            className="text-sm leading-relaxed"
                            style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}
                        >
                            {review.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}