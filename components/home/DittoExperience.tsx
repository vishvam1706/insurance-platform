"use client"

import Link from "next/link"
import { Phone, MessageCircle, CheckCircle2, Clock, Ban } from "lucide-react"

interface Props {
    waUrl: string
}

const STEPS = [
    {
        num: "01",
        title: "Get Expert Guidance",
        body: "Talk to IRDAI certified experts instead of pushy salesmen, with a guaranteed no-spam policy.",
        features: [
            { icon: <Clock className="w-4 h-4" style={{ color: "#2563EB" }} />, text: "30-Min consultation" },
            { icon: <CheckCircle2 className="w-4 h-4" style={{ color: "#16A34A" }} />, text: "Zero Cost" },
            { icon: <Ban className="w-4 h-4" style={{ color: "#EF4444" }} />, text: "Zero Spam" },
        ],
        visual: (
            <div className="relative rounded-2xl overflow-hidden" style={{ background: "#1E293B", minHeight: 280, padding: "24px" }}>
                {/* Chat bubbles */}
                <div className="space-y-3">
                    <div className="flex justify-end">
                        <div className="rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[220px]" style={{ background: "#BFDBFE", fontSize: 13, color: "#1E3A5F" }}>
                            Hey Ditto, can you help me find a good term insurance?
                        </div>
                    </div>
                    <div>
                        <div className="rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[220px]" style={{ background: "#374151", fontSize: 13, color: "#F3F4F6" }}>
                            Certainly! Let's find a plan that best suits your needs.
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="rounded-2xl rounded-tr-sm px-4 py-2.5" style={{ background: "#BFDBFE", fontSize: 13, color: "#1E3A5F" }}>Great!</div>
                    </div>
                    <div>
                        <div className="rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[220px]" style={{ background: "#374151", fontSize: 13, color: "#F3F4F6" }}>
                            First, can you help me with your age?
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="rounded-2xl rounded-tr-sm px-4 py-2.5" style={{ background: "#BFDBFE", fontSize: 13, color: "#1E3A5F" }}>28 years</div>
                    </div>
                    <div>
                        <div className="rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[240px]" style={{ background: "#374151", fontSize: 13, color: "#F3F4F6" }}>
                            Perfect. Now let's discuss what policy works best for you...
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        num: "02",
        title: "End-to-End Assistance",
        body: "From application to issuance, we hold your hand through every step of the process.",
        features: [
            { icon: <CheckCircle2 className="w-4 h-4" style={{ color: "#16A34A" }} />, text: "Document help" },
            { icon: <CheckCircle2 className="w-4 h-4" style={{ color: "#16A34A" }} />, text: "Medicals support" },
            { icon: <CheckCircle2 className="w-4 h-4" style={{ color: "#16A34A" }} />, text: "Policy issuance" },
        ],
        visual: (
            <div className="rounded-2xl p-6" style={{ background: "#FEF3C7", minHeight: 200 }}>
                <div className="space-y-3">
                    {["Application Filed", "Documents Verified", "Medical Completed", "Policy Issued"].map((step, i) => (
                        <div key={step} className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: i < 3 ? "#F59E0B" : "#E5E7EB", color: i < 3 ? "#fff" : "#9CA3AF" }}>
                                {i < 3 ? "✓" : "○"}
                            </div>
                            <span className="text-sm font-medium" style={{ color: i < 3 ? "#92400E" : "#9CA3AF" }}>{step}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        num: "03",
        title: "Claim Support",
        body: "We stand by you when it matters most — guiding through every step of the claims process.",
        features: [
            { icon: <CheckCircle2 className="w-4 h-4" style={{ color: "#16A34A" }} />, text: "Claims assistance" },
            { icon: <CheckCircle2 className="w-4 h-4" style={{ color: "#16A34A" }} />, text: "Dedicated helpline" },
            { icon: <CheckCircle2 className="w-4 h-4" style={{ color: "#16A34A" }} />, text: "Document support" },
        ],
        visual: (
            <div className="rounded-2xl p-6" style={{ background: "#FEF9C3", border: "2px solid #FCD34D", minHeight: 200 }}>
                <div className="text-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#FCD34D" }}>
                        <span className="text-2xl">✓</span>
                    </div>
                    <p className="font-bold mb-1" style={{ color: "#92400E" }}>Claim Approved</p>
                    <div className="h-2 rounded-full mb-1.5 mx-auto" style={{ background: "#FDE68A", width: "80%" }} />
                    <div className="h-2 rounded-full mx-auto" style={{ background: "#FDE68A", width: "60%" }} />
                    <p className="mt-4 text-sm font-bold" style={{ color: "#2563EB", fontFamily: "serif" }}>₹ Paid</p>
                </div>
            </div>
        ),
    },
]

export default function DittoExperience({ waUrl }: Props) {
    return (
        <section style={{ background: "#F8FAFC" }}>
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid lg:grid-cols-[280px_1fr] gap-16">
                    {/* LEFT sticky label */}
                    <div className="hidden lg:block">
                        <div className="sticky top-24">
                            <div
                                className="rounded-3xl p-8"
                                style={{ background: "#DBEAFE", minHeight: 200 }}
                            >
                                <h2
                                    className="text-3xl font-extrabold leading-tight"
                                    style={{ fontFamily: "var(--font-heading)", color: "#1E40AF" }}
                                >
                                    The Ditto<br />Experience
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT steps */}
                    <div>
                        {/* Mobile heading */}
                        <div className="lg:hidden mb-10">
                            <h2 className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-heading)" }}>
                                The Ditto Experience
                            </h2>
                        </div>

                        <div className="space-y-0 divide-y" style={{ borderColor: "#E5E7EB" }}>
                            {STEPS.map((step, idx) => (
                                <div key={step.num} className="py-12 first:pt-0 last:pb-0">
                                    {/* Step number badge */}
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-sm mb-5"
                                        style={{ background: "#DBEAFE", color: "#1D4ED8", fontFamily: "var(--font-heading)" }}
                                    >
                                        {step.num}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8 items-start">
                                        {/* Text side */}
                                        <div>
                                            <h3
                                                className="text-2xl font-extrabold mb-3"
                                                style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                                            >
                                                {step.title}
                                            </h3>
                                            <p className="mb-6 leading-relaxed" style={{ color: "#6B7280" }}>
                                                {step.body}
                                            </p>

                                            {/* Feature pills */}
                                            <div
                                                className="rounded-2xl p-5 space-y-3"
                                                style={{ border: "1px solid #E5E7EB", background: "#FFFFFF" }}
                                            >
                                                {step.features.map((f, i) => (
                                                    <div key={i} className="flex items-center gap-3 text-sm font-medium" style={{ color: "#374151" }}>
                                                        {f.icon}
                                                        {f.text}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* CTAs on first step */}
                                            {idx === 0 && (
                                                <div className="mt-6 space-y-3">
                                                    <Link
                                                        href="/contact"
                                                        className="flex items-center justify-between w-full font-semibold text-sm px-6 py-3.5 rounded-xl transition-all hover:opacity-90"
                                                        style={{ background: "#2563EB", color: "#FFFFFF" }}
                                                    >
                                                        Book a free call now
                                                        <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "2px 8px" }}>📅</span>
                                                    </Link>
                                                    <a
                                                        href={waUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-between w-full font-semibold text-sm px-6 py-3.5 rounded-xl border transition-all hover:bg-gray-50"
                                                        style={{ borderColor: "#D1D5DB", color: "#374151" }}
                                                    >
                                                        Chat with us on WhatsApp
                                                        <MessageCircle className="w-5 h-5" style={{ color: "#16A34A" }} />
                                                    </a>
                                                </div>
                                            )}
                                        </div>

                                        {/* Visual side */}
                                        <div>{step.visual}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
