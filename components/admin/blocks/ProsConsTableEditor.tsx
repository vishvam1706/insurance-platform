"use client"

import { ProsConsTableData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface Props { data: ProsConsTableData; onChange: (d: ProsConsTableData) => void }

export default function ProsConsTableEditor({ data, onChange }: Props) {
    const pros = data.pros || []
    const cons = data.cons || []

    const updateList = (list: string[], i: number, val: string) =>
        list.map((item, idx) => idx === i ? val : item)

    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Advantages and Disadvantages" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Pros */}
                <div className="space-y-2">
                    <Label className="text-xs text-green-600 font-semibold">✅ Pros</Label>
                    {pros.map((p, i) => (
                        <div key={i} className="flex gap-1">
                            <Input value={p} onChange={(e) => onChange({ ...data, pros: updateList(pros, i, e.target.value) })} className="text-sm" placeholder="Advantage..." />
                            <Button type="button" variant="ghost" size="sm" onClick={() => onChange({ ...data, pros: pros.filter((_, idx) => idx !== i) })} className="h-8 w-8 p-0 text-slate-400 hover:text-red-500">
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => onChange({ ...data, pros: [...pros, ""] })} className="w-full gap-1 text-xs">
                        <Plus className="w-3 h-3" /> Add Pro
                    </Button>
                </div>

                {/* Cons */}
                <div className="space-y-2">
                    <Label className="text-xs text-red-600 font-semibold">❌ Cons</Label>
                    {cons.map((c, i) => (
                        <div key={i} className="flex gap-1">
                            <Input value={c} onChange={(e) => onChange({ ...data, cons: updateList(cons, i, e.target.value) })} className="text-sm" placeholder="Disadvantage..." />
                            <Button type="button" variant="ghost" size="sm" onClick={() => onChange({ ...data, cons: cons.filter((_, idx) => idx !== i) })} className="h-8 w-8 p-0 text-slate-400 hover:text-red-500">
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => onChange({ ...data, cons: [...cons, ""] })} className="w-full gap-1 text-xs">
                        <Plus className="w-3 h-3" /> Add Con
                    </Button>
                </div>
            </div>
        </div>
    )
}