"use client"

import { CtaBlockData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ImageUploader from "../ImageUploader"

interface Props { data: CtaBlockData; onChange: (d: CtaBlockData) => void }

export default function CtaBlockEditor({ data, onChange }: Props) {
    const set = (key: keyof CtaBlockData, val: string) => onChange({ ...data, [key]: val })
    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Title</Label>
                <Input value={data.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="Talk to an expert today..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-xs text-slate-500">Book Call Button Text</Label>
                    <Input value={data.bookCallText || ""} onChange={(e) => set("bookCallText", e.target.value)} placeholder="Book a Free Call" />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs text-slate-500">WhatsApp Button Text</Label>
                    <Input value={data.whatsappText || ""} onChange={(e) => set("whatsappText", e.target.value)} placeholder="Chat on WhatsApp" />
                </div>
            </div>
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">WhatsApp Number</Label>
                <Input value={data.whatsappNumber || ""} onChange={(e) => set("whatsappNumber", e.target.value)} placeholder="+919876543210" />
            </div>
            <ImageUploader label="Advisor Image (optional)" value={data.advisorImage || ""} onChange={(url) => set("advisorImage", url)} />
        </div>
    )
}