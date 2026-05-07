"use client"

import { NoteBoxData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Props { data: NoteBoxData; onChange: (d: NoteBoxData) => void }

export default function NoteBoxEditor({ data, onChange }: Props) {
    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Label</Label>
                <Input value={data.label || ""} onChange={(e) => onChange({ ...data, label: e.target.value })} placeholder="e.g. Take Note / Quick Take" />
            </div>
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Content</Label>
                <Textarea value={data.content || ""} onChange={(e) => onChange({ ...data, content: e.target.value })} placeholder="Note content..." rows={4} />
            </div>
        </div>
    )
}