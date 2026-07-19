"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { InquiryStatus } from "@/types/inquiry"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
    Loader2, UserCircle2, ChevronsUpDown, Check, X, Search, MapPin, Languages
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SimpleEmployee {
    _id: string
    name: string
    email: string
    states?: string[]
    languages?: string[]
    pincodes?: string[]
}

interface UpdateInquiryFormProps {
    inquiryId: string
    initialStatus: InquiryStatus
    initialAssignedTo: string
    initialNotes: string
    employees: SimpleEmployee[]
    isAdmin: boolean
}

const STATUS_CONFIG: Record<InquiryStatus, { label: string; dot: string }> = {
    new:           { label: "New",           dot: "bg-blue-500" },
    contacted:     { label: "Contacted",     dot: "bg-amber-500" },
    resolved:      { label: "Resolved",      dot: "bg-emerald-500" },
    not_reachable: { label: "Not Reachable", dot: "bg-red-500" },
}

export default function UpdateInquiryForm({
    inquiryId,
    initialStatus,
    initialAssignedTo,
    initialNotes,
    employees,
    isAdmin,
}: UpdateInquiryFormProps) {
    const router = useRouter()
    const [status, setStatus] = useState<InquiryStatus>(initialStatus)
    const [assignedTo, setAssignedTo] = useState<string>(initialAssignedTo || "unassigned")
    const [notes, setNotes] = useState<string>(initialNotes)
    const [saving, setSaving] = useState(false)

    async function handleSave() {
        setSaving(true)
        try {
            const payload: Record<string, string | undefined> = { status, notes }
            if (isAdmin) {
                payload.assignedTo = assignedTo === "unassigned" ? "" : assignedTo
            }
            await axios.patch(`/api/inquiries/${inquiryId}`, payload)
            toast.success("Inquiry updated successfully")
            router.refresh()
        } catch {
            toast.error("Failed to update inquiry")
        } finally {
            setSaving(false)
        }
    }

    return (
        <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold text-slate-800">Update Inquiry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-2">Status</label>
                    <Select value={status} onValueChange={(v) => setStatus(v as InquiryStatus)}>
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

                {isAdmin && (
                    <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-2">Assign To Employee</label>
                        <EmpCombobox
                            value={assignedTo}
                            onChange={setAssignedTo}
                            employees={employees}
                        />
                    </div>
                )}

                <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-2">Notes</label>
                    <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add notes about this inquiry…"
                        rows={4}
                        className="rounded-xl border-slate-200 bg-slate-50 text-sm resize-none focus:ring-emerald-500 focus:border-emerald-400"
                    />
                </div>

                <Button
                    className="w-full h-10 mt-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-sm transition-all"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving…
                        </>
                    ) : (
                        "Save Changes"
                    )}
                </Button>
            </CardContent>
        </Card>
    )
}

interface EmpComboboxProps {
    value: string
    onChange: (v: string) => void
    employees: SimpleEmployee[]
}

