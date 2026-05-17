"use client"

import { Block, BlockType } from "@/types/blocks"
import PageRenderer from "@/components/blocks/PageRenderer"
import { Eye, X } from "lucide-react"
import { useEffect } from "react"

/* ── Sample data for each block type ── */
const SAMPLE_DATA: Partial<Record<BlockType, Record<string, unknown>>> = {
    hero: {
        title: "What is Term Insurance & Why You Need It",
        subtitle: "A comprehensive guide to term life insurance in India",
        author: { name: "Rahul Sharma", role: "Insurance Writer" },
        reviewer: { name: "Dr. Priya Nair", role: "IRDAI-Certified Expert" },
    },
    rich_text: {
        content: "<h2>Understanding Term Insurance</h2><p>Term insurance is the simplest and most affordable form of life insurance. You pay a premium for a specific period, and if something happens during that period, your family receives the sum assured.</p><p>Unlike traditional plans, term insurance has <strong>no maturity benefit</strong> — it's pure protection.</p>",
    },
    image_block: {
        image: "https://placehold.co/800x400/e2e8f0/64748b?text=Insurance+Infographic",
        caption: "How term insurance works — a visual guide",
        altText: "Term insurance diagram",
    },
    how_it_works_steps: {
        title: "How to Buy Term Insurance",
        steps: [
            { text: "Calculate the right cover amount based on your income" },
            { text: "Compare plans from top insurers on claim settlement ratio" },
            { text: "Fill out the application form with accurate health details" },
            { text: "Complete medical tests if required by the insurer" },
        ],
    },
    benefits_list: {
        title: "Benefits of Term Insurance",
        items: [
            { heading: "Affordable Premiums", body: "Get ₹1 Crore cover for as low as ₹500/month" },
            { heading: "Tax Benefits", body: "Premiums qualify for deduction under Section 80C" },
            { heading: "Family Protection", body: "Ensures your family's financial security in your absence" },
        ],
    },
    types_list: {
        title: "Types of Term Insurance",
        items: [
            { type: "Level Cover", feature: "Same cover throughout the policy term", example: "₹1 Cr for 30 years" },
            { type: "Increasing Cover", feature: "Cover increases yearly to beat inflation", example: "Starts at ₹1 Cr, grows 5% yearly" },
            { type: "Decreasing Cover", feature: "Cover reduces as liabilities decrease", example: "Linked to home loan balance" },
        ],
    },
    info_section: {
        title: "Who Should Buy Term Insurance?",
        body: "Anyone with financial dependents should buy term insurance. If your family depends on your income — spouse, children, parents — term insurance ensures they're protected even in your absence.",
    },
    note_box: {
        label: "Take Note",
        content: "Always declare your complete medical history honestly. Non-disclosure is the #1 reason claims get rejected in India.",
    },
    dittos_take: {
        title: "Ditto's Take",
        body: "We recommend buying term insurance as early as possible. A 25-year-old can get ₹1 Cr cover for roughly ₹600/month — the same plan at 35 would cost nearly double.",
    },
    numbered_cards: {
        title: "Top 3 Term Insurance Plans",
        cards: [
            { number: 1, title: "HDFC Click 2 Protect", body: "Best overall — 99.1% claim settlement ratio" },
            { number: 2, title: "ICICI iProtect Smart", body: "Great rider options and flexible premium terms" },
            { number: 3, title: "Max Life Smart Secure Plus", body: "Excellent customer service and 99.5% CSR" },
        ],
    },
    final_thoughts: {
        title: "Final Thoughts",
        body: "Term insurance is the foundation of any financial plan. Don't delay — the younger you are, the cheaper it is.",
    },
    features_table: {
        title: "Key Features Comparison",
        rows: [
            { aspect: "Claim Settlement", feature: "99.1% (FY 2023-24)" },
            { aspect: "Max Cover", feature: "₹25 Crore" },
            { aspect: "Policy Term", feature: "Up to 85 years of age" },
        ],
    },
    comparison_table: {
        title: "Term vs Endowment Plans",
        columns: ["Feature", "Term Plan", "Endowment Plan"],
        rows: [
            ["Premiums", "₹600/month", "₹5,000/month"],
            ["Cover Amount", "₹1 Crore", "₹10 Lakhs"],
            ["Maturity Benefit", "None", "Sum assured + bonus"],
        ],
    },
    pros_cons_table: {
        title: "Pros & Cons of Term Insurance",
        pros: ["Very affordable premiums", "High coverage amount", "Tax benefits under 80C"],
        cons: ["No maturity benefit", "No cash value", "Premium increases with age"],
    },
    plans_table: {
        title: "Top Plans Comparison",
        rows: [
            { plan: "HDFC Click 2 Protect", riders: "6 riders", csr: "99.1%", rating: "★★★★★" },
            { plan: "ICICI iProtect Smart", riders: "5 riders", csr: "98.7%", rating: "★★★★☆" },
        ],
    },
    insurer_metrics: {
        title: "Insurer Health Check",
        metrics: [
            { number: 1, title: "Claim Settlement Ratio", body: "Percentage of claims approved vs total claims filed" },
            { number: 2, title: "Solvency Ratio", body: "Financial strength — should be above 1.5x" },
        ],
    },
    policy_features_list: {
        title: "Policy Features",
        features: [
            { title: "Return of Premium", body: "Get all premiums back if you survive the policy term" },
            { title: "Waiver of Premium", body: "Premiums waived in case of critical illness or disability" },
        ],
    },
    real_example_comparison: {
        title: "Real Plan Comparison",
        plan1: { insurer: "HDFC Life", planName: "Click 2 Protect Life", recommended: true },
        plan2: { insurer: "ICICI Prudential", planName: "iProtect Smart", recommended: false },
        rows: [
            { parameter: "Annual Premium", plan1Value: "₹12,500", plan2Value: "₹13,200", plan1Good: true, plan2Good: false },
            { parameter: "CSR", plan1Value: "99.1%", plan2Value: "98.7%", plan1Good: true, plan2Good: false },
        ],
    },
    insurer_selector: {
        label: "Select Insurer",
        helpText: "Choose an insurer to view detailed analysis",
        insurers: [
            { name: "HDFC Life", slug: "hdfc-life" },
            { name: "ICICI Prudential", slug: "icici-prudential" },
            { name: "Max Life", slug: "max-life" },
        ],
    },
    calculator_embed: {
        title: "Term Insurance Calculator",
        description: "Calculate how much term cover you need",
        calculatorType: "cover",
    },
    frequently_compared: {
        title: "Frequently Compared",
        links: [
            { label: "HDFC vs ICICI Term Plan", url: "/term-life/hdfc-vs-icici" },
            { label: "Term vs Whole Life Insurance", url: "/term-life/term-vs-whole-life" },
        ],
    },
    reviews: {
        rating: 4.9,
        totalCount: 21000,
        items: [
            { name: "Arjun M.", initials: "AM", body: "Excellent advice! Got my ₹1 Cr term plan sorted in 20 minutes." },
            { name: "Priya S.", initials: "PS", body: "No pushy sales. They genuinely helped me pick the right plan." },
        ],
    },
    cta_block: {
        title: "Confused about which plan to pick?",
        bookCallText: "Book a Free Call",
        whatsappText: "Chat on WhatsApp",
    },
    faq: {
        items: [
            { question: "What is term insurance?", answer: "Term insurance is a pure life insurance product that provides coverage for a specific period." },
            { question: "How much cover do I need?", answer: "A good rule of thumb is 10-15x your annual income." },
        ],
    },
    stat_bar: {
        stats: [
            { value: "8,00,000+", label: "Customers helped" },
            { value: "4.9", label: "Average rating" },
            { value: "₹0", label: "Consultation cost" },
        ],
    },
    home_hero: {
        badge: "IRDAI-Certified Expert Advisors",
        title: "Life & Health Insurance Platform",
        subtitle: "Get unbiased insurance advice from certified experts. Free forever.",
        primaryCta: { text: "Book Free Call", href: "/contact" },
        stats: [{ value: "8L+", label: "Customers" }, { value: "4.9★", label: "Rating" }],
        showInquiryForm: false,
    },
    product_cards: {
        title: "What we cover",
        cards: [
            { title: "Term Life Insurance", desc: "Pure protection at lowest premiums", href: "/term-life", colorClass: "emerald" },
            { title: "Health Insurance", desc: "Comprehensive family coverage", href: "/health", colorClass: "blue" },
        ],
    },
    ditto_experience: {},
    comparison_section: {},
    insurance_checklist: {},
    home_faq: {
        items: [
            { question: "Is Ditto really free?", answer: "Yes, our advisory service is completely free. We earn commissions from insurers." },
            { question: "How is Ditto different?", answer: "We don't push products. Our advisors help you find what's right for your situation." },
        ],
    },
    choose_ditto_cta: {
        headline: "Why choose Ditto?",
        subtext: "Unbiased advice from IRDAI-certified experts",
        ctaText: "Book a free call",
        ctaHref: "/contact",
    },
}

