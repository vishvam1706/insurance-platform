"use client"

import { RichTextBlockData } from "@/types/blocks"
import RichTextEditor from "../RichTextEditor"
import ImageUploader from "../ImageUploader"
import { Label } from "@/components/ui/label"

interface Props { data: RichTextBlockData; onChange: (d: RichTextBlockData) => void }

export default function RichTextBlockEditor({ data, onChange }: Props) {
    return (
        <div className="space-y-3">
            <div>
                <Label className="text-xs text-slate-500 mb-1 block">Content</Label>
                <RichTextEditor
                    value={data.content || ""}
                    onChange={(html) => onChange({ ...data, content: html })}
                    placeholder="Start writing content..."
                    minHeight="150px"
                />
            </div>
            <ImageUploader
                label="Inline Image (optional)"
                value={data.inlineImage || ""}
                onChange={(url) => onChange({ ...data, inlineImage: url })}
            />
        </div>
    )
}