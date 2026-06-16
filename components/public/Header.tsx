"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Mega-menu data ───────────────────────────────────────────────────────────

interface MegaLink { label: string; href: string; hot?: boolean }
interface MegaColumn { heading: string; icon: React.ReactNode; links: MegaLink[] }

const IconBook = () => (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
)
const IconChart = () => (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
)
const IconUser = () => (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
)
const IconGift = () => (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
)
const IconFamily = () => (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
)
const IconWrench = () => (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" />
    </svg>
)
const HotStar = () => (
    <svg className="w-3.5 h-3.5 text-orange-400 shrink-0 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
)

const TERM_LIFE_COLUMNS: MegaColumn[] = [
    {
        heading: "Insurance Basics",
        icon: <IconBook />,
        links: [
            { label: "What is Term Insurance?", href: "/term-life/what-is-term-insurance" },
            { label: "Buy Term Insurance", href: "/term-life/how-to-buy-term-insurance" },
            { label: "Term vs Life Insurance", href: "/term-life/term-vs-life-insurance" },
            { label: "Term Insurance Articles", href: "/term-life" },
        ],
    },
    {
        heading: "Compare and Choose",
        icon: <IconChart />,
        links: [
            { label: "Best Term Insurance Plans", href: "/term-life/best-term-insurance-plans", hot: true },
            { label: "Top Term Insurance Companies", href: "/term-life/top-term-insurance-companies" },
            { label: "Compare Term Insurance Plans", href: "/term-life/compare-term-insurance-plans" },
            { label: "Term Plans Explained", href: "/term-life/term-plans-explained" },
            { label: "Best ₹1 Crore Term Plans", href: "/term-life/best-1-crore-term-plans", hot: true },
        ],
    },
    {
        heading: "For Your Profile",
        icon: <IconUser />,
        links: [
            { label: "Term Insurance for Senior Citizens", href: "/term-life/term-insurance-for-senior-citizens" },
            { label: "Term Insurance for Housewife", href: "/term-life/term-insurance-for-housewife" },
            { label: "Term Insurance for NRI", href: "/term-life/term-insurance-for-nri" },
            { label: "Term Insurance for Self-Employed", href: "/term-life/term-insurance-for-self-employed" },
            { label: "Term Insurance for Smokers", href: "/term-life/term-insurance-for-smokers" },
        ],
    },
    {
        heading: "Benefits and Features",
        icon: <IconGift />,
        links: [
            { label: "Section 80C — Tax Benefits", href: "/term-life/section-80c-tax-benefits", hot: true },
            { label: "Term Insurance Benefits", href: "/term-life/term-insurance-benefits" },
        ],
    },
]

const HEALTH_COLUMNS: MegaColumn[] = [
    {
        heading: "Insurance Basics",
        icon: <IconBook />,
        links: [
            { label: "What is Health Insurance", href: "/health/what-is-health-insurance" },
            { label: "Health Insurance Checklist", href: "/health/health-insurance-checklist" },
            { label: "Buy Health Insurance", href: "/health/buy-health-insurance", hot: true },
            { label: "Health Insurance Articles", href: "/health" },
        ],
    },
    {
        heading: "Compare and Choose",
        icon: <IconChart />,
        links: [
            { label: "Best Health Insurance Plans", href: "/health/best-health-insurance-plans", hot: true },
            { label: "Top Health Insurance Companies", href: "/health/top-health-insurance-companies" },
            { label: "Compare Health Insurance Plans", href: "/health/compare-health-insurance-plans" },
            { label: "Health Plans Explained", href: "/health/health-plans-explained", hot: true },
            { label: "Claim Settlement Ratio: Top 10", href: "/health/claim-settlement-ratio-top-10" },
        ],
    },
    {
        heading: "Family Coverage",
        icon: <IconFamily />,
        links: [
            { label: "Health Insurance for Family", href: "/health/family-health-insurance" },
            { label: "Health Insurance for Senior Citizens", href: "/health/health-insurance-for-senior-citizens", hot: true },
            { label: "Maternity Health Insurance", href: "/health/maternity-health-insurance" },
            { label: "Health Insurance for Parents", href: "/health/health-insurance-for-parents" },
            { label: "Health Insurance for Children", href: "/health/health-insurance-for-children" },
        ],
    },
    {
        heading: "Benefits and Features",
        icon: <IconGift />,
        links: [
            { label: "Section 80D — Tax Benefits", href: "/health/section-80d-tax-benefits", hot: true },
            { label: "Health Insurance Benefits", href: "/health/health-insurance-benefits", hot: true },
            { label: "Critical Illness Insurance", href: "/health/critical-illness-insurance" },
        ],
    },
]

