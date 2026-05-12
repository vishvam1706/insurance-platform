"use client"

import { HomeHeroBlockData } from "@/types/blocks"
import InquiryForm from "@/components/public/InquiryForm"
import Link from "next/link"
import { Phone, MessageCircle, CheckCircle2, Users, Star, ShieldCheck } from "lucide-react"

export default function HomeHeroBlock({ data }: { data: HomeHeroBlockData }) {
    const showForm = data.showInquiryForm !== false
    const primaryCta = data.primaryCta ?? { text: "Book Free Call", href: "/contact" }
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMsg = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    return (
        <section className="relative overflow-hidden" style={{ background: "#FFFFFF" }}>
            {/* Light background accent */}
            <div
                className="absolute top-0 right-0 w-[50%] h-full pointer-events-none"
                style={{ background: "linear-gradient(135deg, transparent 0%, #F0FBF8 100%)" }}
            />

            <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20">
                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    {/* Left */}
                    <div className="animate-fade-up animate-delay-0">
                        {data.badge && (
                            <span className="badge-green mb-6 inline-flex">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                {data.badge}
                            </span>
                        )}

                        <h1
                            className="font-extrabold leading-[1.1] tracking-tight mb-5"
                            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.25rem, 4vw, 3.25rem)" }}
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
                                    The Ultimate<br />
                                    <span className="gradient-text">Insurance Buying</span><br />
                                    Experience
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

                        <div className="flex flex-wrap items-center gap-3 mb-10">
                            <Link href={primaryCta.href} className="btn-primary">
                                <Phone className="w-4 h-4" />
                                {primaryCta.text}
                            </Link>
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Chat on WhatsApp
                            </a>
                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center gap-6 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                            {(data.stats && data.stats.length > 0
                                ? data.stats.map((s: any) => ({ icon: <CheckCircle2 className="w-4 h-4" />, text: `${s.value} ${s.label}` }))
                                : [
                                    { icon: <Users className="w-4 h-4" />, text: "8 Lakh+ customers" },
                                    { icon: <Star className="w-4 h-4" style={{ fill: "#F59E0B", color: "#F59E0B" }} />, text: "4.9/5 on Google" },
                                    { icon: <CheckCircle2 className="w-4 h-4" />, text: "100% free" },
                                ]
                            ).map((t: any) => (
                                <div
                                    key={t.text}
                                    className="flex items-center gap-2 text-sm font-medium"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    <span style={{ color: "var(--brand)" }}>{t.icon}</span>
                                    {t.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — hero image OR form */}
                    <div className="animate-fade-up animate-delay-2">
                        {(data as any).imageUrl ? (
                            /* CMS Image */
                            <div className="relative">
                                <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ border: "1px solid #E5E7EB" }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={(data as any).imageUrl}
                                        alt="Insurance Hero"
                                        className="w-full object-cover"
                                        style={{ maxHeight: 480 }}
                                    />
                                </div>
                                {/* Floating trust badge */}
                                <div
                                    className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 flex items-center gap-3"
                                    style={{ background: "#FFFFFF", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid #F3F4F6" }}
                                >
                                    <Star className="w-5 h-5" style={{ fill: "#F59E0B", color: "#F59E0B" }} />
                                    <div>
                                        <p className="text-sm font-extrabold" style={{ color: "#111827" }}>4.9 / 5</p>
                                        <p className="text-xs" style={{ color: "#9CA3AF" }}>21,000+ reviews</p>
                                    </div>
                                </div>
                            </div>
                        ) : showForm ? (
                            /* Inquiry Form */
                            <div
                                className="rounded-3xl p-7 relative overflow-hidden"
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.04), 0 24px 64px rgba(0,179,134,0.08)",
                                }}
                            >
                                <div
                                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                                    style={{ background: "linear-gradient(90deg, var(--brand), #00D4A0)" }}
                                />
                                <div className="pt-2">
                                    <p
                                        className="text-xs font-semibold uppercase tracking-widest mb-1"
                                        style={{ color: "var(--brand)", fontFamily: "var(--font-body)" }}
                                    >
                                        Professional Advice
                                    </p>
                                    <h2 className="text-xl font-extrabold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                                        Get Expert Guidance
                                    </h2>
                                    <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                                        Free · No spam · Response within 2 hours
                                    </p>
                                    <InquiryForm />
                                </div>
                            </div>
                        ) : (
                            /* Decorative card (default fallback) */
                            <div
                                className="relative rounded-3xl p-7 w-full overflow-hidden"
                                style={{ background: "#86EFAC", minHeight: 300 }}
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#4ADE80" }}>
                                        <Phone className="w-5 h-5 text-white" />
                                    </div>
                                    <p className="font-bold text-sm" style={{ color: "#14532D" }}>Application Assistance</p>
                                </div>
                                <div className="space-y-3 mb-4">
                                    {[70, 90, 55, 80].map((w, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="h-3 rounded-full flex-1" style={{ background: "rgba(255,255,255,0.5)", maxWidth: `${w}%` }} />
                                            <div className="h-3 rounded-full w-12" style={{ background: "rgba(255,255,255,0.3)" }} />
                                        </div>
                                    ))}
                                </div>
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
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

