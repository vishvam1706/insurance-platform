"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
    label: string
    href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1 flex-wrap"
            style={{ fontFamily: "var(--font-body)" }}
        >
            {/* Home */}
            <Link
                href="/"
                className="group flex items-center gap-1.5 text-[13px] font-medium px-2.5 py-1 rounded-lg transition-all duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--brand-dark)"
                    e.currentTarget.style.background = "var(--brand-light)"
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-muted)"
                    e.currentTarget.style.background = "transparent"
                }}
            >
                <Home className="w-3.5 h-3.5 shrink-0" />
                <span>Home</span>
            </Link>

            {items.map((item, i) => {
                const isLast = i === items.length - 1
                return (
                    <span key={i} className="flex items-center gap-1">
                        {/* Separator */}
                        <ChevronRight
                            className="w-3.5 h-3.5 shrink-0"
                            style={{ color: "var(--border)" }}
                        />

                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="text-[13px] font-medium px-2.5 py-1 rounded-lg transition-all duration-200 max-w-[180px] truncate"
                                style={{ color: "var(--text-muted)" }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "var(--brand-dark)"
                                    e.currentTarget.style.background = "var(--brand-light)"
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "var(--text-muted)"
                                    e.currentTarget.style.background = "transparent"
                                }}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            /* Active / last crumb — pill badge */
                            <span
                                className="text-[12px] font-semibold px-2.5 py-1 rounded-lg max-w-[240px] truncate"
                                style={{
                                    color: "var(--brand-dark)",
                                    background: "var(--brand-light)",
                                    border: "1px solid var(--brand-100)",
                                }}
                                title={item.label}
                            >
                                {item.label}
                            </span>
                        )}
                    </span>
                )
            })}
        </nav>
    )
}
