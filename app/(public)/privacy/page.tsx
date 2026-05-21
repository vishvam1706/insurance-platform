import { Metadata } from "next"
import { ShieldAlert, BookOpen } from "lucide-react"

export const metadata: Metadata = {
    title: "Privacy Policy — PM Partners Insurance",
    description: "Read the Privacy Policy of PM Partners Insurance to understand how we protect, store, and manage your personal data safely.",
}

export default function PrivacyPage() {
    return (
        <div className="relative min-h-screen bg-slate-50/50 py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,179,134,0.06) 0%, transparent 70%)" }} />

            <div className="relative max-w-4xl mx-auto px-6 sm:px-8 z-10 text-left space-y-12">
                {/* Header */}
                <div className="space-y-4">
                    <span className="badge-green inline-flex">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Privacy & Safety
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        Privacy Policy
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium">Last updated: May 21, 2026</p>
                </div>

                {/* Policy terms */}
                <div className="bg-white border border-slate-100 rounded-[32px] p-8 sm:p-12 shadow-[0_10px_30px_rgba(10,17,40,0.01)] prose prose-slate max-w-none space-y-8" style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}>
                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>1. Collection of Personal Data</h2>
                        <p className="text-sm leading-relaxed">
                            We collect personal information (such as name, mobile number, email address, age, gender, and financial details) when you register on our website, request a consultation call, or submit an inquiry form. This data is essential for assessing your insurance eligibility and suggesting suitable plans.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>2. How We Use Your Information</h2>
                        <p className="text-sm leading-relaxed">
                            The collected information is used solely to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
                            <li>Provide personalized insurance recommendations and quotes.</li>
                            <li>Contact you via phone call, WhatsApp, or email for certified advisory.</li>
                            <li>Enable smooth, secure verification via OTP (One-Time Password) systems.</li>
                            <li>Process policy claims and premium calculations.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>3. Spam-Free Guarantee</h2>
                        <p className="text-sm leading-relaxed">
                            PM Partners strictly enforces a zero-spam policy. We never sell, lease, trade, or distribute your contact details to third-party telemarketers or insurers without your explicit consent. Your details are safe with us.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>4. Cookies & Trackers</h2>
                        <p className="text-sm leading-relaxed">
                            We utilize standard cookies and analytical tags to understand website visitor flows, enhance page-load times, and personalize user experiences. You can disable cookies directly inside your browser settings if desired.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>5. Security Measures</h2>
                        <p className="text-sm leading-relaxed">
                            All user submissions, lead credentials, and OTP checks are processed through modern TLS encryption layers, and stored securely within authenticated clusters, shielded by standard enterprise security policies.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
