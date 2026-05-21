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
    Clock, X, ShieldCheck, AlertCircle, Smartphone, Mail, Sparkles
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
                    style={{ color: "var(--text-muted)" }}
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>
                    {MONTHS[viewMonth]} {viewYear}
                </span>
                <button type="button" onClick={nextMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-emerald-600 transition-colors border border-slate-100"
                    style={{ color: "var(--text-muted)" }}
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
                {DAYS.map((d) => (
                    <div key={d} className="text-center text-[10px] font-black uppercase tracking-wider py-1 text-slate-400" style={{ fontFamily: "var(--font-heading)" }}>{d}</div>
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
function ScrollPicker({ items, value, onSelect, label, format: fmt = (v: number) => pad(v) }: {
    items: number[]; value: number; onSelect: (v: number) => void; label: string; format?: (v: number) => string
}) {
    return (
        <div className="flex flex-col items-center gap-1.5 flex-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400" style={{ fontFamily: "var(--font-heading)" }}>{label}</span>
            <div className="h-40 overflow-y-auto rounded-2xl w-full border border-slate-100 bg-slate-50/50 shadow-inner scrollbar-thin">
                {items.map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => onSelect(item)}
                        className="w-full py-2.5 text-xs sm:text-sm font-mono font-bold transition-all hover:bg-slate-100 flex justify-center items-center"
                        style={{
                            background: value === item ? "var(--brand)" : "transparent",
                            color: value === item ? "#FFFFFF" : "var(--text-secondary)",
                        }}
                    >
                        {fmt(item)}
                    </button>
                ))}
            </div>
        </div>
    )
}

// ─── Free Time Picker ─────────────────────────────────────────────────────────
function FreeTimePicker({ value, onChange }: {
    value: string; onChange: (iso: string, label: string) => void
}) {
    const [date, setDate] = useState<Date | null>(null)
    const [hour, setHour] = useState(9)
    const [minute, setMinute] = useState(0)
    const [step, setStep] = useState<"date" | "time">("date")

    function confirmDateTime() {
        if (!date) return
        onChange(isoSlot(date, hour, minute), formatSlot(date, hour, minute))
    }

    return (
        <div className="rounded-3xl overflow-hidden border border-emerald-100 bg-white shadow-xl animate-fade-up">
            {/* Tab bar */}
            <div className="flex bg-slate-50 border-b border-emerald-50">
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
                        {s === "date" ? <><CalendarDays className="w-3.5 h-3.5" /> Pick Date</> : <><Clock className="w-3.5 h-3.5" /> Pick Time</>}
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
                                    {format(date, "d MMMM yyyy")} — any time, 24/7
                                </p>
                                <div className="flex items-start justify-center gap-3">
                                    <ScrollPicker label="Hour" items={HOURS} value={hour} onSelect={setHour} />
                                    <div className="flex flex-col items-center justify-center h-40 pt-6">
                                        <span className="text-2xl font-bold text-slate-300">:</span>
                                    </div>
                                    <ScrollPicker label="Minute" items={MINS} value={minute} onSelect={setMinute} />
                                </div>

                                <div className="mt-4 text-center rounded-2xl py-3 px-4 border border-emerald-100 bg-emerald-50/50">
                                    <p className="text-[10px] uppercase font-black tracking-wider text-emerald-600">Your selected time</p>
                                    <p className="text-lg font-black text-emerald-700" style={{ fontFamily: "var(--font-heading)" }}>
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

// ─── Main Form ────────────────────────────────────────────────────────────────
type OtpPhase = "idle" | "sending" | "sent" | "verifying" | "verified"

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

    // ── Phone OTP state
    const [otpPhase, setOtpPhase] = useState<OtpPhase>("idle")
    const [otpCode, setOtpCode] = useState("")
    const [otpError, setOtpError] = useState("")
    const [verifiedPhone, setVerifiedPhone] = useState("")
    const [countdown, setCountdown] = useState(0)
    const otpRef = useRef<HTMLInputElement>(null)

    // ── Email OTP state
    const [emailOtpPhase, setEmailOtpPhase] = useState<OtpPhase>("idle")
    const [emailOtpCode, setEmailOtpCode] = useState("")
    const [emailOtpError, setEmailOtpError] = useState("")
    const [verifiedEmail, setVerifiedEmail] = useState("")
    const [emailCountdown, setEmailCountdown] = useState(0)
    const emailOtpRef = useRef<HTMLInputElement>(null)

    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<InquiryInput>({
        resolver: zodResolver(InquirySchema),
        defaultValues: { insuranceType: defaultType, state: "", language: "" },
    })
    const watchedPhone = watch("phone", "")
    const watchedEmail = watch("email", "")
    const phoneValid = /^[6-9]\d{9}$/.test(watchedPhone || "")
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail || "")
    const phoneChanged = verifiedPhone && verifiedPhone !== watchedPhone
    const emailChanged = verifiedEmail && verifiedEmail !== watchedEmail

    // Phone countdown
    useEffect(() => {
        if (countdown <= 0) return
        const t = setTimeout(() => setCountdown(c => c - 1), 1000)
        return () => clearTimeout(t)
    }, [countdown])

    // Email countdown
    useEffect(() => {
        if (emailCountdown <= 0) return
        const t = setTimeout(() => setEmailCountdown(c => c - 1), 1000)
        return () => clearTimeout(t)
    }, [emailCountdown])

    // Auto-preselect language when state changes (unless user manually changed it)
    useEffect(() => {
        if (state && !langManual) {
            const lang = STATE_LANGUAGE_MAP[state]
            if (lang && LANGUAGES.includes(lang)) {
                setLanguage(lang)
                setValue("language", lang)
                setLangErr("")
            }
        }
    }, [state, langManual, setValue])

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

    async function sendEmailOtp() {
        setEmailOtpPhase("sending"); setEmailOtpError("")
        try {
            await axios.post("/api/inquiries/verify?type=email", { email: watchedEmail })
            setEmailOtpPhase("sent"); setEmailOtpCode(""); setEmailCountdown(30)
            setTimeout(() => emailOtpRef.current?.focus(), 100)
        } catch (err) {
            setEmailOtpPhase("idle")
            setEmailOtpError(axios.isAxiosError(err) ? err.response?.data?.error ?? "Failed to send OTP" : "Failed to send OTP")
        }
    }

    async function verifyEmailOtp() {
        if (emailOtpCode.length !== 6) { setEmailOtpError("Enter the 6-digit code"); return }
        setEmailOtpPhase("verifying"); setEmailOtpError("")
        try {
            await axios.put("/api/inquiries/verify?type=email", { email: watchedEmail, code: emailOtpCode })
            setEmailOtpPhase("verified"); setVerifiedEmail(watchedEmail)
            toast.success("Email verified!")
        } catch (err) {
            setEmailOtpPhase("sent")
            setEmailOtpError(axios.isAxiosError(err) ? err.response?.data?.error ?? "Invalid OTP" : "Invalid OTP")
        }
    }

    async function onSubmit(data: InquiryInput) {
        // Guard: custom state fields not tracked by react-hook-form
        if (!insuranceType) { setTypeErr("Please select insurance type"); return }
        if (!state)         { setStateErr("Please select your state"); return }
        if (!language)      { setLangErr("Please select your language"); return }
        // Guard: OTP verification
        if (otpPhase !== "verified" || phoneChanged) {
            setOtpError("Please verify your mobile number first"); return
        }
        if (emailOtpPhase !== "verified" || emailChanged) {
            setEmailOtpError("Please verify your email address first"); return
        }
        try {
            // Merge useState-controlled fields with react-hook-form data
            await axios.post("/api/inquiries", {
                name: data.name,
                phone: data.phone,
                email: data.email,
                message: data.message,
                insuranceType,
                state,
                language,
                preferredSlot: slotIso || undefined,
            })
            setDone(true)
        } catch (err) {
            toast.error(axios.isAxiosError(err) ? err.response?.data?.error ?? "Something went wrong" : "Something went wrong")
        }
    }

    if (done) {
        return (
            <div className="text-center py-12 px-4 animate-fade-up">
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-emerald-50 border border-emerald-100 shadow-sm shadow-emerald-50">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-300 animate-spin opacity-30" />
                </div>
                <h3 className="text-2xl font-black mb-3 tracking-tight text-slate-900 animate-pulse" style={{ fontFamily: "var(--font-heading)" }}>
                    You're Booked! 🎉
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 max-w-sm mx-auto font-medium" style={{ fontFamily: "var(--font-body)" }}>
                    {slotLabel ? `Our certified advisor has blocked a dedicated slot for you on ${slotLabel}.` : "Our certified advisor will contact you shortly."}
                </p>
                {slotLabel && (
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold px-4.5 py-2.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm shadow-emerald-50">
                        <CalendarDays className="w-4 h-4 shrink-0" />
                        {slotLabel}
                    </div>
                )}
                <p className="text-[11px] text-slate-400 mt-8 font-medium">Confirmation details have been sent to your verified mobile & email.</p>
            </div>
        )
    }

    // Modern inputs visual variables
    const inputClass = "w-full bg-slate-50/50 hover:bg-slate-50/80 border border-slate-100 hover:border-emerald-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50/50 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 transition-all duration-200 outline-none placeholder:text-slate-400 placeholder:font-normal"
    const textareaClass = "w-full bg-slate-50/50 hover:bg-slate-50/80 border border-slate-100 hover:border-emerald-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50/50 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 transition-all duration-200 outline-none placeholder:text-slate-400 placeholder:font-normal resize-none"
    const selectTriggerClass = "w-full flex items-center justify-between bg-slate-50/50 hover:bg-slate-50/80 border border-slate-100 hover:border-emerald-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50/50 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 transition-all duration-200 outline-none text-left"
    const labelStyle = { fontSize: "0.72rem", fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--brand-dark)", fontFamily: "var(--font-heading)", display: "block", marginBottom: "0.35rem" }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">

            {/* Name */}
            <div className="space-y-1">
                <Label style={labelStyle}>Full Name</Label>
                <Input placeholder="Ravi Sharma" {...register("name")} className={inputClass} style={{ border: "none" }} />
                {errors.name && (
                    <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1 font-semibold animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
                <Label style={labelStyle}>Mobile Number</Label>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Input type="tel" placeholder="9876543210" {...register("phone")} className={inputClass} style={{ border: "none" }} />
                        {otpPhase === "verified" && !phoneChanged && (
                            <ShieldCheck className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 animate-pulse" />
                        )}
                    </div>
                    {(otpPhase === "idle" || otpPhase === "sending" || phoneChanged) && phoneValid && (
                        <button type="button" onClick={sendOtp} disabled={otpPhase === "sending"}
                            className="shrink-0 px-4 h-11.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-100 hover:-translate-y-0.5"
                        >
                            {otpPhase === "sending" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Smartphone className="w-3.5 h-3.5" />}
                            {phoneChanged ? "Re-verify" : "Send OTP"}
                        </button>
                    )}
                </div>
                {errors.phone && (
                    <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1 font-semibold animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone.message}
                    </p>
                )}

                {/* OTP entry box */}
                {(otpPhase === "sent" || otpPhase === "verifying") && (
                    <div className="rounded-2xl p-4 space-y-3 border border-emerald-100 bg-emerald-50/50 shadow-inner animate-fade-up">
                        <p className="text-xs font-bold text-emerald-700">Enter the 6-digit OTP sent to +91 {watchedPhone}</p>
                        <div className="flex gap-2">
                            <input ref={otpRef} maxLength={6} value={otpCode} onChange={e => { setOtpCode(e.target.value.replace(/\D/g, "")); setOtpError("") }}
                                placeholder="123456" className="flex-1 rounded-xl px-4 py-2.5 text-sm font-mono tracking-widest text-center border border-slate-100 focus:border-emerald-500 outline-none font-bold" />
                            <button type="button" onClick={verifyOtp} disabled={otpPhase === "verifying" || otpCode.length !== 6}
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
                {otpError && (
                    <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1 font-semibold animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {otpError}
                    </p>
                )}
                {otpPhase === "verified" && !phoneChanged && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1.5 font-bold mt-1">
                        <ShieldCheck className="w-4 h-4" />
                        Mobile number verified
                    </p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <Label style={labelStyle}>Email</Label>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Input type="email" placeholder="ravi@example.com" {...register("email")} className={inputClass} style={{ border: "none" }} />
                        {emailOtpPhase === "verified" && !emailChanged && (
                            <ShieldCheck className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 animate-pulse" />
                        )}
                    </div>
                    {(emailOtpPhase === "idle" || emailOtpPhase === "sending" || emailChanged) && emailValid && (
                        <button type="button" onClick={sendEmailOtp} disabled={emailOtpPhase === "sending"}
                            className="shrink-0 px-4 h-11.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-100 hover:-translate-y-0.5"
                        >
                            {emailOtpPhase === "sending" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
                            {emailChanged ? "Re-verify" : "Send OTP"}
                        </button>
                    )}
                </div>
                {errors.email && (
                    <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1 font-semibold animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email.message}
                    </p>
                )}

                {/* Email OTP entry box */}
                {(emailOtpPhase === "sent" || emailOtpPhase === "verifying") && (
                    <div className="rounded-2xl p-4 space-y-3 border border-emerald-100 bg-emerald-50/50 shadow-inner animate-fade-up">
                        <p className="text-xs font-bold text-emerald-700">OTP sent to {watchedEmail}</p>
                        <div className="flex gap-2">
                            <input ref={emailOtpRef} maxLength={6} value={emailOtpCode}
                                onChange={e => { setEmailOtpCode(e.target.value.replace(/\D/g, "")); setEmailOtpError("") }}
                                placeholder="123456" className="flex-1 rounded-xl px-4 py-2.5 text-sm font-mono tracking-widest text-center border border-slate-100 focus:border-emerald-500 outline-none font-bold" />
                            <button type="button" onClick={verifyEmailOtp}
                                disabled={emailOtpPhase === "verifying" || emailOtpCode.length !== 6}
                                className="px-5 rounded-xl text-xs font-bold transition-all text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                                style={{ opacity: emailOtpCode.length !== 6 ? 0.6 : 1 }}>
                                {emailOtpPhase === "verifying" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Verify"}
                            </button>
                        </div>
                        {emailCountdown > 0
                            ? <p className="text-[10px] text-slate-400 font-medium">Resend in {emailCountdown}s</p>
                            : <button type="button" onClick={sendEmailOtp} className="text-[10px] font-black underline text-emerald-600 hover:text-emerald-700">Resend OTP</button>
                        }
                    </div>
                )}
                {emailOtpError && (
                    <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1 font-semibold animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {emailOtpError}
                    </p>
                )}
                {emailOtpPhase === "verified" && !emailChanged && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1.5 font-bold mt-1">
                        <ShieldCheck className="w-4 h-4" />
                        Email verified
                    </p>
                )}
            </div>

            {/* Insurance type */}
            <div className="space-y-1">
                <Label style={labelStyle}>Insurance Type</Label>
                <Select value={insuranceType} onValueChange={(v) => { setType(v); setValue("insuranceType", v as "term" | "health"); setTypeErr("") }}>
                    <SelectTrigger className={selectTriggerClass} style={{ border: typeErr ? "1px solid #DC2626" : "none" }}>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="term">Term Life Insurance</SelectItem>
                        <SelectItem value="health">Health Insurance</SelectItem>
                    </SelectContent>
                </Select>
                {typeErr && (
                    <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1 font-semibold animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {typeErr}
                    </p>
                )}
            </div>

            {/* State + Language */}
            <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1 text-left">
                    <Label style={labelStyle}>State</Label>
                    <Select value={state} onValueChange={(v) => { setState(v); setValue("state", v); setStateErr(""); setLangManual(false) }}>
                        <SelectTrigger className={selectTriggerClass} style={{ border: stateErr ? "1px solid #DC2626" : "none" }}>
                            <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                            {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    {stateErr && (
                        <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1 font-semibold animate-pulse">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {stateErr}
                        </p>
                    )}
                </div>
                <div className="space-y-1 text-left">
                    <Label style={labelStyle} className="flex items-center gap-1">
                        Language
                        {language && state && STATE_LANGUAGE_MAP[state] === language && !langManual && (
                            <span className="font-bold text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">auto</span>
                        )}
                    </Label>
                    <Select value={language} onValueChange={(v) => { setLanguage(v); setValue("language", v); setLangErr(""); setLangManual(true) }}>
                        <SelectTrigger className={selectTriggerClass} style={{ border: langErr ? "1px solid #DC2626" : "none" }}>
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            {LANGUAGES.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    {langErr && (
                        <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1 font-semibold animate-pulse">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {langErr}
                        </p>
                    )}
                    {language && state && !langManual && (
                        <p className="text-[9px] text-slate-400 font-semibold mt-1">Auto-selected for {state}.</p>
                    )}
                </div>
            </div>

            {/* Preferred call time */}
            <div className="space-y-2">
                <Label className="flex items-center gap-1.5" style={labelStyle}>
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    When should we call you?
                    <span className="font-bold text-[10px] text-slate-400 font-normal lowercase tracking-normal"> (optional)</span>
                </Label>

                {!slotLabel ? (
                    <button
                        type="button"
                        onClick={() => setPickerOpen(o => !o)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 border text-left"
                        style={{
                            border: pickerOpen ? "2px solid var(--brand)" : "2px dashed var(--brand-100)",
                            background: pickerOpen ? "var(--brand-light)" : "var(--surface-muted)",
                            color: pickerOpen ? "var(--brand-dark)" : "var(--text-secondary)",
                            fontFamily: "var(--font-body)",
                        }}
                    >
                        <span className="flex items-center gap-2.5">
                            <CalendarDays className="w-4 h-4 text-emerald-600" />
                            Choose any date & time — 24/7
                        </span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform text-slate-400", pickerOpen && "rotate-180")} />
                    </button>
                ) : (
                    <div className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-emerald-500 bg-emerald-50/50 shadow-sm shadow-emerald-50 animate-fade-up">
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Selected consultation time</p>
                            <p className="text-sm font-bold truncate text-slate-800">{slotLabel}</p>
                        </div>
                        <button type="button" onClick={() => { setSlotIso(""); setSlotLabel(""); setPickerOpen(false) }}
                            className="text-slate-400 hover:text-slate-800 transition-colors"
                        >
                            <X className="w-4.5 h-4.5" />
                        </button>
                    </div>
                )}

                {pickerOpen && !slotLabel && (
                    <div className="mt-2">
                        <FreeTimePicker value={slotIso} onChange={(iso, label) => { setSlotIso(iso); setSlotLabel(label); setPickerOpen(false) }} />
                    </div>
                )}
            </div>

            {/* Message */}
            {!compact && (
                <div className="space-y-1">
                    <Label style={labelStyle}>
                        Message <span className="font-bold text-[10px] text-slate-400 font-normal lowercase tracking-normal">(optional)</span>
                    </Label>
                    <Textarea placeholder="Any specific questions or requirements..." rows={3} {...register("message")} className={textareaClass} style={{ border: "none" }} />
                </div>
            )}

            {/* Submit */}
            <Button
                type="submit"
                className="w-full h-12 font-extrabold rounded-full bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-100 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 active:scale-98 flex justify-center items-center gap-2"
                disabled={isSubmitting}
                style={{ 
                    opacity: (otpPhase !== "verified" || !!phoneChanged || emailOtpPhase !== "verified" || !!emailChanged) ? 0.6 : 1,
                    cursor: (otpPhase !== "verified" || !!phoneChanged || emailOtpPhase !== "verified" || !!emailChanged) ? "not-allowed" : "pointer" 
                }}
            >
                {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                ) : (otpPhase !== "verified" || emailOtpPhase !== "verified") ? (
                    <>Verify to Continue</>
                ) : (
                    <>
                        <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />
                        Book Free Consultation
                    </>
                )}
            </Button>
            {(otpPhase !== "verified" || emailOtpPhase !== "verified") && (
                <p className="text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Verify your {otpPhase !== "verified" ? "mobile" : ""}{otpPhase !== "verified" && emailOtpPhase !== "verified" ? " & " : ""}{emailOtpPhase !== "verified" ? "email" : ""} to activate booking
                </p>
            )}

            <p className="text-center text-xs text-slate-400 font-bold" style={{ fontFamily: "var(--font-body)" }}>
                No spam · Certified IRDAI Experts · 100% Free
            </p>
        </form>
    )
}
