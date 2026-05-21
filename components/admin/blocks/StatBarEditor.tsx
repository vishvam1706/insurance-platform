"use client"

import { StatBarData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import ImageUploader from "../ImageUploader"

interface Props { data: StatBarData; onChange: (d: StatBarData) => void }

export default function StatBarEditor({ data, onChange }: Props) {
    const stats = data.stats || []

    function addStat() {
        onChange({ ...data, stats: [...stats, { value: "", label: "" }] })
    }

    function updateStat(i: number, key: "value" | "label", val: string) {
        const next = stats.map((s, idx) => idx === i ? { ...s, [key]: val } : s)
        onChange({ ...data, stats: next })
    }

    function removeStat(i: number) {
        onChange({ ...data, stats: stats.filter((_, idx) => idx !== i) })
    }

    return (
        <div className="space-y-4">
            <div className="space-y-3">
                <Label className="text-xs text-slate-500">Stats</Label>
                {stats.map((stat, i) => (
                    <div key={i} className="flex gap-2 items-center">
                        <Input value={stat.value} onChange={(e) => updateStat(i, "value", e.target.value)} placeholder="8,00,000+" className="text-sm font-bold w-32" />
                        <Input value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} placeholder="Customers Helped" className="text-sm flex-1" />
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeStat(i)} className="h-8 w-8 p-0 text-slate-400 hover:text-red-500 shrink-0">
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addStat} className="w-full gap-2 text-xs">
                    <Plus className="w-3 h-3" /> Add Stat
                </Button>
            </div>

            <hr className="border-slate-800" />

            <div className="space-y-2">
                <ImageUploader
                    label="Floating Accent Icon / Logo (optional)"
                    value={data.floatingImage || ""}
                    onChange={(url) => onChange({ ...data, floatingImage: url })}
                />
                <p className="text-[10px] text-slate-400">
                    Displays as a floating, premium top-right overlay element over the Stat Bar (e.g. dynamic logo or seal of trust).
                </p>
            </div>
        </div>
    )
}