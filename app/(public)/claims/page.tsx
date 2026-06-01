import { Metadata } from "next"
import Link from "next/link"
import { Shield, Sparkles, AlertCircle, Award, Clock, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
    title: "Dedicated Claim Support Assistance — Policymine",
    description: "Claim situations can feel stressful and overwhelming. Our team assists customers throughout the coordination and documentation process.",
}

export default function ClaimSupportPage() {
    return (
        <div className="relative min-h-screen bg-slate-50/40 pb-24 overflow-hidden text-left">
            {/* Background mesh gradients */}
            <div className="absolute inset-0 gold-mesh opacity-50 pointer-events-none" />
            
            <div className="relative max-w-7xl mx-auto px-6 pt-20 lg:pt-28 z-10 space-y-16">
                
                {/* Hero section */}
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
                    <div className="space-y-6">
                        <span 
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest"
                            style={{ background: "var(--brand-light)", color: "var(--brand-dark)", border: "1px solid var(--brand-100)" }}
                        >
                            <Shield className="w-4 h-4 animate-pulse" />
                            Claim Settlement
                        </span>
                        
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            Dedicated Support <br />
                            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">During Claims.</span>
                        </h1>
                        
                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-medium" style={{ fontFamily: "var(--font-body)" }}>
                            Claim situations can feel stressful and overwhelming. Our team stands firmly with your family throughout the coordination, documentation, and filing process to ensure smooth settlement.
                        </p>

                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full font-black text-xs uppercase tracking-wider">
                                Get Claim Assistance
                            </Link>
                        </div>
                    </div>

                    {/* Right Card Panel */}
                    <div className="relative group">
                        <div className="absolute -inset-4 rounded-[40px] opacity-15 blur-2xl pointer-events-none" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
                        <div className="relative bg-white border rounded-[36px] p-8 shadow-[0_20px_50px_rgba(15,23,42,0.02)]" style={{ borderColor: "var(--brand-100)" }}>
                            <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                                <Award className="w-5 h-5 text-orange-500" />
                                Our Support Includes
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { title: "Claim Guidance Support", desc: "Understand filing timelines, terms, and eligibility rules immediately." },
                                    { title: "Documentation Assistance", desc: "Complete paper works, medical proofs, and certificates without errors." },
                                    { title: "Coordination with Insurer Teams", desc: "We act as your interface with major insurance providers directly." },
                                    { title: "Process Updates & Follow-ups", desc: "Get real-time tracking updates regarding approval stages." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-3 text-left">
                                        <CheckCircle2 className="w-5 h-5 shrink-0 text-orange-500 stroke-[2.5]" />
                                        <div>
                                            <p className="text-sm font-extrabold text-slate-800">{item.title}</p>
                                            <p className="text-xs text-slate-500 font-medium mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Important Disclaimer Notice */}
                <div className="rounded-3xl border border-slate-200 bg-white p-8 max-w-4xl mx-auto flex items-start gap-4 shadow-sm text-left">
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-2xl text-rose-500 shrink-0">
                        <AlertCircle className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">Important Regulatory Disclaimer</h4>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                            Final claim approval and settlement remain subject to insurer policies, terms, and underwriting conditions. Policymine acts as an insurance assistance and advisory support platform. Final approval, underwriting, and claim settlement are governed by the respective insurer’s policies and regulatory guidelines.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
