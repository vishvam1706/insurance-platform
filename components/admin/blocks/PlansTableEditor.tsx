"use client"

import { PlansTableData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface Props { data: PlansTableData; onChange: (d: PlansTableData) => void }

export default function PlansTableEditor({ data, onChange }: Props) {
    const rows = data.rows || []

    function addRow() {
        onChange({ ...data, rows: [...rows, { plan: "", riders: "", csr: "", rating: "", dittoRating: 0 }] })
    }

    function updateRow(i: number, key: string, val: string | number) {
        const next = rows.map((r, idx) => idx === i ? { ...r, [key]: val } : r)
        onChange({ ...data, rows: next })
    }

    function removeRow(i: number) {
        onChange({ ...data, rows: rows.filter((_, idx) => idx !== i) })
    }

    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Table Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Ditto's Recommended Term Plans (2026)" />
            </div>

            <div className="space-y-3">
                <Label className="text-xs text-slate-500">Plans</Label>
                {rows.map((row, i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between">
                            <span className="text-xs font-medium text-slate-500">Plan {i + 1}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeRow(i)} className="h-6 w-6 p-0 text-slate-400 hover:text-red-500">
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                        <Input value={row.plan} onChange={(e) => updateRow(i, "plan", e.target.value)} placeholder="Plan name" className="text-sm" />
                        <Textarea value={row.riders} onChange={(e) => updateRow(i, "riders", e.target.value)} placeholder="Coverage & riders description" rows={2} className="text-sm" />
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <Label className="text-xs text-slate-400">CSR</Label>
                                <Input value={row.csr} onChange={(e) => updateRow(i, "csr", e.target.value)} placeholder="99.62%" className="text-sm" />
                            </div>
                            <div>
                                <Label className="text-xs text-slate-400">Rating</Label>
                                <Input value={row.rating} onChange={(e) => updateRow(i, "rating", e.target.value)} placeholder="4.65/5" className="text-sm" />
                            </div>
                            <div>
                                <Label className="text-xs text-slate-400">Ditto Score</Label>
                                <Input type="number" min={0} max={5} step={0.01} value={row.dittoRating || ""} onChange={(e) => updateRow(i, "dittoRating", parseFloat(e.target.value))} placeholder="4.65" className="text-sm" />
                            </div>
                        </div>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addRow} className="w-full gap-2 text-xs">
                    <Plus className="w-3 h-3" /> Add Plan
                </Button>
            </div>
        </div>
    )
}