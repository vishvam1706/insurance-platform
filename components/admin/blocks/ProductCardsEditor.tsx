"use client"

import { ProductCardsBlockData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface Props { data: ProductCardsBlockData; onChange: (d: ProductCardsBlockData) => void }

const COLOR_OPTIONS = [
    { value: "bg-emerald-600", label: "Blue" },
    { value: "bg-teal-600", label: "Teal" },
    { value: "bg-indigo-600", label: "Indigo" },
    { value: "bg-green-600", label: "Green" },
    { value: "bg-violet-600", label: "Violet" },
    { value: "bg-orange-600", label: "Orange" },
    { value: "bg-rose-600", label: "Rose" },
]

export default function ProductCardsEditor({ data, onChange }: Props) {
    const cards = data.cards || []

    function addCard() {
        onChange({
            ...data,
            cards: [...cards, { title: "", desc: "", href: "/", colorClass: "bg-emerald-600" }],
        })
    }

    function updateCard(
        i: number,
        key: keyof ProductCardsBlockData["cards"][0],
        val: string
    ) {
        onChange({
            ...data,
            cards: cards.map((c, idx) => idx === i ? { ...c, [key]: val } : c),
        })
    }

    function removeCard(i: number) {
        onChange({ ...data, cards: cards.filter((_, idx) => idx !== i) })
    }

    return (
        <div className="space-y-4">
            {/* Section title */}
            <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Section Title</Label>
                <Input
                    value={data.title}
                    onChange={(e) => onChange({ ...data, title: e.target.value })}
                    placeholder="What we cover"
                />
            </div>

            {/* Cards */}
            <div className="space-y-3">
                <Label className="text-xs text-slate-500">Cards</Label>
                {cards.map((card, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-3 space-y-2 border border-slate-200">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-600">Card {i + 1}</span>
                            <Button
                                type="button" variant="ghost" size="sm"
                                onClick={() => removeCard(i)}
                                className="h-7 w-7 p-0 text-slate-400 hover:text-red-500"
                            >
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                        <Input
                            value={card.title}
                            onChange={(e) => updateCard(i, "title", e.target.value)}
                            placeholder="Term Life Insurance"
                            className="text-sm"
                        />
                        <Textarea
                            value={card.desc}
                            onChange={(e) => updateCard(i, "desc", e.target.value)}
                            placeholder="Pure protection for your family. High cover at low premiums."
                            rows={2}
                            className="text-sm"
                        />
                        <Input
                            value={card.href}
                            onChange={(e) => updateCard(i, "href", e.target.value)}
                            placeholder="/term-life"
                            className="text-sm font-mono"
                        />
                        <div className="space-y-1">
                            <Label className="text-xs text-slate-400">Icon color</Label>
                            <Select
                                value={card.colorClass}
                                onValueChange={(v) => updateCard(i, "colorClass", v)}
                            >
                                <SelectTrigger className="h-8 text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {COLOR_OPTIONS.map((c) => (
                                        <SelectItem key={c.value} value={c.value}>
                                            <span className="flex items-center gap-2">
                                                <span className={`w-3 h-3 rounded-full ${c.value}`} />
                                                {c.label}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                ))}
                <Button
                    type="button" variant="outline" size="sm"
                    onClick={addCard} className="w-full gap-2 text-xs"
                >
                    <Plus className="w-3 h-3" /> Add Card
                </Button>
            </div>
        </div>
    )
}
