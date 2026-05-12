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
            className="flex items-center gap-1.5 text-xs mb-6 flex-wrap"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
        >
            <Link
                href="/"
                className="flex items-center gap-1 transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
                <Home className="w-3 h-3" />
                Home
            </Link>
            {items.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3" style={{ color: "var(--border)" }} />
                    {item.href ? (
                        <Link
                            href={item.href}
                            style={{ color: "var(--text-muted)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                            {item.label}
                        </span>
                    )}
                </span>
            ))}
        </nav>
    )
}
