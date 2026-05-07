"use client"

import { BenefitsListData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import ImageUploader from "../ImageUploader"
import { Plus, Trash2 } from "lucide-react"

interface Props { data: BenefitsListData; onChange: (d: BenefitsListData) => void }

export default function BenefitsListEditor({ data, onChange }: Props) {
    const items = data.items || []

    function addItem() {
        onChange({ ...data, items: [...items, { heading: "", body: "" }] })
    }

    function updateItem(i: number, key: "heading" | "body", val: string) {
        const next = items.map((item, idx) => idx === i ? { ...item, [key]: val } : item)
        onChange({ ...data, items: next })
    }

    function removeItem(i: number) {
        onChange({ ...data, items: items.filter((_, idx) => idx !== i) })
    }

    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Section Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Benefits of Term Insurance" />
            </div>

            <div className="space-y-3">
                <Label className="text-xs text-slate-500">Benefits</Label>
                {items.map((item, i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-500">Benefit {i + 1}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(i)} className="h-6 w-6 p-0 text-slate-400 hover:text-red-500">
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                        <Input value={item.heading} onChange={(e) => updateItem(i, "heading", e.target.value)} placeholder="Heading (e.g. Debt Protection)" className="text-sm" />
                        <Textarea value={item.body} onChange={(e) => updateItem(i, "body", e.target.value)} placeholder="Description..." rows={2} className="text-sm" />
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addItem} className="w-full gap-2 text-xs">
                    <Plus className="w-3 h-3" /> Add Benefit
                </Button>
            </div>

            <ImageUploader label="Side Image (optional)" value={data.sideImage || ""} onChange={(url) => onChange({ ...data, sideImage: url })} />
        </div>
    )
}