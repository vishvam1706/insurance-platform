import { Metadata } from "next"
import { ShieldAlert } from "lucide-react"

export const metadata: Metadata = {
    title: "Disclaimer — Policymine Insurance",
    description: "Read the Disclaimer of Policymine Insurance regarding quotes, partner insurers, and underwriting policy limitations.",
}

export default function DisclaimerPage() {
    return (
        <div className="relative min-h-screen bg-slate-50/50 py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,179,134,0.06) 0%, transparent 70%)" }} />

            <div className="relative max-w-4xl mx-auto px-6 sm:px-8 z-10 text-left space-y-12">
                {/* Header */}
                <div className="space-y-4">
                    <span className="badge-green inline-flex">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Legal Disclaimer
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        Disclaimer
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium">Last updated: May 21, 2026</p>
                </div>

                {/* Disclaimer details */}
                <div className="bg-white border border-slate-100 rounded-[32px] p-8 sm:p-12 shadow-[0_10px_30px_rgba(10,17,40,0.01)] prose prose-slate max-w-none space-y-8" style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}>
                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>1. General Informational Purpose</h2>
                        <p className="text-sm leading-relaxed">
                            The educational guides, comparison metrics, comparison tables, calculators, and reviews available on this platform are for general informational purposes only. While our content is reviewed by certified professionals, it does not constitute direct financial advice or a binding solicitation to purchase.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>2. Partner Insurers & Underwriting</h2>
                        <p className="text-sm leading-relaxed">
                            Policymine acts as a certified insurance referral and digital advisory facilitator. All insurance products (Term Life and Health) are underwritten by respective partner insurance companies registered with regulatory authorities. Policymine does not guarantee, represent, or warrant policy issuance or claim payouts, which are at the sole discretion of the underwriter.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>3. Accuracy of Quotes & Ratings</h2>
                        <p className="text-sm leading-relaxed">
                            We pull quotes and ratings based on updated data from respective insurers. Claim Settlement Ratios (CSR) and customer feedback indicators reflect past financial year performance and are subject to change. Actual premiums depend on health checks, age proof, smoking status, and final underwriting assessment.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>4. Reference Links & Third-Party Portals</h2>
                        <p className="text-sm leading-relaxed">
                            Our articles and comparison tables may contain links to partner insurer portals or external reference sites. Policymine is not responsible for the privacy policies, transaction processing, or content accuracy of external web assets.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
