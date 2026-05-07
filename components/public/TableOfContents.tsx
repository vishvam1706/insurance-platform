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
        <nav className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Table of Contents
            </p>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li key={item.id}>
                        <Link
                            href={`#${item.id}`}
                            className={cn(
                                "text-sm transition-colors block py-0.5",
                                active === item.id
                                    ? "text-blue-600 font-medium"
                                    : "text-slate-600 hover:text-blue-600"
                            )}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav >
    )
}