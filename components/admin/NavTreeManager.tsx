"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import axios from "axios"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    FolderTree, Plus, Trash2, GripVertical, ChevronRight, ChevronDown,
    FileText, Folder, FolderOpen, Pencil, Check, X, Loader2,
    RefreshCw, ExternalLink,
} from "lucide-react"

/* ── Types ── */
interface NavItemRaw {
    _id: string
    label: string
    href: string
    pageKey: string | null
    parentId: string | null
    order: number
    type: "category" | "page"
}

interface TreeNode extends NavItemRaw {
    children: TreeNode[]
    depth: number
}

/* ── Helpers ── */
function buildTree(items: NavItemRaw[]): TreeNode[] {
    const map = new Map<string, TreeNode>()
    const roots: TreeNode[] = []

    // Initialize all nodes
    for (const item of items) {
        map.set(item._id, { ...item, children: [], depth: 0 })
    }

    // Build parent-child relationships
    for (const item of items) {
        const node = map.get(item._id)!
        if (item.parentId && map.has(item.parentId)) {
            const parent = map.get(item.parentId)!
            node.depth = parent.depth + 1
            parent.children.push(node)
        } else {
            roots.push(node)
        }
    }

    // Sort children by order
    function sortChildren(nodes: TreeNode[]) {
        nodes.sort((a, b) => a.order - b.order)
        nodes.forEach((n) => sortChildren(n.children))
    }
    sortChildren(roots)

    // Recalculate depths
    function setDepths(nodes: TreeNode[], depth: number) {
        nodes.forEach((n) => { n.depth = depth; setDepths(n.children, depth + 1) })
    }
    setDepths(roots, 0)

    return roots
}

function flattenTree(nodes: TreeNode[]): TreeNode[] {
    const flat: TreeNode[] = []
    function walk(list: TreeNode[]) {
        for (const n of list) {
            flat.push(n)
            walk(n.children)
        }
    }
    walk(nodes)
    return flat
}

