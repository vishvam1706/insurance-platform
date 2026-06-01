"use client"

import { BenefitsListData } from "@/types/blocks"
import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function BenefitsList({ data, isHome = false }: { data: BenefitsListData, isHome?: boolean }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
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
        <section className={isHome ? "py-16 sm:py-20 bg-transparent" : "py-8 sm:py-12 bg-transparent"}>
            <div className={isHome ? "max-w-7xl mx-auto px-6 lg:px-8" : "w-full"}>
                {data.title && (
                    <h2 
                        className="font-extrabold mb-8 text-left text-slate-900 tracking-tight" 
                        style={{ fontSize: "var(--fs-h2)", fontFamily: "var(--font-heading)" }}
                    >
                        {data.title}
                    </h2>
                )}
                <motion.div 
                    className="grid md:grid-cols-2 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {(data.items || []).map((item, i) => (
                        <motion.div 
                            key={i} 
                            className="premium-card flex gap-4 p-6 sm:p-8 rounded-2xl border border-slate-100 hover:border-[var(--brand)]/30 bg-white"
                            variants={itemVariants}
                            whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(249, 115, 22, 0.06)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-[var(--brand)]" />
                            <div>
                                <h3 className="font-extrabold mb-1.5" style={{ fontSize: "var(--fs-h3)", fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                                    {item.heading}
                                </h3>
                                <p className="leading-relaxed text-slate-500 font-medium" style={{ fontSize: "var(--fs-body)", fontFamily: "var(--font-body)" }}>
                                    {item.body}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

