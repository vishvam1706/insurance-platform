"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { toast } from "sonner"
import { SafeUser } from "@/types/user"
import { useAuth } from "@/hooks/useAuth"
import { useDebounce } from "@/hooks/useDebounce"
import UserTable from "@/components/admin/UserTable"
import AddUserDialog from "@/components/admin/AddUserDialog"
import { Input } from "@/components/ui/input"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
    Users, Search, Clock,
} from "lucide-react"

interface Pagination {
    page: number; limit: number; total: number; pages: number
}

export default function UsersPage() {
    const { user: authUser } = useAuth()
    const [users, setUsers] = useState<SafeUser[]>([])
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 })
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [roleFilter, setRoleFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")

    const debouncedSearch = useDebounce(search, 400)

    const fetchUsers = useCallback(async (page = 1) => {
        setLoading(true)
        try {
            const params: Record<string, string> = { page: String(page), limit: "20" }
            if (debouncedSearch) params.search = debouncedSearch
            if (roleFilter) params.role = roleFilter
            if (statusFilter) params.status = statusFilter

            const res = await axios.get("/api/users", { params })
            setUsers(res.data.users)
            setPagination(res.data.pagination)
        } catch {
            toast.error("Failed to load users")
        } finally {
            setLoading(false)
        }
    }, [debouncedSearch, roleFilter, statusFilter])

    useEffect(() => { fetchUsers(1) }, [fetchUsers])

    const pendingCount = users.filter((u) => u.status === "pending").length

    return (
        <div className="space-y-3 sm:space-y-5 pt-3 sm:pt-5 lg:pt-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2">
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                        Users
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1">
                        Manage admin and employee accounts — {pagination.total} total
                    </p>
                </div>
                <AddUserDialog onSuccess={() => fetchUsers(1)} />
            </div>

            {/* Pending alert */}
            {pendingCount > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                            <Clock className="w-4 h-4 text-amber-600" />
                        </div>
                        <p className="text-xs sm:text-sm text-amber-900">
                            <span className="font-semibold">{pendingCount} employee{pendingCount > 1 ? "s" : ""}</span>
                            {" "}awaiting approval
                        </p>
                    </div>
                    <Badge className="bg-amber-200 text-amber-800 sm:ml-auto shrink-0">
                        {pendingCount} pending
                    </Badge>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Role filter */}
                    <Select
                        value={roleFilter}
                        onValueChange={(v) => setRoleFilter(v === "all" ? "" : v)}
                    >
                        <SelectTrigger className="w-full sm:w-44">
                            <SelectValue placeholder="All roles" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All roles</SelectItem>
                            <SelectItem value="super_admin">Super Admin</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="employee">Employee</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Status filter */}
                    <Select
                        value={statusFilter}
                        onValueChange={(v) => setStatusFilter(v === "all" ? "" : v)}
                    >
                        <SelectTrigger className="w-full sm:w-44">
                            <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <UserTable
                users={users}
                pagination={pagination}
                loading={loading}
                onPageChange={(page) => fetchUsers(page)}
                onRefetch={() => fetchUsers(pagination.page)}
            />
        </div>
    )
}