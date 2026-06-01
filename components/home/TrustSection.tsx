"use client"

import { Users, Shield, Globe, Award } from "lucide-react"

export default function TrustSection() {
    return (
        <section className="py-20 sm:py-28 relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6 select-none"
                    style={{ background: "#FFF7ED", color: "#EA580C", border: "1px solid #FFEDD5" }}
                >
                    Trust & Achievements
                </span>
                
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-12" style={{ fontFamily: "var(--font-heading)" }}>
                    Trusted By Families <span style={{ color: "#F97316" }}>Across India</span>
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: <Users className="w-6 h-6 text-orange-500" />,
                            title: "100K+",
                            subtitle: "Customers Assisted",
                            desc: "Helping individuals and families make informed insurance decisions."
                        },
                        {
                            icon: <Shield className="w-6 h-6 text-emerald-500" />,
                            title: "₹400Cr+",
                            subtitle: "Premium Managed",
                            desc: "Trusted financial protection solutions across multiple insurance categories."
                        },
                        {
                            icon: <Globe className="w-6 h-6 text-blue-500" />,
                            title: "3000+",
                            subtitle: "Partners Across India",
                            desc: "A growing network helping customers with personalized guidance."
                        },
                        {
                            icon: <Award className="w-6 h-6 text-purple-500" />,
                            title: "50+",
                            subtitle: "Member Specialist Team",
                            desc: "Dedicated experts focused on customer-first insurance assistance."
                        }
                    ].map((item, idx) => (
                        <div 
                            key={idx}
                            className="bg-slate-50 rounded-[24px] p-6 text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            style={{ borderColor: "#F1F5F9" }}
                        >
                            <div className="w-14 h-14 mx-auto bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-slate-100">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                                {item.title}
                            </h3>
                            <p className="text-sm font-bold text-slate-700 mb-3">{item.subtitle}</p>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
