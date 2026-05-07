import { Metadata } from "next"
import { notFound } from "next/navigation"
import { connectDB } from "@/lib/mongodb"
import Inquiry from "@/lib/models/Inquiry"
import { getAuthUser } from "@/lib/auth"
import { formatDateTime } from "@/lib/utils"
import InquiryStatusBadge from "@/components/admin/InquiryStatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = { title: "Inquiry Detail" }
export const dynamic = "force-dynamic"

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

    // Serialize BSON types (ObjectId, Date) to plain strings
    const inq = JSON.parse(JSON.stringify(inquiry)) as any

    // Employee guard
    if (user.role === "employee" && inq.state !== user.state) notFound()

    return (
        <div className="space-y-6 max-w-2xl">
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
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-700">
                        {inq.name.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">{inq.name}</h1>
                    <InquiryStatusBadge status={inq.status} />
                </div>
            </div>

            <Card className="border border-slate-200">
                <CardHeader>
                    <CardTitle className="text-base">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Row icon={<Phone className="w-4 h-4" />} label="Phone" value={inq.phone} />
                    <Row icon={<Mail className="w-4 h-4" />} label="Email" value={inq.email} />
                    <Row icon={<MapPin className="w-4 h-4" />} label="State & Language" value={`${inq.state} · ${inq.language}`} />
                    <Row icon={<Calendar className="w-4 h-4" />} label="Insurance Type" value={inq.insuranceType === "term" ? "Term Life" : "Health"} />
                    {inq.preferredSlot && (
                        <Row icon={<Calendar className="w-4 h-4" />} label="Preferred Slot" value={inq.preferredSlot} />
                    )}
                </CardContent>
            </Card>

            {inq.notes && (
                <Card className="border border-slate-200">
                    <CardHeader><CardTitle className="text-base">Notes</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{inq.notes}</p>
                    </CardContent>
                </Card>
            )}

            <p className="text-xs text-slate-400">
                Created {formatDateTime(inq.createdAt)} · Last updated {formatDateTime(inq.updatedAt)}
            </p>
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