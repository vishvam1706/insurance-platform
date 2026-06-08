"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { SafeUser, UserRole, UserStatus } from "@/types/user"
import { UserRoleBadge, UserStatusBadge } from "./UserRoleBadge"
import ConfirmDialog from "./ConfirmDialog"
import { formatDateTime, INDIAN_STATES, LANGUAGES } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
    Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    CheckCircle2, XCircle, Trash2, Edit,
    ChevronLeft, ChevronRight, Loader2,
    Users, MapPin, Globe,
} from "lucide-react"

interface UserTableProps {
    users: SafeUser[]
    pagination: { page: number; pages: number; total: number }
    loading: boolean
    onPageChange: (page: number) => void
    onRefetch: () => void
}

export default function UserTable({
    users, pagination, loading, onPageChange, onRefetch,
}: UserTableProps) {
    const { user: authUser } = useAuth()
    const [selected, setSelected] = useState<SafeUser | null>(null)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    // Edit form state
    const [editName, setEditName] = useState("")
    const [editRole, setEditRole] = useState<UserRole>("employee")
    const [editStatus, setEditStatus] = useState<UserStatus>("active")
    const [editStates, setEditStates] = useState<string[]>([])
    const [editLanguages, setEditLanguages] = useState<string[]>([])
    const [editPincodes, setEditPincodes] = useState<string[]>([])
    const [editPincodeInput, setEditPincodeInput] = useState("")

    function openSheet(u: any) {
        setSelected(u)
        setEditName(u.name)
        setEditRole(u.role)
        setEditStatus(u.status)
        setEditStates(u.states || (u.state ? [u.state] : []))
        setEditLanguages(u.languages || (u.language ? [u.language] : []))
        setEditPincodes(u.pincodes || [])
        setEditPincodeInput("")
        setSheetOpen(true)
    }

    async function handleApprove(id: string) {
        try {
            await axios.patch(`/api/users/${id}`, { status: "active" })
            toast.success("Employee approved")
            onRefetch()
        } catch {
            toast.error("Failed to approve employee")
        }
    }

    async function handleDeactivate(id: string) {
        try {
            await axios.patch(`/api/users/${id}`, { status: "inactive" })
            toast.success("User deactivated")
            onRefetch()
        } catch {
            toast.error("Failed to deactivate user")
        }
    }

    async function handleSave() {
        if (!selected) return
        setSaving(true)
        try {
            const payload: Record<string, unknown> = {
                name: editName,
                status: editStatus,
                state: editStates[0] || "",
                language: editLanguages[0] || "",
                states: editStates,
                languages: editLanguages,
                pincodes: editPincodes,
            }
            if (authUser?.role === "super_admin") payload.role = editRole

            await axios.patch(`/api/users/${selected._id}`, payload)
            toast.success("User updated")
            setSheetOpen(false)
            onRefetch()
        } catch (err) {
            toast.error(
                axios.isAxiosError(err)
                    ? err.response?.data?.error ?? "Failed to update"
                    : "Failed to update"
            )
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete() {
        if (!deleteId) return
        setDeleteLoading(true)
        try {
            await axios.delete(`/api/users/${deleteId}`)
            toast.success("User deleted")
            setDeleteId(null)
            onRefetch()
        } catch (err) {
            toast.error(
                axios.isAxiosError(err)
                    ? err.response?.data?.error ?? "Failed to delete"
                    : "Failed to delete"
            )
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

    if (users.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center h-64 text-slate-400">
                <Users className="w-8 h-8 mb-2 opacity-40" />
                <p className="text-sm">No users found</p>
            </div>
        )
    }

    function UserActions({ u }: { u: SafeUser }) {
        const isSelf = u._id === authUser?._id
        return (
            <div className="flex items-center gap-1">
                {/* Approve pending */}
                {u.status === "pending" && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleApprove(u._id)}
                        className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50 text-xs gap-1"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Approve</span>
                    </Button>
                )}

                {/* Deactivate active */}
                {u.status === "active" && !isSelf && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeactivate(u._id)}
                        className="h-8 w-8 p-0 text-slate-400 hover:text-amber-600"
                    >
                        <XCircle className="w-4 h-4" />
                    </Button>
                )}

                {/* Edit */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openSheet(u)}
                    className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-600"
                >
                    <Edit className="w-4 h-4" />
                </Button>

                {/* Delete — super admin only, not self */}
                {authUser?.role === "super_admin" && !isSelf && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(u._id)}
                        className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                )}
            </div>
        )
    }

    return (
        <>
            {/* ── Desktop table (hidden on mobile) ── */}
            <div className="hidden lg:block bg-white rounded-xl border border-slate-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="font-semibold text-slate-700">User</TableHead>
                            <TableHead className="font-semibold text-slate-700">Role</TableHead>
                            <TableHead className="font-semibold text-slate-700">Status</TableHead>
                            <TableHead className="font-semibold text-slate-700">States</TableHead>
                            <TableHead className="font-semibold text-slate-700">Languages</TableHead>
                            <TableHead className="font-semibold text-slate-700">Pincodes</TableHead>
                            <TableHead className="font-semibold text-slate-700">Joined</TableHead>
                            <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((u) => {
                            const initials = u.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                            const isSelf = u._id === authUser?._id

                            return (
                                <TableRow key={u._id} className="hover:bg-slate-50 transition-colors">
                                    {/* User */}
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-9 h-9">
                                                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-semibold">
                                                    {initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">
                                                    {u.name}
                                                    {isSelf && (
                                                        <span className="ml-2 text-xs text-slate-400">(you)</span>
                                                    )}
                                                </p>
                                                <p className="text-xs text-slate-400 truncate max-w-[180px]">{u.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell><UserRoleBadge role={u.role} /></TableCell>
                                    <TableCell><UserStatusBadge status={u.status} /></TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1 max-w-[150px]">
                                            {u.states && u.states.length > 0 ? (
                                                <>
                                                    {u.states.slice(0, 2).map(s => (
                                                        <span key={s} className="text-xs bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">{s}</span>
                                                    ))}
                                                    {u.states.length > 2 && (
                                                        <span 
                                                            className="text-xs bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-medium cursor-help"
                                                            title={u.states.slice(2).join(", ")}
                                                        >
                                                            +{u.states.length - 2} more
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="text-sm text-slate-600">{u.state || "—"}</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1 max-w-[150px]">
                                            {u.languages && u.languages.length > 0 ? (
                                                <>
                                                    {u.languages.slice(0, 2).map(l => (
                                                        <span key={l} className="text-xs bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">{l}</span>
                                                    ))}
                                                    {u.languages.length > 2 && (
                                                        <span 
                                                            className="text-xs bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-medium cursor-help"
                                                            title={u.languages.slice(2).join(", ")}
                                                        >
                                                            +{u.languages.length - 2} more
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="text-sm text-slate-600">{u.language || "—"}</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1 max-w-[180px]">
                                            {u.pincodes && u.pincodes.length > 0 ? (
                                                <>
                                                    {u.pincodes.slice(0, 3).map(p => (
                                                        <span key={p} className="text-xs bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-mono font-medium">{p}</span>
                                                    ))}
                                                    {u.pincodes.length > 3 && (
                                                        <span 
                                                            className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium cursor-help"
                                                            title={u.pincodes.slice(3).join(", ")}
                                                        >
                                                            +{u.pincodes.length - 3} more
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="text-xs text-slate-400">—</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell><span className="text-xs text-slate-400">{formatDateTime(u.createdAt)}</span></TableCell>

                                    <TableCell className="text-right">
                                        <UserActions u={u} />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                <UserPaginationBar users={users} pagination={pagination} onPageChange={onPageChange} />
            </div>

            {/* ── Mobile card list ── */}
            <div className="lg:hidden space-y-2">
                {users.map((u) => {
                    const initials = u.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                    const isSelf = u._id === authUser?._id

                    return (
                        <div
                            key={u._id}
                            className="bg-white rounded-xl border border-slate-200 p-3 transition-colors"
                        >
                            <div className="flex items-start gap-2.5">
                                {/* Avatar */}
                                <Avatar className="w-9 h-9 shrink-0">
                                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-semibold">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <p className="text-sm font-semibold text-slate-900 truncate">
                                            {u.name}
                                            {isSelf && <span className="text-xs text-slate-400 font-normal ml-1">(you)</span>}
                                        </p>
                                        <UserRoleBadge role={u.role} />
                                        <UserStatusBadge status={u.status} />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-0.5 truncate">{u.email}</p>
                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 flex-wrap">
                                        {u.state && <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" />{u.state}</span>}
                                        {u.language && <span className="flex items-center gap-0.5"><Globe className="w-2.5 h-2.5" />{u.language}</span>}
                                        <span>{formatDateTime(u.createdAt)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions row */}
                            <div className="mt-2 pt-2 border-t border-slate-100 flex justify-end">
                                <UserActions u={u} />
                            </div>
                        </div>
                    )
                })}

                <UserPaginationBar users={users} pagination={pagination} onPageChange={onPageChange} />
            </div>

            {/* Edit Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto p-0">
                    {selected && (
                        <>
                            <SheetHeader className="mb-2 p-6 pb-0">
                                <SheetTitle className="flex items-center gap-3">
                                    <Avatar className="w-10 h-10">
                                        <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                                            {selected.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{selected.name}</p>
                                        <p className="text-xs text-slate-400 font-normal">{selected.email}</p>
                                    </div>
                                </SheetTitle>
                                <SheetDescription className="sr-only">
                                    Edit user roles, status, and lead assignments.
                                </SheetDescription>
                            </SheetHeader>

                            <div className="space-y-5 px-6 pb-6">
                                {/* Name */}
                                <div className="space-y-1.5">
                                    <Label>Full Name</Label>
                                    <Input
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                    />
                                </div>

                                {/* Role — super admin only */}
                                {authUser?.role === "super_admin" && (
                                    <div className="space-y-1.5">
                                        <Label>Role</Label>
                                        <Select value={editRole} onValueChange={(v) => setEditRole(v as UserRole)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="super_admin">Super Admin</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="employee">Employee</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {/* Status */}
                                <div className="space-y-1.5">
                                    <Label>Status</Label>
                                    <Select value={editStatus} onValueChange={(v) => setEditStatus(v as UserStatus)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {editRole === "employee" && (
                                    <>
                                        {/* States */}
                                        <div className="space-y-1.5">
                                            <Label className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3 text-slate-400" /> States <span className="text-slate-400 text-xs">(Select multiple)</span>
                                            </Label>
                                            <div className="h-36 overflow-y-auto border border-slate-200 rounded-xl p-2.5 space-y-1 bg-slate-50/30 scrollbar-thin">
                                                {INDIAN_STATES.map((s) => (
                                                    <label key={s} className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-150">
                                                        <input
                                                            type="checkbox"
                                                            checked={editStates.includes(s)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) setEditStates([...editStates, s]);
                                                                else setEditStates(editStates.filter((x) => x !== s));
                                                            }}
                                                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                                                        />
                                                        <span>{s}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Languages */}
                                        <div className="space-y-1.5">
                                            <Label className="flex items-center gap-1">
                                                <Globe className="w-3 h-3 text-slate-400" /> Languages <span className="text-slate-400 text-xs">(Select multiple)</span>
                                            </Label>
                                            <div className="h-36 overflow-y-auto border border-slate-200 rounded-xl p-2.5 space-y-1 bg-slate-50/30 scrollbar-thin">
                                                {LANGUAGES.map((l) => (
                                                    <label key={l} className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-150">
                                                        <input
                                                            type="checkbox"
                                                            checked={editLanguages.includes(l)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) setEditLanguages([...editLanguages, l]);
                                                                else setEditLanguages(editLanguages.filter((x) => x !== l));
                                                            }}
                                                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                                                        />
                                                        <span>{l}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Pincodes */}
                                        <div className="space-y-1.5">
                                            <Label className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3 text-slate-400" /> Pincodes
                                            </Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Type pincode & press Enter or comma"
                                                    value={editPincodeInput}
                                                    onChange={(e) => setEditPincodeInput(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" || e.key === "," || e.key === " ") {
                                                            e.preventDefault();
                                                            const val = editPincodeInput.trim().replace(/[^0-9]/g, "");
                                                            if (/^\d{6}$/.test(val)) {
                                                                if (!editPincodes.includes(val)) {
                                                                    setEditPincodes([...editPincodes, val]);
                                                                }
                                                                setEditPincodeInput("");
                                                            } else if (val) {
                                                                toast.error("Pincode must be exactly 6 digits");
                                                            }
                                                        }
                                                    }}
                                                    onBlur={() => {
                                                        const val = editPincodeInput.trim().replace(/[^0-9]/g, "");
                                                        if (/^\d{6}$/.test(val)) {
                                                            if (!editPincodes.includes(val)) {
                                                                    setEditPincodes([...editPincodes, val]);
                                                            }
                                                            setEditPincodeInput("");
                                                        }
                                                    }}
                                                    className="rounded-xl"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => {
                                                        const val = editPincodeInput.trim().replace(/[^0-9]/g, "");
                                                        if (/^\d{6}$/.test(val)) {
                                                            if (!editPincodes.includes(val)) {
                                                                setEditPincodes([...editPincodes, val]);
                                                            }
                                                            setEditPincodeInput("");
                                                        } else {
                                                            toast.error("Pincode must be exactly 6 digits");
                                                        }
                                                    }}
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                            {editPincodes.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 p-2 border border-slate-200 rounded-xl bg-slate-50/30 max-h-24 overflow-y-auto mt-2">
                                                    {editPincodes.map((p) => (
                                                        <span
                                                            key={p}
                                                            className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                        >
                                                            {p}
                                                            <button
                                                                type="button"
                                                                onClick={() => setEditPincodes(editPincodes.filter((x) => x !== p))}
                                                                className="hover:text-red-500 font-bold ml-1 text-xs"
                                                            >
                                                                &times;
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                <Button
                                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                                    onClick={handleSave}
                                    disabled={saving}
                                >
                                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Changes
                                </Button>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>

            {/* Delete confirm */}
            <ConfirmDialog
                open={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                title="Delete User"
                description="This will permanently delete the user account. They will lose all access. This cannot be undone."
                confirmLabel="Delete User"
                loading={deleteLoading}
                onConfirm={handleDelete}
            />
        </>
    )
}

/* ── Shared pagination bar ── */
function UserPaginationBar({
    users, pagination, onPageChange,
}: {
    users: SafeUser[]
    pagination: { page: number; pages: number; total: number }
    onPageChange: (page: number) => void
}) {
    if (pagination.pages <= 1) return null
    return (
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-t border-slate-200 bg-white rounded-b-xl">
            <p className="text-[11px] sm:text-xs text-slate-500">
                {users.length} of {pagination.total}
            </p>
            <div className="flex items-center gap-1">
                <Button
                    variant="outline" size="sm"
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
                    variant="outline" size="sm"
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