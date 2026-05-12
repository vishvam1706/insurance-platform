"use client"

import { ProductCardsBlockData } from "@/types/blocks"
import Link from "next/link"
import { Shield, Heart, ArrowRight, Phone, MessageCircle } from "lucide-react"

const ICON_MAP: Record<string, React.ReactNode> = {
    term: <Shield className="w-6 h-6" style={{ color: "var(--brand)" }} />,
    health: <Heart className="w-6 h-6" style={{ color: "var(--brand)" }} />,
}

export default function ProductCardsBlock({ data }: { data: ProductCardsBlockData }) {
    const cards = data.cards || []
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMsg = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    return (
        <section className="py-20" style={{ background: "var(--surface-muted)" }}>
            <div className="max-w-7xl mx-auto px-6">

                {/* Section header */}
                <div className="text-center mb-12">
                    <span className="badge-green mb-4 inline-flex">Ditto Offers</span>
                    {data.title && (
                        <h2
                            className="text-3xl font-extrabold"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {data.title}
                        </h2>
                    )}
                    <p className="mt-3 text-base" style={{ color: "var(--text-secondary)" }}>
                        Personalised Advice on
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-5 mb-6">
                    {cards.map((card: any, i: number) => {
                        const isHealth = card.href?.includes("health")
                        const icon = ICON_MAP[isHealth ? "health" : "term"]

                        return (
                            <div
                                key={i}
                                className="group relative rounded-2xl p-8 overflow-hidden card-hover"
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                                    style={{ background: "var(--brand-light)", border: "1px solid var(--brand-100)" }}
                                >
                                    {icon}
                                </div>

                                <h3
                                    className="text-xl font-extrabold mb-2"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {card.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed mb-6 max-w-sm"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    {card.desc}
                                </p>

                                <div className="flex flex-wrap gap-2.5">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
                                        style={{ background: "var(--brand)", color: "#FFFFFF" }}
                                    >
                                        <Phone className="w-3.5 h-3.5" />
                                        Book a free call now
                                    </Link>
                                    <a
                                        href={waUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border transition-all"
                                        style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                                    >
                                        <MessageCircle className="w-3.5 h-3.5" style={{ color: "var(--whatsapp)" }} />
                                        Chat with us on WhatsApp
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
