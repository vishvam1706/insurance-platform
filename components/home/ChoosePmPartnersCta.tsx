"use client"

import Link from "next/link"
import { CalendarDays, MessageCircle, ArrowRight, Shield, Heart, Users, Award } from "lucide-react"
import { motion } from "framer-motion"

interface Props {
    waUrl: string
}

const TRUST_METRICS = [
    { icon: <Users className="w-4 h-4" />, value: "100K+", label: "Customers Assisted" },
    { icon: <Award className="w-4 h-4" />, value: "3000+", label: "Partners Nationwide" },
    { icon: <Shield className="w-4 h-4" />, value: "₹400Cr+", label: "Premium Managed" },
    { icon: <Heart className="w-4 h-4" />, value: "50+", label: "Expert Team" },
]

export default function ChoosepolicymineCta({ waUrl }: Props) {
    return (
        <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#0F172A" }}>
            {/* Ambient radial glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 65%)" }} />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 65%)" }} />

            {/* Subtle grid texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }} />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Top metrics row — glass bento cards */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14"
                >
                    {TRUST_METRICS.map(m => (
                        <div
                            key={m.label}
                            className="rounded-xl px-4 py-4 text-center transition-all duration-200 hover:-translate-y-0.5"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                backdropFilter: "blur(8px)",
                            }}
                        >
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg mb-2" style={{ background: "rgba(249,115,22,0.12)", color: "#FB923C" }}>
                                {m.icon}
                            </div>
                            <p className="text-xl font-extrabold text-white leading-none" style={{ fontFamily: "var(--font-heading)" }}>{m.value}</p>
                            <p className="text-[10px] font-semibold uppercase tracking-widest mt-1" style={{ color: "#64748B" }}>{m.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Main content */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center"
                >
                    {/* Eyebrow */}
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-5" style={{ color: "#F97316" }}>
                        Take The First Step
                    </p>

                    {/* H2 */}
                    <h2
                        className="font-extrabold text-white mb-5 leading-tight tracking-tight"
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                        }}
                    >
                        Secure What Matters
                        <br />
                        <span className="relative inline-block">
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #F97316, #FBBF24)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Most
                            </span>
                            <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full opacity-30" style={{ background: "linear-gradient(90deg, #F97316, #FBBF24)" }} />
                        </span>
                    </h2>

                    {/* Sub-copy */}
                    <p
                        className="text-base leading-relaxed mb-10 mx-auto max-w-2xl"
                        style={{ color: "#94A3B8", fontFamily: "var(--font-body)" }}
                    >
                        Get expert insurance guidance tailored to your financial goals,
                        responsibilities, and future plans.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {/* Primary gradient CTA */}
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                            style={{
                                background: "linear-gradient(135deg, #F97316, #FBBF24)",
                                boxShadow: "0 4px 20px rgba(249,115,22,0.3)",
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(249,115,22,0.45)"
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(249,115,22,0.3)"
                            }}
                        >
                            <CalendarDays className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                            Schedule Free Consultation
                        </Link>

                        {/* WhatsApp outlined */}
                        <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
                            style={{
                                border: "1.5px solid #25D366",
                                color: "#25D366",
                                background: "transparent",
                                fontFamily: "var(--font-body)",
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLElement
                                el.style.background = "rgba(37,211,102,0.08)"
                                el.style.boxShadow = "0 4px 16px rgba(37,211,102,0.15)"
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLElement
                                el.style.background = "transparent"
                                el.style.boxShadow = "none"
                            }}
                        >
                            <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
                            Connect On WhatsApp
                        </a>

                        {/* Text link */}
                        <Link
                            href="/term-life"
                            className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                            style={{ color: "#64748B", fontFamily: "var(--font-body)" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF" }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#64748B" }}
                        >
                            Compare Plans Today
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </motion.div>

                {/* Regulatory Disclaimer */}
                <p
                    className="mt-14 text-xs text-center max-w-2xl mx-auto leading-relaxed"
                    style={{ color: "rgba(148,163,184,0.6)", fontFamily: "var(--font-body)" }}
                >
                    Insurance is the subject matter of solicitation. Policy issuance and claim
                    settlement are subject to insurer terms and conditions.
                </p>
            </div>
        </section>
    )
}
