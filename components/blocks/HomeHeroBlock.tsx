"use client"

import { HomeHeroBlockData } from "@/types/blocks"
import Link from "next/link"
import { Calendar, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const DEFAULT_SLIDES = [
    {
        title: "100% Unbiased Advice",
        backgroundColor: "#00B386",
        personImage: "/images/person1.png",
        cardText1: "Advice Quality ✓",
        cardText2: "Zero sales pressure",
        badgeText: "Our Promise"
    },
    {
        title: "Tailored For You",
        backgroundColor: "#FFB236",
        personImage: "/images/person2.png",
        cardText1: "Which plan fits you best?",
        cardText2: "Pure Term Life Plan",
        cardText3: "100% Cashless Health"
    },
    {
        title: "Superfast Claim Support",
        backgroundColor: "#4ECBA1",
        personImage: "/images/person3.png",
        cardText1: "24/7 Claim Support",
        cardText2: "Settled In Full"
    }
]

export default function HomeHeroBlock({ data }: { data: HomeHeroBlockData }) {
    // Primary CTA parsing with solid fallbacks
    const rawPrimaryCta = data.primaryCta ?? { text: "Book a free call now", href: "/contact" }
    let primaryCtaText = rawPrimaryCta.text?.trim() || "Book a free call now"
    if (primaryCtaText === "Consult Expert Advisor" || primaryCtaText === "Book Free Call" || primaryCtaText === "Compare Plans") {
        primaryCtaText = "Book a free call now"
    }
    const primaryCta = {
        text: primaryCtaText,
        href: rawPrimaryCta.href?.trim() || "/contact"
    }

    // Dynamic slides mapping: Use database slides or fall back to default slides
    const activeSlides = data.slides && data.slides.length > 0 ? data.slides : DEFAULT_SLIDES
    const slideCount = activeSlides.length

    // Carousel state
    const [slideIndex, setSlideIndex] = useState(0)
    const [triggerReset, setTriggerReset] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % slideCount)
        }, 4000)
        return () => clearInterval(timer)
    }, [triggerReset, slideCount])

    const handlePrevClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setSlideIndex((prev) => (prev - 1 + slideCount) % slideCount)
        setTriggerReset((prev) => prev + 1)
    }

    const handleNextClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setSlideIndex((prev) => (prev + 1) % slideCount)
        setTriggerReset((prev) => prev + 1)
    }

    // Motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            }
        }
    } as const

    const itemVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    } as const

    const visualVariants = {
        hidden: { opacity: 0, scale: 0.97 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 80, damping: 15 }
        }
    } as const

    const staggerContainer = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    } as const

    const staggerItem = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" }
        }
    } as const

    // Active background color
    const activeBgColor = activeSlides[slideIndex]?.backgroundColor || "#FF7A50"

    return (
        <section className="relative overflow-hidden gold-mesh py-16 md:py-24 border-b border-[var(--brand-100)]">
            <div className="relative max-w-7xl mx-auto px-6 z-10">
                <motion.div 
                    className="grid lg:grid-cols-[0.6fr_0.4fr] gap-12 lg:gap-16 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >

                    {/* Left Column */}
                    <div className="flex flex-col items-start text-left space-y-6">
                        
                        {/* Wreath Rating Badges */}
                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-6 mb-2 select-none"
                        >
                            {/* Google Laurel Badge */}
                            <div className="flex items-center gap-1">
                                {/* Left Laurel */}
                                <svg viewBox="0 0 24 48" className="w-5 h-10 text-slate-300 fill-none stroke-current" strokeWidth="2">
                                    <path d="M20,40 C8,30 8,15 18,5" strokeLinecap="round" />
                                    <path d="M16,33 C10,31 9,26 14,24" fill="currentColor" />
                                    <path d="M14,23 C8,21 7,16 12,14" fill="currentColor" />
                                    <path d="M15,12 C9,9 9,4 14,4" fill="currentColor" />
                                </svg>
                                
                                <div className="text-center px-1.5">
                                    <div className="flex items-center justify-center gap-0.5">
                                        <span className="text-lg font-black text-slate-800 leading-none">4.9</span>
                                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    </div>
                                    <p className="text-[9px] font-extrabold text-slate-400 leading-tight mt-0.5 uppercase tracking-wide">
                                        22,000+ ratings<br/>on Google
                                    </p>
                                </div>
                                
                                {/* Right Laurel */}
                                <svg viewBox="0 0 24 48" className="w-5 h-10 text-slate-300 fill-none stroke-current" strokeWidth="2">
                                    <path d="M4,40 C16,30 16,15 6,5" strokeLinecap="round" />
                                    <path d="M8,33 C14,31 15,26 10,24" fill="currentColor" />
                                    <path d="M10,23 C16,21 17,16 12,14" fill="currentColor" />
                                    <path d="M9,12 C15,9 15,4 10,4" fill="currentColor" />
                                </svg>
                            </div>

                            {/* Zerodha Laurel Badge */}
                            <div className="flex items-center gap-1">
                                {/* Left Laurel */}
                                <svg viewBox="0 0 24 48" className="w-5 h-10 text-slate-300 fill-none stroke-current" strokeWidth="2">
                                    <path d="M20,40 C8,30 8,15 18,5" strokeLinecap="round" />
                                    <path d="M16,33 C10,31 9,26 14,24" fill="currentColor" />
                                    <path d="M14,23 C8,21 7,16 12,14" fill="currentColor" />
                                    <path d="M15,12 C9,9 9,4 14,4" fill="currentColor" />
                                </svg>
                                
                                <div className="text-center px-1.5 flex flex-col items-center">
                                    {/* Zerodha Blue Kite Logo */}
                                    <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#2453a5] fill-current mb-0.5">
                                        <path d="M50,12 L80,42 L50,72 L20,42 Z" />
                                        <path d="M42,42 C42,47 45,50 50,50 C55,50 58,47 58,42 C58,37 55,34 50,34 C45,34 42,37 42,42 Z" fill="white" />
                                    </svg>
                                    <p className="text-[9px] font-extrabold text-slate-400 leading-tight uppercase tracking-wide">
                                        Backed by<br/>Zerodha
                                    </p>
                                </div>
                                
                                {/* Right Laurel */}
                                <svg viewBox="0 0 24 48" className="w-5 h-10 text-slate-300 fill-none stroke-current" strokeWidth="2">
                                    <path d="M4,40 C16,30 16,15 6,5" strokeLinecap="round" />
                                    <path d="M8,33 C14,31 15,26 10,24" fill="currentColor" />
                                    <path d="M10,23 C16,21 17,16 12,14" fill="currentColor" />
                                    <path d="M9,12 C15,9 15,4 10,4" fill="currentColor" />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            className="font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-4"
                            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.75rem, 5.2vw, 4.4rem)" }}
                            variants={itemVariants}
                        >
                            The Ultimate<br />
                            <span className="italic font-normal" style={{ color: "var(--brand-dark)" }}>Insurance Buying</span><br />
                            Experience.
                        </motion.h1>

                        {/* Description */}
                        <motion.p 
                            className="text-base md:text-lg leading-relaxed text-slate-600 max-w-xl font-medium"
                            style={{ fontFamily: "var(--font-body)" }}
                            variants={itemVariants}
                        >
                            {data.subtitle || "Unbiased expert advice, completely free. Book a call to speak with our expert advisors. Absolutely no spam, no sales pressure."}
                        </motion.p>

                        {/* CTA Action */}
                        <motion.div className="pt-2" variants={itemVariants}>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link 
                                    href={primaryCta.href} 
                                    className="inline-flex items-center gap-2.5 bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white font-extrabold text-[15px] px-8 py-4.5 rounded-[18px] transition-all duration-300 shadow-[0_4px_16px_rgba(0,179,134,0.18)]"
                                >
                                    <Calendar className="w-4.5 h-4.5" />
                                    {primaryCta.text}
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>


                    {/* Right Column — CRM Sleek Slideshow Panel */}
                    <motion.div className="w-full flex justify-center lg:justify-end overflow-visible" variants={visualVariants}>
                        <div className="relative w-full max-w-[480px] h-[270px] overflow-visible group">
                            
                            {/* Glassmorphic Arrows (visible on hover / touch active) */}
                            <button
                                onClick={handlePrevClick}
                                className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md border border-slate-200/50 flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-30 opacity-80 md:opacity-0 group-hover:opacity-100"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleNextClick}
                                className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md border border-slate-200/50 flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-30 opacity-80 md:opacity-0 group-hover:opacity-100"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            {/* Main Slide Card Container */}
                            <div 
                                className="w-full h-full rounded-[24px] overflow-visible shadow-[0_15px_40px_rgba(0,0,0,0.06)] relative select-none"
                                style={{ backgroundColor: activeBgColor, transition: "background-color 600ms ease-in-out" }}
                            >
                                {/* Stacked Cutout Person Images */}
                                <div className="absolute right-0 bottom-0 w-[42%] h-[110%] pointer-events-none z-10 overflow-visible">
                                    {activeSlides.map((slide, idx) => (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img 
                                            key={idx}
                                            src={slide.personImage} 
                                            alt={slide.title} 
                                            className={`absolute bottom-0 right-0 h-full object-contain transition-opacity duration-400 ease-in-out ${slideIndex === idx ? "opacity-100" : "opacity-0"}`}
                                        />
                                    ))}
                                </div>

                                {/* Left 58% Feature UI Content Area */}
                                <div className="w-[58%] h-full flex flex-col justify-between p-5.5 pl-6.5 z-20 relative overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={slideIndex}
                                            initial={{ opacity: 0, x: 15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -15 }}
                                            transition={{ duration: 0.32, ease: "easeInOut" }}
                                            className="h-full flex flex-col justify-between"
                                        >
                                            <motion.div 
                                                variants={staggerContainer}
                                                initial="hidden"
                                                animate="visible"
                                                className="h-full flex flex-col justify-between py-1"
                                            >
                                                {/* Render dynamically based on slideIndex % 3 layout type */}
                                                {slideIndex % 3 === 0 && (
                                                    <>
                                                        {/* LEAD FOLLOW-UP STYLE */}
                                                        <motion.h3 variants={staggerItem} className="text-[17.5px] font-extrabold text-black/90 tracking-tight leading-none">
                                                            {activeSlides[slideIndex]?.title}
                                                        </motion.h3>
                                                        
                                                        <motion.div variants={staggerItem} className="flex items-center gap-2">
                                                            <div className="w-5.5 h-5.5 rounded-full bg-black/15 flex items-center justify-center overflow-hidden shrink-0">
                                                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-black/60 fill-current">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                                                </svg>
                                                            </div>
                                                            <div className="space-y-1 flex-1">
                                                                <div className="w-14 h-1 bg-black/10 rounded-full" />
                                                                <div className="w-20 h-1 bg-black/10 rounded-full" />
                                                            </div>
                                                        </motion.div>
 
                                                        <motion.div variants={staggerItem} className="bg-white rounded-[14px] p-2.5 shadow-md border border-slate-100 flex flex-col gap-1.5 w-full max-w-[195px] text-left">
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-extrabold text-[11px] text-emerald-600">
                                                                    {activeSlides[slideIndex]?.cardText1 || "Deal Closed ✓"}
                                                                </span>
                                                                <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                                                    <span className="text-[8px] text-emerald-600 font-bold">✓</span>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="w-[80%] h-1 bg-slate-100 rounded-full" />
                                                                <div className="w-[55%] h-1 bg-slate-100 rounded-full" />
                                                            </div>
                                                            <div className="flex justify-between items-center mt-0.5 pt-1 border-t border-slate-50">
                                                                <span className="text-xs font-black text-slate-800">
                                                                    {activeSlides[slideIndex]?.cardText2 || "$4,800"}
                                                                </span>
                                                                <span className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-bold">
                                                                    {activeSlides[slideIndex]?.badgeText || "Deal value"}
                                                                </span>
                                                            </div>
                                                        </motion.div>
                                                    </>
                                                )}
 
                                                {slideIndex % 3 === 1 && (
                                                    <>
                                                        {/* SMART SUGGESTIONS STYLE */}
                                                        <motion.h3 variants={staggerItem} className="text-[17.5px] font-extrabold text-black/90 tracking-tight leading-none">
                                                            {activeSlides[slideIndex]?.title}
                                                        </motion.h3>
 
                                                        <motion.div variants={staggerItem} className="flex items-start gap-2">
                                                            <div className="w-5.5 h-5.5 rounded-full bg-black/15 flex items-center justify-center overflow-hidden shrink-0 mt-0.5">
                                                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-black/60 fill-current">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                                                </svg>
                                                            </div>
                                                            <div className="bg-white text-slate-800 font-bold text-[10px] px-2.5 py-1.5 rounded-[12px] rounded-tl-none shadow-sm border border-slate-100 text-left leading-tight">
                                                                {activeSlides[slideIndex]?.cardText1 || "Which plan fits this lead?"}
                                                            </div>
                                                        </motion.div>
 
                                                        <div className="space-y-1.5 w-full max-w-[195px]">
                                                            <motion.div variants={staggerItem} className="bg-white rounded-[10px] p-1.5 shadow-sm border border-slate-100 flex items-center gap-2 text-left">
                                                                <div className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                                                                    <span className="text-[8px] font-black text-emerald-600">★</span>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-[10.5px] font-extrabold text-slate-800 leading-tight">
                                                                        {activeSlides[slideIndex]?.cardText2 || "Enterprise Plan"}
                                                                    </p>
                                                                    <div className="w-10 h-0.5 bg-slate-100 rounded-full mt-0.5" />
                                                                </div>
                                                            </motion.div>
 
                                                            <motion.div variants={staggerItem} className="bg-white rounded-[10px] p-1.5 shadow-sm border border-slate-100 flex items-center gap-2 text-left">
                                                                <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                                                                    <span className="text-[8px] font-black text-blue-600">▲</span>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-[10.5px] font-extrabold text-slate-800 leading-tight">
                                                                        {activeSlides[slideIndex]?.cardText3 || "Growth Plan"}
                                                                    </p>
                                                                    <div className="w-14 h-0.5 bg-slate-100 rounded-full mt-0.5" />
                                                                </div>
                                                            </motion.div>
                                                        </div>
                                                    </>
                                                )}
 
                                                {slideIndex % 3 === 2 && (
                                                    <>
                                                        {/* AUTO FORM FILL STYLE */}
                                                        <motion.div variants={staggerItem} className="flex items-center justify-between w-full">
                                                            <h3 className="text-[17.5px] font-extrabold text-black/90 tracking-tight leading-none">
                                                                {activeSlides[slideIndex]?.title}
                                                            </h3>
                                                            <div className="w-5.5 h-5.5 rounded-full bg-black/15 flex items-center justify-center overflow-hidden shrink-0">
                                                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-black/60 fill-current">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                                                </svg>
                                                            </div>
                                                        </motion.div>
 
                                                        <motion.div variants={staggerItem} className="bg-white rounded-[14px] p-2.5 shadow-md border border-slate-100 flex flex-col gap-2 w-full max-w-[195px] text-left">
                                                            <div className="flex justify-between items-center border-b border-slate-50 pb-1">
                                                                <span className="text-[8.5px] uppercase font-black tracking-widest text-slate-400">
                                                                    {activeSlides[slideIndex]?.cardText1 || "Lead Info Form"}
                                                                </span>
                                                                <span className="text-[8px] text-emerald-500 font-bold flex items-center gap-0.5">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 
                                                                    {activeSlides[slideIndex]?.cardText2 || "Auto filling"}
                                                                </span>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                {/* Row 1 */}
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div className="h-2 bg-emerald-100/50 animate-pulse rounded-full w-full" />
                                                                    <div className="h-2 bg-emerald-100/50 animate-pulse rounded-full w-[80%]" />
                                                                </div>
                                                                {/* Row 2 */}
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div className="h-2 bg-emerald-100/50 animate-pulse rounded-full w-[90%]" />
                                                                    <div className="h-2 bg-emerald-100/50 animate-pulse rounded-full w-[95%]" />
                                                                </div>
                                                                {/* Row 3 */}
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div className="h-2 bg-emerald-100/50 animate-pulse rounded-full w-[70%]" />
                                                                    <div className="h-2 bg-emerald-100/50 animate-pulse rounded-full w-full" />
                                                                </div>
                                                                {/* Row 4 */}
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div className="h-2 bg-emerald-100/50 animate-pulse rounded-full w-full" />
                                                                    <div className="h-2 bg-emerald-100/50 animate-pulse rounded-full w-[60%]" />
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </>
                                                )}
                                            </motion.div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
