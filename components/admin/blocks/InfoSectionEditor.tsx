"use client"

import { InfoSectionData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RichTextEditor from "../RichTextEditor"
import ImageUploader from "../ImageUploader"

interface Props { data: InfoSectionData; onChange: (d: InfoSectionData) => void }

export default function InfoSectionEditor({ data, onChange }: Props) {
    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Section title" />
            </div>
            <div>
                <Label className="text-xs text-slate-500 mb-1 block">Body</Label>
                <RichTextEditor value={data.body || ""} onChange={(html) => onChange({ ...data, body: html })} />
            </div>
            <ImageUploader label="Image (optional)" value={data.image || ""} onChange={(url) => onChange({ ...data, image: url })} />
        </div>
    )
}