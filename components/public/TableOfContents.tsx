"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface TocItem {
    id: string
    label: string
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
    const [active, setActive] = useState<string>("")

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id)
                })
            },
            { rootMargin: "-100px 0px -60% 0px" }
        )
        items.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [items])

    if (items.length === 0) return null

    return (
        <nav
            className="rounded-2xl p-5"
            style={{ background: "#FFFFFF", border: "1px solid var(--border)" }}
        >
            <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
            >
                Table of Contents
            </p>
            <ul className="space-y-1">
                {items.map((item) => (
                    <li key={item.id}>
                        <Link
                            href={`#${item.id}`}
                            className={cn(
                                "text-sm transition-colors block py-1.5 px-2 rounded-lg",
                                active === item.id
                                    ? "font-semibold"
                                    : "hover:bg-[var(--surface-muted)]"
                            )}
                            style={{
                                color: active === item.id ? "var(--brand)" : "var(--text-secondary)",
                                background: active === item.id ? "var(--brand-light)" : "transparent",
                                fontFamily: "var(--font-body)",
                            }}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
