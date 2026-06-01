"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface Props {
    waUrl: string
}

const CHECKLIST_ITEMS = [
    { text: "No Room Rent Caps", checked: true },
    { text: "Zero Copay Clause", checked: true },
    { text: "Restore Benefit Active", checked: true },
    { text: "Check Waiting Period...", checked: false },
]

export default function InsuranceChecklist({ waUrl }: Props) {
    return (
        <>
            <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "#FFFFFF" }}>
                {/* Ambient blurs */}
                <div className="absolute left-[-8%] top-[15%] w-[350px] h-[350px] rounded-full pointer-events-none blur-[100px]"
                    style={{ background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)" }} />
                <div className="absolute right-[-6%] bottom-[10%] w-[400px] h-[400px] rounded-full pointer-events-none blur-[110px]"
                    style={{ background: "radial-gradient(circle, rgba(15,23,42,0.03) 0%, transparent 70%)" }} />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                        {/* LEFT — Skeuomorphic Notepad */}
                        <motion.div
                            initial={{ opacity: 0, x: -25 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="relative flex items-center justify-center py-8"
                        >
                            {/* Ambient drop shadow */}
                            <div className="absolute inset-x-8 inset-y-4 bg-gradient-to-b from-transparent to-slate-200/20 blur-xl rounded-full" />

                            {/* Main clipboard card */}
                            <div
                                className="relative w-[320px] sm:w-[400px] max-w-full"
                                style={{ transform: "rotate(-1.5deg)" }}
                            >
                                {/* Realistic wire clip handle */}
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-8 border-4 border-slate-300 rounded-t-xl pointer-events-none z-0" />

                                {/* Paper card */}
                                <div
                                    className="rounded-3xl p-8 sm:p-10 relative overflow-hidden z-10"
                                    style={{
                                        background: "#FFFFFF",
                                        border: "1.5px solid #E2E8F0",
                                        boxShadow: "0 25px 60px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04)",
                                    }}
                                >
                                    {/* Vertical red legal paper margin line */}
                                    <div className="absolute left-7.5 top-0 bottom-0 w-px bg-red-100/70" />

                                    {/* Metallic binder clip */}
                                    <div
                                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-7.5 rounded-t-lg border-t border-x"
                                        style={{
                                            background: "linear-gradient(180deg, #FDBA74 0%, #F97316 50%, #EA580C 100%)",
                                            borderColor: "#FFEDD5",
                                            boxShadow: "0 3px 8px rgba(234,88,12,0.35)",
                                        }}
                                    />
                                    {/* Inner clip detail */}
                                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-12 h-2.5 rounded-b-md" style={{ background: "rgba(234,88,12,0.3)" }} />

                                    {/* Header */}
                                    <div className="mb-8 pb-5 pl-4 relative" style={{ borderBottom: "1px solid #F1F5F9" }}>
                                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#EA580C" }}>The Checklist</span>
                                        <p className="text-lg sm:text-xl font-extrabold mt-1" style={{ color: "#0F172A", fontFamily: "var(--font-heading)" }}>Perfect Coverage Check</p>
                                    </div>

                                    {/* Items */}
                                    <div className="space-y-5 pl-4 relative">
                                        {CHECKLIST_ITEMS.map((item) => (
                                            <div key={item.text} className={`flex items-center gap-3.5 ${!item.checked ? "opacity-50" : ""}`}>
                                                <div
                                                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all"
                                                    style={{
                                                        background: item.checked ? "#FFF7ED" : "#F8FAFC",
                                                        border: `1.5px solid ${item.checked ? "#F97316" : "#E2E8F0"}`,
                                                    }}
                                                >
                                                    {item.checked && (
                                                        <span className="text-[10px] font-black" style={{ color: "#EA580C" }}>✓</span>
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold uppercase tracking-wide" style={{ color: item.checked ? "#0F172A" : "#94A3B8" }}>
                                                    {item.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Ruled lines — subtle legal paper effect */}
                                    <div className="mt-8 space-y-4 pl-4 relative">
                                        {[1, 2].map(n => (
                                            <div key={n} className="h-px" style={{ background: "#F1F5F9" }} />
                                        ))}
                                    </div>
                                </div>

                                {/* "Unbiased" floating seal badge */}
                                <div
                                    className="absolute -bottom-4 -right-3 rounded-full px-4 py-2 flex items-center gap-2 select-none z-20"
                                    style={{
                                        background: "#0F172A",
                                        border: "2.5px solid #F97316",
                                        boxShadow: "0 8px 24px rgba(15,23,42,0.2)",
                                    }}
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white">Unbiased</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT — Text + Selector Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 25 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="text-left"
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest block mb-3" style={{ color: "#EA580C" }}>
                                The Checklist
                            </span>
                            <h2
                                className="text-3xl lg:text-[2.75rem] font-extrabold leading-tight mb-5"
                                style={{ fontFamily: "var(--font-heading)", color: "#0F172A" }}
                            >
                                Know What to Look For
                                <br />
                                <span style={{ color: "#F97316" }}>Before You Buy.</span>
                            </h2>
                            <p className="text-base leading-relaxed mb-10 max-w-lg" style={{ color: "#64748B" }}>
                                We know how difficult it can be to navigate through hundreds of policies. So we&apos;ve designed handy checklists to make sure you know exactly what to check before committing.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { href: "/term-life", icon: <ShieldCheck className="w-5 h-5" />, tag: "Term Insurance", label: "Term Life Checklist" },
                                    { href: "/health", icon: <HeartHandshake className="w-5 h-5" />, tag: "Health Insurance", label: "Health Policy Checklist" },
                                ].map(card => (
                                    <Link
                                        key={card.href}
                                        href={card.href}
                                        className="group flex items-center justify-between w-full p-5 sm:p-6 rounded-2xl bg-white transition-all duration-300 hover:-translate-y-0.5"
                                        style={{
                                            border: "1px solid #E2E8F0",
                                            boxShadow: "0 2px 8px rgba(15,23,42,0.02)",
                                        }}
                                        onMouseEnter={e => {
                                            const el = e.currentTarget as HTMLElement
                                            el.style.borderColor = "#FFEDD5"
                                            el.style.boxShadow = "0 8px 24px rgba(249,115,22,0.06)"
                                        }}
                                        onMouseLeave={e => {
                                            const el = e.currentTarget as HTMLElement
                                            el.style.borderColor = "#E2E8F0"
                                            el.style.boxShadow = "0 2px 8px rgba(15,23,42,0.02)"
                                        }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                                                style={{ background: "#FFF7ED", border: "1px solid #FFEDD5", color: "#EA580C" }}
                                            >
                                                {card.icon}
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#EA580C" }}>{card.tag}</p>
                                                <p className="text-base font-extrabold text-slate-900 mt-0.5">{card.label}</p>
                                            </div>
                                        </div>
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-orange-500 group-hover:text-white" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", color: "#94A3B8" }}>
                                            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, #E2E8F0 50%, transparent)" }} />
        </>
    )
}
