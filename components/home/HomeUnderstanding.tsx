"use client"

import { useState } from "react"
import { HomeUnderstandingBlockData } from "@/types/blocks"
import { BookOpen, Target, Sparkles, ShieldAlert, Sparkle, CheckCircle, ShieldCheck, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const UNDERSTANDING_ICONS = [
    <BookOpen className="w-5 h-5" key="0" />,
    <Target className="w-5 h-5" key="1" />,
    <Sparkles className="w-5 h-5" key="2" />
]

export default function HomeUnderstanding({ data }: { data: HomeUnderstandingBlockData }) {
    const items = data.items || []
    const [activeTab, setActiveTab] = useState(0)

    return (
        <section className="relative overflow-x-clip bg-orange-500 py-16 sm:py-24">

            {/* Subtle depth blobs */}
            <div className="absolute top-0 right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none blur-[160px] opacity-20 bg-orange-300" />
            <div className="absolute bottom-0 left-[5%] w-[300px] h-[300px] rounded-full pointer-events-none blur-[130px] opacity-15 bg-amber-700" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

                {/* ── Header ── */}
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-slate-900/20 border border-slate-900/15">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Clarity First</span>
                    </div>

                    {data.title && (
                        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold !text-white tracking-tight leading-[1.08] mb-4">
                            {data.title}
                        </h2>
                    )}
                    {data.subtitle && (
                        <p className="text-orange-100 font-medium text-sm sm:text-[15px] leading-relaxed max-w-xl">
                            {data.subtitle}
                        </p>
                    )}
                </div>

                {/* ── Main Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-6 lg:gap-10 items-stretch">

                    {/* ── Left: Tab Selectors (Timeline Stepper) ── */}
                    <div className="pl-8 sm:pl-10 flex flex-col justify-center">
                        <div className="relative space-y-6">
                            {/* The vertical timeline line */}
                            <div 
                                className="absolute left-[-16px] sm:left-[-22px] w-0.5 bg-white/20 pointer-events-none" 
                                style={{ top: "18px", bottom: "18px" }} 
                            />

                            {items.map((item, idx) => {
                                const icon = UNDERSTANDING_ICONS[idx % UNDERSTANDING_ICONS.length]
                                const isActive = activeTab === idx

                                return (
                                    <div key={idx} className="relative w-full flex items-start">
                                        {/* Timeline dot badge */}
                                        <button
                                            onClick={() => setActiveTab(idx)}
                                            className={`absolute -left-8 sm:-left-10 top-1 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-black text-[11px] sm:text-xs transition-all duration-300 cursor-pointer border-2 z-10
                                                ${isActive
                                                    ? "bg-white text-orange-500 border-white shadow-lg shadow-black/10 scale-110"
                                                    : "bg-orange-600/40 border-white/20 text-orange-100 hover:border-white/50 hover:bg-orange-600/80 hover:text-white"
                                                }`}
                                        >
                                            0{idx + 1}
                                        </button>

                                        {/* Content Card / Title */}
                                        <button
                                            onClick={() => setActiveTab(idx)}
                                            className={`w-full group text-left transition-all duration-500 rounded-2xl cursor-pointer flex gap-4 items-start overflow-hidden
                                                ${isActive 
                                                    ? "bg-white p-5 sm:p-6 border border-white shadow-2xl shadow-black/20" 
                                                    : "pl-2 py-2 hover:translate-x-1"
                                                }`}
                                        >
                                            {/* Icon shown inside active card */}
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center bg-orange-50 border border-orange-100 text-orange-500"
                                                    >
                                                        {icon}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <div className="flex-1 space-y-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h3 className={`text-[15px] sm:text-base font-extrabold tracking-tight leading-tight transition-colors duration-300
                                                        ${isActive ? "!text-slate-900" : "!text-orange-100 group-hover:!text-white"}`}>
                                                        {item.title}
                                                    </h3>
                                                    {isActive && (
                                                        <ArrowRight className="w-4 h-4 shrink-0 text-orange-500" />
                                                    )}
                                                </div>
                                                
                                                <AnimatePresence>
                                                    {isActive && (
                                                        <motion.p
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.25 }}
                                                            className="text-[12.5px] leading-relaxed font-semibold text-slate-500 mt-2 overflow-hidden"
                                                        >
                                                            {item.desc}
                                                        </motion.p>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* ── Right: Visual Sandbox ── */}
                    <div className="relative rounded-3xl bg-white border border-orange-200/50 overflow-hidden flex flex-col min-h-[360px] sm:min-h-[420px] shadow-2xl shadow-black/25">

                        {/* Top header bar — solid, no gradient */}
                        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Preview</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                                <span className="text-[9px] font-black text-orange-400 uppercase tracking-wider">
                                    {activeTab === 0 ? "Clause Translation" : activeTab === 1 ? "Objective Match" : "Claims Support"}
                                </span>
                            </div>
                        </div>

                        {/* Dot grid texture */}
                        <div
                            className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                        />

                        {/* Tab Content */}
                        <div className="flex-1 p-6 sm:p-7 relative z-10 flex flex-col justify-center">
                            <AnimatePresence mode="wait">

                                {/* ── Tab 0: Clause Translation ── */}
                                {activeTab === 0 && (
                                    <motion.div
                                        key="tab-0"
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -14 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="space-y-3"
                                    >
                                        {/* Bad */}
                                        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Traditional Broker Speak</p>
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-[9px] font-black text-slate-500 uppercase tracking-wide shrink-0 border border-slate-200">
                                                    <ShieldAlert className="w-2.5 h-2.5" /> Confusing
                                                </span>
                                            </div>
                                            <p className="text-[12px] text-slate-600 font-medium leading-relaxed opacity-60">
                                                &ldquo;Subject to terms of sub-limitation clause 14B under sub-section IV, liability is contingent on pre-existing manifestation triggers...&rdquo;
                                            </p>
                                        </div>

                                        {/* Connector */}
                                        <div className="flex justify-center items-center gap-1 py-0.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                                        </div>

                                        {/* Good */}
                                        <div className="p-4 rounded-2xl border border-orange-200 bg-orange-50">
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">The Policymine Way</p>
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-[9px] font-black text-orange-700 uppercase tracking-wide shrink-0 border border-orange-200">
                                                    <Sparkle className="w-2.5 h-2.5" /> Crystal Clear
                                                </span>
                                            </div>
                                            <p className="text-[13px] text-slate-800 font-extrabold leading-relaxed">
                                                &ldquo;If you had diabetes before buying, this policy covers diabetic claims up to ₹5L — after a 2-year waiting period.&rdquo;
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ── Tab 1: Objective Match ── */}
                                {activeTab === 1 && (
                                    <motion.div
                                        key="tab-1"
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -14 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-50 border border-orange-100">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">Advisor Model</p>
                                                <p className="text-[15px] font-black text-slate-900">100% Salaried Advisors</p>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-orange-100 text-[10px] font-black text-orange-700 uppercase tracking-wide border border-orange-200">
                                                Zero Bias
                                            </span>
                                        </div>

                                        <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                            {[
                                                { label: "Sales Target Pressure", value: 0, bar: "bg-slate-400", text: "text-slate-500", display: "0%" },
                                                { label: "Client Interest Alignment", value: 100, bar: "bg-orange-500", text: "text-orange-600", display: "100%" },
                                                { label: "Unbiased Plan Comparison", value: 95, bar: "bg-orange-500", text: "text-orange-600", display: "95%" },
                                            ].map((bar, i) => (
                                                <div key={i}>
                                                    <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1.5">
                                                        <span>{bar.label}</span>
                                                        <span className={`font-extrabold ${bar.text}`}>{bar.display}</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className={`h-full ${bar.bar} rounded-full`}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${bar.value}%` }}
                                                            transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <p className="text-[11.5px] text-slate-500 font-medium leading-relaxed italic px-1">
                                            &ldquo;We tell clients when NOT to buy insurance — even if it costs us the transaction.&rdquo;
                                        </p>
                                    </motion.div>
                                )}

                                {/* ── Tab 2: Claims Support ── */}
                                {activeTab === 2 && (
                                    <motion.div
                                        key="tab-2"
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -14 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="space-y-3"
                                    >
                                        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                                            {/* Chat header */}
                                            <div className="px-4 py-3 bg-slate-900 flex items-center justify-between">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="relative">
                                                        <div className="w-8 h-8 rounded-full bg-orange-500 border border-orange-400 flex items-center justify-center text-[10px] font-black text-white">
                                                            PM
                                                        </div>
                                                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-slate-900" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[12px] font-extrabold text-slate-100 leading-none">Policymine Support</p>
                                                        <p className="text-[9px] text-slate-400 font-bold mt-0.5">● Online · Lifetime Support</p>
                                                    </div>
                                                </div>
                                                <ShieldCheck className="w-4 h-4 text-slate-500" />
                                            </div>

                                            {/* Messages */}
                                            <div className="p-4 space-y-3 bg-slate-50">
                                                <motion.div
                                                    className="flex justify-end"
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    <div className="bg-orange-500 text-white px-3.5 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] text-[12px] font-semibold leading-relaxed shadow-sm">
                                                        My father is hospitalized and the insurer is raising a query on pre-existing symptoms... help?
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    className="flex justify-start"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <div className="bg-white border border-slate-200 text-slate-800 px-3.5 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%] text-[12px] font-semibold leading-relaxed shadow-sm">
                                                        Don&apos;t worry — we fetched the records and will directly appeal with the insurer on your behalf. Just rest. 🙏
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-green-50 border border-green-200"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.5 }}
                                                >
                                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                                    <span className="text-[11px] font-black text-green-700 uppercase tracking-wide">Claim Approved & Settled</span>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}