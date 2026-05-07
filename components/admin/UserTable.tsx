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
    Sheet, SheetContent, SheetHeader, SheetTitle,
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
    const [editState, setEditState] = useState("")
    const [editLanguage, setEditLanguage] = useState("")

    function openSheet(u: SafeUser) {
        setSelected(u)
        setEditName(u.name)
        setEditRole(u.role)
        setEditStatus(u.status)
        setEditState(u.state || "")
        setEditLanguage(u.language || "")
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
                state: editState,
                language: editLanguage,
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

    return (
        <>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="font-semibold text-slate-700">User</TableHead>
                            <TableHead className="font-semibold text-slate-700">Role</TableHead>
                            <TableHead className="font-semibold text-slate-700">Status</TableHead>
                            <TableHead className="font-semibold text-slate-700">State</TableHead>
                            <TableHead className="font-semibold text-slate-700">Language</TableHead>
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
                                                <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-semibold">
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

                                    {/* Role */}
                                    <TableCell>
                                        <UserRoleBadge role={u.role} />
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell>
                                        <UserStatusBadge status={u.status} />
                                    </TableCell>

                                    {/* State */}
                                    <TableCell>
                                        <span className="text-sm text-slate-600">{u.state || "—"}</span>
                                    </TableCell>

                                    {/* Language */}
                                    <TableCell>
                                        <span className="text-sm text-slate-600">{u.language || "—"}</span>
                                    </TableCell>

                                    {/* Joined */}
                                    <TableCell>
                                        <span className="text-xs text-slate-400">
                                            {formatDateTime(u.createdAt)}
                                        </span>
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {/* Approve pending */}
                                            {u.status === "pending" && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleApprove(u._id)}
                                                    className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50 text-xs gap-1"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Approve
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
                                                className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600"
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
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">
                        <p className="text-xs text-slate-500">
                            Showing {users.length} of {pagination.total} users
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
                            <span className="text-xs px-3 text-slate-600">
                                {pagination.page} / {pagination.pages}
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
                )}
            </div>

            {/* Edit Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="sm:max-w-md overflow-y-auto">
                    {selected && (
                        <>
                            <SheetHeader className="mb-6">
                                <SheetTitle className="flex items-center gap-3">
                                    <Avatar className="w-10 h-10">
                                        <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                                            {selected.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{selected.name}</p>
                                        <p className="text-xs text-slate-400 font-normal">{selected.email}</p>
                                    </div>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="space-y-5">
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

                                {/* State */}
                                <div className="space-y-1.5">
                                    <Label className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> State
                                    </Label>
                                    <Select value={editState} onValueChange={setEditState}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {INDIAN_STATES.map((s) => (
                                                <SelectItem key={s} value={s}>{s}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Language */}
                                <div className="space-y-1.5">
                                    <Label className="flex items-center gap-1">
                                        <Globe className="w-3 h-3" /> Language
                                    </Label>
                                    <Select value={editLanguage} onValueChange={setEditLanguage}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {LANGUAGES.map((l) => (
                                                <SelectItem key={l} value={l}>{l}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700"
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