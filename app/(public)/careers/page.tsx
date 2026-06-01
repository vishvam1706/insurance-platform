import { Metadata } from "next"
import Link from "next/link"
import { Shield, Sparkles, Briefcase, Award, Target, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
    title: "Careers — Join Policymine | Premium Insurance Portal",
    description: "Grow your career with Policymine. We are building a customer-focused insurance advisory platform driven by transparency, support, and long-term relationships.",
}

export default function CareersPage() {
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
                            <Briefcase className="w-4 h-4 animate-pulse" />
                            Work With Us
                        </span>
                        
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            Grow Your Career <br />
                            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">With Policymine.</span>
                        </h1>
                        
                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-medium" style={{ fontFamily: "var(--font-body)" }}>
                            We are building a customer-focused insurance advisory platform driven by transparency, support, and long-term relationships. Join our mission to simplify insurance.
                        </p>

                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full font-black text-xs uppercase tracking-wider">
                                Apply Now
                            </Link>
                        </div>
                    </div>

                    {/* Right Card Panel */}
                    <div className="relative group">
                        <div className="absolute -inset-4 rounded-[40px] opacity-15 blur-2xl pointer-events-none" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
                        <div className="relative bg-white border rounded-[36px] p-8 shadow-[0_20px_50px_rgba(15,23,42,0.02)]" style={{ borderColor: "var(--brand-100)" }}>
                            <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                                <Award className="w-5 h-5 text-orange-500" />
                                Why Join Policymine?
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { title: "Growth-Oriented Environment", desc: "Acquire new operational skills and build rapid leadership tracks." },
                                    { title: "Learning & Development Support", desc: "Gain fully sponsored IRDAI certifications and advisory skills." },
                                    { title: "Professional Work Culture", desc: "Work in a supportive, collaborative, and human-centric workspace." },
                                    { title: "Meaningful Direct Impact", desc: "Help millions of families protect their futures with honest, zero-spam advice." }
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

                {/* Open roles list */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 text-center" style={{ fontFamily: "var(--font-heading)" }}>
                        Current Open Roles
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        {[
                            { role: "Insurance Advisor", type: "Full-Time", loc: "Remote / Hybrid", desc: "Provide certified, unbiased phone advice and customized plan comparison files to incoming client leads." },
                            { role: "Customer Support Executive", type: "Full-Time", loc: "Bengaluru", desc: "Help clients coordinate applications, medical appointment bookings, verification status check, and renewal schedules." },
                            { role: "Relationship Manager", type: "Full-Time", loc: "Mumbai / Hybrid", desc: "Build strategic relations and coordinate with major insurance providers to facilitate fast settlements." },
                            { role: "Operations Coordinator", type: "Full-Time", loc: "Bengaluru", desc: "Manage CRM listings, advisor shift timings panel, system data, and verify document flows." }
                        ].map((r, idx) => (
                            <div key={idx} className="bg-white border rounded-3xl p-6.5 space-y-4 shadow-[0_4px_15px_rgba(15,23,42,0.01)] hover:border-orange-200 transition-colors" style={{ borderColor: "var(--brand-100)" }}>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-extrabold text-slate-800">{r.role}</h3>
                                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-100">{r.type}</span>
                                </div>
                                <p className="text-xs text-slate-400 font-medium">{r.loc}</p>
                                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">{r.desc}</p>
                                <div className="pt-2">
                                    <Link href="/contact" className="text-xs font-black uppercase tracking-widest text-orange-600 hover:text-orange-700 hover:underline">
                                        Submit Application &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
