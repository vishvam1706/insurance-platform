"use client"

import { ProductCardsBlockData } from "@/types/blocks"
import Link from "next/link"
import { Shield, Heart, ArrowRight } from "lucide-react"

const ICON_MAP: Record<string, React.ReactNode> = {
    term: <Shield className="w-7 h-7" style={{ color: "var(--blue-600)" }} />,
    health: <Heart className="w-7 h-7" style={{ color: "var(--blue-600)" }} />,
}

export default function ProductCardsBlock({ data }: { data: ProductCardsBlockData }) {
    const cards = data.cards || []

    return (
        <section className="py-24" style={{ background: "var(--surface-muted)" }}>
            <div className="max-w-7xl mx-auto px-6">

                {/* Section label */}
                <div className="text-center mb-16">
                    <span className="badge-blue mb-4 inline-flex">What we cover</span>
                    {data.title && (
                        <h2
                            className="text-4xl font-extrabold"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {data.title}
                        </h2>
                    )}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {cards.map((card: any, i: number) => {
                        const isHealth = card.href?.includes("health")
                        const icon = ICON_MAP[isHealth ? "health" : "term"]

                        return (
                            <Link
                                key={i}
                                href={card.href}
                                className="group relative rounded-3xl p-10 overflow-hidden card-hover"
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                }}
                            >
                                {/* Background watermark icon */}
                                <div
                                    className="absolute -bottom-8 -right-8 opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.07]"
                                    style={{ transform: "rotate(-10deg)" }}
                                >
                                    <div style={{ width: 192, height: 192 }}>
                                        {isHealth
                                            ? <Heart className="w-48 h-48" style={{ color: "var(--blue-600)" }} />
                                            : <Shield className="w-48 h-48" style={{ color: "var(--blue-600)" }} />
                                        }
                                    </div>
                                </div>

                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                                    style={{ background: "var(--blue-50)", border: "1px solid var(--blue-100)" }}
                                >
                                    {icon}
                                </div>

                                <h3
                                    className="text-2xl font-extrabold mb-3"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {card.title}
                                </h3>
                                <p
                                    className="leading-relaxed mb-8 max-w-sm"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    {card.desc}
                                </p>

                                <span
                                    className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all"
                                    style={{ color: "var(--blue-600)" }}
                                >
                                    Learn more <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
