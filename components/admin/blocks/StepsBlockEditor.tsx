"use client"

import { StepsBlockData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import ImageUploader from "../ImageUploader"
import { Plus, Trash2, GripVertical } from "lucide-react"

interface Props { data: StepsBlockData; onChange: (d: StepsBlockData) => void }

export default function StepsBlockEditor({ data, onChange }: Props) {
    const steps = data.steps || []

    function addStep() {
        onChange({ ...data, steps: [...steps, { text: "" }] })
    }

    function updateStep(i: number, text: string) {
        const next = steps.map((s, idx) => idx === i ? { ...s, text } : s)
        onChange({ ...data, steps: next })
    }

    function removeStep(i: number) {
        onChange({ ...data, steps: steps.filter((_, idx) => idx !== i) })
    }

    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Section Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="How Term Life Insurance Works?" />
            </div>

            <div className="space-y-2">
                <Label className="text-xs text-slate-500">Steps</Label>
                {steps.map((step, i) => (
                    <div key={i} className="flex gap-2 items-start">
                        <div className="flex items-center gap-1 mt-2 text-slate-300">
                            <GripVertical className="w-4 h-4" />
                            <span className="text-xs font-mono text-slate-400 w-4">{i + 1}</span>
                        </div>
                        <Textarea
                            value={step.text}
                            onChange={(e) => updateStep(i, e.target.value)}
                            placeholder={`Step ${i + 1} description`}
                            rows={2}
                            className="flex-1 text-sm"
                        />
                        <Button
                            type="button" variant="ghost" size="sm"
                            onClick={() => removeStep(i)}
                            className="text-slate-400 hover:text-red-500 h-8 w-8 p-0 mt-1 shrink-0"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addStep} className="w-full gap-2 text-xs">
                    <Plus className="w-3 h-3" /> Add Step
                </Button>
            </div>

            <ImageUploader label="Side Image (optional)" value={data.sideImage || ""} onChange={(url) => onChange({ ...data, sideImage: url })} />
        </div>
    )
}