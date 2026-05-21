"use client"

import { CheckCircle2, X, Sparkles, FileText, ShieldAlert, Zap, Users, AlertTriangle, HelpCircle, FileCheck, ArrowRight, Ban } from "lucide-react"
import { motion } from "framer-motion"
import { ComparisonSectionBlockData } from "@/types/blocks"

interface Props {
    data?: ComparisonSectionBlockData
}

interface PmPartnersPoint {
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
    pmpartnersPoints: PmPartnersPoint[]
    otherPoints: OtherPoint[]
}

const ICON_MAP: Record<string, React.ReactNode> = {
    FileText: <FileText className="w-4.5 h-4.5 text-emerald-600" />,
    ShieldAlert: <ShieldAlert className="w-4.5 h-4.5 text-amber-500 animate-bounce" style={{ animationDuration: "3s" }} />,
    Zap: <Zap className="w-4.5 h-4.5 text-emerald-500 animate-pulse" />,
    Users: <Users className="w-4.5 h-4.5 text-teal-600" />,
    CheckCircle2: <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />,
    AlertTriangle: <AlertTriangle className="w-4.5 h-4.5 text-amber-500" />,
    FileCheck: <FileCheck className="w-4.5 h-4.5 text-emerald-600" />,
    ArrowRight: <ArrowRight className="w-4.5 h-4.5 text-emerald-600" />,
}

const DEFAULT_ROWS: RowItem[] = [
    {
        category: "Application & Payment",
        subtitle: "The most critical step — ensuring your health details and declarations are 100% accurate.",
        pmpartnersPoints: [
            { text: "Expert assistance with your application forms", showAvatars: true },
            { text: "Clear do's and don'ts for declarations and policies", icon: "FileText" },
            { text: "Help you avoid common mistakes & omissions", icon: "ShieldAlert" },
        ],
        otherPoints: [
            { text: "No guidance provided during application" },
            { text: "Application mistakes go undetected and cause issues later" },
            { text: "Incorrect declarations disrupt the claims settlement" },
        ]
    },
    {
        category: "Expert Guidance",
        subtitle: "Navigating through hundred-page policy clauses without pushy sales agents.",
        pmpartnersPoints: [
            { text: "Certified advisory team — never pushy salesmen", showAvatars: true },
            { text: "Get 2-3 handpicked recommendations tailored to you", icon: "Zap" },
        ],
        otherPoints: [
            { text: "Talk to agents earning high commission targets on every sale" },
            { text: "Policies recommended based on insurer payout incentives" },
        ]
    },
    {
        category: "Dedicated Claim Support",
        subtitle: "Standing firmly by your family's side when it matters the most.",
        pmpartnersPoints: [
            { text: "Dedicated claims department coordinating everything", icon: "Users" },
            { text: "100% fast-track assistance and document checks", icon: "CheckCircle2" },
        ],
        otherPoints: [
            { text: "Zero support post-payment; you are left entirely on your own" },
            { text: "Run pillar to post trying to coordinate with insurance companies" },
        ]
    }
]

const sectionHeaderVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
} as const

const rowVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
} as const

