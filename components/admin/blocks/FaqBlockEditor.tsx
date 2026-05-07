"use client"

import { FaqBlockData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface Props { data: FaqBlockData; onChange: (d: FaqBlockData) => void }

export default function FaqBlockEditor({ data, onChange }: Props) {
    const items = data.items || []

    function addFaq() {
        onChange({ ...data, items: [...items, { question: "", answer: "" }] })
    }

    function updateFaq(i: number, key: "question" | "answer", val: string) {
        const next = items.map((item, idx) => idx === i ? { ...item, [key]: val } : item)
        onChange({ ...data, items: next })
    }

    function removeFaq(i: number) {
        onChange({ ...data, items: items.filter((_, idx) => idx !== i) })
    }

    return (
        <div className="space-y-3">
            <Label className="text-xs text-slate-500">FAQs ({items.length})</Label>
            {items.map((item, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between">
                        <span className="text-xs font-medium text-slate-500">Q{i + 1}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFaq(i)} className="h-6 w-6 p-0 text-slate-400 hover:text-red-500">
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                    <Input value={item.question} onChange={(e) => updateFaq(i, "question", e.target.value)} placeholder="Question..." className="text-sm font-medium" />
                    <Textarea value={item.answer} onChange={(e) => updateFaq(i, "answer", e.target.value)} placeholder="Answer..." rows={3} className="text-sm" />
                </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addFaq} className="w-full gap-2 text-xs">
                <Plus className="w-3 h-3" /> Add FAQ
            </Button>
        </div>
    )
}