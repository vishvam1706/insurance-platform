"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus, HelpCircle, Star, PhoneCall, ShieldCheck, Search, Sparkles, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface FaqItem { q: string; a: string }

const DEFAULT_FAQS: FaqItem[] = [
    { q: "What is Policymine?", a: "Policymine helps you make better decisions when buying insurance. That's it. That's all we do — unbiased expert advice, completely free." },
    { q: "But what exactly do you do?", a: "We have a host of well-trained advisors who will walk you through any queries you may have and we'll even help you make a purchase. All you have to do is book a call." },
    { q: "Is it free?", a: "Yes, it's free. We do not charge any advisory or consultation fees whatsoever." },
    { q: "Do you earn commission?", a: "Yes, we do earn a commission from insurers. But our advice is never influenced by it — we recommend the best plan for you, not the one that pays us the most." },
    { q: "How quickly can I get a policy?", a: "Depending on the insurer and your medical history, you can get a policy issued within 3–7 working days after our call." },
    { q: "What if I need to make a claim?", a: "Our dedicated claims support team is available to assist you through every step of the claims process — from filing to settlement." },
    { q: "Is my data safe with you?", a: "Absolutely. We never share your personal data with third parties without your consent. All data is encrypted and stored securely." },
    { q: "Can I buy insurance for my parents?", a: "Yes. We can help you get health insurance for senior parents and term insurance for anyone with an insurable income." },
    { q: "What types of insurance do you cover?", a: "We currently specialise in Term Life Insurance and Health Insurance — the two most essential policies every Indian family should have." },
    { q: "How is Policymine different from buying directly?", a: "You get unbiased advice across multiple insurers. We help you compare, clarify, and choose — something no single insurer's website can offer." },
    { q: "Do you offer post-purchase support?", a: "Yes. Once you buy through us, we remain your point of contact for renewals, endorsements, and claims — for the life of the policy." },
    { q: "How do I book a call?", a: "Just click 'Compare Plans' anywhere on our website. Pick a convenient slot and one of our advisors will call you at that time." },
]

interface Props {
    items?: { question: string; answer: string }[]
}

const PAGE_SIZE = 6

