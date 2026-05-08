"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Phone, Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
    {
        label: "Term Life",
        href: "/term-life",
        children: [
            { label: "What is Term Insurance?", href: "/term-life/what-is-term-insurance" },
            { label: "Term vs Life Insurance", href: "/term-life/term-vs-life-insurance" },
            { label: "Best Term Plans 2026", href: "/term-life/best-term-insurance-plans" },
            { label: "Term Insurance for NRI", href: "/term-life/nri-term-insurance" },
            { label: "1 Crore Term Insurance", href: "/term-life/1-crore-term-insurance" },
            { label: "Term Calculator", href: "/term-life/calculator" },
        ],
    },
    {
        label: "Health",
        href: "/health",
        children: [
            { label: "What is Health Insurance?", href: "/health/what-is-health-insurance" },
            { label: "Compare Health Plans", href: "/health/compare-plans" },
            { label: "Best Health Plans 2026", href: "/health/best-health-insurance-plans" },
            { label: "Family Health Insurance", href: "/health/family-health-insurance" },
            { label: "Senior Citizen Plans", href: "/health/senior-citizen-health-insurance" },
        ],
    },
    { label: "Articles", href: "/articles" },
    { label: "Contact", href: "/contact" },
]

export default function PublicHeader() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <header
            className="sticky top-0 z-50 transition-all duration-300"
            style={{
                height: 64,
                background: scrolled
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.85)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid transparent",
                boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
            }}
        >
            <div className="max-w-7xl mx-auto px-6 h-full">
                <div className="flex items-center justify-between h-full">

                    {/* ── Logo ── */}
                    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                        <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                            style={{
                                background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                                boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
                            }}
                        >
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span
                            className="font-extrabold text-sm tracking-tight"
                            style={{ fontFamily: "var(--font-heading)", color: "#0F172A" }}
                        >
                            InsurePlatform
                        </span>
                    </Link>

                    {/* ── Desktop nav ── */}
                    <nav className="hidden md:flex items-center gap-0.5">
                        {NAV.map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-xl transition-colors duration-150",
                                        activeDropdown === item.label
                                            ? "text-blue-600 bg-blue-50"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    )}
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {item.label}
                                    {item.children && (
                                        <ChevronDown
                                            className={cn(
                                                "w-3.5 h-3.5 transition-transform duration-200",
                                                activeDropdown === item.label && "rotate-180"
                                            )}
                                        />
                                    )}
                                </Link>

                                {/* Dropdown */}
                                {item.children && activeDropdown === item.label && (
                                    <div
                                        className="absolute top-full left-0 mt-2 w-64 rounded-2xl py-2 z-50 animate-fade-in"
                                        style={{
                                            background: "#FFFFFF",
                                            border: "1px solid #E5E7EB",
                                            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                                        }}
                                    >
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="block px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-100 mx-2 rounded-xl"
                                                style={{ fontFamily: "var(--font-body)" }}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* ── Desktop CTA ── */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/contact"
                            className="btn-primary text-sm"
                        >
                            <Phone className="w-3.5 h-3.5" />
                            Book Free Call
                        </Link>
                    </div>

                    {/* ── Mobile toggle ── */}
                    <button
                        onClick={() => setMobileOpen((o) => !o)}
                        className="md:hidden p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* ── Mobile menu ── */}
            {mobileOpen && (
                <div
                    className="md:hidden border-t bg-white px-4 py-4 space-y-1 animate-fade-in"
                    style={{ borderColor: "#F3F4F6" }}
                >
                    {NAV.map((item) => (
                        <div key={item.label}>
                            <Link
                                href={item.href}
                                className="block px-3 py-2.5 text-sm font-semibold rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                style={{ color: "#0F172A", fontFamily: "var(--font-body)" }}
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </Link>
                            {item.children && (
                                <div className="pl-4 space-y-0.5 mt-0.5">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            className="block px-3 py-2 text-sm rounded-xl transition-colors hover:bg-blue-50 hover:text-blue-600"
                                            style={{ color: "#475569", fontFamily: "var(--font-body)" }}
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="pt-3" style={{ borderTop: "1px solid #F3F4F6" }}>
                        <Link
                            href="/contact"
                            className="btn-primary w-full justify-center"
                            onClick={() => setMobileOpen(false)}
                        >
                            <Phone className="w-4 h-4" />
                            Book a Free Call
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}