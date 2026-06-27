"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { UserRole } from "@/types/user"
import { useAdminShell } from "./AdminShell"
import {
    Shield,
    LayoutDashboard,
    MessageSquare,
    Users,
    FileEdit,
    FolderTree,
    ChevronRight,
    X,
    ExternalLink,
    Sliders,
    MessageCircle,
    Sparkles,
} from "lucide-react"

import Image from "next/image"

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
        icon: <LayoutDashboard className="w-[18px] h-[18px]" />,
        roles: ["super_admin", "admin", "employee"],
    },
    {
        label: "Inquiries",
        href: "/admin/inquiries",
        icon: <MessageSquare className="w-[18px] h-[18px]" />,
        roles: ["super_admin", "admin", "employee"],
    },
    {
        label: "Testimonials",
        href: "/admin/testimonials",
        icon: <MessageCircle className="w-[18px] h-[18px]" />,
        roles: ["super_admin", "admin"],
    },
    {
        label: "Hero Section",
        href: "/admin/hero",
        icon: <Sparkles className="w-[18px] h-[18px]" />,
        roles: ["super_admin", "admin"],
    },
    {
        label: "Settings",
        href: "/admin/settings",
        icon: <Sliders className="w-[18px] h-[18px]" />,
        roles: ["super_admin", "admin"],
    },
    {
        label: "Users",
        href: "/admin/users",
        icon: <Users className="w-[18px] h-[18px]" />,
        roles: ["super_admin", "admin"],
    },
    {
        label: "Page CMS",
        href: "/admin/cms",
        icon: <FileEdit className="w-[18px] h-[18px]" />,
        roles: ["super_admin", "admin"],
    },
    // {
    //     label: "Navigation",
    //     href: "/admin/nav",
    //     icon: <FolderTree className="w-[18px] h-[18px]" />,
    //     roles: ["super_admin", "admin"],
    // },
]

interface SidebarProps {
    role: UserRole
}

export default function AdminSidebar({ role }: SidebarProps) {
    const pathname = usePathname()
    const { sidebarOpen, setSidebarOpen } = useAdminShell()

    const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(role))

    return (
        <>
            {/* Mobile overlay backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    // Base styles
                    "fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out",
                    // Mobile: slide in/out
                    "w-[280px] lg:w-[260px]",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full",
                    // Desktop: always visible, static positioning
                    "lg:translate-x-0 lg:static lg:z-auto"
                )}
            >
                {/* Logo + Close (mobile) */}
                <div className="flex items-center gap-3 px-5 py-5 bg-white border-b border-slate-200">
                    <div className="min-w-0 flex-1">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo_final.png"
                                alt="Policymine"
                                width={160}
                                height={44}
                                className="h-11 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-slate-600 text-xs font-semibold truncate capitalize mt-1">
                            {role.replace("_", " ")}
                        </p>
                    </div>
                    {/* Close button — mobile only */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider px-3 mb-3">
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
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                                    isActive
                                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                )}
                            >
                                <span
                                    className={cn(
                                        "transition-colors",
                                        isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                                    )}
                                >
                                    {item.icon}
                                </span>
                                <span className="flex-1">{item.label}</span>
                                {item.badge && (
                                    <span className="bg-emerald-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                                {isActive && (
                                    <ChevronRight className="w-3.5 h-3.5 text-emerald-200" />
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
                        className="flex items-center gap-2 px-3 py-2.5 text-slate-400 hover:text-white text-xs rounded-xl hover:bg-slate-800 transition-colors font-medium"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View public site</span>
                    </Link>
                </div>
            </aside>
        </>
    )
}