/** Merge block data with sample data — use current if it has content, else sample */
function getPreviewData(block: Block): Record<string, unknown> {
    const sample = SAMPLE_DATA[block.type] || {}
    const current = block.data || {}
    const hasContent = Object.values(current).some(
        (v) => v !== "" && v !== undefined && v !== null && !(Array.isArray(v) && v.length === 0)
    )
    return hasContent ? { ...sample, ...current } : sample
}

interface BlockPreviewProps {
    block: Block
    onClose: () => void
}

export default function BlockPreview({ block, onClose }: BlockPreviewProps) {
    const previewBlock: Block = {
        id: block.id,
        type: block.type,
        data: getPreviewData(block),
    }

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => { document.body.style.overflow = "" }
    }, [])

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [onClose])

    const meta = block.type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-5xl mx-4 mt-8 mb-8 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                style={{ maxHeight: "calc(100vh - 64px)" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Eye className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">Preview — {meta}</p>
                            <p className="text-[11px] text-slate-400">How this block appears on the live page</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Close
                    </button>
                </div>

                {/* Preview content */}
                <div className="flex-1 overflow-auto bg-[#F7F8FA]">
                    <div className="bg-white max-w-none">
                        <PageRenderer blocks={[previewBlock]} />
                    </div>
                </div>
            </div>
        </div>
    )
}
