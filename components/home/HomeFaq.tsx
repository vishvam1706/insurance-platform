"use client"

import { useState } from "react"
import { Plus, Minus, HelpCircle } from "lucide-react"

interface FaqItem { q: string; a: string }

const DEFAULT_FAQS: FaqItem[] = [
    { q: "What is Ditto?", a: "Ditto helps you make better decisions when buying insurance. That's it. That's all we do — unbiased expert advice, completely free." },
    { q: "But what exactly do you do?", a: "We have a host of well-trained advisors who will walk you through any queries you may have and we'll even help you make a purchase. All you have to do is book a call." },
    { q: "Is it free?", a: "Yes, it's free. We do not charge any advisory or consultation fees whatsoever." },
    { q: "Do you earn commission?", a: "Yes, we do earn a commission from insurers. But our advice is never influenced by it — we recommend the best plan for you, not the one that pays us the most." },
    { q: "How quickly can I get a policy?", a: "Depending on the insurer and your medical history, you can get a policy issued within 3–7 working days after our call." },
    { q: "What if I need to make a claim?", a: "Our dedicated claims support team is available to assist you through every step of the claims process — from filing to settlement." },
    { q: "Is my data safe with you?", a: "Absolutely. We never share your personal data with third parties without your consent. All data is encrypted and stored securely." },
    { q: "Can I buy insurance for my parents?", a: "Yes. We can help you get health insurance for senior parents and term insurance for anyone with an insurable income." },
    { q: "What types of insurance do you cover?", a: "We currently specialise in Term Life Insurance and Health Insurance — the two most essential policies every Indian family should have." },
    { q: "How is Ditto different from buying directly?", a: "You get unbiased advice across multiple insurers. We help you compare, clarify, and choose — something no single insurer's website can offer." },
    { q: "Do you offer post-purchase support?", a: "Yes. Once you buy through us, we remain your point of contact for renewals, endorsements, and claims — for the life of the policy." },
    { q: "How do I book a call?", a: "Just click 'Book a free call now' anywhere on our website. Pick a convenient slot and one of our advisors will call you at that time." },
]

interface Props {
    /** CMS-provided FAQ items — when absent, DEFAULT_FAQS are used */
    items?: { question: string; answer: string }[]
}

const PAGE_SIZE = 4

