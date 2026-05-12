import { Badge } from "@/components/ui/badge"
import { UserRole, UserStatus } from "@/types/user"
import { cn } from "@/lib/utils"

const ROLE_CONFIG: Record<UserRole, { label: string; className: string }> = {
    super_admin: { label: "Super Admin", className: "bg-purple-100 text-purple-700 border-purple-200" },
    admin: { label: "Admin", className: "bg-emerald-100 text-emerald-700 border-blue-200" },
    employee: { label: "Employee", className: "bg-teal-100 text-teal-700 border-teal-200" },
}

const STATUS_CONFIG: Record<UserStatus, { label: string; className: string }> = {
    active: { label: "Active", className: "bg-green-100 text-green-700 border-green-200" },
    pending: { label: "Pending", className: "bg-amber-100 text-amber-700 border-amber-200" },
    inactive: { label: "Inactive", className: "bg-slate-100 text-slate-500 border-slate-200" },
}

export function UserRoleBadge({ role }: { role: UserRole }) {
    const cfg = ROLE_CONFIG[role]
    return (
        <Badge variant="outline" className={cn("text-xs font-medium", cfg.className)}>
            {cfg.label}
        </Badge>
    )
}

export function UserStatusBadge({ status }: { status: UserStatus }) {
    const cfg = STATUS_CONFIG[status]
    return (
        <Badge variant="outline" className={cn("text-xs font-medium", cfg.className)}>
            {cfg.label}
        </Badge>
    )
}