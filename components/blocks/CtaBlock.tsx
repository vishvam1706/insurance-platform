"use client"

import { CtaBlockData } from "@/types/blocks"
import Link from "next/link"
import { Phone, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function CtaBlock({ data }: { data: CtaBlockData }) {
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
                staggerChildren: 0.1,
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
        <div className="-mx-6 sm:-mx-8 my-0">
            <motion.div
                className="relative overflow-hidden px-8 sm:px-12 py-12 sm:py-16 border border-[var(--brand-100)] rounded-3xl cursor-default"
                style={{ background: "var(--surface)" }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ boxShadow: "0 20px 50px rgba(0, 179, 134, 0.06)" }}
                transition={{ duration: 0.3 }}
            >
                {/* Subtle premium mesh backdrop */}
                <div className="absolute inset-0 gold-mesh opacity-90 pointer-events-none" />

                {/* Subtle dot grid */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: "radial-gradient(circle, var(--brand) 1.5px, transparent 1.5px)",
                        backgroundSize: "32px 32px",
                    }}
                />

                <div className="relative max-w-xl">
                    <motion.span className="badge-green inline-flex mb-5" variants={itemVariants}>
                        Free Expert Advice
                    </motion.span>

                    {data.title && (
                        <motion.h3
                            className="text-2xl sm:text-3xl font-extrabold mb-3 leading-snug"
                            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                            variants={itemVariants}
                        >
                            {data.title}
                        </motion.h3>
                    )}

                    <motion.p 
                        className="text-sm mb-7" 
                        style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.7 }}
                        variants={itemVariants}
                    >
                        Talk to our top insurance experts for free. Simple, clear, and direct — just honest advice.
                    </motion.p>

                    <motion.div className="flex flex-wrap gap-3 mb-6" variants={itemVariants}>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                            <Link
                                href="/contact"
                                className="btn-primary inline-flex items-center gap-2 rounded-full"
                            >
                                <Phone className="w-4 h-4 animate-pulse" />
                                {primaryCtaText}
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div className="flex flex-wrap gap-5" variants={itemVariants}>
                        {["Free consultation", "No sales pressure", "Expert advisors"].map((r) => (
                            <motion.div 
                                key={r} 
                                className="flex items-center gap-2 text-xs font-semibold cursor-default" 
                                style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                                whileHover={{ x: 3, color: "var(--brand)" }}
                            >
                                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "var(--brand)" }} />
                                {r}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
