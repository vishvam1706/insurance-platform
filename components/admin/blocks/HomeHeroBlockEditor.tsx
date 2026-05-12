"use client"

import { HomeHeroBlockData } from "@/types/blocks"
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

    return (
        <div className="space-y-4">
            {/* Badge */}
            <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Badge Text <span className="text-slate-300">(optional)</span></Label>
                <Input
                    value={data.badge || ""}
                    onChange={(e) => set("badge", e.target.value)}
                    placeholder="IRDAI-Certified Expert Advisors"
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
            <div className="space-y-2">
                <Label className="text-xs text-slate-500">Stats Grid</Label>
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

            {/* Hero Image — upload or paste URL */}
            <ImageUploader
                label="Hero Image (optional — shown on right side)"
                value={(data as any).imageUrl || ""}
                onChange={(url) => set("imageUrl" as any, url as any)}
            />

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
