"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { IInquiry, InquiryStatus } from "@/types/inquiry"
import InquiryStatusBadge from "./InquiryStatusBadge"
import ConfirmDialog from "./ConfirmDialog"
import { formatDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    ChevronLeft,
    ChevronRight,
    Trash2,
    Eye,
    Phone,
    Mail,
    MapPin,
    Calendar,
    MessageSquare,
    Loader2,
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

export default function InquiryTable({
    inquiries, pagination, loading, onPageChange, onRefetch,
}: InquiryTableProps) {
    const { user } = useAuth()
    const [selected, setSelected] = useState<IInquiry | null>(null)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [editStatus, setEditStatus] = useState<InquiryStatus>("new")
    const [editNotes, setEditNotes] = useState("")

    function openSheet(inq: IInquiry) {
        setSelected(inq)
        setEditStatus(inq.status)
        setEditNotes(inq.notes || "")
        setSheetOpen(true)
    }

    async function handleSave() {
        if (!selected) return
        setSaving(true)
        try {
            await axios.patch(`/api/inquiries/${selected._id}`, {
                status: editStatus,
                notes: editNotes,
            })
            toast.success("Inquiry updated")
            setSheetOpen(false)
            onRefetch()
        } catch {
            toast.error("Failed to update inquiry")
        } finally {
            setSaving(false)
        }
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
        } finally {
            setDeleteLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 flex items-center justify-center h-64">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
        )
    }

    if (inquiries.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center h-64 text-slate-400">
                <MessageSquare className="w-8 h-8 mb-2 opacity-40" />
                <p className="text-sm">No inquiries found</p>
                <p className="text-xs mt-1">Try changing your filters</p>
            </div>
        )
    }

    return (
        <>
            {/* ── Desktop table (hidden on mobile) ── */}
            <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="font-semibold text-slate-700">Name</TableHead>
                            <TableHead className="font-semibold text-slate-700">Contact</TableHead>
                            <TableHead className="font-semibold text-slate-700">Type</TableHead>
                            <TableHead className="font-semibold text-slate-700">State</TableHead>
                            <TableHead className="font-semibold text-slate-700">Status</TableHead>
                            <TableHead className="font-semibold text-slate-700">Date</TableHead>
                            <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inquiries.map((inq) => (
                            <TableRow key={inq._id} className="hover:bg-slate-50 transition-colors">
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                            <span className="text-xs font-semibold text-emerald-700">
                                                {inq.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-900">{inq.name}</span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="space-y-0.5">
                                        <p className="text-sm text-slate-700">{inq.phone}</p>
                                        <p className="text-xs text-slate-400 truncate max-w-[160px]">{inq.email}</p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${inq.insuranceType === "term"
                                            ? "bg-indigo-50 text-indigo-700"
                                            : "bg-teal-50 text-teal-700"
                                        }`}>
                                        {inq.insuranceType === "term" ? "Term Life" : "Health"}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    <span className="text-sm text-slate-600">{inq.state}</span>
                                </TableCell>

                                <TableCell>
                                    <InquiryStatusBadge status={inq.status} />
                                </TableCell>

                                <TableCell>
                                    <span className="text-xs text-slate-400">
                                        {formatDateTime(inq.createdAt)}
                                    </span>
                                </TableCell>

                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openSheet(inq)}
                                            className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-600"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        {user?.role !== "employee" && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setDeleteId(inq._id)}
                                                className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
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

                {/* Pagination — desktop */}
                <PaginationBar inquiries={inquiries} pagination={pagination} onPageChange={onPageChange} />
            </div>

            {/* ── Mobile card list ── */}
            <div className="md:hidden space-y-2">
                {inquiries.map((inq) => (
                    <div
                        key={inq._id}
                        className="bg-white rounded-xl border border-slate-200 p-3 active:bg-slate-50 transition-colors"
                        onClick={() => openSheet(inq)}
                    >
                        <div className="flex items-start gap-2.5">
                            {/* Avatar */}
                            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-emerald-700">
                                    {inq.name.charAt(0).toUpperCase()}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-sm font-semibold text-slate-900 truncate">{inq.name}</p>
                                    <InquiryStatusBadge status={inq.status} />
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">{inq.phone} · {inq.email}</p>
                                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                    <span className={cn(
                                        "text-[10px] font-medium px-1.5 py-0.5 rounded",
                                        inq.insuranceType === "term" ? "bg-indigo-50 text-indigo-700" : "bg-teal-50 text-teal-700"
                                    )}>
                                        {inq.insuranceType === "term" ? "Term Life" : "Health"}
                                    </span>
                                    <span className="text-[10px] text-slate-400">{inq.state}</span>
                                    <span className="text-[10px] text-slate-400">·</span>
                                    <span className="text-[10px] text-slate-400">{formatDateTime(inq.createdAt)}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-1 shrink-0">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => { e.stopPropagation(); openSheet(inq) }}
                                    className="h-7 w-7 p-0 text-slate-400"
                                >
                                    <Eye className="w-3.5 h-3.5" />
                                </Button>
                                {user?.role !== "employee" && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => { e.stopPropagation(); setDeleteId(inq._id) }}
                                        className="h-7 w-7 p-0 text-slate-400 hover:text-red-500"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Pagination — mobile */}
                <PaginationBar inquiries={inquiries} pagination={pagination} onPageChange={onPageChange} />
            </div>

            {/* Detail Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    {selected && (
                        <>
                            <SheetHeader className="mb-6">
                                <SheetTitle className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <span className="font-bold text-emerald-700">
                                            {selected.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{selected.name}</p>
                                        <InquiryStatusBadge status={selected.status} />
                                    </div>
                                </SheetTitle>
                            </SheetHeader>

                            {/* Contact info */}
                            <div className="space-y-3 mb-6">
                                <DetailRow icon={<Phone className="w-4 h-4" />} label="Phone" value={selected.phone} />
                                <DetailRow icon={<Mail className="w-4 h-4" />} label="Email" value={selected.email} />
                                <DetailRow icon={<MapPin className="w-4 h-4" />} label="State" value={`${selected.state} · ${selected.language}`} />
                                <DetailRow
                                    icon={<MessageSquare className="w-4 h-4" />}
                                    label="Insurance Type"
                                    value={selected.insuranceType === "term" ? "Term Life Insurance" : "Health Insurance"}
                                />
                                {selected.preferredSlot && (
                                    <DetailRow
                                        icon={<Calendar className="w-4 h-4" />}
                                        label="Preferred Call Slot"
                                        value={selected.preferredSlot}
                                    />
                                )}
                                {selected.message && (
                                    <div className="bg-slate-50 rounded-lg p-3">
                                        <p className="text-xs font-medium text-slate-500 mb-1">Message</p>
                                        <p className="text-sm text-slate-700">{selected.message}</p>
                                    </div>
                                )}
                            </div>

                            {/* Update status & notes */}
                            <div className="space-y-4 border-t border-slate-200 pt-6">
                                <div>
                                    <label className="text-sm font-medium text-slate-700 block mb-2">
                                        Update Status
                                    </label>
                                    <Select
                                        value={editStatus}
                                        onValueChange={(v) => setEditStatus(v as InquiryStatus)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new">New</SelectItem>
                                            <SelectItem value="contacted">Contacted</SelectItem>
                                            <SelectItem value="resolved">Resolved</SelectItem>
                                            <SelectItem value="not_reachable">Not Reachable</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700 block mb-2">
                                        Notes
                                    </label>
                                    <Textarea
                                        value={editNotes}
                                        onChange={(e) => setEditNotes(e.target.value)}
                                        placeholder="Add notes about this inquiry..."
                                        rows={4}
                                    />
                                </div>

                                <Button
                                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                                    onClick={handleSave}
                                    disabled={saving}
                                >
                                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Changes
                                </Button>
                            </div>

                            <p className="text-xs text-slate-400 text-center mt-4">
                                Created {formatDateTime(selected.createdAt)}
                            </p>
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

/* ── Shared pagination bar ── */
function PaginationBar({
    inquiries, pagination, onPageChange,
}: {
    inquiries: IInquiry[]
    pagination: { page: number; pages: number; total: number }
    onPageChange: (page: number) => void
}) {
    if (pagination.pages <= 1) return null
    return (
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-t border-slate-200 bg-white rounded-b-xl">
            <p className="text-[11px] sm:text-xs text-slate-500">
                {inquiries.length} of {pagination.total}
            </p>
            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="h-8 w-8 p-0"
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-xs px-2 sm:px-3 text-slate-600">
                    {pagination.page}/{pagination.pages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="h-8 w-8 p-0"
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}

function DetailRow({
    icon, label, value,
}: {
    icon: React.ReactNode
    label: string
    value: string
}) {
    return (
        <div className="flex items-start gap-3">
            <span className="text-slate-400 mt-0.5 shrink-0">{icon}</span>
            <div className="min-w-0">
                <p className="text-xs text-slate-500 font-medium">{label}</p>
                <p className="text-sm text-slate-900 break-words">{value}</p>
            </div>
        </div>
    )
}