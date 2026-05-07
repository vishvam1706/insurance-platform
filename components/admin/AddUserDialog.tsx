"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { toast } from "sonner"
import { CreateUserSchema, CreateUserInput } from "@/lib/validations/user.schema"
import { useAuth } from "@/hooks/useAuth"
import { INDIAN_STATES, LANGUAGES } from "@/lib/utils"
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Loader2, UserPlus } from "lucide-react"

interface AddUserDialogProps {
    onSuccess: () => void
}

export default function AddUserDialog({ onSuccess }: AddUserDialogProps) {
    const { user: authUser } = useAuth()
    const [open, setOpen] = useState(false)
    const [role, setRole] = useState("employee")
    const [state, setState] = useState("")
    const [language, setLanguage] = useState("")

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateUserInput>({
        resolver: zodResolver(CreateUserSchema),
    })

    async function onSubmit(data: CreateUserInput) {
        try {
            await axios.post("/api/users", { ...data, role, state, language })
            toast.success("User created successfully")
            reset()
            setRole("employee")
            setState("")
            setLanguage("")
            setOpen(false)
            onSuccess()
        } catch (err) {
            toast.error(
                axios.isAxiosError(err)
                    ? err.response?.data?.error ?? "Failed to create user"
                    : "Failed to create user"
            )
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                    <UserPlus className="w-4 h-4" />
                    Add User
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
                    {/* Name */}
                    <div className="space-y-1.5">
                        <Label>Full Name</Label>
                        <Input placeholder="Ravi Sharma" {...register("name")} />
                        {errors.name && (
                            <p className="text-red-500 text-xs">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <Label>Email</Label>
                        <Input type="email" placeholder="ravi@platform.com" {...register("email")} />
                        {errors.email && (
                            <p className="text-red-500 text-xs">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <Label>Password</Label>
                        <Input type="password" placeholder="Min 8 characters" {...register("password")} />
                        {errors.password && (
                            <p className="text-red-500 text-xs">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Role — super admin sees all, admin only sees employee */}
                    <div className="space-y-1.5">
                        <Label>Role</Label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {authUser?.role === "super_admin" && (
                                    <>
                                        <SelectItem value="super_admin">Super Admin</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </>
                                )}
                                <SelectItem value="employee">Employee</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* State */}
                    <div className="space-y-1.5">
                        <Label>State <span className="text-slate-400 text-xs">(for employees)</span></Label>
                        <Select value={state} onValueChange={setState}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                                {INDIAN_STATES.map((s) => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Language */}
                    <div className="space-y-1.5">
                        <Label>Language <span className="text-slate-400 text-xs">(for employees)</span></Label>
                        <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                {LANGUAGES.map((l) => (
                                    <SelectItem key={l} value={l}>{l}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create User
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}