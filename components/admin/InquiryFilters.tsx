"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Search, X, Filter, UserCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { INDIAN_STATES } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

interface Filters {
    status: string
    type: string
    state: string
    assignedTo: string
    search: string
    dateFrom: string
    dateTo: string
}

interface InquiryFiltersProps {
    filters: Filters
    onFilter: (key: keyof Filters, value: string) => void
    onReset: () => void
    activeCount: number
}

interface SimpleEmployee {
    _id: string
    name: string
    email: string
}

export default function InquiryFilters({
    filters, onFilter, onReset, activeCount,
}: InquiryFiltersProps) {
    const { user } = useAuth()
    const isAdmin = user?.role === "admin" || user?.role === "super_admin"
    const [employees, setEmployees] = useState<SimpleEmployee[]>([])

    // Fetch employees for the "Assigned To" filter (admins only)
    useEffect(() => {
        if (!isAdmin) return
        axios.get("/api/users", { params: { role: "employee", status: "active", limit: 200 } })
            .then(res => setEmployees(
                res.data.users?.map((u: any) => ({ _id: u._id, name: u.name, email: u.email })) || []
            ))
            .catch(() => { /* ignore */ })
    }, [isAdmin])

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Filters</span>
                {activeCount > 0 && (
                    <span className="bg-emerald-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {activeCount}
                    </span>
                )}
                {activeCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={onReset} className="ml-auto h-7 text-xs text-slate-500">
                        <X className="w-3 h-3 mr-1" /> Clear all
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3">
                {/* Search */}
                <div className="relative sm:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search name, phone, email..."
                        value={filters.search}
                        onChange={(e) => onFilter("search", e.target.value)}
                        className="pl-9"
                    />
                </div>

                {/* Status */}
                <Select value={filters.status} onValueChange={(v) => onFilter("status", v === "all" ? "" : v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="not_reachable">Not Reachable</SelectItem>
                    </SelectContent>
                </Select>

                {/* Type */}
                <Select value={filters.type} onValueChange={(v) => onFilter("type", v === "all" ? "" : v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="term">Term Life</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                    </SelectContent>
                </Select>

                {/* State — hidden for employees */}
                {isAdmin && (
                    <Select value={filters.state} onValueChange={(v) => onFilter("state", v === "all" ? "" : v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="All states" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All states</SelectItem>
                            {INDIAN_STATES.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {/* Assigned To — admin/super_admin only */}
                {isAdmin && (
                    <Select value={filters.assignedTo} onValueChange={(v) => onFilter("assignedTo", v === "all" ? "" : v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="All employees" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All employees</SelectItem>
                            <SelectItem value="unassigned">
                                <span className="text-amber-600 font-medium">⊘ Unassigned</span>
                            </SelectItem>
                            {employees.map((emp) => (
                                <SelectItem key={emp._id} value={emp._id}>
                                    <div className="flex items-center gap-2">
                                        <UserCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <span>{emp.name}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {/* Date From */}
                <div className="flex flex-col justify-center">
                    <Input
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => onFilter("dateFrom", e.target.value)}
                        className="text-sm"
                        title="From Date"
                    />
                </div>

                {/* Date To */}
                <div className="flex flex-col justify-center">
                    <Input
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => onFilter("dateTo", e.target.value)}
                        className="text-sm"
                        title="To Date"
                    />
                </div>
            </div>
        </div>
    )
}