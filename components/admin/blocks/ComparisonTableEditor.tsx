"use client"

import { ComparisonTableData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface Props { data: ComparisonTableData; onChange: (d: ComparisonTableData) => void }

export default function ComparisonTableEditor({ data, onChange }: Props) {
    const columns = data.columns || ["Feature", "Option A", "Option B"]
    const rows = data.rows || []

    function updateCol(i: number, val: string) {
        const next = columns.map((c, idx) => idx === i ? val : c)
        onChange({ ...data, columns: next })
    }

    function addRow() {
        onChange({ ...data, rows: [...rows, columns.map(() => "")] })
    }

    function updateCell(ri: number, ci: number, val: string) {
        const next = rows.map((row, idx) =>
            idx === ri ? row.map((cell, cidx) => cidx === ci ? val : cell) : row
        )
        onChange({ ...data, rows: next })
    }

    function removeRow(i: number) {
        onChange({ ...data, rows: rows.filter((_, idx) => idx !== i) })
    }

    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Table Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Comparison table title" />
            </div>

            <div className="space-y-2">
                <Label className="text-xs text-slate-500">Column Headers</Label>
                <div className="flex gap-2">
                    {columns.map((col, i) => (
                        <Input key={i} value={col} onChange={(e) => updateCol(i, e.target.value)} className="text-sm font-medium" placeholder={`Column ${i + 1}`} />
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-xs text-slate-500">Rows</Label>
                {rows.map((row, ri) => (
                    <div key={ri} className="flex gap-2 items-start">
                        {row.map((cell, ci) => (
                            <Input key={ci} value={cell} onChange={(e) => updateCell(ri, ci, e.target.value)} className="text-sm flex-1" placeholder={`Row ${ri + 1}, ${columns[ci]}`} />
                        ))}
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeRow(ri)} className="h-8 w-8 p-0 shrink-0 text-slate-400 hover:text-red-500">
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