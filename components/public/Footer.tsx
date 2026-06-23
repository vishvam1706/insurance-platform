"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, MessageCircle, Star, ArrowRight, Shield, Mail } from "lucide-react"
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
    "Wealth & Planning": [
        { label: "Investment & Wealth", href: "/wealth" },
        { label: "Retirement Planning", href: "/retirement" },
        { label: "Child Future Planning", href: "/child-future" },
        { label: "Business Insurance", href: "/business-insurance" },
    ],
    "Support & Company": [
        { label: "About Us", href: "/about" },
        { label: "Claim Support", href: "/claims" },
        { label: "Careers Hub", href: "/careers" },
        { label: "Book Free Call", href: "/contact" },
    ],
}

const SOCIAL = [
    {
        label: "Twitter",
        href: "#",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "#",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "#",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
]

export default function PublicFooter() {
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMsg = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    return (
        <footer style={{ fontFamily: "var(--font-body)" }}>

            {/* ── CTA Strip ─────────────────────────────────────────── */}
            <div
                style={{
                    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative glow orbs */}
                <div
                    style={{
                        position: "absolute",
                        top: "-120px",
                        left: "-60px",
                        width: "400px",
                        height: "400px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 65%)",
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "-100px",
                        right: "-40px",
                        width: "350px",
                        height: "350px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 65%)",
                        pointerEvents: "none",
                    }}
                />

                <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 relative z-10">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        <div className="text-left" style={{ maxWidth: "520px" }}>
                            <div className="flex items-center gap-2 mb-3">
                                <Shield className="w-4 h-4" style={{ color: "var(--brand)" }} />
                                <span
                                    className="text-[10px] font-black uppercase tracking-[0.2em]"
                                    style={{ color: "var(--brand)" }}
                                >
                                    Free Expert Guidance
                                </span>
                            </div>
                            <h2
                                className="text-2xl sm:text-3xl font-extrabold leading-tight"
                                style={{ fontFamily: "var(--font-heading)", color: "#FFFFFF", letterSpacing: "-0.02em" }}
                            >
                                Still unsure which plan{" "}
                                <span style={{ color: "var(--brand)" }}>fits you best?</span>
                            </h2>
                            <p className="text-sm mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                                Our certified advisors will guide you to the perfect plan in under 20 minutes — completely free, zero spam.
                            </p>

                            {/* Trust stars */}
                            <div className="flex items-center gap-2 mt-4">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#FBBF24" }} />
                                    ))}
                                </div>
                                <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>
                                    Rated 4.9/5 by 10,000+ families
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2.5 font-bold text-sm px-7 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
                                style={{
                                    background: "var(--brand)",
                                    color: "#FFFFFF",
                                    boxShadow: "0 4px 20px rgba(249,115,22,0.3)",
                                }}
                            >
                                <Phone className="w-4 h-4" />
                                Book Free Call
                                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </Link>
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2.5 font-bold text-sm px-7 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                                style={{
                                    background: "rgba(255,255,255,0.08)",
                                    color: "#FFFFFF",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    backdropFilter: "blur(8px)",
                                }}
                            >
                                <MessageCircle className="w-4 h-4" style={{ color: "#25D366" }} />
                                WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Footer ───────────────────────────────────────── */}
            <div style={{ background: "#F8FAFC", borderTop: "1px solid var(--border-light)" }}>
                <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-10 md:gap-8 text-left">

                        {/* Brand column */}
                        <div className="col-span-2 pr-0 md:pr-8">
                            <Link href="/" className="inline-flex items-center gap-2 mb-5 group">
                                <Image
                                    src="/logo_final.png"
                                    alt="Policymine Insurance"
                                    width={130}
                                    height={36}
                                    className="h-8 w-auto object-contain transition-opacity duration-300 group-hover:opacity-75"
                                />
                            </Link>
                            <p className="text-[13px] leading-relaxed mb-5" style={{ color: "var(--text-muted)", maxWidth: "300px" }}>
                                Our team is available to guide you with insurance planning, documentation support, and claim-related assistance.
                            </p>

                            {/* Contact info */}
                            <div className="space-y-2.5 mb-6">
                                <a
                                    href="tel:+919824923606"
                                    className="flex items-center gap-2.5 text-[13px] font-medium transition-colors duration-200 hover:text-[var(--brand)]"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    <div
                                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: "var(--brand-light)" }}
                                    >
                                        <Phone className="w-3.5 h-3.5" style={{ color: "var(--brand)" }} />
                                    </div>
                                    +91 98249 23606
                                </a>
                                <a
                                    href="mailto:support@policymine.com"
                                    className="flex items-center gap-2.5 text-[13px] font-medium transition-colors duration-200 hover:text-[var(--brand)]"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    <div
                                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: "var(--brand-light)" }}
                                    >
                                        <Mail className="w-3.5 h-3.5" style={{ color: "var(--brand)" }} />
                                    </div>
                                    support@policymine.com
                                </a>
                            </div>

                            {/* Social icons */}
                            <div className="flex items-center gap-2">
                                {SOCIAL.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                                        style={{
                                            color: "var(--text-muted)",
                                            background: "var(--surface)",
                                            border: "1px solid var(--border-light)",
                                        }}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Link columns */}
                        {Object.entries(LINKS).map(([group, links]) => (
                            <div key={group}>
                                <h3
                                    className="font-extrabold text-[11px] uppercase tracking-[0.15em] mb-5 text-slate-800"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {group}
                                </h3>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link.href + link.label}>
                                            <Link
                                                href={link.href}
                                                className="group/link inline-flex items-center gap-1.5 text-[13px] transition-all duration-200 hover:text-[var(--brand-dark)]"
                                                style={{ color: "var(--text-muted)" }}
                                            >
                                                <span className="group-hover/link:translate-x-0.5 transition-transform duration-200">
                                                    {link.label}
                                                </span>
                                                <ArrowRight
                                                    className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200"
                                                    style={{ color: "var(--brand)" }}
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Regulatory Disclaimer Text Block */}
                    <div className="mt-12 pt-8 border-t border-slate-200/60 text-left space-y-3.5">
                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Important Disclaimer</p>
                        <p className="text-[11px] sm:text-xs text-slate-400 font-medium leading-relaxed">
                            Insurance is the subject matter of solicitation. Policy issuance and claim settlement are subject to insurer terms and conditions. Please read all policy documents carefully before making a purchase decision.
                        </p>
                        <p className="text-[11px] sm:text-xs text-slate-400 font-medium leading-relaxed">
                            Policymine acts as an insurance assistance and advisory support platform. Final approval, underwriting, and claim settlement are governed by the respective insurer’s policies and regulatory guidelines.
                        </p>
                    </div>

                    {/* ── Bottom Bar ─────────────────────────────────── */}
                    <div
                        className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                        style={{ borderTop: "1px solid var(--border)" }}
                    >
                        <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                            © <CopyrightYear /> Policymine Insurance. All rights reserved.
                        </p>
                        <div className="flex items-center gap-5 text-[12px]" style={{ color: "var(--text-muted)" }}>
                            <Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors duration-200">Privacy Policy</Link>
                            <span style={{ color: "var(--border)" }}>·</span>
                            <Link href="/terms" className="hover:text-[var(--text-primary)] transition-colors duration-200">Terms of Use</Link>
                            <span style={{ color: "var(--border)" }}>·</span>
                            <Link href="/claims" className="hover:text-[var(--text-primary)] transition-colors duration-200">Claims Assistance</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
