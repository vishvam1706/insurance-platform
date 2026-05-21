import { Metadata } from "next"
import { ShieldAlert } from "lucide-react"

export const metadata: Metadata = {
    title: "Terms of Use — PM Partners Insurance",
    description: "Read the Terms of Use for PM Partners Insurance to understand the rules and guidelines for using our website.",
}

export default function TermsPage() {
    return (
        <div className="relative min-h-screen bg-slate-50/50 py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,179,134,0.06) 0%, transparent 70%)" }} />

            <div className="relative max-w-4xl mx-auto px-6 sm:px-8 z-10 text-left space-y-12">
                {/* Header */}
                <div className="space-y-4">
                    <span className="badge-green inline-flex">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Platform Terms
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        Terms of Use
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium">Last updated: May 21, 2026</p>
                </div>

                {/* Terms of use */}
                <div className="bg-white border border-slate-100 rounded-[32px] p-8 sm:p-12 shadow-[0_10px_30px_rgba(10,17,40,0.01)] prose prose-slate max-w-none space-y-8" style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}>
                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>1. Agreement to Terms</h2>
                        <p className="text-sm leading-relaxed">
                            By accessing and browsing our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use, as well as our Privacy Policy and Disclaimer declarations.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>2. Scope of Advisory Services</h2>
                        <p className="text-sm leading-relaxed">
                            PM Partners provides professional, IRDAI certified insurance advisory and comparison services. The quotes, calculations, and features displayed on this platform are for general reference. Actual policy terms and premium rates are determined after underwriting by the partner insurance companies.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>3. Accurate User Information</h2>
                        <p className="text-sm leading-relaxed">
                            Users are required to submit accurate, complete, and truthful information when booking consultation calls or submitting inquiry forms. Submitting false info or bypassing OTP verification is strictly prohibited and will lead to service termination.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>4. Intellectual Property</h2>
                        <p className="text-sm leading-relaxed">
                            All frontend designs, logos, guide contents, illustrations, icons, custom block scripts, and data layouts are the intellectual property of PM Partners. You are prohibited from scraping, copying, reproducing, or redistributing our content without express written consent.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>5. Limitation of Liability</h2>
                        <p className="text-sm leading-relaxed">
                            PM Partners strives to keep all database plans, features, and rates up to date. However, we are not responsible for typographical errors, discrepancies in premium amounts, or claim rejections by underwriters.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
