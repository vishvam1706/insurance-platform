"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Clock, Ban, ShieldCheck, FileText, CheckCircle2 } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { policymineExperienceBlockData } from "@/types/blocks"

interface Props {
    data?: policymineExperienceBlockData
    waUrl: string
}

export default function policymineExperience({ data, waUrl }: Props) {
    const heading = data?.heading || "How We Work"
    const subheading = data?.subheading || "Simple, Transparent & Guided Process."
    const description = data?.description || "We have redesigned the entire buying journey to put you in control. No spam, no stress, just beautiful advisory support."
    const leftImage = data?.leftImage
    const step1Image = data?.step1Image
    const step2Image = data?.step2Image
    const step3Image = data?.step3Image

    const [activeStep, setActiveStep] = useState(0)
    const [activeFeature, setActiveFeature] = useState(0)

    useEffect(() => {
        setActiveFeature(0)
    }, [activeStep])

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((curr) => (curr + 1) % 3)
        }, 3000)
        return () => clearInterval(interval)
    }, [activeStep])

    const STEPS = [
        {
            num: "01",
            title: "Understanding Your Needs",
            body: "We analyze your financial goals, responsibilities, income, and existing coverage.",
            features: [
                { icon: <Clock className="w-4 h-4" />, text: "Thorough financial analysis" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Goal assessment" },
                { icon: <Ban className="w-4 h-4" />, text: "Zero spam guaranteed" },
            ],
            visual: (
                <div className="relative rounded-[24px] overflow-hidden border bg-white p-8 w-full text-center shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4 border border-orange-100">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Detailed Needs Analysis</h4>
                    <p className="text-sm text-slate-500">We carefully evaluate your current situation to find the perfect fit.</p>
                </div>
            )
        },
        {
            num: "02",
            title: "Plan Comparison & Shortlisting",
            body: "Our advisors compare suitable plans from trusted insurers based on your requirements.",
            features: [
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Unbiased comparisons" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Top insurers selected" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Customized shortlisting" },
            ],
            visual: (
                <div className="relative rounded-[24px] overflow-hidden border bg-white p-8 w-full text-center shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4 border border-orange-100">
                        <FileText className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Smart Plan Comparison</h4>
                    <p className="text-sm text-slate-500">Side-by-side evaluation of the best insurance policies available.</p>
                </div>
            )
        },
        {
            num: "03",
            title: "Clear & Simple Explanation",
            body: "We explain benefits, exclusions, premiums, and claim processes in easy-to-understand language.",
            features: [
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Jargon-free details" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Transparent exclusions" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Clear premium breakdowns" },
            ],
            visual: (
                <div className="relative rounded-[24px] overflow-hidden border bg-white p-8 w-full text-center shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4 border border-orange-100">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Absolute Clarity</h4>
                    <p className="text-sm text-slate-500">Know exactly what you're buying without any hidden surprises.</p>
                </div>
            )
        },
        {
            num: "04",
            title: "Documentation & Processing",
            body: "Complete support for forms, medicals, verification, and policy issuance.",
            features: [
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Form assistance" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Medical check scheduling" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Fast issuance" },
            ],
            visual: (
                <div className="relative rounded-[24px] overflow-hidden border bg-white p-8 w-full text-center shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4 border border-orange-100">
                        <FileText className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Seamless Processing</h4>
                    <p className="text-sm text-slate-500">We handle the paperwork and coordinate directly with insurers.</p>
                </div>
            )
        },
        {
            num: "05",
            title: "Ongoing Support & Claim Assistance",
            body: "We stay connected even after policy issuance and assist whenever support is needed.",
            features: [
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Lifetime assistance" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Priority claim support" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Renewal reminders" },
            ],
            visual: (
                <div className="relative rounded-[24px] overflow-hidden border bg-white p-8 w-full text-center shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4 border border-orange-100">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">100% Claim Support</h4>
                    <p className="text-sm text-slate-500">We manage your claim settlement end-to-end when you need it most.</p>
                </div>
            )
        }
    ]

    return (
        <>
            <section className="relative py-20 sm:py-28 lg:py-32 overflow-x-clip" style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 100%)" }}>
                {/* Subtle orb glows */}
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)" }} />
                <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.03) 0%, transparent 70%)" }} />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    
                    {/* Centered Heading Proper */}
                    <div className="text-center mb-12 sm:mb-16">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 select-none" style={{ background: "#FFF7ED", color: "#EA580C", border: "1px solid #FFEDD5" }}>
                            {heading}
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-slate-900 tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {subheading.replace(/\.$/, "")}
                            <span style={{ color: "#F97316" }}>.</span>
                        </h2>
                        <p className="text-sm sm:text-base max-w-xl mx-auto text-slate-500 mt-4 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Premium Background Box Behind Grid */}
                    <div className="rounded-[32px] bg-white p-6 sm:p-10 lg:p-12 border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
                        <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-stretch">

                            {/* LEFT Sticky Step Selectors */}
                            <div className="h-fit lg:sticky lg:top-28">
                                <div className="rounded-2xl p-5 sm:p-6 bg-slate-50 text-left" style={{ border: "1px solid #F1F5F9" }}>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Journey Steps</p>

                                    {/* Step indicators on left */}
                                    <div className="flex flex-col gap-3">
                                        {STEPS.map((step, idx) => (
                                            <button
                                                key={step.num}
                                                onClick={() => setActiveStep(idx)}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer w-full"
                                                style={{
                                                    background: activeStep === idx ? "#FFF7ED" : "transparent",
                                                    border: `1px solid ${activeStep === idx ? "#FFEDD5" : "transparent"}`,
                                                }}
                                            >
                                                <span
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-all"
                                                    style={{
                                                        background: activeStep === idx ? "#F97316" : "#E2E8F0",
                                                        color: activeStep === idx ? "#fff" : "#64748B",
                                                    }}
                                                >
                                                    {step.num}
                                                </span>
                                                <span className="text-sm font-bold transition-colors" style={{ color: activeStep === idx ? "#0F172A" : "#64748B" }}>
                                                    {step.title}
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Image */}
                                    {leftImage && (
                                        <div className="mt-6 rounded-2xl overflow-hidden border bg-white" style={{ borderColor: "#F1F5F9" }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={leftImage} alt="Buying Journey" className="w-full h-auto object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT Animated Content */}
                            <div className="flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeStep}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        className="grid md:grid-cols-2 gap-8 sm:gap-10 items-start"
                                    >
                                        {/* Text column */}
                                        <div className="space-y-5 text-left">
                                            {/* Step badge */}
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest select-none" style={{ background: "#FFF7ED", color: "#EA580C", border: "1px solid #FFEDD5" }}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                                Step {STEPS[activeStep].num}
                                            </div>

                                            <h3
                                                className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
                                                style={{ fontFamily: "var(--font-heading)" }}
                                            >
                                                {STEPS[activeStep].title}
                                            </h3>
                                            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                                                {STEPS[activeStep].body}
                                            </p>

                                            {/* Animated feature cycling */}
                                            <div className="relative rounded-2xl p-4 sm:p-5 min-h-[64px] flex items-center overflow-hidden" style={{ border: "1px solid #F1F5F9", background: "#FFFFFF" }}>
                                                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: "linear-gradient(to bottom, #F97316, #FBBF24)" }} />

                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={activeFeature}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-800 w-full pl-3"
                                                    >
                                                        <span className="shrink-0 p-1.5 rounded-lg" style={{ background: "#FFF7ED", color: "#EA580C" }}>
                                                            {STEPS[activeStep].features[activeFeature].icon}
                                                        </span>
                                                        <span className="flex-1 leading-snug">
                                                            {STEPS[activeStep].features[activeFeature].text}
                                                        </span>
                                                        <div className="flex gap-1 shrink-0">
                                                            {[0, 1, 2].map((idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="h-1.5 rounded-full transition-all duration-300"
                                                                    style={{
                                                                        width: activeFeature === idx ? 16 : 6,
                                                                        background: activeFeature === idx ? "#F97316" : "#E2E8F0",
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>

                                            {/* CTA on first step */}
                                            {activeStep === 0 && (
                                                <Link href="/contact" className="btn-primary inline-flex">
                                                    Book Advisor Call
                                                </Link>
                                            )}
                                        </div>

                                        {/* Visual mockup column */}
                                        <div className="w-full flex items-start justify-center">
                                            {(() => {
                                                const customImage = activeStep === 0 ? step1Image : activeStep === 1 ? step2Image : step3Image
                                                if (customImage) {
                                                    return (
                                                        <div className="relative rounded-[24px] overflow-hidden border w-full aspect-[4/3]" style={{ borderColor: "#F1F5F9", boxShadow: "0 16px 48px rgba(15,23,42,0.05)" }}>
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img src={customImage} alt={STEPS[activeStep].title} className="w-full h-full object-cover" />
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
            <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, #E2E8F0 50%, transparent)" }} />
        </>
    )
}
