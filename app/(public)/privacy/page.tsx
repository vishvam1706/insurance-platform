import { Metadata } from "next"
import { ShieldCheck, Calendar } from "lucide-react"

export const metadata: Metadata = {
    title: "Privacy Policy — Your Privacy Matters | Policymine",
    description: "We are committed to protecting customer information and maintaining confidentiality. Learn more about how we process data.",
}

export default function PrivacyPolicyPage() {
    return (
        <div className="relative min-h-screen bg-slate-50/40 pb-24 overflow-hidden text-left">
            {/* Background mesh gradients */}
            <div className="absolute inset-0 gold-mesh opacity-50 pointer-events-none" />
            
            <div className="relative max-w-4xl mx-auto px-6 pt-20 lg:pt-28 z-10 space-y-10">
                
                {/* Hero Header */}
                <div className="space-y-4">
                    <span 
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest"
                        style={{ background: "var(--brand-light)", color: "var(--brand-dark)", border: "1px solid var(--brand-100)" }}
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Data Protection
                    </span>
                    
                    <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        Your Privacy Matters.
                    </h1>
                    
                    <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-1.5 font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        Last updated: May 2026
                    </p>
                </div>

                {/* Content Panel */}
                <div className="bg-white border rounded-[32px] p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.02)] space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed" style={{ borderColor: "var(--brand-100)" }}>
                    <p>
                        At <strong>Policymine</strong>, we are committed to protecting customer information and maintaining complete confidentiality. 
                    </p>
                    
                    <h3 className="text-lg font-bold text-slate-800 pt-2" style={{ fontFamily: "var(--font-heading)" }}>1. Collection of Information</h3>
                    <p>
                        Personal details shared through consultations, callback inquiries, and documentation assistance are handled responsibly and used only for insurance-related assistance, booking schedules, and advisory communication purposes. We never sell, lease, or share your contact credentials with third-party telemarketing firms.
                    </p>

                    <h3 className="text-lg font-bold text-slate-800 pt-2" style={{ fontFamily: "var(--font-heading)" }}>2. Processing and Security</h3>
                    <p>
                        All user data is processed in accordance with applicable legal and regulatory requirements in India. We employ strict electronic access controls to ensure your records remain safe and confidential from unauthorized access or breaches.
                    </p>

                    <h3 className="text-lg font-bold text-slate-800 pt-2" style={{ fontFamily: "var(--font-heading)" }}>3. Communications</h3>
                    <p>
                        We communicate with you exclusively regarding requests you initiate (consultation blocks, OTP verification, and document coordination). We enforce a strict **Zero Spam Policy**—no pushy sales calls, no promotional message lists, and no unsolicited newsletters.
                    </p>
                </div>

            </div>
        </div>
    )
}
