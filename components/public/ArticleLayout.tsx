"use client"

import { useEffect, useState, useRef } from "react"
import { Phone, X, MessageCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface TocItem { id: string; text: string; level: number }
interface Props { children: React.ReactNode; defaultType?: "term" | "health"; showSidebar?: boolean }

export default function ArticleLayout({ children, defaultType, showSidebar = true }: Props) {
    const [toc, setToc] = useState<TocItem[]>([])
    const [activeId, setActiveId] = useState<string>("")
    const articleRef = useRef<HTMLDivElement>(null)

    const pathname = usePathname()
    const [isDismissed, setIsDismissed] = useState(false)

    const showStickyAdvisorBar =
        (pathname && pathname.startsWith("/term-life/") && pathname !== "/term-life") ||
        (pathname === "/health/family-health-insurance")

    const waNumber = "919824923606"
    const waMsg = encodeURIComponent("Hello Policymine, I need assistance with insurance.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    useEffect(() => {
        if (showStickyAdvisorBar && !isDismissed) {
            document.body.classList.add("advisor-bar-active")
        } else {
            document.body.classList.remove("advisor-bar-active")
        }
        window.dispatchEvent(new Event("advisor-bar-toggle"))

        return () => {
            document.body.classList.remove("advisor-bar-active")
            window.dispatchEvent(new Event("advisor-bar-toggle"))
        }
    }, [showStickyAdvisorBar, isDismissed])

    useEffect(() => {
        if (!articleRef.current) return
        const headings = Array.from(articleRef.current.querySelectorAll("h2, h3")) as HTMLHeadingElement[]
        const items: TocItem[] = headings
            .filter((el) => el.textContent?.trim() && !el.closest("[data-no-toc]"))
            .map((el, i) => {
                const id = el.id || `toc-${i}`
                if (!el.id) el.id = id
                // Check if a parent has a custom ToC label override
                const labelContainer = el.closest("[data-toc-label]")
                const customLabel = labelContainer?.getAttribute("data-toc-label")
                return { id, text: customLabel || el.textContent?.trim() || "", level: parseInt(el.tagName.replace("H", "")) }
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
        <div className={`min-h-screen transition-all ${showStickyAdvisorBar && !isDismissed ? "pb-36 sm:pb-28 md:pb-24" : ""}`} style={{ background: "#F7F8FA" }}>
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
                <div
                    className={`grid gap-6 items-start ${hasToc && showSidebar
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
                        <aside
                            className="hidden lg:block relative"
                            style={{ alignSelf: "stretch" }}
                        >
                            <div style={{ position: "sticky", top: "96px", maxHeight: "calc(100vh - 96px - 2rem)", display: "flex", flexDirection: "column" }}>
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

                                    <nav className="space-y-0.5" style={{ overflowY: "auto", maxHeight: "calc(100vh - 96px - 10rem)", scrollbarWidth: "none" }}>
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
                            </div>
                        </aside>
                    )}
                </div>
            </div>

            {/* Sticky Advisor Promo Bar */}
            {showStickyAdvisorBar && !isDismissed && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F172A] text-white shadow-[0_-12px_40px_rgba(15,23,42,0.25)] border-t border-slate-800">
                    {/* Top Brand Accent Line */}
                    <div className="h-[3px] w-full absolute top-0 left-0" style={{ background: "linear-gradient(90deg, #F97316, #FBBF24, #F97316)" }} />

                    <div className="max-w-7xl mx-auto px-6 py-4 sm:py-5 relative flex flex-col md:flex-row md:items-center justify-between gap-4">

                        {/* Overlapping advisor image - visible from sm screens up */}
                        <div className="hidden sm:block absolute bottom-0 left-4 md:left-8 w-[140px] md:w-[180px] h-[145%] select-none pointer-events-none z-10">
                            <img
                                src="/images/w.png"
                                alt="MS Bhati - Advisor"
                                className="w-full h-full object-contain object-bottom"
                            />
                        </div>

                        {/* Title & description */}
                        <div className="ml-4 flex flex-col text-left sm:pl-36 md:pl-44 max-w-xl">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F97316] mb-1">
                                Need a Human Touch?
                            </span>
                            <h4 className="text-sm sm:text-base md:text-lg font-bold leading-tight text-white! font-heading">
                                Our advisors are here to help you pick the right plan.
                            </h4>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-2.5 z-20 mr-6 md:mr-8 sm:pl-36 md:pl-0">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest px-5 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-[0_6px_20px_-5px_rgba(249,115,22,0.3)] hover:shadow-[0_12px_30px_-5px_rgba(249,115,22,0.5)] shrink-0 select-none"
                                style={{
                                    background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                                }}
                            >
                                <Phone className="w-3.5 h-3.5" />
                                Book a Free Call
                            </Link>
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 border-[#25D366] hover:bg-[#25D366]/10 text-[#25D366] font-extrabold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shrink-0"
                                style={{ borderWidth: "1.5px" }}
                            >
                                <MessageCircle className="w-3.5 h-3.5" />
                                WhatsApp Us
                            </a>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsDismissed(true)}
                            className="absolute top-2.5 right-4 md:top-1/2 md:-translate-y-1/2 p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
