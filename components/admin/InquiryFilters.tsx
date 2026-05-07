"use client"

import { Search, X, Filter } from "lucide-react"
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

export default function InquiryFilters({
    filters, onFilter, onReset, activeCount,
}: InquiryFiltersProps) {
    const { user } = useAuth()

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Filters</span>
                {activeCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {activeCount}
                    </span>
                )}
                {activeCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={onReset} className="ml-auto h-7 text-xs text-slate-500">
                        <X className="w-3 h-3 mr-1" /> Clear all
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {/* Search */}
                <div className="relative sm:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search name, phone, email..."
                        value={filters.search}
                        onChange={(e) => onFilter("search", e.target.value)}
                        className="pl-9 h-9"
                    />
                </div>

                {/* Status */}
                <Select value={filters.status} onValueChange={(v) => onFilter("status", v === "all" ? "" : v)}>
                    <SelectTrigger className="h-9">
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
                    <SelectTrigger className="h-9">
                        <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="term">Term Life</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                    </SelectContent>
                </Select>

                {/* State — hidden for employees */}
                {user?.role !== "employee" && (
                    <Select value={filters.state} onValueChange={(v) => onFilter("state", v === "all" ? "" : v)}>
                        <SelectTrigger className="h-9">
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

                {/* Date From */}
                <Input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => onFilter("dateFrom", e.target.value)}
                    className="h-9 text-sm"
                />

                {/* Date To */}
                <Input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => onFilter("dateTo", e.target.value)}
                    className="h-9 text-sm"
                />
            </div>
        </div>
    )
}