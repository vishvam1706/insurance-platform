import { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Phone, CheckCircle, FileText, ArrowRight, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
    title: "Claims Support — PM Partners Insurance",
    description: "Get dedicated, end-to-end claims support from PM Partners IRDAI certified advisors. Learn how to file claims and download documents.",
}

export default function ClaimsPage() {
    return (
        <div className="relative min-h-screen bg-slate-50/50 py-16 lg:py-24 overflow-hidden">
            {/* Background mesh gradients */}
            <div className="absolute inset-0 gold-mesh opacity-60 pointer-events-none" />
            <div className="absolute top-12 left-12 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
            <div className="absolute bottom-12 right-12 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 z-10 space-y-16">
                
                {/* Hero Header Section */}
                <div className="max-w-3xl text-left space-y-6">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm shadow-emerald-50">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Dedicated Claims Desk
                    </span>
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        We stand by you when you<br />
                        <span className="italic font-normal text-emerald-600 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">need us the most.</span>
                    </h1>
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium" style={{ fontFamily: "var(--font-body)" }}>
                        Buying a policy is just the beginning. Our dedicated claims assistance program ensures that your family receives complete, worry-free support during the claim settlement process.
                    </p>
                </div>

                {/* Step-by-Step Claim Journey */}
                <div className="space-y-8">
                    <div className="text-left">
                        <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>How Claim Assistance Works</h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-0.5 font-medium">Simple 3-step process to file and track your claims hassle-free.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                step: "01",
                                title: "Instant Notification",
                                desc: "Call or WhatsApp our dedicated claims desk immediately when an emergency arises. We will guide you through the initial steps.",
                            },
                            {
                                step: "02",
                                title: "Document Review",
                                desc: "Submit your medical bills, discharge sheets, or death certificates. Our in-house audit team reviews all papers to prevent rejection.",
                            },
                            {
                                step: "03",
                                title: "Direct Insurer Coordination",
                                desc: "We handle the follow-ups with the insurance company's TPA on your behalf to ensure rapid cashless approval or reimbursement payout.",
                            },
                        ].map((item, i) => (
                            <div 
                                key={i}
                                className="bg-white border border-slate-100 rounded-[28px] p-8 shadow-[0_4px_20px_rgba(10,17,40,0.01)] space-y-4 hover:border-emerald-100 transition-all duration-300 hover:scale-[1.01]"
                            >
                                <span className="text-3xl font-black text-emerald-600/10 block font-sans" style={{ letterSpacing: "-0.05em" }}>
                                    {item.step}
                                </span>
                                <h3 className="font-extrabold text-slate-800 text-base" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support Block */}
                <div className="bg-white border border-emerald-100 rounded-[32px] p-8 sm:p-12 shadow-[0_20px_50px_rgba(10,17,40,0.03)] grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4 text-left">
                        <h3 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                            Talk to our Claims Manager
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                            Facing issues with an ongoing claim? Or need pre-authorization for a planned surgery? Get connected with our claims managers for direct resolution.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
                        <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-[18px] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-[0_4px_20px_rgba(0,179,134,0.2)]"
                            style={{ background: "linear-gradient(135deg, #059669 0%, #0d9488 100%)" }}
                        >
                            <Phone className="w-3.5 h-3.5" />
                            Book Free Call
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
