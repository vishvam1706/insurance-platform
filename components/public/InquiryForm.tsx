"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { toast } from "sonner"
import { format, addDays, startOfToday, isBefore, startOfDay } from "date-fns"
import { InquirySchema, InquiryInput } from "@/lib/validations/inquiry.schema"
import { INDIAN_STATES, LANGUAGES, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
    Loader2, CheckCircle2, CalendarDays,
    ChevronLeft, ChevronRight, ChevronDown,
    Clock, X,
} from "lucide-react"

// ─── Constants ──────────────────────────────────────────────────────────────
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const HOURS = Array.from({ length: 24 }, (_, i) => i)
const MINS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

// ─── Helpers ────────────────────────────────────────────────────────────────
function pad(n: number) { return String(n).padStart(2, "0") }

function formatSlot(date: Date, hour: number, minute: number) {
    return `${format(date, "d MMM yyyy")} at ${pad(hour)}:${pad(minute)}`
}

function isoSlot(date: Date, hour: number, minute: number) {
    return `${format(date, "yyyy-MM-dd")}T${pad(hour)}:${pad(minute)}`
}

// ─── Calendar ────────────────────────────────────────────────────────────────
function MiniCalendar({
    selected,
    onSelect,
}: {
    selected: Date | null
    onSelect: (d: Date) => void
}) {
    const today = startOfToday()
    const [viewYear, setViewYear] = useState(today.getFullYear())
    const [viewMonth, setViewMonth] = useState(today.getMonth())

    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

    function prevMonth() {
        if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11) }
        else setViewMonth((m) => m - 1)
    }
    function nextMonth() {
        if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0) }
        else setViewMonth((m) => m + 1)
    }

    const cells: (number | null)[] = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ]

    return (
        <div className="select-none">
            {/* Month / Year nav */}
            <div className="flex items-center justify-between mb-3">
                <button
                    type="button"
                    onClick={prevMonth}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold text-slate-800">
                    {MONTHS[viewMonth]} {viewYear}
                </span>
                <button
                    type="button"
                    onClick={nextMonth}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 mb-1">
                {DAYS.map((d) => (
                    <div key={d} className="text-center text-[10px] font-semibold text-slate-400 py-1">
                        {d}
                    </div>
                ))}
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-0.5">
                {cells.map((day, i) => {
                    if (!day) return <div key={i} />

                    const cellDate = new Date(viewYear, viewMonth, day)
                    const isPast = isBefore(cellDate, today)
                    const isToday = format(cellDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                    const isSel = selected
                        ? format(cellDate, "yyyy-MM-dd") === format(selected, "yyyy-MM-dd")
                        : false

                    return (
                        <button
                            key={i}
                            type="button"
                            disabled={isPast}
                            onClick={() => !isPast && onSelect(cellDate)}
                            className={cn(
                                "h-8 w-full text-xs rounded-lg font-medium transition-all",
                                isPast && "text-slate-300 cursor-not-allowed",
                                !isPast && !isSel && !isToday && "text-slate-700 hover:bg-blue-50 hover:text-blue-600",
                                isToday && !isSel && "text-blue-600 font-bold ring-1 ring-blue-300",
                                isSel && "bg-blue-600 text-white shadow-sm",
                            )}
                        >
                            {day}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

// ─── Hour / Minute Scroll Picker ─────────────────────────────────────────────
function ScrollPicker({
    items,
    value,
    onSelect,
    label,
    format: fmt = (v: number) => pad(v),
}: {
    items: number[]
    value: number
    onSelect: (v: number) => void
    label: string
    format?: (v: number) => string
}) {
    return (
        <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {label}
            </span>
            <div className="h-40 overflow-y-auto scrollbar-hide rounded-xl border border-slate-200 bg-white w-16">
                {items.map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => onSelect(item)}
                        className={cn(
                            "w-full py-2.5 text-sm font-mono font-semibold transition-all",
                            value === item
                                ? "bg-blue-600 text-white"
                                : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                        )}
                    >
                        {fmt(item)}
                    </button>
                ))}
            </div>
        </div>
    )
}

// ─── Full Free DateTime Picker ────────────────────────────────────────────────
function FreeTimePicker({
    value,
    onChange,
}: {
    value: string
    onChange: (iso: string, label: string) => void
}) {
    const today = startOfToday()
    const [date, setDate] = useState<Date | null>(null)
    const [hour, setHour] = useState(9)
    const [minute, setMinute] = useState(0)
    const [step, setStep] = useState<"date" | "time">("date")

    function confirmDateTime() {
        if (!date) return
        onChange(isoSlot(date, hour, minute), formatSlot(date, hour, minute))
    }

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">

            {/* Step tabs */}
            <div className="flex border-b border-slate-200">
                {(["date", "time"] as const).map((s) => (
                    <button
                        key={s}
                        type="button"
                        onClick={() => setStep(s)}
                        className={cn(
                            "flex-1 py-2.5 text-xs font-semibold capitalize transition-all flex items-center justify-center gap-1.5",
                            step === s
                                ? "bg-blue-600 text-white"
                                : "bg-slate-50 text-slate-500 hover:text-slate-700"
                        )}
                    >
                        {s === "date"
                            ? <><CalendarDays className="w-3.5 h-3.5" /> Pick Date</>
                            : <><Clock className="w-3.5 h-3.5" /> Pick Time</>
                        }
                    </button>
                ))}
            </div>

            <div className="p-4">

                {/* ── Step 1: Calendar ────────────────────────── */}
                {step === "date" && (
                    <>
                        <MiniCalendar
                            selected={date}
                            onSelect={(d) => { setDate(d); setStep("time") }}
                        />
                        {date && (
                            <div className="mt-3 text-center text-xs text-blue-600 font-medium">
                                Selected: {format(date, "d MMMM yyyy")} — now pick a time →
                            </div>
                        )}
                    </>
                )}

                {/* ── Step 2: Free time picker ─────────────────── */}
                {step === "time" && (
                    <>
                        {!date && (
                            <p className="text-center text-xs text-slate-400 py-4">
                                Please select a date first
                            </p>
                        )}

                        {date && (
                            <>
                                <p className="text-xs font-medium text-slate-600 mb-4 text-center">
                                    {format(date, "d MMMM yyyy")} — any time, 24/7
                                </p>

                                {/* Hour + Minute pickers */}
                                <div className="flex items-start justify-center gap-4">
                                    <ScrollPicker
                                        label="Hour"
                                        items={HOURS}
                                        value={hour}
                                        onSelect={setHour}
                                        format={(v) => pad(v)}
                                    />

                                    <div className="flex flex-col items-center justify-center h-40 pt-6">
                                        <span className="text-2xl font-bold text-slate-400">:</span>
                                    </div>

                                    <ScrollPicker
                                        label="Minute"
                                        items={MINS}
                                        value={minute}
                                        onSelect={setMinute}
                                        format={(v) => pad(v)}
                                    />
                                </div>

                                {/* Live preview */}
                                <div className="mt-4 text-center bg-slate-50 rounded-xl py-3 px-4">
                                    <p className="text-xs text-slate-400 mb-0.5">Your selected time</p>
                                    <p className="text-lg font-bold text-slate-900">
                                        {pad(hour)}:{pad(minute)}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {format(date, "EEEE, d MMMM yyyy")}
                                    </p>
                                </div>

                                {/* Manual input option */}
                                <div className="mt-3">
                                    <Label className="text-xs text-slate-400 mb-1 block">
                                        Or type exact time
                                    </Label>
                                    <input
                                        type="time"
                                        value={`${pad(hour)}:${pad(minute)}`}
                                        onChange={(e) => {
                                            const [h, m] = e.target.value.split(":").map(Number)
                                            if (!isNaN(h)) setHour(h)
                                            if (!isNaN(m)) setMinute(m)
                                        }}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <Button
                                    type="button"
                                    onClick={confirmDateTime}
                                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 h-9 text-sm"
                                >
                                    Confirm — {format(date, "d MMM")} at {pad(hour)}:{pad(minute)}
                                </Button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

// ─── Main InquiryForm ─────────────────────────────────────────────────────────
export default function InquiryForm({
    defaultType,
    compact = false,
}: {
    defaultType?: "term" | "health"
    compact?: boolean
}) {
    const [done, setDone] = useState(false)
    const [insuranceType, setType] = useState(defaultType || "")
    const [state, setState] = useState("")
    const [language, setLanguage] = useState("")
    const [slotIso, setSlotIso] = useState("")
    const [slotLabel, setSlotLabel] = useState("")
    const [pickerOpen, setPickerOpen] = useState(false)

    const [typeErr, setTypeErr] = useState("")
    const [stateErr, setStateErr] = useState("")
    const [langErr, setLangErr] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<InquiryInput>({
        resolver: zodResolver(InquirySchema),
        defaultValues: { insuranceType: defaultType },
    })

    async function onSubmit(data: InquiryInput) {
        if (!insuranceType) { setTypeErr("Please select insurance type"); return }
        if (!state) { setStateErr("Please select your state"); return }
        if (!language) { setLangErr("Please select your language"); return }

        try {
            await axios.post("/api/inquiries", {
                ...data,
                insuranceType,
                state,
                language,
                preferredSlot: slotIso || undefined,
            })
            setDone(true)
        } catch (err) {
            toast.error(
                axios.isAxiosError(err)
                    ? err.response?.data?.error ?? "Something went wrong"
                    : "Something went wrong"
            )
        }
    }

    // ── Success ────────────────────────────────────────────
    if (done) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    We'll be in touch!
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    {slotLabel
                        ? `Our advisor will reach out on ${slotLabel}.`
                        : "Our advisor will contact you shortly."
                    }
                </p>
                {slotLabel && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm px-4 py-2 rounded-xl">
                        <CalendarDays className="w-4 h-4" />
                        {slotLabel}
                    </div>
                )}
            </div>
        )
    }

    // ── Form ───────────────────────────────────────────────
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <div className="space-y-1.5">
                <Label>Full Name</Label>
                <Input placeholder="Ravi Sharma" {...register("name")} />
                {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
                <Label>Mobile Number</Label>
                <Input type="tel" placeholder="9876543210" {...register("phone")} />
                {errors.phone && (
                    <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <Label>Email</Label>
                <Input
                    type="email"
                    placeholder="ravi@example.com"
                    {...register("email")}
                />
                {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
            </div>

            {/* Insurance type */}
            <div className="space-y-1.5">
                <Label>Insurance Type</Label>
                <Select
                    value={insuranceType}
                    onValueChange={(v) => { setType(v); setTypeErr("") }}
                >
                    <SelectTrigger className={typeErr ? "border-red-400" : ""}>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="term">Term Life Insurance</SelectItem>
                        <SelectItem value="health">Health Insurance</SelectItem>
                    </SelectContent>
                </Select>
                {typeErr && <p className="text-red-500 text-xs">{typeErr}</p>}
            </div>

            {/* State + Language */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <Label>State</Label>
                    <Select
                        value={state}
                        onValueChange={(v) => { setState(v); setStateErr("") }}
                    >
                        <SelectTrigger className={stateErr ? "border-red-400" : ""}>
                            <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                            {INDIAN_STATES.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {stateErr && (
                        <p className="text-red-500 text-xs">{stateErr}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label>Language</Label>
                    <Select
                        value={language}
                        onValueChange={(v) => { setLanguage(v); setLangErr("") }}
                    >
                        <SelectTrigger className={langErr ? "border-red-400" : ""}>
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            {LANGUAGES.map((l) => (
                                <SelectItem key={l} value={l}>{l}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {langErr && (
                        <p className="text-red-500 text-xs">{langErr}</p>
                    )}
                </div>
            </div>

            {/* ── Preferred call time ───────────────────────── */}
            <div className="space-y-2">
                <Label className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    When should we call you?
                    <span className="text-slate-400 font-normal text-xs">(optional)</span>
                </Label>

                {/* Toggle button */}
                {!slotLabel ? (
                    <button
                        type="button"
                        onClick={() => setPickerOpen((o) => !o)}
                        className={cn(
                            "w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-sm",
                            pickerOpen
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-dashed border-slate-300 hover:border-blue-400 text-slate-500 hover:text-blue-600"
                        )}
                    >
                        <span className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" />
                            Choose any date & time — 24 / 7
                        </span>
                        <ChevronDown className={cn(
                            "w-4 h-4 transition-transform",
                            pickerOpen && "rotate-180"
                        )} />
                    </button>
                ) : (
                    /* Selected slot pill */
                    <div className="flex items-center gap-2 bg-green-50 border-2 border-green-300 rounded-xl px-4 py-3">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-green-600 font-medium">Call scheduled</p>
                            <p className="text-sm font-semibold text-green-800 truncate">
                                {slotLabel}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setSlotIso("")
                                setSlotLabel("")
                                setPickerOpen(false)
                            }}
                            className="text-green-400 hover:text-green-600 shrink-0 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Free picker */}
                {pickerOpen && !slotLabel && (
                    <FreeTimePicker
                        value={slotIso}
                        onChange={(iso, label) => {
                            setSlotIso(iso)
                            setSlotLabel(label)
                            setPickerOpen(false)
                        }}
                    />
                )}
            </div>

            {/* Message */}
            {!compact && (
                <div className="space-y-1.5">
                    <Label>
                        Message{" "}
                        <span className="text-slate-400 text-xs">(optional)</span>
                    </Label>
                    <Textarea
                        placeholder="Any specific questions or requirements..."
                        rows={3}
                        {...register("message")}
                    />
                </div>
            )}

            {/* Submit */}
            <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 h-11 font-semibold"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Book Free Consultation"
                )}
            </Button>

            <p className="text-center text-xs text-slate-400">
                No spam · No salespeople · 100% free
            </p>
        </form>
    )
}