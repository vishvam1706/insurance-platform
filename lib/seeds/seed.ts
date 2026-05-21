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
            pmpartnersRating: 4.65,
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
            pmpartnersRating: 4.55,
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
            pmpartnersRating: 4.5,
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
            pmpartnersRating: 4.2,
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
                    reviewer: { name: "Gaurav Bhat", role: "Insurance Expert at PM Partners" },
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
                    bookCallText: "Compare Plans",
                    whatsappText: "Direct Support",
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
                        { name: "INDHUMATHI M", initials: "I", body: "PM Partners is doing really great. Absolutely spam free — that's the best part. Advisor Nuha was very patient and answered all my questions with clarity." },
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
                    reviewer: { name: "Gaurav Bhat", role: "Insurance Expert at PM Partners" },
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
                    bookCallText: "Compare Plans",
                    whatsappText: "Direct Support",
                },
            },
            {
                id: "b5",
                type: "plans_table",
                data: {
                    title: "PM Partners's Recommended Term Plans (2026)",
                    rows: [
                        { plan: "Axis Max Life Smart Term Plan Plus", riders: "Accidental Death, Critical Illness (64 illnesses), Zero-Cost Exit, Women's Perks", csr: "99.62%", rating: "4.65/5", pmpartnersRating: 4.65 },
                        { plan: "HDFC Life Click2Protect Supreme Plus", riders: "Accidental Death, Waiver of Premium, Critical Illness (60 illnesses), Spouse Cover", csr: "99.55%", rating: "4.55/5", pmpartnersRating: 4.55 },
                        { plan: "ICICI Prudential iProtect Smart Plus", riders: "Accidental Death, Life Stage Benefit, Critical Illness (60 illnesses), Zero Cost Option", csr: "98.03%", rating: "4.30/5", pmpartnersRating: 4.30 },
                        { plan: "Bajaj Life eTouch II", riders: "Accidental Death, Life Stage Benefit, Critical Illness (60 illnesses), Zero Cost Option", csr: "99.21%", rating: "4.20/5", pmpartnersRating: 4.20 },
                    ],
                },
            },
            {
                id: "b6",
                type: "pmpartners_take",
                data: {
                    title: "PM Partners' Take: Term vs Life Insurance",
                    body: "At PM Partners, we usually recommend pure term insurance as the most efficient way to protect your family. It gives you a large cover at a very low premium because it does not mix insurance with investment. Use term insurance for safety. Use mutual funds, PPF, or FDs for growth.",
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
                        { name: "Pulkit Singh", initials: "PS", body: "Had a great experience with PM Partners while exploring health insurance options. Everything was explained clearly with no pressure." },
                        { name: "Raghappriya M", initials: "RM", body: "Great experience with PM Partners while filing my health insurance claim. Their support made the process much smoother." },
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
                    bookCallText: "Compare Plans",
                    whatsappText: "Direct Support",
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
                        { question: "How do I compare two health insurance policies properly?", answer: "Start by checking the insurer's track record, hospital network, and CSR history." },
                        { question: "Is it better to choose the cheapest health insurance policy?", answer: "No. Cheaper policies often have longer waiting periods or room rent restrictions." },
                    ],
                },
            },
        ],
    })
    await PageContent.create({
        pageKey: "term-life/best-term-insurance-plans",
        title: "Best Term Insurance Plans 2026",
        section: "term-life",
        published: true,
        seo: {
            metaTitle: "Best Term Insurance Plans in India 2026 — Compare & Save",
            metaDescription: "Compare the best term insurance plans in India for 2026 side by side. Read reviews, claim settlement ratios, features and pricing.",
            keywords: ["best term insurance", "best term plan 2026", "term insurance comparison"],
        },
        blocks: [
            {
                id: "bt1",
                type: "hero",
                data: {
                    title: "Best Term Insurance Plans 2026",
                    subtitle: "Compare top-rated pure risk protection plans side-by-side. View claim settlement ratios, features, and expert PM Partners ratings.",
                    author: { name: "Subhashish Banerjee", role: "Insurance Writer" },
                    reviewer: { name: "Gaurav Bhat", role: "Insurance Expert at PM Partners" },
                    certificationId: "SP0738578124",
                },
            },
            {
                id: "bt2",
                type: "rich_text",
                data: {
                    content: "<p>Finding the right term insurance plan is one of the most critical financial decisions you will make. With so many insurers claiming high settlement numbers and offering dozens of complex riders, it is easy to feel overwhelmed. At PM Partners, we evaluate term policies on three main criteria: Claim Settlement Ratio (CSR), operational smoothness, and rider utility.</p>",
                },
            },
            {
                id: "bt3",
                type: "plans_table",
                data: {
                    title: "PM Partners Recommended Best Term Plans (2026)",
                    rows: [
                        { plan: "Axis Max Life Smart Term Plan Plus", riders: "Critical Illness (64 illnesses), Accidental Death, Zero Cost Exit", csr: "99.62%", rating: "4.65/5", pmpartnersRating: 4.65 },
                        { plan: "HDFC Life Click2Protect Supreme Plus", riders: "Waiver of Premium, Spouse Cover, Life Stage Benefits", csr: "99.55%", rating: "4.55/5", pmpartnersRating: 4.55 },
                        { plan: "ICICI Prudential iProtect Smart Plus", riders: "Accidental Death, Terminal Illness, Multi-payout", csr: "98.03%", rating: "4.30/5", pmpartnersRating: 4.30 },
                    ],
                },
            },
            {
                id: "bt4",
                type: "note_box",
                data: {
                    label: "Expert Tip",
                    content: "Do not choose a term insurance plan based *only* on the cheapest premium. A slightly higher premium with an insurer that has a higher claim settlement ratio and a hassle-free paperless claim process is always a better option for your family.",
                },
            },
            {
                id: "bt5",
                type: "cta_block",
                data: {
                    title: "Get a free customized term plan comparison report today.",
                    bookCallText: "Compare Plans",
                    whatsappText: "Direct Support",
                },
            },
            {
                id: "bt6",
                type: "faq",
                data: {
                    items: [
                        { question: "Which term insurance has the highest claim settlement ratio?", answer: "Max Life and HDFC Life currently lead the industry with Claim Settlement Ratios of 99.62% and 99.55% respectively for FY 2024-25." },
                        { question: "Is zero-cost exit term plan worth it?", answer: "Yes! If you want to withdraw from the plan after your children are financially independent (e.g. at age 60), zero-cost exit allows you to get 100% of your paid premiums back." },
                    ],
                },
            },
        ],
    })

    await PageContent.create({
        pageKey: "term-life/1-crore-term-insurance",
        title: "1 Crore Term Insurance",
        section: "term-life",
        published: true,
        seo: {
            metaTitle: "1 Crore Term Insurance Plans — Premiums & Eligibility",
            metaDescription: "Learn why a 1 Crore term insurance plan is the sweet spot for most Indian families. Check monthly premium estimates, tax benefits and eligibility.",
            keywords: ["1 crore term insurance", "1 cr term plan", "crore life insurance"],
        },
        blocks: [
            {
                id: "oc1",
                type: "hero",
                data: {
                    title: "1 Crore Term Insurance Plan",
                    subtitle: "The gold standard of life protection. Understand why it is the perfect coverage amount and how to get it at the lowest premium.",
                    author: { name: "Pratyusha Chatterjee", role: "Insurance Writer" },
                    reviewer: { name: "Gaurav Bhat", role: "Insurance Expert at PM Partners" },
                },
            },
            {
                id: "oc2",
                type: "rich_text",
                data: {
                    content: "<p>A 1 Crore cover is often highlighted as the standard benchmark for term insurance. But is it right for you? A good rule of thumb is to secure a term plan that is 10 to 15 times your annual income, plus any active debts (like home or education loans). For most middle-income salaried professionals, a ₹1 Crore cover perfectly bridges this gap.</p>",
                },
            },
            {
                id: "oc3",
                type: "features_table",
                data: {
                    title: "Estimated Monthly Premiums for ₹1 Crore Cover (Non-Smoker)",
                    note: "Estimated premiums for a regular cover up to age 60. Actual premiums vary based on medical test results.",
                    rows: [
                        { aspect: "Age 25", feature: "₹800 to ₹1,000 per month" },
                        { aspect: "Age 30", feature: "₹1,000 to ₹1,300 per month" },
                        { aspect: "Age 35", feature: "₹1,400 to ₹1,800 per month" },
                        { aspect: "Age 40", feature: "₹2,000 to ₹2,500 per month" },
                    ],
                },
            },
            {
                id: "oc4",
                type: "benefits_list",
                data: {
                    title: "Why Choose a 1 Crore Term Cover?",
                    items: [
                        { heading: "Clears Existing Debt", body: "Provides enough lump sum to fully pay off home loans, car loans, or credit card bills without burdening your family." },
                        { heading: "Secures Higher Education", body: "Ensures your children's future education and marriage plans are fully funded even in your absence." },
                        { heading: "Affordable Cost", body: "At young ages, a ₹1 Crore term plan costs less than ₹30 a day, making it highly pocket-friendly." },
                    ],
                },
            },
            {
                id: "oc5",
                type: "cta_block",
                data: {
                    title: "Calculate your exact premium for 1 Crore term cover in 2 minutes.",
                    bookCallText: "Calculate Premium",
                    whatsappText: "Ask on WhatsApp",
                },
            },
        ],
    })

    await PageContent.create({
        pageKey: "term-life/nri-term-insurance",
        title: "NRI Term Insurance",
        section: "term-life",
        published: true,
        seo: {
            metaTitle: "NRI Term Insurance India — Rules & Buying Guide 2026",
            metaDescription: "Buying term insurance in India for NRIs. Understand rules, tax exemptions, tele-medicals, and premium payments from NRE/NRO accounts.",
            keywords: ["nri term insurance", "term plan for nri india", "buy insurance nri"],
        },
        blocks: [
            {
                id: "nr1",
                type: "hero",
                data: {
                    title: "NRI Term Insurance in India",
                    subtitle: "Comprehensive guide for Non-Resident Indians seeking term life cover. Save up to 50% on premiums compared to foreign policies.",
                    author: { name: "Subhashish Banerjee", role: "Insurance Writer" },
                    reviewer: { name: "Gaurav Bhat", role: "Insurance Expert at PM Partners" },
                },
            },
            {
                id: "nr2",
                type: "rich_text",
                data: {
                    content: "<p>Can NRIs buy term insurance in India? Yes, absolutely. In fact, Indian term insurance is often significantly cheaper than similar policies in the UK, USA, or Gulf countries. NRIs can buy policies through online portals with remote tele-medicals, paying premiums directly via NRE, NRO, or foreign bank accounts.</p>",
                },
            },
            {
                id: "nr3",
                type: "how_it_works_steps",
                data: {
                    title: "How NRIs Can Buy Term Insurance Remotely",
                    steps: [
                        { text: "Select a plan and premium payment term on the platform." },
                        { text: "Submit passports, visa copies, and country-of-residence proof." },
                        { text: "Schedule a tele-medical interview (video call with a certified physician)." },
                        { text: "Pay premium via NRE/NRO bank accounts to leverage tax-free proceeds." },
                        { text: "The policy document is issued and sent digitally via email." },
                    ],
                },
            },
            {
                id: "nr4",
                type: "benefits_list",
                data: {
                    title: "Key Benefits for NRIs Buying in India",
                    items: [
                        { heading: "Lower Cost", body: "Indian term policies are highly cost-competitive globally, saving up to 50% on annual premium costs." },
                        { heading: "GST Waiver Benefits", body: "NRIs paying premiums in foreign currency from NRE/FCNR accounts are eligible for an 18% GST refund on premium payments." },
                        { heading: "Global Coverage", body: "The death benefit is paid out to beneficiaries globally in foreign currency or INR without any legal restrictions." },
                    ],
                },
            },
            {
                id: "nr5",
                type: "cta_block",
                data: {
                    title: "Connect with our specialized NRI support desk now.",
                    bookCallText: "Book NRI Call",
                    whatsappText: "Direct Support",
                },
            },
        ],
    })

    await PageContent.create({
        pageKey: "health/what-is-health-insurance",
        title: "What is Health Insurance?",
        section: "health",
        published: true,
        seo: {
            metaTitle: "What is Health Insurance? A Simple Guide for Beginners",
            metaDescription: "A beginner's guide to health insurance in India. Learn about network hospitals, cashless claims, deductibles, and waiting periods.",
            keywords: ["what is health insurance", "health insurance basics", "medical insurance guide"],
        },
        blocks: [
            {
                id: "wh1",
                type: "hero",
                data: {
                    title: "What is Health Insurance?",
                    subtitle: "A simple guide to healthcare cover. Understand how medical policies shield you from soaring hospital bills and protect your savings.",
                    author: { name: "Pratyusha Chatterjee", role: "Insurance Writer" },
                    reviewer: { name: "Gaurav Bhat", role: "Insurance Expert at PM Partners" },
                },
            },
            {
                id: "wh2",
                type: "rich_text",
                data: {
                    content: "<p>Medical emergencies never send a warning. With hospital room rents and treatment costs growing at 10-15% annually in India, a single hospitalization can wipe out years of savings. Health insurance is a contract between you and an insurer where they pay for your medical and surgical expenses in exchange for an annual premium.</p>",
                },
            },
            {
                id: "wh3",
                type: "note_box",
                data: {
                    label: "Important Concept",
                    content: "Health insurance pays for room rent, ICU charges, doctor fees, surgeries, medicines, and pre/post-hospitalization costs. However, all policies have standard waiting periods (usually 2-3 years) for pre-existing illnesses like diabetes or hypertension.",
                },
            },
            {
                id: "wh4",
                type: "how_it_works_steps",
                data: {
                    title: "How Health Insurance Claims Work",
                    steps: [
                        { text: "Cashless Claim: You get admitted to a network hospital and submit your health card." },
                        { text: "The hospital's third-party administrator (TPA) sends pre-authorization requests to the insurer." },
                        { text: "The insurer approves the request and pays the hospital bills directly upon discharge." },
                        { text: "Reimbursement Claim: If admitted to a non-network hospital, you pay the bills yourself first." },
                        { text: "You submit original discharge cards, bills, and receipts within 30 days to get refunded." },
                    ],
                },
            },
            {
                id: "wh5",
                type: "cta_block",
                data: {
                    title: "Unsure which plan matches your medical history? Talk to us.",
                    bookCallText: "Compare Health Plans",
                    whatsappText: "WhatsApp Help",
                },
            },
        ],
    })

    await PageContent.create({
        pageKey: "health/best-health-insurance-plans",
        title: "Best Health Insurance Plans 2026",
        section: "health",
        published: true,
        seo: {
            metaTitle: "Best Health Insurance Plans in India 2026 — Compare",
            metaDescription: "Compare the best health insurance plans for 2026. View network hospital strength, co-payment clauses, claim ratios, and pricing.",
            keywords: ["best health insurance", "best medical insurance plan", "top health policies 2026"],
        },
        blocks: [
            {
                id: "bh1",
                type: "hero",
                data: {
                    title: "Best Health Insurance Plans 2026",
                    subtitle: "Handpicked medical policies with high claim ratios, extensive hospital networks, and zero room-rent limits.",
                    author: { name: "Pratyusha Chatterjee", role: "Insurance Writer" },
                    reviewer: { name: "Gaurav Bhat", role: "Insurance Expert at PM Partners" },
                },
            },
            {
                id: "bh2",
                type: "rich_text",
                data: {
                    content: "<p>The 'best' health insurance policy is one that has zero room rent limits, no co-payment clauses, and cover for pre-existing diseases with minimal waiting periods. In 2026, HDFC Ergo Optima Restore and Niva Bupa ReAssure remain highly popular due to their stellar cashless network and claim resolution rate.</p>",
                },
            },
            {
                id: "bh3",
                type: "real_example_comparison",
                data: {
                    title: "Compare Best Selling Policies: HDFC Ergo vs Niva Bupa",
                    plan1: { insurer: "HDFC Ergo", planName: "Optima Restore", recommended: true },
                    plan2: { insurer: "Niva Bupa", planName: "ReAssure", recommended: false },
                    rows: [
                        { parameter: "Network Hospitals", plan1Value: "13,000+", plan2Value: "10,000+", plan1Good: true, plan2Good: true },
                        { parameter: "Claim Settlement Ratio", plan1Value: "97%", plan2Value: "91.6%", plan1Good: true, plan2Good: true },
                        { parameter: "Room Rent Limits", plan1Value: "No limit (Any Room)", plan2Value: "No limit (Any Room)", plan1Good: true, plan2Good: true },
                        { parameter: "Disease Sub-limits", plan1Value: "None", plan2Value: "Yes (On specific procedures)", plan1Good: true, plan2Good: false },
                    ],
                },
            },
            {
                id: "bh4",
                type: "cta_block",
                data: {
                    title: "Get expert advice and buy the perfect health cover.",
                    bookCallText: "Book Free Call",
                    whatsappText: "Direct Support",
                },
            },
        ],
    })

    await PageContent.create({
        pageKey: "health/family-health-insurance",
        title: "Family Health Insurance",
        section: "health",
        published: true,
        seo: {
            metaTitle: "Family Floater Health Insurance Plans — Save on Premiums",
            metaDescription: "Secure the health of your entire family under a single health insurance policy. Compare family floater benefits, rates, and features.",
            keywords: ["family health insurance", "family floater health plan", "best family health policy"],
        },
        blocks: [
            {
                id: "fh1",
                type: "hero",
                data: {
                    title: "Family Floater Health Insurance",
                    subtitle: "One policy to protect your whole family. Save up to 35% on premiums compared to buying separate individual policies.",
                    author: { name: "Pratyusha Chatterjee", role: "Insurance Writer" },
                    reviewer: { name: "Gaurav Bhat", role: "Insurance Expert at PM Partners" },
                },
            },
            {
                id: "fh2",
                type: "rich_text",
                data: {
                    content: "<p>A Family Floater Health Insurance plan covers your entire family (spouse, children, and parents) under a single shared sum assured. For instance, a ₹10 Lakh sum assured can be utilized by any member of the family during the year. This is highly cost-effective and much easier to manage than paying for 4 separate policies.</p>",
                },
            },
            {
                id: "fh3",
                type: "benefits_list",
                data: {
                    title: "Why Choose a Family Floater Cover?",
                    items: [
                        { heading: "Affordable Premium", body: "Buying one floater policy is 30-40% cheaper than buying individual policies for every family member." },
                        { heading: "Easy Claims & Management", body: "One premium renewal date, one health card set, and a unified claims desk for the entire household." },
                        { heading: "Restoration Benefits", body: "Modern floater plans instantly restore 100% of the sum assured if one member exhausts the limit, leaving it fully available for others." },
                    ],
                },
            },
            {
                id: "fh4",
                type: "cta_block",
                data: {
                    title: "Compare top family floater policies side-by-side with our advisors.",
                    bookCallText: "Compare Floater Plans",
                    whatsappText: "Talk to Advisor",
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
            metaTitle: "Insurance Platform - Expert Advice, Free Consultation",
            metaDescription: "Get expert advice on term life and health insurance. Get a free consultation with our top advisors.",
            keywords: ["insurance platform india", "term insurance", "health insurance"],
        },
        blocks: [
            { id: "h1", type: "home_hero", data: { badge: "Top-Rated Expert Advisors", title: "The Ultimate Insurance Buying Experience", subtitle: "Simple, transparent, and direct comparisons. Get honest help from expert advisors without any sales pressure.", primaryCta: { text: "Compare Plans", href: "/contact" }, stats: [], showInquiryForm: false } },
            { id: "h2", type: "stat_bar", data: { stats: [{ value: "100%", label: "Unbiased" }, { value: "Free", label: "Consultation" }, { value: "Direct", label: "Support" }] } },
            { id: "h3", type: "pmpartners_experience", data: {} },
            { id: "h4", type: "comparison_section", data: {} },
            { id: "h5", type: "product_cards", data: { title: "Two products. Expert guidance on both.", cards: [{ title: "Term Life Insurance", desc: "Pure protection for your family at the lowest possible premium.", href: "/term-life", colorClass: "bg-blue-600" }, { title: "Health Insurance", desc: "Comprehensive coverage for you and your family.", href: "/health", colorClass: "bg-teal-600" }] } },
            { id: "h6", type: "insurance_checklist", data: {} },
            { id: "h7", type: "reviews", data: { rating: 5, totalCount: 21000, items: [{ name: "Arjun Mehta", initials: "AM", body: "One call changed everything. Got a Rs.1 Cr term plan within a week." }, { name: "Priya Nair", initials: "PN", body: "No pushy sales pitch. Honest advice. Completely satisfied." }, { name: "Rohit Sharma", initials: "RS", body: "Best decision for my family. Incredibly patient advisor." }] } },
            { id: "h8", type: "home_faq", data: { items: [{ question: "What is PM Partners?", answer: "PM Partners helps you make better decisions when buying insurance." }, { question: "Is it free?", answer: "Yes, completely free." }, { question: "Do you earn commission?", answer: "Yes, but our advice is never influenced by it." }, { question: "How quickly can I get a policy?", answer: "Within 3-7 working days after our call." }] } },
            { id: "h9", type: "choose_pmpartners_cta", data: {} },
        ],
    })

    console.log("Page content seeded")
    console.log("Seed complete! Login credentials:")
    console.log("   Super Admin: superadmin@platform.com / SuperAdmin@123")
    console.log("   Admin:       admin@platform.com / Admin@123")
    console.log("   Employee:    ravi@platform.com / Employee@123")

    await mongoose.disconnect()
    process.exit(0)
}

seed().catch((err) => {
    console.error("Seed failed:", err)
    process.exit(1)
})
