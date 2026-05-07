"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Loader2, Plus } from "lucide-react"
import { slugify } from "@/lib/utils"

export default function NewPagePage() {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [pageKey, setPageKey] = useState("")
    const [section, setSection] = useState("term-life")
    const [published, setPublished] = useState(false)
    const [saving, setSaving] = useState(false)
    const [keyEdited, setKeyEdited] = useState(false)

    function handleTitleChange(val: string) {
        setTitle(val)
        if (!keyEdited) {
            setPageKey(slugify(val))
        }
    }

    async function handleCreate() {
        if (!title.trim()) return toast.error("Title is required")
        if (!pageKey.trim()) return toast.error("Page URL slug is required")
        if (!section) return toast.error("Section is required")

        setSaving(true)
        try {
            await axios.post("/api/cms/pages", {
                title: title.trim(),
                pageKey: pageKey.trim(),
                section,
                published,
                blocks: [],
            })
            toast.success("Page created! Now add blocks.")
            const slug = pageKey.replace(/\//g, "__")
            router.push(`/admin/cms/${slug}`)
        } catch (err) {
            toast.error(
                axios.isAxiosError(err)
                    ? err.response?.data?.error ?? "Failed to create page"
                    : "Failed to create page"
            )
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="max-w-xl space-y-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-semibold text-slate-900">New Page</h1>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
                {/* Title */}
                <div className="space-y-1.5">
                    <Label>Page Title</Label>
                    <Input
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. What is Term Insurance?"
                        className="text-base"
                    />
                </div>

                {/* URL Slug */}
                <div className="space-y-1.5">
                    <Label>URL Slug</Label>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">yoursite.com/</span>
                        <Input
                            value={pageKey}
                            onChange={(e) => { setPageKey(e.target.value); setKeyEdited(true) }}
                            placeholder="term-life/what-is-term-insurance"
                            className="font-mono text-sm flex-1"
                        />
                    </div>
                    <p className="text-xs text-slate-400">
                        Use lowercase letters, numbers, hyphens, and slashes only
                    </p>
                </div>

                {/* Section */}
                <div className="space-y-1.5">
                    <Label>Section</Label>
                    <Select value={section} onValueChange={setSection}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="term-life">Term Life Insurance</SelectItem>
                            <SelectItem value="health">Health Insurance</SelectItem>
                            <SelectItem value="home">Homepage</SelectItem>
                            <SelectItem value="articles">Articles</SelectItem>
                            <SelectItem value="tools">Tools & Calculators</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Published */}
                <div className="flex items-center justify-between py-2">
                    <div>
                        <Label>Publish immediately</Label>
                        <p className="text-xs text-slate-400 mt-0.5">
                            If off, the page will be saved as a draft
                        </p>
                    </div>
                    <Switch checked={published} onCheckedChange={setPublished} />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2"
                        onClick={handleCreate}
                        disabled={saving}
                    >
                        {saving
                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</>
                            : <><Plus className="w-4 h-4" /> Create & Edit</>
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}