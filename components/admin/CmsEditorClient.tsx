"use client"

import { useState, useEffect, useCallback, useRef } from "react"
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
    Circle, Pencil, Check, X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Props { slug: string }

export default function CmsEditorClient({ slug }: Props) {
    const router = useRouter()
    const pageKey = slug.replace(/__/g, "/")

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
    const [isDirty, setIsDirty] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    // URL slug editing
    const [editingUrl, setEditingUrl] = useState(false)
    const [urlDraft, setUrlDraft] = useState("")
    const [currentPageKey, setCurrentPageKey] = useState(pageKey)

    // Track dirty state
    const initialRef = useRef<string>("")

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
                setCurrentPageKey(p.pageKey || pageKey)
                setUrlDraft(p.pageKey || pageKey)
                // Store initial state snapshot
                initialRef.current = JSON.stringify({
                    title: p.title,
                    blocks: p.blocks || [],
                    metaTitle: p.seo?.metaTitle || "",
                    metaDesc: p.seo?.metaDescription || "",
                    keywords: (p.seo?.keywords || []).join(", "),
                })
                setLastSaved(new Date())
            })
            .catch(() => toast.error("Failed to load page"))
            .finally(() => setLoading(false))
    }, [slug, pageKey])

    // Mark dirty when content changes
    useEffect(() => {
        if (!page) return
        const current = JSON.stringify({ title, blocks, metaTitle, metaDesc, keywords })
        setIsDirty(current !== initialRef.current)
    }, [title, blocks, metaTitle, metaDesc, keywords, page])

    // Warn before leaving with unsaved changes
    useEffect(() => {
        const handler = (e: BeforeUnloadEvent) => {
            if (isDirty) { e.preventDefault(); e.returnValue = "" }
        }
        window.addEventListener("beforeunload", handler)
        return () => window.removeEventListener("beforeunload", handler)
    }, [isDirty])

    const handleSave = useCallback(async (pubOverride?: boolean) => {
        setSaving(true)
        try {
            const isPublished = pubOverride !== undefined ? pubOverride : published
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
            setLastSaved(new Date())
            // Update snapshot so dirty clears
            initialRef.current = JSON.stringify({ title, blocks, metaTitle, metaDesc, keywords })
            setIsDirty(false)
            toast.success(isPublished ? "Page saved & published ✓" : "Draft saved ✓")
        } catch {
            toast.error("Failed to save page")
        } finally {
            setSaving(false)
        }
    }, [slug, title, blocks, published, metaTitle, metaDesc, keywords])

    const handleUrlSave = useCallback(async () => {
        const newKey = urlDraft.trim().replace(/^\/+|\/+$/g, "")
        if (!newKey || newKey === currentPageKey) { setEditingUrl(false); return }
        if (!/^[a-z0-9-/]+$/.test(newKey)) {
            toast.error("URL can only contain lowercase letters, numbers, hyphens and slashes")
            return
        }
        try {
            await axios.put(`/api/cms/pages/${slug}`, { pageKey: newKey })
            setCurrentPageKey(newKey)
            setUrlDraft(newKey)
            setEditingUrl(false)
            toast.success("URL updated — redirect your old URL manually if needed")
        } catch (err) {
            toast.error(
                axios.isAxiosError(err)
                    ? err.response?.data?.error ?? "Failed to update URL"
                    : "Failed to update URL"
            )
        }
    }, [slug, urlDraft, currentPageKey])

    // Ctrl+S / Cmd+S shortcut
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault()
                if (!saving) handleSave()
            }
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [handleSave, saving])

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
                <p className="text-lg font-semibold mb-2">Page not found</p>
                <p className="text-sm mb-4">The page &ldquo;{pageKey}&rdquo; doesn&apos;t exist in the CMS.</p>
                <button onClick={() => router.push("/admin/cms")} className="text-sm font-medium px-4 py-2 rounded-lg" style={{ background: "var(--brand)", color: "#fff" }}>
                    Back to CMS
                </button>
            </div>
        )
    }

    const formatSaved = (d: Date) => d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })

    return (
        <div className="-mx-3 sm:-mx-5 lg:-mx-6 bg-slate-100">
            {/* ── Top toolbar (negative margins cancel main's padding so sticky top-0 is flush) ── */}
            <div className="sticky top-0 z-40 bg-white border-b border-slate-200 px-3 sm:px-6">
                {/* Single toolbar row: back | title+url | [publish | preview | shortcut] | save */}
                <div className="flex items-center gap-2 sm:gap-3 h-14 sm:h-16">

                    {/* Back */}
                    <button
                        onClick={() => {
                            if (isDirty && !window.confirm("You have unsaved changes. Leave anyway?")) return
                            router.push("/admin/cms")
                        }}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1 shrink-0"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    {/* Title + URL — takes all remaining space */}
                    <div className="flex-1 min-w-0">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-sm sm:text-base font-semibold text-slate-900 bg-transparent border-0 outline-none w-full focus:ring-0 p-0 placeholder:text-slate-300"
                            placeholder="Page title..."
                        />
                        <div className="flex items-center gap-1.5 mt-0.5 overflow-hidden">
                            {editingUrl ? (
                                <div className="flex items-center gap-1 flex-1 min-w-0">
                                    <span className="text-[11px] text-slate-400 font-mono shrink-0">/</span>
                                    <input
                                        autoFocus
                                        value={urlDraft}
                                        onChange={(e) => setUrlDraft(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter") handleUrlSave(); if (e.key === "Escape") { setUrlDraft(currentPageKey); setEditingUrl(false) } }}
                                        className="text-[11px] sm:text-xs text-slate-700 font-mono bg-slate-100 border border-slate-300 rounded px-1.5 py-0.5 outline-none focus:border-emerald-400 min-w-0 flex-1"
                                    />
                                    <button onClick={handleUrlSave} className="text-emerald-600 hover:text-emerald-700 p-0.5"><Check className="w-3 h-3" /></button>
                                    <button onClick={() => { setUrlDraft(currentPageKey); setEditingUrl(false) }} className="text-slate-400 hover:text-slate-600 p-0.5"><X className="w-3 h-3" /></button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => { setUrlDraft(currentPageKey); setEditingUrl(true) }}
                                    className="flex items-center gap-1 group/url min-w-0"
                                    title="Edit URL"
                                >
                                    <span className="text-[11px] sm:text-xs text-slate-400 font-mono truncate">/{currentPageKey}/</span>
                                    <Pencil className="w-2.5 h-2.5 text-slate-300 group-hover/url:text-slate-500 transition-colors shrink-0" />
                                </button>
                            )}
                            {lastSaved && !isDirty && !editingUrl && (
                                <span className="text-[11px] sm:text-xs text-slate-400 whitespace-nowrap hidden sm:inline">· Saved {formatSaved(lastSaved)}</span>
                            )}
                            {isDirty && !editingUrl && (
                                <span className="flex items-center gap-1 text-[11px] sm:text-xs text-amber-500 whitespace-nowrap">
                                    <Circle className="w-1.5 h-1.5 fill-current" />
                                    Unsaved
                                </span>
                            )}
                        </div>
                    </div>

                    {/* ── Right-side controls (always visible, no absolute) ── */}

                    {/* Published toggle */}
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        <Globe className={cn("w-3.5 h-3.5 hidden sm:block", published ? "text-emerald-500" : "text-slate-400")} />
                        <Switch
                            checked={published}
                            onCheckedChange={(v) => handleSave(v)}
                        />
                        <span className={cn("text-xs sm:text-sm font-medium whitespace-nowrap", published ? "text-emerald-600" : "text-slate-400")}>
                            {published ? "Published" : "Draft"}
                        </span>
                    </div>

                    {/* Preview link */}
                    {published && (
                        <a
                            href={currentPageKey === "home" ? "/" : `/${currentPageKey}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0"
                        >
                            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
                                <Eye className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Preview</span>
                            </Button>
                        </a>
                    )}

                    {/* ⌘S hint — large screens only */}
                    <p className="text-xs text-slate-400 whitespace-nowrap hidden lg:flex items-center gap-1 shrink-0">
                        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-mono">⌘S</kbd>
                        to save
                    </p>

                    {/* Save button */}
                    <Button
                        onClick={() => handleSave()}
                        disabled={saving || !isDirty}
                        size="sm"
                        className={cn(
                            "gap-1.5 h-8 sm:h-9 font-semibold text-xs sm:text-sm shrink-0",
                            isDirty ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-slate-200 text-slate-400 cursor-default"
                        )}
                    >
                        {saving
                            ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span className="hidden sm:inline">Saving…</span></>
                            : <><Save className="w-3.5 h-3.5" /><span className="hidden sm:inline">{isDirty ? "Save" : "Saved"}</span></>
                        }
                    </Button>
                </div>
            </div>
            {/* ── Main content ── */}
            <div className="px-3 sm:px-5 lg:px-6 py-4 sm:py-6 max-w-5xl w-full mx-auto">

                {/* SEO accordion */}
                <div className="bg-white rounded-xl border border-slate-200 mb-4 sm:mb-5">
                    <button
                        type="button"
                        onClick={() => setSeoOpen((o) => !o)}
                        className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors rounded-xl"
                    >
                        <span className="flex items-center gap-2">
                            <Settings className="w-4 h-4 text-slate-400" />
                            SEO Settings
                            {(metaTitle || metaDesc) && (
                                <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">filled</span>
                            )}
                        </span>
                        {seoOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>

                    {seoOpen && (
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-4 border-t border-slate-100">
                            <div className="space-y-1.5 mt-4">
                                <Label className="text-xs text-slate-500">
                                    Meta Title
                                    <span className="text-slate-300 ml-1">({metaTitle.length}/80)</span>
                                </Label>
                                <Input
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                    placeholder="SEO title for this page"
                                    maxLength={80}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs text-slate-500">
                                    Meta Description
                                    <span className="text-slate-300 ml-1">({metaDesc.length}/200)</span>
                                </Label>
                                <Textarea
                                    value={metaDesc}
                                    onChange={(e) => setMetaDesc(e.target.value)}
                                    placeholder="Brief description for search engines"
                                    maxLength={200}
                                    rows={3}
                                />
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
                            Page Blocks
                            <span className="text-slate-400 font-normal ml-1">({blocks.length})</span>
                        </h2>
                    </div>
                    <BlockEditor blocks={blocks} onChange={setBlocks} />
                </div>

                {/* Bottom spacer so sticky toolbar doesn't cover last block */}
                <div className="h-12" />
            </div>
        </div>
    )
}
