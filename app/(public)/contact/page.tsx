import { Metadata } from "next"
import InquiryForm from "@/components/public/InquiryForm"
import ContactSidebar from "@/components/public/ContactSidebar"
import { connectDB } from "@/lib/mongodb"
import SystemSettings from "@/lib/models/SystemSettings"
import { PowerOff } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: "Contact Our Insurance Experts — Policymine",
    description: "Speak with a real, certified insurance advisor. No bots, no pressure. We help you understand, compare, and choose the right plan for your family.",
}

async function getFormActive(): Promise<boolean> {
    try {
        await connectDB()
        const settings = await SystemSettings.findOne({ key: "global_settings" }).lean() as any
        if (settings && settings.formActive === false) return false
        return true
    } catch {
        return true
    }
}

export default async function ContactPage() {
    const formActive = await getFormActive()

    return (
        <div className="min-h-screen bg-white">

            {/* ── Top accent bar ──────────────────────────────────────── */}
            <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400" />

            {/* ── Main content ────────────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
                <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">

                    {/* LEFT — Sidebar */}
                    <ContactSidebar />

                    {/* RIGHT — Form card */}
                    <div className="lg:sticky lg:top-24">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/80 p-8">

                            {/* Header */}
                            <div className="mb-7 pb-6 border-b border-slate-100">
                                <h2 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                                    Request a callback
                                </h2>
                                <p className="text-sm text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
                                    Fill in your details. An advisor calls you — not a bot, not a tele-caller.
                                </p>
                            </div>

                            {formActive ? (
                                <InquiryForm />
                            ) : (
                                <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-8 text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto">
                                        <PowerOff className="w-8 h-8 text-rose-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-extrabold text-slate-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                                            Consultations Temporarily Unavailable
                                        </h3>
                                        <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto" style={{ fontFamily: "var(--font-body)" }}>
                                            Our advisor team is currently offline or at full capacity. Please check back shortly or reach us via email.
                                        </p>
                                    </div>
                                    <a
                                        href="mailto:support@policymine.in"
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm"
                                    >
                                        support@policymine.in
                                    </a>
                                    <p className="text-[11px] text-slate-400 font-medium pt-1">
                                        We'll be back soon. Thank you for your patience.
                                    </p>
                                </div>
                            )}

                            {/* Privacy note */}
                            {formActive && (
                                <div className="mt-6 pt-5 border-t border-slate-100 flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                    <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                                        Your data is encrypted and never shared with third parties. Policymine is registered
                                        under IRDAI guidelines. Final policy terms are governed by the respective insurer.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Bottom strip — social proof ─────────────────────────── */}
            <div className="border-t border-slate-100 bg-slate-50/60 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                        {[
                            { number: "1,00,000+", label: "Customers assisted" },
                            { number: "₹400 Cr+", label: "Premium managed" },
                            { number: "3,000+", label: "Advisor partners" },
                            { number: "16 languages", label: "Multilingual support" },
                        ].map(s => (
                            <div key={s.label}>
                                <p className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                                    {s.number}
                                </p>
                                <p className="text-xs text-slate-500 mt-1 font-normal" style={{ fontFamily: "var(--font-body)" }}>
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}