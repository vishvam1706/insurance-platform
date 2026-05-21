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

// Premium detailed icons and taglines for subpages (Stripe-like menu)
const LINK_DETAILS: Record<string, { desc: string; icon: React.ReactNode }> = {
    // Term Life
    "What is Term Insurance?": {
        desc: "Learn the basics of pure financial protection.",
        icon: (
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
        )
    },
    "Best Term Plans 2026": {
        desc: "Compare top-rated plans side-by-side.",
        icon: (
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.05 3v1.9c0 .12.02.24.08.34L11 8.5h-1a2 2 0 00-2 2v3h6v-3a2 2 0 00-2-2h-1l1.87-3.26c.06-.1.08-.22.08-.34V3" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17h6l-1.5 4h-3L9 17z" />
                </svg>
            </div>
        )
    },
    "Term vs Life Insurance": {
        desc: "Understand key differences before you decide.",
        icon: (
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            </div>
        )
    },
    // Health
    "What is Health Insurance?": {
        desc: "Understand medical coverage and health benefits.",
        icon: (
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </div>
        )
    },
    "Best Health Plans 2026": {
        desc: "Handpicked medical policies with top claim ratios.",
        icon: (
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        )
    },
    "Family Health Insurance": {
        desc: "Secure medical protection for your entire family.",
        icon: (
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>
        )
    },
}

// Fallback detail for dynamically fetched pages
const DEFAULT_DETAIL = {
    desc: "Read our comprehensive expert guide.",
    icon: (
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        </div>
    )
}

