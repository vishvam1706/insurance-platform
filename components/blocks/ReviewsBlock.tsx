import { ReviewsBlockData } from "@/types/blocks"

export default function ReviewsBlock({ data }: { data: ReviewsBlockData }) {
    return (
        <section className="py-20" style={{ background: "#FFFFFF" }}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <span
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                            style={{ background: "var(--brand-light)", color: "var(--brand)", border: "1px solid var(--brand-100)" }}
                        >
                            ★ {data.rating} / 5 rating
                        </span>
                        {data.totalCount && (
                            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                                {data.totalCount.toLocaleString("en-IN")} reviews
                            </span>
                        )}
                    </div>
                    <h2
                        className="text-3xl font-extrabold"
                        style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                    >
                        People trust us with their families.
                    </h2>
                </div>

                {/* Review cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(data.items || []).map((review, i) => (
                        <div
                            key={i}
                            className="rounded-3xl p-7"
                            style={{
                                background: "#F8FAFC",
                                border: "1px solid #E5E7EB",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                            }}
                        >
                            {/* Stars */}
                            <div className="flex gap-0.5 mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <span key={s} className="text-base" style={{ color: "#F59E0B" }}>★</span>
                                ))}
                            </div>

                            <p
                                className="text-sm leading-relaxed mb-6"
                                style={{ color: "#374151", fontFamily: "var(--font-body)" }}
                            >
                                &ldquo;{review.body}&rdquo;
                            </p>

                            {/* Reviewer */}
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center shrink-0"
                                    style={{ background: "var(--brand-light)", color: "var(--brand)", fontFamily: "var(--font-heading)" }}
                                >
                                    {review.initials}
                                </div>
                                <div>
                                    <p
                                        className="text-sm font-bold"
                                        style={{ color: "#111827", fontFamily: "var(--font-heading)" }}
                                    >
                                        {review.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
