"use client"

import { useEffect, useState } from "react"
import { useInquiries } from "@/hooks/useInquiries"
import { useAuth } from "@/hooks/useAuth"
import InquiryFilters from "@/components/admin/InquiryFilters"
import InquiryTable from "@/components/admin/InquiryTable"
import CsvExportButton from "@/components/admin/CsvExportButton"
import { MessageSquare, RadioTower, Clock, Calendar, AlarmClock, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { IInquiry } from "@/types/inquiry"

// ── Live clock ─────────────────────────────────────────────────────────────────
function LiveClock() {
    const [now, setNow] = useState(new Date())
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(t)
    }, [])

    const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })
    const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })

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
    const [now, setNow] = useState(new Date())
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(t)
    }, [])

    // Upcoming: future slots on non-resolved inquiries, sorted soonest first
    const upcoming = inquiries
        .filter(i => i.preferredSlot && i.status !== "resolved")
        .map(i => ({ inq: i, slot: parseSlot(i.preferredSlot!) }))
        .filter(x => x.slot && x.slot > now)
        .sort((a, b) => a.slot!.getTime() - b.slot!.getTime())

    // Missed Slots: past slots where NO attempt was made (status still "new")
    // If status is contacted/not_reachable, employee already tried — not a missed slot
    const overdue = inquiries
        .filter(i => i.preferredSlot && i.status === "new")
        .map(i => ({ inq: i, slot: parseSlot(i.preferredSlot!) }))
        .filter(x => x.slot && x.slot <= now)

    // Uncontacted: new inquiries with no slot set at all
    const uncontacted = inquiries.filter(i => i.status === "new" && !i.preferredSlot)

    const next = upcoming[0]

    function formatCountdown(slot: Date): string {
        const diff = Math.max(0, slot.getTime() - now.getTime())
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


// ── Page ───────────────────────────────────────────────────────────────────────
export default function InquiriesPage() {
    const { user } = useAuth()
    const { inquiries, pagination, loading,
        filters, updateFilter, resetFilters,
        refetch, liveCount, clearLiveCount } = useInquiries()

    const activeFilterCount = Object.values(filters).filter(Boolean).length

    useEffect(() => {
        if (liveCount > 0) {
            toast.success(`🔔 ${liveCount} new inquiry just arrived!`, {
                description: "The list has been updated automatically.",
                duration: 4000,
            })
        }
    }, [liveCount])

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
                            ? `Showing leads for ${user.state}`
                            : `All submitted inquiries — ${pagination.total} total`}
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-end">
                    {user?.role !== "employee" && (
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