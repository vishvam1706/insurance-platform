"use client"

import { policymineTakeData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RichTextEditor from "../RichTextEditor"
import ImageUploader from "../ImageUploader"

interface Props { data: policymineTakeData; onChange: (d: policymineTakeData) => void }

export default function policymineTakeEditor({ data, onChange }: Props) {
    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Policymine's Take on Term Insurance" />
            </div>
            <div>
                <Label className="text-xs text-slate-500 mb-1 block">Body</Label>
                <RichTextEditor value={data.body || ""} onChange={(html) => onChange({ ...data, body: html })} />
            </div>
            <ImageUploader label="Advisor Image (optional)" value={data.advisorImage || ""} onChange={(url) => onChange({ ...data, advisorImage: url })} />
        </div>
    )
}