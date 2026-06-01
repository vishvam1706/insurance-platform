import { Metadata } from "next"
import Link from "next/link"
import { Shield, Sparkles, Sunrise, Award, Target, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
    title: "Retirement Planning — Secure Your Future | Policymine",
    description: "Plan today for a financially secure retirement. Create stable retirement income, long-term wealth protection, and secure financial independence.",
}

export default function RetirementPlanningPage() {
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
                            <Sunrise className="w-4 h-4 animate-pulse" />
                            Retirement Income
                        </span>
                        
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            Plan Today For A <br />
                            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Financially Secure</span> Retirement.
                        </h1>
                        
                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-medium" style={{ fontFamily: "var(--font-body)" }}>
                            Retirement planning helps create a stable future income and financial independence after your active working years. Avoid dependency and safeguard your medical needs confidently.
                        </p>

                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full font-black text-xs uppercase tracking-wider">
                                Plan Your Retirement
                            </Link>
                        </div>
                    </div>

                    {/* Right Card Panel */}
                    <div className="relative group">
                        <div className="absolute -inset-4 rounded-[40px] opacity-15 blur-2xl pointer-events-none" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
                        <div className="relative bg-white border rounded-[36px] p-8 shadow-[0_20px_50px_rgba(15,23,42,0.02)]" style={{ borderColor: "var(--brand-100)" }}>
                            <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                                <Award className="w-5 h-5 text-orange-500" />
                                Planning Benefits
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { title: "Stable Retirement Income", desc: "Create a predictable lifetime pension or regular payout." },
                                    { title: "Long-Term Wealth Protection", desc: "Keep assets growing to outpace medical and living inflation." },
                                    { title: "Complete Financial Independence", desc: "Never depend on children or external loans during senior years." },
                                    { title: "Peace of Mind", desc: "Relax and enjoy your silver years without active income anxieties." }
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

                {/* Our Process steps */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 text-center" style={{ fontFamily: "var(--font-heading)" }}>
                        Our Retirement Process
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                        {[
                            { step: "01", title: "Retirement Goal Analysis", desc: "We evaluate your desired retirement age, lifestyle priorities, and anticipated monthly expenses." },
                            { step: "02", title: "Inflation Mapping", desc: "We project future costs adjusting for rising healthcare and lifestyle inflation indices dynamically." },
                            { step: "03", title: "Structured Payout Design", desc: "We map pension, annuity, and regular withdrawals to guarantee a lifetime of hassle-free payouts." },
                            { step: "04", title: "Personalized Support", desc: "We continually review your plan coordinates and offer prompt claim or revision assistance." }
                        ].map((s, idx) => (
                            <div key={idx} className="bg-white border rounded-3xl p-6 space-y-4 shadow-[0_4px_15px_rgba(15,23,42,0.01)] hover:border-orange-200 transition-colors" style={{ borderColor: "var(--brand-100)" }}>
                                <span className="text-3xl font-black text-orange-500/20 font-mono block">{s.step}</span>
                                <h3 className="text-base font-extrabold text-slate-800">{s.title}</h3>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
