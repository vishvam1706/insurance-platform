import { Metadata } from "next"
import Link from "next/link"
import { Shield, Sparkles, Landmark, Award, Target, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
    title: "Business & Keyman Insurance — Operational Protection | Policymine",
    description: "Protect your business against financial uncertainties, liability risks, and active partner transitions with tailored business insurance solutions.",
}

export default function BusinessInsurancePage() {
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
                            <Landmark className="w-4 h-4 animate-pulse" />
                            Business Protection
                        </span>
                        
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            Protect Your Business <br />
                            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Against Risks</span> & Uncertainties.
                        </h1>
                        
                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-medium" style={{ fontFamily: "var(--font-body)" }}>
                            Business insurance solutions help organizations mitigate financial uncertainty and maintain stability during critical employee transitions or liability challenges. Protect what you spent years building.
                        </p>

                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full font-black text-xs uppercase tracking-wider">
                                Explore Business Protection
                            </Link>
                        </div>
                    </div>

                    {/* Right Card Panel */}
                    <div className="relative group">
                        <div className="absolute -inset-4 rounded-[40px] opacity-15 blur-2xl pointer-events-none" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
                        <div className="relative bg-white border rounded-[36px] p-8 shadow-[0_20px_50px_rgba(15,23,42,0.02)]" style={{ borderColor: "var(--brand-100)" }}>
                            <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                                <Award className="w-5 h-5 text-orange-500" />
                                Coverage Areas
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { title: "Keyman Insurance", desc: "Protect against loss of profit due to key executive transitions." },
                                    { title: "Liability Protection", desc: "Defend operations from third-party lawsuits and financial audits." },
                                    { title: "Business Continuity Support", desc: "Guarantee payouts to partners for seamless buy-sell structures." },
                                    { title: "Financial Risk Management", desc: "Minimize raw material liabilities and property damage shocks." }
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

                {/* Additional Guidance sections */}
                <div className="grid md:grid-cols-2 gap-8 pt-8 text-left">
                    <div className="bg-white border rounded-3xl p-8 space-y-4" style={{ borderColor: "var(--brand-100)" }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--brand-light)" }}>
                            <Target className="w-5 h-5 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>Why Corporate Teams Choose Us</h3>
                        <ul className="space-y-2.5 text-slate-600 text-sm font-medium">
                            <li className="flex items-center gap-2">✔ Personalized business risk assessment</li>
                            <li className="flex items-center gap-2">✔ Highly competitive premium comparisons</li>
                            <li className="flex items-center gap-2">✔ Complex keyman tax-deduction guidelines</li>
                            <li className="flex items-center gap-2">✔ Smooth documentation and underwriting coordinates</li>
                            <li className="flex items-center gap-2">✔ Long-term, customer-first support renewal audits</li>
                        </ul>
                    </div>

                    <div className="bg-white border rounded-3xl p-8 space-y-4" style={{ borderColor: "var(--brand-100)" }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--brand-light)" }}>
                            <Shield className="w-5 h-5 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>Comprehensive Audit</h3>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            We assist companies of all sizes — from tech startups and MSMEs to large scale corporations. Get in touch with our specialized corporate advisors today for a confidential risk audit.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