export default function PublicHeader() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [scrolled, setScrolled] = useState(false)
    const [cmsLinks, setCmsLinks] = useState<Record<string, NavChild[]>>({})
    const fetchedRef = useRef(false)

    // Scroll effect for shadow & opacity transitions
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    // Fetch CMS nav on mount
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

    // Resolve dropdown items
    function getChildren(section: string): NavChild[] {
        const cms = cmsLinks[section]
        if (cms && cms.length > 0) return cms.slice(0, 8)
        return STATIC_FALLBACKS[section] ?? []
    }

    return (
        <header
            className="sticky top-0 z-50 transition-all duration-300"
            style={{
                backgroundColor: scrolled ? "rgba(255, 255, 255, 0.94)" : "rgba(255, 255, 255, 0.8)",
                backgroundImage: `
                    radial-gradient(at 0% 0%, rgba(0, 179, 134, ${scrolled ? 0.05 : 0.08}) 0px, transparent 50%),
                    radial-gradient(at 100% 0%, rgba(15, 23, 42, ${scrolled ? 0.03 : 0.05}) 0px, transparent 50%),
                    radial-gradient(at 50% 100%, rgba(0, 179, 134, ${scrolled ? 0.02 : 0.04}) 0px, transparent 50%)
                `,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: scrolled ? "1px solid rgba(0, 179, 134, 0.08)" : "1px solid rgba(0, 0, 0, 0.015)",
                boxShadow: scrolled ? "0 10px 30px -10px rgba(0, 179, 134, 0.06), 0 1px 3px rgba(0, 0, 0, 0.01)" : "none",
            }}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between" style={{ height: 72 }}>

                {/* Logo with clean glowing text transitions */}
                <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                    <span
                        className="font-black text-2xl tracking-tight transition-all duration-300 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:to-teal-500"
                        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}
                    >
                        pmpartners
                    </span>
                    <span
                        className="hidden sm:inline-flex text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-xs border transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500"
                        style={{ background: "var(--brand-light)", color: "var(--brand-dark)", border: "1px solid var(--brand-100)" }}
                    >
                        insurance
                    </span>
                </Link>

                {/* Desktop nav with capsule floating hover effects */}
                <nav className="hidden md:flex items-center gap-1.5">
                    {TOP_NAV.map((item) => {
                        const children = item.section ? getChildren(item.section) : []
                        const isActive = activeDropdown === item.label
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
                                        "flex items-center gap-1.5 px-4.5 py-2 text-sm font-bold rounded-xl transition-all duration-300 relative group",
                                        isActive
                                            ? "text-[var(--brand-dark)] bg-white shadow-sm border border-emerald-100/40"
                                            : "text-slate-600 hover:text-[var(--brand-dark)] hover:bg-white hover:shadow-xs hover:border hover:border-slate-100"
                                    )}
                                    style={{ fontFamily: "var(--font-body)", border: "1px solid transparent" }}
                                >
                                    {item.label}
                                    {children.length > 0 && (
                                        <ChevronDown
                                            className={cn("w-3.5 h-3.5 transition-transform duration-300 text-slate-400 group-hover:text-[var(--brand-dark)]", isActive && "rotate-180 text-[var(--brand-dark)]")}
                                        />
                                    )}
                                    {/* Subtle glowing dot indicator */}
                                    <span className={cn(
                                        "absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500 transition-all duration-300 opacity-0 scale-50",
                                        isActive ? "opacity-100 scale-100" : "group-hover:opacity-60 group-hover:scale-100"
                                    )} />
                                </Link>

                                {/* Stripe-style Rich Mega Dropdown Panel */}
                                {children.length > 0 && isActive && (
                                    <div
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[350px] rounded-[24px] p-3.5 z-50 animate-fade-in shadow-[0_20px_50px_rgba(0,179,134,0.08)] border"
                                        style={{ 
                                            background: "rgba(255, 255, 255, 0.98)", 
                                            borderColor: "rgba(0, 179, 134, 0.08)",
                                            backdropFilter: "blur(20px)"
                                        }}
                                    >
                                        <div className="space-y-1">
                                            {children.map((child) => {
                                                const details = LINK_DETAILS[child.label] || DEFAULT_DETAIL
                                                return (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className="flex items-start gap-3.5 p-3 rounded-2xl transition-all duration-200 text-slate-600 hover:text-[var(--text-primary)] hover:bg-slate-50 border border-transparent hover:border-slate-100 group/item"
                                                        style={{ fontFamily: "var(--font-body)" }}
                                                    >
                                                        {details.icon}
                                                        <div className="flex flex-col text-left">
                                                            <span className="text-[13.5px] font-bold text-slate-800 transition-colors duration-200 group-hover/item:text-[var(--brand-dark)]">
                                                                {child.label}
                                                            </span>
                                                            <span className="text-[11px] font-semibold text-slate-400 mt-0.5 leading-snug">
                                                                {details.desc}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                        {/* View All Guides action row */}
                                        <div className="mx-1 mt-2.5 pt-2.5 border-t border-slate-100">
                                            <Link
                                                href={item.href}
                                                className="flex items-center justify-between px-3 py-2 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all duration-200 hover:bg-[var(--brand-light)]/40 hover:text-[var(--brand)] text-[var(--brand-dark)]"
                                                style={{ fontFamily: "var(--font-body)" }}
                                            >
                                                <span>View all insurance guides</span>
                                                <svg className="w-3.5 h-3.5 transition-transform duration-200 translate-x-0 group-hover/item:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </nav>

                {/* Desktop Primary CTA with pulsing hover effects */}
                <div className="hidden md:flex items-center gap-3">
                    <Link 
                        href="/contact" 
                        className="inline-flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-[18px] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-[0_6px_20px_-5px_rgba(0,179,134,0.3)] hover:shadow-[0_12px_30px_-5px_rgba(0,179,134,0.5)] shrink-0 select-none"
                        style={{
                            background: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
                        }}
                    >
                        <Phone className="w-3.5 h-3.5 shrink-0 animate-bounce" style={{ animationDuration: "3s" }} />
                        Book a Free Call
                    </Link>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                    onClick={() => setMobileOpen((o) => !o)}
                    className="md:hidden p-2.5 rounded-xl transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--brand-light)]"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav overlay panel */}
            {mobileOpen && (
                <div 
                    className="md:hidden border-t px-6 py-5 space-y-2 animate-fade-in shadow-xl rounded-b-[24px]" 
                    style={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.98)", 
                        borderColor: "rgba(0, 179, 134, 0.08)",
                        backdropFilter: "blur(20px)"
                    }}
                >
                    {TOP_NAV.map((item) => {
                        const children = item.section ? getChildren(item.section) : []
                        return (
                            <div key={item.label} className="py-0.5">
                                <Link
                                    href={item.href}
                                    className="block px-3 py-2.5 text-base font-extrabold rounded-xl hover:bg-slate-50 transition-colors"
                                    style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </Link>
                                {children.length > 0 && (
                                    <div className="pl-4 mt-1.5 space-y-1 border-l border-slate-100 ml-3.5">
                                        {children.slice(0, 5).map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-50 hover:text-[var(--text-primary)] transition-all font-semibold text-slate-500"
                                                style={{ fontFamily: "var(--font-body)" }}
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
                    <div className="pt-4 pb-1" style={{ borderTop: "1px solid #F1F5F9" }}>
                        <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-[18px] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-[0_4px_20px_rgba(0,179,134,0.2)] select-none w-full"
                            style={{
                                background: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
                            }}
                            onClick={() => setMobileOpen(false)}
                        >
                            <Phone className="w-3.5 h-3.5 shrink-0" />
                            Book a Free Call
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
