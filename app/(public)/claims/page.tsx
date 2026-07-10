import { Metadata } from "next"
import Link from "next/link"
import {
    Shield, AlertCircle, Award, CheckCircle2,
    HeartHandshake, Clock, Wifi, MapPin,
    Phone, ArrowRight, Sparkles, Star,
    FileText, BadgeCheck, Zap
} from "lucide-react"

export const metadata: Metadata = {
    title: "Dedicated Claim Support Assistance — Policymine",
    description:
        "Claim situations can feel stressful and overwhelming. Our team assists customers throughout the coordination and documentation process — 24/7, free, online or in-person.",
}

const SUPPORT_ITEMS = [
    {
        icon: <HeartHandshake className="w-6 h-6 text-orange-500" />,
        badge: "01",
        title: "Service Oriented",
        desc: "We exist to serve — not to sell. Every interaction is focused entirely on your claim outcome, your documents, and your peace of mind.",
        color: "bg-orange-50 border-orange-100",
    },
    {
        icon: <Clock className="w-6 h-6 text-blue-500" />,
        badge: "02",
        title: "24/7 Support",
        desc: "Emergencies don't wait for office hours. Our claims team is available round the clock — day, night, weekends, and holidays.",
        color: "bg-blue-50 border-blue-100",
    },
    {
        icon: <Wifi className="w-6 h-6 text-emerald-500" />,
        badge: "03",
        title: "Online Free Consultation",
        desc: "Talk to a certified claim advisor via video call, WhatsApp, or phone — completely free, from anywhere in India.",
        color: "bg-emerald-50 border-emerald-100",
    },
    {
        icon: <MapPin className="w-6 h-6 text-purple-500" />,
        badge: "04",
        title: "Offline Help in Major Cities",
        desc: "Need in-person support? Visit our representatives in Mumbai, Delhi, Ahmedabad, Surat, Pune, and more major cities.",
        color: "bg-purple-50 border-purple-100",
    },
]

const PROCESS_STEPS = [
    { step: "01", title: "Notify Us First", desc: "Contact our team as soon as a claim situation arises. Early notification helps us guide you better and prevent paperwork errors." },
    { step: "02", title: "Document Collection", desc: "We help you gather the right documents — death certificates, hospital bills, FIRs, or medical records — without errors or omissions." },
    { step: "03", title: "Insurer Coordination", desc: "We act as your direct interface with the insurance company, following up on every stage of the approval process." },
    { step: "04", title: "Settlement Follow-Up", desc: "We track claim status in real time and escalate if there are delays — until the amount is credited to your nominee or account." },
]

const STATS = [
    { icon: <Star className="w-5 h-5 text-amber-500" />, stat: "98%", label: "Claim success rate" },
    { icon: <Clock className="w-5 h-5 text-orange-500" />, stat: "7 Days", label: "Avg. settlement time" },
    { icon: <HeartHandshake className="w-5 h-5 text-orange-500" />, stat: "10,000+", label: "Claims assisted" },
    { icon: <BadgeCheck className="w-5 h-5 text-orange-500" />, stat: "₹0", label: "Consultation fees" },
]

