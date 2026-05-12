import { Metadata } from "next"
import { Suspense } from "react"
import { unstable_noStore as noStore } from "next/cache"
import { getAuthUser } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Inquiry from "@/lib/models/Inquiry"
import User from "@/lib/models/User"
import {
    MessageSquare,
    Users,
    CheckCircle2,
    Clock,
    TrendingUp,
    CalendarDays,
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
        totalInquiries,
        newInquiries,
        contactedInquiries,
        resolvedInquiries,
        totalUsers,
        pendingUsers,
        recentInquiries,
    ] = await Promise.all([
        Inquiry.countDocuments(inquiryFilter),
        Inquiry.countDocuments({ ...inquiryFilter, status: "new" }),
        Inquiry.countDocuments({ ...inquiryFilter, status: "contacted" }),
        Inquiry.countDocuments({ ...inquiryFilter, status: "resolved" }),
        role !== "employee" ? User.countDocuments() : Promise.resolve(0),
        role !== "employee" ? User.countDocuments({ status: "pending" }) : Promise.resolve(0),
        Inquiry.find(inquiryFilter).sort({ createdAt: -1 }).limit(5).lean(),
    ])

    return {
        totalInquiries,
        newInquiries,
        contactedInquiries,
        resolvedInquiries,
        totalUsers,
        pendingUsers,
        recentInquiries: JSON.parse(JSON.stringify(recentInquiries)),
    }
}

const STATUS_STYLES: Record<string, string> = {
    new: "bg-emerald-100 text-emerald-700",
    contacted: "bg-yellow-100 text-yellow-700",
    resolved: "bg-green-100 text-green-700",
    not_reachable: "bg-red-100 text-red-700",
}

// ✅ Separate async component so Suspense can wrap it
async function DashboardContent({ role, state, name }: { role: string; state?: string; name: string }) {
    const data = await getDashboardData(role, state)

    const stats = [
        {
            label: "Total Inquiries",
            value: data.totalInquiries,
            icon: <MessageSquare className="w-5 h-5" />,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            label: "New / Uncontacted",
            value: data.newInquiries,
            icon: <Clock className="w-5 h-5" />,
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
        {
            label: "Contacted",
            value: data.contactedInquiries,
            icon: <TrendingUp className="w-5 h-5" />,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
        },
        {
            label: "Resolved",
            value: data.resolvedInquiries,
            icon: <CheckCircle2 className="w-5 h-5" />,
            color: "text-green-600",
            bg: "bg-green-50",
        },
    ]

    if (role !== "employee") {
        stats.push(
            {
                label: "Total Users",
                value: data.totalUsers,
                icon: <Users className="w-5 h-5" />,
                color: "text-purple-600",
                bg: "bg-purple-50",
            },
            {
                label: "Pending Approvals",
                value: data.pendingUsers,
                icon: <CalendarDays className="w-5 h-5" />,
                color: "text-rose-600",
                bg: "bg-rose-50",
            }
        )
    }

    return (
        <>
            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                {stats.map((stat) => (
                    <Card key={stat.label} className="border border-slate-200 shadow-sm">
                        <CardContent className="p-3 sm:p-5">
                            <div className="flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">{stat.label}</p>
                                    <p className="text-xl sm:text-3xl font-bold text-slate-900 mt-0.5 sm:mt-1">{stat.value}</p>
                                </div>
                                <div className={`${stat.bg} ${stat.color} p-2 sm:p-3 rounded-lg sm:rounded-xl shrink-0`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent inquiries */}
            <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-base font-semibold text-slate-900">
                        Recent Inquiries
                    </CardTitle>
                    <Link
                        href="/admin/inquiries"
                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                        View all →
                    </Link>
                </CardHeader>
                <CardContent className="p-0">
                    {data.recentInquiries.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No inquiries yet</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {data.recentInquiries.map((inq: any) => (
                                <div
                                    key={String(inq._id)}
                                    className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 hover:bg-slate-50 transition-colors gap-2"
                                >
                                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                                            <span className="text-xs sm:text-sm font-semibold text-slate-600">
                                                {inq.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-slate-900 truncate">{inq.name}</p>
                                            <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                                                {inq.phone} · {inq.state} · {inq.insuranceType === "term" ? "Term" : "Health"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                                        <Badge
                                            className={`text-[10px] sm:text-xs capitalize ${STATUS_STYLES[inq.status]}`}
                                            variant="secondary"
                                        >
                                            {inq.status.replace("_", " ")}
                                        </Badge>
                                        <span className="text-xs text-slate-400 hidden sm:block">
                                            {formatDateTime(inq.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pending approvals banner */}
            {role !== "employee" && data.pendingUsers > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-amber-900">
                                {data.pendingUsers} employee{data.pendingUsers > 1 ? "s" : ""} awaiting approval
                            </p>
                            <p className="text-xs text-amber-600">Review and approve new employee accounts</p>
                        </div>
                    </div>
                    <Link
                        href="/admin/users"
                        className="text-sm font-medium text-amber-700 hover:text-amber-800 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-lg transition-colors shrink-0 w-full sm:w-auto text-center"
                    >
                        Review →
                    </Link>
                </div>
            )}
        </>
    )
}

// ✅ Skeleton shown while DashboardContent loads
function DashboardSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="border border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                        <div className="animate-pulse space-y-3">
                            <div className="h-3 bg-slate-200 rounded w-2/3" />
                            <div className="h-8 bg-slate-200 rounded w-1/3" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default async function DashboardPage() {
    const user = await getAuthUser()
    if (!user) return null

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Page heading — renders immediately, no DB call */}
            <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">Dashboard</h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1">
                    Welcome back, {user.name}
                    {user.state ? ` — ${user.state}` : ""}
                </p>
            </div>

            {/* ✅ Suspense boundary wraps all DB-dependent content */}
            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardContent role={user.role} state={user.state} name={user.name} />
            </Suspense>
        </div>
    )
}