"use client"

import { NumberedCardsData } from "@/types/blocks"
import { motion } from "framer-motion"

export default function NumberedCards({ data }: { data: NumberedCardsData }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 }
        }
    } as const

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    } as const

    return (
        <div className="my-16">
            {data.title && (
                <h2 
                    className="text-2xl md:text-3xl font-extrabold mb-2 text-left text-slate-900 tracking-tight" 
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {data.title}
                </h2>
            )}
            {data.quickTake && (
                <p className="text-sm md:text-base mb-8 italic pl-4 border-l-2 border-[var(--brand)] font-medium text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
                    {data.quickTake}
                </p>
            )}
            <motion.div 
                className="grid sm:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {(data.cards || []).map((card) => (
                    <motion.div
                        key={card.number}
                        className="premium-card rounded-2xl p-6 md:p-8 flex flex-col items-start border border-slate-100 hover:border-emerald-500/20 bg-white"
                        variants={itemVariants}
                        whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0, 179, 134, 0.04)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div
                            className="w-10 h-10 rounded-full text-base font-black flex items-center justify-center mb-5 shadow-sm select-none"
                            style={{ background: "var(--brand-light)", color: "var(--brand-dark)", border: "1px solid var(--brand-200)", fontFamily: "var(--font-heading)" }}
                        >
                            {card.number}
                        </div>
                        <h3 className="font-extrabold text-base md:text-lg mb-2.5" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                            {card.title}
                        </h3>
                        <p className="text-sm md:text-base leading-relaxed text-slate-500 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                            {card.body}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

