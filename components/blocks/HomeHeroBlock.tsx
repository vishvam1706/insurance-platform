"use client"

import { HomeHeroBlockData } from "@/types/blocks"
import InquiryForm from "@/components/public/InquiryForm"
import Link from "next/link"
import { Shield, Phone, MessageCircle, CheckCircle2, Users, Star, BadgeCheck } from "lucide-react"

export default function HomeHeroBlock({ data }: { data: HomeHeroBlockData }) {
    const showForm = data.showInquiryForm !== false
    const primaryCta = data.primaryCta ?? { text: "Book Free Call", href: "/contact" }
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMsg = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    return (
        <section className="relative overflow-hidden bg-white">
            {/* Dot grid */}
            <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
            {/* Radial glow */}
            <div
                className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)" }}
            />

            <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* ── Left ── */}
                    <div className="animate-fade-up animate-delay-0">
                        {data.badge && (
                            <span className="badge-blue mb-8 inline-flex">
                                <BadgeCheck className="w-3 h-3" />
                                {data.badge}
                            </span>
                        )}

                        <h1
                            className="text-[3.25rem] font-extrabold leading-[1.1] tracking-tight mb-6"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {data.title ? (
                                <>
                                    {data.title.split("\\n").map((line: string, i: number) =>
                                        i === 0
                                            ? <span key={i}>{line}<br /></span>
                                            : <span key={i} className="gradient-text">{line}</span>
                                    )}
                                </>
                            ) : (
                                <>
                                    Insurance advice
                                    <br />
                                    <span className="gradient-text">you can actually trust.</span>
                                </>
                            )}
                        </h1>

                        {data.subtitle && (
                            <p
                                className="text-lg leading-relaxed mb-8 max-w-md"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                {data.subtitle}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 mb-10">
                            <Link href={primaryCta.href} className="btn-primary">
                                <Phone className="w-4 h-4" />
                                {primaryCta.text}
                            </Link>
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-full border transition-all hover:bg-gray-50"
                                style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
                            >
                                <MessageCircle className="w-4 h-4" style={{ color: "var(--whatsapp)" }} />
                                Chat on WhatsApp
                            </a>
                        </div>

                        {/* Trust signals */}
                        <div
                            className="flex flex-wrap items-center gap-5 pt-8"
                            style={{ borderTop: "1px solid var(--border)" }}
                        >
                            {(data.stats && data.stats.length > 0
                                ? data.stats.map((s: any) => ({ icon: <CheckCircle2 className="w-4 h-4" />, text: `${s.value} ${s.label}` }))
                                : [
                                    { icon: <Users className="w-4 h-4" />, text: "8 Lakh+ customers" },
                                    { icon: <Star className="w-4 h-4" style={{ fill: "var(--star)", color: "var(--star)" }} />, text: "4.9/5 rating" },
                                    { icon: <CheckCircle2 className="w-4 h-4" />, text: "100% free" },
                                ]
                            ).map((t: any) => (
                                <div
                                    key={t.text}
                                    className="flex items-center gap-2 text-sm font-medium"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    <span style={{ color: "var(--blue-600)" }}>{t.icon}</span>
                                    {t.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right — form card ── */}
                    {showForm && (
                        <div className="animate-fade-up animate-delay-2">
                            <div
                                className="rounded-3xl p-8 relative overflow-hidden"
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 60px rgba(37,99,235,0.08)",
                                }}
                            >
                                <div
                                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                                    style={{ background: "linear-gradient(90deg, #2563EB, #7C3AED)" }}
                                />
                                <div className="pt-2">
                                    <h2
                                        className="text-xl font-extrabold mb-1"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        Get Expert Advice
                                    </h2>
                                    <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                                        Free · No spam · Response within 2 hours
                                    </p>
                                    <InquiryForm />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
