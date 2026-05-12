"use client"

import { CtaBlockData } from "@/types/blocks"
import Link from "next/link"
import { Phone, MessageCircle, CheckCircle2 } from "lucide-react"

export default function CtaBlock({ data }: { data: CtaBlockData }) {
    const waNumber = data.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMsg = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    return (
        <div className="-mx-6 sm:-mx-8 my-0">
            <div
                className="relative overflow-hidden px-8 sm:px-12 py-12 sm:py-16"
                style={{
                    background: "linear-gradient(135deg, #0F172A 0%, #134E4A 50%, #0F172A 100%)",
                }}
            >
                {/* Teal radial glow top-right */}
                <div
                    className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(0,179,134,0.18) 0%, transparent 70%)" }}
                />
                <div
                    className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(0,212,160,0.1) 0%, transparent 70%)" }}
                />

                {/* Dot grid overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.04]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                <div className="relative max-w-xl">
                    <span
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
                        style={{ background: "rgba(0,179,134,0.15)", color: "var(--brand)", border: "1px solid rgba(0,179,134,0.25)" }}
                    >
                        Free Expert Advice
                    </span>

                    {data.title && (
                        <h3
                            className="text-2xl sm:text-3xl font-extrabold mb-3 leading-snug"
                            style={{ fontFamily: "var(--font-heading)", color: "#FFFFFF" }}
                        >
                            {data.title}
                        </h3>
                    )}

                    <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)", lineHeight: 1.7 }}>
                        Talk to an IRDAI-certified expert for free. No spam, no pressure — just honest advice.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-6">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full transition-all hover:opacity-90 active:scale-95"
                            style={{ background: "var(--brand)", color: "#FFFFFF", boxShadow: "0 2px 16px rgba(0,179,134,0.35)", fontFamily: "var(--font-body)" }}
                        >
                            <Phone className="w-4 h-4" />
                            {data.bookCallText || "Book a Free Call"}
                        </Link>
                        <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-full border transition-all hover:bg-white/10 active:scale-95"
                            style={{ borderColor: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}
                        >
                            <MessageCircle className="w-4 h-4" />
                            {data.whatsappText || "Chat on WhatsApp"}
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-5">
                        {["Free consultation", "No spam", "Expert advisors"].map((r) => (
                            <div key={r} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
                                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "var(--brand)" }} />
                                {r}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
