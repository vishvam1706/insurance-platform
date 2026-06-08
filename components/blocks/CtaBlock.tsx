"use client"

import { CtaBlockData } from "@/types/blocks"
import Link from "next/link"
import { Phone, Check } from "lucide-react"
import { motion } from "framer-motion"

export default function CtaBlock({ data, isHome = false }: { data: CtaBlockData, isHome?: boolean }) {
    const primaryCtaText = (data.bookCallText && data.bookCallText !== "Compare Plans" && data.bookCallText !== "Book a Free Call" && data.bookCallText !== "Book Free Call")
        ? data.bookCallText
        : "Book Free Advisory Call";

    // Motion variants
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 15,
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    } as const

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    } as const

    return (
        <section className={isHome ? "py-20 sm:py-28 bg-[#FFFFFF] relative overflow-hidden" : "my-0"}>
            <div className={isHome ? "max-w-7xl mx-auto px-6 lg:px-8" : "-mx-6 sm:-mx-8"}>
                <motion.div
                    className="relative overflow-hidden px-8 sm:px-12 py-14 sm:py-20 border border-slate-100/80 rounded-[32px] cursor-default bg-white shadow-[0_4px_30px_rgba(15,23,42,0.015)]"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ borderColor: "var(--brand-200)", boxShadow: "0 20px 50px rgba(249, 115, 22, 0.04)" }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Ambient light glow */}
                    <div className="absolute -right-24 -bottom-24 w-[350px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-[0.035]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />

                    {/* Subtle dot matrix overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-5"
                        style={{
                            backgroundImage: "radial-gradient(circle, var(--brand) 1.5px, transparent 1.5px)",
                            backgroundSize: "32px 32px",
                        }}
                    />

                    <div className="relative max-w-xl text-left space-y-6">
                        <motion.span 
                            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-xs border"
                            style={{ 
                                background: "var(--brand-light)", 
                                color: "var(--brand-dark)", 
                                borderColor: "var(--brand-100)", 
                                fontFamily: "var(--font-heading)" 
                            }}
                            variants={itemVariants}
                        >
                            Free Expert Advice
                        </motion.span>

                        {data.title && (
                            <motion.h3
                                className="font-extrabold tracking-tight leading-[1.2] text-slate-900"
                                style={{ fontSize: "var(--fs-h2)", fontFamily: "var(--font-heading)" }}
                                variants={itemVariants}
                            >
                                {data.title}
                            </motion.h3>
                        )}

                        <motion.p 
                            className="text-slate-500 leading-relaxed text-[15px] sm:text-base font-medium" 
                            style={{ fontFamily: "var(--font-body)" }}
                            variants={itemVariants}
                        >
                            Talk to our top insurance experts for free. Simple, clear, and direct — just honest advice without any spam or pushy sales pitches.
                        </motion.p>

                        {/* High converting call to action button */}
                        <motion.div className="pt-2" variants={itemVariants}>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2.5 bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white font-extrabold text-[15px] px-8 py-4.5 rounded-[18px] transition-all duration-300 shadow-[0_4px_16px_rgba(249,115,22,0.18)]"
                                >
                                    <Phone className="w-4.5 h-4.5 animate-pulse" />
                                    {primaryCtaText}
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div className="flex flex-wrap gap-4 pt-4 border-t border-slate-50" variants={itemVariants}>
                            {["Free Consultation", "No Sales Pressure", "Compliant Advice"].map((r) => (
                                <motion.div 
                                    key={r} 
                                    className="flex items-center gap-2 text-xs font-semibold cursor-default text-slate-500" 
                                    style={{ fontFamily: "var(--font-body)" }}
                                    whileHover={{ x: 2, color: "var(--brand-dark)" }}
                                >
                                    <div className="w-5 h-5 rounded-full bg-[var(--brand-light)] border border-[var(--brand-100)] flex items-center justify-center shrink-0 shadow-xs">
                                        <Check className="w-3 h-3 text-[var(--brand)] stroke-[3]" />
                                    </div>
                                    {r}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
