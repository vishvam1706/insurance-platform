"use client"

import { InsurerSelectorData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import ImageUploader from "../ImageUploader"
import { Plus, Trash2 } from "lucide-react"

interface Props { data: InsurerSelectorData; onChange: (d: InsurerSelectorData) => void }

export default function InsurerSelectorEditor({ data, onChange }: Props) {
    const insurers = data.insurers || []

    function addInsurer() {
        onChange({ ...data, insurers: [...insurers, { name: "", slug: "", logo: "" }] })
    }

    function updateInsurer(i: number, key: string, val: string) {
        const next = insurers.map((ins, idx) => idx === i ? { ...ins, [key]: val } : ins)
        onChange({ ...data, insurers: next })
    }

    function removeInsurer(i: number) {
        onChange({ ...data, insurers: insurers.filter((_, idx) => idx !== i) })
    }

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-xs text-slate-500">Label</Label>
                    <Input value={data.label || ""} onChange={(e) => onChange({ ...data, label: e.target.value })} placeholder="Select Insurer" />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs text-slate-500">Help Text</Label>
                    <Input value={data.helpText || ""} onChange={(e) => onChange({ ...data, helpText: e.target.value })} placeholder="Let us know your insurer..." />
                </div>
            </div>

            <div className="space-y-3">
                <Label className="text-xs text-slate-500">Insurers ({insurers.length})</Label>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                    {insurers.map((ins, i) => (
                        <div key={i} className="border border-slate-200 rounded-lg p-2 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-xs text-slate-400">{i + 1}</span>
                                <Button type="button" variant="ghost" size="sm" onClick={() => removeInsurer(i)} className="h-5 w-5 p-0 text-slate-300 hover:text-red-500">
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                            <Input value={ins.name} onChange={(e) => updateInsurer(i, "name", e.target.value)} placeholder="Name" className="text-xs h-7" />
                            <Input value={ins.slug} onChange={(e) => updateInsurer(i, "slug", e.target.value)} placeholder="slug" className="text-xs h-7 font-mono" />
                            <ImageUploader label="Logo" value={ins.logo || ""} onChange={(url) => updateInsurer(i, "logo", url)} compact />
                        </div>
                    ))}
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addInsurer} className="w-full gap-2 text-xs">
                    <Plus className="w-3 h-3" /> Add Insurer
                </Button>
            </div>
        </div>
    )
}