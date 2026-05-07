import { Metadata } from "next"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import PageRenderer from "@/components/blocks/PageRenderer"
import InquiryForm from "@/components/public/InquiryForm"
import { Shield, Star, Phone } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Insurance Platform — Expert Advice, Free Consultation",
    description: "Get expert advice on term life and health insurance. Book a free call with our IRDAI-certified advisors.",
}

async function getHomePage() {
    "use cache"
    await connectDB()
    const doc = await PageContent.findOne({ pageKey: "home", published: true }).lean()
    // Strip BSON types (ObjectId, etc.) — required before passing to Client Components
    return doc ? JSON.parse(JSON.stringify(doc)) : null
}

export default async function HomePage() {
    const page = await getHomePage()

    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs px-3 py-1.5 rounded-full mb-6">
                                <Shield className="w-3.5 h-3.5" />
                                IRDAI-Certified Expert Advisors
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                                Life & Health Insurance Platform
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                A modern, full-stack platform for term life & health insurance — with advisor-led lead management and a powerful admin console.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/book-call"
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    Book Free Call
                                </Link>
                                <Link
                                    href="/term-life"
                                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                                >
                                    Explore Plans
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10">
                                {[
                                    { v: "8,00,000+", l: "Customers Helped" },
                                    { v: "4.9/5", l: "Google Rating" },
                                    { v: "100%", l: "Free Consultation" },
                                ].map((s) => (
                                    <div key={s.l}>
                                        <p className="text-2xl font-bold text-white">{s.v}</p>
                                        <p className="text-slate-400 text-xs mt-0.5">{s.l}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Inquiry form */}
                        <div className="bg-white rounded-2xl p-6 shadow-2xl shadow-black/20">
                            <h2 className="text-lg font-semibold text-slate-900 mb-1">
                                Get Expert Advice
                            </h2>
                            <p className="text-slate-500 text-sm mb-5">
                                No spam. No salespeople. 100% free.
                            </p>
                            <InquiryForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* CMS content */}
            {page && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <PageRenderer blocks={(page as any).blocks || []} />
                </section>
            )}

            {/* Product cards */}
            <section className="bg-slate-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
                        What we cover
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        {[
                            {
                                title: "Term Life Insurance",
                                desc: "Pure protection for your family. High cover at low premiums.",
                                href: "/term-life",
                                color: "bg-blue-600",
                            },
                            {
                                title: "Health Insurance",
                                desc: "Comprehensive health coverage for you and your family.",
                                href: "/health",
                                color: "bg-teal-600",
                            },
                        ].map((card) => (
                            <Link
                                key={card.href}
                                href={card.href}
                                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all group"
                            >
                                <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-slate-500 text-sm">{card.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}