"use client"

import Link from "next/link"
import { CalendarDays, MessageCircle, Phone } from "lucide-react"
import { motion } from "framer-motion"

export interface HeroStepImage {
    label: string
    image: string
}

export interface HeroData {
    headlineLine1: string
    headlineLine2: string
    subtitle: string
    heroImage: string
    stepImages?: HeroStepImage[]
    ctaText: string
    ctaLink: string
    secondaryCtaText: string
    secondaryCtaLink: string
    phoneNumbers: string[]
    backgroundGradient: {
        from: string
        to: string
    }
}

interface Props {
    heroData?: HeroData | null
    waUrl: string
}

const DEFAULT_STEPS: HeroStepImage[] = [
    { label: "Retirement", image: "/uploads/step_elderly.png" },
    { label: "Family", image: "/uploads/step_family.png" },
    { label: "Career", image: "/uploads/step_young_adult.png" },
    { label: "Education", image: "/uploads/step_teenager.png" },
    { label: "Childhood", image: "/uploads/step_child.png" },
]

const DEFAULT_HERO: HeroData = {
    headlineLine1: "EVERY AGE",
    headlineLine2: "HAS A RISK",
    subtitle: "Every stage needs an insurance plan",
    heroImage: "/uploads/hero_staircase.png",
    stepImages: DEFAULT_STEPS,
    ctaText: "Book a Free Consultation",
    ctaLink: "/contact",
    secondaryCtaText: "Get WhatsApp Support",
    secondaryCtaLink: "",
    phoneNumbers: [],
    backgroundGradient: { from: "#FFFFFF", to: "#FFFFFF" },
}

// Step block heights (px) — tallest left, shortest right
// Increased proportionally to fill the extra vertical space (130vh vs 100vh)
const STEP_HEIGHT_PX = [260, 202, 150, 102, 60] as const
// Person image heights scale with their step
const PERSON_HEIGHT_PX = [220, 192, 166, 143, 114] as const

