"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"
import { IInquiry, InquiryStatus, StatusHistoryEntry } from "@/types/inquiry"
import InquiryStatusBadge from "./InquiryStatusBadge"
import ConfirmDialog from "./ConfirmDialog"
import { formatDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
    ChevronLeft, ChevronRight, Trash2, Eye,
    Phone, Mail, MapPin, Calendar, MessageSquare,
    Loader2, Languages, Shield, Clock, X, CheckCircle2,
    AlertCircle, PhoneOff, StickyNote, UserCircle2,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

interface InquiryTableProps {
    inquiries: IInquiry[]
    pagination: { page: number; pages: number; total: number }
    loading: boolean
    onPageChange: (page: number) => void
    onRefetch: () => void
}

const STATUS_CONFIG: Record<InquiryStatus, { label: string; icon: React.ReactNode; dot: string; bg: string; text: string; border: string }> = {
    new:          { label: "New",          icon: <AlertCircle className="w-3 h-3" />,   dot: "bg-blue-500",    bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200" },
    contacted:    { label: "Contacted",    icon: <Phone className="w-3 h-3" />,          dot: "bg-amber-500",   bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200" },
    resolved:     { label: "Resolved",     icon: <CheckCircle2 className="w-3 h-3" />,   dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    not_reachable:{ label: "Not Reachable",icon: <PhoneOff className="w-3 h-3" />,       dot: "bg-red-500",     bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200" },
}

function formatSlot(raw: string): string {
    try {
        const d = new Date(raw)
        if (isNaN(d.getTime())) return raw
        return d.toLocaleString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit", hour12: true,
        })
    } catch { return raw }
}

function timeAgo(date: Date | string, now: Date): string {
    const d = new Date(date)
    const diff = now.getTime() - d.getTime()
    if (diff < 60_000)    return `${Math.floor(diff / 1000)}s ago`
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`
    if (diff < 86_400_000)return `${Math.floor(diff / 3_600_000)}h ${Math.floor((diff % 3_600_000) / 60_000)}m ago`
    return `${Math.floor(diff / 86_400_000)}d ago`
}

type SlotUrgency = "overdue" | "imminent" | "soon" | "upcoming" | "done" | "none"
function slotUrgency(raw: string | undefined, now: Date, status: string): SlotUrgency {
    if (!raw) return "none"
    // If resolved/contacted/not_reachable — employee already acted, no urgency
    if (status === "resolved" || status === "contacted" || status === "not_reachable") return "done"
    const slot = new Date(raw)
    if (isNaN(slot.getTime())) return "none"
    const diff = slot.getTime() - now.getTime()
    if (diff < 0)           return "overdue"   // past + never attempted
    if (diff < 15 * 60_000) return "imminent"  // < 15 min
    if (diff < 60 * 60_000) return "soon"      // < 1 hr
    return "upcoming"
}

// Live hook — ticks every second
function useNow() {
    const [now, setNow] = useState(new Date())
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(t)
    }, [])
    return now
}

// "2m ago" label that updates live
function LiveTimeAgo({ date }: { date: Date | string }) {
    const now = useNow()
    return <span>{timeAgo(date, now)}</span>
}

// Slot chip with urgency color
function SlotChip({ raw, status }: { raw: string; status: string }) {
    const now = useNow()
    const urgency = slotUrgency(raw, now, status)
    const cfg = {
        overdue:  { bg: "bg-red-100",    text: "text-red-700",    border: "border-red-300",    label: "⚠ OVERDUE",   icon: "🔴" },
        imminent: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300", label: "🔔 Imminent", icon: "🟠" },
        soon:     { bg: "bg-amber-50",   text: "text-amber-700",  border: "border-amber-200",  label: "⏰ Soon",     icon: "🟡" },
        upcoming: { bg: "bg-emerald-50", text: "text-emerald-700",border: "border-emerald-200",label: "",            icon: "" },
        done:     { bg: "bg-slate-100",  text: "text-slate-500",  border: "border-slate-200",  label: "✓ Handled",   icon: "" },
        none:     { bg: "",              text: "",                border: "",                  label: "",            icon: "" },
    }[urgency]

    if (urgency === "none") return null
    return (
        <span className={cn(
            "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border",
            cfg.bg, cfg.text, cfg.border
        )}>
            {urgency === "overdue" && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
            {cfg.label || formatSlot(raw)}
        </span>
    )
}

function StatusPill({ status }: { status: InquiryStatus }) {
    const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.new
    return (
        <span className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border",
            cfg.bg, cfg.text, cfg.border
        )}>
            <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
            {cfg.label}
        </span>
    )
}

export default function InquiryTable({ inquiries, pagination, loading, onPageChange, onRefetch }: InquiryTableProps) {
    const { user } = useAuth()
    const [selected, setSelected] = useState<IInquiry | null>(null)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [quickSavingId, setQuickSavingId] = useState<string | null>(null)
    const [editStatus, setEditStatus] = useState<InquiryStatus>("new")
    const [editNotes, setEditNotes] = useState("")

    function openSheet(inq: IInquiry) {
        console.log("🔍 OPEN SHEET — statusHistory:", JSON.stringify(inq.statusHistory))
        setSelected(inq)
        // Employees default to not_reachable (most common first action)
        setEditStatus(user?.role === "employee" && inq.status === "new" ? "not_reachable" : inq.status)
        setEditNotes(inq.notes || "")
        setSheetOpen(true)
    }

    async function handleSave() {
        if (!selected) return
        setSaving(true)
        try {
            const res = await axios.patch(`/api/inquiries/${selected._id}`, { status: editStatus, notes: editNotes })
            console.log("🔍 SAVE RESPONSE — full inquiry:", JSON.stringify(res.data.inquiry))
            console.log("🔍 SAVE RESPONSE — statusHistory:", JSON.stringify(res.data.inquiry?.statusHistory))
            // ✅ Update selected immediately so history shows without reopening
            if (res.data.inquiry) setSelected(res.data.inquiry as IInquiry)
            toast.success("Inquiry updated")
            onRefetch()
        } catch {
            toast.error("Failed to update inquiry")
        } finally { setSaving(false) }
    }

    // ── One-click status update directly from the table row ──────────────────
    async function quickPatch(inq: IInquiry, status: InquiryStatus) {
        setQuickSavingId(inq._id + status)
        try {
            await axios.patch(`/api/inquiries/${inq._id}`, { status, notes: inq.notes || "" })
            toast.success(`Marked as ${STATUS_CONFIG[status].label}`)
            onRefetch()
        } catch {
            toast.error("Failed to update")
        } finally { setQuickSavingId(null) }
    }

    async function handleDelete() {
        if (!deleteId) return
        setDeleteLoading(true)
        try {
            await axios.delete(`/api/inquiries/${deleteId}`)
            toast.success("Inquiry deleted")
            setDeleteId(null)
            onRefetch()
        } catch {
            toast.error("Failed to delete inquiry")
        } finally { setDeleteLoading(false) }
    }

    if (loading) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-7 h-7 animate-spin text-emerald-500" />
                    <p className="text-sm text-slate-400">Loading inquiries…</p>
                </div>
            </div>
        )
    }

    if (inquiries.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center h-64 gap-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-slate-300" />
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-slate-500">No inquiries found</p>
                    <p className="text-xs text-slate-400 mt-0.5">Try adjusting your filters</p>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* ── Desktop table ── */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gradient-to-r from-slate-50 to-slate-50/80 border-b border-slate-200">
                            <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wide py-3.5">Name</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wide">Contact</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wide">Type</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wide">State</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wide">Status</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wide">Submitted</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wide text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inquiries.map((inq, idx) => (
                            <TableRow
                                key={inq._id}
                                className={cn(
                                    "group hover:bg-emerald-50/40 transition-colors cursor-pointer border-b border-slate-100 last:border-0",
                                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                                )}
                                onClick={() => openSheet(inq)}
                            >
                                <TableCell className="py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0 shadow-sm">
                                            <span className="text-xs font-bold text-white">
                                                {inq.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">{inq.name}</span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="space-y-0.5">
                                        <p className="text-sm text-slate-700 font-medium">{inq.phone}</p>
                                        <p className="text-xs text-slate-400 truncate max-w-[170px]">{inq.email}</p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <span className={cn(
                                        "text-[11px] font-semibold px-2.5 py-1 rounded-full border",
                                        inq.insuranceType === "term"
                                            ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                            : "bg-teal-50 text-teal-700 border-teal-200"
                                    )}>
                                        {inq.insuranceType === "term" ? "Term Life" : "Health"}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    <span className="text-sm text-slate-600">{inq.state}</span>
                                </TableCell>

                                <TableCell>
                                    <StatusPill status={inq.status} />
                                </TableCell>

                                <TableCell>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5">
                                            <p className="text-xs font-medium text-slate-500">
                                                <LiveTimeAgo date={inq.createdAt} />
                                            </p>
                                        </div>
                                        <p className="text-[10px] text-slate-400">{formatDateTime(inq.createdAt)}</p>
                                        {inq.preferredSlot && (
                                            <div className="flex flex-col gap-1 mt-1">
                                                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                                                    <Calendar className="w-2.5 h-2.5" />
                                                    {formatSlot(inq.preferredSlot)}
                                                </p>
                                                <SlotChip raw={inq.preferredSlot} status={inq.status} />
                                            </div>
                                        )}
                                    </div>
                                </TableCell>

                                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                        {/* Quick status buttons — only for non-resolved */}
                                        {inq.status !== "resolved" && (
                                            <>
                                                {inq.status !== "contacted" && (
                                                    <button
                                                        onClick={() => quickPatch(inq, "contacted")}
                                                        disabled={quickSavingId === inq._id + "contacted"}
                                                        className="text-[10px] font-bold px-2 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors disabled:opacity-50 flex items-center gap-1"
                                                    >
                                                        {quickSavingId === inq._id + "contacted"
                                                            ? <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                                            : <Phone className="w-2.5 h-2.5" />}
                                                        Contacted
                                                    </button>
                                                )}
                                                {inq.status !== "not_reachable" && (
                                                    <button
                                                        onClick={() => quickPatch(inq, "not_reachable")}
                                                        disabled={quickSavingId === inq._id + "not_reachable"}
                                                        className="text-[10px] font-bold px-2 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center gap-1"
                                                    >
                                                        {quickSavingId === inq._id + "not_reachable"
                                                            ? <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                                            : <PhoneOff className="w-2.5 h-2.5" />}
                                                        No Answer
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => quickPatch(inq, "resolved")}
                                                    disabled={quickSavingId === inq._id + "resolved"}
                                                    className="text-[10px] font-bold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors disabled:opacity-50 flex items-center gap-1"
                                                >
                                                    {quickSavingId === inq._id + "resolved"
                                                        ? <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                                        : <CheckCircle2 className="w-2.5 h-2.5" />}
                                                    Done
                                                </button>
                                            </>
                                        )}
                                        <Button
                                            variant="ghost" size="sm"
                                            onClick={() => openSheet(inq)}
                                            className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        {user?.role !== "employee" && (
                                            <Button
                                                variant="ghost" size="sm"
                                                onClick={() => setDeleteId(inq._id)}
                                                className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <PaginationBar pagination={pagination} onPageChange={onPageChange} count={inquiries.length} />
            </div>

            {/* ── Mobile cards ── */}
            <div className="md:hidden space-y-2">
                {inquiries.map((inq) => (
                    <div
                        key={inq._id}
                        className="bg-white rounded-xl border border-slate-200 p-4 active:bg-slate-50 transition-colors shadow-sm"
                        onClick={() => openSheet(inq)}
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0 shadow-sm">
                                <span className="text-sm font-bold text-white">
                                    {inq.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-sm font-semibold text-slate-900">{inq.name}</p>
                                    <StatusPill status={inq.status} />
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">{inq.phone} · {inq.email}</p>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    <span className={cn(
                                        "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                                        inq.insuranceType === "term"
                                            ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                            : "bg-teal-50 text-teal-700 border-teal-200"
                                    )}>
                                        {inq.insuranceType === "term" ? "Term Life" : "Health"}
                                    </span>
                                    <span className="text-[10px] text-slate-400">{inq.state}</span>
                                    <span className="text-[10px] text-slate-300">·</span>
                                    <span className="text-[10px] text-slate-400">{formatDateTime(inq.createdAt)}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm" onClick={() => openSheet(inq)} className="h-7 w-7 p-0 text-slate-400">
                                    <Eye className="w-3.5 h-3.5" />
                                </Button>
                                {user?.role !== "employee" && (
                                    <Button variant="ghost" size="sm" onClick={() => setDeleteId(inq._id)} className="h-7 w-7 p-0 text-slate-400 hover:text-red-500">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <PaginationBar pagination={pagination} onPageChange={onPageChange} count={inquiries.length} />
            </div>

            {/* ── Detail Sheet ── */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="w-full sm:max-w-md p-0 overflow-hidden flex flex-col" side="right" showCloseButton={false}>
                    {/* Visually-hidden title/description required by Radix for accessibility */}
                    <SheetTitle className="sr-only">{selected?.name ?? "Inquiry Detail"}</SheetTitle>
                    <SheetDescription className="sr-only">View and update inquiry details for {selected?.name}</SheetDescription>
                    {selected && (
                        <>
                            {/* Header */}
                            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 px-6 py-5 shrink-0">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                            <span className="text-lg font-bold text-white">
                                                {selected.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-base leading-tight">{selected.name}</p>
                                            <p className="text-emerald-100 text-xs mt-0.5">
                                                Submitted {formatDateTime(selected.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSheetOpen(false)}
                                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                                {/* Status + Type pills */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={cn(
                                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30"
                                    )}>
                                        {STATUS_CONFIG[selected.status]?.icon}
                                        {STATUS_CONFIG[selected.status]?.label}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30">
                                        <Shield className="w-3 h-3" />
                                        {selected.insuranceType === "term" ? "Term Life" : "Health"}
                                    </span>
                                </div>
                            </div>

                            {/* Scrollable body */}
                            <div className="flex-1 overflow-y-auto">
                                {/* Contact details */}
                                <div className="px-6 py-5 space-y-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact Information</p>

                                    <div className="grid grid-cols-1 gap-3">
                                        <InfoCard icon={<Phone className="w-4 h-4 text-emerald-600" />} label="Mobile" value={selected.phone} bg="bg-emerald-50" />
                                        <InfoCard icon={<Mail className="w-4 h-4 text-blue-600" />} label="Email" value={selected.email} bg="bg-blue-50" />
                                        <div className="grid grid-cols-2 gap-3">
                                            <InfoCard icon={<MapPin className="w-4 h-4 text-purple-600" />} label="State" value={selected.state} bg="bg-purple-50" />
                                            <InfoCard icon={<Languages className="w-4 h-4 text-orange-600" />} label="Language" value={selected.language} bg="bg-orange-50" />
                                        </div>
                                    </div>
                                </div>

                                {/* Preferred slot */}
                                {selected.preferredSlot && (
                                    <div className="px-6 pb-5">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Preferred Call Time</p>
                                        <SlotPanelCard raw={selected.preferredSlot} status={selected.status} />
                                    </div>
                                )}

                                {/* Message */}
                                {selected.message && (
                                    <div className="px-6 pb-5">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Message</p>
                                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                            <div className="flex items-start gap-2">
                                                <StickyNote className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                                <p className="text-sm text-slate-700 leading-relaxed">{selected.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Status History — always visible */}
                                <div className="px-6 pb-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            Status History
                                        </p>
                                        {selected.statusHistory && selected.statusHistory.length > 0 && (
                                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                                                {selected.statusHistory.length} change{selected.statusHistory.length !== 1 ? "s" : ""}
                                            </span>
                                        )}
                                    </div>
                                    {selected.statusHistory && selected.statusHistory.length > 0 ? (
                                        <StatusHistoryTimeline history={selected.statusHistory} />
                                    ) : (
                                        <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100 border-dashed">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                                <Clock className="w-4 h-4 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-slate-500">No status changes yet</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">
                                                    Status changes will appear here after you update this inquiry
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Divider */}
                                <div className="mx-6 border-t border-slate-100" />

                                {/* Update status */}
                                <div className="px-6 py-5 space-y-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Update Inquiry</p>

                                    <div>
                                        <label className="text-xs font-semibold text-slate-600 block mb-2">Status</label>
                                        <Select value={editStatus} onValueChange={(v) => setEditStatus(v as InquiryStatus)}>
                                            <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50 text-sm font-medium focus:ring-emerald-500 focus:border-emerald-400">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                                                    <SelectItem key={val} value={val}>
                                                        <div className="flex items-center gap-2">
                                                            <span className={cn("w-2 h-2 rounded-full", cfg.dot)} />
                                                            {cfg.label}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-slate-600 block mb-2">Notes</label>
                                        <Textarea
                                            value={editNotes}
                                            onChange={(e) => setEditNotes(e.target.value)}
                                            placeholder="Add notes about this inquiry…"
                                            rows={4}
                                            className="rounded-xl border-slate-200 bg-slate-50 text-sm resize-none focus:ring-emerald-500 focus:border-emerald-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Footer CTA */}
                            <div className="px-6 py-4 border-t border-slate-100 bg-white shrink-0">
                                <Button
                                    className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-sm transition-all"
                                    onClick={handleSave}
                                    disabled={saving}
                                >
                                    {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</> : "Save Changes"}
                                </Button>
                                {user?.role !== "employee" && (
                                    <button
                                        onClick={() => { setSheetOpen(false); setDeleteId(selected._id) }}
                                        className="w-full mt-2 text-xs text-red-400 hover:text-red-600 transition-colors py-1"
                                    >
                                        Delete this inquiry
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>

            {/* Delete confirm */}
            <ConfirmDialog
                open={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Delete Inquiry"
                description="This will permanently delete the inquiry and all associated data. This action cannot be undone."
                confirmLabel="Delete"
                loading={deleteLoading}
                onConfirm={handleDelete}
            />
        </>
    )
}

/* ── Pagination bar ── */
function PaginationBar({
    pagination, onPageChange, count,
}: {
    pagination: { page: number; pages: number; total: number }
    onPageChange: (page: number) => void
    count: number
}) {
    if (pagination.pages <= 1) return null

    const { page, pages, total } = pagination

    // Generate page numbers: show first, last, current ±1, with ellipsis
    const pageNums: (number | "…")[] = []
    const range = new Set<number>()
    range.add(1)
    range.add(pages)
    for (let i = Math.max(2, page - 1); i <= Math.min(pages - 1, page + 1); i++) range.add(i)

    const sorted = Array.from(range).sort((a, b) => a - b)
    sorted.forEach((n, i) => {
        if (i > 0 && n > sorted[i - 1] + 1) pageNums.push("…")
        pageNums.push(n)
    })

    return (
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <p className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-700">{count}</span> of <span className="font-semibold text-slate-700">{total}</span> inquiries
            </p>
            <div className="flex items-center gap-1">
                <Button
                    variant="outline" size="sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                    className="h-8 w-8 p-0 rounded-lg border-slate-200 hover:border-emerald-300 hover:text-emerald-600 disabled:opacity-40"
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>

                {pageNums.map((n, i) =>
                    n === "…" ? (
                        <span key={`ell-${i}`} className="px-1 text-xs text-slate-400">…</span>
                    ) : (
                        <button
                            key={n}
                            onClick={() => onPageChange(n)}
                            className={cn(
                                "h-8 min-w-[32px] px-2 rounded-lg text-xs font-semibold transition-all",
                                n === page
                                    ? "bg-emerald-600 text-white shadow-sm"
                                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                            )}
                        >
                            {n}
                        </button>
                    )
                )}

                <Button
                    variant="outline" size="sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= pages}
                    className="h-8 w-8 p-0 rounded-lg border-slate-200 hover:border-emerald-300 hover:text-emerald-600 disabled:opacity-40"
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}

/* ── Info card ── */
function InfoCard({ icon, label, value, bg }: { icon: React.ReactNode; label: string; value: string; bg: string }) {
    return (
        <div className={cn("rounded-xl p-3 border border-slate-100 flex items-start gap-3", bg)}>
            <div className="shrink-0 mt-0.5">{icon}</div>
            <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                <p className="text-sm font-semibold text-slate-800 break-all leading-snug mt-0.5">{value}</p>
            </div>
        </div>
    )
}

/* ── Slot panel card — live urgency-aware ── */
function SlotPanelCard({ raw, status }: { raw: string; status: string }) {
    const now = useNow()
    const urgency = slotUrgency(raw, now, status)

    const THEME = {
        overdue:  {
            wrap:  "bg-red-50 border-red-200",
            icon:  "bg-red-100",
            iconC: "text-red-600",
            label: "text-red-500",
            value: "text-red-800",
            badge: "bg-red-100 text-red-700 border-red-300",
            dot:   "bg-red-500 animate-pulse",
            tag:   "⚠ OVERDUE — contact immediately",
        },
        imminent: {
            wrap:  "bg-orange-50 border-orange-200",
            icon:  "bg-orange-100",
            iconC: "text-orange-600",
            label: "text-orange-500",
            value: "text-orange-800",
            badge: "bg-orange-100 text-orange-700 border-orange-300",
            dot:   "bg-orange-500 animate-pulse",
            tag:   "🔔 Call in < 15 minutes!",
        },
        soon: {
            wrap:  "bg-amber-50 border-amber-200",
            icon:  "bg-amber-100",
            iconC: "text-amber-600",
            label: "text-amber-600",
            value: "text-amber-900",
            badge: "bg-amber-100 text-amber-700 border-amber-200",
            dot:   "bg-amber-400",
            tag:   "⏰ Call within 1 hour",
        },
        upcoming: {
            wrap:  "bg-emerald-50 border-emerald-100",
            icon:  "bg-emerald-100",
            iconC: "text-emerald-700",
            label: "text-emerald-600",
            value: "text-emerald-900",
            badge: "",
            dot:   "bg-emerald-400",
            tag:   "",
        },
        done: {
            wrap:  "bg-slate-50 border-slate-200",
            icon:  "bg-slate-100",
            iconC: "text-slate-500",
            label: "text-slate-500",
            value: "text-slate-700",
            badge: "bg-slate-100 text-slate-600 border-slate-200",
            dot:   "",
            tag:   "✓ Already handled",
        },
        none: {
            wrap:  "bg-slate-50 border-slate-100",
            icon:  "bg-slate-100",
            iconC: "text-slate-500",
            label: "text-slate-500",
            value: "text-slate-700",
            badge: "",
            dot:   "",
            tag:   "",
        },
    }[urgency]

    function formatCountdown(): string {
        const slot = new Date(raw)
        const diff = Math.abs(slot.getTime() - now.getTime())
        const h = Math.floor(diff / 3_600_000)
        const m = Math.floor((diff % 3_600_000) / 60_000)
        const s = Math.floor((diff % 60_000) / 1_000)
        if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
        return `${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
    }

    return (
        <div className={cn("rounded-xl p-4 border flex flex-col gap-3", THEME.wrap)}>
            {/* Top row */}
            <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", THEME.icon)}>
                    <Clock className={cn("w-5 h-5", THEME.iconC)} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className={cn("text-[10px] font-bold uppercase tracking-widest", THEME.label)}>
                        Requested Call Slot
                    </p>
                    <p className={cn("text-sm font-bold mt-0.5", THEME.value)}>
                        {formatSlot(raw)}
                    </p>
                </div>
                {THEME.dot && (
                    <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", THEME.dot)} />
                )}
            </div>

            {/* Countdown / tag */}
            {(urgency === "overdue" || urgency === "imminent" || urgency === "soon") && (
                <div className={cn(
                    "rounded-lg px-3 py-2 text-xs font-semibold border flex items-center justify-between gap-2",
                    THEME.badge
                )}>
                    <span>{THEME.tag}</span>
                    <span className="font-mono font-bold text-sm">{formatCountdown()}</span>
                </div>
            )}
            {urgency === "upcoming" && (
                <div className="rounded-lg px-3 py-2 bg-emerald-100/60 border border-emerald-200 text-xs font-semibold text-emerald-700 flex items-center justify-between">
                    <span>Time until call</span>
                    <span className="font-mono font-bold text-sm">{formatCountdown()}</span>
                </div>
            )}
            {urgency === "done" && THEME.tag && (
                <div className={cn(
                    "rounded-lg px-3 py-2 text-xs font-semibold border flex items-center gap-2",
                    THEME.badge
                )}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{THEME.tag}</span>
                </div>
            )}
        </div>
    )
}

/* ── Status History Timeline ── */
const STATUS_COLORS: Record<InquiryStatus, { dot: string; bg: string; text: string; label: string }> = {
    new:          { dot: "bg-blue-500",    bg: "bg-blue-50",    text: "text-blue-700",    label: "New" },
    contacted:    { dot: "bg-amber-500",   bg: "bg-amber-50",   text: "text-amber-700",   label: "Contacted" },
    resolved:     { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", label: "Resolved" },
    not_reachable:{ dot: "bg-red-500",     bg: "bg-red-50",     text: "text-red-700",     label: "Not Reachable" },
}

function StatusHistoryTimeline({ history }: { history: StatusHistoryEntry[] }) {
    // Show most recent first
    const sorted = [...history].sort(
        (a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime()
    )
    return (
        <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-3 bottom-3 w-px bg-slate-200" />
            <div className="space-y-3">
                {sorted.map((entry, i) => {
                    const cfg = STATUS_COLORS[entry.status] ?? STATUS_COLORS.new
                    const when = new Date(entry.changedAt)
                    const dateStr = when.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                    const timeStr = when.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })
                    return (
                        <div key={i} className="flex items-start gap-3 relative">
                            {/* Dot */}
                            <div className={cn(
                                "w-[22px] h-[22px] rounded-full border-2 border-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 z-10",
                                cfg.dot
                            )}>
                                <span className="w-2 h-2 rounded-full bg-white/80" />
                            </div>
                            {/* Content */}
                            <div className={cn("flex-1 rounded-xl px-3 py-2 border border-slate-100", cfg.bg)}>
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                    <span className={cn("text-xs font-bold", cfg.text)}>{cfg.label}</span>
                                    <span className="text-[10px] text-slate-400 font-mono">{timeStr} · {dateStr}</span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                    By <span className="font-semibold text-slate-600">{entry.changedBy}</span>
                                </p>
                                {entry.note && (
                                    <p className="text-[11px] text-slate-500 mt-1 italic border-t border-slate-200/60 pt-1">
                                        "{entry.note}"
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}