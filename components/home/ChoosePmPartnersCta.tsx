"use client"

import Link from "next/link"
import { Calendar } from "lucide-react"
import { motion } from "framer-motion"

interface Props {
    waUrl: string
}

export default function ChoosePmPartnersCta({ waUrl }: Props) {
    return (
        <section
            className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#031c15] text-white border-b border-slate-950"
        >
            {/* Elegant luxury ambient blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-[0.06]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />

            {/* Subtle premium mesh backdrop */}
            <div className="absolute inset-0 gold-mesh opacity-20 pointer-events-none" />

            {/* Subtle dot grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: "radial-gradient(circle, var(--brand) 1.5px, transparent 1.5px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6 z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="grid lg:grid-cols-[1fr_auto] gap-12 items-center"
                >
                    <div className="text-left">
                        <span className="text-xs font-black uppercase tracking-widest block mb-3 text-[var(--brand)]">
                            Start Your Journey
                        </span>
                        <h2
                            className="text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Choose PM Partners for a<br />
                            well-guided, honest<br />
                            <span className="italic font-normal text-[var(--brand)] select-none">insurance purchase.</span>
                        </h2>
                    </div>

                    <Link
                        href="/contact"
                        className="btn-primary inline-flex items-center justify-between gap-4 font-black uppercase tracking-widest text-xs px-8 py-4.5 rounded-[20px] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-950/20 active:translate-y-0 duration-300 min-w-[240px] text-center"
                    >
                        Book Free Call
                        <Calendar className="w-4 h-4 shrink-0" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