export default function HomeFaq({ items }: Props = {}) {
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
    const pageFaqs = isSearching
        ? filteredFaqs
        : filteredFaqs.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

    function toggle(idx: number) { setOpenIndex(prev => prev === idx ? null : idx) }
    function goToPage(p: number) { setPage(p); setOpenIndex(0) }

    const TRUST_ITEMS = [
        { icon: <Star className="w-3.5 h-3.5 text-amber-500" />, iconBg: "bg-amber-50 border-amber-200", label: "Highly Rated", sub: "22,000+ reviews" },
        { icon: <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />, iconBg: "bg-emerald-50 border-emerald-200", label: "100% Free", sub: "No consultation fees" },
        { icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />, iconBg: "bg-blue-50 border-blue-200", label: "Safe & Secure", sub: "Encrypted & protected" },
    ]

    return (
        <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-50 border-t border-slate-100">

            {/* Ambient blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-orange-300 blur-[160px] opacity-[0.04] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-amber-300 blur-[160px] opacity-[0.04] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

                {/* ── Header ── */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200">
                        <HelpCircle className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Got Questions?</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-500 text-[15px] font-medium mt-3 max-w-lg leading-relaxed">
                        Everything you need to know about working with Policymine.
                    </p>
                </div>

                {/* ── Main Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10 items-start">

                    {/* ── Left: Compact Trust Panel ── */}
                    <div className="flex flex-col gap-3 lg:sticky lg:top-24">

                        {/* Advisor image — compact aspect ratio */}
                        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                            <div className="relative w-full aspect-[3/2]">
                                <Image
                                    src="/uploads/faq_advisor.png"
                                    alt="Policymine Advisor"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="px-3.5 py-3 border-t border-slate-100">
                                <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-0.5">Your Advisor</p>
                                <p className="text-[13px] font-extrabold text-slate-900 leading-snug">Here to help — not sell.</p>
                                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Real people. Zero pressure.</p>
                            </div>
                        </div>

                        {/* Trust items — ultra compact */}
                        {TRUST_ITEMS.map((s, i) => (
                            <div
                                key={i}
                                className="rounded-xl p-3 flex items-center gap-3 bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200"
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${s.iconBg}`}>
                                    {s.icon}
                                </div>
                                <div>
                                    <p className="text-[12.5px] font-extrabold text-slate-900 leading-none">{s.label}</p>
                                    <p className="text-[10.5px] text-slate-500 font-medium mt-0.5">{s.sub}</p>
                                </div>
                            </div>
                        ))}

                        {/* Spam-free — compact */}
                        <div className="rounded-xl bg-orange-50 border border-orange-200 p-3.5 flex items-start gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-white border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-[12px] font-extrabold text-slate-900 leading-none">Spam-Free Promise</p>
                                <p className="text-[11px] text-slate-600 font-medium mt-1 leading-relaxed">
                                    We never call unless you ask — ever.
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <Link
                            href="/contact"
                            className="rounded-xl bg-slate-900 hover:bg-slate-800 p-3.5 flex items-center justify-between gap-3 transition-colors group"
                        >
                            <div>
                                <p className="text-[13px] font-extrabold text-white leading-none">Still have questions?</p>
                                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Talk to an advisor — free.</p>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-400 transition-colors">
                                <ArrowRight className="w-3.5 h-3.5 text-white" />
                            </div>
                        </Link>
                    </div>

                    {/* ── Right: Search + Accordion + Pagination ── */}
                    <div className="flex flex-col gap-4">

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => { setSearchQuery(e.target.value); setPage(0); setOpenIndex(0) }}
                                placeholder="Search questions..."
                                className="w-full pl-11 pr-14 py-3.5 rounded-2xl text-[13.5px] font-semibold text-slate-700 placeholder:text-slate-400 bg-white border border-slate-200 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/8 transition-all shadow-sm"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => { setSearchQuery(""); setOpenIndex(0) }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* Search result count */}
                        {isSearching && (
                            <p className="text-[11.5px] font-bold text-slate-400 -mt-1 pl-1">
                                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
                            </p>
                        )}

                        {/* Accordion */}
                        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden divide-y divide-slate-100 shadow-sm">
                            {pageFaqs.length === 0 ? (
                                <div className="p-10 text-center">
                                    <p className="text-slate-400 font-semibold text-sm">No questions match your search.</p>
                                </div>
                            ) : pageFaqs.map((faq, i) => {
                                const isOpen = openIndex === i
                                const itemNumber = isSearching ? i + 1 : page * PAGE_SIZE + i + 1

                                return (
                                    <div
                                        key={i}
                                        className={`relative transition-colors duration-200 ${isOpen ? "bg-orange-50/50" : "hover:bg-slate-50/60"}`}
                                    >
                                        {/* Active left bar */}
                                        <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-orange-500 rounded-l-sm transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} />

                                        <button
                                            type="button"
                                            onClick={() => toggle(i)}
                                            className="w-full flex items-center gap-4 px-5 py-4 text-left focus:outline-none cursor-pointer"
                                        >
                                            <span className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black border transition-all duration-200
                                                ${isOpen ? "bg-orange-500 border-orange-500 text-white" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
                                                {String(itemNumber).padStart(2, "0")}
                                            </span>

                                            <span className={`flex-1 font-extrabold text-[14px] leading-snug transition-colors
                                                ${isOpen ? "text-slate-900" : "text-slate-700"}`}>
                                                {faq.q}
                                            </span>

                                            <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300
                                                ${isOpen
                                                    ? "bg-orange-500 border-orange-500 text-white"
                                                    : "bg-slate-50 border-slate-200 text-slate-400 hover:border-orange-300 hover:text-orange-400"
                                                }`}>
                                                {isOpen ? <Minus className="w-3 h-3 stroke-[2.5px]" /> : <Plus className="w-3 h-3 stroke-[2.5px]" />}
                                            </span>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-5 pb-5 pl-[68px]">
                                                        <p className="text-[13.5px] font-medium leading-relaxed text-slate-500">
                                                            {faq.a}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Pagination — always visible when FAQs > PAGE_SIZE */}
                        {!isSearching && totalPages > 1 && (
                            <div className="flex items-center justify-between pt-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-1">Page</span>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => goToPage(i)}
                                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black border transition-all hover:scale-105 cursor-pointer
                                                ${page === i
                                                    ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                                                    : "bg-white border-slate-200 text-slate-500 hover:border-orange-300 hover:text-orange-500"
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                <span className="text-[11px] font-bold text-slate-400">
                                    {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, ALL_FAQS.length)} of {ALL_FAQS.length} questions
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section >
    )
}