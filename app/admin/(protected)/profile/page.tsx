"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from "axios"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const ChangePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z.string().min(8, "Minimum 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((d) => d.newPassword === d.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>

export default function ProfilePage() {
    const { user, loading } = useAuth()
    const [saving, setSaving] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordInput>({
        resolver: zodResolver(ChangePasswordSchema),
    })

    async function onSubmit(data: ChangePasswordInput) {
        setSaving(true)
        try {
            await axios.patch("/api/auth/me", data)
            toast.success("Password changed successfully")
            reset()
        } catch (err) {
            toast.error(
                axios.isAxiosError(err)
                    ? err.response?.data?.error ?? "Failed to change password"
                    : "Something went wrong"
            )
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-48" >
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-2xl" >
            <div>
                <h1 className="text-2xl font-semibold text-slate-900" > Profile & Settings </h1>
                < p className="text-slate-500 text-sm mt-1" > Manage your account details </p>
            </div>

            {/* Account info */}
            <Card className="border border-slate-200" >
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2" >
                        <User className="w-4 h-4" />
                        Account Information
                    </CardTitle>
                </CardHeader>
                < CardContent className="space-y-4" >
                    <div className="grid grid-cols-2 gap-4" >
                        <div>
                            <Label className="text-xs text-slate-500 uppercase tracking-wide" > Name </Label>
                            < p className="text-sm font-medium text-slate-900 mt-1" > {user?.name} </p>
                        </div>
                        < div >
                            <Label className="text-xs text-slate-500 uppercase tracking-wide" > Email </Label>
                            < p className="text-sm font-medium text-slate-900 mt-1" > {user?.email} </p>
                        </div>
                        < div >
                            <Label className="text-xs text-slate-500 uppercase tracking-wide" > Role </Label>
                            < div className="mt-1" >
                                <Badge variant="outline" className="capitalize text-xs" >
                                    {user?.role?.replace("_", " ")}
                                </Badge>
                            </div>
                        </div>
                        {
                            user?.state && (
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase tracking-wide" > State </Label>
                                    < p className="text-sm font-medium text-slate-900 mt-1" > {user.state} </p>
                                </div>
                            )
                        }
                    </div>
                </CardContent>
            </Card>

            {/* Change password */}
            <Card className="border border-slate-200" >
                <CardHeader>
                    <CardTitle className="text-base" > Change Password </CardTitle>
                </CardHeader>
                < CardContent >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >
                        <div className="space-y-1.5" >
                            <Label>Current Password </Label>
                            < Input type="password" {...register("currentPassword")} />
                            {
                                errors.currentPassword && (
                                    <p className="text-red-500 text-xs" > {errors.currentPassword.message} </p>
                                )
                            }
                        </div>
                        < div className="space-y-1.5" >
                            <Label>New Password </Label>
                            < Input type="password" {...register("newPassword")} />
                            {
                                errors.newPassword && (
                                    <p className="text-red-500 text-xs" > {errors.newPassword.message} </p>
                                )
                            }
                        </div>
                        < div className="space-y-1.5" >
                            <Label>Confirm New Password </Label>
                            < Input type="password" {...register("confirmPassword")} />
                            {
                                errors.confirmPassword && (
                                    <p className="text-red-500 text-xs" > {errors.confirmPassword.message} </p>
                                )
                            }
                        </div>
                        < Button type="submit" disabled={saving} >
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}