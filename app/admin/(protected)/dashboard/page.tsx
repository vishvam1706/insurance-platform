import { Metadata } from "next"
import { Suspense } from "react"
import { unstable_noStore as noStore } from "next/cache"
import { getAuthUser } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Inquiry from "@/lib/models/Inquiry"
import User from "@/lib/models/User"
import {
    MessageSquare, Users, CheckCircle2, Clock,
    TrendingUp, CalendarDays, Plus, FileEdit,
    ArrowRight, Activity,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDateTime } from "@/lib/utils"
import Link from "next/link"

export const metadata: Metadata = { title: "Dashboard" }

async function getDashboardData(role: string, state?: string) {
    noStore()
    await connectDB()
    const inquiryFilter = role === "employee" && state ? { state } : {}
    const [
        totalInquiries, newInquiries, contactedInquiries,
        resolvedInquiries, totalUsers, pendingUsers, recentInquiries,
    ] = await Promise.all([
        Inquiry.countDocuments(inquiryFilter),
        Inquiry.countDocuments({ ...inquiryFilter, status: "new" }),
        Inquiry.countDocuments({ ...inquiryFilter, status: "contacted" }),
        Inquiry.countDocuments({ ...inquiryFilter, status: "resolved" }),
        role !== "employee" ? User.countDocuments() : Promise.resolve(0),
        role !== "employee" ? User.countDocuments({ status: "pending" }) : Promise.resolve(0),
        Inquiry.find(inquiryFilter).sort({ createdAt: -1 }).limit(6).lean(),
    ])
    return {
        totalInquiries, newInquiries, contactedInquiries,
        resolvedInquiries, totalUsers, pendingUsers,
        recentInquiries: JSON.parse(JSON.stringify(recentInquiries)),
    }
}

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
    new:           { bg: "bg-emerald-50",  text: "text-emerald-700", dot: "bg-emerald-500" },
    contacted:     { bg: "bg-amber-50",    text: "text-amber-700",   dot: "bg-amber-400" },
    resolved:      { bg: "bg-slate-100",   text: "text-slate-600",   dot: "bg-slate-400" },
    not_reachable: { bg: "bg-red-50",      text: "text-red-600",     dot: "bg-red-400" },
}

function getGreeting() {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
}

