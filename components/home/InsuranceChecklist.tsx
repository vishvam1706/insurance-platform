"use client"

import Link from "next/link"
import { Calendar, MessageCircle, ArrowRight, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface Props {
    waUrl: string
}

export default function InsuranceChecklist({ waUrl }: Props) {
    return (
        <section className="py-24 relative overflow-hidden" style={{ background: "var(--surface-muted)" }}>
            {/* Decorative luxury glowing blur blobs */}
            <div className="absolute left-[-10%] top-[10%] w-[400px] h-[400px] rounded-full opacity-30 pointer-events-none blur-[80px]" 
                style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
            <div className="absolute right-[-10%] bottom-[10%] w-[450px] h-[450px] rounded-full opacity-20 pointer-events-none blur-[90px]" 
                style={{ background: "radial-gradient(circle, var(--text-primary) 0%, transparent 70%)" }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    
                    {/* LEFT — Premium luxury checklist pad visual */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative flex items-center justify-center py-10"
                    >
                        {/* Shadow backing */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(10,17,40,0.03)] to-transparent blur-xl rounded-full" />
                                               {/* Luxury Clipboard/Notepad */}
                        <div
                            className="relative rounded-[32px] p-10 transition-all duration-500 w-[330px] xs:w-[440px] max-w-full"
                            style={{ 
                                background: "#FFFFFF", 
                                transform: "rotate(-2deg)", 
                                border: "1px solid var(--brand-200)",
                                boxShadow: "0 22px 52px rgba(10,17,40,0.07)" 
                            }}
                        >
                            {/* Gold Binder Clip at top */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 rounded-t-md" 
                                style={{ background: "linear-gradient(to bottom, var(--brand) 0%, var(--brand-dark) 100%)", border: "1px solid var(--brand-dark)" }} />
                            
                            <div className="space-y-6 mt-4">
                                <div className="border-b border-[var(--brand-100)] pb-4 mb-5">
                                    <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest" style={{ color: "var(--brand-dark)" }}>The Checklist</span>
                                    <p className="text-base sm:text-xl font-black mt-0.5" style={{ color: "var(--text-primary)" }}>Perfect Coverage Check</p>
                                </div>
                                
                                <div className="flex items-center gap-3.5">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center border border-[var(--brand)] shrink-0" style={{ background: "var(--brand-light)" }}>
                                        <span className="text-[11px] font-black" style={{ color: "var(--brand-dark)" }}>✓</span>
                                    </div>
                                    <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase" style={{ color: "var(--text-primary)" }}>No Room Rent Caps</span>
                                </div>
                                
                                <div className="flex items-center gap-3.5">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center border border-[var(--brand)] shrink-0" style={{ background: "var(--brand-light)" }}>
                                        <span className="text-[11px] font-black" style={{ color: "var(--brand-dark)" }}>✓</span>
                                    </div>
                                    <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase" style={{ color: "var(--text-primary)" }}>Zero Copay Clause</span>
                                </div>
                                
                                <div className="flex items-center gap-3.5">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center border border-[var(--brand)] shrink-0" style={{ background: "var(--brand-light)" }}>
                                        <span className="text-[11px] font-black" style={{ color: "var(--brand-dark)" }}>✓</span>
                                    </div>
                                    <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase" style={{ color: "var(--text-primary)" }}>Restore Benefit Active</span>
                                </div>
 
                                <div className="flex items-center gap-3.5 opacity-60">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center border border-[var(--brand-100)] shrink-0">
                                        <span className="text-[11px] font-bold" style={{ color: "var(--text-muted)" }}></span>
                                    </div>
                                    <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase" style={{ color: "var(--text-muted)" }}>Check Waiting Period...</span>
                                </div>
                            </div>
 
                            {/* Luxury status badge */}
                            <div className="absolute -bottom-4 -right-4 rounded-full px-5 py-2.5 border border-[var(--brand)] shadow-lg flex items-center gap-2"
                                style={{ background: "var(--text-primary)", color: "#FFFFFF" }}>
                                <Sparkles className="w-4 h-4" style={{ color: "var(--brand)" }} />
                                <span className="text-[11px] font-black uppercase tracking-wider">Unbiased</span>
                            </div>
                        </div>

                        {/* Floating styled calendar icon */}
                        <div
                            className="absolute -bottom-6 left-8 w-14 h-14 rounded-2xl flex items-center justify-center border border-[var(--brand-100)] shadow-md"
                            style={{ background: "#FFFFFF" }}
                        >
                            <Calendar className="w-5 h-5" style={{ color: "var(--brand-dark)" }} />
                        </div>
                    </motion.div>

                    {/* RIGHT — text + premium checklist selectors */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <span className="text-xs font-black uppercase tracking-widest block mb-3" style={{ color: "var(--brand-dark)" }}>
                            The Checklist
                        </span>
                        <h2
                            className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
                            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                        >
                            Know What to Look For<br />
                            <span className="italic font-normal" style={{ color: "var(--brand-dark)" }}>Before You Buy.</span>
                        </h2>
                        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
                            We know how difficult it can be to navigate through hundreds of policies. So we've designed these handy checklists to make sure you know exactly what to check in a good policy before committing.
                        </p>

                        <div className="space-y-4">
                            <Link
                                href="/term-life"
                                className="group flex items-center justify-between w-full p-6 rounded-[24px] border border-[var(--brand-100)] transition-all duration-300 hover:border-[var(--brand)]"
                                style={{ background: "#FFFFFF", boxShadow: "0 4px 12px rgba(10,17,40,0.01)" }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-[var(--brand-100)] group-hover:bg-[var(--brand-light)] transition-colors">
                                        <ShieldCheck className="w-6 h-6" style={{ color: "var(--brand-dark)" }} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-extrabold uppercase tracking-wider" style={{ color: "var(--brand-dark)" }}>Term Insurance</p>
                                        <p className="text-base font-extrabold" style={{ color: "var(--text-primary)" }}>Term Life Checklist</p>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--brand-100)] bg-slate-50 group-hover:bg-[var(--text-primary)] group-hover:border-[var(--text-primary)] transition-all shrink-0">
                                    <ArrowRight className="w-4 h-4 transition-colors text-slate-500 group-hover:text-white" />
                                </div>
                            </Link>

                            <Link
                                href="/health"
                                className="group flex items-center justify-between w-full p-6 rounded-[24px] border border-[var(--brand-100)] transition-all duration-300 hover:border-[var(--brand)]"
                                style={{ background: "#FFFFFF", boxShadow: "0 4px 12px rgba(10,17,40,0.01)" }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-[var(--brand-100)] group-hover:bg-[var(--brand-light)] transition-colors">
                                        <HeartHandshake className="w-6 h-6" style={{ color: "var(--brand-dark)" }} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-extrabold uppercase tracking-wider" style={{ color: "var(--brand-dark)" }}>Health Insurance</p>
                                        <p className="text-base font-extrabold" style={{ color: "var(--text-primary)" }}>Health Policy Checklist</p>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--brand-100)] bg-slate-50 group-hover:bg-[var(--text-primary)] group-hover:border-[var(--text-primary)] transition-all shrink-0">
                                    <ArrowRight className="w-4 h-4 transition-colors text-slate-500 group-hover:text-white" />
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

