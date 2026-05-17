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
    Clock, X, ShieldCheck, AlertCircle, Smartphone, Mail,
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
        <div className="select-none">
            <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={prevMonth}
                    className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-muted)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
                    {MONTHS[viewMonth]} {viewYear}
                </span>
                <button type="button" onClick={nextMonth}
                    className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-muted)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-7 mb-1">
                {DAYS.map((d) => (
                    <div key={d} className="text-center text-[10px] font-semibold py-1" style={{ color: "var(--text-muted)" }}>{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
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
                            className="h-8 w-full text-xs rounded-lg font-medium transition-all"
                            style={{
                                color: isPast ? "var(--text-muted)" : isSel ? "#FFFFFF" : isToday ? "var(--brand)" : "var(--text-secondary)",
                                background: isSel ? "var(--brand)" : isToday && !isSel ? "var(--brand-light)" : "transparent",
                                cursor: isPast ? "not-allowed" : "pointer",
                                outline: isToday && !isSel ? "1px solid var(--brand-100)" : "none",
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
        <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{label}</span>
            <div className="h-40 overflow-y-auto rounded-xl w-16" style={{ border: "1px solid var(--border)", background: "#FFFFFF" }}>
                {items.map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => onSelect(item)}
                        className="w-full py-2.5 text-sm font-mono font-semibold transition-all"
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
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "#FFFFFF" }}>
            {/* Tab bar */}
            <div className="flex" style={{ borderBottom: "1px solid var(--border)" }}>
                {(["date", "time"] as const).map((s) => (
                    <button
                        key={s}
                        type="button"
                        onClick={() => setStep(s)}
                        className="flex-1 py-2.5 text-xs font-semibold capitalize transition-all flex items-center justify-center gap-1.5"
                        style={{
                            background: step === s ? "var(--brand)" : "var(--surface-muted)",
                            color: step === s ? "#FFFFFF" : "var(--text-muted)",
                        }}
                    >
                        {s === "date" ? <><CalendarDays className="w-3.5 h-3.5" /> Pick Date</> : <><Clock className="w-3.5 h-3.5" /> Pick Time</>}
                    </button>
                ))}
            </div>

            <div className="p-4">
                {step === "date" && (
                    <>
                        <MiniCalendar selected={date} onSelect={(d) => { setDate(d); setStep("time") }} />
                        {date && (
                            <div className="mt-3 text-center text-xs font-medium" style={{ color: "var(--brand)" }}>
                                Selected: {format(date, "d MMMM yyyy")} — now pick a time →
                            </div>
                        )}
                    </>
                )}

                {step === "time" && (
                    <>
                        {!date && <p className="text-center text-xs py-4" style={{ color: "var(--text-muted)" }}>Please select a date first</p>}
                        {date && (
                            <>
                                <p className="text-xs font-medium mb-4 text-center" style={{ color: "var(--text-secondary)" }}>
                                    {format(date, "d MMMM yyyy")} — any time, 24/7
                                </p>
                                <div className="flex items-start justify-center gap-4">
                                    <ScrollPicker label="Hour" items={HOURS} value={hour} onSelect={setHour} />
                                    <div className="flex flex-col items-center justify-center h-40 pt-6">
                                        <span className="text-2xl font-bold" style={{ color: "var(--text-muted)" }}>:</span>
                                    </div>
                                    <ScrollPicker label="Minute" items={MINS} value={minute} onSelect={setMinute} />
                                </div>

                                <div className="mt-4 text-center rounded-xl py-3 px-4" style={{ background: "var(--brand-light)" }}>
                                    <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>Your selected time</p>
                                    <p className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--brand)" }}>
                                        {pad(hour)}:{pad(minute)}
                                    </p>
                                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                                        {format(date, "EEEE, d MMMM yyyy")}
                                    </p>
                                </div>

                                <div className="mt-3">
                                    <Label className="text-xs mb-1 block" style={{ color: "var(--text-muted)" }}>Or type exact time</Label>
                                    <input
                                        type="time"
                                        value={`${pad(hour)}:${pad(minute)}`}
                                        onChange={(e) => {
                                            const [h, m] = e.target.value.split(":").map(Number)
                                            if (!isNaN(h)) setHour(h)
                                            if (!isNaN(m)) setMinute(m)
                                        }}
                                        className="w-full rounded-lg px-3 py-2 text-sm font-mono focus:outline-none"
                                        style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
                                    />
                                </div>

                                <Button
                                    type="button"
                                    onClick={confirmDateTime}
                                    className="w-full mt-4 h-9 text-sm font-semibold rounded-full"
                                    style={{ background: "var(--brand)", color: "#FFFFFF" }}
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
            <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--brand-light)" }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: "var(--brand)" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>We'll be in touch!</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
                    {slotLabel ? `Our advisor will reach out on ${slotLabel}.` : "Our advisor will contact you shortly."}
                </p>
                {slotLabel && (
                    <div className="mt-4 inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl" style={{ background: "var(--brand-light)", border: "1px solid var(--brand-100)", color: "var(--brand)" }}>
                        <CalendarDays className="w-4 h-4" />
                        {slotLabel}
                    </div>
                )}
            </div>
        )
    }

    const fieldStyle = { border: "1px solid var(--border)", borderRadius: "10px", fontFamily: "var(--font-body)", fontSize: "0.875rem" }
    const labelStyle = { fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", fontFamily: "var(--font-body)" }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">

            {/* Name */}
            <div className="space-y-1">
                <Label style={labelStyle}>Full Name</Label>
                <Input placeholder="Ravi Sharma" {...register("name")} style={fieldStyle} />
                {errors.name && <p className="text-xs" style={{ color: "#DC2626" }}>{errors.name.message}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
                <Label style={labelStyle}>Mobile Number</Label>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Input type="tel" placeholder="9876543210" {...register("phone")} style={fieldStyle}
                            className={cn(otpPhase === "verified" && !phoneChanged ? "pr-8" : "")} />
                        {otpPhase === "verified" && !phoneChanged && (
                            <ShieldCheck className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--brand)" }} />
                        )}
                    </div>
                    {(otpPhase === "idle" || otpPhase === "sending" || phoneChanged) && phoneValid && (
                        <button type="button" onClick={sendOtp} disabled={otpPhase === "sending"}
                            className="shrink-0 px-3 h-10 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                            style={{ background: "var(--brand)", color: "#fff" }}>
                            {otpPhase === "sending" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Smartphone className="w-3 h-3" />}
                            {phoneChanged ? "Re-verify" : "Send OTP"}
                        </button>
                    )}
                </div>
                {errors.phone && <p className="text-xs" style={{ color: "#DC2626" }}>{errors.phone.message}</p>}

                {/* OTP entry */}
                {(otpPhase === "sent" || otpPhase === "verifying") && (
                    <div className="rounded-xl p-3 space-y-2" style={{ background: "var(--brand-light)", border: "1px solid var(--brand-100)" }}>
                        <p className="text-xs font-medium" style={{ color: "var(--brand)" }}>Enter the 6-digit OTP sent via SMS to +91 {watchedPhone}</p>
                        <div className="flex gap-2">
                            <input ref={otpRef} maxLength={6} value={otpCode} onChange={e => { setOtpCode(e.target.value.replace(/\D/g, "")); setOtpError("") }}
                                placeholder="123456" className="flex-1 rounded-lg px-3 py-2 text-sm font-mono tracking-widest text-center"
                                style={{ border: "1px solid var(--border)", outline: "none" }} />
                            <button type="button" onClick={verifyOtp} disabled={otpPhase === "verifying" || otpCode.length !== 6}
                                className="px-4 rounded-lg text-xs font-semibold transition-all"
                                style={{ background: "var(--brand)", color: "#fff", opacity: otpCode.length !== 6 ? 0.5 : 1 }}>
                                {otpPhase === "verifying" ? <Loader2 className="w-3 h-3 animate-spin" /> : "Verify"}
                            </button>
                        </div>
                        {countdown > 0
                            ? <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Resend in {countdown}s</p>
                            : <button type="button" onClick={sendOtp} className="text-[10px] underline" style={{ color: "var(--brand)" }}>Resend OTP</button>
                        }
                    </div>
                )}
                {otpError && <p className="text-xs flex items-center gap-1" style={{ color: "#DC2626" }}><AlertCircle className="w-3 h-3" />{otpError}</p>}
                {otpPhase === "verified" && !phoneChanged && (
                    <p className="text-xs flex items-center gap-1" style={{ color: "var(--brand)" }}><ShieldCheck className="w-3 h-3" />Mobile number verified</p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <Label style={labelStyle}>Email</Label>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Input type="email" placeholder="ravi@example.com" {...register("email")} style={fieldStyle}
                            className={cn(emailOtpPhase === "verified" && !emailChanged ? "pr-8" : "")} />
                        {emailOtpPhase === "verified" && !emailChanged && (
                            <ShieldCheck className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--brand)" }} />
                        )}
                    </div>
                    {(emailOtpPhase === "idle" || emailOtpPhase === "sending" || emailChanged) && emailValid && (
                        <button type="button" onClick={sendEmailOtp} disabled={emailOtpPhase === "sending"}
                            className="shrink-0 px-3 h-10 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                            style={{ background: "var(--brand)", color: "#fff" }}>
                            {emailOtpPhase === "sending" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Mail className="w-3 h-3" />}
                            {emailChanged ? "Re-verify" : "Send OTP"}
                        </button>
                    )}
                </div>
                {errors.email && <p className="text-xs" style={{ color: "#DC2626" }}>{errors.email.message}</p>}

                {/* Email OTP entry */}
                {(emailOtpPhase === "sent" || emailOtpPhase === "verifying") && (
                    <div className="rounded-xl p-3 space-y-2" style={{ background: "var(--brand-light)", border: "1px solid var(--brand-100)" }}>
                        <p className="text-xs font-medium" style={{ color: "var(--brand)" }}>OTP sent to {watchedEmail}</p>
                        <div className="flex gap-2">
                            <input ref={emailOtpRef} maxLength={6} value={emailOtpCode}
                                onChange={e => { setEmailOtpCode(e.target.value.replace(/\D/g, "")); setEmailOtpError("") }}
                                placeholder="123456" className="flex-1 rounded-lg px-3 py-2 text-sm font-mono tracking-widest text-center"
                                style={{ border: "1px solid var(--border)", outline: "none" }} />
                            <button type="button" onClick={verifyEmailOtp}
                                disabled={emailOtpPhase === "verifying" || emailOtpCode.length !== 6}
                                className="px-4 rounded-lg text-xs font-semibold transition-all"
                                style={{ background: "var(--brand)", color: "#fff", opacity: emailOtpCode.length !== 6 ? 0.5 : 1 }}>
                                {emailOtpPhase === "verifying" ? <Loader2 className="w-3 h-3 animate-spin" /> : "Verify"}
                            </button>
                        </div>
                        {emailCountdown > 0
                            ? <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Resend in {emailCountdown}s</p>
                            : <button type="button" onClick={sendEmailOtp} className="text-[10px] underline" style={{ color: "var(--brand)" }}>Resend OTP</button>
                        }
                    </div>
                )}
                {emailOtpError && <p className="text-xs flex items-center gap-1" style={{ color: "#DC2626" }}><AlertCircle className="w-3 h-3" />{emailOtpError}</p>}
                {emailOtpPhase === "verified" && !emailChanged && (
                    <p className="text-xs flex items-center gap-1" style={{ color: "var(--brand)" }}><ShieldCheck className="w-3 h-3" />Email verified</p>
                )}
            </div>

            {/* Insurance type */}
            <div className="space-y-1">
                <Label style={labelStyle}>Insurance Type</Label>
                <Select value={insuranceType} onValueChange={(v) => { setType(v); setValue("insuranceType", v as "term" | "health"); setTypeErr("") }}>
                    <SelectTrigger style={{ ...fieldStyle, borderColor: typeErr ? "#DC2626" : "var(--border)" }}>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="term">Term Life Insurance</SelectItem>
                        <SelectItem value="health">Health Insurance</SelectItem>
                    </SelectContent>
                </Select>
                {typeErr && <p className="text-xs" style={{ color: "#DC2626" }}>{typeErr}</p>}
            </div>

            {/* State + Language */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label style={labelStyle}>State</Label>
                    <Select value={state} onValueChange={(v) => { setState(v); setValue("state", v); setStateErr(""); setLangManual(false) }}>
                        <SelectTrigger style={{ ...fieldStyle, borderColor: stateErr ? "#DC2626" : "var(--border)" }}>
                            <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                            {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    {stateErr && <p className="text-xs" style={{ color: "#DC2626" }}>{stateErr}</p>}
                </div>
                <div className="space-y-1">
                    <Label style={labelStyle} className="flex items-center gap-1">
                        Language
                        {language && state && STATE_LANGUAGE_MAP[state] === language && !langManual && (
                            <span className="font-normal text-[10px] px-1.5 py-0.5 rounded" style={{ background: "var(--brand-light)", color: "var(--brand)" }}>auto</span>
                        )}
                    </Label>
                    <Select value={language} onValueChange={(v) => { setLanguage(v); setValue("language", v); setLangErr(""); setLangManual(true) }}>
                        <SelectTrigger style={{ ...fieldStyle, borderColor: langErr ? "#DC2626" : "var(--border)" }}>
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            {LANGUAGES.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    {langErr && <p className="text-xs" style={{ color: "#DC2626" }}>{langErr}</p>}
                    {language && state && !langManual && (
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Pre-selected for {state}. You can change it.</p>
                    )}
                </div>
            </div>

            {/* Preferred call time */}
            <div className="space-y-2">
                <Label className="flex items-center gap-1.5" style={labelStyle}>
                    <Clock className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                    When should we call you?
                    <span className="font-normal text-xs" style={{ color: "var(--text-muted)" }}>(optional)</span>
                </Label>

                {!slotLabel ? (
                    <button
                        type="button"
                        onClick={() => setPickerOpen(o => !o)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all"
                        style={{
                            border: pickerOpen ? "2px solid var(--brand)" : "2px dashed var(--border)",
                            background: pickerOpen ? "var(--brand-light)" : "transparent",
                            color: pickerOpen ? "var(--brand)" : "var(--text-muted)",
                            fontFamily: "var(--font-body)",
                        }}
                    >
                        <span className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" />
                            Choose any date & time — 24/7
                        </span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform", pickerOpen && "rotate-180")} />
                    </button>
                ) : (
                    <div className="flex items-center gap-2 rounded-xl px-4 py-3" style={{ background: "#F0FDF4", border: "2px solid #BBF7D0" }}>
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--brand)" }} />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium" style={{ color: "var(--brand)" }}>Call scheduled</p>
                            <p className="text-sm font-semibold truncate" style={{ color: "#065F46" }}>{slotLabel}</p>
                        </div>
                        <button type="button" onClick={() => { setSlotIso(""); setSlotLabel(""); setPickerOpen(false) }}
                            style={{ color: "var(--text-muted)" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {pickerOpen && !slotLabel && (
                    <FreeTimePicker value={slotIso} onChange={(iso, label) => { setSlotIso(iso); setSlotLabel(label); setPickerOpen(false) }} />
                )}
            </div>

            {/* Message */}
            {!compact && (
                <div className="space-y-1">
                    <Label style={labelStyle}>
                        Message <span className="font-normal" style={{ color: "var(--text-muted)" }}>(optional)</span>
                    </Label>
                    <Textarea placeholder="Any specific questions or requirements..." rows={3} {...register("message")} style={fieldStyle} />
                </div>
            )}

            {/* Submit */}
            <Button
                type="submit"
                className="w-full h-11 font-semibold rounded-full transition-all active:scale-95"
                disabled={isSubmitting}
                style={{ background: "var(--brand)", color: "#FFFFFF", fontFamily: "var(--font-body)", boxShadow: "0 2px 8px rgba(0,179,134,0.3)",
                    opacity: (otpPhase !== "verified" || !!phoneChanged || emailOtpPhase !== "verified" || !!emailChanged) ? 0.6 : 1,
                    cursor: (otpPhase !== "verified" || !!phoneChanged || emailOtpPhase !== "verified" || !!emailChanged) ? "not-allowed" : "pointer" }}
            >
                {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                ) : (otpPhase !== "verified" || emailOtpPhase !== "verified") ? "Verify to Continue" : "Book Free Consultation"}
            </Button>
            {(otpPhase !== "verified" || emailOtpPhase !== "verified") && (
                <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
                    Verify your {otpPhase !== "verified" ? "mobile number" : ""}{otpPhase !== "verified" && emailOtpPhase !== "verified" ? " & " : ""}{emailOtpPhase !== "verified" ? "email" : ""} to continue
                </p>
            )}

            <p className="text-center text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                No spam · No salespeople · 100% free
            </p>
        </form>
    )
}