export default function ComparisonSection({ data }: Props) {
    const title = data?.title || "Insurance Buying Experience."
    const subtitle = data?.subtitle || "What customers experience throughout their insurance journey with PM Partners versus other platforms."
    const pmpartnersAvatar1 = data?.pmpartnersAvatar1 || "/uploads/faq_advisor_1779259711736.png"
    const pmpartnersAvatar2 = data?.pmpartnersAvatar2 || "/uploads/contact_trust.png"
    const otherAvatar1 = data?.otherAvatar1 || "/uploads/contact_trust.png"
    const otherAvatar2 = data?.otherAvatar2 || ""

    const rows = data?.rows && data.rows.length > 0 ? data.rows : DEFAULT_ROWS

    return (
        <section className="py-16 sm:py-20 border-b border-emerald-100 bg-slate-50/20 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Section Header Grid - perfectly matching the layout columns */}
                <motion.div 
                    variants={sectionHeaderVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid lg:grid-cols-[1.2fr_1fr_1fr] gap-6 lg:gap-8 items-end mb-10 sm:mb-12"
                >
                    <div className="text-left">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100 mb-4 select-none">
                            The Comparison
                        </span>
                        <h2
                            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-slate-900 tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {title.endsWith(".") ? (
                                <>
                                    {title.slice(0, -1)}
                                    <span className="italic font-normal text-emerald-600">.</span>
                                </>
                            ) : title}
                        </h2>
                        <p className="text-sm sm:text-base max-w-md leading-relaxed text-slate-500 mt-3">
                            {subtitle}
                        </p>
                    </div>

                    {/* Column Header: PM Partners (Desktop only, centered over PM Partners cards) */}
                    <div className="hidden lg:flex flex-col items-center pb-2 select-none">
                        <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100/60 px-4 py-1.5 rounded-full shadow-xs">
                            PM Partners
                        </span>
                        
                        {/* Overlapping profile avatars */}
                        <div className="flex -space-x-3.5 mt-3">
                            {pmpartnersAvatar1 ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={pmpartnersAvatar1} alt="PM Partners Advisor" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-emerald-50 border-2 border-white flex items-center justify-center font-extrabold text-xs text-emerald-700">D1</div>
                            )}
                            {pmpartnersAvatar2 ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={pmpartnersAvatar2} alt="PM Partners Advisor" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md relative z-10" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center font-extrabold text-xs text-emerald-800 relative z-10">D2</div>
                            )}
                        </div>
                    </div>

                    {/* Column Header: Other Platforms (Desktop only, centered over other cards) */}
                    <div className="hidden lg:flex flex-col items-center pb-2 select-none">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full">
                            Other Platforms
                        </span>

                        {/* Overlapping other avatars with grayscale/question-mark */}
                        <div className="flex -space-x-3.5 mt-3">
                            {otherAvatar1 ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={otherAvatar1} alt="Other platform agent" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm filter grayscale opacity-75" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center font-bold text-xs text-slate-400 filter grayscale">OA</div>
                            )}
                            {otherAvatar2 ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={otherAvatar2} alt="Other agent" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm filter grayscale opacity-75 relative z-10" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center font-extrabold text-slate-400 text-sm relative z-10 shadow-xs">
                                    ?
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Comparison Grid Rows */}
                <div className="space-y-8 sm:space-y-10">
                    {rows.map((row, idx) => (
                        <motion.div 
                            key={row.category}
                            variants={rowVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-120px" }}
                            className="grid lg:grid-cols-[1.2fr_1fr_1fr] gap-6 lg:gap-8 items-stretch border-b border-slate-100/50 pb-8 sm:pb-10 last:border-none last:pb-0"
                        >
                            {/* Left: Feature description */}
                            <div className="text-left flex flex-col justify-center pr-4">
                                <h3 
                                    className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {row.category}
                                </h3>
                                <p className="text-base leading-relaxed text-slate-500 mt-3 max-w-sm font-medium">
                                    {row.subtitle}
                                </p>
                            </div>

                            {/* Mobile Column Headers (Visible only on mobile/tablet) */}
                            <div className="lg:hidden flex items-center justify-between gap-4 mt-2 select-none">
                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                                    PM Partners Way
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                                    Others
                                </span>
                            </div>

                            {/* Middle: PM Partners card (White container with premium cell components) */}
                            <div className="w-full bg-white rounded-3xl border border-emerald-100/60 shadow-[0_12px_45px_-12px_rgba(0,179,134,0.06)] overflow-hidden flex flex-col h-full cursor-default">
                                <div className="divide-y divide-slate-100/70 h-full flex flex-col justify-between">
                                    {row.pmpartnersPoints.map((point, pIdx) => {
                                        // Case 1: Custom Avatar-based header layout inside PM Partners card cell
                                        if (point.showAvatars) {
                                            return (
                                                <div 
                                                    key={pIdx}
                                                    className="flex flex-col gap-3 py-5.5 px-6 text-center items-center justify-center flex-1 border-b last:border-b-0 border-slate-100/50"
                                                >
                                                    {/* Top row with avatars and floating document pen graphic */}
                                                    <div className="flex items-center gap-3 select-none">
                                                        {pmpartnersAvatar1 ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img src={pmpartnersAvatar1} alt="Advisor" className="w-8.5 h-8.5 rounded-full object-cover border-2 border-white shadow-md shrink-0" />
                                                        ) : (
                                                            <div className="w-8.5 h-8.5 rounded-full bg-emerald-50 border-2 border-white flex items-center justify-center font-bold text-[9px] text-emerald-700 shrink-0">D1</div>
                                                        )}
                                                        
                                                        {/* Styled floating Document + Pen graphic */}
                                                        <div className="flex items-center justify-center bg-emerald-50 border border-emerald-100/40 rounded-2xl py-1.5 px-3.5 shadow-xs relative">
                                                            <svg className="w-4.5 h-4.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                                                                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                                            </svg>
                                                            <svg className="w-4 h-4 text-amber-500 absolute -top-1 -right-1.5 drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                                            </svg>
                                                        </div>

                                                        {pmpartnersAvatar2 ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img src={pmpartnersAvatar2} alt="Advisor" className="w-8.5 h-8.5 rounded-full object-cover border-2 border-white shadow-md relative z-10 shrink-0" />
                                                        ) : (
                                                            <div className="w-8.5 h-8.5 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center font-bold text-[9px] text-emerald-800 relative z-10 shrink-0">D2</div>
                                                        )}
                                                    </div>

                                                    <span className="text-base sm:text-[17px] font-medium text-slate-800 leading-snug tracking-tight text-center max-w-[260px]">
                                                        {point.text}
                                                    </span>
                                                </div>
                                            )
                                        }

                                        // Case 2: Clipboard Checklist visual layout (e.g., clear do's and don'ts)
                                        if (point.icon === "FileText" || point.icon === "FileCheck") {
                                            return (
                                                <div 
                                                    key={pIdx}
                                                    className="flex items-center gap-4 py-5.5 px-6 text-left flex-1 border-b last:border-b-0 border-slate-100/50"
                                                >
                                                    <div className="w-10.5 h-10.5 shrink-0 rounded-2xl bg-emerald-50/60 border border-emerald-100/60 flex items-center justify-center shadow-xs">
                                                        <svg className="w-5.5 h-5.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                                                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                                            <path d="m9 14 2 2 4-4" />
                                                        </svg>
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <span className="text-base sm:text-[17px] font-medium text-slate-800 leading-snug tracking-tight">
                                                            {point.text}
                                                        </span>
                                                    </div>

                                                    <span className="text-emerald-500 shrink-0">
                                                        <CheckCircle2 className="w-4.5 h-4.5" />
                                                    </span>
                                                </div>
                                            )
                                        }

                                        // Case 3: Sieve/Net Graphic on the right (e.g. avoid common mistakes)
                                        if (point.icon === "ShieldAlert" || point.icon === "AlertTriangle") {
                                            return (
                                                <div 
                                                    key={pIdx}
                                                    className="flex items-center justify-between gap-4 py-5.5 px-6 text-left flex-1 border-b last:border-b-0 border-slate-100/50"
                                                >
                                                    <div className="flex-1 min-w-0 pr-2">
                                                        <span className="text-base sm:text-[17px] font-medium text-slate-800 leading-snug tracking-tight">
                                                            {point.text}
                                                        </span>
                                                    </div>

                                                    <div className="w-10.5 h-10.5 shrink-0 rounded-2xl bg-amber-50/40 border border-amber-100/50 flex items-center justify-center shadow-xs">
                                                        <svg className="w-5.5 h-5.5 text-amber-600/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                            <circle cx="12" cy="12" r="9" stroke="currentColor" />
                                                            <path d="M3 12h18" stroke="currentColor" strokeDasharray="1.5 1.5" />
                                                            <path d="M12 3v18" stroke="currentColor" strokeDasharray="1.5 1.5" />
                                                            <path d="M5.5 5.5l13 13" stroke="currentColor" strokeDasharray="1.5 1.5" />
                                                            <path d="M18.5 5.5l-13 13" stroke="currentColor" strokeDasharray="1.5 1.5" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        // Case 4: Custom Image point
                                        if (point.image) {
                                            return (
                                                <div 
                                                    key={pIdx}
                                                    className="flex items-center gap-4 py-5.5 px-6 text-left flex-1 border-b last:border-b-0 border-slate-100/50"
                                                >
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={point.image} alt="Detail graphic" className="w-10.5 h-10.5 rounded-xl object-cover border border-slate-100 shrink-0 shadow-xs" />
                                                    
                                                    <div className="flex-1 min-w-0">
                                                        <span className="text-base sm:text-[17px] font-medium text-slate-800 leading-snug tracking-tight">
                                                            {point.text}
                                                        </span>
                                                    </div>

                                                    <span className="text-emerald-500 shrink-0">
                                                        <CheckCircle2 className="w-4.5 h-4.5" />
                                                    </span>
                                                </div>
                                            )
                                        }

                                        // Fallback default beautiful benefit point
                                        const displayIcon = point.icon && ICON_MAP[point.icon] ? (
                                            ICON_MAP[point.icon]
                                        ) : (
                                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                                        )

                                        return (
                                            <div 
                                                key={pIdx}
                                                className="flex items-center justify-between gap-4 py-5.5 px-6 text-left flex-1 border-b last:border-b-0 border-slate-100/50"
                                            >
                                                <div className="flex items-center gap-3.5 min-w-0">
                                                    <div className="w-8.5 h-8.5 rounded-xl bg-emerald-50/60 border border-emerald-100/50 flex items-center justify-center shrink-0 shadow-xs">
                                                        {displayIcon}
                                                    </div>
                                                    <span className="text-base sm:text-[17px] font-medium text-slate-800 leading-snug tracking-tight">
                                                        {point.text}
                                                    </span>
                                                </div>
                                                <span className="text-emerald-500 shrink-0">
                                                    <CheckCircle2 className="w-4.5 h-4.5" />
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Right: Other Platforms card (Light-grey container with cancel visuals) */}
                            <div className="w-full bg-slate-50 border border-slate-200/60 rounded-3xl p-6.5 text-left flex flex-col justify-between h-full shadow-[0_4px_24px_rgba(0,0,0,0.01)] cursor-default">
                                {/* Top Red X visual */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-7 h-7 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 font-extrabold text-[10px] select-none shadow-xs shadow-red-100/50">
                                        ✕
                                    </div>
                                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 select-none">Unassisted</span>
                                </div>

                                {/* List of plain negative points */}
                                <div className="space-y-4 flex-1 py-1">
                                    {row.otherPoints.map((point, pIdx) => (
                                        <div 
                                            key={pIdx} 
                                            className="flex gap-2.5 items-start"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-1.5" />
                                            <p className="text-base text-slate-600 font-medium leading-relaxed">
                                                {point.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom grayed visual pipeline showing empty support flow */}
                                <div className="mt-6 border-t border-slate-200/60 pt-4 flex items-center justify-between select-none">
                                    <div className="flex items-center gap-3.5">
                                        {otherAvatar1 ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={otherAvatar1} alt="Unassisted flow" className="w-6.5 h-6.5 rounded-full object-cover border border-slate-200 filter grayscale opacity-60" />
                                        ) : (
                                            <div className="w-6.5 h-6.5 rounded-full bg-slate-200 border border-slate-300" />
                                        )}
                                        <span className="text-[10px] text-slate-300 font-mono tracking-widest animate-pulse">. . . . . .</span>
                                        <div className="w-5.5 h-5.5 rounded-full bg-red-500/10 border border-red-200/50 flex items-center justify-center text-[8px] text-red-500 font-bold font-sans shadow-xs">
                                            ✕
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">No Support</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
