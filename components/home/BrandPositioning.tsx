"use client"

import { CheckCircle2 } from "lucide-react"

export default function BrandPositioning() {
    const points = [
        "Personalized recommendations",
        "Transparent plan comparison",
        "Simple explanations without confusion",
        "Long-term customer support",
        "Claim assistance whenever required"
    ]

    return (
        <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #F8FAFC 0%, #FFFFFF 100%)" }}>
            <div className="max-w-4xl mx-auto px-6 text-center">
                <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6 select-none"
                    style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #DCFCE7" }}
                >
                    Brand Positioning
                </span>
                
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                    Insurance Guidance, <span style={{ color: "#16A34A" }}>Not Just Policy Selling</span>
                </h2>

                <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                    We help customers make smarter protection decisions based on their financial goals, responsibilities, lifestyle, and future needs — not sales targets.
                </p>

                <div className="bg-white rounded-3xl p-8 sm:p-10 border shadow-[0_10px_40px_rgba(15,23,42,0.04)] mb-10 text-left" style={{ borderColor: "#F1F5F9" }}>
                    <p className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">Our approach focuses on:</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {points.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-slate-700">{point}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-slate-500 text-sm font-medium leading-relaxed italic">
                    &ldquo;Every recommendation is designed to be practical, easy to understand, and aligned with your future financial security.&rdquo;
                </p>
            </div>
        </section>
    )
}
