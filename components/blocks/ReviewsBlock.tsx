import { ReviewsBlockData } from "@/types/blocks"
import { Star, ShieldCheck, Quote } from "lucide-react"

export default function ReviewsBlock({ data }: { data: ReviewsBlockData }) {
    const rating = data.rating || 4.9
    const totalCount = data.totalCount || 21000

    return (
        <section className="py-24 relative overflow-hidden bg-slate-50/40" style={{ borderBottom: "1px solid var(--border-light)" }}>
            {/* Soft decorative background glows */}
            <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full pointer-events-none opacity-20 blur-[80px]"
                style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
            <div className="absolute bottom-[10%] right-[-10%] w-[380px] h-[380px] rounded-full pointer-events-none opacity-20 blur-[90px]"
                style={{ background: "radial-gradient(circle, var(--text-primary) 0%, transparent 70%)" }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Section with Trust Badge */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full border border-emerald-100/60 bg-emerald-50/50 shadow-sm">
                        <span className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                        </span>
                        <span className="text-xs font-black tracking-wide text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>
                            {rating} / 5.0 Rating
                        </span>
                    </div>

                    <h2
                        className="text-4.5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        People trust us with their families.
                    </h2>
                    
                    <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
                        Read genuine feedback from {totalCount.toLocaleString()}+ Indian families who protected their future with PM Partners's spam-free advisory.
                    </p>
                </div>

                {/* Review cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(data.items || []).map((review, i) => (
                        <div
                            key={i}
                            className="relative overflow-hidden rounded-[28px] p-8 border border-emerald-100/60 bg-white/90 backdrop-blur-md shadow-[0_12px_40px_-12px_rgba(0,179,134,0.03)] transition-all duration-300 hover:shadow-[0_20px_48px_rgba(0,179,134,0.06)] hover:border-emerald-300 hover:-translate-y-1.5 group text-left"
                        >
                            {/* Decorative quotes graphic in background */}
                            <Quote className="absolute right-6 top-6 w-16 h-16 text-emerald-500/5 pointer-events-none select-none transition-transform duration-300 group-hover:scale-110" />

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            {/* Review text */}
                            <p
                                className="text-[14.5px] leading-relaxed mb-6 font-medium text-slate-700 min-h-[72px]"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                &ldquo;{review.body}&rdquo;
                            </p>

                            {/* Divider line */}
                            <div className="h-[1px] w-full bg-slate-100 mb-5" />

                            {/* Reviewer Meta */}
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    {/* Initials Avatar */}
                                    <div
                                        className="w-10 h-10 rounded-full text-xs font-black flex items-center justify-center shrink-0 shadow-sm bg-gradient-to-tr from-emerald-500 to-teal-400 text-white"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {review.initials}
                                    </div>
                                    <div>
                                        <p
                                            className="text-sm font-extrabold text-slate-800"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {review.name}
                                        </p>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                                                Verified Buyer
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
