"use client"

import { CtaBlockData } from "@/types/blocks"
import Link from "next/link"
import { Phone, MessageCircle, CheckCircle2 } from "lucide-react"

export default function CtaBlock({ data }: { data: CtaBlockData }) {
    const waNumber = data.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMsg = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    return (
        <div
            className="my-12 rounded-3xl p-10 relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 60%, #1D4ED8 100%)",
            }}
        >
            {/* Subtle dot overlay */}
            <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

            <div className="relative">
                {data.title && (
                    <h3
                        className="text-2xl font-extrabold text-white mb-6 max-w-lg"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {data.title}
                    </h3>
                )}

                <div className="flex flex-wrap gap-3 mb-6">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold text-sm px-6 py-3 rounded-full transition-all hover:bg-blue-50 active:scale-95"
                        style={{ fontFamily: "var(--font-body)", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
                    >
                        <Phone className="w-4 h-4" />
                        {data.bookCallText || "Book a Free Call"}
                    </Link>
                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-full border border-white/25 hover:bg-white/10 transition-all active:scale-95"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        <MessageCircle className="w-4 h-4" />
                        {data.whatsappText || "Chat on WhatsApp"}
                    </a>
                </div>

                <div className="flex flex-wrap gap-5">
                    {["Free consultation", "No spam", "Expert advisors"].map((r) => (
                        <div key={r} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                            <CheckCircle2 className="w-4 h-4 opacity-75" />
                            {r}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}