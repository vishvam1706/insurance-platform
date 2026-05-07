"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import Link from "next/link"
import { toast } from "sonner"
import { useDebounce } from "@/hooks/useDebounce"
import { formatDateTime } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import ConfirmDialog from "./ConfirmDialog"
import {
    FileEdit, Search, Plus, Trash2,
    ExternalLink, Clock, Eye, EyeOff,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PageMeta {
    _id: string
    pageKey: string
    title: string
    section: string
    published: boolean
    updatedAt: string
    updatedBy?: string
}

const SECTION_COLORS: Record<string, string> = {
    "term-life": "bg-blue-100 text-blue-700",
    "health": "bg-green-100 text-green-700",
    "home": "bg-purple-100 text-purple-700",
    "articles": "bg-orange-100 text-orange-700",
    "tools": "bg-teal-100 text-teal-700",
    "other": "bg-slate-100 text-slate-600",
}

export default function PagesList() {
    const { user } = useAuth()
    const [pages, setPages] = useState<PageMeta[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [section, setSection] = useState("")
    const [published, setPublished] = useState("")
    const [deleteKey, setDeleteKey] = useState<string | null>(null)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const debouncedSearch = useDebounce(search, 400)

    const fetchPages = useCallback(async () => {
        setLoading(true)
        try {
            const params: Record<string, string> = {}
            if (debouncedSearch) params.search = debouncedSearch
            if (section) params.section = section
            if (published) params.published = published

            const res = await axios.get("/api/cms/pages", { params })
            setPages(res.data.pages)
        } catch {
            toast.error("Failed to load pages")
        } finally {
            setLoading(false)
        }
    }, [debouncedSearch, section, published])

    useEffect(() => { fetchPages() }, [fetchPages])

    async function handleDelete() {
        if (!deleteKey) return
        setDeleteLoading(true)
        try {
            const slug = deleteKey.replace(/\//g, "__")
            await axios.delete(`/api/cms/pages/${slug}`)
            toast.success("Page deleted")
            setDeleteKey(null)
            fetchPages()
        } catch {
            toast.error("Failed to delete page")
        } finally {
            setDeleteLoading(false)
        }
    }

    async function togglePublish(page: PageMeta) {
        try {
            const slug = page.pageKey.replace(/\//g, "__")
            await axios.put(`/api/cms/pages/${slug}`, { published: !page.published })
            toast.success(page.published ? "Page unpublished" : "Page published")
            fetchPages()
        } catch {
            toast.error("Failed to update page")
        }
    }

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search pages..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 h-9"
                        />
                    </div>
                    <Select value={section} onValueChange={(v) => setSection(v === "all" ? "" : v)}>
                        <SelectTrigger className="h-9 w-full sm:w-44">
                            <SelectValue placeholder="All sections" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All sections</SelectItem>
                            <SelectItem value="term-life">Term Life</SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                            <SelectItem value="home">Home</SelectItem>
                            <SelectItem value="articles">Articles</SelectItem>
                            <SelectItem value="tools">Tools</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={published} onValueChange={(v) => setPublished(v === "all" ? "" : v)}>
                        <SelectTrigger className="h-9 w-full sm:w-40">
                            <SelectValue placeholder="All status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All status</SelectItem>
                            <SelectItem value="true">Published</SelectItem>
                            <SelectItem value="false">Draft</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Pages list */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-48">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : pages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                        <FileEdit className="w-8 h-8 mb-2 opacity-40" />
                        <p className="text-sm">No pages found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {pages.map((page) => (
                            <div
                                key={page._id}
                                className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors group"
                            >
                                {/* Published dot */}
                                <div className={cn(
                                    "w-2 h-2 rounded-full shrink-0",
                                    page.published ? "bg-green-500" : "bg-slate-300"
                                )} />

                                {/* Page info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-sm font-medium text-slate-900 truncate">{page.title}</p>
                                        <Badge className={cn("text-xs border-0 capitalize", SECTION_COLORS[page.section])}>
                                            {page.section}
                                        </Badge>
                                        {!page.published && (
                                            <Badge variant="outline" className="text-xs text-slate-400 border-slate-200">
                                                Draft
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 font-mono mt-0.5">/{page.pageKey}</p>
                                    <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-400">
                                        <Clock className="w-3 h-3" />
                                        {formatDateTime(page.updatedAt)}
                                        {page.updatedBy && <span>· {page.updatedBy}</span>}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                    {/* View public */}
                                    {page.published && (
                                        <Link href={`/${page.pageKey}`} target="_blank">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                                                <ExternalLink className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    )}

                                    {/* Toggle publish */}
                                    <Button
                                        variant="ghost" size="sm"
                                        onClick={() => togglePublish(page)}
                                        className="h-8 w-8 p-0 text-slate-400 hover:text-green-600"
                                        title={page.published ? "Unpublish" : "Publish"}
                                    >
                                        {page.published
                                            ? <EyeOff className="w-4 h-4" />
                                            : <Eye className="w-4 h-4" />
                                        }
                                    </Button>

                                    {/* Edit */}
                                    <Link href={`/admin/cms/${page.pageKey.replace(/\//g, "__")}`}>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                                            <FileEdit className="w-4 h-4" />
                                        </Button>
                                    </Link>

                                    {/* Delete — super admin only */}
                                    {user?.role === "super_admin" && (
                                        <Button
                                            variant="ghost" size="sm"
                                            onClick={() => setDeleteKey(page.pageKey)}
                                            className="h-8 w-8 p-0 text-slate-400 hover:text-red-500"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={!!deleteKey}
                onOpenChange={(open) => !open && setDeleteKey(null)}
                title="Delete Page"
                description={`This will permanently delete "${deleteKey}" and all its content. This cannot be undone.`}
                confirmLabel="Delete Page"
                loading={deleteLoading}
                onConfirm={handleDelete}
            />
        </div>
    )
}