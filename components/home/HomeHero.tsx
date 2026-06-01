"use client"

import Link from "next/link"
import { CheckCircle, MessageCircle, CalendarDays, Star, Users, ShieldCheck, Globe } from "lucide-react"
import { motion } from "framer-motion"

interface Props {
    waUrl: string
}

const TRUST_CHIPS = [
    { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Trusted Advisors" },
    { icon: <Star className="w-3.5 h-3.5" />, label: "Plan Comparison" },
    { icon: <CheckCircle className="w-3.5 h-3.5" />, label: "Claim Support" },
    { icon: <Globe className="w-3.5 h-3.5" />, label: "Multi-Language" },
    { icon: <Users className="w-3.5 h-3.5" />, label: "End-to-End" },
]



export default function HomeHero({ waUrl }: Props) {
    return (
        <>
            <section className="relative bg-white overflow-hidden">
                {/* Ambient orb glows */}
                <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none blur-[120px]"
                    style={{ background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 65%)" }} />
                <div className="absolute bottom-0 -left-20 w-[350px] h-[350px] rounded-full pointer-events-none blur-[100px]"
                    style={{ background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)" }} />

                {/* Thin orange top accent bar */}
                <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #F97316, #FBBF24, #F97316)" }} />

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] min-h-[620px] items-stretch">

                    {/* ── LEFT — Text content ──────────────────────────── */}
                    <div className="flex flex-col justify-center py-16 lg:py-20 pr-0 lg:pr-14 text-left">

                        {/* Eyebrow pill */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="inline-flex items-center gap-2 mb-6 self-start"
                        >
                            <span
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border select-none"
                                style={{
                                    color: "#EA580C",
                                    background: "#FFF7ED",
                                    borderColor: "#FFEDD5",
                                }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                IRDAI Licensed · Zero Spam · No Pressure
                            </span>
                        </motion.div>

                        {/* H1 */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
                            className="font-bold text-[#0F172A] leading-[1.06] tracking-tight mb-5"
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(2.4rem, 5.2vw, 3.6rem)",
                            }}
                        >
                            Protect Your Family
                            <br />
                            With{" "}
                            <span className="relative inline-block">
                                <span
                                    className="relative z-10"
                                    style={{
                                        background: "linear-gradient(135deg, #F97316, #FBBF24)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    Smarter Insurance
                                </span>
                                {/* Highlight underline squiggle */}
                                <span
                                    className="absolute -bottom-1 left-0 right-0 h-[5px] rounded-full opacity-25"
                                    style={{ background: "linear-gradient(90deg, #F97316, #FBBF24)" }}
                                />
                            </span>{" "}
                            Decisions
                        </motion.h1>

                        {/* Sub-copy */}
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
                            className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
                            style={{ color: "#475569", fontFamily: "var(--font-body)" }}
                        >
                            Get personalized insurance guidance, transparent plan comparisons,
                            and expert claim support — all in one place.
                        </motion.p>

                        {/* Trust Chips — interactive pill grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
                            className="flex flex-wrap gap-2 mb-9"
                        >
                            {TRUST_CHIPS.map((chip) => (
                                <span
                                    key={chip.label}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border select-none cursor-default transition-all duration-200 hover:scale-[1.04] hover:shadow-sm"
                                    style={{
                                        color: "#374151",
                                        background: "#F9FAFB",
                                        borderColor: "#E5E7EB",
                                    }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLElement
                                        el.style.background = "#FFF7ED"
                                        el.style.borderColor = "#FFEDD5"
                                        el.style.color = "#EA580C"
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLElement
                                        el.style.background = "#F9FAFB"
                                        el.style.borderColor = "#E5E7EB"
                                        el.style.color = "#374151"
                                    }}
                                >
                                    <span className="text-orange-500">{chip.icon}</span>
                                    {chip.label}
                                </span>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.24 }}
                            className="flex flex-col sm:flex-row gap-3 mb-10"
                        >
                            <Link href="/contact" className="btn-primary group">
                                <CalendarDays className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                                Book Free Consultation
                            </Link>
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline group"
                            >
                                <MessageCircle className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                                Get WhatsApp Support
                            </a>
                        </motion.div>


                    </div>

                    {/* ── RIGHT — Photo + Floating Glass Cards ───────── */}
                    <div className="hidden lg:block relative" style={{ background: "#F8FAFC" }}>
                        {/* Main photo */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/uploads/ditto_hero_advisor.png"
                            alt="Policymine advisor helping a customer"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                        {/* Edge fade into white */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent" />

                        {/* Floating glass card — Advisors Online */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                            className="absolute bottom-8 left-6 rounded-2xl px-5 py-4 border"
                            style={{
                                background: "rgba(255,255,255,0.92)",
                                backdropFilter: "blur(16px)",
                                borderColor: "rgba(255,255,255,0.6)",
                                boxShadow: "0 8px 32px rgba(15,23,42,0.12)",
                                maxWidth: 230,
                            }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#16A34A" }}>
                                    Advisors Online
                                </p>
                            </div>
                            <p className="text-sm font-bold text-[#0F172A] leading-snug">
                                Avg. response under 2 minutes
                            </p>
                            <p className="text-[11px] mt-1 font-normal" style={{ color: "#94A3B8" }}>
                                Mon–Sat · 9 AM – 9 PM IST
                            </p>
                        </motion.div>

                        {/* Floating glass card — Trust badge top */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                            className="absolute top-10 right-6 rounded-xl px-4 py-2.5 border flex items-center gap-2.5"
                            style={{
                                background: "rgba(255,255,255,0.88)",
                                backdropFilter: "blur(14px)",
                                borderColor: "#FFEDD5",
                                boxShadow: "0 4px 16px rgba(249,115,22,0.1)",
                            }}
                        >
                            <div className="w-7 h-7 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-4 h-4 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#EA580C" }}>IRDAI Licensed</p>
                                <p className="text-[10px] text-slate-500 font-medium">Certified Advisory</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, #E2E8F0 50%, transparent)" }} />
        </>
    )
}
