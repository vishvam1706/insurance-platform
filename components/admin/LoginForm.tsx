"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2, Mail, KeyRound } from "lucide-react"
import { LoginSchema, LoginInput } from "@/lib/validations/user.schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginForm() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
    })

    async function onSubmit(data: LoginInput) {
        try {
            const res = await axios.post("/api/auth/login", data)
            toast.success(`Welcome back, ${res.data.user.name}!`)
            router.push("/admin/dashboard")
            router.refresh()
        } catch (err: unknown) {
            const msg =
                axios.isAxiosError(err)
                    ? err.response?.data?.error ?? "Login failed"
                    : "Something went wrong"
            toast.error(msg)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 text-sm font-medium">
                    Email address
                </Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        className={`pl-10 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors ${errors.email ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                        {...register("email")}
                    />
                </div>
                {errors.email && (
                    <p className="text-red-500 text-xs ml-0.5">{errors.email.message}</p>
                )}
            </div>

            {/* Password */}
            <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 text-sm font-medium">
                    Password
                </Label>
                <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className={`pl-10 pr-11 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors ${errors.password ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                        {...register("password")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-xs ml-0.5">{errors.password.message}</p>
                )}
            </div>

            {/* Submit */}
            <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-11 rounded-xl font-semibold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing in...
                    </>
                ) : (
                    "Sign in"
                )}
            </Button>

            {/* Employee signup link */}
            <p className="text-center text-sm text-slate-500">
                New employee?{" "}
                <Link
                    href="/admin/users/signup"
                    className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                >
                    Request access →
                </Link>
            </p>
        </form>
    )
}