async function DashboardContent({ role, state, name }: { role: string; state?: string; name: string }) {
    const data = await getDashboardData(role, state)

    const primaryStats = [
        { label: "Total Inquiries", value: data.totalInquiries, icon: MessageSquare, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", href: "/admin/inquiries" },
        { label: "New / Uncontacted", value: data.newInquiries, icon: Clock, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", href: "/admin/inquiries?status=new" },
        { label: "Contacted", value: data.contactedInquiries, icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", href: "/admin/inquiries?status=contacted" },
        { label: "Resolved", value: data.resolvedInquiries, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", border: "border-green-100", href: "/admin/inquiries?status=resolved" },
    ]

    if (role !== "employee") {
        primaryStats.push(
            { label: "Total Users", value: data.totalUsers, icon: Users, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", href: "/admin/users" },
            { label: "Pending Approvals", value: data.pendingUsers, icon: CalendarDays, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", href: "/admin/users?status=pending" }
        )
    }

    return (
        <div className="space-y-5 pt-3 sm:pt-5 lg:pt-6">
            {/* Pending approvals alert */}
            {role !== "employee" && data.pendingUsers > 0 && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                        <p className="text-sm font-medium text-amber-900">
                            {data.pendingUsers} employee{data.pendingUsers > 1 ? "s" : ""} awaiting approval
                        </p>
                    </div>
                    <Link href="/admin/users" className="text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors shrink-0">
                        Review →
                    </Link>
                </div>
            )}

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {primaryStats.map((stat) => (
                    <Link key={stat.label} href={stat.href} className="group">
                        <div className={`bg-white rounded-xl border ${stat.border} p-4 hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5`}>
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="text-xs text-slate-500 font-medium truncate">{stat.label}</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tabular-nums">{stat.value}</p>
                                </div>
                                <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl shrink-0`}>
                                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick actions + Recent inquiries */}
            <div className="grid lg:grid-cols-3 gap-4">
                {/* Quick actions */}
                {role !== "employee" && (
                    <div className="lg:col-span-1 space-y-3">
                        <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-slate-400" />
                            Quick Actions
                        </h2>
                        <div className="space-y-2">
                            <Link
                                href="/admin/cms/new"
                                className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors shrink-0">
                                    <Plus className="w-4 h-4 text-emerald-700" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-800">New Page</p>
                                    <p className="text-xs text-slate-400 truncate">Create a CMS page</p>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-500 ml-auto shrink-0 transition-colors" />
                            </Link>
                            <Link
                                href="/admin/cms"
                                className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors shrink-0">
                                    <FileEdit className="w-4 h-4 text-slate-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-800">Manage Pages</p>
                                    <p className="text-xs text-slate-400 truncate">View all CMS pages</p>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 ml-auto shrink-0 transition-colors" />
                            </Link>
                            <Link
                                href="/admin/inquiries"
                                className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors shrink-0">
                                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-800">All Inquiries</p>
                                    <p className="text-xs text-slate-400 truncate">View &amp; manage leads</p>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 ml-auto shrink-0 transition-colors" />
                            </Link>
                            <Link
                                href="/admin/schedule"
                                className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors shrink-0">
                                    <CalendarDays className="w-4 h-4 text-purple-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-800">Schedule</p>
                                    <p className="text-xs text-slate-400 truncate">Calendar &amp; meetings</p>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-purple-400 ml-auto shrink-0 transition-colors" />
                            </Link>
                        </div>
                    </div>
                )}

                {/* Recent inquiries */}
                <div className={role !== "employee" ? "lg:col-span-2" : "lg:col-span-3"}>
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                            <h2 className="text-sm font-semibold text-slate-900">Recent Inquiries</h2>
                            <Link href="/admin/inquiries" className="text-xs font-medium text-emerald-600 hover:text-emerald-700">
                                View all →
                            </Link>
                        </div>
                        {data.recentInquiries.length === 0 ? (
                            <div className="text-center py-14 text-slate-400">
                                <MessageSquare className="w-7 h-7 mx-auto mb-2 opacity-40" />
                                <p className="text-sm">No inquiries yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {data.recentInquiries.map((inq: any) => {
                                    const s = STATUS_STYLES[inq.status] ?? STATUS_STYLES.new
                                    return (
                                        <Link
                                            key={String(inq._id)}
                                            href="/admin/inquiries"
                                            className="flex items-center justify-between px-4 sm:px-5 py-3 hover:bg-slate-50 transition-colors gap-3"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-xs font-bold text-slate-600">
                                                    {inq.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-slate-900 truncate">{inq.name}</p>
                                                    <p className="text-xs text-slate-400 truncate">
                                                        {inq.phone}
                                                        {inq.state ? ` · ${inq.state}` : ""}
                                                        {" · "}{inq.insuranceType === "term" ? "Term Life" : "Health"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2.5 shrink-0">
                                                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full capitalize ${s.bg} ${s.text}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                                                    {inq.status.replace("_", " ")}
                                                </span>
                                                <span className="text-xs text-slate-400 hidden sm:block whitespace-nowrap">
                                                    {formatDateTime(inq.createdAt)}
                                                </span>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function DashboardSkeleton() {
    return (
        <div className="space-y-5 pt-3 sm:pt-5 lg:pt-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 animate-pulse">
                        <div className="h-3 bg-slate-200 rounded w-2/3 mb-3" />
                        <div className="h-8 bg-slate-200 rounded w-1/3" />
                    </div>
                ))}
            </div>
            <div className="h-64 bg-white rounded-xl border border-slate-200 animate-pulse" />
        </div>
    )
}

export default async function DashboardPage() {
    const user = await getAuthUser()
    if (!user) return null

    return (
        <div className="space-y-4 pt-3 sm:pt-5 lg:pt-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
                        {getGreeting()}, {user.name.split(" ")[0]} 👋
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                        {user.role === "employee"
                            ? `Showing inquiries${user.state ? ` for ${user.state}` : ""}`
                            : "Here's what's happening on your platform today"
                        }
                    </p>
                </div>
            </div>

            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardContent role={user.role} state={user.state} name={user.name} />
            </Suspense>
        </div>
    )
}