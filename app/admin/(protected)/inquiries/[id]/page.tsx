import { Metadata } from "next"
import { notFound } from "next/navigation"
import { connectDB } from "@/lib/mongodb"
import Inquiry from "@/lib/models/Inquiry"
import { getAuthUser } from "@/lib/auth"
import { formatDateTime } from "@/lib/utils"
import InquiryStatusBadge from "@/components/admin/InquiryStatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Phone, Mail, MapPin, Calendar, ArrowLeft,
    User, Heart, Baby, Briefcase, TrendingUp, Umbrella, Shield,
    Cake, Users, Activity, FileText, UserCircle2
} from "lucide-react"
import Link from "next/link"
import UpdateInquiryForm from "@/components/admin/UpdateInquiryForm"

export const metadata: Metadata = { title: "Inquiry Detail" }

const INSURANCE_LABEL: Record<string, { label: string; icon: React.ReactNode }> = {
    term:       { label: "Pure Protection (Term Insurance)",     icon: <Shield className="w-4 h-4 text-orange-500" /> },
    health:     { label: "Health Insurance",                     icon: <Heart className="w-4 h-4 text-red-500" /> },
    retirement: { label: "Retirement Planning",                  icon: <Umbrella className="w-4 h-4 text-blue-500" /> },
    child:      { label: "Child Future Planning",                icon: <Baby className="w-4 h-4 text-purple-500" /> },
    wealth:     { label: "Investment & Wealth Plans",            icon: <TrendingUp className="w-4 h-4 text-emerald-500" /> },
    business:   { label: "Business & Keyman Insurance",          icon: <Briefcase className="w-4 h-4 text-amber-500" /> },
}

