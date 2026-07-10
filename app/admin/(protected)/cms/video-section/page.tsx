"use client"

import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import {
    Loader2, Save, Eye, EyeOff, Video, Upload,
    Type, Tag, AlignLeft, ImageIcon, ExternalLink,
    CheckCircle2, AlertCircle, Heart, Shield, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

const EMPTY_CARD: VideoCard = { label: "", badge: "", thumbnailUrl: "", youtubeUrl: "", description: "" }

const DEFAULT_DATA: VideoSectionData = {
    sectionTitle: "See How We Help",
    sectionSubtitle: "Watch short explainers on the two policies every Indian family needs.",
    visible: true,
    categories: [
        {
            title: "Health Insurance",
            subtitle: "Protect your family from crushing medical bills with the right health plan.",
            badge: "Most Popular",
            cards: [
                { label: "Cashless Benefits", badge: "Video 1", thumbnailUrl: "/uploads/video_health_portrait.png", youtubeUrl: "", description: "How cashless hospitalisation keeps you stress-free during emergencies." },
                { label: "Critical Illness Rider", badge: "Video 2", thumbnailUrl: "/uploads/health_video_2.png", youtubeUrl: "", description: "Lump sum payout on major illness diagnosis to protect family savings." }
            ]
        },
        {
            title: "Pure Protection (Term Insurance)",
            subtitle: "Maximum life cover at the lowest premium — essential for every earning family.",
            badge: "Best Value",
            cards: [
                { label: "High Cover Benefit", badge: "Video 1", thumbnailUrl: "/uploads/video_term_portrait.png", youtubeUrl: "", description: "Get 10x–15x income replacement cover for your family's future." },
                { label: "Return of Premium", badge: "Video 2", thumbnailUrl: "/uploads/term_video_2.png", youtubeUrl: "", description: "Get all paid premiums back at maturity if you survive the term." }
            ]
        }
    ]
}

function extractYouTubeId(url: string): string | null {
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
    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim()
    return null
}

// ── Small ImageUploader sub-component ─────────────────────────────────────────
function ImageUploader({
    value,
    onChange,
}: {
    value: string
    onChange: (url: string) => void
}) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)

    async function handleFile(file: File) {
        setUploading(true)
        try {
            const form = new FormData()
            form.append("file", file)
            const res = await axios.post("/api/cms/upload", form)
            onChange(res.data.url)
            toast.success("Image uploaded!")
        } catch {
            toast.error("Upload failed. Max 5MB, JPG/PNG/WebP only.")
        } finally {
            setUploading(false)
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
    }

    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                Thumbnail Photo (9:16 Portrait)
            </label>

            {/* Preview */}
            {value ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group"
                    style={{ aspectRatio: "9/16", maxHeight: 180 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={value} alt="Thumbnail" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] font-bold py-1 px-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        Click ✕ to remove or re-upload below
                    </div>
                </div>
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={e => e.preventDefault()}
                    onClick={() => inputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-all"
                    style={{ aspectRatio: "9/16", maxHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                >
                    <ImageIcon className="w-6 h-6 text-slate-300 mb-2" />
                    <p className="text-xs font-semibold text-slate-400">Drag & drop or click to upload</p>
                    <p className="text-[9px] text-slate-300 mt-1">JPG, PNG, WebP · Max 5MB</p>
                </div>
            )}

            {/* Upload button (always shown) */}
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className={cn(
                    "w-full flex items-center justify-center gap-2 py-2 rounded-xl border text-xs font-bold transition-all",
                    uploading
                        ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                        : "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
                )}
            >
                {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                {uploading ? "Uploading…" : value ? "Replace Photo" : "Upload Photo"}
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) handleFile(file)
                    e.target.value = ""
                }}
            />
        </div>
    )
}

