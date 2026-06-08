import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import * as dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

import User from "../models/User"
import PageContent from "../models/PageContent"
import InsurancePlan from "../models/InsurancePlan"
import SystemSettings from "../models/SystemSettings"
import Testimonial from "../models/Testimonial"

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
            policymineRating: 4.65,
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
            policymineRating: 4.55,
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
            policymineRating: 4.5,
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
            policymineRating: 4.2,
        },
    ])

    console.log("✅ Insurance plans seeded")

    // ── SYSTEM SETTINGS ────────────────────────────────────
    await SystemSettings.deleteMany({})
    console.log("🗑  Cleared system settings")

    await SystemSettings.create({
        key: "global_settings",
        languages: [
            { language: "Hindi", visible: true },
            { language: "English", visible: true },
            { language: "Bengali", visible: true },
            { language: "Marathi", visible: true },
            { language: "Telugu", visible: true },
            { language: "Tamil", visible: true },
            { language: "Gujarati", visible: true },
            { language: "Kannada", visible: true },
            { language: "Malayalam", visible: true },
            { language: "Punjabi", visible: true },
            { language: "Odia", visible: true },
            { language: "Assamese", visible: true },
            { language: "Urdu", visible: true },
            { language: "Maithili", visible: true },
            { language: "Santali", visible: true },
            { language: "Kashmiri", visible: true }
        ],
        shifts: [
            { shiftName: "Morning Shift", startTime: "09:00", endTime: "13:00", frozen: false },
            { shiftName: "Afternoon Shift", startTime: "13:00", endTime: "17:00", frozen: false },
            { shiftName: "Evening Shift", startTime: "17:00", endTime: "21:00", frozen: false },
            { shiftName: "Night Shift", startTime: "21:00", endTime: "09:00", frozen: false }
        ]
    })
    console.log("✅ System settings seeded")

    // ── TESTIMONIALS ────────────────────────────────────────
    await Testimonial.deleteMany({})
    console.log("🗑  Cleared testimonials")

    await Testimonial.insertMany([
        {
            name: "Rahul Shah",
            role: "Ahmedabad",
            body: "The entire process was smooth and professionally handled. Everything was explained clearly before purchase.",
            rating: 5,
            initials: "RS",
            active: true
        },
        {
            name: "Neha Mehta",
            role: "Surat",
            body: "I finally understood the actual difference between plans because of their simple guidance.",
            rating: 5,
            initials: "NM",
            active: true
        },
        {
            name: "Amit Verma",
            role: "Mumbai",
            body: "Very supportive team during medical requirements and policy issuance process.",
            rating: 5,
            initials: "AV",
            active: true
        },
        {
            name: "Priya Sharma",
            role: "Delhi",
            body: "They genuinely focused on what was right for my family instead of pushing expensive plans.",
            rating: 5,
            initials: "PS",
            active: true
        }
    ])
    console.log("✅ Testimonials seeded")

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
                    reviewer: { name: "MS Bhati", role: "Insurance Expert at Policymine" },
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
                        { name: "INDHUMATHI M", initials: "I", body: "Policymine is doing really great. Absolutely spam free — that's the best part. Advisor Nuha was very patient and answered all my questions with clarity." },
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
                    reviewer: { name: "MS Bhati", role: "Insurance Expert at Policymine" },
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
                    title: "Policymine'ss Recommended Term Plans (2026)",
                    rows: [
                        { plan: "Axis Max Life Smart Term Plan Plus", riders: "Accidental Death, Critical Illness (64 illnesses), Zero-Cost Exit, Women's Perks", csr: "99.62%", rating: "4.65/5", policymineRating: 4.65 },
                        { plan: "HDFC Life Click2Protect Supreme Plus", riders: "Accidental Death, Waiver of Premium, Critical Illness (60 illnesses), Spouse Cover", csr: "99.55%", rating: "4.55/5", policymineRating: 4.55 },
                        { plan: "ICICI Prudential iProtect Smart Plus", riders: "Accidental Death, Life Stage Benefit, Critical Illness (60 illnesses), Zero Cost Option", csr: "98.03%", rating: "4.30/5", policymineRating: 4.30 },
                        { plan: "Bajaj Life eTouch II", riders: "Accidental Death, Life Stage Benefit, Critical Illness (60 illnesses), Zero Cost Option", csr: "99.21%", rating: "4.20/5", policymineRating: 4.20 },
                    ],
                },
            },
            {
                id: "b6",
                type: "policymine_take",
                data: {
                    title: "Policymine's Take: Term vs Life Insurance",
                    body: "At Policymine, we usually recommend pure term insurance as the most efficient way to protect your family. It gives you a large cover at a very low premium because it does not mix insurance with investment. Use term insurance for safety. Use mutual funds, PPF, or FDs for growth.",
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
                        { name: "Pulkit Singh", initials: "PS", body: "Had a great experience with Policymine while exploring health insurance options. Everything was explained clearly with no pressure." },
                        { name: "Raghappriya M", initials: "RM", body: "Great experience with Policymine while filing my health insurance claim. Their support made the process much smoother." },
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
                    subtitle: "Compare top-rated pure risk protection plans side-by-side. View claim settlement ratios, features, and expert Policymine ratings.",
                    author: { name: "Subhashish Banerjee", role: "Insurance Writer" },
                    reviewer: { name: "MS Bhati", role: "Insurance Expert at Policymine" },
                    certificationId: "SP0738578124",
                },
            },
            {
                id: "bt2",
                type: "rich_text",
                data: {
                    content: "<p>Finding the right term insurance plan is one of the most critical financial decisions you will make. With so many insurers claiming high settlement numbers and offering dozens of complex riders, it is easy to feel overwhelmed. At Policymine, we evaluate term policies on three main criteria: Claim Settlement Ratio (CSR), operational smoothness, and rider utility.</p>",
                },
            },
            {
                id: "bt3",
                type: "plans_table",
                data: {
                    title: "Policymine Recommended Best Term Plans (2026)",
                    rows: [
                        { plan: "Axis Max Life Smart Term Plan Plus", riders: "Critical Illness (64 illnesses), Accidental Death, Zero Cost Exit", csr: "99.62%", rating: "4.65/5", policymineRating: 4.65 },
                        { plan: "HDFC Life Click2Protect Supreme Plus", riders: "Waiver of Premium, Spouse Cover, Life Stage Benefits", csr: "99.55%", rating: "4.55/5", policymineRating: 4.55 },
                        { plan: "ICICI Prudential iProtect Smart Plus", riders: "Accidental Death, Terminal Illness, Multi-payout", csr: "98.03%", rating: "4.30/5", policymineRating: 4.30 },
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
                    reviewer: { name: "MS Bhati", role: "Insurance Expert at Policymine" },
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
                    reviewer: { name: "MS Bhati", role: "Insurance Expert at Policymine" },
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
                    reviewer: { name: "MS Bhati", role: "Insurance Expert at Policymine" },
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
                    reviewer: { name: "MS Bhati", role: "Insurance Expert at Policymine" },
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
                    reviewer: { name: "MS Bhati", role: "Insurance Expert at Policymine" },
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
        title: "Home",
        section: "home",
        published: true,
        seo: {
            metaTitle: "Policymine | Premium Insurance Guidance",
            metaDescription: "Protect Your Family With Smarter Insurance Decisions.",
            keywords: ["insurance", "Policymine", "term insurance", "health insurance"]
        },
        blocks: [
            {
                id: "h1",
                type: "home_hero",
                data: {
                    title: "Protect Your Family With Smarter Insurance Decisions",
                    subtitle: "Get personalized insurance guidance, transparent plan comparisons, and expert claim support — all in one place.",
                    badge: "Premium Insurance Website",
                    primaryCta: { text: "Book Free Consultation", href: "/contact" },
                    secondaryCta: { text: "Get WhatsApp Support", href: "#" },
                    stats: [
                        { label: "Trusted Insurance Advisors", value: "✔" },
                        { label: "Personalized Plan Comparison", value: "✔" },
                        { label: "Claim Support Assistance", value: "✔" },
                        { label: "Multi-Language Guidance", value: "✔" },
                        { label: "End-to-End Support", value: "✔" }
                    ]
                }
            },
            {
                id: "h2",
                type: "stat_bar",
                data: {
                    stats: [
                        { label: "Customers Assisted", value: "100K+" },
                        { label: "Premium Managed", value: "₹400Cr+" },
                        { label: "Partners Across India", value: "3000+" },
                        { label: "Specialist Team", value: "50+" }
                    ]
                }
            },
            {
                id: "h3",
                type: "home_guidance",
                data: {
                    title: "Insurance Guidance, Not Just Policy Selling",
                    subtitle: "We help customers make smarter protection decisions based on their financial goals, responsibilities, lifestyle, and future needs — not rigid sales targets.",
                    quote: "Every recommendation is designed to be practical, easy to understand, and aligned with your future financial security.",
                    items: [
                        { title: "Personalized Recommendations", desc: "Tailored protection advice designed specifically for your life stage, budget, and family goals." },
                        { title: "Transparent Plan Comparison", desc: "Objective side-by-side analysis of policy details, coverage options, and claim histories." },
                        { title: "Simple Explanations", desc: "Direct, jargon-free explanations of riders, sub-limits, and co-payment conditions." },
                        { title: "Long-Term Customer Support", desc: "Continuous advisor access for queries, policy updates, and annual family reviews." },
                        { title: "Dedicated Claim Assistance", desc: "Round-the-clock claim filing coordination, documentation review, and insurer follow-up." }
                    ]
                }
            },
            {
                id: "h4",
                type: "home_trust",
                data: {
                    title: "Why Customers Trust Policymine",
                    items: [
                        { heading: "Best Value Plans", body: "Compare plans from leading insurers to find suitable coverage at competitive pricing." },
                        { heading: "Transparent Advice", body: "Recommendations focused on your actual needs and long-term goals." },
                        { heading: "Dedicated Claim Assistance", body: "Support from experienced advisors during the claim process." },
                        { heading: "Personalized Customer Support", body: "Quick guidance and assistance whenever required." },
                        { heading: "Compliant Process", body: "Professional and ethical practices aligned with industry standards." },
                        { heading: "Multi-Language Support", body: "Guidance available in multiple languages based on advisor availability." }
                    ]
                }
            },
            {
                id: "h5",
                type: "home_understanding",
                data: {
                    title: "Insurance Should Be Understood — Not Just Purchased",
                    subtitle: "Buying insurance shouldn't feel like a guessing game. We ensure you know exactly what you are paying for, what benefits you receive, and how your family is protected.",
                    items: [
                        { title: "The Knowledge Gap", desc: "Most people buy insurance without fully understanding what is actually covered, what is excluded, or how claims work during difficult situations. That’s where we help." },
                        { title: "Our Simplified Mission", desc: "To simplify insurance with completely transparent guidance, practical recommendations, and dedicated long-term support throughout your journey." },
                        { title: "Confident Protection", desc: "Whether you are planning for family protection, health security, wealth creation, retirement, or your child’s future — choose the right financial safety net with total confidence." }
                    ]
                }
            },
            {
                id: "h6",
                type: "product_cards",
                data: {
                    title: "Our Insurance Solutions",
                    cards: [
                        { title: "Term Insurance", desc: "Secure your family’s financial future with high life coverage at affordable premiums.", href: "/term-life", colorClass: "bg-blue-600" },
                        { title: "Health Insurance", desc: "Protect yourself and your loved ones against rising medical expenses, hospitalization, surgeries, and critical illnesses.", href: "/health", colorClass: "bg-teal-600" },
                        { title: "Investment & Wealth Plans", desc: "Build long-term financial growth through market-linked and guaranteed return solutions.", href: "/wealth", colorClass: "bg-indigo-600" },
                        { title: "Retirement Planning", desc: "Create a financially secure retirement with structured income and wealth protection strategies.", href: "/retirement", colorClass: "bg-orange-600" },
                        { title: "Child Future Planning", desc: "Plan confidently for your child’s education, marriage, and future aspirations.", href: "/child-future", colorClass: "bg-purple-600" },
                        { title: "Business & Keyman Insurance", desc: "Protect businesses against financial uncertainties and operational risks.", href: "/business", colorClass: "bg-slate-600" }
                    ]
                }
            },
            {
                id: "h7",
                type: "home_process",
                data: {
                    title: "Simple, Transparent & Guided Process",
                    subtitle: "How we help you secure the right insurance plan.",
                    steps: [
                        { title: "Analyze Needs", text: "We analyze your financial goals, responsibilities, income, and existing coverage." },
                        { title: "Compare Plans", text: "Our advisors compare suitable plans from trusted insurers based on your requirements." },
                        { title: "Explain Jargon", text: "We explain benefits, exclusions, premiums, and claim processes in easy-to-understand language." },
                        { title: "Complete Forms", text: "Complete support for forms, medicals, verification, and policy issuance." },
                        { title: "Lifetime Support", text: "We stay connected even after policy issuance and assist whenever support is needed." }
                    ]
                }
            },
            {
                id: "h8",
                type: "policymine_take",
                data: {
                    title: "Helping Customers Make Better Insurance Decisions",
                    body: "We focus on transparency, clarity, and customer-first support throughout the insurance journey. Highlights include: Personalized Insurance Planning, Quick Processing Assistance, Support For Salaried & Self-Employed Individuals, Online & Offline Consultation Available, Guidance From Application To Claim Settlement, Dedicated Advisor Assistance."
                }
            },
            {
                id: "h9",
                type: "reviews",
                data: {
                    rating: 5,
                    totalCount: 100000,
                    items: [
                        { name: "Rahul Shah", initials: "RS", body: "The entire process was smooth and professionally handled. Everything was explained clearly before purchase." },
                        { name: "Neha Mehta", initials: "NM", body: "I finally understood the actual difference between plans because of their simple guidance." },
                        { name: "Amit Verma", initials: "AV", body: "Very supportive team during medical requirements and policy issuance process." },
                        { name: "Priya Sharma", initials: "PS", body: "They genuinely focused on what was right for my family instead of pushing expensive plans." }
                    ]
                }
            },
            {
                id: "h10",
                type: "home_faq",
                data: {
                    items: [
                        { question: "Is your consultation free?", answer: "Yes, our insurance consultation and guidance are completely free." },
                        { question: "Which insurance companies do you work with?", answer: "We coordinate with multiple leading insurance providers to help customers compare suitable plans." },
                        { question: "Can the process be completed online?", answer: "Yes, the entire process including consultation and documentation can be completed digitally." },
                        { question: "Do you provide claim assistance?", answer: "Yes, our team provides dedicated support during claim coordination and assistance." },
                        { question: "Who can use your services?", answer: "We assist salaried individuals, business owners, professionals, families, and senior citizens." },
                        { question: "Do you support multiple languages?", answer: "Yes, language support is available based on advisor availability." }
                    ]
                }
            },
            {
                id: "h11",
                type: "cta_block",
                data: {
                    title: "Secure What Matters Most",
                    bookCallText: "Schedule Free Consultation",
                    whatsappText: "Connect On WhatsApp"
                }
            }
        ]
    });

    await PageContent.create({
        pageKey: "contact",
        title: "Contact Us",
        section: "support",
        published: true,
        seo: { metaTitle: "Contact Us - Policymine", metaDescription: "Get In Touch With Our Insurance Experts" },
        blocks: [
            { id: "c1", type: "hero", data: { title: "Get In Touch With Our Insurance Experts", subtitle: "Whether you need help understanding plans, comparing policies, or getting claim support — our team is here to guide you." } },
            { id: "c2", type: "rich_text", data: { content: "<h3>Contact Information</h3><ul><li>support@policymine.com</li><li>+91 98249 23606</li><li>Consultation Hours Available based on advisor availability and active support timings.</li></ul>" } }
        ]
    });

    await PageContent.create({
        pageKey: "about",
        title: "About Policymine",
        section: "support",
        published: true,
        seo: { metaTitle: "About Us - Policymine", metaDescription: "Building Trust Through Smarter Insurance Guidance" },
        blocks: [
            { id: "a1", type: "hero", data: { title: "Building Trust Through Smarter Insurance Guidance", subtitle: "Policymine was created with a simple mission — to make insurance easier to understand, transparent, and customer-focused." } },
            { id: "a2", type: "rich_text", data: { content: "<p>Many people purchase insurance without proper guidance, clear understanding, or long-term support. We aim to change that experience by helping customers make informed financial protection decisions with confidence.</p><p>Our team focuses on simplifying insurance through:</p><ul><li>Transparent plan comparison</li><li>Personalized recommendations</li><li>Practical financial guidance</li><li>End-to-end assistance</li><li>Dedicated claim support</li></ul><p>We believe insurance should never feel confusing or sales-driven. It should feel secure, supportive, and built around your actual life goals.</p>" } }
        ]
    });

    await PageContent.create({
        pageKey: "term-life",
        title: "Term Insurance",
        section: "term-life",
        published: true,
        seo: { metaTitle: "Term Insurance - Policymine", metaDescription: "Protect Your Family’s Financial Future" },
        blocks: [
            { id: "tl1", type: "hero", data: { title: "Protect Your Family’s Financial Future", subtitle: "Term insurance provides financial protection for your loved ones in case of unforeseen circumstances." } },
            { id: "tl2", type: "benefits_list", data: { title: "Why Term Insurance Matters", items: [{ heading: "Affordable", body: "High life coverage at affordable premiums" }, { heading: "Protection", body: "Financial protection for dependents" }, { heading: "Tax Savings", body: "Tax benefits as per applicable laws" }, { heading: "Peace of Mind", body: "Peace of mind for your family’s future" }] } },
            { id: "tl3", type: "cta_block", data: { title: "Our Support Includes Coverage assessment, Plan comparison, Premium guidance, Documentation assistance, Claim support coordination", bookCallText: "Compare Term Plans", whatsappText: "Connect on WhatsApp" } }
        ]
    });

    await PageContent.create({
        pageKey: "health",
        title: "Health Insurance",
        section: "health",
        published: true,
        seo: { metaTitle: "Health Insurance - Policymine", metaDescription: "Health Protection For You & Your Family" },
        blocks: [
            { id: "hi1", type: "hero", data: { title: "Health Protection For You & Your Family", subtitle: "Medical expenses continue to rise every year. Health insurance helps protect your savings during emergencies, hospitalization, surgeries, and critical illnesses." } },
            { id: "hi2", type: "features_table", data: { title: "Coverage Benefits", rows: [{ aspect: "Cashless hospitalization", feature: "Support" }, { aspect: "Family health", feature: "Coverage options" }, { aspect: "Critical illness", feature: "Protection" }, { aspect: "Pre/Post hospitalization", feature: "Benefits" }, { aspect: "Tax-saving", feature: "Advantages" }] } },
            { id: "hi3", type: "cta_block", data: { title: "Compare multiple insurers, Understand policy benefits clearly, Transparent guidance without confusion, Support during claims and renewals", bookCallText: "Explore Health Plans", whatsappText: "Connect on WhatsApp" } }
        ]
    });

    await PageContent.create({
        pageKey: "wealth",
        title: "Investment & Wealth Plans",
        section: "wealth",
        published: true,
        seo: { metaTitle: "Investment & Wealth - Policymine", metaDescription: "Build Long-Term Financial Growth With Confidence" },
        blocks: [
            { id: "w1", type: "hero", data: { title: "Build Long-Term Financial Growth With Confidence", subtitle: "Investment and wealth plans help create disciplined long-term savings while supporting important financial goals." } },
            { id: "w2", type: "cta_block", data: { title: "Suitable For Wealth creation, Child future planning, Goal-based investing, Financial stability", bookCallText: "Start Wealth Planning", whatsappText: "Connect on WhatsApp" } }
        ]
    });

    await PageContent.create({
        pageKey: "retirement",
        title: "Retirement Planning",
        section: "wealth",
        published: true,
        seo: { metaTitle: "Retirement Planning - Policymine", metaDescription: "Plan Today For A Financially Secure Retirement" },
        blocks: [
            { id: "rp1", type: "hero", data: { title: "Plan Today For A Financially Secure Retirement", subtitle: "Retirement planning helps create a stable future income and financial independence after your working years." } },
            { id: "rp2", type: "cta_block", data: { title: "Benefits include Stable retirement income, Long-term wealth protection, Financial independence.", bookCallText: "Plan Your Retirement", whatsappText: "Connect on WhatsApp" } }
        ]
    });

    await PageContent.create({
        pageKey: "child-future",
        title: "Child Future Planning",
        section: "wealth",
        published: true,
        seo: { metaTitle: "Child Future Planning - Policymine", metaDescription: "Secure Your Child’s Future Goals" },
        blocks: [
            { id: "cf1", type: "hero", data: { title: "Secure Your Child’s Future Goals", subtitle: "Prepare confidently for your child’s future education, career goals, and important life milestones." } },
            { id: "cf2", type: "cta_block", data: { title: "We Help With Child education planning, Goal-based investment guidance, Protection-linked savings options.", bookCallText: "Start Child Future Planning", whatsappText: "Connect on WhatsApp" } }
        ]
    });

    await PageContent.create({
        pageKey: "business",
        title: "Business & Keyman Insurance",
        section: "corporate",
        published: true,
        seo: { metaTitle: "Business Insurance - Policymine", metaDescription: "Protect Your Business Against Financial Risks" },
        blocks: [
            { id: "bi1", type: "hero", data: { title: "Protect Your Business Against Financial Risks", subtitle: "Business insurance solutions help organizations reduce financial uncertainty and maintain stability during unexpected situations." } },
            { id: "bi2", type: "cta_block", data: { title: "Coverage Areas: Keyman insurance, Liability protection, Business continuity support, Financial risk management.", bookCallText: "Explore Business Protection", whatsappText: "Connect on WhatsApp" } }
        ]
    });

    await PageContent.create({
        pageKey: "claims",
        title: "Claim Support",
        section: "support",
        published: true,
        seo: { metaTitle: "Claim Support - Policymine", metaDescription: "Dedicated Support During Claims" },
        blocks: [
            { id: "cs1", type: "hero", data: { title: "Dedicated Support During Claims", subtitle: "Claim situations can feel stressful and overwhelming. Our team assists customers throughout the coordination and documentation process." } },
            { id: "cs2", type: "note_box", data: { label: "Important Note", content: "Final claim approval and settlement remain subject to insurer policies, terms, and underwriting conditions." } },
            { id: "cs3", type: "cta_block", data: { title: "Our Claim Assistance Includes Claim guidance support, Documentation assistance, Coordination with insurer teams", bookCallText: "Get Claim Assistance", whatsappText: "Connect on WhatsApp" } }
        ]
    });

    await PageContent.create({
        pageKey: "careers",
        title: "Careers",
        section: "company",
        published: true,
        seo: { metaTitle: "Careers - Policymine", metaDescription: "Grow Your Career With Policymine" },
        blocks: [
            { id: "car1", type: "hero", data: { title: "Grow Your Career With Policymine", subtitle: "We are building a customer-focused insurance advisory platform driven by transparency, support, and long-term relationships." } },
            { id: "car2", type: "rich_text", data: { content: "<h3>Open Roles</h3><ul><li>Insurance Advisor</li><li>Customer Support Executive</li><li>Relationship Manager</li><li>Operations Coordinator</li></ul>" } },
            { id: "car3", type: "cta_block", data: { title: "Join a growth-oriented environment with learning and development support.", bookCallText: "Apply Now", whatsappText: "Connect on WhatsApp" } }
        ]
    });

    await PageContent.create({
        pageKey: "privacy",
        title: "Privacy Policy",
        section: "company",
        published: true,
        seo: { metaTitle: "Privacy Policy - Policymine", metaDescription: "Your Privacy Matters" },
        blocks: [
            { id: "pp1", type: "rich_text", data: { content: "<h2>Your Privacy Matters</h2><p>We are committed to protecting customer information and maintaining confidentiality.</p><p>Personal details shared through consultations, inquiries, and documentation are handled responsibly and used only for insurance-related assistance and communication purposes. Information is processed in accordance with applicable legal and regulatory requirements.</p>" } }
        ]
    });

    await PageContent.create({
        pageKey: "terms",
        title: "Terms & Conditions",
        section: "company",
        published: true,
        seo: { metaTitle: "Terms & Conditions - Policymine", metaDescription: "Terms Of Use" },
        blocks: [
            { id: "tc1", type: "rich_text", data: { content: "<h2>Terms Of Use</h2><p>By accessing this website and using our services, users agree to the applicable terms, policies, and regulatory guidelines.</p><p>Policymine provides insurance-related guidance and assistance services. Final policy issuance, underwriting, premium decisions, and claim settlement are governed by the respective insurer’s terms and conditions. Users are advised to review all policy documents carefully before making purchase decisions.</p>" } }
        ]
    });

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