export default function ClaimSupportPage() {
    return (
        <div className="relative min-h-screen bg-slate-50/40 pb-32 overflow-hidden text-left">

            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)" }} />
            <div className="absolute inset-0 gold-mesh opacity-40 pointer-events-none" />

            {/* ── HERO ── */}
            <section className="relative pt-20 lg:pt-28 pb-20 z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">

                        {/* Left: Copy */}
                        <div className="space-y-7">
                            <div className="flex items-center gap-3">
                                <span className="h-[2px] w-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
                                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-600">Claim Settlement Support</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.05]" style={{ fontFamily: "var(--font-heading)" }}>
                                Dedicated Support<br />
                                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                                    During Claims.
                                </span>
                            </h1>

                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium max-w-xl">
                                Claim situations are stressful enough. Our team stands firmly beside your family — handling paperwork, insurer coordination, and follow-ups — so you can focus on what matters.
                            </p>

                            {/* Trust badges */}
                            <div className="grid sm:grid-cols-2 gap-3.5 pt-1">
                                {[
                                    { icon: <BadgeCheck className="w-4 h-4" />, text: "Regulation-Compliant Process" },
                                    { icon: <Zap className="w-4 h-4" />, text: "24/7 Round-the-Clock Help" },
                                    { icon: <FileText className="w-4 h-4" />, text: "Zero Documentation Errors" },
                                    { icon: <Phone className="w-4 h-4" />, text: "100% Free — No Fees Ever" },
                                ].map((b, i) => (
                                    <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                                        <div className="w-7 h-7 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                                            {b.icon}
                                        </div>
                                        {b.text}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 pt-3">
                                <Link href="/contact" className="btn-primary inline-flex items-center gap-2.5 rounded-2xl shadow-md">
                                    <Phone className="w-4 h-4 shrink-0 animate-pulse" />
                                    Get Claim Assistance
                                </Link>
                                <Link href="#support-includes" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors group">
                                    See What We Cover <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Right: Premium Image */}
                        <div className="relative group">
                            <div className="absolute -inset-6 rounded-[48px] blur-3xl opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)" }} />
                            <div className="relative rounded-[32px] overflow-hidden border border-orange-100 shadow-2xl aspect-[4/5]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/uploads/claims_support_hero.png"
                                    alt="Policymine claims support advisor"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                                <div className="absolute bottom-5 left-5 right-5">
                                    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg border border-white/50 w-full">
                                        <Shield className="w-4 h-4 text-orange-500 shrink-0" />
                                        <div>
                                            <p className="text-xs font-black text-slate-900 leading-none">We handle it — you heal</p>
                                            <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Available 24/7 · Free · No pressure</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Stats Bar ── */}
            <section className="bg-white border-y border-slate-100 py-10 relative z-10">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {STATS.map((s, i) => (
                        <div key={i} className="text-center space-y-1.5">
                            <div className="flex justify-center mb-2">{s.icon}</div>
                            <p className="text-2xl font-black text-slate-900">{s.stat}</p>
                            <p className="text-xs font-semibold text-slate-500">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Our Support Includes ── */}
            <section id="support-includes" className="py-20 relative z-10 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-5">
                            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">What We Offer</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            Our Support Includes
                        </h2>
                        <p className="text-slate-500 text-[15px] font-medium mt-3 max-w-xl leading-relaxed">
                            End-to-end claim assistance — however and wherever you need it.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                        {SUPPORT_ITEMS.map((item, i) => (
                            <div
                                key={i}
                                className="group relative bg-white rounded-[24px] p-7 border border-slate-100 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden"
                            >
                                {/* Top accent bar */}
                                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 to-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-[24px]" />

                                {/* Step badge */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.color}`}>
                                        {item.icon}
                                    </div>
                                    <span className="text-[11px] font-black text-slate-300 group-hover:text-orange-400 transition-colors select-none">
                                        #{item.badge}
                                    </span>
                                </div>

                                <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-2 group-hover:text-orange-600 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                                    {item.title}
                                </h3>
                                <p className="text-[12.5px] font-medium text-slate-500 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How We Work ── */}
            <section className="py-20 bg-white border-y border-slate-100 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left: Steps */}
                        <div className="space-y-7">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-5">
                                    <Award className="w-3.5 h-3.5 text-orange-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Our Process</span>
                                </div>
                                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                                    How We Handle Your Claim
                                </h2>
                                <p className="text-slate-500 text-sm font-medium mt-3 leading-relaxed max-w-md">
                                    A clear, step-by-step process — from the moment you call us to the day the settlement lands.
                                </p>
                            </div>

                            <div className="space-y-0">
                                {PROCESS_STEPS.map((s, i, arr) => (
                                    <div key={i} className="flex gap-5">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-md shadow-orange-200">
                                                {s.step}
                                            </div>
                                            {i < arr.length - 1 && (
                                                <div className="w-[2px] flex-1 my-2 bg-gradient-to-b from-orange-200 to-transparent" />
                                            )}
                                        </div>
                                        <div className="pb-8 text-left">
                                            <p className="text-sm font-bold text-slate-900 mb-1">{s.title}</p>
                                            <p className="text-xs font-medium text-slate-500 leading-relaxed">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Feature Cards */}
                        <div className="space-y-4">
                            {[
                                { icon: <CheckCircle2 className="w-5 h-5 text-orange-500" />, title: "Claim Guidance Support", desc: "Understand filing timelines, terms, and eligibility rules — explained in plain language." },
                                { icon: <FileText className="w-5 h-5 text-orange-500" />, title: "Documentation Assistance", desc: "We help complete all paperwork — medical proofs, death certificates, FIRs — without costly errors." },
                                { icon: <HeartHandshake className="w-5 h-5 text-orange-500" />, title: "Insurer Coordination", desc: "We act as your dedicated point of contact with major insurance companies — so you don't have to chase." },
                                { icon: <Zap className="w-5 h-5 text-orange-500" />, title: "Real-Time Follow-Ups", desc: "Track your claim status at every stage and get escalation support if there are unexpected delays." },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-200">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-orange-100 flex items-center justify-center shrink-0 shadow-sm">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 mb-0.5">{item.title}</p>
                                        <p className="text-xs font-medium text-slate-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Important Disclaimer ── */}
            <section className="py-16 relative z-10">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="rounded-3xl border border-rose-100 bg-white p-8 flex items-start gap-5 shadow-sm">
                        <div className="p-3 bg-rose-50 border border-rose-100 rounded-2xl text-rose-500 shrink-0">
                            <AlertCircle className="w-6 h-6 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">Important Regulatory Disclaimer</h4>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                                Final claim approval and settlement remain subject to insurer policies, terms, and underwriting conditions. Policymine acts as an insurance assistance and advisory support platform. Final approval, underwriting, and claim settlement are governed by the respective insurer's policies and regulatory guidelines.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="pb-8 relative z-10">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-10 sm:p-14 relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 30%, #F97316 0%, transparent 60%)" }} />
                        <Shield className="w-10 h-10 text-orange-400 mx-auto mb-5" />
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                            Facing a Claim Situation Right Now?
                        </h2>
                        <p className="text-slate-400 text-sm font-medium mb-7 leading-relaxed">
                            Don't wait. Call us or book a free consultation and we'll guide you through every step — at zero cost.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="btn-primary inline-flex items-center gap-2.5 rounded-2xl shadow-xl text-sm">
                                <Phone className="w-4 h-4 animate-pulse" />
                                Get Claim Help Now
                            </Link>
                            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors group">
                                Back to Home <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