// ── YouTube URL field sub-component ───────────────────────────────────────────
function YouTubeField({
    value,
    onChange,
}: {
    value: string
    onChange: (url: string) => void
}) {
    const videoId = extractYouTubeId(value)

    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                YouTube Video Link
            </label>
            <div className="relative">
                <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <input
                    type="url"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=xxxxx  or  https://youtu.be/xxxxx"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-50 outline-none transition-all"
                />
                {value && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                        {videoId
                            ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            : <AlertCircle className="w-4 h-4 text-red-400" />
                        }
                    </span>
                )}
            </div>

            {/* Status feedback */}
            {value && videoId && (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-emerald-700">Video detected — ID: <code className="font-mono">{videoId}</code></p>
                    </div>
                    <a
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-800"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                </div>
            )}
            {value && !videoId && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <p className="text-[10px] font-bold text-red-600">Not a valid YouTube URL. Paste the full link from your browser.</p>
                </div>
            )}
            {!value && (
                <p className="text-[10px] text-slate-400 font-medium">Leave blank — the play button will be hidden on that card.</p>
            )}
        </div>
    )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function VideoSectionAdminPage() {
    const [data, setData] = useState<VideoSectionData>(DEFAULT_DATA)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        axios.get("/api/video-section")
            .then(res => {
                const d = res.data?.data
                if (d) {
                    // Merge API data with fallback to ensure categories always exist
                    setData({
                        ...DEFAULT_DATA,
                        ...d,
                        categories: (d.categories && d.categories.length > 0) ? d.categories : DEFAULT_DATA.categories
                    })
                }
            })
            .catch(() => toast.error("Failed to load video section"))
            .finally(() => setLoading(false))
    }, [])

    function updateCategoryField(catIdx: number, field: keyof Omit<VideoCategory, "cards">, value: string) {
        setData(prev => {
            const categories = [...(prev.categories || [])]
            categories[catIdx] = { ...categories[catIdx], [field]: value }
            return { ...prev, categories }
        })
    }

    function updateCard(catIdx: number, cardIdx: number, field: keyof VideoCard, value: string) {
        setData(prev => {
            const categories = [...(prev.categories || [])]
            const cards = [...(categories[catIdx]?.cards || [])]
            cards[cardIdx] = { ...cards[cardIdx], [field]: value }
            categories[catIdx] = { ...categories[catIdx], cards }
            return { ...prev, categories }
        })
    }

    function addCard(catIdx: number) {
        setData(prev => {
            const categories = [...(prev.categories || [])]
            const cards = [...(categories[catIdx]?.cards || [])]
            cards.push({ ...EMPTY_CARD, label: `Video ${cards.length + 1}`, badge: `Video ${cards.length + 1}` })
            categories[catIdx] = { ...categories[catIdx], cards }
            return { ...prev, categories }
        })
    }

    function removeCard(catIdx: number, cardIdx: number) {
        setData(prev => {
            const categories = [...(prev.categories || [])]
            const cards = [...(categories[catIdx]?.cards || [])].filter((_, i) => i !== cardIdx)
            categories[catIdx] = { ...categories[catIdx], cards }
            return { ...prev, categories }
        })
    }

    function addCategory() {
        setData(prev => {
            const categories = [...(prev.categories || [])]
            categories.push({
                title: `Category ${categories.length + 1}`,
                subtitle: "",
                badge: "New",
                cards: [{ ...EMPTY_CARD, label: "Video 1", badge: "Video 1" }]
            })
            return { ...prev, categories }
        })
    }

    function removeCategory(catIdx: number) {
        setData(prev => {
            const categories = [...(prev.categories || [])].filter((_, i) => i !== catIdx)
            return { ...prev, categories }
        })
    }

    async function handleSave() {
        setSaving(true)
        try {
            await axios.put("/api/video-section", data)
            toast.success("Video section saved successfully!")
        } catch {
            toast.error("Failed to save. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    const fieldCls = "w-full bg-white rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-50 outline-none transition-all"
    const labelCls = "text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1"

    const CATEGORY_ICONS = [Heart, Shield]
    const CATEGORY_COLORS = [
        { bg: "bg-red-50", border: "border-red-100", icon: "text-red-500", badge: "bg-red-100 text-red-700" },
        { bg: "bg-blue-50", border: "border-blue-100", icon: "text-blue-500", badge: "bg-blue-100 text-blue-700" },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
        )
    }

    return (
        <div className="max-w-5xl space-y-8 pt-3 sm:pt-5 lg:pt-6 pb-20">

            {/* ── Header ── */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Homepage Video Section</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Upload photos and paste YouTube links for the Health &amp; Term video cards shown after the hero banner.
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-5 h-10 text-sm font-bold shadow-sm"
                >
                    {saving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving…</> : <><Save className="w-4 h-4 mr-2" />Save Changes</>}
                </Button>
            </div>

            {/* ── Section-level Settings ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <Type className="w-4 h-4 text-orange-500" />
                        Section Heading &amp; Visibility
                    </h2>
                    <button
                        type="button"
                        onClick={() => setData(prev => ({ ...prev, visible: !prev.visible }))}
                        className={cn(
                            "flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all",
                            data.visible
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-slate-50 text-slate-500 border-slate-200"
                        )}
                    >
                        {data.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {data.visible ? "Visible on Site" : "Hidden from Site"}
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className={labelCls}>Section Heading</label>
                        <input className={fieldCls} value={data.sectionTitle} onChange={e => setData(prev => ({ ...prev, sectionTitle: e.target.value }))} />
                    </div>
                    <div>
                        <label className={labelCls}>Section Subtitle</label>
                        <input className={fieldCls} value={data.sectionSubtitle} onChange={e => setData(prev => ({ ...prev, sectionSubtitle: e.target.value }))} />
                    </div>
                </div>
            </div>

            {/* ── Category Panels ── */}
            {(data.categories || DEFAULT_DATA.categories).map((category, catIdx) => {
                const Icon = CATEGORY_ICONS[catIdx] ?? Shield
                const colors = CATEGORY_COLORS[catIdx] ?? CATEGORY_COLORS[0]

                return (
                    <div key={catIdx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                        {/* Category header bar */}
                        <div className={cn("px-6 py-4 border-b border-slate-100 flex items-center gap-3", colors.bg, colors.border, "border")}>
                            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white shadow-sm border", colors.border)}>
                                <Icon className={cn("w-4 h-4", colors.icon)} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full", colors.badge)}>
                                    {category.badge || `Category ${catIdx + 1}`}
                                </span>
                                <h2 className="text-base font-extrabold text-slate-900 mt-0.5" style={{ fontFamily: "var(--font-heading)" }}>
                                    {category.title}
                                </h2>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Category editable fields */}
                            <div className="grid sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                                <div>
                                    <label className={labelCls}>Category Title</label>
                                    <input className={fieldCls} value={category.title} onChange={e => updateCategoryField(catIdx, "title", e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelCls}>Category Subtitle</label>
                                    <input className={fieldCls} value={category.subtitle} onChange={e => updateCategoryField(catIdx, "subtitle", e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelCls}>Category Badge</label>
                                    <input className={fieldCls} value={category.badge} onChange={e => updateCategoryField(catIdx, "badge", e.target.value)} />
                                </div>
                            </div>

                            {/* Two video card editors side by side */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {(category.cards || []).map((card, cardIdx) => (
                                    <div key={cardIdx} className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-5">
                                        <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
                                            <div className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                                                {cardIdx + 1}
                                            </div>
                                            <p className="text-xs font-bold text-slate-800 flex-1">Video Card {cardIdx + 1}</p>
                                            {(category.cards || []).length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeCard(catIdx, cardIdx)}
                                                    className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 transition-all"
                                                >
                                                    <X className="w-3 h-3" /> Remove
                                                </button>
                                            )}
                                        </div>

                                        {/* Card title & badge */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className={labelCls}>Card Title</label>
                                                <input className={fieldCls} value={card.label} onChange={e => updateCard(catIdx, cardIdx, "label", e.target.value)} placeholder="e.g. Cashless Benefits" />
                                            </div>
                                            <div>
                                                <label className={labelCls}>Card Badge</label>
                                                <input className={fieldCls} value={card.badge} onChange={e => updateCard(catIdx, cardIdx, "badge", e.target.value)} placeholder="e.g. Video 1" />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className={labelCls}>Description (on photo)</label>
                                            <input className={fieldCls} value={card.description} onChange={e => updateCard(catIdx, cardIdx, "description", e.target.value)} placeholder="Short description shown at the bottom of the card" />
                                        </div>

                                        {/* Photo uploader */}
                                        <ImageUploader
                                            value={card.thumbnailUrl}
                                            onChange={url => updateCard(catIdx, cardIdx, "thumbnailUrl", url)}
                                        />

                                        {/* YouTube link */}
                                        <YouTubeField
                                            value={card.youtubeUrl}
                                            onChange={url => updateCard(catIdx, cardIdx, "youtubeUrl", url)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Add video card button */}
                            <button
                                type="button"
                                onClick={() => addCard(catIdx)}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-orange-200 text-orange-600 text-xs font-bold hover:bg-orange-50 hover:border-orange-400 transition-all"
                            >
                                <span className="text-lg leading-none">+</span> Add Another Video Card
                            </button>
                        </div>

                        {/* Remove category button (not for first 2) */}
                        {catIdx >= 2 && (
                            <div className="px-6 pb-4">
                                <button
                                    type="button"
                                    onClick={() => removeCategory(catIdx)}
                                    className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 px-3 py-1.5 rounded-xl hover:bg-red-50 border border-red-100 transition-all"
                                >
                                    <X className="w-3.5 h-3.5" /> Remove This Category
                                </button>
                            </div>
                        )}
                    </div>
                )
            })}

            {/* ── Add Category button ── */}
            <button
                type="button"
                onClick={addCategory}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 text-sm font-bold hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/30 transition-all"
            >
                <span className="text-xl leading-none">+</span> Add New Category
            </button>

            {/* ── Bottom Save ── */}
            <div className="flex justify-end">
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 h-11 text-sm font-bold shadow-sm"
                >
                    {saving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving…</> : <><Save className="w-4 h-4 mr-2" />Save All Changes</>}
                </Button>
            </div>
        </div>
    )
}
