"use client"

import { useEffect, useState, useId } from "react"
import axios from "axios"
import { toast } from "sonner"
import {
    Sliders, Clock, Globe, Loader2, Save,
    AlertTriangle, Check, Moon, Sun, Sunrise, Sunset,
    Pencil, Trash2, Plus, X, Power, PowerOff, CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface LanguageVisibility {
    language: string
    visible: boolean
}

interface ShiftTiming {
    shiftName: string
    startTime: string
    endTime: string
    frozen: boolean
}

export default function SettingsAdminPage() {
    const uid = useId()
    const [languages, setLanguages] = useState<LanguageVisibility[]>([])
    const [shifts, setShifts] = useState<ShiftTiming[]>([])
    const [formActive, setFormActive] = useState(true)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Which shift index is being edited inline (-1 = none)
    const [editingIdx, setEditingIdx] = useState<number>(-1)
    // Draft values for the shift being edited
    const [editDraft, setEditDraft] = useState<ShiftTiming | null>(null)
    // New shift creation state
    const [addingNew, setAddingNew] = useState(false)
    const [newShift, setNewShift] = useState<ShiftTiming>({ shiftName: "", startTime: "09:00", endTime: "13:00", frozen: false })

    useEffect(() => {
        fetchSettings()
    }, [])

    async function fetchSettings() {
        setLoading(true)
        try {
            const res = await axios.get("/api/settings")
            const data = res.data.settings
            if (data) {
                setLanguages(data.languages || [])
                setShifts(data.shifts || [])
                setFormActive(data.formActive !== false) // default true
            }
        } catch (err) {
            console.error(err)
            toast.error("Failed to load settings")
        } finally {
            setLoading(false)
        }
    }

    async function handleSave() {
        // Commit any open inline edit before saving
        if (editingIdx >= 0 && editDraft) commitEdit(editingIdx)
        setSaving(true)
        try {
            await axios.put("/api/settings", { languages, shifts, formActive })
            toast.success("Settings updated successfully")
        } catch (err) {
            console.error(err)
            toast.error("Failed to update settings")
        } finally {
            setSaving(false)
        }
    }

    // ─── Language helpers ────────────────────────────────────────
    function toggleLanguage(index: number) {
        setLanguages(prev => {
            const copy = [...prev]
            copy[index] = { ...copy[index], visible: !copy[index].visible }
            return copy
        })
    }

    // ─── Shift: freeze toggle ────────────────────────────────────
    function toggleShiftFreeze(index: number) {
        setShifts(prev => {
            const copy = [...prev]
            copy[index] = { ...copy[index], frozen: !copy[index].frozen }
            return copy
        })
    }

    // ─── Shift: start edit ───────────────────────────────────────
    function startEdit(index: number) {
        setEditingIdx(index)
        setEditDraft({ ...shifts[index] })
        setAddingNew(false)
    }

    function cancelEdit() {
        setEditingIdx(-1)
        setEditDraft(null)
    }

    function commitEdit(index: number) {
        if (!editDraft) return
        setShifts(prev => {
            const copy = [...prev]
            copy[index] = { ...editDraft }
            return copy
        })
        setEditingIdx(-1)
        setEditDraft(null)
    }

    // ─── Shift: delete ───────────────────────────────────────────
    function deleteShift(index: number) {
        if (editingIdx === index) cancelEdit()
        setShifts(prev => prev.filter((_, i) => i !== index))
    }

    // ─── Shift: add new ─────────────────────────────────────────
    function commitNewShift() {
        if (!newShift.shiftName.trim()) {
            toast.error("Shift name is required")
            return
        }
        setShifts(prev => [...prev, { ...newShift }])
        setNewShift({ shiftName: "", startTime: "09:00", endTime: "13:00", frozen: false })
        setAddingNew(false)
    }

    function getShiftIcon(name: string) {
        const lower = name.toLowerCase()
        if (lower.includes("morning") || lower.includes("sunrise")) return <Sunrise className="w-5 h-5 text-amber-500" />
        if (lower.includes("afternoon") || lower.includes("sun")) return <Sun className="w-5 h-5 text-amber-500 animate-spin-slow" />
        if (lower.includes("evening") || lower.includes("sunset")) return <Sunset className="w-5 h-5 text-orange-500" />
        return <Moon className="w-5 h-5 text-indigo-400" />
    }

    // ─── Input shared style ──────────────────────────────────────
    const inputCls = "flex-1 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-1.5 text-sm font-semibold text-slate-800 outline-none transition-all"

    return (
        <div className="space-y-6 pt-3 sm:pt-5 lg:pt-6 text-left">
            {/* Header row */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                        <Sliders className="w-6 h-6 text-emerald-600" />
                        System Settings
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Control consultation form, shift timings, and language options
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving || loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 rounded-xl shadow-md min-w-[120px]"
                >
                    {saving ? (
                        <><Loader2 className="w-4 h-4 animate-spin mr-1.5" /> Saving...</>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Save Settings
                        </>
                    )}
                </Button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
                    <p className="text-slate-500 text-sm font-medium">Loading system configurations...</p>
                </div>
            ) : (
                <div className="space-y-6">

                    {/* ── Form Active Toggle ─────────────────────────────── */}
                    <div className={`rounded-3xl border p-6 shadow-xs transition-all duration-300 ${
                        formActive
                            ? "bg-emerald-50/40 border-emerald-200"
                            : "bg-rose-50/40 border-rose-200"
                    }`}>
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-start gap-3">
                                <div className={`p-2.5 rounded-2xl shrink-0 ${formActive ? "bg-emerald-100" : "bg-rose-100"}`}>
                                    {formActive
                                        ? <Power className="w-5 h-5 text-emerald-600" />
                                        : <PowerOff className="w-5 h-5 text-rose-500" />
                                    }
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                                        Public Contact Form
                                        <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                            formActive
                                                ? "bg-emerald-600 text-white"
                                                : "bg-rose-500 text-white"
                                        }`}>
                                            {formActive ? <><CheckCircle2 className="w-3 h-3" /> Active</> : <><X className="w-3 h-3" /> Inactive</>}
                                        </span>
                                    </h3>
                                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-1 max-w-lg">
                                        {formActive
                                            ? "The inquiry form is live. Visitors can submit callbacks from the Contact page."
                                            : "The inquiry form is hidden. Visitors will see an unavailable message on the Contact page."
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Toggle switch */}
                            <button
                                id={`${uid}-form-toggle`}
                                onClick={() => setFormActive(v => !v)}
                                className={`relative w-16 h-8 rounded-full transition-all duration-300 shrink-0 border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                                    formActive
                                        ? "bg-emerald-500 border-emerald-500 focus-visible:ring-emerald-500"
                                        : "bg-rose-400 border-rose-400 focus-visible:ring-rose-400"
                                }`}
                                aria-label={formActive ? "Deactivate form" : "Activate form"}
                                role="switch"
                                aria-checked={formActive}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${
                                    formActive ? "translate-x-8" : "translate-x-0"
                                }`}>
                                    {formActive
                                        ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        : <X className="w-3.5 h-3.5 text-rose-400" />
                                    }
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* ── Main 2-column grid ────────────────────────────── */}
                    <div className="grid lg:grid-cols-[1.3fr_1.7fr] gap-6">

                        {/* Left Column: Shift Timing */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-extrabold text-slate-800 text-base">Shift-Wise Timing</h3>
                                </div>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5">
                                    Edit shift names &amp; times, freeze shifts due to high volume, or add new shifts. Frozen shifts are blocked from the public appointment selector.
                                </p>

                                <div className="space-y-3">
                                    {shifts.map((s, idx) => {
                                        const isEditing = editingIdx === idx

                                        if (isEditing && editDraft) {
                                            // ── Inline edit row ──────────────────────────────
                                            return (
                                                <div
                                                    key={`shift-edit-${idx}`}
                                                    className="rounded-2xl border-2 border-emerald-400 bg-emerald-50/40 p-4 space-y-3 animate-fade-up"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Pencil className="w-4 h-4 text-emerald-600 shrink-0" />
                                                        <span className="text-xs font-black uppercase tracking-wider text-emerald-700">Editing Shift</span>
                                                    </div>

                                                    {/* Shift name */}
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Shift Name</label>
                                                        <input
                                                            className={inputCls}
                                                            value={editDraft.shiftName}
                                                            onChange={e => setEditDraft(d => d ? { ...d, shiftName: e.target.value } : d)}
                                                            placeholder="e.g. Morning Shift"
                                                        />
                                                    </div>

                                                    {/* Start / End time */}
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Start Time</label>
                                                            <input
                                                                type="time"
                                                                className={inputCls}
                                                                value={editDraft.startTime}
                                                                onChange={e => setEditDraft(d => d ? { ...d, startTime: e.target.value } : d)}
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">End Time</label>
                                                            <input
                                                                type="time"
                                                                className={inputCls}
                                                                value={editDraft.endTime}
                                                                onChange={e => setEditDraft(d => d ? { ...d, endTime: e.target.value } : d)}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex gap-2 pt-1">
                                                        <button
                                                            onClick={() => commitEdit(idx)}
                                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all"
                                                        >
                                                            <Check className="w-3.5 h-3.5" /> Save
                                                        </button>
                                                        <button
                                                            onClick={cancelEdit}
                                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
                                                        >
                                                            <X className="w-3.5 h-3.5" /> Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        // ── Display row ──────────────────────────────────
                                        return (
                                            <div
                                                key={`shift-${idx}`}
                                                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                                                    s.frozen
                                                        ? "bg-rose-50 border-rose-100 text-rose-800"
                                                        : "bg-slate-50/50 border-slate-100 text-slate-800 hover:bg-slate-50"
                                                }`}
                                            >
                                                {/* Left: icon + name + time */}
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className={`p-2 rounded-xl shrink-0 ${s.frozen ? "bg-rose-100" : "bg-white border border-slate-100"}`}>
                                                        {getShiftIcon(s.shiftName)}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-extrabold text-sm truncate">{s.shiftName}</p>
                                                        <p className={`text-xs font-mono mt-0.5 ${s.frozen ? "text-rose-500" : "text-slate-400"}`}>
                                                            {s.startTime} – {s.endTime}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Right: Freeze + Edit + Delete */}
                                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                                    <button
                                                        onClick={() => toggleShiftFreeze(idx)}
                                                        className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 border ${
                                                            s.frozen
                                                                ? "bg-rose-600 hover:bg-rose-700 text-white border-transparent"
                                                                : "bg-white hover:bg-slate-100 text-slate-600 border-slate-200"
                                                        }`}
                                                        title={s.frozen ? "Unfreeze shift" : "Freeze shift"}
                                                    >
                                                        {s.frozen ? "Frozen" : "Active"}
                                                    </button>
                                                    <button
                                                        onClick={() => startEdit(idx)}
                                                        className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-300 transition-all hover:scale-105 active:scale-95"
                                                        title="Edit shift"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteShift(idx)}
                                                        className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-rose-500 hover:border-rose-200 transition-all hover:scale-105 active:scale-95"
                                                        title="Delete shift"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {/* ── Add new shift ─────────────────────────────── */}
                                    {addingNew ? (
                                        <div className="rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-50/30 p-4 space-y-3 animate-fade-up">
                                            <div className="flex items-center gap-2">
                                                <Plus className="w-4 h-4 text-emerald-600 shrink-0" />
                                                <span className="text-xs font-black uppercase tracking-wider text-emerald-700">New Shift</span>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Shift Name</label>
                                                <input
                                                    className={inputCls}
                                                    value={newShift.shiftName}
                                                    onChange={e => setNewShift(n => ({ ...n, shiftName: e.target.value }))}
                                                    placeholder="e.g. Night Shift"
                                                    autoFocus
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Start Time</label>
                                                    <input
                                                        type="time"
                                                        className={inputCls}
                                                        value={newShift.startTime}
                                                        onChange={e => setNewShift(n => ({ ...n, startTime: e.target.value }))}
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">End Time</label>
                                                    <input
                                                        type="time"
                                                        className={inputCls}
                                                        value={newShift.endTime}
                                                        onChange={e => setNewShift(n => ({ ...n, endTime: e.target.value }))}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex gap-2 pt-1">
                                                <button
                                                    onClick={commitNewShift}
                                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all"
                                                >
                                                    <Check className="w-3.5 h-3.5" /> Add Shift
                                                </button>
                                                <button
                                                    onClick={() => { setAddingNew(false); setNewShift({ shiftName: "", startTime: "09:00", endTime: "13:00", frozen: false }) }}
                                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
                                                >
                                                    <X className="w-3.5 h-3.5" /> Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => { setAddingNew(true); setEditingIdx(-1); setEditDraft(null) }}
                                            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-500 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50/30 transition-all duration-200"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add New Shift
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Regulatory Notice */}
                            <div className="rounded-3xl border border-slate-200 bg-amber-50/40 p-6 flex items-start gap-4">
                                <div className="p-2 rounded-xl bg-amber-50 border border-amber-100 shrink-0">
                                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm">Important Scheduling Note</h4>
                                    <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">
                                        Changing timings will only block future public consultation selections. Existing appointments are retained and must be rescheduled manually in the CRM tab.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Language Availability Grid */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                            <div className="flex items-center gap-2 mb-4">
                                <Globe className="w-5 h-5 text-emerald-600" />
                                <h3 className="font-extrabold text-slate-800 text-base">Language Show / Hide Option</h3>
                            </div>

                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                                Show or hide Indian language selections based on your current advisor staff availability. Hidden languages will not appear in the Contact form dropdown, and auto-selection for states will be skipped for hidden languages.
                            </p>

                            {/* Quick stats */}
                            <div className="flex items-center gap-3 mb-5">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    {languages.filter(l => l.visible).length} visible
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                                    {languages.filter(l => !l.visible).length} hidden
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {languages.map((l, idx) => (
                                    <div
                                        key={l.language}
                                        onClick={() => toggleLanguage(idx)}
                                        className={`flex items-center gap-2.5 p-3.5 rounded-2xl border cursor-pointer select-none transition-all duration-200 ${
                                            l.visible
                                                ? "bg-emerald-50 border-emerald-100 text-emerald-800 shadow-xs hover:border-emerald-200"
                                                : "bg-slate-50/30 border-slate-100 hover:border-slate-200 text-slate-400"
                                        }`}
                                    >
                                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                                            l.visible
                                                ? "bg-emerald-600 border-emerald-600 text-white"
                                                : "bg-white border-slate-200 text-transparent"
                                        }`}>
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        </div>
                                        <span className={`text-xs sm:text-sm font-bold ${l.visible ? "text-emerald-950" : "text-slate-500"}`}>
                                            {l.language}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
