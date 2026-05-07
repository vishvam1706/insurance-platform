"use client"

import { RealExampleComparisonData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import ImageUploader from "../ImageUploader"
import { Plus, Trash2 } from "lucide-react"

interface Props { data: RealExampleComparisonData; onChange: (d: RealExampleComparisonData) => void }

export default function RealExampleEditor({ data, onChange }: Props) {
    const rows = data.rows || []

    function updatePlan(plan: "plan1" | "plan2", key: string, val: unknown) {
        onChange({ ...data, [plan]: { ...(data[plan] || {}), [key]: val } })
    }

    function addRow() {
        onChange({ ...data, rows: [...rows, { parameter: "", plan1Value: "", plan2Value: "", plan1Good: true, plan2Good: true }] })
    }

    function updateRow(i: number, key: string, val: unknown) {
        const next = rows.map((r, idx) => idx === i ? { ...r, [key]: val } : r)
        onChange({ ...data, rows: next })
    }

    function removeRow(i: number) {
        onChange({ ...data, rows: rows.filter((_, idx) => idx !== i) })
    }

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="A Real World Example" />
            </div>

            <div className="grid grid-cols-2 gap-3">
                {(["plan1", "plan2"] as const).map((plan) => (
                    <div key={plan} className="border border-slate-200 rounded-lg p-3 space-y-2">
                        <Label className="text-xs font-semibold text-slate-600">{plan === "plan1" ? "Plan 1" : "Plan 2"}</Label>
                        <Input value={data[plan]?.insurer || ""} onChange={(e) => updatePlan(plan, "insurer", e.target.value)} placeholder="Insurer name" className="text-sm" />
                        <Input value={data[plan]?.planName || ""} onChange={(e) => updatePlan(plan, "planName", e.target.value)} placeholder="Plan name" className="text-sm" />
                        <ImageUploader label="Logo" value={data[plan]?.logo || ""} onChange={(url) => updatePlan(plan, "logo", url)} compact />
                        <div className="flex items-center gap-2">
                            <Switch checked={data[plan]?.recommended || false} onCheckedChange={(v) => updatePlan(plan, "recommended", v)} />
                            <Label className="text-xs text-slate-500">Recommended</Label>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <div className="grid grid-cols-5 gap-1 text-xs font-medium text-slate-500 px-1">
                    <span className="col-span-1">Parameter</span>
                    <span className="col-span-1">Plan 1 Value</span>
                    <span className="col-span-1">Plan 1 Good?</span>
                    <span className="col-span-1">Plan 2 Value</span>
                    <span className="col-span-1">Plan 2 Good?</span>
                </div>
                {rows.map((row, i) => (
                    <div key={i} className="grid grid-cols-5 gap-1 items-center">
                        <Input value={row.parameter} onChange={(e) => updateRow(i, "parameter", e.target.value)} placeholder="Parameter" className="text-xs col-span-1" />
                        <Input value={row.plan1Value} onChange={(e) => updateRow(i, "plan1Value", e.target.value)} placeholder="Value" className="text-xs col-span-1" />
                        <div className="flex justify-center">
                            <Switch checked={row.plan1Good} onCheckedChange={(v) => updateRow(i, "plan1Good", v)} />
                        </div>
                        <Input value={row.plan2Value} onChange={(e) => updateRow(i, "plan2Value", e.target.value)} placeholder="Value" className="text-xs col-span-1" />
                        <div className="flex items-center gap-1">
                            <Switch checked={row.plan2Good} onCheckedChange={(v) => updateRow(i, "plan2Good", v)} />
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeRow(i)} className="h-6 w-6 p-0 text-slate-400 hover:text-red-500">
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addRow} className="w-full gap-2 text-xs">
                    <Plus className="w-3 h-3" /> Add Row
                </Button>
            </div>
        </div>
    )
}