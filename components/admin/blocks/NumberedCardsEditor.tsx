"use client"

import { NumberedCardsData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface Props { data: NumberedCardsData; onChange: (d: NumberedCardsData) => void }

export default function NumberedCardsEditor({ data, onChange }: Props) {
    const cards = data.cards || []

    function addCard() {
        onChange({ ...data, cards: [...cards, { number: cards.length + 1, title: "", body: "" }] })
    }

    function updateCard(i: number, key: string, val: string) {
        const next = cards.map((c, idx) => idx === i ? { ...c, [key]: val } : c)
        onChange({ ...data, cards: next })
    }

    function removeCard(i: number) {
        onChange({ ...data, cards: cards.filter((_, idx) => idx !== i).map((c, idx) => ({ ...c, number: idx + 1 })) })
    }

    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Title</Label>
                <Input value={data.title || ""} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="How to Compare Health Insurance?" />
            </div>
            <div className="space-y-1">
                <Label className="text-xs text-slate-500">Quick Take (optional)</Label>
                <Input value={data.quickTake || ""} onChange={(e) => onChange({ ...data, quickTake: e.target.value })} placeholder="Brief intro line above cards" />
            </div>

            <div className="space-y-3">
                <Label className="text-xs text-slate-500">Cards</Label>
                {cards.map((card, i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-600">#{card.number}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeCard(i)} className="h-6 w-6 p-0 text-slate-400 hover:text-red-500">
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                        <Input value={card.title} onChange={(e) => updateCard(i, "title", e.target.value)} placeholder="Card title" className="text-sm" />
                        <Textarea value={card.body} onChange={(e) => updateCard(i, "body", e.target.value)} placeholder="Card body..." rows={3} className="text-sm" />
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addCard} className="w-full gap-2 text-xs">
                    <Plus className="w-3 h-3" /> Add Card
                </Button>
            </div>
        </div>
    )
}