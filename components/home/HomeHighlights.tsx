"use client"

import { CheckCircle } from "lucide-react"

export default function HomeHighlights() {
    const highlights = [
        "Personalized Insurance Planning",
        "Quick Processing Assistance",
        "Support For Salaried & Self-Employed Individuals",
        "Online & Offline Consultation Available",
        "Guidance From Application To Claim Settlement",
        "Dedicated Advisor Assistance"
    ]

    return (
        <section className="py-20 sm:py-28 relative bg-slate-900 overflow-hidden text-center">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6 select-none"
                    style={{ background: "rgba(255,255,255,0.1)", color: "#E2E8F0", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                    Highlights
                </span>
                
                <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                    Helping Customers Make <span className="text-orange-500">Better Insurance Decisions</span>
                </h2>

                <p className="text-base sm:text-lg text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                    We focus on transparency, clarity, and customer-first support throughout the insurance journey.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                    {highlights.map((item, idx) => (
                        <div 
                            key={idx} 
                            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex items-center gap-4 transition-colors hover:bg-slate-800 hover:border-slate-600"
                        >
                            <CheckCircle className="w-5 h-5 text-orange-500 shrink-0" />
                            <span className="text-sm font-semibold text-slate-200">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
