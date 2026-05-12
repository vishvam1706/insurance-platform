"use client"

import Link from "next/link"
import { Calendar, MessageCircle } from "lucide-react"

interface Props {
    waUrl: string
}

export default function ChooseDittoCta({ waUrl }: Props) {
    return (
        <section
            className="py-16 relative overflow-hidden"
            style={{ background: "#F8FAFC", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}
        >
            {/* Subtle dot grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-[1fr_auto_auto] gap-6 items-center">
                    <h2
                        className="text-3xl font-extrabold leading-tight"
                        style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                    >
                        Choose Ditto for a<br />
                        well-guided<br />
                        insurance purchase
                    </h2>

                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-between gap-4 font-semibold text-sm px-7 py-4 rounded-xl transition-all hover:opacity-90 active:scale-95 min-w-[220px]"
                        style={{ background: "#2563EB", color: "#FFFFFF" }}
                    >
                        Book a free call now
                        <Calendar className="w-5 h-5 shrink-0" style={{ opacity: 0.7 }} />
                    </Link>

                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between gap-4 font-semibold text-sm px-7 py-4 rounded-xl border transition-all hover:bg-white min-w-[220px]"
                        style={{ borderColor: "#D1D5DB", color: "#374151", background: "#F9FAFB" }}
                    >
                        Chat with us on WhatsApp
                        <MessageCircle className="w-5 h-5 shrink-0" style={{ color: "#16A34A" }} />
                    </a>
                </div>
            </div>
        </section>
    )
}
