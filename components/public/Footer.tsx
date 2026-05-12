"use client"

import Link from "next/link"
import { Phone, MessageCircle } from "lucide-react"
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
        <footer style={{ background: "#F7F8FA", borderTop: "1px solid var(--border)" }}>

            {/* CTA strip */}
            <div
                style={{
                    background: "linear-gradient(135deg, #0F172A 0%, #134E4A 50%, #0F172A 100%)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Subtle glow */}
                <div
                    style={{
                        position: "absolute",
                        top: "-60px",
                        right: "-60px",
                        width: "300px",
                        height: "300px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(0,179,134,0.15) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />
                <div className="max-w-7xl mx-auto px-6 py-12 relative">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <h2
                                className="text-2xl font-extrabold mb-1.5"
                                style={{ fontFamily: "var(--font-heading)", color: "#FFFFFF" }}
                            >
                                Still unsure which plan to pick?
                            </h2>
                            <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                                Book a free call — our advisors will guide you in under 20 minutes.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:opacity-90 active:scale-95"
                                style={{ background: "var(--brand)", color: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,179,134,0.3)" }}
                            >
                                <Phone className="w-4 h-4" />
                                Book Free Call
                            </Link>
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border transition-all hover:bg-white/10 active:scale-95"
                                style={{ borderColor: "rgba(255,255,255,0.25)", color: "#FFFFFF" }}
                            >
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand column */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-5">
                            <span
                                className="font-extrabold text-xl tracking-tight"
                                style={{ fontFamily: "var(--font-heading)", color: "#1A1A2E", letterSpacing: "-0.02em" }}
                            >
                                ditto
                            </span>
                            <span
                                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                style={{ background: "var(--brand-light)", color: "var(--brand)", border: "1px solid var(--brand-100)" }}
                            >
                                insurance
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
                            Honest insurance advice for India. Free consultations, no commissions-first thinking.
                        </p>
                        <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <span key={s} className="text-sm" style={{ color: "#F59E0B" }}>★</span>
                            ))}
                            <span className="text-xs ml-1.5" style={{ color: "var(--text-muted)" }}>
                                4.9 · 21,000+ reviews
                            </span>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(LINKS).map(([group, links]) => (
                        <div key={group}>
                            <h3
                                className="font-bold text-xs uppercase tracking-widest mb-4"
                                style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                            >
                                {group}
                            </h3>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm transition-colors duration-150 hover:text-[#1A1A2E]"
                                            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
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
                    className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
                    style={{ borderTop: "1px solid var(--border)" }}
                >
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        © <CopyrightYear /> InsurePlatform. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Link href="/privacy" className="hover:text-[#1A1A2E] transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-[#1A1A2E] transition-colors">Terms of Use</Link>
                        <Link href="/disclaimer" className="hover:text-[#1A1A2E] transition-colors">Disclaimer</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
