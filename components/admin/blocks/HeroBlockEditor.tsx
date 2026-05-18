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
        onChange({ ...data, author: { name: data.author?.name || "", role: data.author?.role || "", photo: data.author?.photo || "", [key]: val } })

    const setReviewer = (key: string, val: string) =>
        onChange({ ...data, reviewer: { name: data.reviewer?.name || "", role: data.reviewer?.role || "", photo: data.reviewer?.photo || "", [key]: val } })

    return (
        <div className="space-y-4">
            <Field label="Title">
                <Input value={data.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="Page title" />
            </Field>
            <Field label="Subtitle">
                <Input value={data.subtitle || ""} onChange={(e) => set("subtitle", e.target.value)} placeholder="Optional subtitle" />
            </Field>
            <Field label="Published Date">
                <Input value={data.publishedDate || ""} onChange={(e) => set("publishedDate", e.target.value)} placeholder="20 Feb, 2026" />
            </Field>

            {/* Author */}
            <div className="rounded-xl border border-slate-200 p-3 space-y-3 bg-slate-50">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Author</p>
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Name">
                        <Input value={data.author?.name || ""} onChange={(e) => setAuthor("name", e.target.value)} placeholder="Subhashish Banerjee" />
                    </Field>
                    <Field label="Role">
                        <Input value={data.author?.role || ""} onChange={(e) => setAuthor("role", e.target.value)} placeholder="Insurance Writer" />
                    </Field>
                </div>
                <ImageUploader
                    label="Author Photo"
                    value={data.author?.photo || ""}
                    onChange={(url) => setAuthor("photo", url)}
                    compact
                />
            </div>

            {/* Reviewer */}
            <div className="rounded-xl border border-emerald-100 p-3 space-y-3 bg-emerald-50">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Reviewer</p>
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Name">
                        <Input value={data.reviewer?.name || ""} onChange={(e) => setReviewer("name", e.target.value)} placeholder="Gaurav Bhat" />
                    </Field>
                    <Field label="Role">
                        <Input value={data.reviewer?.role || ""} onChange={(e) => setReviewer("role", e.target.value)} placeholder="IRDAI-Certified Expert" />
                    </Field>
                </div>
                <ImageUploader
                    label="Reviewer Photo"
                    value={data.reviewer?.photo || ""}
                    onChange={(url) => setReviewer("photo", url)}
                    compact
                />
            </div>

            <Field label="Certification ID">
                <Input value={data.certificationId || ""} onChange={(e) => set("certificationId", e.target.value)} placeholder="SP0738578124" />
            </Field>

            {/* Images */}
            <div className="rounded-xl border border-slate-200 p-3 space-y-3 bg-slate-50">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Images</p>
                <ImageUploader
                    label="Top Feature Image (optional)"
                    value={data.backgroundImage || ""}
                    onChange={(url) => set("backgroundImage", url)}
                />
                <ImageUploader
                    label="Bottom Image"
                    value={data.bottomImage || ""}
                    onChange={(url) => set("bottomImage", url)}
                />
                <Field label="Bottom Image Caption">
                    <Input
                        value={data.bottomCaption || ""}
                        onChange={(e) => set("bottomCaption", e.target.value)}
                        placeholder="e.g. Term Insurance vs Life Insurance — A Complete Guide"
                    />
                </Field>
            </div>
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