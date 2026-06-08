"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useInquiries } from "@/hooks/useInquiries"
import { useAuth } from "@/hooks/useAuth"
import InquiryFilters from "@/components/admin/InquiryFilters"
import InquiryTable from "@/components/admin/InquiryTable"
import CsvExportButton from "@/components/admin/CsvExportButton"
import {
    MessageSquare, RadioTower, Clock, Calendar, AlarmClock, AlertTriangle,
    UserCircle2, ChevronDown, ChevronUp,
} from "lucide-react"
import { toast } from "sonner"
import { IInquiry } from "@/types/inquiry"
import { cn } from "@/lib/utils"

// ── Live clock ─────────────────────────────────────────────────────────────────
function LiveClock() {
    const [now, setNow] = useState<Date | null>(null)
    useEffect(() => {
        setNow(new Date())
        const t = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(t)
    }, [])

    const timeStr = now
        ? now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })
        : "--:--:-- --"
    const dateStr = now
        ? now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
        : ""

    return (
        <div className="flex items-center gap-3 bg-slate-900 rounded-2xl px-5 py-3 shadow-lg">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
            <div>
                <p className="text-2xl font-bold text-white font-mono tracking-tight leading-none">{timeStr}</p>
                <p className="text-xs text-slate-400 mt-0.5">{dateStr}</p>
            </div>
        </div>
    )
}

// ── Next slot countdown ─────────────────────────────────────────────────────────
function parseSlot(raw: string): Date | null {
    try { const d = new Date(raw); return isNaN(d.getTime()) ? null : d } catch { return null }
}

function NextCallCountdown({ inquiries }: { inquiries: IInquiry[] }) {
    const [now, setNow] = useState<Date | null>(null)
    useEffect(() => {
        setNow(new Date())
        const t = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(t)
    }, [])

    if (!now) {
        return (
            <div className="flex items-center gap-3 rounded-2xl px-5 py-3 shadow-sm flex-1 border bg-slate-900 border-slate-700">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-slate-800">
                    <AlarmClock className="w-4 h-4 text-slate-400" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Next Scheduled Call</p>
                    <p className="text-sm font-bold text-slate-300 mt-0.5">Loading…</p>
                </div>
            </div>
        )
    }

    // Upcoming: future slots on non-resolved inquiries, sorted soonest first
    const upcoming = inquiries
        .filter(i => i.preferredSlot && i.status !== "resolved")
        .map(i => ({ inq: i, slot: parseSlot(i.preferredSlot!) }))
        .filter(x => x.slot && x.slot > now)
        .sort((a, b) => a.slot!.getTime() - b.slot!.getTime())

    // Missed Slots: past slots where NO attempt was made (status still "new")
    const overdue = inquiries
        .filter(i => i.preferredSlot && i.status === "new")
        .map(i => ({ inq: i, slot: parseSlot(i.preferredSlot!) }))
        .filter(x => x.slot && x.slot <= now)

    // Uncontacted: new inquiries with no slot set at all
    const uncontacted = inquiries.filter(i => i.status === "new" && !i.preferredSlot)

    const next = upcoming[0]

    function formatCountdown(slot: Date): string {
        const diff = Math.max(0, slot.getTime() - now!.getTime())
        const h = Math.floor(diff / 3600000)
        const m = Math.floor((diff % 3600000) / 60000)
        const s = Math.floor((diff % 60000) / 1000)
        if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
        return `${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
    }

    function formatSlotLabel(slot: Date): string {
        return slot.toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true })
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            {/* Next upcoming OR no-schedule state */}
            <div className={`flex items-center gap-3 rounded-2xl px-5 py-3 shadow-sm flex-1 border ${
                next ? "bg-emerald-50 border-emerald-200" : "bg-slate-900 border-slate-700"
            }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    next ? "bg-emerald-100" : "bg-slate-800"
                }`}>
                    <AlarmClock className={`w-4 h-4 ${next ? "text-emerald-600" : "text-slate-400"}`} />
                </div>
                <div className="min-w-0 flex-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${next ? "text-slate-500" : "text-slate-500"}`}>
                        Next Scheduled Call
                    </p>
                    {next ? (
                        <>
                            <p className="text-xl font-bold text-emerald-700 font-mono leading-none">{formatCountdown(next.slot!)}</p>
                            <p className="text-xs text-emerald-600 truncate mt-0.5">{next.inq.name} · {formatSlotLabel(next.slot!)}</p>
                        </>
                    ) : (
                        <>
                            <p className="text-sm font-bold text-slate-300 mt-0.5">No calls scheduled</p>
                            {uncontacted.length > 0 && (
                                <p className="text-xs text-amber-400 mt-0.5">
                                    ⚡ {uncontacted.length} new {uncontacted.length === 1 ? "lead" : "leads"} waiting to be contacted
                                </p>
                            )}
                        </>
                    )}
                </div>
                {/* Upcoming count pill */}
                {upcoming.length > 0 && (
                    <div className="shrink-0 text-center">
                        <p className="text-2xl font-bold text-emerald-700 font-mono leading-none">{upcoming.length}</p>
                        <p className="text-[9px] text-emerald-500 uppercase tracking-wide">queued</p>
                    </div>
                )}
            </div>

            {/* Overdue */}
            {overdue.length > 0 && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-3 shadow-sm">
                    <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">Missed Slots</p>
                        <p className="text-2xl font-bold text-red-700 font-mono leading-none">{overdue.length}</p>
                        <p className="text-xs text-red-500 mt-0.5 max-w-[150px] truncate">
                            {overdue.slice(0, 2).map(x => x.inq.name).join(", ")}
                            {overdue.length > 2 ? ` +${overdue.length - 2} more` : ""}
                        </p>
                    </div>
                </div>
            )}

            {/* Uncontacted leads (only show if no overdue) */}
            {overdue.length === 0 && uncontacted.length > 0 && (
                <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 shadow-sm">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600">Need Contact</p>
                        <p className="text-2xl font-bold text-amber-700 font-mono leading-none">{uncontacted.length}</p>
                        <p className="text-xs text-amber-600 mt-0.5">New leads, no slot</p>
                    </div>
                </div>
            )}
        </div>
    )
}

