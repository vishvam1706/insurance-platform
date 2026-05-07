"use client"

import { FrequentlyComparedData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface Props { data: FrequentlyComparedData; onChange: (d: FrequentlyComparedData) => void }

export default function FrequentlyComparedEditor({ data, onChange }: Props) {
    const links = data.links || []

    function addLink() {
        onChange({ ...data, links: [...links, { label: "", url: "" }] })
    }

    function updateLink(i: number, key: "label" | "url", val: string) {
        const next = links.map((l, idx) => idx === i ? { ...l, [key]: val } : l)
        onChange({ ...data, links: next })
    }

    function removeLink(i: number) {
        onChange({ ...data, links: links.filter((_, idx) => idx !== i) })
    }

    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="Frequently Compared Policies" />
            </div>

            <div className="space-y-2">
                <Label className="text-xs text-slate-500">Links</Label>
                {links.map((link, i) => (
                    <div key={i} className="flex gap-2 items-center">
                        <Input value={link.label} onChange={(e) => updateLink(i, "label", e.target.value)} placeholder="HDFC Ergo vs Niva Bupa ReAssure" className="text-sm flex-1" />
                        <Input value={link.url} onChange={(e) => updateLink(i, "url", e.target.value)} placeholder="/health/compare/..." className="text-sm w-52 font-mono" />
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeLink(i)} className="h-8 w-8 p-0 text-slate-400 hover:text-red-500 shrink-0">
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addLink} className="w-full gap-2 text-xs">
                    <Plus className="w-3 h-3" /> Add Link
                </Button>
            </div>
        </div>
    )
}