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
import { ArrowLeft, Loader2, Plus, Globe, FileText, Link2, Layers } from "lucide-react"
import { slugify } from "@/lib/utils"

const SECTION_PREFIX: Record<string, string> = {
    "term-life": "term-life/",
    "health": "health/",
    "articles": "articles/",
    "tools": "tools/",
    "home": "",
    "other": "",
}

const SECTION_LABELS: Record<string, string> = {
    "term-life": "Term Life Insurance",
    "health": "Health Insurance",
    "home": "Homepage",
    "articles": "Articles",
    "tools": "Tools & Calculators",
    "other": "Other",
}

export default function NewPagePage() {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [slugPart, setSlugPart] = useState("")
    const [section, setSection] = useState("health")
    const [published, setPublished] = useState(false)
    const [saving, setSaving] = useState(false)
    const [slugEdited, setSlugEdited] = useState(false)

    const prefix = SECTION_PREFIX[section] ?? ""
    const pageKey = prefix + slugPart
    const previewUrl = pageKey ? `/${pageKey}` : "/<slug>"

    function handleTitleChange(val: string) {
        setTitle(val)
        if (!slugEdited) setSlugPart(slugify(val))
    }

    function handleSectionChange(val: string) {
        setSection(val)
        if (!slugEdited && title) setSlugPart(slugify(title))
    }

    function handleSlugChange(val: string) {
        const stripped = val.replace(/^(term-life|health|articles|tools)\//, "")
        setSlugPart(stripped)
        setSlugEdited(true)
    }

    async function handleCreate() {
        if (!title.trim()) return toast.error("Title is required")
        if (!slugPart.trim()) return toast.error("URL slug is required")
        if (!section) return toast.error("Section is required")
        if (!/^[a-z0-9-]+$/.test(slugPart.trim())) {
            return toast.error("Slug can only contain lowercase letters, numbers, and hyphens")
        }

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
            const apiSlug = pageKey.replace(/\//g, "__")
            router.push(`/admin/cms/${apiSlug}`)
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
        <div className="pt-3 sm:pt-5 lg:pt-6 space-y-6">
            {/* Page header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-all shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">New Page</h1>
                    <p className="text-slate-500 text-sm mt-0.5">Create a new CMS-managed page</p>
                </div>
            </div>

            {/* Form card — full width */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Card header */}
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2 text-slate-700">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-semibold">Page Details</span>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Section */}
                    <div className="space-y-2">
                        <Label className="text-slate-700 text-sm font-medium">Section</Label>
                        <p className="text-xs text-slate-400">Determines the URL prefix automatically.</p>
                        <Select value={section} onValueChange={handleSectionChange}>
                            <SelectTrigger className="w-full h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors">
                                <div className="flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                                    <SelectValue />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(SECTION_LABELS).map(([val, label]) => (
                                    <SelectItem key={val} value={val}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Page Title */}
                    <div className="space-y-2">
                        <Label className="text-slate-700 text-sm font-medium">Page Title</Label>
                        <p className="text-xs text-slate-400">Used as the &lt;h1&gt; and meta title.</p>
                        <div className="relative">
                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <Input
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder={
                                    section === "health"
                                        ? "e.g. Best Family Health Insurance Plans"
                                        : section === "term-life"
                                        ? "e.g. What is Term Insurance?"
                                        : "e.g. My New Page"
                                }
                                className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                            />
                        </div>
                    </div>

                    {/* URL Slug — full width */}
                    <div className="space-y-2 lg:col-span-2">
                        <Label className="text-slate-700 text-sm font-medium">URL Slug</Label>
                        <p className="text-xs text-slate-400">Only lowercase letters, numbers, and hyphens. No spaces.</p>
                        <div className="flex items-stretch rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-400 focus-within:border-emerald-400 bg-slate-50 transition-all">
                            <div className="flex items-center gap-2 px-3 bg-slate-100 border-r border-slate-200 text-sm text-slate-400 font-mono whitespace-nowrap select-none">
                                <Link2 className="w-3.5 h-3.5" />
                                <span>{prefix ? `/${prefix}` : "/"}</span>
                            </div>
                            <input
                                value={slugPart}
                                onChange={(e) => handleSlugChange(e.target.value)}
                                placeholder="my-page-slug"
                                className="flex-1 px-3 py-2.5 text-sm font-mono outline-none bg-transparent h-11"
                            />
                        </div>

                        {/* Live URL preview */}
                        {pageKey && (
                            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                                <Globe className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span className="text-xs font-mono text-emerald-700 truncate">
                                    yoursite.com{previewUrl}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Publish toggle — full width */}
                    <div className="lg:col-span-2 flex items-center justify-between px-4 py-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div>
                            <p className="text-sm font-medium text-slate-800">Publish immediately</p>
                            <p className="text-xs text-slate-400 mt-0.5">
                                If off, the page will be saved as a draft and not visible publicly.
                            </p>
                        </div>
                        <Switch
                            checked={published}
                            onCheckedChange={setPublished}
                            className="shrink-0"
                        />
                    </div>
                </div>

                {/* Card footer — actions */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        className="h-10 px-5 rounded-xl border-slate-200"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreate}
                        disabled={saving || !title.trim() || !slugPart.trim()}
                        className="h-10 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all gap-2"
                    >
                        {saving
                            ? <><Loader2 className="w-4 h-4 animate-spin" />Creating...</>
                            : <><Plus className="w-4 h-4" />Create &amp; Edit</>
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}