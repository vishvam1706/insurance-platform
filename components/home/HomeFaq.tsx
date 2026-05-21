"use client"

import { useState } from "react"
import { Plus, Minus, HelpCircle, Star, PhoneCall, ShieldCheck, Search } from "lucide-react"

interface FaqItem { q: string; a: string }

const DEFAULT_FAQS: FaqItem[] = [
    { q: "What is PM Partners?", a: "PM Partners helps you make better decisions when buying insurance. That's it. That's all we do — unbiased expert advice, completely free." },
    { q: "But what exactly do you do?", a: "We have a host of well-trained advisors who will walk you through any queries you may have and we'll even help you make a purchase. All you have to do is book a call." },
    { q: "Is it free?", a: "Yes, it's free. We do not charge any advisory or consultation fees whatsoever." },
    { q: "Do you earn commission?", a: "Yes, we do earn a commission from insurers. But our advice is never influenced by it — we recommend the best plan for you, not the one that pays us the most." },
    { q: "How quickly can I get a policy?", a: "Depending on the insurer and your medical history, you can get a policy issued within 3–7 working days after our call." },
    { q: "What if I need to make a claim?", a: "Our dedicated claims support team is available to assist you through every step of the claims process — from filing to settlement." },
    { q: "Is my data safe with you?", a: "Absolutely. We never share your personal data with third parties without your consent. All data is encrypted and stored securely." },
    { q: "Can I buy insurance for my parents?", a: "Yes. We can help you get health insurance for senior parents and term insurance for anyone with an insurable income." },
    { q: "What types of insurance do you cover?", a: "We currently specialise in Term Life Insurance and Health Insurance — the two most essential policies every Indian family should have." },
    { q: "How is PM Partners different from buying directly?", a: "You get unbiased advice across multiple insurers. We help you compare, clarify, and choose — something no single insurer's website can offer." },
    { q: "Do you offer post-purchase support?", a: "Yes. Once you buy through us, we remain your point of contact for renewals, endorsements, and claims — for the life of the policy." },
    { q: "How do I book a call?", a: "Just click 'Compare Plans' anywhere on our website. Pick a convenient slot and one of our advisors will call you at that time." },
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

    const [searchQuery, setSearchQuery] = useState("")
    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const [page, setPage] = useState(0)

    const filteredFaqs = ALL_FAQS.filter(faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const isSearching = searchQuery.trim().length > 0
    const totalPages = Math.ceil(filteredFaqs.length / PAGE_SIZE)
    
    // If searching, show all matched FAQs without pagination. Otherwise, paginate.
    const pageFaqs = isSearching ? filteredFaqs : filteredFaqs.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

    function toggle(idx: number) {
        setOpenIndex(prev => (prev === idx ? null : idx))
    }

    function goToPage(p: number) {
        setPage(p)
        setOpenIndex(0) // open first item on the new page
    }

    return (
        <section
            className="relative overflow-hidden border-b border-emerald-100 bg-slate-50/30 py-24 lg:py-32"
        >
            {/* Subtle premium radial glow */}
            <div className="absolute inset-0 gold-mesh opacity-55 pointer-events-none" />
            
            {/* Ambient visual bubbles */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none opacity-[0.03] blur-[80px]"
                style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full pointer-events-none opacity-[0.03] blur-[100px]"
                style={{ background: "radial-gradient(circle, var(--text-primary) 0%, transparent 70%)" }} />

            <div className="relative max-w-7xl mx-auto px-6 z-10">
                {/* TOP HEADER */}
                <div className="text-center mb-16 md:mb-20 text-left">
                    <span
                        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100 mb-4"
                    >
                        <HelpCircle className="w-3.5 h-3.5" />
                        Got questions?
                    </span>
                    <h2
                        className="text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-sm sm:text-base max-w-lg text-slate-600">
                        Everything you need to know about how PM Partners works, our consultation model, and how we protect you.
                    </p>
                </div>

                {/* CONTENT — left stat cards + right accordion */}
                <div className="grid lg:grid-cols-[360px_1fr] gap-12 lg:gap-16">

                    {/* LEFT — stats + illustration */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            {[
                                { icon: <Star className="w-5 h-5 text-emerald-600" />, value: "Highly Rated", label: "Expert Advisory", sub: "Loved by Indian families" },
                                { icon: <PhoneCall className="w-5 h-5 text-emerald-600" />, value: "100% Free", label: "Consultation", sub: "No hidden charges ever" },
                                { icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />, value: "Safe & Secure", label: "Data Privacy", sub: "Your data is always encrypted" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-[24px] p-5 flex items-center gap-4 border bg-white border-slate-100 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-100 text-left"
                                    style={{ 
                                        boxShadow: "0 4px 20px rgba(10, 17, 40, 0.01)" 
                                    }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100 bg-emerald-50 shadow-sm shadow-emerald-50"
                                    >
                                        {s.icon}
                                    </div>
                                    <div>
                                        <p className="text-base sm:text-lg font-extrabold leading-tight text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                                            {s.value}
                                        </p>
                                        <p className="text-[10px] font-extrabold uppercase tracking-wider mt-0.5 text-emerald-600">{s.label}</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>{s.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Premium custom generated FAQ advisor card */}
                        <div
                            className="rounded-[28px] overflow-hidden border border-emerald-100 bg-white p-6 shadow-[0_12px_45px_-12px_rgba(0,179,134,0.08)] hover:scale-[1.01] transition-transform duration-300"
                        >
                            <img
                                src="/uploads/faq_advisor.png"
                                alt="PM Partners Advisory Specialist Illustration"
                                className="w-full h-44 rounded-2xl mb-4 border border-emerald-50 object-cover shadow-sm"
                            />
                            <p className="text-sm font-bold text-slate-800 text-center">PM Partners's Trust Promise</p>
                            <p className="text-[11px] text-slate-400 font-medium text-center mt-1">100% spam-free advisory consultation</p>
                        </div>
                    </div>

                    {/* RIGHT — search + accordion */}
                    <div className="flex flex-col">
                        {/* Search Input Box */}
                        <div className="mb-6 relative">
                            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setPage(0)
                                    setOpenIndex(0)
                                }}
                                placeholder="Search frequently asked questions..."
                                className="w-full pl-12 pr-12 py-4 rounded-[20px] border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white transition-all text-sm placeholder:text-slate-400 font-semibold text-slate-700 shadow-sm shadow-emerald-50/20"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("")
                                        setOpenIndex(0)
                                    }}
                                    className="absolute right-4.5 top-1/2 -translate-y-1/2 text-xs font-black uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* Accordion container */}
                        <div className="rounded-[32px] overflow-hidden border border-emerald-100 bg-white shadow-[0_8px_30px_-6px_rgba(0,179,134,0.03)]">
                            {pageFaqs.length > 0 ? (
                                pageFaqs.map((faq, i) => {
                                    const isOpen = openIndex === i
                                    const isLast = i === pageFaqs.length - 1
                                    const itemNumber = isSearching ? i + 1 : page * PAGE_SIZE + i + 1
                                    
                                    return (
                                        <div
                                            key={i}
                                            className="relative transition-all duration-300"
                                            style={{
                                                borderBottom: isLast ? "none" : "1px solid var(--brand-100)",
                                                background: isOpen ? "var(--brand-light)" : "#FFFFFF",
                                            }}
                                        >
                                            {/* Left green active highlight line */}
                                            <div 
                                                className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00B386] transition-transform duration-300 origin-left"
                                                style={{
                                                    transform: isOpen ? "scaleX(1)" : "scaleX(0)",
                                                }}
                                            />

                                            {/* Question Button */}
                                            <button
                                                type="button"
                                                onClick={() => toggle(i)}
                                                className="w-full flex items-center gap-5 px-6 sm:px-8 py-6 text-left group relative"
                                            >
                                                {/* Number badge */}
                                                <span
                                                    className="shrink-0 w-8 h-8 rounded-full text-xs font-black flex items-center justify-center border transition-all"
                                                    style={{
                                                        background: isOpen ? "var(--text-primary)" : "#FFFFFF",
                                                        borderColor: isOpen ? "var(--text-primary)" : "var(--brand-100)",
                                                        color: isOpen ? "#FFFFFF" : "var(--brand-dark)",
                                                    }}
                                                >
                                                    {itemNumber < 10 ? `0${itemNumber}` : itemNumber}
                                                </span>

                                                <span
                                                    className="flex-1 font-bold text-sm sm:text-base leading-snug transition-colors group-hover:text-emerald-700 text-slate-800"
                                                    style={{ fontFamily: "var(--font-heading)" }}
                                                >
                                                    {faq.q}
                                                </span>

                                                {/* Circular Toggle Indicator */}
                                                <span
                                                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all border"
                                                    style={{
                                                        background: isOpen ? "var(--brand-dark)" : "#FFFFFF",
                                                        borderColor: isOpen ? "var(--brand-dark)" : "var(--brand-100)",
                                                        color: isOpen ? "#FFFFFF" : "var(--text-muted)",
                                                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                                    }}
                                                >
                                                    {isOpen
                                                        ? <Minus className="w-3.5 h-3.5" />
                                                        : <Plus className="w-3.5 h-3.5" />
                                                    }
                                                </span>
                                            </button>

                                            {/* Answer Body — Dynamic grid transition */}
                                            <div
                                                style={{
                                                    display: "grid",
                                                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                                                    transition: "grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
                                                }}
                                            >
                                                <div style={{ overflow: "hidden" }}>
                                                    <div className="px-6 sm:px-8 pb-6 pl-[68px] sm:pl-[76px] text-left">
                                                        <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                                                            {faq.a}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="text-center py-16 bg-white px-6">
                                    <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-sm font-extrabold text-slate-700">No questions found</p>
                                    <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">We couldn't find any FAQs matching &ldquo;{searchQuery}&rdquo;. Try another term.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination — Hidden when search is active */}
                        {!isSearching && totalPages > 1 && (
                            <div className="flex items-center gap-3 mt-8 px-1">
                                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Page</span>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => goToPage(i)}
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all hover:scale-105 active:scale-95 border"
                                        style={{
                                            background: page === i ? "var(--text-primary)" : "#FFFFFF",
                                            color: page === i ? "#FFFFFF" : "var(--text-secondary)",
                                            borderColor: page === i ? "var(--text-primary)" : "var(--brand-100)",
                                            boxShadow: page === i ? "0 4px 14px rgba(10,17,40,0.1)" : "none",
                                        }}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <span className="text-xs ml-auto font-bold uppercase tracking-wider text-slate-400">
                                    {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, ALL_FAQS.length)} of {ALL_FAQS.length}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
