"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface FaqItem { question: string; answer: string }
interface HomeFaqData { items?: FaqItem[] }
interface Props { data: HomeFaqData; onChange: (d: HomeFaqData) => void }

export default function HomeFaqBlockEditor({ data, onChange }: Props) {
    const items = data.items || []

    function addFaq() {
        onChange({ ...data, items: [...items, { question: "", answer: "" }] })
    }

    function update(i: number, key: "question" | "answer", val: string) {
        onChange({ ...data, items: items.map((item, idx) => idx === i ? { ...item, [key]: val } : item) })
    }

    function remove(i: number) {
        onChange({ ...data, items: items.filter((_, idx) => idx !== i) })
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label className="text-xs text-slate-500">FAQ Items ({items.length})</Label>
                <span className="text-xs text-slate-400">Shown 4 per page with pagination</span>
            </div>
            {items.map((item, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500">Q{i + 1}</span>
                        <Button
                            type="button" variant="ghost" size="sm"
                            onClick={() => remove(i)}
                            className="h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                    <Input
                        value={item.question}
                        onChange={(e) => update(i, "question", e.target.value)}
                        placeholder="Question..."
                        className="text-sm font-medium"
                    />
                    <Textarea
                        value={item.answer}
                        onChange={(e) => update(i, "answer", e.target.value)}
                        placeholder="Answer..."
                        rows={2}
                        className="text-sm"
                    />
                </div>
            ))}
            <Button
                type="button" variant="outline" size="sm"
                onClick={addFaq}
                className="w-full gap-2 text-xs"
            >
                <Plus className="w-3 h-3" /> Add FAQ
            </Button>
            {items.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-2">
                    No FAQs added yet. Hardcoded defaults will be shown on the page.
                </p>
            )}
        </div>
    )
}
