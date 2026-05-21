import { Metadata } from "next"
import InquiryForm from "@/components/public/InquiryForm"
import { Phone, MessageCircle, Mail, Clock, CalendarDays, ShieldAlert, BadgeCheck } from "lucide-react"

export const metadata: Metadata = {
    title: "Book a Free Consultation — PM Partners Insurance",
    description: "Book a free 30-minute consultation with our IRDAI certified insurance advisors. No spam, no pressure.",
}

export default function ContactPage() {
    return (
        <div className="relative min-h-screen bg-slate-50/50 py-16 lg:py-24 overflow-hidden">
            {/* Background mesh gradients */}
            <div className="absolute inset-0 gold-mesh opacity-60 pointer-events-none" />
            <div className="absolute top-12 left-12 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
            <div className="absolute bottom-12 right-12 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
                    
                    {/* LEFT — Sticky Info & Trust Panel */}
                    <div className="lg:sticky lg:top-28 space-y-8 text-left">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100 mb-4 shadow-sm shadow-emerald-50">
                                <CalendarDays className="w-3.5 h-3.5" />
                                Expert Booking
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                                Book a Free<br />
                                <span className="italic font-normal text-emerald-600">Consultation.</span>
                            </h1>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg font-medium" style={{ fontFamily: "var(--font-body)" }}>
                                Talk to one of our expert advisors. No spam, no sales pressure — just honest, certified advice to help you protect what matters most.
                            </p>
                        </div>

                        {/* Visual graphic card */}
                        <div className="rounded-[28px] overflow-hidden border border-emerald-100 bg-white p-6 shadow-[0_12px_40px_-12px_rgba(0,179,134,0.06)] hover:scale-[1.01] transition-transform duration-300">
                            <img
                                src="/uploads/contact_trust.png"
                                alt="PM Partners Expert Guarantee Illustration"
                                className="w-full h-44 rounded-2xl mb-4 border border-emerald-50 object-cover shadow-sm"
                            />
                            <div className="flex items-center gap-2 mb-1.5 justify-center">
                                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                                <p className="text-sm font-bold text-slate-800">IRDAI Certified Advisors</p>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium text-center">Our advisors have strict zero-spam targets. Just honest help.</p>
                        </div>

                        {/* Interactive contact details list */}
                        <div className="space-y-4">
                            {[
                                { icon: <Phone className="w-5 h-5 text-emerald-600" />, title: "Free Phone Consultation", desc: "30 minutes with an expert advisor" },
                                { icon: <MessageCircle className="w-5 h-5 text-emerald-600" />, title: "Direct Helpline", desc: "Connect anytime, we respond quickly" },
                                { icon: <Mail className="w-5 h-5 text-emerald-600" />, title: "Email Support", desc: "Detailed answers to all your questions" },
                                { icon: <Clock className="w-5 h-5 text-emerald-600" />, title: "Flexible Timing", desc: "Mon–Sat, 9 AM – 6 PM IST" },
                            ].map((item) => (
                                <div 
                                    key={item.title} 
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-emerald-100 hover:scale-[1.01] transition-all duration-300 shadow-[0_4px_15px_-6px_rgba(0,179,134,0.01)]"
                                >
                                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl flex items-center justify-center shrink-0 shadow-sm shadow-emerald-50">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="font-extrabold text-slate-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</p>
                                        <p className="text-slate-500 text-xs mt-0.5" style={{ fontFamily: "var(--font-body)" }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Stunning Glassmorphic Form Card */}
                    <div className="relative group">
                        {/* Soft gold glow behind the card */}
                        <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-emerald-50 to-teal-50 opacity-30 blur-2xl group-hover:opacity-60 transition-all duration-500 pointer-events-none" />

                        <div className="relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 sm:p-10 shadow-[0_20px_50px_rgba(10,17,40,0.04)] hover:shadow-[0_24px_60px_rgba(0,179,134,0.08)] transition-all duration-500">
                            <h2 className="font-extrabold text-slate-900 text-xl tracking-tight mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                                Book Free Call
                            </h2>
                            <p className="text-slate-500 text-xs sm:text-sm mb-8" style={{ fontFamily: "var(--font-body)" }}>
                                Fill in your details and pick your convenient consultation time.
                            </p>
                            <InquiryForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}