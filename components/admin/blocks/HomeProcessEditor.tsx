"use client"

import { HomeProcessBlockData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

interface Props { data: HomeProcessBlockData; onChange: (d: HomeProcessBlockData) => void }

export default function HomeProcessEditor({ data, onChange }: Props) {
    const steps = data.steps || []

    const setStep = (index: number, field: string, value: string) => {
        const next = [...steps]
        next[index] = { ...next[index], [field]: value }
        onChange({ ...data, steps: next })
    }

    const addStep = () => {
        onChange({ ...data, steps: [...steps, { title: "New Step", text: "Description of the step here" }] })
    }

    const removeStep = (index: number) => {
        onChange({ ...data, steps: steps.filter((_, i) => i !== index) })
    }

    return (
        <div className="space-y-4">
            <div>
                <Label className="text-xs text-slate-500 mb-1 block">Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="e.g. Simple, Transparent & Guided Process" />
            </div>
            <div>
                <Label className="text-xs text-slate-500 mb-1 block">Subtitle</Label>
                <Input value={data.subtitle || ""} onChange={(e) => onChange({ ...data, subtitle: e.target.value })} placeholder="e.g. How we help you find the right plan..." />
            </div>
            
            <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex justify-between items-center">
                    <Label className="text-xs font-bold text-slate-700">Process Steps</Label>
                    <Button type="button" variant="outline" size="sm" className="h-7 text-xs flex items-center gap-1" onClick={addStep}>
                        <Plus className="w-3.5 h-3.5" /> Add Step
                    </Button>
                </div>
                
                <div className="space-y-3">
                    {steps.map((step, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative space-y-2 text-left">
                            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700 h-6 w-6" onClick={() => removeStep(idx)}>
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                            <div className="pr-8">
                                <Label className="text-[10px] text-slate-400 block mb-0.5">Step Title</Label>
                                <Input value={step.title || ""} onChange={(e) => setStep(idx, "title", e.target.value)} className="h-8 text-xs" />
                            </div>
                            <div>
                                <Label className="text-[10px] text-slate-400 block mb-0.5">Step Description Text</Label>
                                <Input value={step.text || ""} onChange={(e) => setStep(idx, "text", e.target.value)} className="h-8 text-xs" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
