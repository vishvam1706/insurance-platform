"use client"

import { useEffect, useState } from "react"
import { Mail, Phone, Languages, CheckCircle, Star, Shield, Users, Award } from "lucide-react"
import axios from "axios"

interface LangEntry {
    language: string
    visible: boolean
}

const TRUST_STATS = [
    { icon: Users, value: "1L+", label: "Clients Served" },
    { icon: Star,  value: "4.9★", label: "Avg Rating" },
    { icon: Shield, value: "IRDAI", label: "Certified" },
    { icon: Award,  value: "₹400Cr+", label: "Premium Managed" },
]

export default function ContactSidebar() {
    const [langs, setLangs] = useState<LangEntry[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/api/settings")
            .then(res => {
                const s = res.data.settings
                if (s?.languages) setLangs(s.languages)
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const visibleLangs = langs.filter(l => l.visible).map(l => l.language)

    return (
        <div className="space-y-8 text-left">

            {/* ── Eyebrow + Heading ───────────────────────────────── */}
            <div>
                <p
                    className="text-xs font-black uppercase mb-3 tracking-[0.22em]"
                    style={{ color: "#F97316", fontFamily: "var(--font-body)" }}
                >
                    Expert Consultation
                </p>
                <h1
                    className="font-bold text-[#0F172A] leading-[1.08] tracking-tight mb-4"
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "clamp(1.9rem, 4.2vw, 2.9rem)",
                    }}
                >
                    Get In Touch With Our<br />
                    <span style={{ color: "#F97316" }}>Insurance Experts.</span>
                </h1>
                <p
                    className="text-base leading-relaxed max-w-md font-normal"
                    style={{ color: "#475569", fontFamily: "var(--font-body)" }}
                >
                    Whether you need help understanding plans, comparing policies,
                    or getting claim support — our certified team is here.
                </p>
            </div>

            {/* ── Photo + overlay ─────────────────────────────────── */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg" style={{ height: 260 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/uploads/contact_trust.png"
                    alt="Policymine advisor team"
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                {/* Bottom badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/95 text-slate-700 px-3 py-1.5 rounded-full border border-white/60 shadow backdrop-blur-sm">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        IRDAI Certified Advisors
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-emerald-500/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Available Now
                    </span>
                </div>
            </div>

            {/* ── Trust stats grid ────────────────────────────────── */}
            <div className="grid grid-cols-4 gap-3">
                {TRUST_STATS.map(({ icon: Icon, value, label }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 border border-slate-100"
                    >
                        <Icon className="w-4 h-4 text-orange-500 mb-1.5 shrink-0" />
                        <p className="text-sm font-black text-slate-800 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            {value}
                        </p>
                        <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide mt-0.5 leading-tight">
                            {label}
                        </p>
                    </div>
                ))}
            </div>

            {/* ── Contact details ──────────────────────────────────── */}
            <div className="space-y-3 border-t border-slate-100 pt-5">
                <a
                    href="mailto:support@policymine.in"
                    className="flex items-center gap-3 group"
                >
                    <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                        <Mail className="w-3.5 h-3.5 text-orange-500" />
                    </div>
                    <span className="text-sm text-slate-600 group-hover:text-orange-600 font-medium transition-colors">
                        support@policymine.in
                    </span>
                </a>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">+91-XXXXXXXXXX</span>
                </div>
            </div>

            {/* ── Languages ───────────────────────────────────────── */}
            <div className="border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2 mb-3">
                    <Languages className="w-4 h-4 text-slate-400 shrink-0" />
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-500">
                        Languages We Advise In
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-6 w-16 bg-slate-100 rounded-full animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-1.5">
                        {visibleLangs.map(lang => (
                            <span
                                key={lang}
                                className="text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-sm hover:border-orange-200 hover:text-orange-700 transition-colors"
                            >
                                {lang}
                            </span>
                        ))}
                        {visibleLangs.length === 0 && (
                            <p className="text-xs text-slate-400 italic">Language info unavailable.</p>
                        )}
                    </div>
                )}
            </div>

            {/* ── Privacy note ─────────────────────────────────────── */}
            <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-100 pt-4 font-normal">
                Your name and phone number are used only to connect you with an
                advisor. We never cold-call, never sell your data, and never push
                products you didn't ask about.
            </p>
        </div>
    )
}