export default function HomeFaq({ items }: Props = {}) {
    // Map CMS format { question, answer } → internal { q, a }; fall back to defaults
    const ALL_FAQS: FaqItem[] = items && items.length > 0
        ? items.map(i => ({ q: i.question, a: i.answer }))
        : DEFAULT_FAQS

    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const [page, setPage] = useState(0)

    const totalPages = Math.ceil(ALL_FAQS.length / PAGE_SIZE)
    const pageFaqs = ALL_FAQS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

    function toggle(globalIdx: number) {
        setOpenIndex(prev => (prev === globalIdx ? null : globalIdx))
    }

    function goToPage(p: number) {
        setPage(p)
        setOpenIndex(p * PAGE_SIZE) // open first item on new page
    }

    return (
        <section
            className="relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)" }}
        >
            {/* Decorative blobs */}
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full pointer-events-none opacity-30"
                style={{ background: "radial-gradient(circle, #BFDBFE, transparent)" }} />
            <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full pointer-events-none opacity-20"
                style={{ background: "radial-gradient(circle, #C7D2FE, transparent)" }} />

            <div className="relative max-w-7xl mx-auto px-6 py-20">
                {/* TOP HEADER */}
                <div className="text-center mb-14">
                    <span
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                        style={{ background: "#DBEAFE", color: "#1D4ED8", border: "1px solid #BFDBFE" }}
                    >
                        <HelpCircle className="w-3.5 h-3.5" />
                        Got questions?
                    </span>
                    <h2
                        className="text-4xl font-extrabold leading-tight"
                        style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                    >
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: "#6B7280" }}>
                        Everything you need to know about how Ditto works.
                    </p>
                </div>

                {/* CONTENT — left stat cards + right accordion */}
                <div className="grid lg:grid-cols-[300px_1fr] gap-8">

                    {/* LEFT — stat cards */}
                    <div className="space-y-4">
                        {[
                            { emoji: "🌟", value: "4.9 / 5", label: "Average Rating", sub: "21,000+ Google reviews" },
                            { emoji: "📞", value: "100% Free", label: "Consultation", sub: "No hidden charges ever" },
                            { emoji: "🛡️", value: "8 Lakh+", label: "Customers Helped", sub: "And growing every day" },
                        ].map((s) => (
                            <div
                                key={s.label}
                                className="rounded-2xl p-5 flex items-center gap-4"
                                style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                                    style={{ background: "#EFF6FF" }}
                                >
                                    {s.emoji}
                                </div>
                                <div>
                                    <p className="text-lg font-extrabold leading-tight" style={{ fontFamily: "var(--font-heading)", color: "#111827" }}>
                                        {s.value}
                                    </p>
                                    <p className="text-xs font-semibold" style={{ color: "#374151" }}>{s.label}</p>
                                    <p className="text-xs" style={{ color: "#9CA3AF" }}>{s.sub}</p>
                                </div>
                            </div>
                        ))}

                        {/* Mascots */}
                        <div
                            className="rounded-2xl p-5 flex items-end justify-center gap-3"
                            style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", minHeight: 120 }}
                        >
                            <div className="w-20 h-24 rounded-3xl flex items-end justify-center text-5xl select-none" style={{ background: "#DBEAFE" }}>🧚</div>
                            <div className="w-16 h-20 rounded-3xl flex items-end justify-center text-4xl select-none" style={{ background: "#EDE9FE" }}>🐻</div>
                        </div>
                    </div>

                    {/* RIGHT — accordion */}
                    <div>
                        <div className="rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
                            {pageFaqs.map((faq, i) => {
                                const globalIdx = page * PAGE_SIZE + i
                                const isOpen = openIndex === globalIdx
                                const isLast = i === pageFaqs.length - 1
                                return (
                                    <div
                                        key={globalIdx}
                                        style={{
                                            borderBottom: isLast ? "none" : "1px solid #F3F4F6",
                                            background: isOpen ? "#F8FAFF" : "#FFFFFF",
                                            transition: "background 0.2s ease",
                                        }}
                                    >
                                        {/* Question */}
                                        <button
                                            type="button"
                                            onClick={() => toggle(globalIdx)}
                                            className="w-full flex items-center gap-4 px-6 py-5 text-left group"
                                        >
                                            {/* Number badge */}
                                            <span
                                                className="shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all"
                                                style={{
                                                    background: isOpen ? "#2563EB" : "#F3F4F6",
                                                    color: isOpen ? "#FFFFFF" : "#9CA3AF",
                                                }}
                                            >
                                                {globalIdx + 1}
                                            </span>

                                            <span
                                                className="flex-1 font-semibold text-sm leading-snug transition-colors"
                                                style={{ color: isOpen ? "#1D4ED8" : "#111827" }}
                                            >
                                                {faq.q}
                                            </span>

                                            <span
                                                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                                                style={{
                                                    background: isOpen ? "#2563EB" : "#F9FAFB",
                                                    border: `1px solid ${isOpen ? "#2563EB" : "#E5E7EB"}`,
                                                    color: isOpen ? "#FFFFFF" : "#6B7280",
                                                }}
                                            >
                                                {isOpen
                                                    ? <Minus className="w-3.5 h-3.5" />
                                                    : <Plus className="w-3.5 h-3.5" />
                                                }
                                            </span>
                                        </button>

                                        {/* Answer — smooth grid animation */}
                                        <div
                                            style={{
                                                display: "grid",
                                                gridTemplateRows: isOpen ? "1fr" : "0fr",
                                                transition: "grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
                                            }}
                                        >
                                            <div style={{ overflow: "hidden" }}>
                                                <div className="px-6 pb-5 pl-[72px]">
                                                    <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center gap-2 mt-5 px-1">
                            <span className="text-xs mr-2" style={{ color: "#9CA3AF" }}>Page</span>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => goToPage(i)}
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all hover:scale-105 active:scale-95"
                                    style={{
                                        background: page === i ? "#2563EB" : "#FFFFFF",
                                        color: page === i ? "#FFFFFF" : "#6B7280",
                                        border: page === i ? "none" : "1px solid #E5E7EB",
                                        boxShadow: page === i ? "0 4px 12px rgba(37,99,235,0.3)" : "0 1px 3px rgba(0,0,0,0.04)",
                                    }}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <span className="text-xs ml-2" style={{ color: "#9CA3AF" }}>
                                {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, ALL_FAQS.length)} of {ALL_FAQS.length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
