export type BlockType =
    | "hero"
    | "rich_text"
    | "image_block"
    | "how_it_works_steps"
    | "benefits_list"
    | "types_list"
    | "info_section"
    | "note_box"
    | "dittos_take"
    | "numbered_cards"
    | "final_thoughts"
    | "features_table"
    | "comparison_table"
    | "pros_cons_table"
    | "plans_table"
    | "insurer_metrics"
    | "policy_features_list"
    | "real_example_comparison"
    | "insurer_selector"
    | "calculator_embed"
    | "frequently_compared"
    | "reviews"
    | "cta_block"
    | "stat_bar"
    | "faq"
    | "home_hero"
    | "product_cards"
    | "ditto_experience"
    | "comparison_section"
    | "insurance_checklist"
    | "home_faq"
    | "choose_ditto_cta"

export interface Block {
    id: string
    type: BlockType
    data: Record<string, unknown>
    tocExclude?: boolean   // Hide this block's headings from the Table of Contents
    tocLabel?: string      // Custom label override for ToC (replaces auto-detected heading)
}

// Hero
export interface HeroBlockData {
    title: string
    subtitle?: string
    publishedDate?: string
    author?: { name: string; role: string; avatar?: string }
    reviewer?: { name: string; role: string; avatar?: string }
    certificationId?: string
    backgroundImage?: string
}

// Rich Text
export interface RichTextBlockData {
    content: string
    inlineImage?: string
}

// Image
export interface ImageBlockData {
    image: string
    caption?: string
    altText?: string
}

// Steps
export interface StepsBlockData {
    title: string
    steps: { text: string; icon?: string }[]
    sideImage?: string
}

// Benefits List
export interface BenefitsListData {
    title: string
    items: { heading: string; body: string; icon?: string }[]
    sideImage?: string
}

// Types List
export interface TypesListData {
    title: string
    items: { type: string; feature: string; example?: string; image?: string }[]
    note?: string
}

// Info Section
export interface InfoSectionData {
    title: string
    body: string
    image?: string
}

// Note Box
export interface NoteBoxData {
    label: string
    content: string
    icon?: string
}

// Ditto's Take
export interface DittosTakeData {
    title: string
    body: string
    advisorImage?: string
}

// Numbered Cards
export interface NumberedCardsData {
    title: string
    quickTake?: string
    cards: { number: number; title: string; body: string; image?: string }[]
}

// Final Thoughts
export interface FinalThoughtsData {
    title: string
    body: string
}

// Features Table
export interface FeaturesTableData {
    title: string
    note?: string
    rows: { aspect: string; feature: string }[]
}

// Comparison Table
export interface ComparisonTableData {
    title: string
    columns: string[]
    rows: string[][]
}

// Pros Cons Table
export interface ProsConsTableData {
    title: string
    pros: string[]
    cons: string[]
}

// Plans Table
export interface PlansTableData {
    title: string
    introText?: string
    rows: {
        plan: string
        logo?: string
        riders: string
        csr: string
        rating: string
        dittoRating?: number
    }[]
}

// Insurer Metrics
export interface InsurerMetricsData {
    title: string
    metrics: {
        number: number
        title: string
        body: string
        thresholds?: { label: string; verdict: "good" | "okay" | "avoid" }[]
        csrTable?: { company: string; logo?: string; csr: string }[]
        image?: string
    }[]
}

// Policy Features List
export interface PolicyFeaturesListData {
    title: string
    features: { title: string; body: string; icon?: string }[]
}

// Real Example Comparison
export interface RealExampleComparisonData {
    title: string
    plan1: { insurer: string; planName: string; logo?: string; recommended: boolean }
    plan2: { insurer: string; planName: string; logo?: string; recommended: boolean }
    rows: {
        parameter: string
        plan1Value: string
        plan2Value: string
        plan1Good: boolean
        plan2Good: boolean
    }[]
}

// Insurer Selector
export interface InsurerSelectorData {
    label: string
    helpText?: string
    insurers: { name: string; logo?: string; slug: string }[]
}

// Calculator Embed
export interface CalculatorEmbedData {
    title: string
    description?: string
    calculatorType: "cover" | "premium" | "comparison"
}

// Frequently Compared
export interface FrequentlyComparedData {
    title: string
    links: { label: string; url: string; thumbnail?: string }[]
}

// Reviews
export interface ReviewsBlockData {
    rating: number
    totalCount: number
    platformLogo?: string
    items: { name: string; initials: string; body: string; avatar?: string }[]
}

// CTA Block
export interface CtaBlockData {
    title: string
    bookCallText: string
    whatsappText: string
    advisorImage?: string
    whatsappNumber?: string
}

// Stat Bar
export interface StatBarData {
    stats: { value: string; label: string; icon?: string }[]
}

// FAQ
export interface FaqBlockData {
    items: { question: string; answer: string }[]
}

// Home Hero
export interface HomeHeroBlockData {
    badge?: string
    title: string
    subtitle?: string
    primaryCta?: { text: string; href: string }
    secondaryCta?: { text: string; href: string }
    stats?: { value: string; label: string }[]
    showInquiryForm?: boolean
}

// Product Cards
export interface ProductCardsBlockData {
    title: string
    cards: {
        title: string
        desc: string
        href: string
        colorClass: string
    }[]
}

// Ditto Experience
export interface DittoExperienceBlockData {
    steps?: { num: string; title: string; body: string }[]
}

// Comparison Section
export interface ComparisonSectionBlockData {
    title?: string
    subtitle?: string
}

// Insurance Checklist
export interface InsuranceChecklistBlockData {
    heading?: string
    body?: string
}

// Home FAQ
export interface HomeFaqBlockData {
    items: { question: string; answer: string }[]
}

// Choose Ditto CTA
export interface ChooseDittoCataBlockData {
    heading?: string
}