export default function HomeHero({ heroData, waUrl }: Props) {
    const data = heroData ?? DEFAULT_HERO
    const secondaryLink = data.secondaryCtaLink || waUrl
    const steps = data.stepImages && data.stepImages.length > 0 ? data.stepImages : DEFAULT_STEPS

    const orderMap: Record<string, number> = {
        "childhood": 0,
        "education": 1,
        "career": 2,
        "family": 3,
        "retirement": 4
    }

    const sortedSteps = [...steps].sort((a, b) => {
        const orderA = orderMap[a.label.toLowerCase()] ?? 0
        const orderB = orderMap[b.label.toLowerCase()] ?? 0
        return orderA - orderB
    })

    // Total height of staircase zone = tallest step + tallest person + small gap
    const staircaseH = STEP_HEIGHT_PX[0] + PERSON_HEIGHT_PX[0] + 16

    return (
        <section
            className="relative overflow-hidden flex flex-col min-h-[calc(100vh-68px)] lg:min-h-0 lg:h-[calc(100vh-68px)] bg-[radial-gradient(120%_120%_at_50%_0%,#F0F9FF_0%,#FAF5FF_50%,#FFFFFF_100%)] pb-4 lg:pb-0"
        >
            {/* Modern decorative background elements */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/uploads/hero_bg.png"
                alt="Background Design"
                className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none z-0"
            />
            <div className="absolute inset-0 pointer-events-none opacity-40" style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, #CBD5E1 1.5px, transparent 0)",
                backgroundSize: "24px 24px"
            }} />
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-300/20 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: "12s" }} />
            <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-purple-200/25 blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: "16s" }} />
            <div className="absolute bottom-[30%] left-[20%] w-[350px] h-[350px] rounded-full bg-orange-100/30 blur-[90px] pointer-events-none animate-pulse" style={{ animationDuration: "10s" }} />
            {/* ══════════════════════════════════════════
                TOP — Centered text block
            ══════════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto w-full px-6 pt-12 pb-2 flex justify-center lg:justify-start relative z-30 flex-shrink-0">
                <div className="max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">

                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.01 }}
                        className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4 bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    >
                        ★ Trust & Protection
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
                        className="font-black uppercase leading-[0.92] tracking-tight text-[clamp(2.4rem,6.5vw,4.6rem)] text-[#1565C0] font-[family:var(--font-heading)]"
                    >
                        {data.headlineLine1}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">{data.headlineLine2}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
                        className="mt-4 text-base sm:text-xl font-medium leading-snug text-[#334155] font-[family:var(--font-body)]"
                    >
                        {data.subtitle}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut", delay: 0.28 }}
                        className="flex justify-center lg:justify-start mt-4 w-full"
                    >
                        <Link
                            href={data.ctaLink || "/contact"}
                            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-[15px] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bg-[#F97316] hover:bg-[#EA580C] text-white shadow-[0_4px_18px_rgba(249,115,22,0.32)] hover:shadow-[0_6px_24px_rgba(249,115,22,0.42)]"
                        >
                            <CalendarDays className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                            {data.ctaText || "Book a Free Consultation"}
                        </Link>
                    </motion.div>

                    {/* Phone Numbers */}
                    {data.phoneNumbers && data.phoneNumbers.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            className="flex flex-wrap gap-4 mt-5 justify-center lg:justify-start w-full"
                        >
                            {data.phoneNumbers.map((phone, idx) => (
                                <a
                                    key={idx}
                                    href={`tel:${phone.replace(/\s/g, "")}`}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700 transition-colors duration-200"
                                >
                                    <Phone className="w-3.5 h-3.5" />
                                    {phone}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* ══════════════════════════════════════════
                BOTTOM — Full-width staircase (responsive scrollable stairs)
                flex-1 so it fills remaining space
            ══════════════════════════════════════════ */}
            <div className="relative mt-auto lg:absolute lg:bottom-0 lg:left-0 w-full overflow-hidden z-10 pointer-events-none pb-4 lg:pb-0">
                <motion.div
                    className="flex items-end w-full h-[240px] lg:h-[496px] overflow-x-auto lg:overflow-x-hidden gap-4 lg:gap-0 px-6 lg:px-0 scrollbar-none snap-x lg:snap-none pointer-events-auto"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
                    }}
                >
                    {sortedSteps.map((step, idx) => {
                        const stepIdx = sortedSteps.length - 1 - idx
                        const stepHDesktop = [260, 202, 150, 102, 60][stepIdx] ?? 60
                        const stepHMobile = [110, 85, 64, 46, 30][stepIdx] ?? 30
                        
                        const personHDesktop = [220, 192, 166, 143, 114][stepIdx] ?? 114
                        const personHMobile = [96, 84, 72, 61, 49][stepIdx] ?? 49

                        return (
                            <motion.div
                                key={idx}
                                className="relative flex-shrink-0 lg:flex-shrink w-[130px] sm:w-[150px] lg:w-auto lg:flex-1 flex flex-col items-center justify-end group snap-center pointer-events-auto"
                                style={{
                                    height: "100%",
                                    // Pass heights as CSS custom properties for clean responsive scaling in Tailwind
                                    "--step-h-desktop": `${stepHDesktop}px`,
                                    "--step-h-mobile": `${stepHMobile}px`,
                                    "--person-h-desktop": `${personHDesktop}px`,
                                    "--person-h-mobile": `${personHMobile}px`,
                                } as React.CSSProperties}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: {
                                        opacity: 1, y: 0,
                                        transition: { type: "spring", stiffness: 85, damping: 15 },
                                    },
                                }}
                            >
                                {/* Person image — anchored to top of step */}
                                {step.image && (
                                    <div
                                        className="absolute flex items-end justify-center w-full z-10 transition-transform duration-300 group-hover:-translate-y-2 h-[var(--person-h-mobile)] lg:h-[var(--person-h-desktop)] bottom-[var(--step-h-mobile)] lg:bottom-[var(--step-h-desktop)]"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={step.image}
                                            alt={step.label}
                                            className="w-auto object-contain object-bottom transition-transform duration-300 group-hover:scale-105 max-h-[var(--person-h-mobile)] lg:max-h-[var(--person-h-desktop)]"
                                            style={{
                                                filter: "url(#remove-white-bg) drop-shadow(0 8px 18px rgba(0,0,0,0.16))",
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Step block */}
                                <div
                                    className="relative w-full flex flex-col justify-end items-center pb-3 overflow-hidden bg-[#0A1128] border-r border-white/5 last:border-r-0 h-[var(--step-h-mobile)] lg:h-[var(--step-h-desktop)] rounded-t-xl lg:rounded-t-none"
                                >
                                    {/* Top highlight for 3D depth */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-2 lg:h-4 bg-gradient-to-b from-[#F97316] to-[#EA580C]"
                                    />
                                    {/* Orange hover accent */}
                                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                    {/* Label */}
                                    <span className="relative z-10 text-[10px] sm:text-[11px] font-extrabold text-white/90 tracking-[0.1em] lg:tracking-[0.13em] uppercase text-center px-1 transition-colors duration-300 group-hover:text-orange-400 whitespace-nowrap">
                                        {step.label}
                                    </span>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>

            {/* SVG Filter to key out solid white backgrounds from step images */}
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                <defs>
                    <filter id="remove-white-bg" colorInterpolationFilters="sRGB">
                        <feColorMatrix
                            type="matrix"
                            values="
                                1 0 0 0 0
                                0 1 0 0 0
                                0 0 1 0 0
                                -3 -3 -3 9 -0.5
                            "
                        />
                    </filter>
                </defs>
            </svg>

        </section>
    )
}