"use client"

import { ComparisonSectionBlockData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import ImageUploader from "../ImageUploader"
import { Plus, Trash2, ChevronUp, ChevronDown, Check, ArrowRight } from "lucide-react"

interface Props {
    data: ComparisonSectionBlockData
    onChange: (d: ComparisonSectionBlockData) => void
}

const AVAILABLE_ICONS = [
    { label: "None / Fallback Checkmark", value: "" },
    { label: "Document Icon (FileText)", value: "FileText" },
    { label: "Warning Alert (ShieldAlert)", value: "ShieldAlert" },
    { label: "Pulsing Lightning (Zap)", value: "Zap" },
    { label: "Users Group (Users)", value: "Users" },
    { label: "Success Check (CheckCircle2)", value: "CheckCircle2" },
    { label: "Warning Flag (AlertTriangle)", value: "AlertTriangle" },
    { label: "Checklist File (FileCheck)", value: "FileCheck" },
    { label: "Arrow Right (ArrowRight)", value: "ArrowRight" },
]

export default function ComparisonSectionEditor({ data = {}, onChange }: Props) {
    function set(key: keyof ComparisonSectionBlockData, val: any) {
        onChange({ ...data, [key]: val })
    }

    const rows = data.rows || []

    function updateRow(idx: number, fields: Record<string, any>) {
        const next = [...rows]
        next[idx] = { ...next[idx], ...fields }
        set("rows", next)
    }

    function addRow() {
        const next = [...rows, {
            category: "New Category",
            subtitle: "Category subtitle description...",
            policyminePoints: [{ text: "Premium point text...", showAvatars: false, icon: "" }],
            otherPoints: [{ text: "Negative other point text..." }]
        }]
        set("rows", next)
    }

    function removeRow(idx: number) {
        if (!window.confirm("Remove this comparison row?")) return
        set("rows", rows.filter((_, i) => i !== idx))
    }

    function moveRow(idx: number, dir: -1 | 1) {
        const next = [...rows]
        const targetIdx = idx + dir
        if (targetIdx < 0 || targetIdx >= rows.length) return
        const temp = next[idx]
        next[idx] = next[targetIdx]
        next[targetIdx] = temp
        set("rows", next)
    }

    // Policymine Points
    function addpolicyminePoint(rIdx: number) {
        const nextPoints = [...(rows[rIdx].policyminePoints || []), { text: "New benefit...", showAvatars: false, icon: "" }]
        updateRow(rIdx, { policyminePoints: nextPoints })
    }

    function updatepolicyminePoint(rIdx: number, pIdx: number, fields: Record<string, any>) {
        const nextPoints = [...(rows[rIdx].policyminePoints || [])]
        nextPoints[pIdx] = { ...nextPoints[pIdx], ...fields }
        updateRow(rIdx, { policyminePoints: nextPoints })
    }

    function removepolicyminePoint(rIdx: number, pIdx: number) {
        const nextPoints = (rows[rIdx].policyminePoints || []).filter((_, i) => i !== pIdx)
        updateRow(rIdx, { policyminePoints: nextPoints })
    }

    // Other Points
    function addOtherPoint(rIdx: number) {
        const nextPoints = [...(rows[rIdx].otherPoints || []), { text: "New negative aspect..." }]
        updateRow(rIdx, { otherPoints: nextPoints })
    }

    function updateOtherPoint(rIdx: number, pIdx: number, text: string) {
        const nextPoints = [...(rows[rIdx].otherPoints || [])]
        nextPoints[pIdx] = { ...nextPoints[pIdx], text }
        updateRow(rIdx, { otherPoints: nextPoints })
    }

    function removeOtherPoint(rIdx: number, pIdx: number) {
        const nextPoints = (rows[rIdx].otherPoints || []).filter((_, i) => i !== pIdx)
        updateRow(rIdx, { otherPoints: nextPoints })
    }

    return (
        <div className="space-y-6 text-left">
            {/* Headers Area */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Header Configuration</h3>
                
                <div className="space-y-2">
                    <Label className="text-xs text-slate-500">Section Headline Title</Label>
                    <Input 
                        value={data.title || ""} 
                        onChange={(e) => set("title", e.target.value)} 
                        placeholder="Insurance Buying Experience. (default)" 
                        className="text-sm font-medium"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-xs text-slate-500">Section Subtitle description</Label>
                    <Textarea 
                        value={data.subtitle || ""} 
                        onChange={(e) => set("subtitle", e.target.value)} 
                        placeholder="What customers experience throughout their insurance journey with Policymine versus other platforms. (default)" 
                        className="text-sm min-h-[60px]"
                    />
                </div>
            </div>

            <hr className="border-slate-200" />

            {/* Profile Avatars Uploaders */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Comparison Column Avatars (Header Circles)</h3>
                
                <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-4 border border-slate-200 rounded-xl">
                    {/* Policymine Avatars */}
                    <div className="space-y-3">
                        <h4 className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Policymine Column Avatars</h4>
                        <ImageUploader
                            label="Policymine Advisor Avatar 1"
                            value={data.policymineAvatar1 || ""}
                            onChange={(url) => set("policymineAvatar1", url)}
                        />
                        <ImageUploader
                            label="Policymine Advisor Avatar 2"
                            value={data.policymineAvatar2 || ""}
                            onChange={(url) => set("policymineAvatar2", url)}
                        />
                    </div>

                    {/* Other Platforms Avatars */}
                    <div className="space-y-3">
                        <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Other Platforms Avatars</h4>
                        <ImageUploader
                            label="Other Platform Agent Avatar 1"
                            value={data.otherAvatar1 || ""}
                            onChange={(url) => set("otherAvatar1", url)}
                        />
                        <ImageUploader
                            label="Other Agent Avatar 2 (Optional - defaults to '?')"
                            value={data.otherAvatar2 || ""}
                            onChange={(url) => set("otherAvatar2", url)}
                        />
                    </div>
                </div>
            </div>

            <hr className="border-slate-200" />

            {/* Comparison Rows Manager */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Comparison Matrix Rows</h3>
                    <Button 
                        type="button" 
                        variant="outline" 
                        size="xs" 
                        onClick={addRow} 
                        className="text-xs flex items-center gap-1 border-emerald-200 hover:bg-emerald-50 text-emerald-700"
                    >
                        <Plus className="w-3 h-3" /> Add Row
                    </Button>
                </div>

                {rows.length === 0 && (
                    <p className="text-xs text-slate-500 italic p-4 border border-dashed border-slate-200 rounded-xl text-center">
                        No rows added yet. Frontend will render default demo rows.
                    </p>
                )}

                <div className="space-y-6">
                    {rows.map((row, rIdx) => (
                        <div key={rIdx} className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-4">
                            {/* Row Header controls */}
                            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                                <span className="text-xs font-black text-slate-500 uppercase">
                                    Row #{rIdx + 1}
                                </span>
                                
                                <div className="flex items-center gap-1">
                                    <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="icon" 
                                        disabled={rIdx === 0} 
                                        onClick={() => moveRow(rIdx, -1)}
                                        className="h-7 w-7 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                    >
                                        <ChevronUp className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="icon" 
                                        disabled={rIdx === rows.length - 1} 
                                        onClick={() => moveRow(rIdx, 1)}
                                        className="h-7 w-7 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                    >
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => removeRow(rIdx)}
                                        className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Category Texts */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] text-slate-500">Category Header Name</Label>
                                    <Input 
                                        value={row.category || ""} 
                                        onChange={(e) => updateRow(rIdx, { category: e.target.value })} 
                                        placeholder="e.g. Application & Payment"
                                        className="text-xs h-8"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] text-slate-500">Category Subtitle / Description</Label>
                                    <Input 
                                        value={row.subtitle || ""} 
                                        onChange={(e) => updateRow(rIdx, { subtitle: e.target.value })} 
                                        placeholder="e.g. Ensuring details are 100% accurate..."
                                        className="text-xs h-8"
                                    />
                                </div>
                            </div>

                            {/* Policymine Points & Other Points side by side */}
                            <div className="grid md:grid-cols-2 gap-6 pt-2">
                                {/* Policymine Points (Green Benefits Column) */}
                                <div className="space-y-3 border-r border-slate-200 pr-2">
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Policymine Advantages</h5>
                                        <Button 
                                            type="button" 
                                            variant="ghost" 
                                            size="xs" 
                                            onClick={() => addpolicyminePoint(rIdx)} 
                                            className="text-[10px] h-6 flex items-center gap-0.5 text-emerald-700 hover:bg-emerald-50"
                                        >
                                            <Plus className="w-2.5 h-2.5" /> Add point
                                        </Button>
                                    </div>

                                    <div className="space-y-3">
                                        {(row.policyminePoints || []).map((point, pIdx) => (
                                            <div key={pIdx} className="p-3 border border-slate-200 rounded-lg bg-white space-y-2.5">
                                                <div className="flex items-start gap-2 justify-between">
                                                    <Input 
                                                        value={point.text || ""} 
                                                        onChange={(e) => updatepolicyminePoint(rIdx, pIdx, { text: e.target.value })} 
                                                        placeholder="e.g. Expert guidance..."
                                                        className="text-xs h-7 flex-1 min-w-0"
                                                    />
                                                    <Button 
                                                        type="button" 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        onClick={() => removepolicyminePoint(rIdx, pIdx)}
                                                        className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3 items-center">
                                                    {/* Toggle showAvatars */}
                                                    <label className="flex items-center gap-1.5 text-[9px] text-slate-500 cursor-pointer">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={point.showAvatars || false} 
                                                            onChange={(e) => updatepolicyminePoint(rIdx, pIdx, { showAvatars: e.target.checked })} 
                                                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3 h-3"
                                                        />
                                                        <span>Show overlapping avatars</span>
                                                    </label>

                                                    {/* Icon Selection */}
                                                    <div className="flex flex-col gap-0.5">
                                                        <select
                                                            value={point.icon || ""}
                                                            onChange={(e) => updatepolicyminePoint(rIdx, pIdx, { icon: e.target.value })}
                                                            className="text-[9px] h-6 px-1 rounded border border-slate-200 bg-white text-slate-800 outline-none"
                                                        >
                                                            {AVAILABLE_ICONS.map((i) => (
                                                                <option key={i.value} value={i.value}>{i.label}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Point Image */}
                                                <div className="pt-1.5 border-t border-slate-200">
                                                    <ImageUploader
                                                        label="Custom Point Image / Graphic (optional)"
                                                        value={point.image || ""}
                                                        onChange={(url) => updatepolicyminePoint(rIdx, pIdx, { image: url })}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Other Points (Grey Negative Column) */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Other Platforms Painpoints</h5>
                                        <Button 
                                            type="button" 
                                            variant="ghost" 
                                            size="xs" 
                                            onClick={() => addOtherPoint(rIdx)} 
                                            className="text-[10px] h-6 flex items-center gap-0.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                                        >
                                            <Plus className="w-2.5 h-2.5" /> Add point
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        {(row.otherPoints || []).map((point, pIdx) => (
                                            <div key={pIdx} className="flex items-center gap-2">
                                                <Input 
                                                    value={point.text || ""} 
                                                    onChange={(e) => updateOtherPoint(rIdx, pIdx, e.target.value)} 
                                                    placeholder="e.g. No post-sale claims help..."
                                                    className="text-xs h-7 flex-1 min-w-0"
                                                />
                                                <Button 
                                                    type="button" 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => removeOtherPoint(rIdx, pIdx)}
                                                    className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
