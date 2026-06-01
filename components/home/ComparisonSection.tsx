"use client"

import { CheckCircle2, X, FileText, ShieldAlert, Zap, Users, AlertTriangle, FileCheck, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { ComparisonSectionBlockData } from "@/types/blocks"

interface Props {
    data?: ComparisonSectionBlockData
}

interface policyminePoint {
    text: string
    icon?: string
    image?: string
    showAvatars?: boolean
}

interface OtherPoint {
    text: string
}

interface RowItem {
    category: string
    subtitle: string
    policyminePoints: policyminePoint[]
    otherPoints: OtherPoint[]
}

const ICON_MAP: Record<string, React.ReactNode> = {
    FileText: <FileText className="w-4 h-4 text-orange-500" />,
    ShieldAlert: <ShieldAlert className="w-4 h-4 text-amber-500" />,
    Zap: <Zap className="w-4 h-4 text-orange-500" />,
    Users: <Users className="w-4 h-4 text-orange-600" />,
    CheckCircle2: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    AlertTriangle: <AlertTriangle className="w-4 h-4 text-amber-500" />,
    FileCheck: <FileCheck className="w-4 h-4 text-orange-600" />,
    ArrowRight: <ArrowRight className="w-4 h-4 text-orange-600" />,
}

const DEFAULT_ROWS: RowItem[] = [
    {
        category: "Application & Payment",
        subtitle: "Ensuring your health details and declarations are 100% accurate — the most critical step.",
        policyminePoints: [
            { text: "Expert assistance with your application forms", showAvatars: true },
            { text: "Clear do's and don'ts for declarations", icon: "FileText" },
            { text: "Help you avoid common mistakes & omissions", icon: "ShieldAlert" },
        ],
        otherPoints: [
            { text: "No guidance provided during application" },
            { text: "Application mistakes go undetected" },
            { text: "Incorrect declarations disrupt claims" },
        ],
    },
    {
        category: "Expert Guidance",
        subtitle: "Navigating hundred-page policy clauses without pushy sales agents.",
        policyminePoints: [
            { text: "Certified advisory team — never pushy salesmen", showAvatars: true },
            { text: "2-3 handpicked recommendations tailored to you", icon: "Zap" },
        ],
        otherPoints: [
            { text: "Agents earning high commission targets" },
            { text: "Policies based on insurer payout incentives" },
        ],
    },
    {
        category: "Dedicated Claim Support",
        subtitle: "Standing firmly by your family's side when it matters the most.",
        policyminePoints: [
            { text: "Dedicated claims department coordinating everything", icon: "Users" },
            { text: "100% fast-track assistance and document checks", icon: "CheckCircle2" },
        ],
        otherPoints: [
            { text: "Zero support post-payment" },
            { text: "Run pillar to post coordinating with insurers" },
        ],
    },
]

export default function ComparisonSection({ data }: Props) {
    const title = data?.title || "Insurance Buying Experience."
    const subtitle = data?.subtitle || "What customers experience with Policymine versus other platforms."
    const policymineAvatar1 = data?.policymineAvatar1 || "/uploads/faq_advisor_1779259711736.png"
    const policymineAvatar2 = data?.policymineAvatar2 || "/uploads/contact_trust.png"

    const rows = data?.rows && data.rows.length > 0 ? data.rows : DEFAULT_ROWS

    return (
        <>
            <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "#FFFFFF" }}>
                {/* Subtle ambient glow */}
                <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.03) 0%, transparent 65%)" }} />

                <div className="max-w-6xl mx-auto px-6 relative z-10">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        className="text-left mb-14"
                    >
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-5 select-none" style={{ background: "#FFF7ED", color: "#EA580C", border: "1px solid #FFEDD5" }}>
                            The Comparison
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-slate-900 tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {title.replace(/\.$/, "")}
                            <span style={{ color: "#F97316" }}>.</span>
                        </h2>
                        <p className="text-sm sm:text-base max-w-xl text-slate-500 mt-3">
                            {subtitle}
                        </p>
                    </motion.div>

                    {/* Column Header Labels */}
                    <div className="hidden lg:grid lg:grid-cols-[1.1fr_1fr_1fr] gap-6 mb-6 px-2">
                        <div />
                        <div className="flex items-center gap-3 justify-center">
                            <div className="flex -space-x-2.5">
                                {policymineAvatar1 && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={policymineAvatar1} alt="Advisor" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-md" />
                                )}
                                {policymineAvatar2 && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={policymineAvatar2} alt="Advisor" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-md relative z-10" />
                                )}
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full" style={{ color: "#EA580C", background: "#FFF7ED", border: "1px solid #FFEDD5" }}>Policymine</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-slate-400" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>Other Platforms</span>
                        </div>
                    </div>

                    {/* Rows */}
                    <div className="space-y-6">
                        {rows.map((row, idx) => (
                            <motion.div
                                key={row.category}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className="grid lg:grid-cols-[1.1fr_1fr_1fr] gap-6 items-stretch"
                            >
                                {/* Category label */}
                                <div className="flex flex-col justify-center text-left pr-4">
                                    <h3
                                        className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {row.category}
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-sm">
                                        {row.subtitle}
                                    </p>
                                </div>

                                {/* Mobile column labels */}
                                <div className="lg:hidden flex items-center justify-between gap-4 mt-2 select-none">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full" style={{ color: "#EA580C", background: "#FFF7ED" }}>Policymine</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-1 rounded-full bg-slate-50">Others</span>
                                </div>

                                {/* Policymine Card */}
                                <div className="rounded-2xl overflow-hidden bg-white h-full" style={{ border: "1px solid #FFEDD5", boxShadow: "0 8px 32px rgba(249,115,22,0.04)" }}>
                                    <div className="divide-y" style={{ borderColor: "#FFF7ED" }}>
                                        {row.policyminePoints.map((point, pIdx) => {
                                            const displayIcon = point.icon && ICON_MAP[point.icon] ? ICON_MAP[point.icon] : <CheckCircle2 className="w-4 h-4 text-emerald-500" />

                                            if (point.showAvatars) {
                                                return (
                                                    <div key={pIdx} className="flex items-center gap-3.5 py-4 px-5">
                                                        <div className="flex -space-x-2 shrink-0 select-none">
                                                            {policymineAvatar1 && (
                                                                // eslint-disable-next-line @next/next/no-img-element
                                                                <img src={policymineAvatar1} alt="Advisor" className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-sm" />
                                                            )}
                                                            {policymineAvatar2 && (
                                                                // eslint-disable-next-line @next/next/no-img-element
                                                                <img src={policymineAvatar2} alt="Advisor" className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-md relative z-10" />
                                                            )}
                                                        </div>
                                                        <span className="text-sm font-semibold text-slate-800 leading-snug">{point.text}</span>
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-auto" />
                                                    </div>
                                                )
                                            }

                                            if (point.image) {
                                                return (
                                                    <div key={pIdx} className="flex items-center gap-3.5 py-4 px-5">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={point.image} alt="" className="w-8 h-8 rounded-lg object-cover border shrink-0" style={{ borderColor: "#F1F5F9" }} />
                                                        <span className="text-sm font-semibold text-slate-800 leading-snug flex-1">{point.text}</span>
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    </div>
                                                )
                                            }

                                            return (
                                                <div key={pIdx} className="flex items-center gap-3.5 py-4 px-5">
                                                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#FFF7ED", border: "1px solid #FFEDD5" }}>
                                                        {displayIcon}
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-800 leading-snug flex-1">{point.text}</span>
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Other Platforms Card */}
                                <div className="rounded-2xl overflow-hidden h-full flex flex-col" style={{ background: "#FAFAFA", border: "1px solid #E2E8F0" }}>
                                    {/* Muted header */}
                                    <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid #E2E8F0" }}>
                                        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
                                            <X className="w-3 h-3 text-red-400" />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Unassisted</span>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center px-5 py-4 space-y-3">
                                        {row.otherPoints.map((point, pIdx) => (
                                            <div key={pIdx} className="flex gap-2.5 items-start">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-1.5" />
                                                <p className="text-sm text-slate-500 leading-relaxed">{point.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Bottom pipeline indicator */}
                                    <div className="px-5 py-3 flex items-center justify-between select-none" style={{ borderTop: "1px solid #E2E8F0" }}>
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-slate-200" />
                                            <span className="text-[10px] text-slate-300 font-mono tracking-widest">···</span>
                                            <div className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold" style={{ background: "#FEF2F2", color: "#EF4444", border: "1px solid #FECACA" }}>✕</div>
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">No Support</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, #E2E8F0 50%, transparent)" }} />
        </>
    )
}
