"use client"

import { useEffect, useState, useRef } from "react"
import { Phone, CheckCircle2, MessageCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import InquiryForm from "./InquiryForm"

interface TocItem {
    id: string
    text: string
    level: number
}

interface Props {
    children: React.ReactNode
    defaultType?: "term" | "health"
    showSidebar?: boolean
}

export default function ArticleLayout({ children, defaultType, showSidebar = true }: Props) {
    const [toc, setToc] = useState<TocItem[]>([])
    const [activeId, setActiveId] = useState<string>("")
    const [tocOpen, setTocOpen] = useState(false)
    const articleRef = useRef<HTMLDivElement>(null)

    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMsg = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    /* ── Build TOC from rendered headings ── */
    useEffect(() => {
        if (!articleRef.current) return

        const headings = Array.from(
            articleRef.current.querySelectorAll("h2, h3")
        ) as HTMLHeadingElement[]

        const items: TocItem[] = headings
            .filter((el) => el.textContent?.trim())
            .map((el, i) => {
                const id = el.id || `toc-${i}`
                if (!el.id) el.id = id
                return {
                    id,
                    text: el.textContent?.trim() || "",
                    level: parseInt(el.tagName.replace("H", "")),
                }
            })

        setToc(items)
        if (items.length > 0) setActiveId(items[0].id)
    }, [])

    /* ── IntersectionObserver for active section ── */
    useEffect(() => {
        if (toc.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting)
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id)
                }
            },
            { rootMargin: "-72px 0px -55% 0px", threshold: 0 }
        )

        toc.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [toc])

    const hasToc = toc.length > 0

    return (
        <div
            className="min-h-screen"
            style={{ background: "linear-gradient(180deg, #EEF5FF 0%, #F4F7FF 100%)" }}
        >
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
                <div
                    className={`grid gap-6 items-start ${
                        hasToc && showSidebar
                            ? "lg:grid-cols-[200px_1fr_272px]"
                            : showSidebar
                            ? "lg:grid-cols-[1fr_272px]"
                            : "lg:grid-cols-1 max-w-3xl mx-auto"
                    }`}
                >

                    {/* ══ LEFT: Table of Contents ══ */}
                    {hasToc && (
                        <aside className="hidden lg:block">
                            <div className="sticky top-24">
                                {/* Mobile TOC toggle */}
                                <div className="lg:hidden mb-4">
                                    <button
                                        onClick={() => setTocOpen(!tocOpen)}
                                        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white text-sm font-semibold"
                                        style={{ border: "1px solid var(--border)" }}
                                    >
                                        On this page
                                        <ChevronRight className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-90" : ""}`} />
                                    </button>
                                </div>

                                <p
                                    className="text-[11px] font-extrabold uppercase tracking-widest mb-4 hidden lg:block"
                                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                                >
                                    On this page
                                </p>

                                <nav className="space-y-0.5">
                                    {toc.map((item, i) => {
                                        const isActive = activeId === item.id
                                        return (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    document.getElementById(item.id)?.scrollIntoView({
                                                        behavior: "smooth", block: "start"
                                                    })
                                                }}
                                                className={`flex items-start gap-2 py-1.5 rounded-lg px-2 text-[13px] leading-snug transition-all duration-150 ${
                                                    item.level === 3 ? "ml-3" : ""
                                                }`}
                                                style={{
                                                    color: isActive ? "var(--blue-600)" : "var(--text-secondary)",
                                                    fontWeight: isActive ? 700 : 400,
                                                    background: isActive ? "rgba(37,99,235,0.06)" : "transparent",
                                                    fontFamily: "var(--font-body)",
                                                }}
                                            >
                                                {item.level === 2 && (
                                                    <span
                                                        className="shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center mt-0.5"
                                                        style={{
                                                            background: isActive ? "var(--blue-600)" : "var(--blue-100)",
                                                            color: isActive ? "#fff" : "var(--blue-600)",
                                                        }}
                                                    >
                                                        {toc.filter(t => t.level === 2).indexOf(item) + 1}
                                                    </span>
                                                )}
                                                {item.level === 3 && (
                                                    <span
                                                        className="shrink-0 w-1 h-1 rounded-full mt-2"
                                                        style={{ background: isActive ? "var(--blue-600)" : "var(--text-muted)" }}
                                                    />
                                                )}
                                                <span className="line-clamp-2">{item.text}</span>
                                            </a>
                                        )
                                    })}
                                </nav>

                                {/* Progress indicator */}
                                <div
                                    className="mt-6 pt-4"
                                    style={{ borderTop: "1px solid var(--border-light)" }}
                                >
                                    <Link
                                        href="/contact"
                                        className="flex items-center gap-2 text-[12px] font-bold rounded-xl px-3 py-2.5 transition-all hover:bg-blue-100"
                                        style={{
                                            color: "var(--blue-600)",
                                            background: "var(--blue-50)",
                                            border: "1px solid var(--blue-100)",
                                            fontFamily: "var(--font-body)",
                                        }}
                                    >
                                        <Phone className="w-3.5 h-3.5 shrink-0" />
                                        Talk to an advisor
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    )}

                    {/* ══ CENTER: Article Content ══ */}
                    <article
                        ref={articleRef}
                        className="rounded-3xl overflow-hidden bg-white"
                        style={{
                            border: "1px solid var(--border)",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
                        }}
                    >
                        {children}
                    </article>

                    {/* ══ RIGHT: Sidebar ══ */}
                    {showSidebar && (
                        <aside>
                            <div className="sticky top-24 space-y-4">

                                {/* ── Expert advice card ── */}
                                <div
                                    className="rounded-3xl relative overflow-hidden bg-white"
                                    style={{
                                        border: "1px solid var(--border)",
                                        boxShadow: "0 4px 24px rgba(37,99,235,0.08)",
                                    }}
                                >
                                    {/* Gradient top bar */}
                                    <div
                                        className="h-1.5"
                                        style={{ background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)" }}
                                    />
                                    <div className="p-5">
                                        <div className="flex items-center gap-2.5 mb-1">
                                            <div
                                                className="w-8 h-8 rounded-xl flex items-center justify-center"
                                                style={{ background: "var(--blue-50)" }}
                                            >
                                                <Phone className="w-4 h-4" style={{ color: "var(--blue-600)" }} />
                                            </div>
                                            <h3
                                                className="font-extrabold"
                                                style={{ fontFamily: "var(--font-heading)", fontSize: 15 }}
                                            >
                                                Talk to an expert
                                            </h3>
                                        </div>
                                        <p className="text-xs mb-4" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                                            Free · No spam · Response within 2 hours
                                        </p>
                                        <InquiryForm defaultType={defaultType} />
                                    </div>
                                </div>

                                {/* ── Trust signals card ── */}
                                <div
                                    className="rounded-2xl p-4"
                                    style={{ background: "var(--blue-50)", border: "1px solid var(--blue-100)" }}
                                >
                                    <p
                                        className="text-[11px] font-extrabold uppercase tracking-widest mb-3"
                                        style={{ color: "var(--blue-600)", fontFamily: "var(--font-body)" }}
                                    >
                                        Why trust us?
                                    </p>
                                    <ul className="space-y-2">
                                        {[
                                            "IRDAI-certified advisors",
                                            "No commission bias",
                                            "8 lakh+ customers helped",
                                            "100% free consultation",
                                        ].map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-2 text-[13px]"
                                                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
                                            >
                                                <CheckCircle2
                                                    className="w-4 h-4 mt-0.5 shrink-0"
                                                    style={{ color: "var(--blue-600)" }}
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* ── WhatsApp quick link ── */}
                                <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-all hover:opacity-90 active:scale-98"
                                    style={{
                                        background: "#ECFDF5",
                                        border: "1px solid #A7F3D0",
                                        fontFamily: "var(--font-body)",
                                    }}
                                >
                                    <MessageCircle className="w-5 h-5 shrink-0" style={{ color: "#25D366" }} />
                                    <div>
                                        <p className="text-xs font-semibold" style={{ color: "#065F46" }}>
                                            Quick question?
                                        </p>
                                        <p className="text-xs font-bold" style={{ color: "#25D366" }}>
                                            Chat on WhatsApp →
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    )
}
