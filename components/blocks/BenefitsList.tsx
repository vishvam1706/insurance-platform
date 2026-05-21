"use client"

import { BenefitsListData } from "@/types/blocks"
import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function BenefitsList({ data }: { data: BenefitsListData }) {
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
        <section className="py-10 bg-transparent">
            <div className="max-w-7xl mx-auto">
                {data.title && (
                    <h2 
                        className="text-2xl md:text-3xl font-extrabold mb-8 text-left text-slate-900 tracking-tight" 
                        style={{ fontFamily: "var(--font-heading)" }}
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
                            className="premium-card flex gap-4 p-6 rounded-2xl border border-slate-100 hover:border-emerald-500/20 bg-white"
                            variants={itemVariants}
                            whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0, 179, 134, 0.04)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-emerald-500" />
                            <div>
                                <h3 className="font-extrabold text-base md:text-lg mb-1.5" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                                    {item.heading}
                                </h3>
                                <p className="text-sm md:text-base leading-relaxed text-slate-500 font-medium" style={{ fontFamily: "var(--font-body)" }}>
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

