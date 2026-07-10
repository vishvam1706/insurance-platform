"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Play, X, Heart, Shield, Sparkles } from "lucide-react"

interface VideoCard {
    label: string
    badge: string
    thumbnailUrl: string
    youtubeUrl: string
    description: string
}

interface VideoCategory {
    title: string
    subtitle: string
    badge: string
    cards: VideoCard[]
}

interface VideoSectionData {
    sectionTitle: string
    sectionSubtitle: string
    visible: boolean
    categories: VideoCategory[]
}

function getYouTubeId(url: string): string | null {
    if (!url) return null
    const patterns = [
        /youtu\.be\/([^?&\s]+)/,
        /youtube\.com\/watch\?v=([^&\s]+)/,
        /youtube\.com\/embed\/([^?&\s]+)/,
        /youtube\.com\/v\/([^?&\s]+)/,
    ]
    for (const p of patterns) {
        const m = url.match(p)
        if (m) return m[1]
    }
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url
    return null
}

const FALLBACK_CATEGORIES: VideoCategory[] = [
    {
        title: "Health Insurance",
        subtitle: "Protect your family from crushing medical bills with the right health plan.",
        badge: "Most Popular",
        cards: [
            {
                label: "Cashless Benefits",
                badge: "Explainer 1",
                thumbnailUrl: "/uploads/video_health_portrait.png",
                youtubeUrl: "",
                description: "How cashless hospitalisation keeps you stress-free during emergencies."
            },
            {
                label: "Critical Illness Rider",
                badge: "Explainer 2",
                thumbnailUrl: "/uploads/health_video_2.png",
                youtubeUrl: "",
                description: "Lump sum payout on major illness diagnosis to protect family savings."
            }
        ]
    },
    {
        title: "Pure Protection (Term Insurance)",
        subtitle: "Maximum life cover at the lowest premium — essential for every earning family.",
        badge: "Best Value",
        cards: [
            {
                label: "High Cover Benefit",
                badge: "Explainer 1",
                thumbnailUrl: "/uploads/video_term_portrait.png",
                youtubeUrl: "",
                description: "Get 10x-15x income replacement cover for your family's future."
            },
            {
                label: "Return of Premium",
                badge: "Explainer 2",
                thumbnailUrl: "/uploads/term_video_2.png",
                youtubeUrl: "",
                description: "Get all paid premiums back at maturity if you survive the term."
            }
        ]
    }
]

export default function HomeVideoSection() {
    const [data, setData] = useState<VideoSectionData>({
        sectionTitle: "See How We Help",
        sectionSubtitle: "Watch short explainers on the two policies every Indian family needs.",
        visible: true,
        categories: FALLBACK_CATEGORIES
    })
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

    useEffect(() => {
        axios.get("/api/video-section")
            .then(res => {
                const d = res.data?.data
                if (d && d.visible !== false) {
                    setData(d)
                }
            })
            .catch(() => {})
    }, [])

    if (!data.visible) return null

    function openVideo(url: string) {
        const id = getYouTubeId(url)
        if (id) setActiveVideoId(id)
    }

    return (
        <>
            <section className="relative py-16 sm:py-24 bg-slate-50 overflow-hidden">
                {/* Ambient background decoration */}
                <div className="absolute top-10 left-0 w-80 h-80 rounded-full bg-orange-200 blur-[140px] opacity-[0.06] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-200 blur-[140px] opacity-[0.06] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    {/* ── Section Header ── */}
                    <div className="mb-14 text-left">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4 select-none animate-pulse"
                            style={{ background: "#FFF7ED", color: "#EA580C", border: "1px solid #FFEDD5" }}>
                            <Sparkles className="w-3 h-3" />
                            Interactive Explainer Videos
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}>
                            {data.sectionTitle}
                        </h2>
                        <p className="text-slate-500 text-sm font-medium mt-3 max-w-lg leading-relaxed">
                            {data.sectionSubtitle}
                        </p>
                    </div>

                    {/* ── Outer split: Left (Health) & Right (Term) ── */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {(data.categories || FALLBACK_CATEGORIES).map((category, catIdx) => {
                            const Icon = catIdx === 0 ? Heart : Shield

                            return (
                                <div key={catIdx} className="space-y-6">
                                    
                                    {/* Category Header */}
                                    <div className="space-y-2 pb-4 border-b border-slate-200">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                                                <Icon className="w-5 h-5 text-orange-500" />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-orange-500">
                                                    {category.badge}
                                                </span>
                                                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight"
                                                    style={{ fontFamily: "var(--font-heading)" }}>
                                                    {category.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed pl-12">
                                            {category.subtitle}
                                        </p>
                                    </div>

                                    {/* Cards grid — adapts to number of cards */}
                                    <div
                                        className="grid gap-4"
                                        style={{
                                            gridTemplateColumns: (category.cards || []).length <= 2
                                                ? `repeat(${(category.cards || []).length}, minmax(0, 1fr))`
                                                : "repeat(auto-fill, minmax(140px, 1fr))"
                                        }}
                                    >
                                        {(category.cards || []).map((card, cardIdx) => {
                                            const videoId = getYouTubeId(card.youtubeUrl)
                                            const hasVideo = !!videoId

                                            return (
                                                <div key={cardIdx} className="flex flex-col gap-2">
                                                    
                                                    {/* Card Title */}
                                                    <p className="text-xs font-bold text-slate-800 line-clamp-1 truncate" style={{ fontFamily: "var(--font-heading)" }}>
                                                        {card.label}
                                                    </p>

                                                    {/* 9:16 Portrait Box */}
                                                    <div
                                                        onClick={() => hasVideo && openVideo(card.youtubeUrl)}
                                                        className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-slate-100"
                                                        style={{ aspectRatio: "9/16" }}
                                                    >
                                                        {/* Thumbnail */}
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={card.thumbnailUrl}
                                                            alt={card.label}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />

                                                        {/* Dark overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                                                        {/* Play Button */}
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className={`
                                                                w-12 h-12 rounded-full flex items-center justify-center shadow-xl border border-white/60
                                                                transition-all duration-300
                                                                ${hasVideo
                                                                    ? "bg-white/95 backdrop-blur-sm group-hover:scale-110 group-hover:bg-orange-500"
                                                                    : "bg-white/20 backdrop-blur-sm cursor-default"
                                                                }
                                                            `}>
                                                                <Play className={`w-4 h-4 ml-0.5 transition-colors ${hasVideo ? "text-slate-900 group-hover:text-white fill-slate-900 group-hover:fill-white" : "text-white/60 fill-white/60"}`} />
                                                            </div>
                                                        </div>

                                                        {/* Subtitle / Description overlay at bottom */}
                                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-orange-400 mb-0.5">
                                                                {hasVideo ? "▶ Click to watch" : "Coming soon"}
                                                            </p>
                                                            <p className="text-[10.5px] font-medium text-white/90 leading-snug line-clamp-2">
                                                                {card.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── YouTube Fullscreen Modal ── */}
            {activeVideoId && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.85)" }}
                    onClick={() => setActiveVideoId(null)}
                >
                    <div
                        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-black"
                        style={{ aspectRatio: "16/9" }}
                        onClick={e => e.stopPropagation()}
                    >
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                            allow="autoplay; fullscreen; encrypted-media"
                            allowFullScreen
                            title="Insurance explainer video"
                        />
                    </div>

                    {/* Close X */}
                    <button
                        type="button"
                        onClick={() => setActiveVideoId(null)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Close video"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </>
    )
}