function EmpCombobox({ value, onChange, employees }: EmpComboboxProps) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const filtered = search.trim() === ""
        ? employees
        : employees.filter(e => {
            const q = search.toLowerCase()
            const nameMatch = e.name.toLowerCase().includes(q)
            const emailMatch = e.email.toLowerCase().includes(q)
            const stateMatch = e.states?.some(s => s.toLowerCase().includes(q))
            const langMatch = e.languages?.some(l => l.toLowerCase().includes(q))
            const pinMatch = e.pincodes?.some(p => p.includes(q))
            return nameMatch || emailMatch || stateMatch || langMatch || pinMatch
        })

    const selected = employees.find(e => e._id === value)

    return (
        <div className="relative w-full" ref={containerRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={cn(
                    "w-full flex flex-col items-start gap-1 p-3 text-left",
                    "rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium",
                    "hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400",
                    "transition-all duration-150",
                    value === "unassigned" && "text-slate-400"
                )}
            >
                <div className="w-full flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 truncate">
                        {selected ? (
                            <>
                                <UserCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                                <span className="font-semibold text-slate-800 truncate">{selected.name}</span>
                                <span className="text-xs text-slate-400 font-normal shrink-0 hidden xs:inline">
                                    ({selected.email})
                                </span>
                            </>
                        ) : (
                            <span className="text-slate-400">Select employee…</span>
                        )}
                    </span>
                    <ChevronsUpDown className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                {selected && (
                    <div className="flex flex-wrap gap-1 mt-2 text-[10px] font-semibold text-slate-500 pointer-events-none">
                        {selected.states && selected.states.length > 0 && (
                            <span className="inline-flex items-center gap-1 bg-slate-200/60 px-1.5 py-0.5 rounded text-slate-600">
                                <MapPin className="w-2.5 h-2.5" />
                                {selected.states.join(", ")}
                            </span>
                        )}
                        {selected.languages && selected.languages.length > 0 && (
                            <span className="inline-flex items-center gap-1 bg-blue-50 px-1.5 py-0.5 rounded text-blue-600">
                                <Languages className="w-2.5 h-2.5" />
                                {selected.languages.join(", ")}
                            </span>
                        )}
                        {selected.pincodes && selected.pincodes.length > 0 && (
                            <span className="inline-flex items-center gap-1 bg-indigo-50 px-1.5 py-0.5 rounded text-indigo-600">
                                📮 {selected.pincodes.length} pincodes
                            </span>
                        )}
                    </div>
                )}
            </button>

            {open && (
                <div className="absolute left-0 right-0 z-50 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in duration-100">
                    <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100 bg-slate-50">
                        <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <input
                            autoFocus
                            placeholder="Search name, email, state, lang, or pincode…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="flex-1 text-sm bg-transparent outline-none placeholder:text-slate-400 text-slate-800"
                        />
                        {search && (
                            <button type="button" onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    <div className="max-h-60 overflow-y-auto p-1 space-y-0.5">
                        {("— unassigned —".includes(search.toLowerCase()) || search === "") && (
                            <button
                                type="button"
                                onClick={() => { onChange("unassigned"); setOpen(false); setSearch("") }}
                                className={cn(
                                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-all",
                                    value === "unassigned" ? "bg-emerald-50 text-emerald-800" : "hover:bg-slate-50 text-slate-500"
                                )}
                            >
                                <span className="w-4 shrink-0 flex items-center justify-center">
                                    {value === "unassigned" && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                </span>
                                <span className="italic">— Unassigned —</span>
                            </button>
                        )}

                        {filtered.map(emp => (
                            <button
                                key={emp._id}
                                type="button"
                                onClick={() => { onChange(emp._id); setOpen(false); setSearch("") }}
                                className={cn(
                                    "w-full flex items-start gap-2 px-3 py-2 rounded-lg text-left transition-all",
                                    value === emp._id ? "bg-emerald-50" : "hover:bg-slate-50"
                                )}
                            >
                                <span className="w-4 shrink-0 mt-1 flex items-center justify-center">
                                    {value === emp._id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                </span>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="text-sm font-semibold text-slate-800">{emp.name}</span>
                                        <span className="text-xs text-slate-400 font-normal">({emp.email})</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mt-1 text-[10px] font-semibold text-slate-500">
                                        {emp.states && emp.states.length > 0 && (
                                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 flex items-center gap-0.5">
                                                <MapPin className="w-2.5 h-2.5 shrink-0" />
                                                {emp.states.join(", ")}
                                            </span>
                                        )}
                                        {emp.languages && emp.languages.length > 0 && (
                                            <span className="bg-blue-50 px-1.5 py-0.5 rounded text-blue-600 flex items-center gap-0.5">
                                                <Languages className="w-2.5 h-2.5 shrink-0" />
                                                {emp.languages.join(", ")}
                                            </span>
                                        )}
                                        {emp.pincodes && emp.pincodes.length > 0 && (
                                            <span className="bg-indigo-50 px-1.5 py-0.5 rounded text-indigo-600 max-w-[200px] truncate" title={emp.pincodes.join(", ")}>
                                                📮 {emp.pincodes.length} pincodes ({emp.pincodes.slice(0, 3).join(", ")}{emp.pincodes.length > 3 ? "..." : ""})
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}

                        {filtered.length === 0 && (
                            <div className="py-6 text-center text-sm text-slate-400">
                                No employees match &quot;{search}&quot;
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
