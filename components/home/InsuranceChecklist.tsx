"use client"

import Link from "next/link"
import { Calendar, MessageCircle, ArrowRight } from "lucide-react"

interface Props {
    waUrl: string
}

export default function InsuranceChecklist({ waUrl }: Props) {
    return (
        <section className="py-20 relative overflow-hidden" style={{ background: "#F1F5F9" }}>
            {/* Decorative floating elements */}
            <div className="absolute left-10 top-16 w-16 h-16 rounded-xl opacity-20 pointer-events-none" style={{ background: "#EF4444", transform: "rotate(-15deg)" }} />
            <div className="absolute right-10 top-24 w-20 h-20 rounded-xl opacity-20 pointer-events-none" style={{ background: "#F59E0B", transform: "rotate(10deg)" }} />
            <div className="absolute left-1/4 bottom-10 w-12 h-12 rounded-full opacity-20 pointer-events-none" style={{ background: "#2563EB" }} />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT — sticky note visual */}
                    <div className="relative flex items-center justify-center py-8">
                        {/* Sticky note */}
                        <div
                            className="relative rounded-xl p-8 shadow-lg"
                            style={{ background: "#FEF08A", width: 280, transform: "rotate(-3deg)", boxShadow: "4px 8px 24px rgba(0,0,0,0.12)" }}
                        >
                            <div className="space-y-3 font-mono text-sm" style={{ color: "#1F2937" }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-gray-400 rounded-sm" />
                                    <span className="uppercase tracking-wide text-xs">DON'T SPLIT THE BILL</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 rounded-sm flex items-center justify-center" style={{ borderColor: "#2563EB", background: "#2563EB" }}>
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    <span className="uppercase tracking-wide text-xs line-through" style={{ color: "#9CA3AF" }}>CHECK ROOM RESTRICTION</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-gray-400 rounded-sm" />
                                    <span className="uppercase tracking-wide text-xs">CHECK...</span>
                                </div>
                            </div>
                            {/* Pencil */}
                            <div
                                className="absolute -bottom-8 -right-4"
                                style={{ fontSize: 48, transform: "rotate(-30deg)" }}
                            >
                                ✏️
                            </div>
                        </div>

                        {/* Floating calendar icon */}
                        <div
                            className="absolute -bottom-4 left-8 w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                            style={{ background: "#FFFFFF" }}
                        >
                            <Calendar className="w-6 h-6" style={{ color: "#EF4444" }} />
                        </div>
                    </div>

                    {/* RIGHT — text + buttons */}
                    <div>
                        <h2
                            className="text-4xl font-extrabold mb-4 leading-tight"
                            style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                        >
                            Insurance<br />Checklist
                        </h2>
                        <p className="text-base leading-relaxed mb-8" style={{ color: "#6B7280" }}>
                            We know how difficult it can be to navigate through hundreds of policies. So we've designed this handy checklist to make sure you know exactly what to look for in a good policy
                        </p>

                        <div className="space-y-3">
                            <Link
                                href="/term-life"
                                className="flex items-center justify-between w-full font-semibold px-6 py-4 rounded-xl transition-all hover:opacity-90"
                                style={{ background: "#2563EB", color: "#FFFFFF" }}
                            >
                                <span><strong>Term</strong> Insurance Checklist</span>
                                <span className="text-lg">⏳</span>
                            </Link>
                            <Link
                                href="/health"
                                className="flex items-center justify-between w-full font-semibold px-6 py-4 rounded-xl transition-all hover:opacity-90"
                                style={{ background: "#2563EB", color: "#FFFFFF" }}
                            >
                                <span><strong>Health</strong> Insurance Checklist</span>
                                <span className="text-lg">🛡️</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
