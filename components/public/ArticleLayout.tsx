"use client"

import { useEffect, useState, useRef } from "react"
import { Phone } from "lucide-react"
import Link from "next/link"

interface TocItem { id: string; text: string; level: number }
interface Props { children: React.ReactNode; defaultType?: "term" | "health"; showSidebar?: boolean }

export default function ArticleLayout({ children, defaultType, showSidebar = true }: Props) {
    const [toc, setToc] = useState<TocItem[]>([])
    const [activeId, setActiveId] = useState<string>("")
    const articleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!articleRef.current) return
        const headings = Array.from(articleRef.current.querySelectorAll("h2, h3")) as HTMLHeadingElement[]
        const items: TocItem[] = headings
            .filter((el) => el.textContent?.trim())
            .map((el, i) => {
                const id = el.id || `toc-${i}`
                if (!el.id) el.id = id
                return { id, text: el.textContent?.trim() || "", level: parseInt(el.tagName.replace("H", "")) }
            })
        setToc(items)
        if (items.length > 0) setActiveId(items[0].id)
    }, [])

    useEffect(() => {
        if (toc.length === 0) return
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting)
                if (visible.length > 0) setActiveId(visible[0].target.id)
            },
            { rootMargin: "-96px 0px -60% 0px", threshold: 0 }
        )
        toc.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el) })
        return () => observer.disconnect()
    }, [toc])

    const hasToc = toc.length > 0

    return (
        <div className="min-h-screen" style={{ background: "#F7F8FA" }}>
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
                <div
                    className={`grid gap-6 items-start ${
                        hasToc && showSidebar
                            ? "lg:grid-cols-[1fr_240px]"
                            : "lg:grid-cols-1 max-w-3xl mx-auto"
                    }`}
                >
                    {/* LEFT: Article Content */}
                    <article
                        ref={articleRef}
                        className="rounded-2xl overflow-hidden bg-white min-w-0"
                        style={{ border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}
                    >
                        <div className="px-6 sm:px-8">
                            {children}
                        </div>
                    </article>

                    {/* RIGHT: Table of Contents */}
                    {hasToc && showSidebar && (
                        <aside className="hidden lg:block self-start sticky top-24">
                                {/* TOC Card */}
                                <div
                                    className="rounded-2xl p-5 mb-4"
                                    style={{
                                        background: "#FFFFFF",
                                        border: "1px solid var(--border)",
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                    }}
                                >
                                    <p
                                        className="text-[11px] font-extrabold uppercase tracking-widest mb-4"
                                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                                    >
                                        On this page
                                    </p>

                                    <nav className="space-y-0.5">
                                        {toc.map((item) => {
                                            const isActive = activeId === item.id
                                            return (
                                                <a
                                                    key={item.id}
                                                    href={`#${item.id}`}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        const el = document.getElementById(item.id)
                                                        if (el) {
                                                            const navbarHeight = 96
                                                            const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight
                                                            window.scrollTo({ top, behavior: "smooth" })
                                                            setActiveId(item.id)
                                                        }
                                                    }}
                                                    className={`flex items-start gap-2 py-1.5 rounded-lg px-2 text-[13px] leading-snug transition-all duration-150 ${item.level === 3 ? "ml-3" : ""}`}
                                                    style={{
                                                        color: isActive ? "var(--brand)" : "var(--text-secondary)",
                                                        fontWeight: isActive ? 700 : 400,
                                                        background: isActive ? "var(--brand-light)" : "transparent",
                                                        fontFamily: "var(--font-body)",
                                                    }}
                                                >
                                                    {item.level === 2 && (
                                                        <span
                                                            className="shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center mt-0.5"
                                                            style={{
                                                                background: isActive ? "var(--brand)" : "var(--brand-light)",
                                                                color: isActive ? "#fff" : "var(--brand)",
                                                            }}
                                                        >
                                                            {toc.filter(t => t.level === 2).indexOf(item) + 1}
                                                        </span>
                                                    )}
                                                    {item.level === 3 && (
                                                        <span
                                                            className="shrink-0 w-1 h-1 rounded-full mt-2"
                                                            style={{ background: isActive ? "var(--brand)" : "var(--text-muted)" }}
                                                        />
                                                    )}
                                                    <span className="line-clamp-2">{item.text}</span>
                                                </a>
                                            )
                                        })}
                                    </nav>
                                </div>

                                {/* Talk to advisor CTA */}
                                <Link
                                    href="/contact"
                                    className="flex items-center gap-2 w-full text-[13px] font-bold rounded-xl px-4 py-3 transition-all hover:opacity-90"
                                    style={{
                                        color: "#FFFFFF",
                                        background: "var(--brand)",
                                        boxShadow: "0 2px 12px rgba(0,179,134,0.25)",
                                        fontFamily: "var(--font-body)",
                                    }}
                                >
                                    <Phone className="w-4 h-4 shrink-0" />
                                    Talk to a free advisor
                                </Link>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    )
}
