"use client"

import { HeroBlockData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ImageUploader from "../ImageUploader"

interface Props { data: HeroBlockData; onChange: (d: HeroBlockData) => void }

export default function HeroBlockEditor({ data, onChange }: Props) {
    const set = (key: keyof HeroBlockData, val: unknown) =>
        onChange({ ...data, [key]: val })

    const setAuthor = (key: string, val: string) =>
        onChange({ ...data, author: { ...data.author, name: data.author?.name || "", role: data.author?.role || "", [key]: val } })

    const setReviewer = (key: string, val: string) =>
        onChange({ ...data, reviewer: { ...data.reviewer, name: data.reviewer?.name || "", role: data.reviewer?.role || "", [key]: val } })

    return (
        <div className="space-y-3">
            <Field label="Title">
                <Input value={data.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="Page title" />
            </Field>
            <Field label="Subtitle">
                <Input value={data.subtitle || ""} onChange={(e) => set("subtitle", e.target.value)} placeholder="Optional subtitle" />
            </Field>
            <Field label="Published Date">
                <Input value={data.publishedDate || ""} onChange={(e) => set("publishedDate", e.target.value)} placeholder="20 Feb, 2026" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Author Name">
                    <Input value={data.author?.name || ""} onChange={(e) => setAuthor("name", e.target.value)} />
                </Field>
                <Field label="Author Role">
                    <Input value={data.author?.role || ""} onChange={(e) => setAuthor("role", e.target.value)} />
                </Field>
                <Field label="Reviewer Name">
                    <Input value={data.reviewer?.name || ""} onChange={(e) => setReviewer("name", e.target.value)} />
                </Field>
                <Field label="Reviewer Role">
                    <Input value={data.reviewer?.role || ""} onChange={(e) => setReviewer("role", e.target.value)} />
                </Field>
            </div>
            <Field label="Certification ID">
                <Input value={data.certificationId || ""} onChange={(e) => set("certificationId", e.target.value)} placeholder="SP0738578124" />
            </Field>
            <ImageUploader label="Background Image" value={data.backgroundImage || ""} onChange={(url) => set("backgroundImage", url)} />
        </div>
    )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-1">
            <Label className="text-xs text-slate-500">{label}</Label>
            {children}
        </div>
    )
}