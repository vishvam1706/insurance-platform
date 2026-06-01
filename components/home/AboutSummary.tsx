"use client"

import Link from "next/link"
import { ArrowRight, Search, XCircle, Target, FileText } from "lucide-react"

export default function AboutSummary() {
    return (
        <section className="py-20 sm:py-28 relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                
                {/* Text Content */}
                <div className="text-left">
                    <span
                        className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6 select-none"
                        style={{ background: "#F1F5F9", color: "#475569", border: "1px solid #E2E8F0" }}
                    >
                        About Us
                    </span>
                    
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                        Insurance Should Be Understood — <span className="text-slate-500">Not Just Purchased</span>
                    </h2>

                    <p className="text-base font-medium text-slate-600 mb-6 leading-relaxed">
                        Most people buy insurance without fully understanding:
                    </p>

                    <div className="space-y-4 mb-8">
                        {[
                            { icon: <Search className="w-4 h-4 text-slate-400" />, text: "What is actually covered" },
                            { icon: <XCircle className="w-4 h-4 text-slate-400" />, text: "What is excluded" },
                            { icon: <Target className="w-4 h-4 text-slate-400" />, text: "Whether the plan truly fits their life goals" },
                            { icon: <FileText className="w-4 h-4 text-slate-400" />, text: "How claims work during difficult situations" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                                    {item.icon}
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-base text-slate-600 mb-6 leading-relaxed font-medium">
                        <span className="font-bold text-slate-900">That’s where we help.</span> Our mission is to simplify insurance with transparent guidance, practical recommendations, and long-term support.
                    </p>
                    
                    <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                        Whether you are planning for family protection, health security, wealth creation, retirement, or your child’s future — we help you choose the right financial safety net with confidence.
                    </p>

                    <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 group">
                        Read Our Full Story
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Visual / Image */}
                <div className="relative">
                    <div className="aspect-[4/5] rounded-[32px] overflow-hidden border border-slate-200 shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src="/uploads/about_homepage_visual.png" 
                            alt="Understanding Insurance" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                // Fallback if image doesn't exist
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
                    </div>
                </div>

            </div>
        </section>
    )
}
