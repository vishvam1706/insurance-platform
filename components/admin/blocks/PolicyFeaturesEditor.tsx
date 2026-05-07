"use client"

import { PolicyFeaturesListData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface Props { data: PolicyFeaturesListData; onChange: (d: PolicyFeaturesListData) => void }

export default function PolicyFeaturesEditor({ data, onChange }: Props) {
    const features = data.features || []

    function addFeature() {
        onChange({ ...data, features: [...features, { title: "", body: "" }] })
    }

    function updateFeature(i: number, key: "title" | "body", val: string) {
        const next = features.map((f, idx) => idx === i ? { ...f, [key]: val } : f)
        onChange({ ...data, features: next })
    }

    function removeFeature(i: number) {
        onChange({ ...data, features: features.filter((_, idx) => idx !== i) })
    }

    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Section Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Comparing Policy Features" />
            </div>

            <div className="space-y-3">
                <Label className="text-xs text-slate-500">Features</Label>
                {features.map((feature, i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between">
                            <span className="text-xs text-slate-400">Feature {i + 1}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeFeature(i)} className="h-6 w-6 p-0 text-slate-400 hover:text-red-500">
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                        <Input value={feature.title} onChange={(e) => updateFeature(i, "title", e.target.value)} placeholder="Feature name (e.g. Co-payment)" className="text-sm font-medium" />
                        <Textarea value={feature.body} onChange={(e) => updateFeature(i, "body", e.target.value)} placeholder="Feature explanation..." rows={3} className="text-sm" />
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addFeature} className="w-full gap-2 text-xs">
                    <Plus className="w-3 h-3" /> Add Feature
                </Button>
            </div>
        </div>
    )
}