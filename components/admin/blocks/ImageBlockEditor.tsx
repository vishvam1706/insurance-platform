"use client"

import { ImageBlockData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ImageUploader from "../ImageUploader"

interface Props { data: ImageBlockData; onChange: (d: ImageBlockData) => void }

export default function ImageBlockEditor({ data, onChange }: Props) {
    return (
        <div className="space-y-3">
            <ImageUploader
                label="Image"
                value={data.image || ""}
                onChange={(url) => onChange({ ...data, image: url })}
            />
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Caption</Label>
                <Input value={data.caption || ""} onChange={(e) => onChange({ ...data, caption: e.target.value })} placeholder="Optional caption" />
            </div>
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Alt Text</Label>
                <Input value={data.altText || ""} onChange={(e) => onChange({ ...data, altText: e.target.value })} placeholder="Describe the image for accessibility" />
            </div>
        </div>
    )
}