const TOP_NAV = [
    { label: "Life Insurance",   href: "/term-life", section: "term-life", columns: TERM_LIFE_COLUMNS },
    { label: "Health Insurance", href: "/health",    section: "health",    columns: HEALTH_COLUMNS },
    { label: "Claims",           href: "/claims",    section: null,        columns: [] },
]

// icon background colour per column index
const COL_BG = [
    "bg-indigo-50 text-indigo-500",
    "bg-blue-50   text-blue-500",
    "bg-violet-50 text-violet-500",
    "bg-orange-50 text-orange-500",
    "bg-teal-50   text-teal-500",
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function PublicHeader() {
    const [mobileOpen, setMobileOpen]     = useState(false)
    const [mobileExp, setMobileExp]       = useState<string | null>(null)
    const [activeMenu, setActiveMenu]     = useState<string | null>(null)
    const [scrolled, setScrolled]         = useState(false)
    const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const openMenu  = (label: string) => { if (leaveTimer.current) clearTimeout(leaveTimer.current); setActiveMenu(label) }
    const startClose = () => { leaveTimer.current = setTimeout(() => setActiveMenu(null), 150) }

    const activeNav = TOP_NAV.find((n) => n.label === activeMenu)

    return (
        <header
            className="sticky top-0 z-50 transition-shadow duration-300"
            style={{
                background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.88)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                borderBottom: "1px solid rgba(0,0,0,0.07)",
                boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
            }}
            onMouseLeave={startClose}
        >
            {/* ── Top bar ── */}
            <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16" style={{ height: 68 }}>

                {/* Logo */}
                <Link href="/" className="flex items-center shrink-0 group">
                    <Image src="/logo.png" alt="Policymine" width={140} height={40}
                        className="h-9 w-auto object-contain transition-opacity group-hover:opacity-75" priority />
                </Link>

                {/* Desktop nav pills */}
                <nav className="hidden md:flex items-center gap-0.5">
                    {TOP_NAV.map((item) => {
                        const hasDrop = item.columns.length > 0
                        const isOpen  = activeMenu === item.label
                        return (
                            <div key={item.label} className="relative"
                                onMouseEnter={() => hasDrop && openMenu(item.label)}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg select-none transition-colors duration-150",
                                        isOpen
                                            ? "bg-slate-100 text-slate-900"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                                    )}
                                >
                                    {item.label}
                                    {hasDrop && (
                                        <ChevronDown className={cn(
                                            "w-4 h-4 text-slate-400 transition-transform duration-200",
                                            isOpen && "rotate-180"
                                        )} />
                                    )}
                                </Link>
                            </div>
                        )
                    })}
                </nav>

                {/* Desktop CTA */}
                <Link href="/contact"
                    className="hidden md:inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95 shrink-0 select-none shadow-md"
                    style={{ background: "linear-gradient(135deg,#059669 0%,#0d9488 100%)" }}
                >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    Book a Free Call
                </Link>

                {/* Mobile hamburger */}
                <button onClick={() => setMobileOpen((o) => !o)}
                    className="md:hidden p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    aria-label="Toggle menu">
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* ── Desktop Mega-menu ── */}
            {activeNav && activeNav.columns.length > 0 && (
                <div
                    className="hidden md:block absolute left-0 right-0 z-50"
                    style={{ top: "100%" }}
                    onMouseEnter={() => openMenu(activeMenu!)}
                >
                    {/* hover bridge — prevents gap-triggered close */}
                    <div className="h-px" />

                    <div
                        className="animate-fade-in"
                        style={{
                            background: "#fff",
                            borderTop: "1px solid rgba(0,0,0,0.07)",
                            borderBottom: "1px solid rgba(0,0,0,0.07)",
                            boxShadow: "0 24px 48px rgba(0,0,0,0.08)",
                        }}
                    >
                        {/* full-width content — same horizontal padding as the header bar */}
                        <div className="px-6 sm:px-10 lg:px-16 py-10">
                            <div
                                className="grid gap-0"
                                style={{
                                    gridTemplateColumns: `repeat(${activeNav.columns.length}, 1fr)`,
                                }}
                            >
                                {activeNav.columns.map((col, ci) => (
                                    <div
                                        key={col.heading}
                                        className={cn(
                                            "px-6 py-2",
                                            ci > 0 && "border-l border-slate-100"
                                        )}
                                    >
                                        {/* icon + heading */}
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center mb-4",
                                            COL_BG[ci % COL_BG.length]
                                        )}>
                                            {col.icon}
                                        </div>
                                        <p className="text-[15px] font-bold text-slate-900 mb-4 leading-tight">
                                            {col.heading}
                                        </p>

                                        {/* links */}
                                        <div className="space-y-3">
                                            {col.links.map((link) => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    onClick={() => setActiveMenu(null)}
                                                    className="flex items-center text-[14px] text-slate-500 hover:text-slate-900 leading-snug transition-colors duration-100 group/link"
                                                >
                                                    <span className="group-hover/link:translate-x-0.5 transition-transform duration-100">
                                                        {link.label}
                                                    </span>
                                                    {link.hot && <HotStar />}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Mobile menu ── */}
            {mobileOpen && (
                <div
                    className="md:hidden absolute left-0 right-0 z-50 overflow-y-auto animate-fade-in"
                    style={{
                        top: "100%",
                        maxHeight: "calc(100dvh - 68px)",
                        background: "#fff",
                        borderTop: "1px solid rgba(0,0,0,0.07)",
                        boxShadow: "0 24px 48px rgba(0,0,0,0.08)",
                    }}
                >
                    <div className="px-4 py-4 space-y-1">
                        {TOP_NAV.map((item) => (
                            <div key={item.label}>
                                {item.columns.length > 0 ? (
                                    <>
                                        {/* accordion toggle */}
                                        <button
                                            onClick={() => setMobileExp((p) => p === item.label ? null : item.label)}
                                            className="w-full flex items-center justify-between px-4 py-3.5 text-[15px] font-semibold text-slate-800 rounded-xl hover:bg-slate-50 transition-colors"
                                        >
                                            {item.label}
                                            <ChevronDown className={cn(
                                                "w-4.5 h-4.5 text-slate-400 transition-transform duration-200",
                                                mobileExp === item.label && "rotate-180"
                                            )} />
                                        </button>

                                        {mobileExp === item.label && (
                                            <div className="pt-1 pb-3 px-1 space-y-5">
                                                {item.columns.map((col, ci) => (
                                                    <div key={col.heading} className="px-4">
                                                        {/* column header */}
                                                        <div className="flex items-center gap-2.5 mb-2.5">
                                                            <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0", COL_BG[ci % COL_BG.length])}>
                                                                <div className="scale-75">{col.icon}</div>
                                                            </div>
                                                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                                                                {col.heading}
                                                            </span>
                                                        </div>

                                                        {/* links */}
                                                        <div className="space-y-0.5 pl-1">
                                                            {col.links.map((link) => (
                                                                <Link
                                                                    key={link.href}
                                                                    href={link.href}
                                                                    onClick={() => { setMobileOpen(false); setMobileExp(null) }}
                                                                    className="flex items-center gap-1 px-3 py-2.5 text-[14px] text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
                                                                >
                                                                    {link.label}
                                                                    {link.hot && <HotStar />}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-3.5 text-[15px] font-semibold text-slate-800 rounded-xl hover:bg-slate-50 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* Mobile CTA */}
                        <div className="pt-3 pb-4 px-1">
                            <Link
                                href="/contact"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center gap-2 text-white text-[15px] font-semibold py-4 rounded-2xl w-full transition-all active:scale-95 shadow-md"
                                style={{ background: "linear-gradient(135deg,#059669 0%,#0d9488 100%)" }}
                            >
                                <Phone className="w-4.5 h-4.5 shrink-0" />
                                Book a Free Call
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
