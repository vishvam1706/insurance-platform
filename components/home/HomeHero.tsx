"use client"

import Link from "next/link"
import { Phone, BadgeCheck, Star, Calendar } from "lucide-react"

interface Props {
    waUrl: string
}

export default function HomeHero({ waUrl }: Props) {
    return (
        <section className="relative overflow-hidden gold-mesh py-16 md:py-24 border-b border-[var(--brand-100)]">
            <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                {/* LEFT */}
                <div className="flex flex-col items-start text-left">
                    {/* Trust badges */}
                    <div className="flex flex-wrap gap-3.5 mb-10 animate-fade-up">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: "var(--brand-100)", background: "#FFFFFF", boxShadow: "0 2px 10px rgba(10,17,40,0.01)" }}>
                            <BadgeCheck className="w-4 h-4" style={{ color: "var(--brand-dark)" }} />
                            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>Backed by Zerodha</span>
                        </div>
                    </div>

                    <h1
                        className="font-extrabold tracking-tight mb-8 leading-[1.05] animate-fade-up"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", fontSize: "clamp(3.2rem, 5.8vw, 4.8rem)" }}
                    >
                        The Ultimate <br />
                        <span className="italic font-normal" style={{ color: "var(--brand-dark)" }}>Insurance Buying</span> <br />
                        Experience.
                    </h1>

                    <p 
                        className="text-lg md:text-xl leading-relaxed mb-10 text-[var(--text-secondary)] max-w-lg font-medium animate-fade-up"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Unbiased expert advice, completely free. Book a call to speak with our expert advisors. Absolutely no spam, no sales pressure.
                    </p>

                    <Link
                        href="/contact"
                        className="btn-primary animate-fade-up hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <Calendar className="w-4 h-4" />
                        Explore Plans
                    </Link>
                </div>

                {/* RIGHT — premium feature card */}
                <div className="relative flex items-center justify-center animate-fade-up">
                    {/* Decorative gold orb glow */}
                    <div className="absolute w-72 h-72 rounded-full blur-[90px] pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(197, 168, 128, 0.1) 0%, transparent 70%)" }} />

                    <div
                        className="relative rounded-[32px] p-8 w-full max-w-md overflow-hidden border border-[var(--brand-100)]"
                        style={{ background: "#FFFFFF", boxShadow: "0 20px 50px rgba(10,17,40,0.03)", minHeight: 280 }}
                    >
                        {/* Card header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ background: "var(--brand-light)", border: "1px solid var(--brand-100)" }}
                                >
                                    <Phone className="w-5 h-5" style={{ color: "var(--brand-dark)" }} />
                                </div>
                                <div>
                                    <p className="font-bold text-[10px] uppercase tracking-widest" style={{ color: "var(--brand-dark)" }}>Application Assistance</p>
                                    <p className="font-extrabold text-sm" style={{ color: "var(--text-primary)" }}>Dedicated Support</p>
                                </div>
                            </div>
                            <div className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider" style={{ background: "var(--brand-light)", color: "var(--brand-dark)" }}>
                                Live status
                            </div>
                        </div>

                        {/* Skeleton rows */}
                        <div className="space-y-4 mb-6">
                            {[75, 90, 60].map((w, i) => (
                                <div key={i} className="flex items-center gap-3.5">
                                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black" style={{ background: "var(--brand-light)", color: "var(--brand-dark)" }}>✓</div>
                                    <div className="h-1.5 rounded-full flex-1" style={{ background: "var(--brand-light)", maxWidth: `${w}%` }} />
                                </div>
                            ))}
                        </div>

                        {/* Card in card */}
                        <div
                            className="absolute -right-4 -bottom-3 w-52 rounded-2xl p-5 border border-[var(--brand-100)]"
                            style={{ 
                                background: "#FFFFFF", 
                                boxShadow: "0 12px 30px rgba(10,17,40,0.06)", 
                                transform: "rotate(3deg)",
                                backdropFilter: "blur(12px)"
                            }}
                        >
                            <p className="font-extrabold text-[10px] uppercase tracking-wider mb-2.5" style={{ color: "var(--text-muted)" }}>Claim Status</p>
                            <div className="h-1.5 rounded-full mb-1.5 w-full" style={{ background: "var(--brand-light)" }} />
                            <div className="h-1.5 rounded-full mb-4 w-3/4" style={{ background: "var(--brand-light)" }} />
                            
                            <div className="flex items-center justify-between pt-1">
                                <p className="font-black text-sm" style={{ color: "var(--brand-dark)", fontFamily: "var(--font-heading)" }}>₹ Paid In Full</p>
                                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(22,163,74,0.1)", color: "#16A34A" }}>✓ Settled</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
