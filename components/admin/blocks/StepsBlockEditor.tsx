"use client"

import { StepsBlockData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, GripVertical } from "lucide-react"

interface Props { data: StepsBlockData; onChange: (d: StepsBlockData) => void }

export default function StepsBlockEditor({ data, onChange }: Props) {
    const steps = data.steps || []

    function addStep() {
        onChange({ ...data, steps: [...steps, { title: "", body: "", text: "" } as StepsBlockData["steps"][number]] })
    }

    function updateStep(i: number, key: "title" | "body", val: string) {
        const next = steps.map((s: any, idx) => idx === i ? { ...s, [key]: val, text: key === "body" ? val : s.text } : s)
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
                {steps.map((step: any, i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-3 space-y-2 bg-slate-50">
                        <div className="flex items-center gap-2">
                            <GripVertical className="w-4 h-4 text-slate-300" />
                            <span className="text-xs font-semibold text-slate-400">Step {i + 1}</span>
                            <Button
                                type="button" variant="ghost" size="sm"
                                onClick={() => removeStep(i)}
                                className="text-slate-400 hover:text-red-500 h-6 w-6 p-0 ml-auto"
                            >
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                        <Input
                            value={step.title || ""}
                            onChange={(e) => updateStep(i, "title", e.target.value)}
                            placeholder="Step title (optional)"
                            className="text-sm bg-white"
                        />
                        <Textarea
                            value={step.body || step.text || ""}
                            onChange={(e) => updateStep(i, "body", e.target.value)}
                            placeholder="Step description..."
                            rows={2}
                            className="text-sm bg-white"
                        />
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addStep} className="w-full gap-2 text-xs border-dashed">
                    <Plus className="w-3 h-3" /> Add Step
                </Button>
            </div>
        </div>
    )
}
