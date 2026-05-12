"use client"

import Link from "next/link"
import { Phone, MessageCircle, BadgeCheck, Star, Users, Calendar } from "lucide-react"

interface Props {
    waUrl: string
}

export default function HomeHero({ waUrl }: Props) {
    return (
        <section className="relative overflow-hidden bg-white">
            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
                {/* LEFT */}
                <div>
                    {/* Trust badges */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: "#E5E7EB", background: "#FAFAFA" }}>
                            <span className="text-lg font-extrabold" style={{ color: "#F59E0B" }}>4.9</span>
                            <Star className="w-4 h-4" style={{ fill: "#F59E0B", color: "#F59E0B" }} />
                            <span className="text-xs" style={{ color: "#6B7280" }}>12000+ ratings on Google</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: "#E5E7EB", background: "#FAFAFA" }}>
                            <BadgeCheck className="w-4 h-4" style={{ color: "#3B82F6" }} />
                            <span className="text-xs font-semibold" style={{ color: "#374151" }}>Backed by Zerodha</span>
                        </div>
                    </div>

                    <h1
                        className="font-extrabold leading-[1.08] tracking-tight mb-6"
                        style={{ fontFamily: "var(--font-heading)", color: "#111827", fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
                    >
                        The Ultimate<br />Insurance<br />Buying Experience
                    </h1>

                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 font-semibold text-sm px-7 py-4 rounded-xl transition-all hover:opacity-90 active:scale-95"
                        style={{ background: "#2563EB", color: "#FFFFFF", fontFamily: "var(--font-body)" }}
                    >
                        <Calendar className="w-4 h-4" />
                        Book a free call now
                    </Link>
                </div>

                {/* RIGHT — feature card */}
                <div className="relative flex items-center justify-center">
                    <div
                        className="relative rounded-3xl p-7 w-full max-w-md overflow-hidden"
                        style={{ background: "#86EFAC", minHeight: 300 }}
                    >
                        {/* Card header */}
                        <div className="flex items-center gap-3 mb-5">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                                style={{ background: "#4ADE80" }}
                            >
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-sm" style={{ color: "#14532D" }}>Application Assistance</p>
                            </div>
                        </div>

                        {/* Skeleton rows */}
                        <div className="space-y-3 mb-4">
                            {[70, 90, 55, 80].map((w, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-3 rounded-full flex-1" style={{ background: "rgba(255,255,255,0.5)", maxWidth: `${w}%` }} />
                                    <div className="h-3 rounded-full w-12" style={{ background: "rgba(255,255,255,0.3)" }} />
                                </div>
                            ))}
                        </div>

                        {/* Card in card */}
                        <div
                            className="absolute -right-8 -bottom-4 w-44 rounded-2xl p-4"
                            style={{ background: "#FFFFFF", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", transform: "rotate(3deg)" }}
                        >
                            <p className="font-bold text-xs mb-2" style={{ color: "#111827" }}>Claim Approved</p>
                            <div className="h-2 rounded-full mb-1.5 w-full" style={{ background: "#E5E7EB" }} />
                            <div className="h-2 rounded-full mb-3 w-3/4" style={{ background: "#E5E7EB" }} />
                            <p className="text-lg" style={{ color: "#3B82F6", fontFamily: "cursive" }}>✓ Approved</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
