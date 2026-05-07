"use client"

import { InsurerMetricsData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface Props { data: InsurerMetricsData; onChange: (d: InsurerMetricsData) => void }

export default function InsurerMetricsEditor({ data, onChange }: Props) {
    const metrics = data.metrics || []

    function addMetric() {
        onChange({ ...data, metrics: [...metrics, { number: metrics.length + 1, title: "", body: "" }] })
    }

    function updateMetric(i: number, key: string, val: unknown) {
        const next = metrics.map((m, idx) => idx === i ? { ...m, [key]: val } : m)
        onChange({ ...data, metrics: next })
    }

    function removeMetric(i: number) {
        onChange({ ...data, metrics: metrics.filter((_, idx) => idx !== i) })
    }

    function addCsrRow(mi: number) {
        const metric = metrics[mi]
        const csrTable = [...(metric.csrTable || []), { company: "", csr: "" }]
        updateMetric(mi, "csrTable", csrTable)
    }

    function updateCsrRow(mi: number, ri: number, key: string, val: string) {
        const metric = metrics[mi]
        const csrTable = (metric.csrTable || []).map((row, idx) =>
            idx === ri ? { ...row, [key]: val } : row
        )
        updateMetric(mi, "csrTable", csrTable)
    }

    function removeCsrRow(mi: number, ri: number) {
        const metric = metrics[mi]
        const csrTable = (metric.csrTable || []).filter((_, idx) => idx !== ri)
        updateMetric(mi, "csrTable", csrTable)
    }

    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Section Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Comparing Insurers" />
            </div>

            <div className="space-y-4">
                {metrics.map((metric, mi) => (
                    <div key={mi} className="border border-slate-200 rounded-lg p-3 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-blue-600">Metric #{metric.number}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeMetric(mi)} className="h-6 w-6 p-0 text-slate-400 hover:text-red-500">
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                        <Input value={metric.title} onChange={(e) => updateMetric(mi, "title", e.target.value)} placeholder="Metric title (e.g. Track Record)" className="text-sm" />
                        <Textarea value={metric.body} onChange={(e) => updateMetric(mi, "body", e.target.value)} placeholder="Metric description..." rows={3} className="text-sm" />

                        {/* CSR Table */}
                        <div className="space-y-2">
                            <Label className="text-xs text-slate-400">CSR Data Table (optional)</Label>
                            {(metric.csrTable || []).map((row, ri) => (
                                <div key={ri} className="flex gap-2">
                                    <Input value={row.company} onChange={(e) => updateCsrRow(mi, ri, "company", e.target.value)} placeholder="Company" className="text-xs flex-1" />
                                    <Input value={row.csr} onChange={(e) => updateCsrRow(mi, ri, "csr", e.target.value)} placeholder="98.6%" className="text-xs w-24" />
                                    <Button type="button" variant="ghost" size="sm" onClick={() => removeCsrRow(mi, ri)} className="h-8 w-8 p-0 text-slate-400 hover:text-red-500">
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => addCsrRow(mi)} className="w-full gap-1 text-xs">
                                <Plus className="w-3 h-3" /> Add Insurer Row
                            </Button>
                        </div>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addMetric} className="w-full gap-2 text-xs">
                    <Plus className="w-3 h-3" /> Add Metric
                </Button>
            </div>
        </div>
    )
}