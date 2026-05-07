"use client"

import { CalculatorEmbedData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props { data: CalculatorEmbedData; onChange: (d: CalculatorEmbedData) => void }

export default function CalculatorEmbedEditor({ data, onChange }: Props) {
    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Calculate Your Coverage" />
            </div>
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Description</Label>
                <Input value={data.description || ""} onChange={(e) => onChange({ ...data, description: e.target.value })} placeholder="Optional description" />
            </div>
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Calculator Type</Label>
                <Select value={data.calculatorType || "cover"} onValueChange={(v) => onChange({ ...data, calculatorType: v as CalculatorEmbedData["calculatorType"] })}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="cover">Cover Calculator</SelectItem>
                        <SelectItem value="premium">Premium Calculator</SelectItem>
                        <SelectItem value="comparison">Comparison Tool</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-400 text-center">
                Calculator widget will render here on the public page
            </div>
        </div>
    )
}