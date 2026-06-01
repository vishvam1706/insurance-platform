import { Metadata } from "next"
import Link from "next/link"
import { Shield, Users, BadgeCheck, Phone, Heart } from "lucide-react"

export const metadata: Metadata = {
    title: "About Us — Policymine Insurance",
    description: "Policymine was created with a simple mission — to make insurance easier to understand, transparent, and customer-focused.",
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
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-orange-50 text-orange-600 border border-orange-100 shadow-xs">
                        <Users className="w-3.5 h-3.5 text-orange-500" />
                        Our Mission
                    </span>
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        Building Trust Through <br />
                        <span className="italic font-normal text-orange-600 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Smarter Insurance Guidance.</span>
                    </h1>
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium" style={{ fontFamily: "var(--font-body)" }}>
                        We are on a mission to simplify insurance for every Indian household. Founded with a vision to eliminate mis-selling, Policymine is built on the core values of transparency, customer-centricity, and ethical advisory.
                    </p>
                </div>

                {/* Detailed Narrative Section */}
                <div className="rounded-[32px] bg-white border border-slate-200 p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.02)] grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center text-left">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                            Insurance Should Be Understood — Not Just Purchased
                        </h2>
                        <p className="text-slate-500 text-sm sm:text-base leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                            Most people buy insurance without fully understanding what is actually covered, what is excluded, whether the plan truly fits their life goals, or how claims work during difficult situations. That’s where we help.
                        </p>
                        <p className="text-slate-500 text-sm sm:text-base leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                            Our mission is to simplify insurance with transparent guidance, practical recommendations, and long-term support. Whether you are planning for family protection, health security, wealth creation, retirement, or your child’s future — we help you choose the right financial safety net with confidence.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-4">
                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0 border border-orange-200">
                            <Heart className="w-5 h-5" />
                        </div>
                        <h3 className="font-extrabold text-slate-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Our Core Values</h3>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">
                            We believe insurance should never feel confusing or sales-driven. It should feel secure, supportive, and built around your actual life goals.
                        </p>
                    </div>
                </div>

                {/* Core Competency Panels */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 text-center" style={{ fontFamily: "var(--font-heading)" }}>
                        Our Approach Focuses On:
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                        {[
                            {
                                icon: <Heart className="w-5 h-5 text-orange-600" />,
                                title: "Customer First Approach",
                                desc: "Every advice aligns strictly with your age, responsibilities, and budget guidelines, not sales targets.",
                            },
                            {
                                icon: <Shield className="w-5 h-5 text-orange-600" />,
                                title: "100% Transparent Comparisons",
                                desc: "No secrets. We present side-by-side premium breakdowns, hidden co-payments, waiting limits, and hospital lists openly.",
                            },
                            {
                                icon: <BadgeCheck className="w-5 h-5 text-orange-600" />,
                                title: "Zero Spam Policy",
                                desc: "We believe insurance should never feel confusing or sales-driven. We never cold call or push products.",
                            },
                            {
                                icon: <Users className="w-5 h-5 text-orange-600" />,
                                title: "Lifelong Claim Support",
                                desc: "Our team stands firmly with your family in moments of emergency, guiding you through files and insurer coordination end-to-end.",
                            },
                        ].map((value, i) => (
                            <div 
                                key={i}
                                className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-200 hover:border-orange-500/40 hover:scale-[1.01] transition-all duration-300 shadow-[0_4px_15px_rgba(15,23,42,0.01)]"
                            >
                                <div className="w-10 h-10 bg-orange-50 text-orange-600 border border-orange-100 rounded-xl flex items-center justify-center shrink-0 shadow-sm shadow-orange-50">
                                    {value.icon}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-extrabold text-slate-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{value.title}</h3>
                                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium" style={{ fontFamily: "var(--font-body)" }}>{value.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA Block */}
                <div className="rounded-[32px] border border-orange-100 p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.02)] bg-white text-center space-y-6 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                        Ready to Protect What Matters?
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
                        Connect with our IRDAI-certified experts now to build your tailored insurance protection portfolio without any marketing pressure.
                    </p>
                    <div className="flex justify-center">
                        <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-md bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                        >
                            <Phone className="w-3.5 h-3.5" />
                            Book Free Consultation
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
