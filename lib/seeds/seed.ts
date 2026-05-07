import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import * as dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

import User from "../models/User"
import PageContent from "../models/PageContent"
import InsurancePlan from "../models/InsurancePlan"

async function seed() {
    const uri = process.env.MONGODB_URI
    if (!uri) throw new Error("MONGODB_URI not defined")

    await mongoose.connect(uri)
    console.log("✅ Connected to MongoDB")

    // ── USERS ──────────────────────────────────────────────
    await User.deleteMany({})
    console.log("🗑  Cleared users")

    const superHash = await bcrypt.hash("SuperAdmin@123", 12)
    const adminHash = await bcrypt.hash("Admin@123", 12)
    const empHash = await bcrypt.hash("Employee@123", 12)

    const superAdmin = await User.create({
        name: "Super Admin",
        email: "superadmin@platform.com",
        passwordHash: superHash,
        role: "super_admin",
        status: "active",
    })

    const admin = await User.create({
        name: "Platform Admin",
        email: "admin@platform.com",
        passwordHash: adminHash,
        role: "admin",
        status: "active",
        createdBy: superAdmin._id,
    })

    await User.create({
        name: "Ravi Sharma",
        email: "ravi@platform.com",
        passwordHash: empHash,
        role: "employee",
        state: "Gujarat",
        language: "Gujarati",
        status: "active",
        createdBy: admin._id,
    })

    await User.create({
        name: "Priya Nair",
        email: "priya@platform.com",
        passwordHash: empHash,
        role: "employee",
        state: "Maharashtra",
        language: "Marathi",
        status: "pending",
        createdBy: admin._id,
    })

    console.log("✅ Users seeded")

    // ── INSURANCE PLANS ────────────────────────────────────
    await InsurancePlan.deleteMany({})
    console.log("🗑  Cleared insurance plans")

    await InsurancePlan.insertMany([
        {
            slug: "axis-max-life-smart-term-plan-plus",
            insurer: "Axis Max Life",
            planName: "Smart Term Plan Plus",
            type: "term",
            features: {
                criticalIllness: true,
                accidentalDeath: true,
                terminalIllness: true,
                waiverOfPremium: true,
                zeroCostExit: true,
            },
            csr: "99.62%",
            dittoRating: 4.65,
        },
        {
            slug: "hdfc-life-click2protect-supreme-plus",
            insurer: "HDFC Life",
            planName: "Click2Protect Supreme Plus",
            type: "term",
            features: {
                criticalIllness: true,
                accidentalDeath: true,
                terminalIllness: true,
                waiverOfPremium: true,
                spousecover: true,
            },
            csr: "99.55%",
            dittoRating: 4.55,
        },
        {
            slug: "hdfc-ergo-optima-restore",
            insurer: "HDFC Ergo",
            planName: "Optima Restore",
            type: "health",
            features: {
                networkHospitals: 13000,
                csr: 97,
                coPayment: false,
                roomRent: "Any Room",
                diseaseSubLimit: false,
                preExistingWaiting: "3 years",
                prePostHospitalization: "60/180 days",
                noClaimBonus: "50% per year up to 100%",
                restoration: "100% once for any illness",
                maternity: false,
                opdCover: false,
                ayush: true,
                healthCheckup: "Once every year",
            },
            csr: "97%",
            dittoRating: 4.5,
        },
        {
            slug: "niva-bupa-reassure",
            insurer: "Niva Bupa",
            planName: "ReAssure",
            type: "health",
            features: {
                networkHospitals: 10000,
                csr: 92,
                coPayment: false,
                roomRent: "Any Room",
                diseaseSubLimit: true,
                preExistingWaiting: "3 years",
                prePostHospitalization: "60/180 days",
                noClaimBonus: "50% per year up to 100%",
                restoration: "100% unlimited for any illness",
                maternity: false,
                opdCover: false,
                ayush: true,
                healthCheckup: "Once every year",
            },
            csr: "92%",
            dittoRating: 4.2,
        },
    ])

    console.log("✅ Insurance plans seeded")

    // ── PAGE CONTENT ───────────────────────────────────────
    await PageContent.deleteMany({})
    console.log("🗑  Cleared page content")

    await PageContent.create({
        pageKey: "term-life/what-is-term-insurance",
        title: "What is Term Insurance?",
        section: "term-life",
        published: true,
        seo: {
            metaTitle: "What is Term Insurance? Complete Guide 2026",
            metaDescription:
                "Learn how term insurance works, its types, benefits, and how to buy the right plan for your family.",
            keywords: ["term insurance", "term life insurance india", "what is term insurance"],
        },
        blocks: [
            {
                id: "b1",
                type: "hero",
                data: {
                    title: "What is Term Insurance?",
                    publishedDate: "20 Feb, 2026",
                    author: { name: "Subhashish Banerjee", role: "Insurance Writer" },
                    reviewer: { name: "Gaurav Bhat", role: "IRDAI-Certified Expert at Ditto" },
                    certificationId: "SP0738578124",
                },
            },
            {
                id: "b2",
                type: "rich_text",
                data: {
                    content:
                        "<p>Insurance in India is gradually growing. In FY 2025, the average premium per person rose to USD 97 from USD 95 in FY 2024. Term insurance stands out as a simple, cost-effective way to ensure your family's financial security.</p><p>Most people spend years building savings and assets but forget to protect them. That's where term insurance steps in — it acts like a financial safety net.</p>",
                },
            },
            {
                id: "b3",
                type: "note_box",
                data: {
                    label: "Take Note",
                    content:
                        "Term insurance is a type of life insurance plan that pays a death benefit if you die during the policy term. It does not offer savings or maturity payouts, so premiums are lower than plans like endowment policies or ULIPs.",
                },
            },
            {
                id: "b4",
                type: "how_it_works_steps",
                data: {
                    title: "How Term Life Insurance Works?",
                    steps: [
                        { text: "You pick your sum assured (SA), policy term, and premium payment option." },
                        { text: "The insurer evaluates your overall profile based on underwriting guidelines." },
                        { text: "Once your term policy is issued, you keep paying premiums to maintain the cover." },
                        { text: "If you pass away during the term, your nominee receives the chosen benefit." },
                        { text: "If you survive the term, the policy ends without any payout unless you opted for return-of-premium." },
                    ],
                },
            },
            {
                id: "b5",
                type: "features_table",
                data: {
                    title: "Key Features of Term Insurance",
                    note: "Such features and eligibility may vary from plan to plan.",
                    rows: [
                        { aspect: "Entry Age", feature: "Minimum 18, Maximum 65 years" },
                        { aspect: "Maturity Age", feature: "Minimum 28, Maximum 85 years (up to 99/100 for whole life)" },
                        { aspect: "Payout Options", feature: "Lump sum, monthly income, and combined" },
                        { aspect: "Premium Payment Mode", feature: "Annual, half-yearly, quarterly, and monthly" },
                        { aspect: "Premium Paying Term", feature: "Regular pay, limited pay, single pay" },
                    ],
                },
            },
            {
                id: "b6",
                type: "benefits_list",
                data: {
                    title: "Benefits of Term Insurance",
                    items: [
                        { heading: "Debt and Dependent Protection", body: "A term plan acts as a replacement for your income and outstanding loans." },
                        { heading: "Protection Against Goal Failure", body: "Safeguards children's education, rent, childcare, and elder care." },
                        { heading: "Rider Benefits", body: "Critical Illness, Accidental Total & Permanent Disability, and Waiver of Premium." },
                        { heading: "Higher Coverage at Lower Premiums", body: "Term life insurance offers high coverage at more affordable premiums." },
                        { heading: "Tax Benefits", body: "Under Section 80C, claim up to ₹1.5 lakh deduction. Death benefit is tax-free under Section 10(10D)." },
                    ],
                },
            },
            {
                id: "b7",
                type: "cta_block",
                data: {
                    title: "Talk to an expert today and find the right insurance for you.",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "b8",
                type: "types_list",
                data: {
                    title: "Types of Term Insurance",
                    items: [
                        { type: "Level", feature: "SA fixed throughout the policy term. Premiums also stay constant.", example: "Bajaj Life eTouch II" },
                        { type: "Increasing", feature: "Cover amount rises every year or at set intervals — keeps up with inflation.", example: "HDFC Life Click2Protect Supreme Plus" },
                        { type: "Decreasing", feature: "SA reduces each year, usually in line with falling liabilities like home loans.", example: "HDFC Life Click2Protect Supreme Plus (Life Goal variant)" },
                        { type: "Return of Premium (TROP)", feature: "Returns base premiums if you survive the policy term.", example: "Axis Max Life, HDFC Click2Protect Supreme Plus" },
                    ],
                },
            },
            {
                id: "b9",
                type: "faq",
                data: {
                    items: [
                        { question: "Can my policy lapse even if auto-debit is active?", answer: "Yes. Auto-debit can fail due to bank mandate issues, low balance, or technical errors. Always set personal reminders for renewal dates." },
                        { question: "Why do insurers ask for bank statements or income proof?", answer: "When you apply for term covers, insurers verify financial eligibility. Keep one clean account with clear income records." },
                        { question: "How long does it take to issue a term policy?", answer: "Usually 7 to 10 working days if all documents and medicals are clear. May take up to 4 weeks if additional tests are required." },
                        { question: "How long does a term insurance claim take to settle?", answer: "For straightforward death claims, insurers typically settle within 15 days of claim intimation." },
                    ],
                },
            },
            {
                id: "b10",
                type: "reviews",
                data: {
                    rating: 4.9,
                    totalCount: 20915,
                    items: [
                        { name: "INDHUMATHI M", initials: "I", body: "Ditto is doing really great. Absolutely spam free — that's the best part. Advisor Nuha was very patient and answered all my questions with clarity." },
                        { name: "Ragul Kumar", initials: "RK", body: "Loved the service! Maheta Nidhi Hitesh was incredibly helpful and knowledgeable. No pressure at all, just clear and honest advice." },
                        { name: "Samil Shah", initials: "SS", body: "Ishita Sudrania was extremely helpful in guiding me through choosing the right term plan. Highly recommend!" },
                    ],
                },
            },
        ],
    })

    await PageContent.create({
        pageKey: "term-life/term-vs-life-insurance",
        title: "Term Insurance vs Life Insurance",
        section: "term-life",
        published: true,
        seo: {
            metaTitle: "Term Insurance vs Life Insurance — Key Differences 2026",
            metaDescription: "Understand the difference between term insurance and life insurance and which one is right for you.",
            keywords: ["term vs life insurance", "difference term life insurance"],
        },
        blocks: [
            {
                id: "b1",
                type: "hero",
                data: {
                    title: "Term Insurance vs Life Insurance",
                    author: { name: "Pratyusha Chatterjee", role: "Insurance Writer" },
                    reviewer: { name: "Gaurav Bhat", role: "IRDAI-Certified Expert at Ditto" },
                    certificationId: "SP0738578124",
                },
            },
            {
                id: "b2",
                type: "rich_text",
                data: {
                    content: "<p>Once upon a time, life insurance in India meant just two things: LIC's familiar jingle and an agent who somehow always knew when you'd just received your salary. Today, India's insurance market is crowded with digital-first insurers and smarter products. One important question remains: term insurance vs life insurance.</p>",
                },
            },
            {
                id: "b3",
                type: "comparison_table",
                data: {
                    title: "Difference Between Term Insurance and Life Insurance",
                    columns: ["Feature", "Term Insurance", "Other Life Insurance Products"],
                    rows: [
                        ["Cover Amount", "High — death benefit only (20-30x annual income)", "Limited (usually 5-10x annual premiums)"],
                        ["Payout", "Lump sum to family if you die during policy term", "Death benefit + maturity benefit if you survive"],
                        ["Premium Amount", "Low — ₹12,000/yr for ₹1 crore cover (25-yr non-smoker)", "Higher — 5-10x term plan premiums"],
                        ["Maturity Benefits", "No (unless TROP opted)", "Yes, if you survive the term"],
                        ["Risk vs Savings", "Pure risk cover", "Risk plus savings or investment"],
                        ["Tenure", "Fixed term (10, 20, or 30 years)", "Whole life or long term till age 99/100"],
                        ["Tax Benefit", "Section 80C & 10(10D)", "Section 80C & 10(10D)"],
                    ],
                },
            },
            {
                id: "b4",
                type: "cta_block",
                data: {
                    title: "Talk to an expert today and find the right insurance for you.",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "b5",
                type: "plans_table",
                data: {
                    title: "Ditto's Recommended Term Plans (2026)",
                    rows: [
                        { plan: "Axis Max Life Smart Term Plan Plus", riders: "Accidental Death, Critical Illness (64 illnesses), Zero-Cost Exit, Women's Perks", csr: "99.62%", rating: "4.65/5", dittoRating: 4.65 },
                        { plan: "HDFC Life Click2Protect Supreme Plus", riders: "Accidental Death, Waiver of Premium, Critical Illness (60 illnesses), Spouse Cover", csr: "99.55%", rating: "4.55/5", dittoRating: 4.55 },
                        { plan: "ICICI Prudential iProtect Smart Plus", riders: "Accidental Death, Life Stage Benefit, Critical Illness (60 illnesses), Zero Cost Option", csr: "98.03%", rating: "4.30/5", dittoRating: 4.30 },
                        { plan: "Bajaj Life eTouch II", riders: "Accidental Death, Life Stage Benefit, Critical Illness (60 illnesses), Zero Cost Option", csr: "99.21%", rating: "4.20/5", dittoRating: 4.20 },
                    ],
                },
            },
            {
                id: "b6",
                type: "dittos_take",
                data: {
                    title: "Ditto's Take: Term vs Life Insurance",
                    body: "At Ditto, we usually recommend pure term insurance as the most efficient way to protect your family. It gives you a large cover at a very low premium because it does not mix insurance with investment. Use term insurance for safety. Use mutual funds, PPF, or FDs for growth.",
                },
            },
            {
                id: "b7",
                type: "faq",
                data: {
                    items: [
                        { question: "Is term insurance a waste if I survive the term?", answer: "No. It protects your income during crucial years. Surviving the term means your goals stay on track." },
                        { question: "Is term insurance also life insurance?", answer: "Yes. It's the purest form of life insurance. Other plans combine coverage with savings." },
                        { question: "Can I buy both term insurance and life insurance?", answer: "Yes. Many people use term insurance for high-value financial protection and choose separate investment products for savings." },
                    ],
                },
            },
            {
                id: "b8",
                type: "reviews",
                data: {
                    rating: 4.9,
                    totalCount: 20915,
                    items: [
                        { name: "Pulkit Singh", initials: "PS", body: "Had a great experience with Ditto while exploring health insurance options. Everything was explained clearly with no pressure." },
                        { name: "Raghappriya M", initials: "RM", body: "Great experience with Ditto while filing my health insurance claim. Their support made the process much smoother." },
                    ],
                },
            },
        ],
    })

    await PageContent.create({
        pageKey: "health/compare-plans",
        title: "Compare Health Insurance Plans",
        section: "health",
        published: true,
        seo: {
            metaTitle: "Compare Health Insurance Plans India 2026",
            metaDescription: "Compare health insurance plans from top-rated insurers side by side.",
            keywords: ["compare health insurance", "health insurance comparison india"],
        },
        blocks: [
            {
                id: "b1",
                type: "hero",
                data: {
                    title: "Compare Health Insurance Plans",
                    subtitle: "Compare health insurance plans from top-rated insurers and clearly see the differences in coverage, premiums, and features.",
                },
            },
            {
                id: "b2",
                type: "insurer_selector",
                data: {
                    label: "Select Insurer",
                    helpText: "Let us know your insurer to compare plans.",
                    insurers: [
                        { name: "Acko", slug: "acko" },
                        { name: "Aditya Birla", slug: "aditya-birla" },
                        { name: "Bajaj General", slug: "bajaj-general" },
                        { name: "Care", slug: "care" },
                        { name: "HDFC Ergo", slug: "hdfc-ergo" },
                        { name: "ICICI Lombard", slug: "icici-lombard" },
                        { name: "Iffco Tokio", slug: "iffco-tokio" },
                        { name: "Manipal Cigna", slug: "manipal-cigna" },
                        { name: "Niva Bupa", slug: "niva-bupa" },
                        { name: "National Insurance", slug: "national-insurance" },
                        { name: "Navi", slug: "navi" },
                        { name: "New India Assurance", slug: "new-india-assurance" },
                        { name: "Star Health", slug: "star-health" },
                        { name: "TATA AIG", slug: "tata-aig" },
                    ],
                },
            },
            {
                id: "b3",
                type: "rich_text",
                data: {
                    content: "<p>Comparing health insurance plans isn't about finding the 'best' plan on paper. It's more about finding the right plan for you, your health, your family, and your budget.</p>",
                },
            },
            {
                id: "b4",
                type: "numbered_cards",
                data: {
                    title: "How to Compare Health Insurance Plans?",
                    quickTake: "You can compare health insurance policies along two verticals.",
                    cards: [
                        { number: 1, title: "Compare Insurers", body: "Evaluate operational performance, claim settlement figures, business scale and Net Promoter Score." },
                        { number: 2, title: "Compare Policies", body: "Look at policy features, price point, and specific use cases to make a qualified choice." },
                    ],
                },
            },
            {
                id: "b5",
                type: "cta_block",
                data: {
                    title: "Talk to an expert today and find the right insurance for you.",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "b6",
                type: "insurer_metrics",
                data: {
                    title: "Comparing Insurers — How to decide which insurance company is better?",
                    metrics: [
                        {
                            number: 1,
                            title: "Track Record",
                            body: "A good insurance company should have an extensive track record. Any company with 10+ years is a good bet. 5+ years is decent. Avoid companies with less than 5 years.",
                            thresholds: [
                                { label: "10+ years", verdict: "good" },
                                { label: "5-10 years", verdict: "okay" },
                                { label: "Under 5 years", verdict: "avoid" },
                            ],
                        },
                        {
                            number: 2,
                            title: "Network Hospitals",
                            body: "A better network hospital bodes well for you. 8000+ hospitals is a decent bet. 5000-8000 is okay. Less than 5000 is a no-no.",
                            thresholds: [
                                { label: "8000+ hospitals", verdict: "good" },
                                { label: "5000-8000", verdict: "okay" },
                                { label: "Under 5000", verdict: "avoid" },
                            ],
                        },
                        {
                            number: 3,
                            title: "Claim Settlement Ratio",
                            body: "CSR tells you the percentage of claims settled by an insurer. 90%+ is stellar. 80-90% is decent. Less than 80% is a no-go.",
                            csrTable: [
                                { company: "New India Assurance", csr: "98.9%" },
                                { company: "Digit", csr: "98.6%" },
                                { company: "HDFC Ergo", csr: "96.7%" },
                                { company: "Bajaj General", csr: "96.7%" },
                                { company: "SBI", csr: "96.1%" },
                                { company: "Acko", csr: "96.5%" },
                                { company: "Aditya Birla", csr: "95.8%" },
                                { company: "National Insurance", csr: "94.6%" },
                                { company: "Niva Bupa", csr: "91.6%" },
                                { company: "Star Health", csr: "84.9%" },
                                { company: "ICICI Lombard", csr: "84.5%" },
                                { company: "Navi", csr: "71.4%" },
                            ],
                            thresholds: [
                                { label: "90%+", verdict: "good" },
                                { label: "80-90%", verdict: "okay" },
                                { label: "Under 80%", verdict: "avoid" },
                            ],
                        },
                        {
                            number: 4,
                            title: "Operational Efficiencies",
                            body: "How well do insurers deal with application errors, paperwork, and customer complaints? Private insurers generally perform better than public/government-owned companies.",
                        },
                    ],
                },
            },
            {
                id: "b7",
                type: "real_example_comparison",
                data: {
                    title: "A Real World Example: HDFC Ergo vs Niva Bupa",
                    plan1: { insurer: "HDFC Ergo", planName: "Optima Restore", recommended: true },
                    plan2: { insurer: "Niva Bupa", planName: "ReAssure", recommended: false },
                    rows: [
                        { parameter: "Network hospitals", plan1Value: "13,000", plan2Value: "10,000", plan1Good: true, plan2Good: true },
                        { parameter: "Claim settlement ratio", plan1Value: "97%", plan2Value: "92%", plan1Good: true, plan2Good: true },
                        { parameter: "Co-payment", plan1Value: "No", plan2Value: "No", plan1Good: true, plan2Good: true },
                        { parameter: "Room rent", plan1Value: "Any Room", plan2Value: "Any Room", plan1Good: true, plan2Good: true },
                        { parameter: "Disease sub-limit", plan1Value: "No", plan2Value: "Yes", plan1Good: true, plan2Good: false },
                        { parameter: "Pre-existing waiting", plan1Value: "3 years", plan2Value: "3 years", plan1Good: true, plan2Good: true },
                        { parameter: "No claim bonus", plan1Value: "50%/yr up to 100%", plan2Value: "50%/yr up to 100%", plan1Good: true, plan2Good: true },
                        { parameter: "Restoration benefit", plan1Value: "100% once for any illness", plan2Value: "100% unlimited for any illness", plan1Good: true, plan2Good: true },
                        { parameter: "Health check-up", plan1Value: "Once every year", plan2Value: "Once every year", plan1Good: true, plan2Good: true },
                    ],
                },
            },
            {
                id: "b8",
                type: "frequently_compared",
                data: {
                    title: "Frequently Compared Policies",
                    links: [
                        { label: "HDFC Ergo Optima Restore vs Niva Bupa ReAssure", url: "/health/compare/hdfc-ergo-optima-restore-vs-niva-bupa-reassure" },
                        { label: "HDFC Ergo Optima Restore vs HDFC Ergo myHealth Suraksha Gold", url: "/health/compare/hdfc-ergo-optima-restore-vs-hdfc-ergo-myhealth" },
                        { label: "Care Plus Youth vs Star Health Comprehensive", url: "/health/compare/care-plus-youth-vs-star-health" },
                    ],
                },
            },
            {
                id: "b9",
                type: "faq",
                data: {
                    items: [
                        { question: "How do I compare two health insurance policies properly?", answer: "Start by checking the insurer's track record, hospital network, and CSR history. Then compare policy features like waiting periods, room rent rules, co-payments, and premiums." },
                        { question: "Is it better to choose the cheapest health insurance policy?", answer: "No. Cheaper policies often compensate with longer waiting periods, room rent restrictions, or mandatory co-payments." },
                        { question: "What matters more: insurer or policy features?", answer: "Both — but the insurer comes first. A strong policy from a weak insurer can still result in a frustrating claim experience." },
                    ],
                },
            },
        ],
    })

    await PageContent.create({
        pageKey: "home",
        title: "Homepage",
        section: "home",
        published: true,
        seo: {
            metaTitle: "Life & Health Insurance Platform — Expert Advice, Free Consultation",
            metaDescription: "Get expert advice on term life and health insurance. Book a free call with our IRDAI-certified advisors.",
            keywords: ["insurance platform india", "term insurance", "health insurance"],
        },
        blocks: [
            {
                id: "b1",
                type: "stat_bar",
                data: {
                    stats: [
                        { value: "8,00,000+", label: "Customers Helped" },
                        { value: "4.9/5", label: "Google Rating" },
                        { value: "15,000+", label: "Happy Reviews" },
                        { value: "100%", label: "Free Consultation" },
                    ],
                },
            },
            {
                id: "b2",
                type: "cta_block",
                data: {
                    title: "Get expert advice on the right insurance for you — completely free.",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
        ],
    })

    console.log("✅ Page content seeded")
    console.log("\n🎉 Seed complete! Login credentials:")
    console.log("   Super Admin: superadmin@platform.com / SuperAdmin@123")
    console.log("   Admin:       admin@platform.com / Admin@123")
    console.log("   Employee:    ravi@platform.com / Employee@123")

    await mongoose.disconnect()
    process.exit(0)
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err)
    process.exit(1)
})