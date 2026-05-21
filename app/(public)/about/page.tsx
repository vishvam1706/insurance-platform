import { Metadata } from "next"
import Link from "next/link"
import { Shield, Users, BadgeCheck, MessageCircle, Phone, ArrowRight, Heart } from "lucide-react"

export const metadata: Metadata = {
    title: "About Us — PM Partners Insurance",
    description: "Learn more about PM Partners' mission to provide honest, spam-free, certified insurance advice for Indian families.",
}

export default function AboutPage() {
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
                        <Users className="w-3.5 h-3.5" />
                        Our Mission
                    </span>
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        Insurance advice you can<br />
                        <span className="italic font-normal text-emerald-600 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">actually trust.</span>
                    </h1>
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium" style={{ fontFamily: "var(--font-body)" }}>
                        We started PM Partners with a simple goal: to make insurance straightforward, honest, and completely spam-free for every Indian household.
                    </p>
                </div>

                {/* Main Content Panels */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Premium card explaining the core values */}
                    <div className="space-y-6">
                        {[
                            {
                                icon: <Shield className="w-5 h-5 text-emerald-600" />,
                                title: "100% Unbiased Advice",
                                desc: "Our recommendations are fully tailored to your specific age, health conditions, and budget. We never push products based on commission rates.",
                            },
                            {
                                icon: <BadgeCheck className="w-5 h-5 text-emerald-600" />,
                                title: "IRDAI Certified Experts",
                                desc: "Every single advisor at PM Partners is fully certified and undergoes rigorous training to ensure you receive correct, expert-backed answers.",
                            },
                            {
                                icon: <Heart className="w-5 h-5 text-emerald-600" />,
                                title: "Zero Spam Promise",
                                desc: "We hate spam as much as you do. We will never share your mobile number or email address with third parties. No persistent promotional calls, ever.",
                            },
                        ].map((value, i) => (
                            <div 
                                key={i}
                                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-emerald-100 hover:scale-[1.01] transition-all duration-300 shadow-[0_4px_15px_-6px_rgba(0,179,134,0.01)]"
                            >
                                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl flex items-center justify-center shrink-0 shadow-sm shadow-emerald-50">
                                    {value.icon}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-extrabold text-slate-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{value.title}</h3>
                                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{value.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Glassmorphic Visual Trust Banner */}
                    <div className="relative group">
                        <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-emerald-50 to-teal-50 opacity-30 blur-2xl group-hover:opacity-60 transition-all duration-500 pointer-events-none" />
                        <div className="relative bg-white border border-emerald-100 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(10,17,40,0.03)] text-center space-y-6">
                            <h3 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                                Why PM Partners?
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                                Most insurance portals are built as sales lead-generation systems that immediately trigger endless spam calls from aggressive sales agents. At PM Partners, we believe you deserve a better, more respectful experience. We focus entirely on customer satisfaction and dedicated claims support.
                            </p>
                            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                                <Link 
                                    href="/contact" 
                                    className="inline-flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-[18px] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-[0_4px_20px_rgba(0,179,134,0.2)]"
                                    style={{ background: "linear-gradient(135deg, #059669 0%, #0d9488 100%)" }}
                                >
                                    <Phone className="w-3.5 h-3.5" />
                                    Book Free Consultation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
