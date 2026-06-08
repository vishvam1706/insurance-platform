"use client"

import { HomeTrustBlockData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

interface Props { data: HomeTrustBlockData; onChange: (d: HomeTrustBlockData) => void }

export default function HomeTrustEditor({ data, onChange }: Props) {
    const items = data.items || []

    const setItem = (index: number, field: string, value: string) => {
        const next = [...items]
        next[index] = { ...next[index], [field]: value }
        onChange({ ...data, items: next })
    }

    const addItem = () => {
        onChange({ ...data, items: [...items, { heading: "New Advantage", body: "Description here" }] })
    }

    const removeItem = (index: number) => {
        onChange({ ...data, items: items.filter((_, i) => i !== index) })
    }

    return (
        <div className="space-y-5">
            <div>
                <Label className="text-xs text-slate-500 mb-1 block font-semibold">Block Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="e.g. Why Customers Trust Policymine" />
            </div>

            {/* Advisor trust callout editing section */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3.5 text-left">
                <Label className="text-xs font-bold text-slate-700 block">Left Sidebar - Advisor Trust Badge</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Label className="text-[10px] text-slate-400 block mb-1">Advisor Title / Prompt</Label>
                        <Input 
                            value={data.advisorTitle || ""} 
                            onChange={(e) => onChange({ ...data, advisorTitle: e.target.value })} 
                            placeholder="e.g. Confused about coverage?" 
                            className="bg-white h-9 text-xs" 
                        />
                    </div>
                    <div>
                        <Label className="text-[10px] text-slate-400 block mb-1">Advisor Image URL</Label>
                        <Input 
                            value={data.advisorImage || ""} 
                            onChange={(e) => onChange({ ...data, advisorImage: e.target.value })} 
                            placeholder="e.g. /images/person2.png" 
                            className="bg-white h-9 text-xs" 
                        />
                    </div>
                </div>

                <div>
                    <Label className="text-[10px] text-slate-400 block mb-1">Advisor Callout Text</Label>
                    <Input 
                        value={data.advisorText || ""} 
                        onChange={(e) => onChange({ ...data, advisorText: e.target.value })} 
                        placeholder="e.g. Talk to MS Bhati or any certified advisor for free." 
                        className="bg-white h-9 text-xs" 
                    />
                </div>
            </div>
            
            <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex justify-between items-center">
                    <Label className="text-xs font-bold text-slate-700">Trust Advantages</Label>
                    <Button type="button" variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1" onClick={addItem}>
                        <Plus className="w-3.5 h-3.5" /> Add Item
                    </Button>
                </div>
                
                <div className="space-y-3">
                    {items.map((item, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative space-y-2 text-left">
                            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700 h-6 w-6" onClick={() => removeItem(idx)}>
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                            <div className="pr-8">
                                <Label className="text-[10px] text-slate-400 block mb-0.5">Heading</Label>
                                <Input value={item.heading || ""} onChange={(e) => setItem(idx, "heading", e.target.value)} className="h-8 text-xs bg-white" />
                            </div>
                            <div>
                                <Label className="text-[10px] text-slate-400 block mb-0.5">Body Text</Label>
                                <Input value={item.body || ""} onChange={(e) => setItem(idx, "body", e.target.value)} className="h-8 text-xs bg-white" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
