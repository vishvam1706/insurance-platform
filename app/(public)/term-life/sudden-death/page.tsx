import { Metadata } from "next"
import Link from "next/link"
import {
    ArrowRight, Shield, CheckCircle2, Phone, AlertTriangle,
    HeartHandshake, IndianRupee, Users, ChevronRight,
    Clock, FileText, BadgeCheck, Zap
} from "lucide-react"

export const revalidate = 3600

export const metadata: Metadata = {
    title: "Sudden Death & Term Insurance — What Your Family Gets | Policymine",
    description:
        "Understand how sudden death is covered under term insurance in India. Learn claim process, payout timeline, nominee rights, and how to secure your family financially.",
}

const FAQS = [
    {
        q: "What qualifies as sudden death in a term insurance policy?",
        a: "Sudden death includes any unexpected, unforeseen death — cardiac arrest, road accident, stroke, or any other cause not excluded in the policy. As long as the policy is active and premiums are paid, the claim is valid.",
    },
    {
        q: "How quickly does the family receive the claim amount?",
        a: "Insurance regulations mandate insurers to settle death claims within 30 days of receiving all documents. Most top insurers like LIC, HDFC Life, and Max Life settle within 7–10 working days for straightforward cases.",
    },
    {
        q: "What documents does the nominee need to file a claim?",
        a: "The nominee typically needs: (1) Death certificate, (2) Original policy document, (3) Nominee's ID & bank details, (4) Filled claim form. For accidental death, an FIR or post-mortem report may also be required.",
    },
    {
        q: "Is accidental death covered differently from natural sudden death?",
        a: "Standard term plans cover both. With an Accidental Death Benefit (ADB) rider, the nominee receives an additional payout (equal to sum assured) on top of the base cover for accidental death.",
    },
    {
        q: "Can the claim be rejected after sudden death?",
        a: "A claim is rejected only if: (1) The policy was lapsed due to unpaid premiums, (2) The cause of death falls under an exclusion (e.g., suicide in the first year), or (3) Material information was hidden at purchase. Honest disclosure at the time of buying fully protects the claim.",
    },
]

