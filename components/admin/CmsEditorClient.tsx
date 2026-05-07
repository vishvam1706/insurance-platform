"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { Block } from "@/types/blocks"
import { IPageContent } from "@/types/page"
import BlockEditor from "@/components/admin/BlockEditor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
    ArrowLeft, Save, Loader2, Eye,
    Globe, Settings, ChevronDown, ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
    slug: string
}

export default function CmsEditorClient({ slug }: Props) {
    const router = useRouter()
    const pageKey = slug.replace(/__/g, "/")
    // The homepage lives at "/" not "/home"
    const publicUrl = pageKey === "home" ? "/" : `/${pageKey}`

    const [page, setPage] = useState<IPageContent | null>(null)
    const [blocks, setBlocks] = useState<Block[]>([])
    const [title, setTitle] = useState("")
    const [published, setPublished] = useState(false)
    const [seoOpen, setSeoOpen] = useState(false)
    const [metaTitle, setMetaTitle] = useState("")
    const [metaDesc, setMetaDesc] = useState("")
    const [keywords, setKeywords] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        axios.get(`/api/cms/pages/${slug}`)
            .then((res) => {
                const p: IPageContent = res.data.page
                setPage(p)
                setBlocks(p.blocks || [])
                setTitle(p.title)
                setPublished(p.published)
                setMetaTitle(p.seo?.metaTitle || "")
                setMetaDesc(p.seo?.metaDescription || "")
                setKeywords((p.seo?.keywords || []).join(", "))
            })
            .catch(() => toast.error("Failed to load page"))
            .finally(() => setLoading(false))
    }, [slug])

    async function handleSave(pub?: boolean) {
        setSaving(true)
        try {
            const isPublished = pub !== undefined ? pub : published
            await axios.put(`/api/cms/pages/${slug}`, {
                title,
                blocks,
                published: isPublished,
                seo: {
                    metaTitle: metaTitle || undefined,
                    metaDescription: metaDesc || undefined,
                    keywords: keywords ? keywords.split(",").map((k) => k.trim()).filter(Boolean) : undefined,
                },
            })
            setPublished(isPublished)
            toast.success(isPublished ? "Page saved & published ✓" : "Draft saved ✓")
        } catch {
            toast.error("Failed to save page")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
        )
    }

    if (!page) {
        return (
            <div className="text-center py-20 text-slate-400">
                <p>Page not found</p>
                <button onClick={() => router.push("/admin/cms")} className="text-blue-600 text-sm mt-2">
                    Back to CMS
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-5 max-w-4xl">
            {/* Top bar */}
            <div className="flex items-center gap-3 flex-wrap">
                <button
                    onClick={() => router.push("/admin/cms")}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="flex-1 min-w-0">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-base font-semibold border-0 p-0 h-auto focus-visible:ring-0 bg-transparent"
                        placeholder="Page title"
                    />
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{publicUrl}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    {/* Published toggle */}
                    <div className="flex items-center gap-2">
                        <Globe className={cn("w-4 h-4", published ? "text-green-500" : "text-slate-400")} />
                        <Switch
                            checked={published}
                            onCheckedChange={(v) => { setPublished(v); handleSave(v) }}
                        />
                        <span className="text-sm text-slate-500">
                            {published ? "Published" : "Draft"}
                        </span>
                    </div>

                    {/* Preview */}
                    {published && (
                        <a href={publicUrl} target="_blank">
                            <Button variant="outline" size="sm" className="gap-1">
                                <Eye className="w-4 h-4" /> Preview
                            </Button>
                        </a>
                    )}

                    {/* Save */}
                    <Button
                        onClick={() => handleSave()}
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 gap-2"
                    >
                        {saving
                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                            : <><Save className="w-4 h-4" /> Save</>
                        }
                    </Button>
                </div>
            </div>

            {/* SEO section */}
            <div className="bg-white rounded-xl border border-slate-200">
                <button
                    type="button"
                    onClick={() => setSeoOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors rounded-xl"
                >
                    <span className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-slate-400" />
                        SEO Settings
                    </span>
                    {seoOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {seoOpen && (
                    <div className="px-5 pb-5 space-y-4 border-t border-slate-100">
                        <div className="space-y-1.5 mt-4">
                            <Label className="text-xs text-slate-500">Meta Title <span className="text-slate-300">(max 80 chars)</span></Label>
                            <Input
                                value={metaTitle}
                                onChange={(e) => setMetaTitle(e.target.value)}
                                placeholder="SEO title for this page"
                                maxLength={80}
                            />
                            <p className="text-xs text-slate-300 text-right">{metaTitle.length}/80</p>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs text-slate-500">Meta Description <span className="text-slate-300">(max 200 chars)</span></Label>
                            <Textarea
                                value={metaDesc}
                                onChange={(e) => setMetaDesc(e.target.value)}
                                placeholder="Brief description for search engines"
                                maxLength={200}
                                rows={3}
                            />
                            <p className="text-xs text-slate-300 text-right">{metaDesc.length}/200</p>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs text-slate-500">Keywords <span className="text-slate-300">(comma separated)</span></Label>
                            <Input
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder="term insurance, term life insurance india"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Block editor */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-slate-700">
                        Page Blocks <span className="text-slate-400 font-normal">({blocks.length})</span>
                    </h2>
                </div>
                <BlockEditor blocks={blocks} onChange={setBlocks} />
            </div>

            {/* Bottom save bar */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 py-4 flex items-center justify-between -mx-6 px-6">
                <p className="text-xs text-slate-400">
                    {blocks.length} block{blocks.length !== 1 ? "s" : ""} · {published ? "Published" : "Draft"}
                </p>
                <Button
                    onClick={() => handleSave()}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 gap-2"
                >
                    {saving
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                        : <><Save className="w-4 h-4" /> Save Changes</>
                    }
                </Button>
            </div>
        </div>
    )
}
