"use client"

import { ReviewsBlockData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface Props { data: ReviewsBlockData; onChange: (d: ReviewsBlockData) => void }

export default function ReviewsBlockEditor({ data, onChange }: Props) {
    const items = data.items || []

    function addReview() {
        onChange({ ...data, items: [...items, { name: "", initials: "", body: "" }] })
    }

    function updateReview(i: number, key: string, val: string) {
        const next = items.map((item, idx) => idx === i ? { ...item, [key]: val } : item)
        onChange({ ...data, items: next })
    }

    function removeReview(i: number) {
        onChange({ ...data, items: items.filter((_, idx) => idx !== i) })
    }

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-xs text-slate-500">Rating (out of 5)</Label>
                    <Input type="number" min={0} max={5} step={0.1} value={data.rating || ""} onChange={(e) => onChange({ ...data, rating: parseFloat(e.target.value) })} placeholder="4.9" />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs text-slate-500">Total Reviews</Label>
                    <Input type="number" value={data.totalCount || ""} onChange={(e) => onChange({ ...data, totalCount: parseInt(e.target.value) })} placeholder="20915" />
                </div>
            </div>

            <div className="space-y-3">
                <Label className="text-xs text-slate-500">Reviews</Label>
                {items.map((item, i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between">
                            <span className="text-xs text-slate-400">Review {i + 1}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeReview(i)} className="h-6 w-6 p-0 text-slate-400 hover:text-red-500">
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-2">
                                <Input value={item.name} onChange={(e) => updateReview(i, "name", e.target.value)} placeholder="Reviewer name" className="text-sm" />
                            </div>
                            <Input value={item.initials} onChange={(e) => updateReview(i, "initials", e.target.value)} placeholder="RK" className="text-sm" maxLength={3} />
                        </div>
                        <Textarea value={item.body} onChange={(e) => updateReview(i, "body", e.target.value)} placeholder="Review text..." rows={3} className="text-sm" />
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addReview} className="w-full gap-2 text-xs">
                    <Plus className="w-3 h-3" /> Add Review
                </Button>
            </div>
        </div>
    )
}