"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Phone, Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Static fallback links (shown when CMS has no pages or API fails)
const STATIC_FALLBACKS: Record<string, { label: string; href: string }[]> = {
    "term-life": [
        { label: "What is Term Insurance?", href: "/term-life/what-is-term-insurance" },
        { label: "Best Term Plans 2026", href: "/term-life/best-term-insurance-plans" },
        { label: "Term vs Life Insurance", href: "/term-life/term-vs-life-insurance" },
    ],
    "health": [
        { label: "What is Health Insurance?", href: "/health/what-is-health-insurance" },
        { label: "Best Health Plans 2026", href: "/health/best-health-insurance-plans" },
        { label: "Family Health Insurance", href: "/health/family-health-insurance" },
    ],
}

// Top-level nav structure (sections are always present)
const TOP_NAV = [
    { label: "Life Insurance", href: "/term-life", section: "term-life" },
    { label: "Health Insurance", href: "/health", section: "health" },
    { label: "Claims", href: "/claims", section: null },
    { label: "Articles", href: "/articles", section: null },
]

interface NavChild { label: string; href: string }

export default function PublicHeader() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [scrolled, setScrolled] = useState(false)
    const [cmsLinks, setCmsLinks] = useState<Record<string, NavChild[]>>({})
    const fetchedRef = useRef(false)

    // Scroll shadow
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    // Fetch CMS nav once on mount
    useEffect(() => {
        if (fetchedRef.current) return
        fetchedRef.current = true
        fetch("/api/cms/nav", { next: { revalidate: 60 } } as RequestInit)
            .then((r) => r.ok ? r.json() : null)
            .then((data) => {
                if (data?.sections) setCmsLinks(data.sections)
            })
            .catch(() => { /* keep static fallbacks */ })
    }, [])

    // Resolve children: use CMS pages if available, else static fallbacks
    function getChildren(section: string): NavChild[] {
        const cms = cmsLinks[section]
        if (cms && cms.length > 0) return cms.slice(0, 8)
        return STATIC_FALLBACKS[section] ?? []
    }

    return (
        <header
            className="sticky top-0 z-50 transition-all duration-200"
            style={{
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
                boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.05)" : "none",
            }}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between" style={{ height: 64 }}>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <span
                        className="font-extrabold text-xl tracking-tight"
                        style={{ fontFamily: "var(--font-heading)", color: "#1A1A2E", letterSpacing: "-0.02em" }}
                    >
                        ditto
                    </span>
                    <span
                        className="hidden sm:inline-flex text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: "var(--brand-light)", color: "var(--brand)", border: "1px solid var(--brand-100)" }}
                    >
                        insurance
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center">
                    {TOP_NAV.map((item) => {
                        const children = item.section ? getChildren(item.section) : []
                        return (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => children.length > 0 && setActiveDropdown(item.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150",
                                        activeDropdown === item.label
                                            ? "text-[#1A1A2E] bg-[#F7F8FA]"
                                            : "text-[#52637A] hover:text-[#1A1A2E] hover:bg-[#F7F8FA]"
                                    )}
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {item.label}
                                    {children.length > 0 && (
                                        <ChevronDown
                                            className={cn("w-3.5 h-3.5 transition-transform duration-200 opacity-60", activeDropdown === item.label && "rotate-180")}
                                        />
                                    )}
                                </Link>

                                {children.length > 0 && activeDropdown === item.label && (
                                    <div
                                        className="absolute top-full left-0 mt-1 w-64 rounded-2xl py-2 z-50 animate-fade-in"
                                        style={{ background: "#FFFFFF", border: "1px solid var(--border)", boxShadow: "0 4px 24px rgba(0,0,0,0.09)" }}
                                    >
                                        {children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="block px-4 py-2.5 text-sm mx-1.5 rounded-xl transition-colors duration-100 text-[#52637A] hover:text-[--brand] hover:bg-[--brand-light]"
                                                style={{ fontFamily: "var(--font-body)" }}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                        {/* Hub link at bottom */}
                                        <div className="mx-1.5 mt-1 pt-1" style={{ borderTop: "1px solid var(--border)" }}>
                                            <Link
                                                href={item.href}
                                                className="block px-4 py-2 text-xs font-semibold rounded-xl transition-colors duration-100"
                                                style={{ color: "var(--brand)", fontFamily: "var(--font-body)" }}
                                            >
                                                View all →
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Link href="/contact" className="btn-primary">
                        <Phone className="w-3.5 h-3.5" />
                        Book Free Call
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileOpen((o) => !o)}
                    className="md:hidden p-2 rounded-lg transition-colors text-[#52637A]"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t bg-white px-4 py-3 space-y-0.5 animate-fade-in" style={{ borderColor: "var(--border)" }}>
                    {TOP_NAV.map((item) => {
                        const children = item.section ? getChildren(item.section) : []
                        return (
                            <div key={item.label}>
                                <Link
                                    href={item.href}
                                    className="block px-3 py-2.5 text-sm font-semibold rounded-xl hover:bg-[#F7F8FA] transition-colors"
                                    style={{ color: "#1A1A2E", fontFamily: "var(--font-body)" }}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </Link>
                                {children.length > 0 && (
                                    <div className="pl-3 space-y-0.5">
                                        {children.slice(0, 5).map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="block px-3 py-2 text-sm rounded-xl hover:bg-[#F7F8FA] transition-colors"
                                                style={{ color: "#52637A", fontFamily: "var(--font-body)" }}
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    <div className="pt-3 pb-1" style={{ borderTop: "1px solid var(--border)" }}>
                        <Link href="/contact" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>
                            <Phone className="w-4 h-4" />
                            Book a Free Call
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
