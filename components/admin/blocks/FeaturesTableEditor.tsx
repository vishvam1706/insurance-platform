"use client"

import { FeaturesTableData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface Props { data: FeaturesTableData; onChange: (d: FeaturesTableData) => void }

export default function FeaturesTableEditor({ data, onChange }: Props) {
    const rows = data.rows || []

    function addRow() {
        onChange({ ...data, rows: [...rows, { aspect: "", feature: "" }] })
    }

    function updateRow(i: number, key: "aspect" | "feature", val: string) {
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
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Key Features of Term Insurance" />
            </div>
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Note (optional)</Label>
                <Input value={data.note || ""} onChange={(e) => onChange({ ...data, note: e.target.value })} placeholder="Footer note below table" />
            </div>

            <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-500 px-1">
                    <span>Aspect</span>
                    <span>Feature</span>
                </div>
                {rows.map((row, i) => (
                    <div key={i} className="flex gap-2 items-center">
                        <Input value={row.aspect} onChange={(e) => updateRow(i, "aspect", e.target.value)} placeholder="e.g. Entry Age" className="text-sm flex-1" />
                        <Input value={row.feature} onChange={(e) => updateRow(i, "feature", e.target.value)} placeholder="e.g. 18-65 years" className="text-sm flex-1" />
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeRow(i)} className="h-8 w-8 p-0 shrink-0 text-slate-400 hover:text-red-500">
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addRow} className="w-full gap-2 text-xs">
                    <Plus className="w-3 h-3" /> Add Row
                </Button>
            </div>
        </div>
    )
}