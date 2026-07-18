"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { toast } from "sonner"
import { format, startOfToday, isBefore } from "date-fns"
import { InquirySchema, InquiryInput } from "@/lib/validations/inquiry.schema"
import { INDIAN_STATES, LANGUAGES, STATE_LANGUAGE_MAP, cn } from "@/lib/utils"
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
    Clock, X, ShieldCheck, AlertCircle, Smartphone,
    Sparkles, User, Globe, MessageSquare,
    Shield, Heart, Baby, Briefcase, TrendingUp, Umbrella, Activity, Users
} from "lucide-react"

// ─── Constants ───────────────────────────────────────────────────────────────
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
const HOURS = Array.from({ length: 24 }, (_, i) => i)
const MINS  = [0,5,10,15,20,25,30,35,40,45,50,55]

function pad(n: number) { return String(n).padStart(2, "0") }
function formatSlot(date: Date, hour: number, minute: number) {
    return `${format(date, "d MMM yyyy")} at ${pad(hour)}:${pad(minute)}`
}
function isoSlot(date: Date, hour: number, minute: number) {
    return `${format(date, "yyyy-MM-dd")}T${pad(hour)}:${pad(minute)}`
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────
function MiniCalendar({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) {
    const today = startOfToday()
    const [viewYear, setViewYear] = useState(today.getFullYear())
    const [viewMonth, setViewMonth] = useState(today.getMonth())

    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

    function prevMonth() {
        if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
        else setViewMonth(m => m - 1)
    }
    function nextMonth() {
        if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
        else setViewMonth(m => m + 1)
    }

    const cells: (number | null)[] = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ]

    return (
        <div className="select-none p-1">
            <div className="flex items-center justify-between mb-4">
                <button type="button" onClick={prevMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-emerald-600 transition-colors border border-slate-100"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-extrabold text-slate-800">
                    {MONTHS[viewMonth]} {viewYear}
                </span>
                <button type="button" onClick={nextMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-emerald-600 transition-colors border border-slate-100"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
                {DAYS.map((d) => (
                    <div key={d} className="text-center text-[10px] font-black uppercase tracking-wider py-1 text-slate-400">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                    if (!day) return <div key={i} />
                    const cellDate = new Date(viewYear, viewMonth, day)
                    const isPast = isBefore(cellDate, today)
                    const isToday = format(cellDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                    const isSel = selected ? format(cellDate, "yyyy-MM-dd") === format(selected, "yyyy-MM-dd") : false

                    return (
                        <button
                            key={i}
                            type="button"
                            disabled={isPast}
                            onClick={() => !isPast && onSelect(cellDate)}
                            className="h-9 w-full text-xs font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                            style={{
                                color: isPast ? "#CBD5E1" : isSel ? "#FFFFFF" : isToday ? "var(--brand-dark)" : "var(--text-secondary)",
                                background: isSel ? "var(--brand)" : isToday && !isSel ? "var(--brand-light)" : "transparent",
                                cursor: isPast ? "not-allowed" : "pointer",
                                border: isSel ? "none" : isToday ? "1px solid var(--brand)" : "1px solid transparent",
                            }}
                        >
                            {day}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

// ─── Scroll Picker ────────────────────────────────────────────────────────────
function ScrollPicker({ items, value, onSelect, label, format: fmt = (v: number) => pad(v), disabledItems = [] }: {
    items: number[]; value: number; onSelect: (v: number) => void; label: string; format?: (v: number) => string; disabledItems?: number[]
}) {
    return (
        <div className="flex flex-col items-center gap-1.5 flex-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</span>
            <div className="h-40 overflow-y-auto rounded-2xl w-full border border-slate-100 bg-slate-50/50 shadow-inner scrollbar-thin">
                {items.filter(item => !disabledItems.includes(item)).map((item) => {
                    return (
                        <button
                            key={item}
                            type="button"
                            onClick={() => onSelect(item)}
                            className="w-full py-2.5 text-xs sm:text-sm font-mono font-bold transition-all hover:bg-slate-100 flex justify-center items-center gap-1"
                            style={{
                                background: value === item ? "var(--brand)" : "transparent",
                                color: value === item ? "#FFFFFF" : "var(--text-secondary)",
                                cursor: "pointer"
                            }}
                        >
                            <span>{fmt(item)}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

// ─── Shift freezing helper ───────────────────────────────────────────────────
interface ShiftTiming {
    shiftName: string
    startTime: string
    endTime: string
    frozen: boolean
}

function isHourInFrozenShift(hour: number, shifts: ShiftTiming[]) {
    if (!shifts || shifts.length === 0) return false
    for (const shift of shifts) {
        if (!shift.frozen) continue
        const [sh] = shift.startTime.split(":").map(Number)
        const [eh] = shift.endTime.split(":").map(Number)
        if (sh < eh) {
            if (hour >= sh && hour < eh) return true
        } else {
            // overnight shift
            if (hour >= sh || hour < eh) return true
        }
    }
    return false
}

// ─── Free Time Picker ─────────────────────────────────────────────────────────
function FreeTimePicker({ value, onChange, shifts }: {
    value: string; onChange: (iso: string, label: string) => void; shifts: ShiftTiming[]
}) {
    const [date, setDate] = useState<Date | null>(null)
    const [hour, setHour] = useState(9)
    const [minute, setMinute] = useState(0)
    const [step, setStep] = useState<"date" | "time">("date")

    useEffect(() => {
        if (shifts && shifts.length > 0) {
            const firstAvailable = HOURS.find(h => !isHourInFrozenShift(h, shifts))
            if (firstAvailable !== undefined) setHour(firstAvailable)
        }
    }, [shifts])

    function confirmDateTime() {
        if (!date) return
        if (isHourInFrozenShift(hour, shifts)) {
            toast.error("This shift is currently frozen. Please choose another slot!")
            return
        }
        onChange(isoSlot(date, hour, minute), formatSlot(date, hour, minute))
    }

    const frozenHours = HOURS.filter(h => isHourInFrozenShift(h, shifts))

    return (
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg animate-fade-up">
            {/* Tab bar */}
            <div className="flex bg-slate-50 border-b border-slate-100">
                {(["date", "time"] as const).map((s) => (
                    <button
                        key={s}
                        type="button"
                        onClick={() => setStep(s)}
                        className="flex-1 py-3 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                        style={{
                            background: step === s ? "var(--brand)" : "transparent",
                            color: step === s ? "#FFFFFF" : "var(--text-muted)",
                        }}
                    >
                        {s === "date" ? <><CalendarDays className="w-3.5 h-3.5" />Pick Date</> : <><Clock className="w-3.5 h-3.5" />Pick Time</>}
                    </button>
                ))}
            </div>

            <div className="p-5 text-left">
                {step === "date" && (
                    <>
                        <MiniCalendar selected={date} onSelect={(d) => { setDate(d); setStep("time") }} />
                        {date && (
                            <div className="mt-3 text-center text-xs font-bold text-emerald-600 animate-pulse">
                                Selected: {format(date, "d MMMM yyyy")} — now pick a time →
                            </div>
                        )}
                    </>
                )}

                {step === "time" && (
                    <>
                        {!date && <p className="text-center text-xs py-8 text-slate-400 font-medium">Please select a date first</p>}
                        {date && (
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-600 text-center">
                                    {format(date, "d MMMM yyyy")} — pick your preferred time
                                </p>
                                <div className="flex items-start justify-center gap-3">
                                    <ScrollPicker label="Hour" items={HOURS} value={hour} onSelect={setHour} disabledItems={frozenHours} />
                                    <div className="flex flex-col items-center justify-center h-40 pt-6">
                                        <span className="text-2xl font-bold text-slate-300">:</span>
                                    </div>
                                    <ScrollPicker label="Minute" items={MINS} value={minute} onSelect={setMinute} />
                                </div>

                                <div className="mt-4 text-center rounded-2xl py-3 px-4 border border-emerald-100 bg-emerald-50/50">
                                    <p className="text-[10px] uppercase font-black tracking-wider text-emerald-600">Your selected time</p>
                                    <p className="text-lg font-black text-emerald-700">
                                        {pad(hour)}:{pad(minute)}
                                    </p>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                                        {format(date, "EEEE, d MMMM yyyy")}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Or type exact time</Label>
                                    <input
                                        type="time"
                                        value={`${pad(hour)}:${pad(minute)}`}
                                        onChange={(e) => {
                                            const [h, m] = e.target.value.split(":").map(Number)
                                            if (!isNaN(h)) setHour(h)
                                            if (!isNaN(m)) setMinute(m)
                                        }}
                                        className="w-full bg-slate-50/50 border border-slate-100 hover:border-emerald-100 focus:border-emerald-500 focus:bg-white rounded-xl px-3.5 py-2 text-sm font-mono font-bold text-slate-800 transition-all outline-none"
                                    />
                                </div>

                                <Button
                                    type="button"
                                    onClick={confirmDateTime}
                                    className="w-full mt-4 h-11 text-sm font-extrabold rounded-full bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-0.5 shadow-md transition-all active:scale-95"
                                >
                                    Confirm — {format(date, "d MMM")} at {pad(hour)}:{pad(minute)}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

// ─── Section divider ─────────────────────────────────────────────────────────
function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
    return (
        <div className="flex items-center gap-2.5 pb-3 mb-1">
            <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</span>
            <div className="flex-1 h-px bg-slate-100" />
        </div>
    )
}

// ─── Error message ────────────────────────────────────────────────────────────
function FieldError({ msg }: { msg?: string }) {
    if (!msg) return null
    return (
        <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1.5 font-semibold">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {msg}
        </p>
    )
}

// ─── Main Form ────────────────────────────────────────────────────────────────
type OtpPhase = "idle" | "sending" | "sent" | "verifying" | "verified"

// Insurance products config
const INSURANCE_PRODUCTS = [
    { key: "term",       icon: Shield,      label: "Pure Protection",          sub: "Term Insurance" },
    { key: "health",     icon: Heart,       label: "Health Insurance",         sub: "Medical Cover" },
    { key: "retirement", icon: Umbrella,    label: "Retirement Planning",      sub: "Structured Income" },
    { key: "child",      icon: Baby,        label: "Child Future Planning",    sub: "Education Goals" },
    { key: "wealth",     icon: TrendingUp,  label: "Investment & Wealth",      sub: "Wealth Creation" },
    { key: "business",   icon: Briefcase,   label: "Business & Keyman",        sub: "Business Risk" },
]

const HEALTH_OPTIONS = [
    { key: "healthy",  label: "Healthy",   color: "emerald" },
    { key: "medium",   label: "Medium",    color: "amber" },
    { key: "notgood",  label: "Not Good",  color: "orange" },
    { key: "poor",     label: "Poor",      color: "red" },
]

export default function InquiryForm({ defaultType, compact = false }: { defaultType?: "term" | "health"; compact?: boolean }) {
    const [done, setDone] = useState(false)
    const [insuranceType, setType] = useState(defaultType || "")
    const [state, setState] = useState("")
    const [language, setLanguage] = useState("")
    const [langManual, setLangManual] = useState(false)
    const [slotIso, setSlotIso] = useState("")
    const [slotLabel, setSlotLabel] = useState("")
    const [pickerOpen, setPickerOpen] = useState(false)
    const [typeErr, setTypeErr] = useState("")
    const [stateErr, setStateErr] = useState("")
    const [langErr, setLangErr] = useState("")
    // New fields
    const [dob, setDob] = useState("")
    const [whoFor, setWhoFor] = useState<"self" | "family" | "">("")
    const [healthRating, setHealthRating] = useState("")
    const [healthNote, setHealthNote] = useState("")

    // Dynamic settings
    const [allowedLanguages, setAllowedLanguages] = useState<string[]>([])
    const [activeShifts, setActiveShifts] = useState<ShiftTiming[]>([])

    useEffect(() => {
        axios.get("/api/settings")
            .then(res => {
                const settings = res.data.settings
                if (settings) {
                    if (settings.languages) {
                        const visibleLangs = settings.languages
                            .filter((l: any) => l.visible)
                            .map((l: any) => l.language)
                        setAllowedLanguages(visibleLangs)
                    }
                    if (settings.shifts) setActiveShifts(settings.shifts)
                }
            })
            .catch(err => console.error("Failed to load dynamic settings:", err))
    }, [])

    // ── Phone OTP state
    const [otpPhase, setOtpPhase] = useState<OtpPhase>("idle")
    const [otpCode, setOtpCode] = useState("")
    const [otpError, setOtpError] = useState("")
    const [verifiedPhone, setVerifiedPhone] = useState("")
    const [countdown, setCountdown] = useState(0)
    const otpRef = useRef<HTMLInputElement>(null)

    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<InquiryInput>({
        resolver: zodResolver(InquirySchema),
        defaultValues: { insuranceType: defaultType, state: "", language: "", pincode: "", preferredSlot: "" },
    })
    const watchedPhone = watch("phone", "")
    const phoneValid = /^[6-9]\d{9}$/.test(watchedPhone || "")
    const phoneChanged = verifiedPhone && verifiedPhone !== watchedPhone

    useEffect(() => {
        if (countdown <= 0) return
        const t = setTimeout(() => setCountdown(c => c - 1), 1000)
        return () => clearTimeout(t)
    }, [countdown])

    // Auto-preselect language — only if mapped language is visible
    useEffect(() => {
        if (!state || langManual) return
        const lang = STATE_LANGUAGE_MAP[state]
        if (!lang) return
        const visibleSet = allowedLanguages.length > 0 ? allowedLanguages : LANGUAGES
        if (visibleSet.includes(lang)) {
            setLanguage(lang)
            setValue("language", lang)
            setLangErr("")
        } else {
            setLanguage("")
            setValue("language", "" as any)
        }
    }, [state, langManual, allowedLanguages, setValue])

    async function sendOtp() {
        setOtpPhase("sending"); setOtpError("")
        try {
            await axios.post("/api/inquiries/verify?type=phone", { phone: watchedPhone })
            setOtpPhase("sent"); setOtpCode(""); setCountdown(30)
            setTimeout(() => otpRef.current?.focus(), 100)
        } catch (err) {
            setOtpPhase("idle")
            setOtpError(axios.isAxiosError(err) ? err.response?.data?.error ?? "Failed to send OTP" : "Failed to send OTP")
        }
    }

    async function verifyOtp() {
        if (otpCode.length !== 6) { setOtpError("Enter the 6-digit code"); return }
        setOtpPhase("verifying"); setOtpError("")
        try {
            await axios.put("/api/inquiries/verify?type=phone", { phone: watchedPhone, code: otpCode })
            setOtpPhase("verified"); setVerifiedPhone(watchedPhone)
            toast.success("Phone verified!")
        } catch (err) {
            setOtpPhase("sent")
            setOtpError(axios.isAxiosError(err) ? err.response?.data?.error ?? "Invalid OTP" : "Invalid OTP")
        }
    }

    async function onSubmit(data: InquiryInput) {
        if (!insuranceType) { setTypeErr("Please select insurance type"); return }
        if (!state)         { setStateErr("Please select your state"); return }
        if (!language)      { setLangErr("Please select your language"); return }
        // Phone OTP verification temporarily bypassed for testing
        /*
        if (otpPhase !== "verified" || phoneChanged) {
            setOtpError("Please verify your mobile number first"); return
        }
        */
        try {
            await axios.post("/api/inquiries", {
                name: data.name,
                phone: data.phone,
                email: data.email,
                message: data.message,
                insuranceType,
                state,
                language,
                pincode: data.pincode,
                preferredSlot: slotIso || undefined,
                dob: dob || undefined,
                whoFor: whoFor || undefined,
                healthRating: healthRating || undefined,
                healthNote: healthNote || undefined,
            })
            setDone(true)
        } catch (err) {
            toast.error(axios.isAxiosError(err) ? err.response?.data?.error ?? "Something went wrong" : "Something went wrong")
        }
    }

    // ── Success state ────────────────────────────────────────────────────────
    if (done) {
        return (
            <div className="text-center py-16 px-4 animate-fade-up">
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-emerald-50 border-2 border-emerald-100">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-300 animate-spin opacity-30" />
                </div>
                <h3 className="text-2xl font-black mb-3 tracking-tight text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                    You're All Set! 🎉
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 max-w-xs mx-auto font-medium">
                    {slotLabel
                        ? `Our advisor has blocked a dedicated slot on ${slotLabel}.`
                        : "Our certified advisor will contact you shortly."}
                </p>
                {slotLabel && (
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <CalendarDays className="w-4 h-4 shrink-0" />
                        {slotLabel}
                    </div>
                )}
                <p className="text-[11px] text-slate-400 mt-8 font-medium">Confirmation sent to your mobile & email.</p>
            </div>
        )
    }

    // ── Shared styles ────────────────────────────────────────────────────────
    // Single field class used by BOTH Input AND SelectTrigger so they look identical
    const fieldCls = [
        "w-full bg-white rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800",
        "border border-slate-200 hover:border-slate-300",
        "focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50",
        "transition-all duration-200 outline-none shadow-sm",
        "placeholder:text-slate-400 placeholder:font-normal",
    ].join(" ")
    // SelectTrigger also needs h-auto and flex alignment (shadcn adds these differently)
    const selectCls = fieldCls + " flex items-center justify-between text-left h-auto"
    const labelCls: React.CSSProperties = {
        fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.07em",
        textTransform: "uppercase" as const, color: "#64748B",
        fontFamily: "var(--font-heading)", display: "block", marginBottom: "0.4rem",
    }

    // Bypassed for testing purposes
    const phoneVerified = true // otpPhase === "verified" && !phoneChanged
    const allVerified = true // phoneVerified

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 text-left">

            {/* ── Verification progress strip ─────────────────────── */}
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className={`flex items-center gap-1.5 flex-1 px-2 py-1 rounded-xl text-xs font-bold transition-all ${phoneVerified ? "text-emerald-700 bg-emerald-50" : "text-slate-400"}`}>
                    <Smartphone className={`w-3.5 h-3.5 shrink-0 ${phoneVerified ? "text-emerald-500" : "text-slate-300"}`} />
                    <span>Mobile {phoneVerified ? "✓" : "pending"}</span>
                </div>
                <div className="w-px h-5 bg-slate-200" />
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-xl text-xs font-bold transition-all ${allVerified ? "text-emerald-700 bg-emerald-50" : "text-slate-400"}`}>
                    <ShieldCheck className={`w-3.5 h-3.5 shrink-0 ${allVerified ? "text-emerald-500" : "text-slate-300"}`} />
                    <span>{allVerified ? "Verified!" : "Locked"}</span>
                </div>
            </div>

            {/* ── Section 1: Personal Info ────────────────────────── */}
            <div className="space-y-4">
                <SectionLabel icon={User} label="Personal Details" />

                {/* Name */}
                <div>
                    <label style={labelCls}>Full Name</label>
                    <Input placeholder="Ravi Sharma" {...register("name")} className={fieldCls} />
                    <FieldError msg={errors.name?.message} />
                </div>

                {/* Phone */}
                <div>
                    <label style={labelCls}>Mobile Number</label>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Input
                                type="tel"
                                placeholder="9876543210"
                                {...register("phone")}
                                className={cn(fieldCls, phoneVerified && "pr-10", phoneChanged && "border-amber-400 focus:border-amber-500")}
                            />
                            {phoneVerified && (
                                <ShieldCheck className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                            )}
                        </div>
                        {/* Show Send OTP when idle, OR Re-verify when number changed after verification */}
                        {/* OTP verification disabled for testing
                        {(otpPhase === "idle" || otpPhase === "sending") && phoneValid && (
                            <button type="button" onClick={sendOtp} disabled={otpPhase === "sending"}
                                className="shrink-0 px-4 h-[46px] rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:-translate-y-0.5"
                            >
                                {otpPhase === "sending" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Smartphone className="w-3.5 h-3.5" />}
                                Send OTP
                            </button>
                        )}
                        {phoneChanged && phoneValid && (
                            <button type="button" onClick={() => { setVerifiedPhone(""); setOtpPhase("idle"); setOtpCode(""); setOtpError("") }}
                                className="shrink-0 px-4 h-[46px] rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:-translate-y-0.5"
                            >
                                <AlertCircle className="w-3.5 h-3.5" />
                                Re-verify
                            </button>
                        )}
                        */}
                    </div>

                    {/* Changed-number warning */}
                    {phoneChanged && (
                        <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <p className="text-xs font-semibold text-amber-700">Number changed — please re-verify to continue.</p>
                        </div>
                    )}

                    <FieldError msg={errors.phone?.message} />

                    {(otpPhase === "sent" || otpPhase === "verifying") && (
                        <div className="mt-2.5 rounded-2xl p-4 space-y-3 border border-emerald-100 bg-emerald-50/60 animate-fade-up">
                            <p className="text-xs font-bold text-emerald-700">Enter the 6-digit OTP sent to +91 {watchedPhone}</p>
                            <div className="flex gap-2">
                                <input ref={otpRef} maxLength={6} value={otpCode}
                                    onChange={e => { setOtpCode(e.target.value.replace(/\D/g, "")); setOtpError("") }}
                                    placeholder="• • • • • •"
                                    className="flex-1 rounded-xl px-4 py-2.5 text-sm font-mono tracking-[0.4em] text-center border border-slate-200 focus:border-emerald-500 outline-none font-bold bg-white" />
                                <button type="button" onClick={verifyOtp}
                                    disabled={otpPhase === "verifying" || otpCode.length !== 6}
                                    className="px-5 rounded-xl text-xs font-bold transition-all text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                                    style={{ opacity: otpCode.length !== 6 ? 0.6 : 1 }}>
                                    {otpPhase === "verifying" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Verify"}
                                </button>
                            </div>
                            {countdown > 0
                                ? <p className="text-[10px] text-slate-400 font-medium">Resend in {countdown}s</p>
                                : <button type="button" onClick={sendOtp} className="text-[10px] font-black underline text-emerald-600 hover:text-emerald-700">Resend OTP</button>
                            }
                        </div>
                    )}
                    {otpError && <FieldError msg={otpError} />}
                    {phoneVerified && (
                        <p className="text-xs text-emerald-600 flex items-center gap-1.5 font-bold mt-1.5">
                            <ShieldCheck className="w-4 h-4" /> Mobile number verified
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label style={labelCls}>Email Address (optional)</label>
                    <Input
                        type="email"
                        placeholder="ravi@example.com"
                        {...register("email")}
                        className={fieldCls}
                    />
                    <FieldError msg={errors.email?.message} />
                </div>
            </div>

            {/* ── Section 2: Policy Preferences ──────────────────── */}
            <div className="space-y-4">
                <SectionLabel icon={Globe} label="Your Preferences" />

                {/* Insurance Type — clickable pill cards */}
                <div>
                    <label style={labelCls}>Insurance Type</label>
                    <div className="grid grid-cols-2 gap-2.5 mt-1">
                        {INSURANCE_PRODUCTS.map(({ key, icon: Icon, label, sub }) => {
                            const active = insuranceType === key
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => { setType(key); setValue("insuranceType", key as any); setTypeErr("") }}
                                    className={cn(
                                        "flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all duration-150 hover:shadow-sm",
                                        active
                                            ? "border-orange-400 bg-orange-50 shadow-sm"
                                            : "border-slate-200 bg-white hover:border-orange-200"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                        active ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500"
                                    )}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className={cn("text-[11px] font-extrabold leading-none truncate", active ? "text-orange-700" : "text-slate-800")}>{label}</p>
                                        <p className="text-[9.5px] font-semibold text-slate-400 mt-0.5 truncate">{sub}</p>
                                    </div>
                                    {active && <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 ml-auto" />}
                                </button>
                            )
                        })}
                    </div>
                    <FieldError msg={typeErr} />
                </div>

                {/* DOB */}
                <div>
                    <label style={labelCls}>Date of Birth</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                        className={cn(fieldCls, "cursor-pointer")}
                    />
                </div>

                {/* Who is this for */}
                <div>
                    <label style={labelCls}>Who is this for?</label>
                    <div className="flex gap-3 mt-1">
                        {([{ key: "self", label: "Yourself", icon: User }, { key: "family", label: "Family", icon: Users }] as const).map(({ key, label, icon: Icon }) => {
                            const active = whoFor === key
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setWhoFor(key)}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition-all duration-150",
                                        active
                                            ? "border-orange-400 bg-orange-50 text-orange-700 shadow-sm"
                                            : "border-slate-200 bg-white text-slate-600 hover:border-orange-200"
                                    )}
                                >
                                    <Icon className={cn("w-4 h-4", active ? "text-orange-500" : "text-slate-400")} />
                                    {label}
                                    {active && <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Health Rating */}
                <div>
                    <label style={labelCls}>Rate Your Health</label>
                    <div className="grid grid-cols-4 gap-2 mt-1">
                        {HEALTH_OPTIONS.map(({ key, label, color }) => {
                            const active = healthRating === key
                            const colorMap: Record<string, string> = {
                                emerald: active ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:border-emerald-300",
                                amber:   active ? "border-amber-400 bg-amber-50 text-amber-700"     : "border-slate-200 text-slate-600 hover:border-amber-300",
                                orange:  active ? "border-orange-400 bg-orange-50 text-orange-700"  : "border-slate-200 text-slate-600 hover:border-orange-300",
                                red:     active ? "border-red-400 bg-red-50 text-red-700"           : "border-slate-200 text-slate-600 hover:border-red-300",
                            }
                            const dotMap: Record<string, string> = {
                                emerald: "bg-emerald-400", amber: "bg-amber-400", orange: "bg-orange-400", red: "bg-red-400"
                            }
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => { setHealthRating(key); if (key !== "poor") setHealthNote("") }}
                                    className={cn(
                                        "flex flex-col items-center gap-1.5 py-3 rounded-xl border font-semibold text-xs transition-all duration-150",
                                        colorMap[color]
                                    )}
                                >
                                    <div className={cn("w-2.5 h-2.5 rounded-full", dotMap[color])} />
                                    {label}
                                </button>
                            )
                        })}
                    </div>

                    {/* Conditional textarea for Poor */}
                    {healthRating === "poor" && (
                        <div className="mt-3 animate-fade-up">
                            <label style={{ ...labelCls, color: "#EF4444" }}>Tell us more about your health condition</label>
                            <textarea
                                value={healthNote}
                                onChange={e => setHealthNote(e.target.value)}
                                rows={3}
                                placeholder="e.g. I have diabetes and hypertension..."
                                className={cn(fieldCls, "resize-none border-red-200 focus:border-red-400 focus:ring-red-50")}
                            />
                            <p className="text-[10px] text-slate-400 font-medium mt-1">This helps our advisor prepare specific plan options for your situation.</p>
                        </div>
                    )}
                </div>

                {/* State + Language — 2 col */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label style={labelCls}>State</label>
                        <Select value={state} onValueChange={(v) => { setState(v); setValue("state", v); setStateErr(""); setLangManual(false) }}>
                            <SelectTrigger className={cn(selectCls, stateErr && "border-red-400")}>
                                <SelectValue placeholder="Your state" />
                            </SelectTrigger>
                            <SelectContent>
                                {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FieldError msg={stateErr} />
                    </div>

                    <div>
                        <label style={labelCls} className="flex items-center gap-1">
                            Language
                            {language && state && STATE_LANGUAGE_MAP[state] === language && !langManual && (
                                <span className="font-bold text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 ml-1">auto</span>
                            )}
                        </label>
                        <Select value={language} onValueChange={(v) => { setLanguage(v); setValue("language", v); setLangErr(""); setLangManual(true) }}>
                            <SelectTrigger className={cn(selectCls, langErr && "border-red-400")}>
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                {(allowedLanguages.length > 0 ? allowedLanguages : LANGUAGES).map((l) => (
                                    <SelectItem key={l} value={l}>{l}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FieldError msg={langErr} />
                    </div>
                </div>

                {/* Pincode */}
                <div>
                    <label style={labelCls}>Pincode</label>
                    <Input
                        placeholder="110001"
                        maxLength={6}
                        {...register("pincode")}
                        className={fieldCls}
                    />
                    <FieldError msg={errors.pincode?.message} />
                </div>
            </div>

            {/* ── Section 3: Preferred Call Time ─────────────────── */}
            <div className="space-y-3">
                <SectionLabel icon={Clock} label="Preferred Call Time (Required)" />

                {!slotLabel ? (
                    <button
                        type="button"
                        onClick={() => setPickerOpen(o => !o)}
                        className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 bg-white border-2 border-dashed text-left shadow-sm hover:shadow"
                        style={{
                            borderColor: pickerOpen ? "var(--brand)" : "#E2E8F0",
                            background: pickerOpen ? "var(--brand-light)" : "#FFFFFF",
                            color: pickerOpen ? "var(--brand-dark)" : "#64748B",
                        }}
                    >
                        <span className="flex items-center gap-2.5">
                            <CalendarDays className="w-4 h-4 text-emerald-500 shrink-0" />
                            Choose any date &amp; time — 24/7
                        </span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform text-slate-400", pickerOpen && "rotate-180")} />
                    </button>
                ) : (
                    <div className="flex items-center gap-3 rounded-2xl px-4 py-3.5 border-2 border-emerald-400 bg-emerald-50/60 shadow-sm animate-fade-up">
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Selected consultation time</p>
                            <p className="text-sm font-bold truncate text-slate-800">{slotLabel}</p>
                        </div>
                        <button type="button" onClick={() => { setSlotIso(""); setSlotLabel(""); setPickerOpen(false); setValue("preferredSlot", "", { shouldValidate: true }) }}
                            className="text-slate-400 hover:text-slate-800 transition-colors p-1 rounded-lg hover:bg-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {pickerOpen && !slotLabel && (
                    <div className="mt-2">
                        <FreeTimePicker
                            value={slotIso}
                            onChange={(iso, label) => {
                                setSlotIso(iso);
                                setSlotLabel(label);
                                setPickerOpen(false);
                                setValue("preferredSlot", iso, { shouldValidate: true });
                            }}
                            shifts={activeShifts}
                        />
                    </div>
                )}
                <FieldError msg={errors.preferredSlot?.message} />
            </div>

            {/* ── Section 4: Message ──────────────────────────────── */}
            {!compact && (
                <div className="space-y-3">
                    <SectionLabel icon={MessageSquare} label="Message (optional)" />
                    <Textarea
                        placeholder="Any specific questions or requirements..."
                        rows={3}
                        {...register("message")}
                        className={fieldCls + " resize-none"}
                    />
                </div>
            )}

            {/* ── Submit ──────────────────────────────────────────── */}
            <div className="space-y-3 pt-1">
                <Button
                    type="submit"
                    className="w-full h-13 font-extrabold rounded-full text-white shadow-lg transition-all duration-200 active:scale-98 flex justify-center items-center gap-2 text-sm"
                    disabled={isSubmitting}
                    style={{
                        background: allVerified
                            ? "linear-gradient(135deg, #059669 0%, #047857 100%)"
                            : "#94A3B8",
                        cursor: !allVerified ? "not-allowed" : "pointer",
                        boxShadow: allVerified ? "0 8px 24px -4px rgba(5, 150, 105, 0.35)" : "none",
                    }}
                >
                    {isSubmitting ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                    ) : !allVerified ? (
                        <>Verify Mobile & Email to Continue</>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4 shrink-0" />
                            Request Callback
                        </>
                    )}
                </Button>

                {/* Trust line */}
                <p className="text-center text-[11px] text-slate-400 font-medium">
                     🔒 No spam · Certified Experts · 100% Free
                </p>
            </div>

        </form>
    )
}
