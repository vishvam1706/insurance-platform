"use client"

import { FrequentlyComparedData } from "@/types/blocks"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function FrequentlyCompared({ data }: { data: FrequentlyComparedData }) {
    return (
        <div className="my-10">
            {data.title && (
                <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                    {data.title}
                </h2>
            )}
            <div className="space-y-3">
                {(data.links || []).map((link, i) => (
                    <Link
                        key={i}
                        href={link.url}
                        className="group flex items-center justify-between p-4 rounded-xl transition-all duration-200"
                        style={{ background: "#FFFFFF", border: "1px solid var(--border)" }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--brand-100)"
                            e.currentTarget.style.background = "var(--brand-light)"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)"
                            e.currentTarget.style.background = "#FFFFFF"
                        }}
                    >
                        <span className="text-sm font-semibold transition-colors duration-200" style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}>
                            {link.label}
                        </span>
                        <ArrowRight className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
