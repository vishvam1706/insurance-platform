"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import {
    Loader2, Save, Type, Image as ImageIcon,
    Phone, Plus, X, Palette, Link as LinkIcon,
    Eye, Sparkles, CalendarDays, MessageCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ImageUploader from "@/components/admin/ImageUploader"

interface HeroStepImage {
    label: string
    image: string
}

interface HeroData {
    headlineLine1: string
    headlineLine2: string
    subtitle: string
    heroImage: string
    stepImages: HeroStepImage[]
    ctaText: string
    ctaLink: string
    secondaryCtaText: string
    secondaryCtaLink: string
    phoneNumbers: string[]
    backgroundGradient: {
        from: string
        to: string
    }
}

const DEFAULT_DATA: HeroData = {
    headlineLine1: "EVERY AGE",
    headlineLine2: "HAS A RISK",
    subtitle: "Every stage needs a insurance plan",
    heroImage: "",
    stepImages: [
        { label: "Childhood", image: "/uploads/step_child.png" },
        { label: "Education", image: "/uploads/step_teenager.png" },
        { label: "Career", image: "/uploads/step_young_adult.png" },
        { label: "Family", image: "/uploads/step_middleage.png" },
        { label: "Retirement", image: "/uploads/step_elderly.png" },
    ],
    ctaText: "Book Free Consultation",
    ctaLink: "/contact",
    secondaryCtaText: "Get WhatsApp Support",
    secondaryCtaLink: "",
    phoneNumbers: [],
    backgroundGradient: { from: "#1a3a5c", to: "#0d2137" },
}

