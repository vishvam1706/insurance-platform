"use client"

import { StatBarData } from "@/types/blocks"
import { motion } from "framer-motion"

export default function StatBar({ data, isHome = false }: { data: StatBarData, isHome?: boolean }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    } as const

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 120, damping: 18 }
        }
    } as const

    const stats = data.stats || []

    return (
        <section className={`py-6 sm:py-8 bg-transparent ${isHome ? "py-12 sm:py-16" : ""}`}>
            <div className={isHome ? "max-w-7xl mx-auto px-6 lg:px-8" : "w-full px-6"}>
                <motion.div
                    className="relative rounded-[28px] px-6 py-8 md:px-12 md:py-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-2 md:gap-y-0 shadow-[0_20px_50px_-12px_rgba(249,115,22,0.1)] border border-[var(--brand)]/20 backdrop-blur-md"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Background layer container with overflow-hidden to clip radial mesh */}
                    <div 
                        className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none z-0"
                        style={{
                            background: "linear-gradient(135deg, #070e20 0%, #0d1a37 100%)",
                        }}
                    >
                        {/* Glowing gold radial mesh inside the stat board */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.03]"
                            style={{
                                background: "radial-gradient(circle at 50% 50%, var(--brand) 0%, transparent 60%)",
                            }}
                        />
                    </div>

                    {/* Floating top-right overlay icon/logo */}
                    {data.floatingImage && (
                        <div className="absolute -top-5 -right-3 md:-top-7 md:-right-5 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#09142e] border border-[var(--brand)]/30 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-20 flex items-center justify-center backdrop-blur-md hover:scale-110 hover:rotate-6 transition-all duration-300 select-none group">
                            <img 
                                src={data.floatingImage} 
                                alt="Brand accent icon" 
                                className="w-full h-full object-contain filter drop-shadow-sm" 
                            />
                            {/* Subtle logo ambient glow */}
                            <div className="absolute inset-0 rounded-2xl bg-[var(--brand)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xs" />
                        </div>
                    )}

                    {stats.map((stat: any, i: number) => {
                        // Calculate clean responsive borders for both 2-column mobile and 4-column desktop grids
                        const isEven = i % 2 === 1;
                        const isLastRow = i >= stats.length - (stats.length % 2 === 0 ? 2 : 1);
                        
                        const borderClasses = `
                            ${!isEven ? 'border-r border-slate-800/40' : ''} 
                            ${!isLastRow ? 'border-b border-slate-800/40' : ''} 
                            lg:border-b-0 
                            lg:border-r 
                            lg:last:border-none 
                            lg:[&:nth-child(2)]:border-r
                        `.replace(/\s+/g, ' ').trim();

                        return (
                            <motion.div 
                                key={i} 
                                className={`text-center group flex flex-col justify-center px-4 py-2 cursor-default z-10 ${borderClasses}`}
                                variants={itemVariants}
                                whileHover={{ y: -2 }}
                                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                            >
                                <p
                                    className="font-extrabold mb-1 tracking-tight bg-gradient-to-r from-[var(--brand-200)] via-[var(--brand)] to-[var(--brand-dark)] bg-clip-text text-transparent transition-transform duration-300 inline-block font-mono leading-none"
                                    style={{ fontSize: "var(--fs-h1)", fontFamily: "var(--font-heading)" }}
                                >
                                    {stat.value}
                                </p>
                                <p
                                    className="text-[10px] md:text-xs font-black tracking-widest uppercase"
                                    style={{ color: "rgba(241, 245, 249, 0.65)", fontFamily: "var(--font-body)" }}
                                >
                                    {stat.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    )
}