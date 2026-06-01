import { Metadata } from "next"
import Link from "next/link"
import { Shield, Sparkles, Heart, Award, Target, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
    title: "Child Future Planning — Secure Higher Education | Policymine",
    description: "Prepare confidently for your child’s future education, career goals, and important life milestones with structured savings and insurance options.",
}

export default function ChildFuturePlanningPage() {
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
                            <Heart className="w-4 h-4 animate-pulse" />
                            Child Milestones
                        </span>
                        
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            Secure Your Child’s <br />
                            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Future Goals</span> Confidently.
                        </h1>
                        
                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-medium" style={{ fontFamily: "var(--font-body)" }}>
                            Prepare confidently for your child’s future education, marriage, and career milestones. Structured, disciplined savings paired with life protection waivers guarantee their dreams stay funded, no matter what.
                        </p>

                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full font-black text-xs uppercase tracking-wider">
                                Start Child Future Planning
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
                                    { title: "Education Funding Preparation", desc: "Build dedicated corpuses aligned with tuition inflation." },
                                    { title: "Long-Term Disciplined Savings", desc: "Instill savings routines that compound into massive safety nets." },
                                    { title: "Goal-Oriented Financial Planning", desc: "Target payouts to release precisely at ages 18, 21, and 24." },
                                    { title: "Premium Waiver Protection", desc: "Ensures the policy continues even if parents face unfortunate events." }
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
                        <h3 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>How We Help Parents</h3>
                        <ul className="space-y-2.5 text-slate-600 text-sm font-medium">
                            <li className="flex items-center gap-2">✔ Child education inflation modeling</li>
                            <li className="flex items-center gap-2">✔ Goal-based investment and SIP guidance</li>
                            <li className="flex items-center gap-2">✔ Mapping protection-linked child plans</li>
                            <li className="flex items-center gap-2">✔ Explaining guaranteed vs unit-linked options</li>
                            <li className="flex items-center gap-2">✔ Helping pick the right insurance waivers</li>
                        </ul>
                    </div>

                    <div className="bg-white border rounded-3xl p-8 space-y-4" style={{ borderColor: "var(--brand-100)" }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--brand-light)" }}>
                            <Shield className="w-5 h-5 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>Why Timely Planning Matters</h3>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            Education costs are rising at nearly 10% each year. Starting early allows compound interest to do the heavy lifting, giving your child a larger educational corpus at a significantly lower monthly premium.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