// ── Employee Workload Cards (Admin/Super Admin only) ────────────────────────
interface EmployeeStat {
    _id: string
    name: string
    email: string
    total: number
    new: number
    contacted: number
    resolved: number
    not_reachable: number
}

function EmployeeWorkload({ onFilterByEmployee }: { onFilterByEmployee: (id: string) => void }) {
    const [stats, setStats] = useState<{ employees: EmployeeStat[]; unassigned: number } | null>(null)
    const [expanded, setExpanded] = useState(true)

    useEffect(() => {
        axios.get("/api/inquiries/stats")
            .then(res => setStats(res.data))
            .catch(() => { /* ignore */ })
    }, [])

    if (!stats) return null

    const totalInquiries = stats.employees.reduce((sum, e) => sum + e.total, 0) + stats.unassigned
    // Sort by active load (new + contacted) descending
    const sorted = [...stats.employees].sort((a, b) => (b.new + b.contacted) - (a.new + a.contacted))

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <UserCircle2 className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-semibold text-slate-800">Employee Workload</span>
                    <span className="text-[10px] font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">
                        {stats.employees.length} employees · {totalInquiries} inquiries
                    </span>
                    {stats.unassigned > 0 && (
                        <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200 animate-pulse">
                            {stats.unassigned} unassigned
                        </span>
                    )}
                </div>
                {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {expanded && (
                <div className="px-5 pb-4">
                    {/* Unassigned card */}
                    {stats.unassigned > 0 && (
                        <button
                            onClick={() => onFilterByEmployee("unassigned")}
                            className="w-full mb-3 flex items-center justify-between bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl px-4 py-3 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                                    <span className="text-amber-600 text-sm font-bold">⊘</span>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-amber-800">Unassigned</p>
                                    <p className="text-[10px] text-amber-600">No employee assigned yet</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-xl font-bold text-amber-700 font-mono">{stats.unassigned}</p>
                                    <p className="text-[9px] text-amber-500 uppercase tracking-wide">leads</p>
                                </div>
                                <span className="text-[10px] text-amber-500 group-hover:text-amber-700 transition-colors">View →</span>
                            </div>
                        </button>
                    )}

                    {/* Employee grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {sorted.map(emp => {
                            const activeLoad = emp.new + emp.contacted
                            const maxActive = Math.max(...sorted.map(e => e.new + e.contacted), 1)
                            const loadPercent = Math.round((activeLoad / maxActive) * 100)
                            const loadColor = loadPercent > 80 ? "bg-red-500" : loadPercent > 50 ? "bg-amber-500" : "bg-emerald-500"

                            return (
                                <button
                                    key={emp._id}
                                    onClick={() => onFilterByEmployee(emp._id)}
                                    className="flex items-center gap-3 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl px-3 py-2.5 transition-all group text-left"
                                >
                                    {/* Avatar */}
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shrink-0 shadow-sm">
                                        <span className="text-xs font-bold text-white">
                                            {emp.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-slate-800 group-hover:text-indigo-700 truncate transition-colors">
                                            {emp.name}
                                        </p>
                                        {/* Mini load bar */}
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className={cn("h-full rounded-full transition-all", loadColor)}
                                                    style={{ width: `${Math.max(loadPercent, 4)}%` }}
                                                />
                                            </div>
                                            <span className="text-[9px] font-mono text-slate-400 shrink-0">{activeLoad}</span>
                                        </div>
                                    </div>

                                    {/* Stats mini badges */}
                                    <div className="flex flex-col items-end gap-0.5 shrink-0">
                                        <div className="flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                            <span className="text-[9px] font-mono text-slate-500">{emp.new}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-1" />
                                            <span className="text-[9px] font-mono text-slate-500">{emp.contacted}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <span className="text-[9px] font-mono text-slate-500">{emp.resolved}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 ml-1" />
                                            <span className="text-[9px] font-mono text-slate-500">{emp.not_reachable}</span>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> New</span>
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Contacted</span>
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Resolved</span>
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Not Reachable</span>
                        <span className="ml-auto font-medium">Click employee to filter</span>
                    </div>
                </div>
            )}
        </div>
    )
}


// ── Page ───────────────────────────────────────────────────────────────────────
export default function InquiriesPage() {
    const { user } = useAuth()
    const { inquiries, pagination, loading,
        filters, updateFilter, resetFilters,
        refetch, liveCount, clearLiveCount } = useInquiries()

    const isAdmin = user?.role === "admin" || user?.role === "super_admin"
    const activeFilterCount = Object.values(filters).filter(Boolean).length

    useEffect(() => {
        if (liveCount > 0) {
            toast.success(`🔔 ${liveCount} new inquiry just arrived!`, {
                description: "The list has been updated automatically.",
                duration: 4000,
            })
        }
    }, [liveCount])

    function handleFilterByEmployee(empId: string) {
        updateFilter("assignedTo", empId)
    }

    return (
        <div className="space-y-4 pt-3 sm:pt-5 lg:pt-6">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                        Inquiries
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live
                        </span>
                        {liveCount > 0 && (
                            <button
                                onClick={clearLiveCount}
                                className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-600 text-white animate-bounce"
                                title="Click to dismiss"
                            >
                                <RadioTower className="w-3 h-3" />
                                +{liveCount} new
                            </button>
                        )}
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                        {user?.role === "employee"
                            ? "Showing leads assigned to you"
                            : `All submitted inquiries — ${pagination.total} total`}
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-end">
                    {isAdmin && (
                        <CsvExportButton
                            filters={{ status: filters.status, type: filters.type, state: filters.state }}
                        />
                    )}
                </div>
            </div>

            {/* ── Time Dashboard ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-3">
                <LiveClock />
                <NextCallCountdown inquiries={inquiries} />
            </div>

            {/* ── Employee Workload (Admin/Super Admin only) ── */}
            {isAdmin && (
                <EmployeeWorkload onFilterByEmployee={handleFilterByEmployee} />
            )}

            {/* Active filter badge for assignedTo */}
            {filters.assignedTo && (
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        <UserCircle2 className="w-3.5 h-3.5" />
                        Filtered by: {filters.assignedTo === "unassigned" ? "Unassigned" : "Employee"}
                    </span>
                    <button
                        onClick={() => updateFilter("assignedTo", "")}
                        className="text-xs text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
                    >
                        ✕ Clear
                    </button>
                </div>
            )}

            {/* Filters */}
            <InquiryFilters
                filters={filters}
                onFilter={updateFilter}
                onReset={resetFilters}
                activeCount={activeFilterCount}
            />

            {/* Table */}
            <InquiryTable
                inquiries={inquiries}
                pagination={pagination}
                loading={loading}
                onPageChange={(page) => refetch(page)}
                onRefetch={() => refetch(pagination.page)}
            />
        </div>
    )
}