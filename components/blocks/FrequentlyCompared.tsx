"use client"

import { FrequentlyComparedData } from "@/types/blocks"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function FrequentlyCompared({ data, isHome = false }: { data: FrequentlyComparedData, isHome?: boolean }) {
    return (
        <div className={isHome ? "py-12 sm:py-16" : "my-12"}>
            <div className={isHome ? "max-w-4xl mx-auto px-6 lg:px-8" : "w-full"}>
            {data.title && (
                <h2 className="font-bold mb-6" style={{ fontSize: "var(--fs-h2)", fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                    {data.title}
                </h2>
            )}
            <div className="space-y-4">
                {(data.links || []).map((link, i) => (
                    <Link
                        key={i}
                        href={link.url}
                        className="group flex items-center justify-between p-5 rounded-2xl border border-[var(--brand-100)] bg-white hover:border-[var(--brand)] hover:bg-[var(--brand-light)] shadow-sm hover:shadow transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        <span className="text-sm md:text-base font-bold transition-colors duration-300 group-hover:text-[var(--text-primary)]" style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}>
                            {link.label}
                        </span>
                        <ArrowRight className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: "var(--brand-dark)" }} />
                    </Link>
                ))}
            </div>
            </div>
        </div>
    )
}