export default function AdminHeroPage() {
    const [data, setData] = useState<HeroData>(DEFAULT_DATA)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [showPreview, setShowPreview] = useState(false)

    useEffect(() => {
        fetchHero()
    }, [])

    async function fetchHero() {
        setLoading(true)
        try {
            const res = await axios.get("/api/cms/hero")
            const hero = res.data.hero
            if (hero) {
                setData({
                    headlineLine1: hero.headlineLine1 || DEFAULT_DATA.headlineLine1,
                    headlineLine2: hero.headlineLine2 || DEFAULT_DATA.headlineLine2,
                    subtitle: hero.subtitle || DEFAULT_DATA.subtitle,
                    heroImage: hero.heroImage || "",
                    stepImages: hero.stepImages || DEFAULT_DATA.stepImages,
                    ctaText: hero.ctaText || DEFAULT_DATA.ctaText,
                    ctaLink: hero.ctaLink || DEFAULT_DATA.ctaLink,
                    secondaryCtaText: hero.secondaryCtaText || DEFAULT_DATA.secondaryCtaText,
                    secondaryCtaLink: hero.secondaryCtaLink || "",
                    phoneNumbers: hero.phoneNumbers || [],
                    backgroundGradient: hero.backgroundGradient || DEFAULT_DATA.backgroundGradient,
                })
            }
        } catch (err) {
            console.error(err)
            toast.error("Failed to load hero content")
        } finally {
            setLoading(false)
        }
    }

    async function handleSave() {
        setSaving(true)
        try {
            await axios.put("/api/cms/hero", data)
            toast.success("Hero section updated successfully")
        } catch (err) {
            console.error(err)
            toast.error("Failed to save hero content")
        } finally {
            setSaving(false)
        }
    }

    function set<K extends keyof HeroData>(key: K, val: HeroData[K]) {
        setData(prev => ({ ...prev, [key]: val }))
    }

    function addPhoneNumber() {
        setData(prev => ({ ...prev, phoneNumbers: [...prev.phoneNumbers, ""] }))
    }

    function updatePhoneNumber(idx: number, val: string) {
        setData(prev => ({
            ...prev,
            phoneNumbers: prev.phoneNumbers.map((p, i) => i === idx ? val : p),
        }))
    }

    function removePhoneNumber(idx: number) {
        setData(prev => ({
            ...prev,
            phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== idx),
        }))
    }

    const inputCls = "bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition-all w-full"

    return (
        <div className="space-y-6 pt-3 sm:pt-5 lg:pt-6 text-left max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-emerald-600" />
                        Hero Section
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Manage the homepage hero banner — headline, image, CTAs, and background
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => setShowPreview(!showPreview)}
                        variant="outline"
                        className="gap-2 rounded-xl"
                    >
                        <Eye className="w-4 h-4" />
                        {showPreview ? "Hide Preview" : "Preview"}
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={saving || loading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 rounded-xl shadow-md min-w-[120px]"
                    >
                        {saving ? (
                            <><Loader2 className="w-4 h-4 animate-spin mr-1.5" /> Saving...</>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
                    <p className="text-slate-500 text-sm font-medium">Loading hero content...</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Live Preview */}
                    {showPreview && (
                        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
                            <div
                                className="relative overflow-hidden p-8 sm:p-12 min-h-[320px] flex items-center"
                                style={{
                                    background: `linear-gradient(135deg, ${data.backgroundGradient.from} 0%, ${data.backgroundGradient.to} 100%)`,
                                }}
                            >
                                {/* Subtle pattern overlay */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                                    style={{
                                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.5) 35px, rgba(255,255,255,0.5) 36px)`,
                                    }}
                                />

                                <div className="grid sm:grid-cols-2 gap-6 items-center relative z-10 w-full">
                                    <div className="text-left">
                                        <h2
                                            className="font-black text-white uppercase leading-[0.95] tracking-tight"
                                            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
                                        >
                                            {data.headlineLine1}
                                        </h2>
                                        <h2
                                            className="font-black text-white uppercase leading-[0.95] tracking-tight mt-1"
                                            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
                                        >
                                            {data.headlineLine2}
                                        </h2>
                                        <p className="text-white/80 mt-4 text-sm sm:text-base font-medium max-w-sm leading-relaxed">
                                            {data.subtitle}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-5">
                                            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-orange-500 text-white">
                                                <CalendarDays className="w-3.5 h-3.5" />
                                                {data.ctaText}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white border border-white/25 bg-white/10">
                                                <MessageCircle className="w-3.5 h-3.5" />
                                                {data.secondaryCtaText}
                                            </span>
                                        </div>
                                        {data.phoneNumbers.length > 0 && (
                                            <div className="flex flex-wrap gap-3 mt-4">
                                                {data.phoneNumbers.map((p, i) => (
                                                    <span key={i} className="inline-flex items-center gap-1 text-white/60 text-xs">
                                                        <Phone className="w-3 h-3" /> {p}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-center items-end h-[240px] w-full max-w-[340px] gap-1 relative z-10 px-2 pb-2 overflow-hidden">
                                        {data.stepImages?.map((step, idx) => {
                                            const heights = ["h-8", "h-14", "h-20", "h-26", "h-32"]
                                            const hClass = heights[idx] || "h-8"
                                            return (
                                                <div key={idx} className="relative flex flex-col justify-end items-center w-[18%]">
                                                    {step.image && (
                                                        /* eslint-disable-next-line @next/next/no-img-element */
                                                        <img
                                                            src={step.image}
                                                            alt={step.label}
                                                            className="h-[80px] w-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] mb-[-8px] relative z-10"
                                                        />
                                                    )}
                                                    <div
                                                        className={`w-full ${hClass} rounded-t-lg bg-white/10 border border-white/15 flex items-end justify-center pb-1`}
                                                    >
                                                        <span className="text-[7px] font-black text-white/90 uppercase tracking-widest leading-none">
                                                            {step.label}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 px-4 py-2 text-center">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    Live Preview — How it will look on the homepage
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Main Editor Grid */}
                    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">

                        {/* Left — Content Fields */}
                        <div className="space-y-6">
                            {/* Headline */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                                <div className="flex items-center gap-2 mb-1">
                                    <Type className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-extrabold text-slate-800 text-base">Headline</h3>
                                </div>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5">
                                    The bold headline text displayed on the hero banner. Each line appears on a separate row.
                                </p>

                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                                            Line 1
                                        </label>
                                        <input
                                            className={inputCls}
                                            value={data.headlineLine1}
                                            onChange={e => set("headlineLine1", e.target.value)}
                                            placeholder="EVERY AGE"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                                            Line 2
                                        </label>
                                        <input
                                            className={inputCls}
                                            value={data.headlineLine2}
                                            onChange={e => set("headlineLine2", e.target.value)}
                                            placeholder="HAS A RISK"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                                            Subtitle
                                        </label>
                                        <Textarea
                                            className="bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition-all w-full resize-none"
                                            value={data.subtitle}
                                            onChange={e => set("subtitle", e.target.value)}
                                            placeholder="Every stage needs a insurance plan"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                                <div className="flex items-center gap-2 mb-1">
                                    <LinkIcon className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-extrabold text-slate-800 text-base">Call-to-Action Buttons</h3>
                                </div>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5">
                                    Configure the hero section&apos;s primary and secondary CTA buttons.
                                </p>

                                <div className="space-y-4">
                                    {/* Primary CTA */}
                                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-3">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">Primary Button</span>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Button Text</label>
                                                <input
                                                    className={inputCls}
                                                    value={data.ctaText}
                                                    onChange={e => set("ctaText", e.target.value)}
                                                    placeholder="Book Free Consultation"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Link URL</label>
                                                <input
                                                    className={inputCls}
                                                    value={data.ctaLink}
                                                    onChange={e => set("ctaLink", e.target.value)}
                                                    placeholder="/contact"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Secondary CTA */}
                                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-3">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Secondary Button</span>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Button Text</label>
                                                <input
                                                    className={inputCls}
                                                    value={data.secondaryCtaText}
                                                    onChange={e => set("secondaryCtaText", e.target.value)}
                                                    placeholder="Get WhatsApp Support"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Link URL (optional)</label>
                                                <input
                                                    className={inputCls}
                                                    value={data.secondaryCtaLink}
                                                    onChange={e => set("secondaryCtaLink", e.target.value)}
                                                    placeholder="Leave empty for WhatsApp default"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-slate-400 mt-1">
                                            Leave the link URL empty to auto-use the WhatsApp number from settings.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Numbers */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                                <div className="flex items-center gap-2 mb-1">
                                    <Phone className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-extrabold text-slate-800 text-base">Phone Numbers</h3>
                                </div>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5">
                                    Optional phone numbers displayed on the hero section. Leave empty to hide.
                                </p>

                                <div className="space-y-2">
                                    {data.phoneNumbers.map((phone, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <input
                                                className={inputCls}
                                                value={phone}
                                                onChange={e => updatePhoneNumber(idx, e.target.value)}
                                                placeholder="+91 93775 79551"
                                            />
                                            <button
                                                onClick={() => removePhoneNumber(idx)}
                                                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-rose-500 hover:border-rose-200 transition-all hover:scale-105 active:scale-95 shrink-0"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        onClick={addPhoneNumber}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-500 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50/30 transition-all duration-200"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Phone Number
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right — Image & Colors */}
                        <div className="space-y-6">
                            {/* Staircase Steps */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                                <div className="flex items-center gap-2 mb-1">
                                    <Sparkles className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-extrabold text-slate-800 text-base">Staircase Steps</h3>
                                </div>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5">
                                    Configure each step of the staircase — label and image of the life stage.
                                </p>

                                <div className="space-y-6">
                                    {data.stepImages?.map((step, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-3">
                                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                                                Step {idx + 1}
                                            </span>
                                            <div className="space-y-2">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Label</label>
                                                    <input
                                                        className={inputCls}
                                                        value={step.label}
                                                        onChange={e => {
                                                            const newSteps = [...data.stepImages]
                                                            newSteps[idx] = { ...newSteps[idx], label: e.target.value }
                                                            set("stepImages", newSteps)
                                                        }}
                                                        placeholder="e.g. Childhood"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Step Image</label>
                                                    <ImageUploader
                                                        label=""
                                                        value={step.image}
                                                        onChange={url => {
                                                            const newSteps = [...data.stepImages]
                                                            newSteps[idx] = { ...newSteps[idx], image: url }
                                                            set("stepImages", newSteps)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Background Colors */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                                <div className="flex items-center gap-2 mb-1">
                                    <Palette className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-extrabold text-slate-800 text-base">Background Gradient</h3>
                                </div>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5">
                                    Set the gradient colors for the hero background. The gradient flows diagonally from the &quot;From&quot; color to the &quot;To&quot; color.
                                </p>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                                            From Color
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                value={data.backgroundGradient.from}
                                                onChange={e => set("backgroundGradient", { ...data.backgroundGradient, from: e.target.value })}
                                                className="w-10 h-10 rounded-xl border-2 border-slate-200 cursor-pointer p-0.5"
                                            />
                                            <input
                                                className={inputCls + " font-mono"}
                                                value={data.backgroundGradient.from}
                                                onChange={e => set("backgroundGradient", { ...data.backgroundGradient, from: e.target.value })}
                                                placeholder="#1a3a5c"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                                            To Color
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                value={data.backgroundGradient.to}
                                                onChange={e => set("backgroundGradient", { ...data.backgroundGradient, to: e.target.value })}
                                                className="w-10 h-10 rounded-xl border-2 border-slate-200 cursor-pointer p-0.5"
                                            />
                                            <input
                                                className={inputCls + " font-mono"}
                                                value={data.backgroundGradient.to}
                                                onChange={e => set("backgroundGradient", { ...data.backgroundGradient, to: e.target.value })}
                                                placeholder="#0d2137"
                                            />
                                        </div>
                                    </div>

                                    {/* Preview swatch */}
                                    <div
                                        className="h-14 rounded-2xl border border-slate-200 shadow-inner"
                                        style={{
                                            background: `linear-gradient(135deg, ${data.backgroundGradient.from} 0%, ${data.backgroundGradient.to} 100%)`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Quick Presets */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                                <h3 className="font-extrabold text-slate-800 text-sm mb-3">Color Presets</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { label: "Deep Ocean", from: "#1a3a5c", to: "#0d2137" },
                                        { label: "Navy Blue", from: "#1e3a6e", to: "#0f1d3a" },
                                        { label: "Midnight", from: "#1a1a2e", to: "#16213e" },
                                        { label: "Teal", from: "#0d4f4f", to: "#0a2e2e" },
                                        { label: "Royal", from: "#2d3580", to: "#1a1f4e" },
                                        { label: "Charcoal", from: "#2d3436", to: "#1a1a2e" },
                                    ].map(preset => (
                                        <button
                                            key={preset.label}
                                            onClick={() => set("backgroundGradient", { from: preset.from, to: preset.to })}
                                            className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <div
                                                className="w-6 h-6 rounded-lg shrink-0"
                                                style={{ background: `linear-gradient(135deg, ${preset.from}, ${preset.to})` }}
                                            />
                                            <span className="text-[11px] font-bold text-slate-600">{preset.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
