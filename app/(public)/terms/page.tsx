import { Metadata } from "next"
import { ShieldCheck, Calendar } from "lucide-react"

export const metadata: Metadata = {
    title: "Terms of Use — Service Guidelines | Policymine",
    description: "By accessing this website and using our services, users agree to the applicable terms, policies, and regulatory guidelines.",
}

export default function TermsOfUsePage() {
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
                        Service Agreement
                    </span>
                    
                    <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        Terms Of Use.
                    </h1>
                    
                    <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-1.5 font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        Last updated: May 2026
                    </p>
                </div>

                {/* Content Panel */}
                <div className="bg-white border rounded-[32px] p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.02)] space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed" style={{ borderColor: "var(--brand-100)" }}>
                    <p>
                        By accessing this website and using our services, users agree to the applicable terms, policies, and regulatory guidelines listed herein. 
                    </p>
                    
                    <h3 className="text-lg font-bold text-slate-800 pt-2" style={{ fontFamily: "var(--font-heading)" }}>1. Advisory Services Limits</h3>
                    <p>
                        Policymine acts as an insurance assistance and advisory support platform. We provide transparent plan comparisons, personalized guidance, and claims documentation reviews. However, final policy approval, underwriting, premium cost calculations, and claim settlements are strictly governed by the respective insurer’s policies and regulatory guidelines.
                    </p>

                    <h3 className="text-lg font-bold text-slate-800 pt-2" style={{ fontFamily: "var(--font-heading)" }}>2. Solicitation Disclaimer</h3>
                    <p>
                        <strong>Insurance is the subject matter of solicitation.</strong> Policy issuance and claim settlement remain strictly subject to insurer terms and conditions. Users are strongly advised to review all original policy, exclusions, and deductible documents carefully before making any purchase decision.
                    </p>

                    <h3 className="text-lg font-bold text-slate-800 pt-2" style={{ fontFamily: "var(--font-heading)" }}>3. Accurate Information Clause</h3>
                    <p>
                        Our advisory capacity is dependent on the completeness and accuracy of the age, medical history, responsibilities, and existing insurance information shared by you during consultations. Policymine is not responsible for any underwriting declines or claims rejections arising from misrepresentation or material omissions.
                    </p>
                </div>

            </div>
        </div>
    )
}