/* ── Inline editor for a single node ── */
function NodeRow({
    node,
    expanded,
    onToggle,
    onDelete,
    onUpdate,
    dragProps,
}: {
    node: TreeNode
    expanded: boolean
    onToggle: () => void
    onDelete: () => void
    onUpdate: (label: string, href: string) => void
    dragProps: {
        onDragStart: (e: React.DragEvent, id: string) => void
        onDragOver: (e: React.DragEvent, id: string) => void
        onDrop: (e: React.DragEvent, id: string) => void
        onDragEnd: () => void
        dragOverId: string | null
        dragPosition: "before" | "inside" | "after" | null
    }
}) {
    const [editing, setEditing] = useState(false)
    const [labelDraft, setLabelDraft] = useState(node.label)
    const [hrefDraft, setHrefDraft] = useState(node.href)

    const hasChildren = node.children.length > 0
    const isCategory = node.type === "category"
    const indent = node.depth * 28

    const isOver = dragProps.dragOverId === node._id

    return (
        <div
            className={cn(
                "group relative",
                isOver && dragProps.dragPosition === "before" && "before:absolute before:left-0 before:right-0 before:top-0 before:h-0.5 before:bg-emerald-500 before:z-10",
                isOver && dragProps.dragPosition === "after" && "after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-emerald-500 after:z-10",
                isOver && dragProps.dragPosition === "inside" && "ring-2 ring-inset ring-emerald-400 bg-emerald-50/50 rounded-lg",
            )}
            draggable
            onDragStart={(e) => dragProps.onDragStart(e, node._id)}
            onDragOver={(e) => dragProps.onDragOver(e, node._id)}
            onDrop={(e) => dragProps.onDrop(e, node._id)}
            onDragEnd={dragProps.onDragEnd}
        >
            <div
                className={cn(
                    "flex items-center gap-1.5 px-2 py-2 rounded-lg transition-colors hover:bg-slate-50",
                    editing && "bg-blue-50/50"
                )}
                style={{ paddingLeft: `${indent + 8}px` }}
            >
                {/* Drag handle */}
                <div className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing shrink-0 p-0.5">
                    <GripVertical className="w-3.5 h-3.5" />
                </div>

                {/* Expand toggle (only for categories or items with children) */}
                {(isCategory || hasChildren) ? (
                    <button
                        type="button"
                        onClick={onToggle}
                        className="text-slate-400 hover:text-slate-600 p-0.5 shrink-0"
                    >
                        {expanded
                            ? <ChevronDown className="w-3.5 h-3.5" />
                            : <ChevronRight className="w-3.5 h-3.5" />
                        }
                    </button>
                ) : (
                    <div className="w-[18px] shrink-0" />
                )}

                {/* Icon */}
                {isCategory ? (
                    expanded
                        ? <FolderOpen className="w-4 h-4 text-amber-500 shrink-0" />
                        : <Folder className="w-4 h-4 text-amber-500 shrink-0" />
                ) : (
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}

                {/* Label + href */}
                {editing ? (
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <Input
                            value={labelDraft}
                            onChange={(e) => setLabelDraft(e.target.value)}
                            className="h-7 text-xs flex-1"
                            placeholder="Label"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === "Enter") { onUpdate(labelDraft, hrefDraft); setEditing(false) }
                                if (e.key === "Escape") { setLabelDraft(node.label); setHrefDraft(node.href); setEditing(false) }
                            }}
                        />
                        <Input
                            value={hrefDraft}
                            onChange={(e) => setHrefDraft(e.target.value)}
                            className="h-7 text-xs w-36 font-mono"
                            placeholder="/path"
                        />
                        <button
                            onClick={() => { onUpdate(labelDraft, hrefDraft); setEditing(false) }}
                            className="text-emerald-600 hover:text-emerald-700 p-1"
                        >
                            <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={() => { setLabelDraft(node.label); setHrefDraft(node.href); setEditing(false) }}
                            className="text-slate-400 hover:text-slate-600 p-1"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-sm font-medium text-slate-800 truncate">{node.label}</span>
                        <span className="text-[11px] text-slate-400 font-mono truncate hidden sm:inline">{node.href}</span>
                        {isCategory && (
                            <Badge className="text-[9px] bg-amber-100 text-amber-700 border-0 px-1.5 py-0 shrink-0">
                                Category
                            </Badge>
                        )}
                        {node.pageKey && (
                            <Badge className="text-[9px] bg-emerald-100 text-emerald-700 border-0 px-1.5 py-0 shrink-0">
                                CMS
                            </Badge>
                        )}
                    </div>
                )}

                {/* Actions */}
                {!editing && (
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <button
                            onClick={() => { setLabelDraft(node.label); setHrefDraft(node.href); setEditing(true) }}
                            className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200"
                            title="Edit"
                        >
                            <Pencil className="w-3 h-3" />
                        </button>
                        {node.href !== "#" && (
                            <a href={node.href} target="_blank" rel="noopener noreferrer"
                                className="text-slate-400 hover:text-emerald-600 p-1 rounded hover:bg-slate-200"
                                title="Open page"
                            >
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        )}
                        <button
                            onClick={onDelete}
                            className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-red-50"
                            title="Delete"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

/* ── Main component ── */
export default function NavTreeManager() {
    const [items, setItems] = useState<NavItemRaw[]>([])
    const [loading, setLoading] = useState(true)
    const [expanded, setExpanded] = useState<Set<string>>(new Set())
    const [addMode, setAddMode] = useState<"category" | "page" | null>(null)
    const [addParentId, setAddParentId] = useState<string | null>(null)
    const [newLabel, setNewLabel] = useState("")
    const [newHref, setNewHref] = useState("")
    const [saving, setSaving] = useState(false)
    const [syncing, setSyncing] = useState(false)

    // Drag state
    const [dragId, setDragId] = useState<string | null>(null)
    const [dragOverId, setDragOverId] = useState<string | null>(null)
    const [dragPosition, setDragPosition] = useState<"before" | "inside" | "after" | null>(null)
    const dragCounter = useRef(0)

    const fetchItems = useCallback(async () => {
        setLoading(true)
        try {
            const res = await axios.get("/api/cms/nav-tree")
            setItems(res.data.items)
        } catch {
            toast.error("Failed to load navigation")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchItems() }, [fetchItems])

    const tree = buildTree(items)

    // Auto-sync: import all published CMS pages that aren't in nav yet
    async function handleSync() {
        setSyncing(true)
        try {
            const pagesRes = await axios.get("/api/cms/pages", { params: { published: "true" } })
            const pages = pagesRes.data.pages as { pageKey: string; title: string; section: string }[]
            const existingKeys = new Set(items.filter((i) => i.pageKey).map((i) => i.pageKey))

            let added = 0
            for (const page of pages) {
                if (existingKeys.has(page.pageKey)) continue
                // Find or create section category
                let parentId: string | null = null
                const sectionItem = items.find((i) => i.type === "category" && i.href === `/${page.section}`)
                if (sectionItem) {
                    parentId = sectionItem._id
                } else if (page.section !== "home" && page.section !== "other") {
                    // Create category
                    const catRes = await axios.post("/api/cms/nav-tree", {
                        label: page.section.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
                        href: `/${page.section}`,
                        type: "category",
                        parentId: null,
                    })
                    parentId = catRes.data.item._id
                    items.push(catRes.data.item) // Add to local list for next iterations
                }

                await axios.post("/api/cms/nav-tree", {
                    label: page.title,
                    href: page.pageKey === "home" ? "/" : `/${page.pageKey}`,
                    pageKey: page.pageKey,
                    type: "page",
                    parentId,
                })
                added++
            }

            if (added > 0) {
                toast.success(`${added} page(s) added to navigation`)
            } else {
                toast.info("All pages are already in the navigation")
            }

            fetchItems()
        } catch {
            toast.error("Failed to sync pages")
        } finally {
            setSyncing(false)
        }
    }

    async function handleAdd() {
        if (!newLabel.trim()) return toast.error("Label is required")
        const href = addMode === "category" ? (newHref.trim() || "#") : newHref.trim()
        if (addMode === "page" && !href) return toast.error("URL is required")

        setSaving(true)
        try {
            await axios.post("/api/cms/nav-tree", {
                label: newLabel.trim(),
                href,
                type: addMode,
                parentId: addParentId,
            })
            toast.success(`${addMode === "category" ? "Category" : "Page"} added`)
            setAddMode(null)
            setNewLabel("")
            setNewHref("")
            setAddParentId(null)
            fetchItems()
        } catch {
            toast.error("Failed to add item")
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(id: string) {
        if (!window.confirm("Delete this item? Children will be moved to root.")) return
        try {
            await axios.delete(`/api/cms/nav-tree?id=${id}`)
            toast.success("Deleted")
            fetchItems()
        } catch {
            toast.error("Failed to delete")
        }
    }

    async function handleUpdate(id: string, label: string, href: string) {
        try {
            await axios.put("/api/cms/nav-tree", {
                updates: [{ _id: id, parentId: items.find((i) => i._id === id)?.parentId ?? null, order: items.find((i) => i._id === id)?.order ?? 0, label, href }],
            })
            toast.success("Updated")
            fetchItems()
        } catch {
            toast.error("Failed to update")
        }
    }

    function toggleExpand(id: string) {
        setExpanded((prev) => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    // ── Drag and drop ──
    function handleDragStart(e: React.DragEvent, id: string) {
        setDragId(id)
        e.dataTransfer.effectAllowed = "move"
        dragCounter.current = 0
    }

    function handleDragOver(e: React.DragEvent, targetId: string) {
        e.preventDefault()
        if (dragId === targetId) return

        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const y = e.clientY - rect.top
        const height = rect.height
        const targetItem = items.find((i) => i._id === targetId)

        if (targetItem?.type === "category" && y > height * 0.25 && y < height * 0.75) {
            setDragPosition("inside")
        } else if (y < height / 2) {
            setDragPosition("before")
        } else {
            setDragPosition("after")
        }

        setDragOverId(targetId)
    }

    async function handleDrop(e: React.DragEvent, targetId: string) {
        e.preventDefault()
        if (!dragId || dragId === targetId) return

        const targetItem = items.find((i) => i._id === targetId)
        if (!targetItem) return

        let newParentId: string | null
        let newOrder: number

        if (dragPosition === "inside") {
            newParentId = targetId
            const siblings = items.filter((i) => i.parentId === targetId)
            newOrder = siblings.length
            // Auto-expand the target
            setExpanded((prev) => new Set([...prev, targetId]))
        } else {
            newParentId = targetItem.parentId
            const siblings = items
                .filter((i) => i.parentId === newParentId && i._id !== dragId)
                .sort((a, b) => a.order - b.order)
            const targetIdx = siblings.findIndex((i) => i._id === targetId)
            newOrder = dragPosition === "before" ? targetIdx : targetIdx + 1
        }

        // Reorder siblings
        const siblings = items
            .filter((i) => i.parentId === newParentId && i._id !== dragId)
            .sort((a, b) => a.order - b.order)

        const reordered = [...siblings]
        const dragItem = items.find((i) => i._id === dragId)
        if (!dragItem) return

        reordered.splice(Math.min(newOrder, reordered.length), 0, { ...dragItem, parentId: newParentId })

        const updates = reordered.map((item, idx) => ({
            _id: item._id,
            parentId: newParentId,
            order: idx,
        }))

        // Fix: the dragged item should have the new parentId
        const dragUpdate = updates.find((u) => u._id === dragId)
        if (dragUpdate) dragUpdate.parentId = newParentId

        try {
            await axios.put("/api/cms/nav-tree", { updates })
            fetchItems()
        } catch {
            toast.error("Failed to reorder")
        }

        setDragId(null)
        setDragOverId(null)
        setDragPosition(null)
    }

    function handleDragEnd() {
        setDragId(null)
        setDragOverId(null)
        setDragPosition(null)
    }

    const dragProps = {
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
        onDrop: handleDrop,
        onDragEnd: handleDragEnd,
        dragOverId,
        dragPosition,
    }

    // Render tree recursively, respecting expanded state
    function renderNodes(nodes: TreeNode[]): React.ReactNode[] {
        return nodes.map((node) => {
            const isExp = expanded.has(node._id)
            return (
                <div key={node._id}>
                    <NodeRow
                        node={node}
                        expanded={isExp}
                        onToggle={() => toggleExpand(node._id)}
                        onDelete={() => handleDelete(node._id)}
                        onUpdate={(label, href) => handleUpdate(node._id, label, href)}
                        dragProps={dragProps}
                    />
                    {isExp && node.children.length > 0 && renderNodes(node.children)}
                </div>
            )
        })
    }

    // Category options for "add to" dropdown
    const categories = items.filter((i) => i.type === "category")

    return (
        <div className="space-y-4">
            {/* Action bar */}
            <div className="flex flex-wrap items-center gap-2">
                <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 gap-1.5 text-xs h-8"
                    onClick={handleSync}
                    disabled={syncing}
                >
                    {syncing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                    Sync CMS Pages
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-xs h-8"
                    onClick={() => { setAddMode("category"); setAddParentId(null) }}
                >
                    <Folder className="w-3.5 h-3.5" />
                    Add Category
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-xs h-8"
                    onClick={() => { setAddMode("page"); setAddParentId(null) }}
                >
                    <FileText className="w-3.5 h-3.5" />
                    Add Link
                </Button>
            </div>

            {/* Add form */}
            {addMode && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                    <p className="text-sm font-semibold text-blue-800">
                        Add {addMode === "category" ? "Category" : "Page Link"}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            placeholder="Label (e.g. Health Insurance)"
                            className="text-sm h-9 flex-1"
                            autoFocus
                            onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setAddMode(null) }}
                        />
                        <Input
                            value={newHref}
                            onChange={(e) => setNewHref(e.target.value)}
                            placeholder={addMode === "category" ? "/section (optional)" : "/page-url"}
                            className="text-sm h-9 flex-1 font-mono"
                        />
                        {categories.length > 0 && (
                            <select
                                value={addParentId || ""}
                                onChange={(e) => setAddParentId(e.target.value || null)}
                                className="h-9 px-2 text-xs border border-slate-200 rounded-lg bg-white"
                            >
                                <option value="">Root level</option>
                                {categories.map((c) => (
                                    <option key={c._id} value={c._id}>↳ {c.label}</option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 gap-1.5 h-8 text-xs"
                            onClick={handleAdd}
                            disabled={saving}
                        >
                            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                            Add
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 text-xs"
                            onClick={() => { setAddMode(null); setNewLabel(""); setNewHref("") }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {/* Tree */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-32">
                        <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                    </div>
                ) : tree.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-slate-400">
                        <FolderTree className="w-8 h-8 mb-2 opacity-40" />
                        <p className="text-sm mb-1">No navigation items yet</p>
                        <p className="text-xs">Click "Sync CMS Pages" to import all published pages</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50 p-2">
                        {renderNodes(tree)}
                    </div>
                )}
            </div>

            {/* Help text */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500 leading-relaxed">
                    <strong className="text-slate-700">How it works:</strong> Drag items to reorder or nest them.
                    Drop onto a category to make it a sub-item. Categories can contain other categories (sub-subcategories).
                    Click "Sync CMS Pages" to auto-import all published CMS pages.
                    New pages are automatically added when created.
                </p>
            </div>
        </div>
    )
}
