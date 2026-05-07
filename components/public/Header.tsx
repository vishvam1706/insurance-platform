"use client"

import { useState } from "react"
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
            { label: "Term Insurance Calculator", href: "/term-life/calculator" },
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
            { label: "Senior Citizen Health Plans", href: "/health/senior-citizen-health-insurance" },
        ],
    },
    { label: "Articles", href: "/articles" },
    { label: "Contact", href: "/contact" },
]

export default function PublicHeader() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 shrink-0">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-slate-900 text-sm">
                            Insurance Platform
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV.map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    {item.label}
                                    {item.children && (
                                        <ChevronDown className={cn(
                                            "w-3 h-3 transition-transform",
                                            activeDropdown === item.label && "rotate-180"
                                        )} />
                                    )}
                                </Link>

                                {item.children && activeDropdown === item.label && (
                                    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            <Phone className="w-4 h-4" />
                            Book Free Call
                        </Link>
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen((o) => !o)}
                        className="md:hidden p-2 text-slate-500 hover:text-slate-900"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile nav */}
            {mobileOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1">
                    {NAV.map((item) => (
                        <div key={item.label}>
                            <Link
                                href={item.href}
                                className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </Link>
                            {item.children && (
                                <div className="pl-4 space-y-1 mt-1">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            className="block px-3 py-2 text-sm text-slate-500 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="pt-3 border-t border-slate-100">
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl"
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