export default function SuddenDeathPage() {
    return (
        <div className="relative min-h-screen bg-slate-50/40 pb-32 overflow-hidden text-left">

            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)" }} />

            {/* ── Breadcrumb ── */}
            <div className="max-w-7xl mx-auto px-6 pt-8">
                <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <Link href="/term-life" className="hover:text-orange-500 transition-colors">Term Life Insurance</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-orange-600 font-bold">Sudden Death Cover</span>
                </nav>
            </div>

            {/* ── HERO ── */}
            <section className="relative pt-14 pb-20 lg:pb-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 lg:gap-24 items-center">

                        {/* Left */}
                        <div className="space-y-7">
                            <div className="flex items-center gap-3">
                                <span className="h-[2px] w-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
                                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-600">Pure Protection</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.05]" style={{ fontFamily: "var(--font-heading)" }}>
                                Sudden Death Cover —<br />
                                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                                    What Your Family Gets
                                </span>
                            </h1>

                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium max-w-xl">
                                No one plans to die young. But if the unexpected happens, your term insurance policy ensures your family receives the <strong className="text-slate-900">full sum assured — immediately, without financial stress</strong>.
                            </p>

                            {/* Trust badges */}
                            <div className="grid sm:grid-cols-2 gap-3.5 pt-1">
                                {[
                                    { icon: <BadgeCheck className="w-4 h-4" />, text: "Regulated Claim Settlement Process" },
                                    { icon: <Zap className="w-4 h-4" />, text: "Claim Settled in 7–30 Days" },
                                    { icon: <FileText className="w-4 h-4" />, text: "Minimal Documentation Required" },
                                    { icon: <HeartHandshake className="w-4 h-4" />, text: "Dedicated Claim Assistance" },
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
                                    Get Protected Now
                                </Link>
                                <Link href="/term-life" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors group">
                                    Back to Term Insurance <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Right: Image */}
                        <div className="relative group">
                            <div className="absolute -inset-6 rounded-[48px] blur-3xl opacity-[0.08] group-hover:opacity-[0.14] transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)" }} />
                            <div className="relative rounded-[32px] overflow-hidden border border-orange-100 shadow-2xl aspect-[4/5]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/uploads/sudden_death_section.png"
                                    alt="Family protected by term insurance sudden death cover"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent pointer-events-none" />
                                <div className="absolute bottom-5 left-5 right-5">
                                    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg border border-white/50">
                                        <Shield className="w-4 h-4 text-orange-500 shrink-0" />
                                        <span className="text-xs font-bold text-slate-800">Your family is protected — always</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Stats Bar ── */}
            <section className="bg-white border-y border-slate-100 py-10">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {[
                        { icon: <IndianRupee className="w-5 h-5 text-orange-500" />, stat: "₹1 Cr+", label: "Cover from ₹600/month" },
                        { icon: <Users className="w-5 h-5 text-orange-500" />, stat: "99.6%", label: "Industry claim settlement" },
                        { icon: <Clock className="w-5 h-5 text-orange-500" />, stat: "7 Days", label: "Average claim settlement" },
                        { icon: <HeartHandshake className="w-5 h-5 text-orange-500" />, stat: "100%", label: "Sum assured paid to nominee" },
                    ].map((s, i) => (
                        <div key={i} className="text-center space-y-1.5">
                            <div className="flex justify-center mb-2">{s.icon}</div>
                            <p className="text-2xl font-black text-slate-900">{s.stat}</p>
                            <p className="text-xs font-semibold text-slate-500">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── What Is Sudden Death Cover ── */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-14 items-start">

                        {/* Left */}
                        <div className="space-y-7">
                            <div>
                                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[10px] font-black uppercase tracking-widest text-orange-600 mb-5">
                                    What It Covers
                                </span>
                                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                                    What Counts as Sudden Death Under a Term Plan?
                                </h2>
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    Any unforeseen death — whether from a heart attack, stroke, road accident, or other cause — qualifies as a sudden death claim under a standard term insurance policy. The insurer pays the full sum assured to the nominee, regardless of the cause, <strong className="text-slate-900">as long as the policy is active and the death is not under an exclusion</strong>.
                                </p>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    { title: "Cardiac arrest or stroke", desc: "Any cardiovascular event that leads to death is fully covered." },
                                    { title: "Road or workplace accident", desc: "Accidental death — covered. With ADB rider, double the payout." },
                                    { title: "Natural sudden death", desc: "Any other medically certified sudden cause of death." },
                                    { title: "Death during travel or abroad", desc: "Term plans cover death anywhere in the world, unless excluded." },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                                        <div className="w-5 h-5 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-3 h-3 text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 mb-0.5">{item.title}</p>
                                            <p className="text-xs font-medium text-slate-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Claim Process */}
                        <div className="space-y-6">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[10px] font-black uppercase tracking-widest text-orange-600">
                                Claim Process
                            </span>
                            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                                How the Claim Process Works
                            </h2>

                            <div className="space-y-0">
                                {[
                                    { step: "01", title: "Nominee contacts insurer", desc: "Within 90 days of death, the nominee calls the insurer's claims helpline or visits the branch." },
                                    { step: "02", title: "Documents submitted", desc: "Death certificate, original policy, nominee ID proof, and a completed claim form are submitted." },
                                    { step: "03", title: "Insurer verifies claim", desc: "The insurer verifies documents. For straightforward cases, verification is done within 3–5 working days." },
                                    { step: "04", title: "Amount credited", desc: "The full sum assured is credited directly to the nominee's bank account. Regulations mandate settlement within 30 days." },
                                ].map((s, i, arr) => (
                                    <div key={i} className="flex gap-5">
                                        <div className="flex flex-col items-center">
                                            <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center text-xs font-black shrink-0">
                                                {s.step}
                                            </div>
                                            {i < arr.length - 1 && <div className="w-[2px] flex-1 my-2 bg-orange-100" />}
                                        </div>
                                        <div className="pb-7 text-left">
                                            <p className="text-sm font-bold text-slate-900 mb-1">{s.title}</p>
                                            <p className="text-xs font-medium text-slate-500 leading-relaxed">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Warning */}
                            <div className="flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-2xl p-4">
                                <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                                    <strong className="text-orange-600">Protect your claim:</strong> Disclose all pre-existing conditions and medical history honestly at the time of buying. Hidden information is the primary reason claims are rejected.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-16 bg-white border-y border-slate-100">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="mb-10 text-left">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[10px] font-black uppercase tracking-widest text-orange-600 mb-4">
                            Common Questions
                        </span>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {FAQS.map((faq, i) => (
                            <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <p className="text-sm font-bold text-slate-900 mb-2">{faq.q}</p>
                                <p className="text-sm font-medium text-slate-600 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-10 sm:p-14 relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 30%, #F97316 0%, transparent 60%)" }} />
                        <Shield className="w-10 h-10 text-orange-400 mx-auto mb-5" />
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                            Secure Your Family Today
                        </h2>
                        <p className="text-slate-400 text-sm font-medium mb-7 leading-relaxed">
                            A ₹1 Crore term plan costs less than your monthly mobile bill. Talk to our certified advisor — free, no spam, no pressure.
                        </p>
                        <Link href="/contact" className="btn-primary inline-flex items-center gap-2.5 rounded-2xl shadow-xl text-sm">
                            <Phone className="w-4 h-4 animate-pulse" />
                            Book Free Consultation
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}
