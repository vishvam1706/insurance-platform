"use client"

import Link from "next/link"
import { Shield, Phone, MessageCircle, ArrowRight } from "lucide-react"
import CopyrightYear from "./CopyrightYear"

const LINKS = {
    "Term Life": [
        { label: "What is Term Insurance?", href: "/term-life/what-is-term-insurance" },
        { label: "Term vs Life Insurance", href: "/term-life/term-vs-life-insurance" },
        { label: "Best Term Plans", href: "/term-life/best-term-insurance-plans" },
        { label: "1 Crore Term Plan", href: "/term-life/1-crore-term-insurance" },
        { label: "NRI Term Insurance", href: "/term-life/nri-term-insurance" },
    ],
    "Health Insurance": [
        { label: "What is Health Insurance?", href: "/health/what-is-health-insurance" },
        { label: "Compare Plans", href: "/health/compare-plans" },
        { label: "Best Health Plans", href: "/health/best-health-insurance-plans" },
        { label: "Family Health Insurance", href: "/health/family-health-insurance" },
    ],
    "Company": [
        { label: "About Us", href: "/about" },
        { label: "Articles", href: "/articles" },
        { label: "Contact", href: "/contact" },
        { label: "Book Free Call", href: "/book-call" },
    ],
}

export default function PublicFooter() {
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMsg = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    return (
        <footer style={{ background: "#0F172A" }}>
            {/* ── CTA strip ── */}
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <h2
                                className="text-2xl font-extrabold text-white mb-1"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Still unsure which plan to pick?
                            </h2>
                            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                                Book a free call — our advisors will guide you in under 20 minutes.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold text-sm px-6 py-3 rounded-full transition-all hover:bg-blue-50 active:scale-95"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                <Phone className="w-4 h-4" />
                                Book Free Call
                            </Link>
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main footer grid ── */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand column */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2.5 mb-5">
                            <div
                                className="w-8 h-8 rounded-xl flex items-center justify-center"
                                style={{
                                    background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                                    boxShadow: "0 2px 8px rgba(37,99,235,0.4)",
                                }}
                            >
                                <Shield className="w-4 h-4 text-white" />
                            </div>
                            <span
                                className="font-extrabold text-sm text-white"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                InsurePlatform
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Honest insurance advice for India. Free consultations, no commissions-first thinking.
                        </p>
                        <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <span key={s} className="text-sm" style={{ color: "#F59E0B" }}>★</span>
                            ))}
                            <span className="text-xs ml-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                                4.9 · 15,000+ reviews
                            </span>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(LINKS).map(([group, links]) => (
                        <div key={group}>
                            <h3
                                className="font-bold text-xs uppercase tracking-widest mb-5"
                                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
                            >
                                {group}
                            </h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm transition-colors duration-150 hover:text-white"
                                            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div
                    className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                        © <CopyrightYear /> InsurePlatform. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                        <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}