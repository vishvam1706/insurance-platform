"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { toast } from "sonner"
import { EmployeeSignupFormSchema, EmployeeSignupFormInput } from "@/lib/validations/user.schema"
import { INDIAN_STATES, LANGUAGES } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Loader2, CheckCircle2, User, Mail, MapPin, Globe, KeyRound, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function EmployeeSignupForm() {
    const [done, setDone] = useState(false)
    const [state, setState] = useState("")
    const [language, setLanguage] = useState("")
    const [stateErr, setStateErr] = useState("")
    const [langErr, setLangErr] = useState("")
    const [showPw, setShowPw] = useState(false)
    const [showConfirmPw, setShowConfirmPw] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EmployeeSignupFormInput>({
        resolver: zodResolver(EmployeeSignupFormSchema),
    })

    async function onSubmit(data: EmployeeSignupFormInput) {
        if (!state) { setStateErr("Please select your state"); return }
        if (!language) { setLangErr("Please select your language"); return }
        setStateErr("")
        setLangErr("")

        try {
            await axios.post("/api/users/signup", { ...data, state, language })
            setDone(true)
        } catch (err) {
            toast.error(
                axios.isAxiosError(err)
                    ? err.response?.data?.error ?? "Signup failed"
                    : "Something went wrong"
            )
        }
    }

    if (done) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Request submitted!
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                    Your account is pending approval. An admin will review your request and you&apos;ll receive access once approved.
                </p>
                <Link
                    href="/admin/login"
                    className="inline-flex items-center gap-1.5 mt-7 px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20"
                >
                    Back to login
                </Link>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
                <Label className="text-slate-700 text-sm font-medium">Full Name</Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <Input
                        placeholder="Ravi Sharma"
                        className={`pl-10 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors ${errors.name ? "border-red-400" : ""}`}
                        {...register("name")}
                    />
                </div>
                {errors.name && <p className="text-red-500 text-xs ml-0.5">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label className="text-slate-700 text-sm font-medium">Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <Input
                        type="email"
                        placeholder="ravi@example.com"
                        className={`pl-10 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors ${errors.email ? "border-red-400" : ""}`}
                        {...register("email")}
                    />
                </div>
                {errors.email && <p className="text-red-500 text-xs ml-0.5">{errors.email.message}</p>}
            </div>

            {/* State & Language — side by side */}
            <div className="grid grid-cols-2 gap-3">
                {/* State */}
                <div className="space-y-2">
                    <Label className="text-slate-700 text-sm font-medium">State</Label>
                    <Select value={state} onValueChange={(v) => { setState(v); setStateErr("") }}>
                        <SelectTrigger className={`h-11 rounded-xl bg-slate-50 border-slate-200 ${stateErr ? "border-red-400" : ""}`}>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                                <SelectValue placeholder="Select" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {INDIAN_STATES.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {stateErr && <p className="text-red-500 text-xs ml-0.5">{stateErr}</p>}
                </div>

                {/* Language */}
                <div className="space-y-2">
                    <Label className="text-slate-700 text-sm font-medium">Language</Label>
                    <Select value={language} onValueChange={(v) => { setLanguage(v); setLangErr("") }}>
                        <SelectTrigger className={`h-11 rounded-xl bg-slate-50 border-slate-200 ${langErr ? "border-red-400" : ""}`}>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                                <SelectValue placeholder="Select" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {LANGUAGES.map((l) => (
                                <SelectItem key={l} value={l}>{l}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {langErr && <p className="text-red-500 text-xs ml-0.5">{langErr}</p>}
                </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
                <Label className="text-slate-700 text-sm font-medium">Password</Label>
                <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <Input
                        type={showPw ? "text" : "password"}
                        placeholder="Min 8 characters"
                        className={`pl-10 pr-11 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors ${errors.password ? "border-red-400" : ""}`}
                        {...register("password")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPw((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        tabIndex={-1}
                    >
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs ml-0.5">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <Label className="text-slate-700 text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <Input
                        type={showConfirmPw ? "text" : "password"}
                        placeholder="Repeat password"
                        className={`pl-10 pr-11 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors ${errors.confirmPassword ? "border-red-400" : ""}`}
                        {...register("confirmPassword")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPw((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        tabIndex={-1}
                    >
                        {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-500 text-xs ml-0.5">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Submit */}
            <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-11 rounded-xl font-semibold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all mt-1"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                    : "Request Access"
                }
            </Button>
        </form>
    )
}