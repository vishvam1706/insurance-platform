"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Phone, ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
    tagline: string
    image: string
    alt: string
}

interface HeroCarouselProps {
    slides: Slide[]
    ctaHref: string
    ctaLabel: string
    badge?: string
    title: React.ReactNode
    subtitle: string
    accentColor?: "orange" | "blue" | "emerald"
}

export default function HeroCarousel({
    slides,
    ctaHref,
    ctaLabel,
    badge = "Crucial Decision Required",
    title,
    subtitle,
    accentColor = "orange",
}: HeroCarouselProps) {
    const [current, setCurrent] = useState(0)
    const [animating, setAnimating] = useState(false)
    const [direction, setDirection] = useState<"left" | "right">("right")

    const go = useCallback(
        (idx: number, dir: "left" | "right") => {
            if (animating) return
            setDirection(dir)
            setAnimating(true)
            setTimeout(() => {
                setCurrent(idx)
                setAnimating(false)
            }, 350)
        },
        [animating]
    )

    const prev = () => go((current - 1 + slides.length) % slides.length, "left")
    const next = useCallback(() => go((current + 1) % slides.length, "right"), [current, go, slides.length])

    // Auto-advance every 5s
    useEffect(() => {
        const id = setInterval(next, 5000)
        return () => clearInterval(id)
    }, [next])

    const slide = slides[current]

    return (
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">

            {/* ── Left: Text + tagline strip ── */}
            <div className="text-left space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 shadow-[0_2px_10px_rgba(239,68,68,0.05)]">
                    <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-700">{badge}</span>
                </div>

                <div className="space-y-4">
                    <h1
                        className="text-4xl sm:text-5xl lg:text-[3.85rem] font-extrabold leading-[1.05] text-slate-900 tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {title}
                    </h1>
                    <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
                        {subtitle}
                    </p>
                </div>

                {/* Animated tagline display */}
                <div className="relative overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-6 shadow-[0_8px_30px_rgba(249,115,22,0.06)] min-h-[90px] flex items-center">
                    <div
                        key={current}
                        className="w-full"
                        style={{
                            animation: `slideIn${direction === "right" ? "Right" : "Left"} 0.35s cubic-bezier(0.34,1.56,0.64,1) both`,
                        }}
                    >
                        <p className="text-lg sm:text-xl font-extrabold text-slate-800 leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                            &ldquo;{slide.tagline}&rdquo;
                        </p>
                        <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
                    </div>
                </div>

                {/* Slide counter dots */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={prev}
                        aria-label="Previous slide"
                        className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 text-slate-500 hover:text-orange-500"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => go(i, i > current ? "right" : "left")}
                                aria-label={`Go to slide ${i + 1}`}
                                className="transition-all duration-300 rounded-full"
                                style={{
                                    width: i === current ? "24px" : "8px",
                                    height: "8px",
                                    background: i === current
                                        ? "linear-gradient(90deg, #f97316, #f59e0b)"
                                        : "#e2e8f0",
                                }}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        aria-label="Next slide"
                        className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 text-slate-500 hover:text-orange-500"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>

                    <span className="ml-1 text-xs text-slate-400 font-semibold tabular-nums">
                        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                    </span>
                </div>

                <div className="pt-2">
                    <Link
                        href={ctaHref}
                        className="btn-primary inline-flex items-center gap-2.5 rounded-2xl shadow-lg hover:shadow-orange-500/20 transition-all duration-300 px-8 py-3.5"
                    >
                        <Phone className="w-4 h-4 shrink-0" />
                        {ctaLabel}
                    </Link>
                </div>
            </div>

            {/* ── Right: Image panel ── */}
            <div className="relative group transition-all duration-500 hover:scale-[1.01]">
                <div
                    className="absolute -inset-4 rounded-[40px] opacity-25 blur-3xl group-hover:opacity-45 transition-opacity duration-300 pointer-events-none"
                    style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
                />
                <div
                    className="relative rounded-[36px] overflow-hidden border bg-white p-4 shadow-[0_32px_60px_-15px_rgba(15,23,42,0.03)]"
                    style={{ borderColor: "var(--brand-100)" }}
                >
                    <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "1/1" }}>
                        <img
                            key={current}
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-full object-cover border shadow-sm"
                            style={{
                                borderColor: "var(--brand-light)",
                                animation: `fadeScale 0.4s ease both`,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Keyframes injected inline */}
            <style>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeScale {
                    from { opacity: 0; transform: scale(0.96); }
                    to   { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    )
}
