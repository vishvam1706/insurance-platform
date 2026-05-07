"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { UserRole } from "@/types/user"
import {
    Shield,
    LayoutDashboard,
    MessageSquare,
    CalendarClock,
    Users,
    FileEdit,
    ChevronRight,
} from "lucide-react"

interface NavItem {
    label: string
    href: string
    icon: React.ReactNode
    roles: UserRole[]
    badge?: string
}

const NAV_ITEMS: NavItem[] = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <LayoutDashboard className="w-4 h-4" />,
        roles: ["super_admin", "admin", "employee"],
    },
    {
        label: "Inquiries",
        href: "/admin/inquiries",
        icon: <MessageSquare className="w-4 h-4" />,
        roles: ["super_admin", "admin", "employee"],
    },
    {
        label: "Schedule",
        href: "/admin/schedule",
        icon: <CalendarClock className="w-4 h-4" />,
        roles: ["super_admin", "admin", "employee"],
    },
    {
        label: "Users",
        href: "/admin/users",
        icon: <Users className="w-4 h-4" />,
        roles: ["super_admin", "admin"],
    },
    {
        label: "Page CMS",
        href: "/admin/cms",
        icon: <FileEdit className="w-4 h-4" />,
        roles: ["super_admin", "admin"],
    },
]

interface SidebarProps {
    role: UserRole
}

export default function AdminSidebar({ role }: SidebarProps) {
    const pathname = usePathname()

    const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(role))

    return (
        <aside className="w-[260px] bg-slate-900 flex flex-col h-full shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                    <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                    <p className="text-white font-semibold text-sm truncate leading-tight">
                        Insurance Platform
                    </p>
                    <p className="text-slate-400 text-xs truncate capitalize">
                        {role.replace("_", " ")}
                    </p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider px-2 mb-3">
                    Navigation
                </p>
                {visibleItems.map((item) => {
                    const isActive =
                        pathname === item.href || pathname.startsWith(item.href + "/")
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <span className={cn(
                                "transition-colors",
                                isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                            )}>
                                {item.icon}
                            </span>
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                            {isActive && (
                                <ChevronRight className="w-3 h-3 text-blue-200" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom */}
            <div className="px-3 py-4 border-t border-slate-800">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white text-xs rounded-lg hover:bg-slate-800 transition-colors"
                >
                    <span>View public site</span>
                    <ChevronRight className="w-3 h-3" />
                </Link>
            </div>
        </aside>
    )
}