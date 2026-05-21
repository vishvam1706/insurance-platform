"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Phone, MessageCircle, CheckCircle2, Clock, Ban, ShieldCheck, FileText, Sparkles, Send } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { PmPartnersExperienceBlockData } from "@/types/blocks"

interface Props {
    data?: PmPartnersExperienceBlockData
    waUrl: string
}

export default function PmPartnersExperience({ data, waUrl }: Props) {
    const heading = data?.heading || "The Process"
    const subheading = data?.subheading || "The PM Partners Experience."
    const description = data?.description || "We have redesigned the entire buying journey to put you in control. No spam, no stress, just beautiful advisory support."
    const leftImage = data?.leftImage
    const step1Image = data?.step1Image
    const step2Image = data?.step2Image
    const step3Image = data?.step3Image

    const [activeStep, setActiveStep] = useState(0)
    const [activeFeature, setActiveFeature] = useState(0)

    // Reset activeFeature when the step changes
    useEffect(() => {
        setActiveFeature(0)
    }, [activeStep])

    // Cycle through features every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((curr) => (curr + 1) % 3)
        }, 3000)
        return () => clearInterval(interval)
    }, [activeStep])

    const handleTabClick = (idx: number) => {
        setActiveStep(idx)
    }

    const STEPS = [
        {
            num: "01",
            title: "Get Expert Guidance",
            body: "Speak directly with expert advisors who have a strict, guaranteed zero-spam policy. No pushy sales calls, ever.",
            features: [
                { icon: <Clock className="w-4 h-4 text-emerald-600" />, text: "30-Min thorough consultation" },
                { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: "Zero Advisory Cost" },
                { icon: <Ban className="w-4 h-4 text-red-500" />, text: "Zero Spam Guaranteed" },
            ],
            visual: (
                <div className="relative rounded-[28px] overflow-hidden border border-emerald-100 bg-white p-4 sm:p-6 shadow-[0_12px_40px_-12px_rgba(0,179,134,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(0,179,134,0.12)] transition-all duration-500 w-full">
                    {/* Chat Top bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-slate-50">
                        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-[10px] sm:text-xs shrink-0 select-none">
                                DA
                                <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
                            </div>
                            <div className="text-left min-w-0">
                                <p className="text-xs font-bold text-slate-800 truncate">PM Partners Advisor</p>
                                <p className="text-[9px] sm:text-[10px] text-emerald-600 font-medium truncate">Expert Consult Live</p>
                            </div>
                        </div>
                        <div className="px-2.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0 select-none">
                            Zero Spam
                        </div>
                    </div>

                    {/* Chat bubbles */}
                    <div className="space-y-3">
                        <div className="flex justify-end">
                            <div className="rounded-[18px] rounded-tr-sm px-3.5 py-2 max-w-[85%] text-xs font-semibold leading-relaxed bg-emerald-50 text-emerald-950 border border-emerald-100/50 text-left">
                                Can you help me choose the right term life cover?
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="rounded-[18px] rounded-tl-sm px-3.5 py-2 max-w-[85%] text-xs font-medium leading-relaxed bg-slate-50 text-slate-800 border border-slate-100 text-left">
                                Absolutely! Let's examine your income and liabilities to find the optimal cover without pushy sales.
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="rounded-[18px] rounded-tr-sm px-3.5 py-2 max-w-[85%] text-xs font-semibold leading-relaxed bg-emerald-50 text-emerald-950 border border-emerald-100/50 text-left">
                                That sounds wonderful!
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            num: "02",
            title: "End-to-End Assistance",
            body: "From medical scheduling to documentation checks, we support you through every single step of the process.",
            features: [
                { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: "Thorough documentation checklist" },
                { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: "Medicals booking support" },
                { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: "Direct policy issuance tracking" },
            ],
            visual: (
                <div className="relative rounded-[28px] overflow-hidden border border-emerald-100 bg-white p-4 sm:p-6 shadow-[0_12px_40px_-12px_rgba(0,179,134,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(0,179,134,0.12)] transition-all duration-500 w-full">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <p className="text-xs font-bold text-slate-800">Your Journey Tracker</p>
                    </div>
                    <div className="space-y-3">
                        {[
                            { label: "Application Filed", status: "Completed" },
                            { label: "Documents Verified", status: "Completed" },
                            { label: "Medical Completed", status: "Completed" },
                            { label: "Policy Issued", status: "In Progress" }
                        ].map((step, i) => (
                            <div key={step.label} className="flex items-center justify-between gap-2 py-1.5 border-b border-slate-50 last:border-none w-full">
                                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                                    <div className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black transition-all shrink-0 ${
                                        i < 3 
                                            ? "bg-emerald-500 text-white shadow-xs shadow-emerald-200" 
                                            : "bg-slate-50 text-slate-400 border border-slate-200"
                                    }`}>
                                        {i < 3 ? "✓" : "○"}
                                    </div>
                                    <span className={`text-[11px] sm:text-xs font-bold truncate ${i < 3 ? "text-slate-800" : "text-slate-400"}`}>{step.label}</span>
                                </div>
                                <span className={`text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                    i < 3 
                                        ? "text-emerald-600 bg-emerald-50" 
                                        : "text-slate-400 bg-slate-50"
                                }`}>
                                    {step.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            num: "03",
            title: "Dedicated Claim Support",
            body: "We stand firmly by your family when it matters most, managing the claim settlement process end-to-end.",
            features: [
                { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: "24/7 Priority claims helpline" },
                { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: "Fast-track documentation support" },
                { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: "Complete insurer coordination" },
            ],
            visual: (
                <div className="relative rounded-[28px] overflow-hidden border border-emerald-100 bg-white p-4 sm:p-6 shadow-[0_12px_40px_-12px_rgba(0,179,134,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(0,179,134,0.12)] transition-all duration-500 text-center w-full">
                    <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-3 shadow-xs shadow-emerald-50 shrink-0 select-none">
                        <ShieldCheck className="w-5.5 h-5.5 text-emerald-600" />
                    </div>
                    <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 mb-1.5">Claim Settlement Status</p>
                    <div className="h-2 rounded-full bg-slate-50 border border-slate-100 mb-2 overflow-hidden max-w-[80%] mx-auto relative select-none">
                        <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000 w-[100%] shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    </div>
                    
                    <p className="mt-3.5 text-base sm:text-lg font-black tracking-tight text-emerald-600" style={{ fontFamily: "var(--font-heading)" }}>
                        100% Payout Settled
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Assisted completely by PM Partners Claims Team</p>
                </div>
            ),
        },
    ]

    return (
        <section className="relative border-b border-emerald-100 bg-slate-50/50 py-16 sm:py-20 lg:py-24 overflow-hidden">
            {/* Decorative background gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-[0.03]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-16">
                    {/* LEFT Sticky Content Card */}
                    <div className="h-fit lg:sticky lg:top-28">
                        <div className="rounded-3xl p-6 sm:p-8 border border-emerald-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.01)] backdrop-blur-md text-left">
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">{heading}</span>
                            <h2
                                className="text-3xl sm:text-4xl font-extrabold leading-tight mt-3 text-slate-900 tracking-tight"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {subheading}
                            </h2>
                            <p className="text-xs text-slate-500 mt-4 leading-relaxed text-left">
                                {description}
                            </p>
                            
                            {/* Process Image */}
                            <div className="mt-6 rounded-2xl overflow-hidden border border-emerald-100/50 shadow-md relative group select-none">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={leftImage || "/uploads/contact_trust.png"} 
                                    alt="Buying Journey" 
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT Autoplay slideshow */}
                    <div className="flex flex-col justify-center">
                        {/* Autoplay Navigation Tabs Header */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 bg-white/40 p-1.5 sm:p-2 rounded-2xl border border-emerald-100/60 shadow-xs backdrop-blur-xs select-none">
                            {STEPS.map((step, idx) => {
                                const isActive = activeStep === idx
                                return (
                                    <button
                                        key={step.num}
                                        onClick={() => handleTabClick(idx)}
                                        className={`relative flex flex-col p-2.5 sm:p-3.5 rounded-xl border text-left transition-all duration-300 outline-none ${
                                            isActive
                                                ? "bg-white border-emerald-200/80 shadow-xs"
                                                : "bg-transparent border-transparent hover:bg-white/20"
                                        }`}
                                    >
                                        <span className={`text-[9px] font-black uppercase tracking-widest leading-none ${isActive ? "text-emerald-600" : "text-slate-400"}`}>
                                            Step {step.num}
                                        </span>
                                        <span className={`text-[10px] sm:text-xs font-extrabold tracking-tight mt-1 truncate block ${isActive ? "text-slate-800" : "text-slate-500"}`}>
                                            {step.title.split(" ").slice(-2).join(" ")}
                                        </span>
                                        
                                        {/* Premium layout underlined highlight (static manual tabs) */}
                                        <div className="absolute left-2.5 right-2.5 bottom-0 h-[2.5px] rounded-full bg-slate-100/70 mt-1.5 overflow-hidden">
                                            {isActive && (
                                                <motion.div 
                                                    layoutId="activeTabUnderline"
                                                    className="h-full bg-emerald-500 rounded-full w-full"
                                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                                />
                                            )}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Animated Step Container */}
                        <div className="min-h-[460px] sm:min-h-[360px] md:min-h-[290px] flex items-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                    className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-10 items-center w-full"
                                >
                                    {/* Left text column */}
                                    <div className="space-y-4 text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50/70 border border-emerald-100 px-2 py-0.5 rounded-full">
                                                Active Stage
                                            </span>
                                        </div>
                                        <h3
                                            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {STEPS[activeStep].title}
                                        </h3>
                                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                            {STEPS[activeStep].body}
                                        </p>

                                        {/* Features checklist container - shows one at a time with premium animations */}
                                        <div className="relative rounded-2xl p-4 sm:p-5 border border-emerald-100 bg-white shadow-[0_4px_20px_-4px_rgba(0,179,134,0.02)] min-h-[64px] flex items-center overflow-hidden">
                                            {/* Left color bar that pulses */}
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500" />
                                            
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={activeFeature}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                                    className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-800 w-full pl-2 text-left"
                                                >
                                                    <span className="shrink-0 p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                                                        {STEPS[activeStep].features[activeFeature].icon}
                                                    </span>
                                                    <span className="flex-1 leading-snug">
                                                        {STEPS[activeStep].features[activeFeature].text}
                                                    </span>
                                                    
                                                    {/* Circular indicator showing progress */}
                                                    <div className="flex gap-1 shrink-0 select-none">
                                                        {[0, 1, 2].map((idx) => (
                                                            <div 
                                                                key={idx} 
                                                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                                                    activeFeature === idx 
                                                                        ? "bg-emerald-500 scale-125 w-3" 
                                                                        : "bg-slate-200"
                                                                }`} 
                                                            />
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>

                                        {/* Primary conversion CTA on step 01 */}
                                        {activeStep === 0 && (
                                            <div className="pt-2 flex flex-col sm:flex-row gap-4">
                                                <Link
                                                    href="/contact"
                                                    className="btn-primary inline-flex justify-center items-center gap-2 text-center font-bold"
                                                >
                                                    Book Advisor Call
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right visual mockup column */}
                                    <div className="w-full flex items-center justify-center transition-transform duration-500 hover:scale-[1.01] hover:-translate-y-0.5">
                                        {(() => {
                                            const customImage = activeStep === 0 ? step1Image : activeStep === 1 ? step2Image : step3Image
                                            
                                            if (customImage) {
                                                return (
                                                    <div className="relative rounded-[28px] overflow-hidden border border-emerald-100 bg-white p-2 shadow-[0_12px_40px_-12px_rgba(0,179,134,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(0,179,134,0.12)] transition-all duration-500 aspect-video md:aspect-[4/3] w-full flex items-center justify-center">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img 
                                                            src={customImage} 
                                                            alt={STEPS[activeStep].title} 
                                                            className="w-full h-full object-cover rounded-2xl" 
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none rounded-2xl" />
                                                    </div>
                                                )
                                            }
                                            
                                            return STEPS[activeStep].visual
                                        })()}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
