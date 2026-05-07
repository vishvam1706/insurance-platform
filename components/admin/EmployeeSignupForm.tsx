"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { toast } from "sonner"
import { EmployeeSignupSchema, EmployeeSignupInput } from "@/lib/validations/user.schema"
import { INDIAN_STATES, LANGUAGES } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Loader2, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function EmployeeSignupForm() {
    const [done, setDone] = useState(false)
    const [state, setState] = useState("")
    const [language, setLanguage] = useState("")
    const [stateErr, setStateErr] = useState("")
    const [langErr, setLangErr] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EmployeeSignupInput>({
        resolver: zodResolver(EmployeeSignupSchema),
    })

    async function onSubmit(data: EmployeeSignupInput) {
        // Manual validation for selects
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
            <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Request submitted!
                </h3>
                <p className="text-slate-500 text-sm">
                    Your account is pending approval. An admin will review your request and
                    you'll receive an email once approved.
                </p>
                <Link
                    href="/admin/login"
                    className="inline-block mt-6 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                    Back to login
                </Link>
            </div >
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
                <Label>Full Name</Label>
                <Input placeholder="Ravi Sharma" {...register("name")} />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="ravi@example.com" {...register("email")} />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* State */}
            <div className="space-y-1.5">
                <Label>Your State</Label>
                <Select value={state} onValueChange={(v) => { setState(v); setStateErr("") }}>
                    <SelectTrigger className={stateErr ? "border-red-400" : ""}>
                        <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                        {INDIAN_STATES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {stateErr && <p className="text-red-500 text-xs">{stateErr}</p>}
            </div>

            {/* Language */}
            <div className="space-y-1.5">
                <Label>Preferred Language</Label>
                <Select value={language} onValueChange={(v) => { setLanguage(v); setLangErr("") }}>
                    <SelectTrigger className={langErr ? "border-red-400" : ""}>
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        {LANGUAGES.map((l) => (
                            <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {langErr && <p className="text-red-500 text-xs">{langErr}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
                <Label>Password</Label>
                <Input type="password" placeholder="Min 8 characters" {...register("password")} />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
                <Label>Confirm Password</Label>
                <Input type="password" placeholder="Repeat password" {...register("confirmPassword")} />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 h-11"
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