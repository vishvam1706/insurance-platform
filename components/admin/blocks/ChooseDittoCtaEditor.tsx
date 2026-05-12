"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ChooseDittoCtaData {
    headline?: string
    subtext?: string
    ctaText?: string
    ctaHref?: string
}
interface Props { data: ChooseDittoCtaData; onChange: (d: ChooseDittoCtaData) => void }

export default function ChooseDittoCtaEditor({ data: rawData, onChange }: Props) {
    // Guard: existing DB records may have been saved without any fields
    const data: ChooseDittoCtaData = rawData ?? {}

    function set<K extends keyof ChooseDittoCtaData>(key: K, val: ChooseDittoCtaData[K]) {
        onChange({ ...data, [key]: val })
    }

    return (
        <div className="space-y-4">
            <p className="text-xs text-slate-400 bg-indigo-50 rounded-lg px-3 py-2">
                🎯 Horizontal CTA banner at the bottom of the homepage. Customise the headline, subtext, and button below.
            </p>
            <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Headline</Label>
                <Input
                    value={data.headline || ""}
                    onChange={(e) => set("headline", e.target.value)}
                    placeholder="Choose Ditto. Choose Honest Insurance."
                />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Subtext</Label>
                <Input
                    value={data.subtext || ""}
                    onChange={(e) => set("subtext", e.target.value)}
                    placeholder="Talk to an expert. No spam. No pressure."
                />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Button Text</Label>
                <div className="grid grid-cols-2 gap-2">
                    <Input
                        value={data.ctaText || ""}
                        onChange={(e) => set("ctaText", e.target.value)}
                        placeholder="Book a free call"
                    />
                    <Input
                        value={data.ctaHref || ""}
                        onChange={(e) => set("ctaHref", e.target.value)}
                        placeholder="/contact"
                    />
                </div>
            </div>
        </div>
    )
}
