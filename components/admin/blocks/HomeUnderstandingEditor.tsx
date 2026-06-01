"use client"

import { HomeUnderstandingBlockData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

interface Props { data: HomeUnderstandingBlockData; onChange: (d: HomeUnderstandingBlockData) => void }

export default function HomeUnderstandingEditor({ data, onChange }: Props) {
    const items = data.items || []

    const setItem = (index: number, field: string, value: string) => {
        const next = [...items]
        next[index] = { ...next[index], [field]: value }
        onChange({ ...data, items: next })
    }

    const addItem = () => {
        onChange({ ...data, items: [...items, { title: "New Pillar", desc: "Description here" }] })
    }

    const removeItem = (index: number) => {
        onChange({ ...data, items: items.filter((_, i) => i !== index) })
    }

    return (
        <div className="space-y-4">
            <div>
                <Label className="text-xs text-slate-500 mb-1 block">Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="e.g. Insurance Should Be Understood — Not Just Purchased" />
            </div>
            <div>
                <Label className="text-xs text-slate-500 mb-1 block">Subtitle</Label>
                <Input value={data.subtitle || ""} onChange={(e) => onChange({ ...data, subtitle: e.target.value })} placeholder="e.g. Buying insurance shouldn't feel..." />
            </div>
            
            <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex justify-between items-center">
                    <Label className="text-xs font-bold text-slate-700">Pillars/Sections</Label>
                    <Button type="button" variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1" onClick={addItem}>
                        <Plus className="w-3.5 h-3.5" /> Add Pillar
                    </Button>
                </div>
                
                <div className="space-y-3">
                    {items.map((item, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative space-y-2 text-left">
                            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700 h-6 w-6" onClick={() => removeItem(idx)}>
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                            <div className="pr-8">
                                <Label className="text-[10px] text-slate-400 block mb-0.5">Pillar Title</Label>
                                <Input value={item.title || ""} onChange={(e) => setItem(idx, "title", e.target.value)} className="h-8 text-xs" />
                            </div>
                            <div>
                                <Label className="text-[10px] text-slate-400 block mb-0.5">Pillar Description</Label>
                                <Input value={item.desc || ""} onChange={(e) => setItem(idx, "desc", e.target.value)} className="h-8 text-xs" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
