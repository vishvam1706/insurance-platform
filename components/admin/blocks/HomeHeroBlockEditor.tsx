"use client"

import { HomeHeroBlockData, HomeHeroSlide } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import ImageUploader from "../ImageUploader"

interface Props { data: HomeHeroBlockData; onChange: (d: HomeHeroBlockData) => void }

export default function HomeHeroBlockEditor({ data, onChange }: Props) {
    const stats = data.stats || []
    const carouselImages = data.carouselImages || []
    const slides = data.slides || []

    function set<K extends keyof HomeHeroBlockData>(key: K, val: HomeHeroBlockData[K]) {
        onChange({ ...data, [key]: val })
    }

    function setCta(cta: "primaryCta" | "secondaryCta", key: "text" | "href", val: string) {
        onChange({ ...data, [cta]: { ...(data[cta] ?? {}), [key]: val } })
    }

    function addStat() {
        set("stats", [...stats, { value: "", label: "" }])
    }

    function updateStat(i: number, key: "value" | "label", val: string) {
        set("stats", stats.map((s, idx) => idx === i ? { ...s, [key]: val } : s))
    }

    function removeStat(i: number) {
        set("stats", stats.filter((_, idx) => idx !== i))
    }

    function addCarouselImage(url: string) {
        if (!url) return
        set("carouselImages", [...carouselImages, url])
    }

    function removeCarouselImage(i: number) {
        set("carouselImages", carouselImages.filter((_, idx) => idx !== i))
    }

    // Interactive Slides controls
    function addSlide() {
        const layoutType = slides.length % 3
        let newSlide: HomeHeroSlide = {
            title: `CRM Feature ${slides.length + 1}`,
            backgroundColor: layoutType === 0 ? "#FF7A50" : layoutType === 1 ? "#FFCE47" : "#4ECBA1",
            personImage: `/images/person${layoutType + 1}.png`
        }

        if (layoutType === 0) {
            newSlide = {
                ...newSlide,
                title: "Lead Follow-up",
                cardText1: "Deal Closed ✓",
                cardText2: "$4,800",
                badgeText: "Deal value"
            }
        } else if (layoutType === 1) {
            newSlide = {
                ...newSlide,
                title: "Smart Suggestions",
                cardText1: "Which plan fits this lead?",
                cardText2: "Enterprise Plan",
                cardText3: "Growth Plan"
            }
        } else {
            newSlide = {
                ...newSlide,
                title: "Auto Form Fill",
                cardText1: "Lead Info Form",
                cardText2: "Auto filling"
            }
        }

        set("slides", [...slides, newSlide])
    }

    function updateSlide<K extends keyof HomeHeroSlide>(i: number, key: K, val: HomeHeroSlide[K]) {
        set("slides", slides.map((s, idx) => idx === i ? { ...s, [key]: val } : s))
    }

    function removeSlide(i: number) {
        set("slides", slides.filter((_, idx) => idx !== i))
    }

    return (
        <div className="space-y-5">
            {/* Badge */}
            <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Badge Text <span className="text-slate-300">(optional)</span></Label>
                <Input
                    value={data.badge || ""}
                    onChange={(e) => set("badge", e.target.value)}
                    placeholder="Top-Rated Expert Advisors"
                />
            </div>

            {/* Title */}
            <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Headline <span className="text-red-400">*</span></Label>
                <Input
                    value={data.title}
                    onChange={(e) => set("title", e.target.value)}
                    placeholder="Life & Health Insurance Platform"
                />
            </div>

            {/* Subtitle */}
            <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Subtitle</Label>
                <Textarea
                    value={data.subtitle || ""}
                    onChange={(e) => set("subtitle", e.target.value)}
                    placeholder="A modern, full-stack platform for term life & health insurance..."
                    rows={2}
                />
            </div>

            {/* Primary CTA */}
            <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Primary Button</Label>
                <div className="grid grid-cols-2 gap-2">
                    <Input
                        value={data.primaryCta?.text || ""}
                        onChange={(e) => setCta("primaryCta", "text", e.target.value)}
                        placeholder="Book Free Call"
                    />
                    <Input
                        value={data.primaryCta?.href || ""}
                        onChange={(e) => setCta("primaryCta", "href", e.target.value)}
                        placeholder="/book-call"
                    />
                </div>
            </div>

            {/* Secondary CTA */}
            <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Secondary Button</Label>
                <div className="grid grid-cols-2 gap-2">
                    <Input
                        value={data.secondaryCta?.text || ""}
                        onChange={(e) => setCta("secondaryCta", "text", e.target.value)}
                        placeholder="Explore Plans"
                    />
                    <Input
                        value={data.secondaryCta?.href || ""}
                        onChange={(e) => setCta("secondaryCta", "href", e.target.value)}
                        placeholder="/term-life"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="space-y-2 border-t border-slate-100 pt-4">
                <Label className="text-xs font-semibold text-slate-700">Stats Grid</Label>
                {stats.map((s, i) => (
                    <div key={i} className="flex gap-2 items-center">
                        <Input
                            value={s.value}
                            onChange={(e) => updateStat(i, "value", e.target.value)}
                            placeholder="8,00,000+"
                            className="w-28 text-sm font-bold"
                        />
                        <Input
                            value={s.label}
                            onChange={(e) => updateStat(i, "label", e.target.value)}
                            placeholder="Customers Helped"
                            className="flex-1 text-sm"
                        />
                        <Button
                            type="button" variant="ghost" size="sm"
                            onClick={() => removeStat(i)}
                            className="h-8 w-8 p-0 text-slate-400 hover:text-red-500 shrink-0"
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                ))}
                <Button
                    type="button" variant="outline" size="sm"
                    onClick={addStat} className="w-full gap-2 text-xs"
                >
                    <Plus className="w-3 h-3" /> Add Stat
                </Button>
            </div>

            {/* CRM Interactive Slide Deck Manager */}
            <div className="space-y-3 border-t border-slate-100 pt-4">
                <div>
                    <Label className="text-xs font-semibold text-slate-700">Hero Section CRM Slide Deck</Label>
                    <p className="text-xs text-slate-400 mt-0.5">Customize active CRM features, background colors, and cutout cutout illustrations.</p>
                </div>

                {slides.length === 0 ? (
                    <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3 text-xs text-slate-500 leading-normal">
                        Using default 3 CRM slides (Lead Follow-up, Smart Suggestions, Auto Form Fill). Click "Add Custom Slide" below to customize.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {slides.map((s, i) => {
                            const layoutStyle = i % 3
                            return (
                                <div key={i} className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 relative space-y-3">
                                    <div className="flex justify-between items-center pb-1.5 border-b border-slate-200/60">
                                        <span className="text-xs font-bold text-slate-700">Slide {i + 1} — Layout Style: {layoutStyle === 0 ? "Lead Follow-up" : layoutStyle === 1 ? "Smart Suggestions" : "Auto Form Fill"}</span>
                                        <Button
                                            type="button" variant="ghost" size="sm"
                                            onClick={() => removeSlide(i)}
                                            className="h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>

                                    {/* Grid layout fields */}
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="space-y-1">
                                            <Label className="text-[11px] text-slate-500">Slide Title</Label>
                                            <Input
                                                value={s.title}
                                                onChange={(e) => updateSlide(i, "title", e.target.value)}
                                                placeholder="e.g. Lead Follow-up"
                                                className="h-7 text-xs"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[11px] text-slate-500">Background Color (Hex)</Label>
                                            <Input
                                                value={s.backgroundColor}
                                                onChange={(e) => updateSlide(i, "backgroundColor", e.target.value)}
                                                placeholder="e.g. #FF7A50"
                                                className="h-7 text-xs font-mono"
                                            />
                                        </div>
                                    </div>

                                    {/* Layout specific input helpers */}
                                    <div className="space-y-2 bg-white/70 border border-slate-100 rounded-lg p-2.5">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sub-Card Elements</span>
                                        
                                        {layoutStyle === 0 && (
                                            <div className="grid grid-cols-3 gap-2 text-xs">
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] text-slate-500">Deal Status</Label>
                                                    <Input
                                                        value={s.cardText1 || ""}
                                                        onChange={(e) => updateSlide(i, "cardText1", e.target.value)}
                                                        placeholder="Deal Closed ✓"
                                                        className="h-7 text-[11px]"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] text-slate-500">Deal Amount</Label>
                                                    <Input
                                                        value={s.cardText2 || ""}
                                                        onChange={(e) => updateSlide(i, "cardText2", e.target.value)}
                                                        placeholder="$4,800"
                                                        className="h-7 text-[11px]"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] text-slate-500">Badge Text</Label>
                                                    <Input
                                                        value={s.badgeText || ""}
                                                        onChange={(e) => updateSlide(i, "badgeText", e.target.value)}
                                                        placeholder="Deal value"
                                                        className="h-7 text-[11px]"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {layoutStyle === 1 && (
                                            <div className="grid grid-cols-3 gap-2 text-xs">
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] text-slate-500">Speech Bubble</Label>
                                                    <Input
                                                        value={s.cardText1 || ""}
                                                        onChange={(e) => updateSlide(i, "cardText1", e.target.value)}
                                                        placeholder="Which plan fits this lead?"
                                                        className="h-7 text-[11px]"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] text-slate-500">Option 1 Name</Label>
                                                    <Input
                                                        value={s.cardText2 || ""}
                                                        onChange={(e) => updateSlide(i, "cardText2", e.target.value)}
                                                        placeholder="Enterprise Plan"
                                                        className="h-7 text-[11px]"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] text-slate-500">Option 2 Name</Label>
                                                    <Input
                                                        value={s.cardText3 || ""}
                                                        onChange={(e) => updateSlide(i, "cardText3", e.target.value)}
                                                        placeholder="Growth Plan"
                                                        className="h-7 text-[11px]"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {layoutStyle === 2 && (
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] text-slate-500">Form Header</Label>
                                                    <Input
                                                        value={s.cardText1 || ""}
                                                        onChange={(e) => updateSlide(i, "cardText1", e.target.value)}
                                                        placeholder="Lead Info Form"
                                                        className="h-7 text-[11px]"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-[10px] text-slate-500">Form Status</Label>
                                                    <Input
                                                        value={s.cardText2 || ""}
                                                        onChange={(e) => updateSlide(i, "cardText2", e.target.value)}
                                                        placeholder="Auto filling"
                                                        className="h-7 text-[11px]"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Person Cutout Uploader */}
                                    <ImageUploader
                                        label="Person Cutout Illustration"
                                        value={s.personImage}
                                        onChange={(url) => updateSlide(i, "personImage", url)}
                                        compact
                                    />
                                </div>
                            )
                        })}
                    </div>
                )}

                <Button
                    type="button" variant="outline" size="sm"
                    onClick={addSlide} className="w-full gap-2 text-xs"
                >
                    <Plus className="w-3.5 h-3.5" /> Add Custom Slide
                </Button>
            </div>

            {/* Carousel Images Manager (Legacy static slide manager fallback) */}
            <div className="space-y-3 border-t border-slate-100 pt-4 opacity-50">
                <div>
                    <Label className="text-xs font-semibold text-slate-700">Legacy Images Carousel</Label>
                    <p className="text-xs text-slate-400 mt-0.5">Use the "Hero Section CRM Slide Deck" above for the premium layout.</p>
                </div>
            </div>

            {/* Show Inquiry Form */}
            <div className="flex items-center justify-between py-2 border-t border-slate-100 pt-3">
                <div>
                    <Label className="text-xs text-slate-700">Show Inquiry Form</Label>
                    <p className="text-xs text-slate-400 mt-0.5">Display the lead capture form on the right</p>
                </div>
                <Switch
                    checked={data.showInquiryForm !== false}
                    onCheckedChange={(v) => set("showInquiryForm", v)}
                />
            </div>
        </div>
    )
}