const HEALTH_LABEL: Record<string, { label: string; color: string }> = {
    healthy: { label: "Healthy",  color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    medium:  { label: "Medium",   color: "text-amber-700 bg-amber-50 border-amber-200" },
    notgood: { label: "Not Good", color: "text-orange-700 bg-orange-50 border-orange-200" },
    poor:    { label: "Poor",     color: "text-red-700 bg-red-50 border-red-200" },
}

export default async function InquiryDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const user = await getAuthUser()
    if (!user) return null

    const { id } = await params
    await connectDB()

    const inquiry = await Inquiry.findById(id)
        .populate("assignedTo", "name email")
        .lean()

    if (!inquiry) notFound()

    const inq = JSON.parse(JSON.stringify(inquiry)) as any

    // Employee guard
    const UserModel = await import("@/lib/models/User").then(m => m.default)
    if (user.role === "employee") {
        const dbUser = await UserModel.findById(user.userId).lean()
        if (dbUser) {
            let hasAccess = false
            if (dbUser.pincodes && dbUser.pincodes.length > 0) {
                if (dbUser.pincodes.includes(inq.pincode)) hasAccess = true
            }
            const stateFilter = dbUser.states && dbUser.states.length > 0 ? dbUser.states : (dbUser.state ? [dbUser.state] : [])
            const langFilter = dbUser.languages && dbUser.languages.length > 0 ? dbUser.languages : (dbUser.language ? [dbUser.language] : [])
            if (!hasAccess && (stateFilter.length > 0 || langFilter.length > 0)) {
                const stateMatch = stateFilter.length > 0 ? stateFilter.includes(inq.state) : true
                const langMatch = langFilter.length > 0 ? langFilter.includes(inq.language) : true
                if (stateMatch && langMatch) hasAccess = true
            }
            if (!hasAccess) notFound()
        } else {
            notFound()
        }
    }

    // Fetch active employees for update panel (Admin/Super Admin only)
    const isAdmin = user.role === "admin" || user.role === "super_admin"
    let employeesList: Array<{ _id: string; name: string; email: string; states?: string[]; languages?: string[]; pincodes?: string[] }> = []
    if (isAdmin) {
        const emps = await UserModel.find({ role: "employee", status: "active" })
            .select("_id name email states languages pincodes")
            .sort({ name: 1 })
            .lean()
        employeesList = JSON.parse(JSON.stringify(emps))
    }

    const insuranceMeta = INSURANCE_LABEL[inq.insuranceType] ?? { label: inq.insuranceType, icon: <Shield className="w-4 h-4" /> }
    const healthMeta = inq.healthRating ? HEALTH_LABEL[inq.healthRating] : null

    // Determine assigned ID
    let assignedId = ""
    if (inq.assignedTo) {
        assignedId = typeof inq.assignedTo === "object" ? inq.assignedTo._id : inq.assignedTo
    }

    return (
        <div className="space-y-6 max-w-5xl pt-3 sm:pt-5 lg:pt-6">
            <div className="flex items-center gap-3">
                <Link
                    href="/admin/inquiries"
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Inquiries
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-emerald-700">
                        {inq.name.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">{inq.name}</h1>
                    <InquiryStatusBadge status={inq.status} />
                </div>
            </div>

            {/* Layout grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {/* Left Column: Details */}
                <div className="md:col-span-2 space-y-6">
                    {/* Assigned To info banner */}
                    <Card className="border border-indigo-100 bg-indigo-50/40">
                        <CardContent className="flex items-center gap-3 py-3 px-4">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shrink-0 shadow-sm">
                                <UserCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned To</p>
                                <p className="text-sm font-semibold text-slate-800">
                                    {inq.assignedTo ? (typeof inq.assignedTo === "object" ? inq.assignedTo.name : inq.assignedTo) : "— Unassigned —"}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card className="border border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-base">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Row icon={<Phone className="w-4 h-4" />} label="Phone" value={inq.phone} />
                            <Row icon={<Mail className="w-4 h-4" />} label="Email" value={inq.email || "—"} />
                            <Row icon={<MapPin className="w-4 h-4" />} label="State, Language & Pincode" value={`${inq.state} · ${inq.language} · ${inq.pincode}`} />
                            {inq.dob && (
                                <Row icon={<Cake className="w-4 h-4" />} label="Date of Birth" value={inq.dob} />
                            )}
                        </CardContent>
                    </Card>

                    {/* Policy Preferences */}
                    <Card className="border border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-base">Policy Preferences</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Insurance Type */}
                            <div className="flex items-start gap-3">
                                <span className="text-slate-400 mt-0.5">{insuranceMeta.icon}</span>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Insurance Type</p>
                                    <p className="text-sm text-slate-900 font-semibold">{insuranceMeta.label}</p>
                                </div>
                            </div>

                            {/* Who For */}
                            {inq.whoFor && (
                                <div className="flex items-start gap-3">
                                    <span className="text-slate-400 mt-0.5">
                                        {inq.whoFor === "family" ? <Users className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    </span>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Who Is This For?</p>
                                        <p className="text-sm text-slate-900 font-semibold capitalize">{inq.whoFor === "self" ? "Yourself" : "Family"}</p>
                                    </div>
                                </div>
                            )}

                            {/* Health Rating */}
                            {inq.healthRating && healthMeta && (
                                <div className="flex items-start gap-3">
                                    <span className="text-slate-400 mt-0.5"><Activity className="w-4 h-4" /></span>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Health Rating</p>
                                        <span className={`inline-block mt-0.5 text-xs font-bold px-2.5 py-1 rounded-full border ${healthMeta.color}`}>
                                            {healthMeta.label}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Health Note */}
                            {inq.healthNote && (
                                <div className="flex items-start gap-3">
                                    <span className="text-slate-400 mt-0.5"><FileText className="w-4 h-4" /></span>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Health Condition Details</p>
                                        <p className="text-sm text-slate-900 mt-0.5 bg-red-50 border border-red-100 rounded-xl p-3 leading-relaxed">{inq.healthNote}</p>
                                    </div>
                                </div>
                            )}

                            {/* Preferred Slot */}
                            {inq.preferredSlot && (
                                <Row icon={<Calendar className="w-4 h-4" />} label="Preferred Call Slot" value={inq.preferredSlot} />
                            )}
                        </CardContent>
                    </Card>

                    {/* Message */}
                    {inq.message && (
                        <Card className="border border-slate-200">
                            <CardHeader><CardTitle className="text-base">Message from Client</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-700 whitespace-pre-wrap">{inq.message}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Advisor Notes */}
                    {inq.notes && (
                        <Card className="border border-slate-200">
                            <CardHeader><CardTitle className="text-base">Advisor Notes</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-700 whitespace-pre-wrap">{inq.notes}</p>
                            </CardContent>
                        </Card>
                    )}

                    <p className="text-xs text-slate-400">
                        Created {formatDateTime(inq.createdAt)} · Last updated {formatDateTime(inq.updatedAt)}
                    </p>
                </div>

                {/* Right Column: Sidebar Action Panel */}
                <div className="md:col-span-1">
                    <UpdateInquiryForm
                        inquiryId={inq._id}
                        initialStatus={inq.status}
                        initialAssignedTo={assignedId}
                        initialNotes={inq.notes || ""}
                        employees={employeesList}
                        isAdmin={isAdmin}
                    />
                </div>
            </div>
        </div>
    )
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3">
            <span className="text-slate-400 mt-0.5">{icon}</span>
            <div>
                <p className="text-xs text-slate-500 font-medium">{label}</p>
                <p className="text-sm text-slate-900">{value}</p>
            </div>
        </div>
    )
}