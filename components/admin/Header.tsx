"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { JWTPayload } from "@/types/user"
import {
    LogOut,
    User,
    ChevronDown,
    Bell,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface HeaderProps {
    user: JWTPayload
}

const ROLE_COLORS: Record<string, string> = {
    super_admin: "bg-purple-100 text-purple-700 border-purple-200",
    admin: "bg-blue-100 text-blue-700 border-blue-200",
    employee: "bg-green-100 text-green-700 border-green-200",
}

const ROLE_LABELS: Record<string, string> = {
    super_admin: "Super Admin",
    admin: "Admin",
    employee: "Employee",
}

export default function AdminHeader({ user }: HeaderProps) {
    const router = useRouter()

    async function handleLogout() {
        try {
            await axios.post("/api/auth/logout")
            toast.success("Logged out successfully")
            router.push("/admin/login")
        } catch {
            toast.error("Logout failed")
        }
    }

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
            {/* Left — page context (empty here, pages set their own heading) */}
            <div />

            {/* Right */}
            <div className="flex items-center gap-3">
                {/* Notifications (placeholder) */}
                <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Role badge */}
                <Badge
                    variant="outline"
                    className={cn("text-xs font-medium hidden sm:flex", ROLE_COLORS[user.role])}
                >
                    {ROLE_LABELS[user.role]}
                </Badge>

                {/* User menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors group">
                            <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-medium text-slate-900 leading-tight">
                                    {user.name}
                                </p>
                                <p className="text-xs text-slate-500 leading-tight truncate max-w-[120px]">
                                    {user.email}
                                </p>
                            </div>
                            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 hidden sm:block" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <a href="/admin/profile" className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                Profile & Settings
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}