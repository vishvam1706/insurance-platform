import { HomeHeroBlockData } from "@/types/blocks"
import InquiryForm from "@/components/public/InquiryForm"
import Link from "next/link"
import { Shield, Phone } from "lucide-react"

export default function HomeHeroBlock({ data }: { data: HomeHeroBlockData }) {
    const showForm = data.showInquiryForm !== false // default true
    const primaryCta = data.primaryCta ?? { text: "Book Free Call", href: "/book-call" }
    const secondaryCta = data.secondaryCta ?? { text: "Explore Plans", href: "/term-life" }

    return (
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left content */}
                    <div>
                        {data.badge && (
                            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs px-3 py-1.5 rounded-full mb-6">
                                <Shield className="w-3.5 h-3.5" />
                                {data.badge}
                            </div>
                        )}

                        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                            {data.title || "Life & Health Insurance Platform"}
                        </h1>

                        {data.subtitle && (
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                {data.subtitle}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={primaryCta.href}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                {primaryCta.text}
                            </Link>
                            <Link
                                href={secondaryCta.href}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                            >
                                {secondaryCta.text}
                            </Link>
                        </div>

                        {/* Stats */}
                        {data.stats && data.stats.length > 0 && (
                            <div className={`grid grid-cols-${Math.min(data.stats.length, 4)} gap-6 mt-10 pt-8 border-t border-white/10`}>
                                {data.stats.map((s, i) => (
                                    <div key={i}>
                                        <p className="text-2xl font-bold text-white">{s.value}</p>
                                        <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right — inquiry form */}
                    {showForm && (
                        <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-black/20">
                            <h2 className="text-lg font-semibold text-slate-900 mb-1">
                                Get Expert Advice
                            </h2>
                            <p className="text-slate-500 text-sm mb-5">
                                No spam. No salespeople. 100% free.
                            </p>
                            <InquiryForm />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
