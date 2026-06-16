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
            metaDescription: "Understand what term insurance is, how it works, the best term plans, riders, eligibility criteria, tax benefits, and claim process.",
            keywords: ["term insurance", "what is term insurance", "term life insurance", "best term insurance plans 2026"],
        },
        blocks: [
            {
                id: "hero-block",
                type: "hero",
                data: {
                    title: "What is Term Insurance?",
                    publishedDate: "20 Feb, 2026",
                    author: { name: "Swetlana Neog", role: "Editorial Associate" },
                    reviewer: { name: "Gaurav Bhat", role: "IRDAI-Certified Expert at Policymine" },
                    certificationId: "SP0738578124",
                },
            },
            {
                id: "overview-block",
                type: "rich_text",
                data: {
                    content:
                        "<p>Term insurance is a pure life insurance policy that provides financial protection for a specific period. If the policyholder passes away during that term, the insurer pays a lump sum death benefit to their beneficiaries. Multiple insurers sell various term insurance policies in the market.</p><p>At Policymine, our top recommendation is the <strong>Axis Max Life Smart Term Plan Plus</strong>, which offers features such as a critical illness rider for up to 20 years, an accelerated terminal illness benefit of ₹1 crore, and more. A 25-year-old individual seeking ₹2 crore coverage up to 65 years pays ₹17,222 annually for this plan.</p><p>But before you check out this product and other recommended plans, it's important to know more about the best term insurance plans. This guide is for those who want to know what is term insurance.</p><p>India’s life insurance market is growing, and the latest numbers are proof. According to the IRDAI Report 2024-25, the average premium per person, or insurance density, rose to USD 97 in FY 2025 from USD 95 in FY 2024. Life insurance density also increased, reaching USD 72, up from USD 70 the previous year.</p><p>Amid this expanding market, term insurance stands out as a simple, cost-effective way to ensure your family’s financial security. It is the simplest form of life insurance: you pay a fixed premium for a fixed period, and if you pass away during the policy term, your nominee receives the sum assured. Let’s discuss the features of term insurance, its types, premium comparison, and other details.</p>",
                },
            },
            {
                id: "advisor-cta",
                type: "cta_block",
                data: {
                    title: "Confused about which term plan aligns with your financial goals? Book a free call or chat on WhatsApp with a Policymine advisor.",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "best-plans-table",
                type: "plans_table",
                data: {
                    title: "Best Term Insurance Plans in India (2026)",
                    rows: [
                        { plan: "Axis Max Life Smart Term Plan Plus", riders: "Critical illness rider (up to 20 years), Accelerated Terminal Illness Benefit", csr: "99.62%", rating: "4.7/5", policymineRating: 4.7 },
                        { plan: "HDFC Life Click2Protect Supreme Plus", riders: "Waiver of premium, Spouse Cover, Critical Illness", csr: "99.55%", rating: "4.4/5", policymineRating: 4.4 },
                        { plan: "ICICI Prudential iProtect Smart Plus", riders: "Accidental Death, Terminal Illness, Multi-payout", csr: "98.03%", rating: "4.3/5", policymineRating: 4.3 },
                        { plan: "Bajaj Life eTouch II", riders: "Accidental Death, Life Stage Benefit, Zero Cost Option", csr: "99.21%", rating: "4.2/5", policymineRating: 4.2 },
                        { plan: "Aditya Birla Sun Life Super Term Plan", riders: "Accidental Death cover, Critical Illness riders", csr: "97.5%", rating: "4.0/5", policymineRating: 4.0 },
                    ],
                },
            },
            {
                id: "expert-cta",
                type: "cta_block",
                data: {
                    title: "Talk to an expert today and find the right insurance for you.",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "what-is-definition",
                type: "rich_text",
                data: {
                    content:
                        "<h2>What is Term Insurance?</h2><p>Term insurance provides financial protection to your family if you pass away during the policy term. It ensures that your dependents can maintain their lifestyle, pay off debts, cover living expenses, and meet future goals such as education or retirement without being financially burdened.</p>",
                },
            },
            {
                id: "how-it-works-steps",
                type: "how_it_works_steps",
                data: {
                    title: "How Term Life Insurance Works?",
                    steps: [
                        { text: "You pick your sum assured (SA), policy term, and premium payment option." },
                        { text: "The insurer evaluates your overall profile based on its underwriting guidelines and then decides whether to issue the policy or not." },
                        { text: "Once your term policy is issued, you keep paying premiums to maintain the policy." },
                        { text: "If you pass away during the term, your nominee receives the death benefit." },
                        { text: "If you survive the term, the policy ends without any payout unless you opted for a return of premium version." },
                    ],
                },
            },
            {
                id: "types-insights",
                type: "rich_text",
                data: {
                    content:
                        "<h2>Types of Term Insurance</h2><p>The infographic below can help you understand the different types of term insurance in detail.</p><h4>Key Insights:</h4><ul><li>We recommend <strong>level term insurance</strong> as the default option because it provides a fixed life cover at an affordable premium throughout the policy term.</li><li>Increasing cover, zero cost exit, and housewife term plans can be considered only when they fit a specific need or profile.</li><li>We don’t recommend return of premium, decreasing term insurance, or whole life term insurance because they either cost much more, reduce coverage over time, or extend coverage beyond the years when your family actually depends on your income.</li><li>Group term and joint term insurance should not be your primary protection plan because employer- or bank-linked covers can end at any time, and joint covers may have payout and rider limitations. Separate individual term plans usually offer cleaner and more reliable protection.</li></ul>",
                },
            },
            {
                id: "eligibility-table",
                type: "features_table",
                data: {
                    title: "Eligibility Criteria and Key Parameters",
                    note: "Features and eligibility may vary from plan to plan.",
                    rows: [
                        { aspect: "Entry Age", feature: "Minimum is 18, and maximum is usually 60 to 65 years." },
                        { aspect: "Maturity Age", feature: "Minimum is 23 to 28, and maximum is 85 years. It may go up to 99 or 100 years for whole life term plans." },
                        { aspect: "Payout Options", feature: "Lump sum, monthly income, and combined." },
                        { aspect: "Premium Payment Mode", feature: "Annual, half-yearly, quarterly, and monthly." },
                        { aspect: "Premium Paying Term", feature: "Regular pay, limited pay, single pay." },
                    ],
                },
            },
            {
                id: "riders-rich-text",
                type: "rich_text",
                data: {
                    content:
                        "<h2>Term Insurance Riders: Adding Extra Cover to Your Policy</h2><p>Riders are optional add-ons that enhance your base term plan. You pay an additional premium for each rider you add. Not all riders are equally useful, so choose only what your situation actually calls for.</p><p>Take a look at the below infographic to understand the popular term insurance riders you can opt for or avoid based on your needs:</p>",
                },
            },
            {
                id: "coverage-needs",
                type: "rich_text",
                data: {
                    content:
                        "<h2>How Much Term Insurance Cover Do You Actually Need?</h2><p>At Policymine, we recommend an expense and liability based approach. Your cover should be enough to help your family maintain their lifestyle, repay outstanding loans, and fund major future goals like children’s education, even if you are not around.</p><p>The easiest way to estimate this is through our term insurance calculator. Enter your age, the number of years your family needs protection, monthly expenses, outstanding loans, and any existing life insurance cover. The calculator will give you a more practical estimate based on your actual responsibilities, not just your income.</p><p><strong>Note:</strong> If you opt for higher coverage, insurers conduct stricter financial and medical underwriting. At Policymine, we recommend not skipping any test. Even if your policy application is declined, early clarity helps you plan and avoid future claim complications.</p><p>If you already have an existing life insurance cover, you should deduct the death sum assured from the recommended coverage. You should also declare it while purchasing a new term plan. This helps ensure you’re adequately insured without over-insuring or paying unnecessary excess premiums.</p>",
                },
            },
            {
                id: "how-to-decide-plan",
                type: "rich_text",
                data: {
                    content:
                        "<h2>How to Decide the Right Term Insurance Plan for You?</h2><p>Choosing term life insurance involves selecting a financially reliable insurer and a policy that aligns with your income, dependents, loans, and long-term family goals.</p><p>At Policymine, we rate plans using publicly disclosed metrics like Claim Settlement Ratio (CSR), Amount Settlement Ratio (ASR), solvency ratio, complaint volume, and premium affordability. Based on these checks, Axis Max Life is a strong pick, with a 99.62% average Claim Settlement Ratio (CSR) and 96.37% Amount Settlement Ratio (ASR) across FY 2022-25.</p>",
                },
            },
            {
                id: "term-vs-life-intro",
                type: "rich_text",
                data: {
                    content:
                        "<h2>Term Insurance vs. Life Insurance: What's the Difference?</h2><p>Term life insurance is a type of pure-protection life insurance that provides a death benefit if the policyholder passes away during the policy term. Conversely, life insurance is a broader category that includes policies that combine savings or market-linked investment with insurance and can provide a payout at maturity if you survive.</p>",
                },
            },
            {
                id: "cost-intro",
                type: "rich_text",
                data: {
                    content:
                        "<h2>How Much Does Term Insurance Cost?</h2><p>Term insurance premiums depend primarily on your age, gender, smoking status, health profile, coverage amount, and policy term. The earlier you buy, the lower your premium, and that rate stays locked for the full policy term.</p>",
                },
            },
            {
                id: "cost-comparison-table",
                type: "comparison_table",
                data: {
                    title: "Indicative Premium Comparison (₹2 Crore Cover until Age 65, Non-Smoker, Pin Code: 110001)",
                    columns: ["Profile", "Axis Max Smart Term Plan Plus", "HDFC Life Click2Protect Supreme Plus", "ICICI Prudential iProtect Smart Plus"],
                    rows: [
                        ["25, Male", "₹17,222", "₹19,719", "₹16,111"],
                        ["25, Female", "₹14,640", "₹16,761", "₹13,694"],
                        ["30, Male", "₹20,656", "₹25,153", "₹19,283"],
                        ["30, Female", "₹17,558", "₹21,380", "₹16,391"],
                    ],
                },
            },
            {
                id: "cost-comparison-note",
                type: "note_box",
                data: {
                    label: "Important Note",
                    content: "These premiums are estimated without first-year discounts.",
                },
            },
            {
                id: "how-to-buy-steps",
                type: "how_it_works_steps",
                data: {
                    title: "How to Buy Term Insurance Through Policymine: Step-by-Step",
                    steps: [
                        { text: "<strong>Understand Your Policy:</strong> Review features, benefits, exclusions, and claim metrics, so you know what’s covered, what isn’t, and how reliable the insurer is." },
                        { text: "<strong>Share Basic Details:</strong> Enter your age, gender, location, smoking habits, income, and monthly expenses to estimate the cover amount you need." },
                        { text: "<strong>Choose Cover and Payment:</strong> Select your cover amount, add-ons, policy term, and payment frequency so the plan fits your budget." },
                        { text: "<strong>Apply and Get Issued:</strong> Submit accurate details, upload documents, complete payment, and go through underwriting. Once verified, your policy gets issued." },
                    ],
                },
            },
            {
                id: "did-you-know-box",
                type: "note_box",
                data: {
                    label: "Did You Know?",
                    content: "When you apply for a term insurance plan, the final decision is not limited to the issuance of your policy. It can include rejection, postponement, or a counteroffer, such as a higher premium or reduced cover (depending on the overall underwriting). At Policymine, we always suggest that our customers be completely transparent and keep their documentation accurate and up to date, because clear disclosures and proper paperwork significantly improve their chances of getting a term policy without any hassle.",
                },
            },
            {
                id: "tax-benefits-intro",
                type: "rich_text",
                data: {
                    content:
                        "<h2>Tax Benefits of Term Insurance</h2><p>There are three major term insurance tax benefits in India:</p><ul><li>Tax deductions up to ₹1.5 lakh on premiums paid under Section 80C (old tax regime).</li><li>Tax-free payouts to nominees under Section 10(10D), regardless of regimes.</li><li>Tax deductions on premiums paid under certain riders, like critical illness, within the Section 80D limits (old regime).</li></ul>",
                },
            },
            {
                id: "gst-update-box",
                type: "note_box",
                data: {
                    label: "Quick Update",
                    content: "The Indian government has also removed GST on individual term insurance plans, making it even more affordable. However, group term insurance (usually employer-provided) and group credit life policies still attract an 18% GST.",
                },
            },
            {
                id: "claim-steps",
                type: "how_it_works_steps",
                data: {
                    title: "How to File a Term Insurance Claim?",
                    steps: [
                        { text: "The nominee should first inform the insurer as soon as possible through the insurer’s website, branch, email, or helpline." },
                        { text: "They must submit the claim form along with key documents, including the death certificate, policy documents, the nominee’s KYC, bank details, and medical or police records, if applicable." },
                        { text: "The insurer will verify the documents and may request additional information in the event of an accidental, premature, or suspicious death." },
                        { text: "Once the claim is approved, the insurer pays the death benefit to the nominee’s registered bank account." },
                    ],
                },
            },
            {
                id: "claim-settle-note",
                type: "note_box",
                data: {
                    label: "How Long Does a Term Insurance Claim Take to Settle?",
                    content: "According to IRDAI’s 2024 policyholder protection framework, life insurers must settle or reject a death claim within 15 days of receiving all required claim documents and clarifications, if no investigation is needed. If an investigation is required, it must be completed within 45 days of claim submission. Any delay beyond these timelines attracts interest at the bank rate plus 2%, payable along with the claim amount.",
                },
            },
            {
                id: "why-choose-us",
                type: "benefits_list",
                data: {
                    title: "Why Choose Policymine for Term Insurance?",
                    items: [
                        { heading: "No-Spam & No Salesmen", body: "We never spam you or push products you don't need." },
                        { heading: "Rated 4.9/5 on Google Reviews", body: "Trusted by over 15,000+ happy customers." },
                        { heading: "Backed by Zerodha", body: "Part of the Rainmatter fintech ecosystem." },
                        { heading: "Dedicated Claim Support Team", body: "We stand by your family when they need it most." },
                        { heading: "100% Free Consultation", body: "Absolutely free, unbiased advice." },
                    ],
                },
            },
            {
                id: "consultation-cta",
                type: "cta_block",
                data: {
                    title: "You can book a FREE consultation. Slots are running out, so make sure you book a call or chat on WhatsApp now!",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "policymine-verdict",
                type: "policymine_take",
                data: {
                    title: "Policymine's Verdict on Term Insurance",
                    body: "At Policymine, we recommend pure term insurance to protect your family. It offers a high life cover at a relatively low premium. Much like motor, home, or fire insurance, term insurance is an expense you hope never needs to be used, but one that brings immense peace of mind. It ensures your loved ones remain financially secure even if life takes an unexpected turn. If you are looking for a term plan from insurers with established track records and affordable riders, we recommend checking the best term insurance companies, which align with your long-term goals.",
                },
            },
            {
                id: "faq",
                type: "faq",
                data: {
                    items: [
                        {
                            question: "What are the benefits of term insurance?",
                            answer: "A term plan primarily acts as a replacement for your income. It covers outstanding loans, ensuring your family is financially secure and not burdened with debts if something happens to you. It helps safeguard important life goals, including children’s education, rent, childcare, and elder care, so your family’s plans stay on track even in your absence. Additional riders such as critical illness and waiver of premium provide enhanced protection beyond the base sum assured. You also get monthly, quarterly, half-yearly, or yearly premium payment options.",
                        },
                        {
                            question: "What are the tax benefits of term insurance?",
                            answer: "Under Section 80C (old regime), you can claim a deduction of up to ₹1.5 lakh on the premium paid for a term insurance policy. Section 80D allows an additional deduction if the policy includes health-related riders, both under the old regime. Finally, under Section 10 (10D), the death benefit received by the nominee is entirely tax-free. Meanwhile, illness-based or health-related riders, such as Critical Illness, Hospital Care, and Surgical Care, are typically eligible for tax deduction under Section 80D (old regime).",
                        },
                        {
                            question: "What is a 3-year clause in term insurance?",
                            answer: "As per IRDAI guidelines, after three continuous years of holding a term insurance policy, the insurer cannot reject a death claim due to non-disclosure, misstatements, or incomplete information, unless fraud is proven. This 3-year clause in term insurance provides added security and protection for long-term policyholders. However, the insurer can still investigate and reject a claim if it can clearly establish fraud with valid evidence. This rule is based on Section 45 of the Insurance Act. It gives nominees a stronger claim protection once the policy has completed three years, provided premiums have been paid on time.",
                        },
                        {
                            question: "What do you mean by level term insurance?",
                            answer: "Level term insurance keeps your sum assured fixed throughout the policy term. Premiums also stay constant. These plans are ideal for families seeking stable protection for long-term financial security. For instance, if you choose a ₹2 crore cover for 40 years, your nominee will receive ₹2 crore whether a claim happens in year 1 or year 38. Bajaj Life eTouch II, one of our top recommended plans, offers this option to its policyholders. Since the payout does not change over time, a well-sized level term is considered one of the simplest and most affordable forms of life insurance.",
                        },
                        {
                            question: "What is term insurance with return of premium (TROP)?",
                            answer: "A TROP returns your base premiums if you survive the policy term. This is marketed toward (though, not suitable) low-risk buyers who want guaranteed refunds. However, your returns don’t grow, and rider premiums aren’t refunded. Axis Max Life and HDFC Click2Protect Supreme Plus are two comprehensive plans that offer TROP with comprehensive coverage. But we do not recommend TROP plans at Ditto because their premiums are much higher (generally 60-100%) than regular term plans. In most cases, it is better to buy a pure term plan for protection and invest the premium difference separately in instruments that offer greater flexibility and return potential, such as FDs and mutual funds.",
                        },
                        {
                            question: "Who should buy term insurance plans?",
                            answer: "A term insurance plan is meant for anyone with financial dependents or who is tied to future financial responsibilities. You should strongly consider buying a term plan if you are a young professional and want to lock in very low premiums and long policy terms. If you’re married, a term plan ensures your spouse remains financially secure and protected against income disruption in the event of an unfortunate event. Many insurers also offer premium benefits (15% lower than for males) specifically for women. Finally, term insurance safeguards the families of self-employed individuals and helps manage liabilities tied to the business.",
                        },
                        {
                            question: "How to choose the right term insurer?",
                            answer: "Your insurer’s reliability is just as important as the policy benefits. This involves analyzing several key benefits before making a decision. At Ditto, we begin the analysis with a claim settlement ratio (CSR), which shows the percentage of claims settled out of total claims received in a year. Next is the amount settlement ratio (ASR), which indicates whether high-value claims are settled fairly. The solvency ratio measures financial strength and the ability to meet long-term obligations. The complaint volume shows the number of complaints per 10,000 claims. Large business volumes and high claim payouts reflect operational scale and stability.",
                        },
                        {
                            question: "Why does incomplete documentation delay term policy approval?",
                            answer: "Insurers rely heavily on documents to assess risk and eligibility. Usually, a term policy is issued within 7 to 10 working days if all documents and medicals are clear. If additional medical tests or financial checks are required, it may take up to 4 weeks, depending on underwriting. Missing or unclear paperwork can slow down underwriting or lead to additional queries. At Ditto, our advisors help you understand what may be needed in advance so you can keep everything ready and ensure smoother policy issuance.",
                        },
                        {
                            question: "How long does a term insurance claim take to settle?",
                            answer: "For straightforward death claims with no investigation, insurers typically settle the payout within 15 days of claim submission. If an investigation is required, the claim settlement may take up to 45 days from the date of notification. This ensures timely support for the nominee while allowing the insurer to verify details when needed. As per IRDAI’s master circular on protection of policyholders’ interests, you can contact the insurer’s grievance redressal cell or escalate to the Insurance Ombudsman in case of delays.",
                        },
                        {
                            question: "How to calculate a term insurance premium?",
                            answer: "The best way to calculate premiums is by using a term insurance calculator. You can compare different premium amounts (monthly, annual) against specific sums assured to find an affordable, customized life insurance plan. Insurers look at several factors, such as age, policy and payment tenure, pre-existing diseases (PEDs) like diabetes or high blood pressure, smoking or drinking history, and high-risk jobs when calculating premiums. For instance, activities such as smoking or heavy drinking can push premiums up by 50–100%. Meanwhile, women generally pay lower premiums due to longer life expectancy.",
                        },
                    ],
                },
            },
            {
                id: "reviews",
                type: "reviews",
                data: {
                    rating: 4.9,
                    totalCount: 20915,
                    items: [
                        {
                            name: "INDHUMATHI M",
                            initials: "I",
                            body: "Policymine is doing really great. Absolutely spam free- that's the best part. They don't talk to you like they are forced to sell the product. It's more like, helping us buy better. Advisor Nuha was very patient and answered all my questions with clarity. Thanks for the service",
                        },
                        {
                            name: "Ragul Kumar",
                            initials: "RK",
                            body: "Loved the service! Maheta Nidhi Hitesh was incredibly helpful and knowledgeable. She guided me through the whole process and made everything super easy to understand. I really appreciated how patient she was with all my questions—there was no pressure at all, just clear and honest advice. Honestly, I'm very happy with my experience at Policymine so far. Highly recommend!",
                        },
                        {
                            name: "Pulkit Singh",
                            initials: "PS",
                            body: "I had a great experience with Policymine while exploring health insurance options. The process was smooth and everything was explained clearly. A special thanks to Swaroop SK for patiently answering all my questions and guiding me through the policy details without any pressure. The transparency and support made it much easier to understand and choose the right plan. Really appreciate the assistance!",
                        },
                        {
                            name: "Samil Shah",
                            initials: "SS",
                            body: "Had a great experience with Policymine Insurance. Ishita Sudrania was extremely helpful in guiding me through choosing the right term plan. There was no spamming or sales pressure, and all my questions were patiently answered. She also assisted me thoroughly with the entire application process. Highly recommend!",
                        },
                        {
                            name: "Raghappriya Marimuthusamy",
                            initials: "RM",
                            body: "I had a great experience with Policymine while filing my health insurance claim. Their team guided me clearly through the entire process, helped with the required documents, and promptly answered all my queries. Their support made the claim process much smoother and less stressful. Highly appreciate their assistance.",
                        },
                    ],
                },
            },
        ],
    })

    await PageContent.create({
        pageKey: "term-life/how-to-buy-term-insurance",
        title: "How to Buy Term Insurance",
        section: "term-life",
        published: true,
        seo: {
            metaTitle: "How to Buy Term Insurance in India: A Step-by-Step Guide",
            metaDescription: "Learn how to buy term insurance in India step-by-step. Understand sum assured, policy tenure, medical disclosures, documents, and claim details.",
            keywords: ["how to buy term insurance", "buy term insurance online", "term insurance guide"],
        },
        blocks: [
            {
                id: "buy-hero",
                type: "hero",
                data: {
                    title: "How to Buy Term Insurance in India: A Step-by-Step Guide",
                    publishedDate: "12 Jun, 2026",
                    author: { name: "Avni Mittal", role: "Insurance Writer" },
                    reviewer: { name: "Gaurav Bhat", role: "IRDAI-Certified Expert at Policymine" },
                    certificationId: "SP0738578124",
                },
            },
            {
                id: "buy-overview",
                type: "rich_text",
                data: {
                    content:
                        "<p>To buy term insurance in India, start by comparing reliable insurers, choosing the right life cover, checking documents, and completing the process online. A standard ₹2 crore cover starts at around ₹20,000 per year for a 30-year-old healthy, non-smoking male, until age 65. Premiums differ based on your age, gender, policy term, health status, and lifestyle habits.</p><p>Policymine’s top recommendation for 2026 is Smart Term Plan Plus, by Axis Max Life, backed by a 99.62% average claim settlement ratio across FY 2022-25. We rate plans based on insurer reliability, claim settlement ratio, amount settlement ratio, solvency, complaints, features, flexibility, and premiums.</p><p>This guide is for salaried earners, young families, and first-time buyers who want to confidently buy term insurance online.</p><p>India's life insurance penetration stood at just 2.7% of GDP in FY 2024-25, according to IRDAI's annual report. That means an overwhelming majority of Indian families have no financial safety net if the breadwinner passes away unexpectedly.</p><p>If something happens to you tomorrow, your family does not just lose you. They lose your income, their ability to pay the home loan EMI, fund your child's education, and manage day-to-day expenses.</p><p>This is exactly why buying term insurance is one of the most important financial decisions you can make. And the best time to do it was yesterday.</p><p>This guide covers term insurance basics, Policymine’s top 2026 picks, key buying tips, steps for an online purchase, and the required documents.</p>",
                },
            },
            {
                id: "buy-advisor-cta",
                type: "cta_block",
                data: {
                    title: "Need help to buy term insurance online? Book a free call or chat on WhatsApp with a Policymine advisor who can guide you through each step.",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "buy-what-is-definition",
                type: "rich_text",
                data: {
                    content:
                        "<h2>What Is Term Insurance?</h2><p>Term insurance is the simplest form of life insurance. You choose a cover amount and a policy term, which means the number of years your family stays protected. If you pass away during this term, your nominee gets the sum assured.</p><p>Imagine you are 28, recently married, and have a ₹50 lakh home loan. You buy a ₹2 crore term plan for 30 years. If something happens to you in year 10, your family gets ₹2 crore. This can help them repay the loan, manage living expenses, and fund future goals, such as your child’s education.</p><h4>Key Features of a Term Plan:</h4><ul><li>Fixed premiums throughout the policy tenure, so the earlier you buy, lower the premium you lock in</li><li>High coverage amount for a low premium</li><li>Optional riders like critical illness cover and waiver of premium</li><li>No maturity benefit in standard plans, though return-of-premium variants exist, but are usually poor value due to high premiums and zero real return</li><li>You can return the policy within 30 days of receiving it and get a refund (free-look period)</li><li>You get 30 days to pay a missed annual, half-yearly, or quarterly premium, and 15 days for a monthly premium (grace period)</li><li>After 3 years, a life insurance policy can only be questioned in cases of clear fraud (section 45 of the Insurance Act, 1938)</li></ul><p>Let’s take a look at the infographic below to understand how term insurance works.</p>",
                },
            },
            {
                id: "buy-best-plans",
                type: "plans_table",
                data: {
                    title: "Policymine's Pick for Best Term Insurance Plans in 2026",
                    rows: [
                        { plan: "Axis Max Life Insurance Smart Term Plan Plus", riders: "Critical illness (up to 64 illnesses), Waiver of Premium, Terminal illness payout", csr: "99.62%", rating: "4.7/5", policymineRating: 4.7 },
                        { plan: "HDFC Life Insurance Click2Protect Supreme Plus", riders: "Waiver of Premium, Critical illness, structured disability income", csr: "99.55%", rating: "4.4/5", policymineRating: 4.4 },
                        { plan: "ICICI Prudential Life Insurance iProtect Smart Plus", riders: "Accidental Death, Terminal Illness, Multi-payout", csr: "98.03%", rating: "4.3/5", policymineRating: 4.3 },
                        { plan: "Bajaj Life Insurance eTouch II", riders: "Terminal Illness, Accidental Disability waiver, Zero Cost option", csr: "99.21%", rating: "4.2/5", policymineRating: 4.2 },
                        { plan: "Aditya Birla Sun Life Insurance Super Term Plan", riders: "Accidental Death cover, Critical Illness riders", csr: "97.5%", rating: "4.0/5", policymineRating: 4.0 },
                    ],
                },
            },
            {
                id: "buy-expert-cta",
                type: "cta_block",
                data: {
                    title: "Talk to an expert today and find the right insurance for you.",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "buy-premium-comparison",
                type: "comparison_table",
                data: {
                    title: "Premium Comparison: Top 5 Term Insurance Plans",
                    columns: ["Profile", "Smart Term Plan Plus", "Click2Protect Supreme Plus", "iProtect Smart Plus", "eTouch II", "Super Term Plan"],
                    rows: [
                        ["25, Male", "₹17,222", "₹19,719", "₹16,111", "₹15,474", "₹18,607"],
                        ["25, Female", "₹14,640", "₹16,761", "₹13,694", "₹14,482", "₹16,343"],
                        ["30, Male", "₹20,656", "₹25,153", "₹19,283", "₹20,132", "₹21,767"],
                        ["30, Female", "₹17,558", "₹21,380", "₹16,391", "₹16,234", "₹18,235"],
                    ],
                },
            },
            {
                id: "buy-premium-note",
                type: "note_box",
                data: {
                    label: "Premium Note",
                    content: "For the above example, we’ve considered healthy, non-smoking, salaried individuals living in a tier-1 city such as Delhi (pincode: 110010), covered for a sum assured of ₹2 crore until age 65. The premiums are indicative and can vary based on your age, health conditions, lifestyle choices, and underwriting decisions.",
                },
            },
            {
                id: "buy-importance-insights",
                type: "rich_text",
                data: {
                    content:
                        "<h2>Why Is Buying Term Insurance Important in 2026?</h2><ul><li><strong>Premiums Have Been Rising:</strong> Over the years, premiums have gradually increased due to higher demand, richer plan features, medical inflation, and evolving underwriting norms. Post-COVID-19, this rise became more noticeable as insurers reassessed mortality trends, so delaying by even a year could mean paying more for the same cover.</li><li><strong>Financial Responsibilities Are Growing Faster:</strong> Home loan EMIs, dependents, and education costs are all rising. A ₹1 crore cover that worked in 2015 may fall short today for metro-based primary earners.</li><li><strong>Health Conditions Are Being Detected Earlier:</strong> Routine checkups now flag issues like pre-diabetes, blood pressure, or cholesterol much earlier. Once diagnosed, insurers may increase your premium or restrict your coverage, so buying early helps lock in your premium.</li><li><strong>Buying Term Insurance Online Has Become Simpler:</strong> Digital KYC, online medical forms, and paperless onboarding have made term insurance easier to buy. Many standard profiles are now issued faster, sometimes almost instantly.</li></ul><h2>Policymine’s Expert Insights on Buying Term Insurance in India</h2><ul><li><strong>Buy Early and Buy Young:</strong> Term insurance is cheaper when you buy it young and healthy because insurers price your premium based on your age, health, and risk profile at the time of purchase. Waiting until later may mean higher premiums, stricter underwriting, or even difficulty getting adequate cover if health issues develop.</li><li><strong>Most People Underestimate How Much Cover They Need:</strong> Many buyers choose a round number, such as ₹1 crore, because it sounds large. But the right cover depends on your age, expenses, loans, coverage duration, dependents, and future goals. Use Policymine’s term insurance cover calculator to estimate your actual need instead of guessing.</li><li><strong>The Cheapest Plan Is Rarely the Best Plan:</strong> A low premium should not be your only filter. Saving ₹2,000 a year means little if the insurer handles claims poorly or provides poor service. Your family will deal with the insurer at the worst possible time, so reliability matters more than a small difference in premium. Check out our detailed guide on the best term insurance companies to find a reliable insurer.</li><li><strong>Do Not Depend Only on Corporate Cover:</strong> Your employer-provided life cover may feel convenient, but it is usually limited and tied to your job. If you switch jobs, lose employment, or take a career break, this cover may stop. A personal term insurance plan ensures your family has independent protection that continues regardless of where you work.</li><li><strong>Riders Should Be Chosen Carefully:</strong> Critical illness and waiver of premium riders each solve a different problem. Adding every rider can inflate your premium without adding meaningful value. Choose riders in term insurance based on your occupation, lifestyle, and existing emergency fund and health insurance cover.</li><li><strong>Disclosure Is Everything:</strong> This is one of the biggest mistakes buyers make. Do not hide health conditions, family history, smoking, or occasional tobacco use. If the insurer later finds material non-disclosure, they can reject the claim, so honest disclosure protects your family more than any plan feature.</li><li><strong>Discuss the Plan With Your Spouse and Inform Nominees:</strong> Discuss the cover amount with your spouse and inform your nominees about the policy, insurer, claim process, and where the documents are stored so they are not left confused during an already difficult time.</li></ul>",
                },
            },
            {
                id: "buy-things-to-keep-in-mind",
                type: "numbered_cards",
                data: {
                    title: "Things to Keep in Mind Before You Buy Term Insurance",
                    quickTake: "Always evaluate these factors before signing any term policy document:",
                    cards: [
                        { number: 1, title: "Evaluate the Insurer, Not Just the Plan", body: "Check the insurer’s 3-year average Claim Settlement Ratio (CSR), Amount Settlement Ratio (ASR), and solvency ratio. Ideally, CSR should be above 97%, ASR above 90%, low complaints volume (less than 20 per 10,000 claims), and solvency above the IRDAI-mandated 1.5x." },
                        { number: 2, title: "Choose the Right Sum Assured", body: "At Policymine, we suggest choosing a cover based on your expenses, liabilities, dependents, and future goals. Two people with the same income may need very different levels of cover because their EMIs, household costs, family responsibilities, and savings can differ widely." },
                        { number: 3, title: "Pick the Right Policy Tenure", body: "Your term plan should cover your peak-earning and liability years, ideally through at least age 60 to 65. Factor in home loans, children’s financial independence, and other long-term responsibilities." },
                        { number: 4, title: "Be Honest in Your Medical Disclosure", body: "Disclose pre-existing conditions, family history of heart disease, diabetes, or cancer, smoking, alcohol use, and risky occupations. Non-disclosure is a common reason for claim disputes." },
                        { number: 5, title: "Avoid Return-of-Premium Plans", body: "ROP plans refund premiums if you survive the policy term, but they often cost up to 2 times more than standard term plans. Standard term plans are the smarter choice for most buyers." },
                    ],
                },
            },
            {
                id: "buy-intermediary-steps",
                type: "rich_text",
                data: {
                    content:
                        "<h2>Why Is Having an Intermediary Important While Buying Term Insurance?</h2><p>Buying term insurance directly from an insurer is possible, but first-time buyers often miss important details:</p><ul><li>Pick the first plan on a comparison site while ignoring the claim track record</li><li>Choose the wrong riders</li><li>Underestimate cover</li><li>Missed disclosures that can hurt the claim later</li></ul><p>A good, non-commission-driven intermediary like Policymine helps you compare plans objectively, understand fine print, choose the right cover, and disclose everything correctly. Moreover, our support continues even at claim time, which is when the policy matters most.</p>",
                },
            },
            {
                id: "buy-steps-online",
                type: "how_it_works_steps",
                data: {
                    title: "How to Buy Term Insurance Online Through Policymine: Step-By-Step",
                    steps: [
                        { text: "<strong>Understand Your Policy:</strong> Review features, benefits, exclusions, and claim metrics, so you know what’s covered, what isn’t, and how reliable the insurer is." },
                        { text: "<strong>Share Basic Details:</strong> Enter your age, gender, location, smoking habits, income, and monthly expenses to estimate the cover amount you need." },
                        { text: "<strong>Choose Cover and Payment:</strong> Select your cover amount, add-ons, policy term, and payment frequency so the plan fits your budget." },
                        { text: "<strong>Apply and Get Issued:</strong> Submit accurate details, upload documents, complete payment, and go through underwriting. Once verified, your policy gets issued." },
                    ],
                },
            },
            {
                id: "buy-claims-story",
                type: "note_box",
                data: {
                    label: "Policymine Claims Story: Why the Right Term Plan and Paperwork Matter",
                    content: "A policyholder passed away during a recreational snorkeling trip abroad. Since the death happened overseas and within the first 3 years of the policy, the insurer examined the ₹5 crore term insurance claim closely and asked for multiple documents. The spouse had to arrange a death certificate and police report from the local authorities in the foreign country. Policymine coordinated with the family and the insurer through every round of documentation and follow-up. Despite the complexity, the claim was approved and settled in full within 2 to 3 months. Takeaway: Clear paperwork can make all the difference for your family.",
                },
            },
            {
                id: "buy-documents-required",
                type: "rich_text",
                data: {
                    content:
                        "<h2>Documents Required to Buy Term Insurance Online in India</h2><p>To buy a term insurance policy, you need to submit documents for KYC, age proof, income verification, medical assessment, and nominee registration. In many cases, one document can serve multiple purposes.</p><ul><li><strong>Basic KYC Documents:</strong> Aadhaar card, PAN card, passport, voter ID, driving license, recent utility bill, bank statement, or rent agreement.</li><li><strong>Age Proof:</strong> Birth certificate, passport, Aadhaar card, PAN card, or 10th/12th marksheet.</li><li><strong>Income Proof:</strong> Salary slips, ITRs, bank statements, Form 16, audited accounts, or CA-certified computation of income.</li><li><strong>Medical Documents:</strong> Medical examination report, blood/urine test results, ECG/TMT reports, or previous hospitalization records, if required.</li><li><strong>Nominee Details:</strong> Nominee’s full name, relationship with the policyholder, and percentage share.</li><li><strong>Photograph and Signature:</strong> Recent passport-size photograph and policyholder’s signature.</li></ul><p>After document submission, the insurer completes KYC, reviews your medical and income details, may conduct tele/video verification or medical tests, and then issues the policy after underwriting approval. This can take anywhere from a few days to 2–3 weeks, depending on the sum assured, medical history, occupation, and other disclosures.</p>",
                },
            },
            {
                id: "buy-why-choose-us",
                type: "benefits_list",
                data: {
                    title: "Why Choose Policymine for Term Insurance?",
                    items: [
                        { heading: "No-Spam & No Salesmen", body: "We never spam you or push products you don't need." },
                        { heading: "Rated 4.9/5 on Google Reviews", body: "Trusted by over 15,000+ happy customers." },
                        { heading: "Backed by Zerodha", body: "Part of the Rainmatter fintech ecosystem." },
                        { heading: "Dedicated Claim Support Team", body: "We stand by your family when they need it most." },
                        { heading: "100% Free Consultation", body: "Absolutely free, unbiased advice." },
                    ],
                },
            },
            {
                id: "buy-consultation-cta",
                type: "cta_block",
                data: {
                    title: "You can book a FREE consultation. Slots are running out, so make sure you book a call or chat on WhatsApp now!",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "buy-policymine-take",
                type: "policymine_take",
                data: {
                    title: "Policymine’s Take on Buying Term Insurance",
                    body: "Buying term insurance is not complicated. But buying it incorrectly can have consequences. Too little coverage, an insurer with a weak claims track record, or a plan with conditions your family cannot navigate under stress can undermine the entire purpose of having the policy. Start with the insurer. Look for a 3-year average CSR above 97%, an ASR above 90%, and a solvency ratio comfortably above 1.5x. Size your cover correctly. Choose a policy tenure that covers your financial responsibility years, typically until 60 to 65. Be completely honest in your disclosure. Add riders only if they address a real gap in your protection.",
                },
            },
            {
                id: "buy-faq",
                type: "faq",
                data: {
                    items: [
                        {
                            question: "What is term insurance, and how does it work?",
                            answer: "Term insurance is the simplest form of life insurance. You pick a cover amount and a policy duration, pay a fixed annual premium, and if you pass away during that period, your nominee receives the full sum assured. There are no maturity payouts in a standard plan.",
                        },
                        {
                            question: "How much term insurance cover do I actually need?",
                            answer: "At Policymine, we recommend calculating your coverage based on your outstanding uninsured loans, monthly household expenses, the number of dependents, and long-term financial goals. Use our cover calculator to estimate your actual number.",
                        },
                        {
                            question: "What is a good claim settlement ratio for term insurance in India?",
                            answer: "We recommend picking an insurer with a 3-year average CSR of at least 97%. However, CSR alone is not enough; ASR should ideally be above 90%, and solvency ratio above 1.5x. Axis Max Life leads the industry with a 99.62% average CSR.",
                        },
                    ],
                },
            },
            {
                id: "buy-reviews",
                type: "reviews",
                data: {
                    rating: 4.9,
                    totalCount: 20915,
                    items: [
                        {
                            name: "INDHUMATHI M",
                            initials: "I",
                            body: "Policymine is doing really great. Absolutely spam free- that's the best part. They don't talk to you like they are forced to sell the product. It's more like, helping us buy better. Advisor Nuha was very patient and answered all my questions with clarity. Thanks for the service",
                        },
                        {
                            name: "Ragul Kumar",
                            initials: "RK",
                            body: "Loved the service! Maheta Nidhi Hitesh was incredibly helpful and knowledgeable. She guided me through the whole process and made everything super easy to understand. I really appreciated how patient she was with all my questions—there was no pressure at all, just clear and honest advice. Honestly, I'm very happy with my experience at Policymine so far. Highly recommend!",
                        },
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
                id: "vs-hero",
                type: "hero",
                data: {
                    title: "Term Insurance vs Life Insurance",
                    author: { name: "Swetlana Neog", role: "Editorial Associate" },
                    reviewer: { name: "Gaurav Bhat", role: "IRDAI-Certified Expert at Policymine" },
                    certificationId: "SP0738578124",
                },
            },
            {
                id: "vs-overview",
                type: "rich_text",
                data: {
                    content:
                        "<p>Term insurance is a type of pure-protection life insurance that provides a death benefit if the policyholder passes away during the policy term. On the other hand, life insurance is a broader category that includes policies that combine savings or market-linked investment with insurance and provide a payout at maturity if you survive.</p><p>The premiums for both categories are quite different. For instance, a 30-year-old individual seeking a ₹1 crore cover pays ₹14,997 under the HDFC Click 2 Protect Supreme Plus term plan (one of our top recommendations). However, the premium under the return of premium version is ₹34,868 for the same profile.</p><p>This guide is ideal for those who want to learn how life insurance or term insurance works, what they pay out, and who they truly make sense for.</p><p>India’s insurance market today is packed with options, from digital-first insurers to more transparent products. According to IRDAI Annual Report (FY 2024-25), India’s overall insurance penetration stands at 3.7%, with life insurance at 2.7% and non-life insurance at 1%.</p><p>At the same time, more households are becoming aware of how insurance can protect their family’s future against unexpected risks. This is where one common question comes in: term insurance vs life insurance. Should you choose a simple, affordable term plan that offers a large safety net? Or should you pick a broader life insurance product that combines protection with savings or investment?</p>",
                },
            },
            {
                id: "vs-advisor-cta",
                type: "cta_block",
                data: {
                    title: "Looking to buy the right life or term insurance plan? Book a free call or chat on WhatsApp with a Policymine advisor.",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "vs-what-is-term",
                type: "rich_text",
                data: {
                    content:
                        "<h2>What Is Term Insurance?</h2><p>Term insurance is a pure protection plan. You pay a fixed premium for a defined period, usually 20, 30, or 40 years. If you pass away during that period, your nominee receives the sum assured as a lump sum. If you outlive the policy, the coverage simply ends, and nothing is paid out.</p><p>A ₹1 crore term cover for a healthy 30-year-old typically costs ₹10,000 to ₹12,000 per year.</p><h4>Key features of term insurance include:</h4><ul><li><strong>High Cover at Low Premiums:</strong> Often the cheapest way to get ₹50 lakh–₹5 crore of protection, depending on underwriting.</li><li><strong>Fixed Tenure:</strong> Typically 20 to 40 years or cover till age 85 (sometimes 99).</li><li><strong>No Investment Element:</strong> Premiums only pay for risk coverage.</li><li><strong>Clear Claim Triggers:</strong> Death and, in some plans, terminal illness.</li><li><strong>Tax Benefits:</strong> Premiums paid may qualify under Section 80C (old regime), and death benefits are tax-free under Section 10(10D) for the nominees.</li></ul>",
                },
            },
            {
                id: "vs-types-term",
                type: "types_list",
                data: {
                    title: "Types of Term Insurance",
                    items: [
                        { type: "Level Term", feature: "SA fixed throughout the policy term. Premiums stay constant. Default recommendation.", example: "Bajaj Life eTouch II" },
                        { type: "Increasing Cover", feature: "Cover amount increases annually to align with inflation.", example: "HDFC Life Click2Protect Supreme Plus" },
                        { type: "Return of Premium (TROP)", feature: "Returns base premiums if you survive. Not recommended due to high cost.", example: "Axis Max Life, HDFC Click2Protect Supreme Plus" },
                        { type: "Group/Joint Term", feature: "Employer/bank linked cover or joint life. Payout and rider limitations.", example: "Corporate group cover" },
                    ],
                },
            },
            {
                id: "vs-what-is-life",
                type: "rich_text",
                data: {
                    content:
                        "<h2>What Is Life Insurance?</h2><p>Life insurance refers to a broad category of policies that provide a payout upon death and, in many cases, also offer savings or investment benefits upon survival or maturity.</p><p>In simple terms, life insurance is a contract where the insurer promises to pay a fixed amount if the insured person dies during the policy term. In some plans, the insured also receives a maturity benefit if they survive the term.</p><p>For easier understanding, life insurance products can be grouped into two broad buckets:</p><ul><li><strong>Pure Protection Plans:</strong> They cover only the risk of death (e.g., term insurance).</li><li><strong>Protection‑Plus‑Savings:</strong> These plans combine life cover with returns or investments (e.g., endowment, money‑back, ULIPs, and whole‑life policies).</li></ul>",
                },
            },
            {
                id: "vs-comparison-table",
                type: "comparison_table",
                data: {
                    title: "Term Insurance vs Life Insurance: Side-by-Side Comparison",
                    columns: ["Feature", "Term Insurance", "Traditional Life Insurance"],
                    rows: [
                        ["Cover Amount", "High cover as a death benefit only (20x-30x annual income)", "Limited as per the cover and savings/maturity (usually 5x-10x annual premiums)"],
                        ["Purpose", "Financial safety of the family", "Protection plus savings/investment"],
                        ["Premium Amount", "Low and provides high coverage at an affordable cost", "Higher premium due to savings or investment components"],
                        ["Maturity Benefits", "No maturity benefit (unless TROP is opted)", "Yes, if you survive the term"],
                        ["Additional Benefits", "Riders, health management services, premium break, and instant claim payout", "Bonuses, loyalty additions, and riders"],
                    ],
                },
            },
            {
                id: "vs-premiums-intro",
                type: "rich_text",
                data: {
                    content:
                        "<h2>Premium Comparison</h2><p>The math here matters. If you buy term insurance and separately invest the premium difference in mutual funds, you end up with far greater insurance coverage, far greater investment wealth, and better liquidity.</p>",
                },
            },
            {
                id: "vs-term-trop-premiums",
                type: "comparison_table",
                data: {
                    title: "Term vs TROP Premiums (30-year-old Male, ₹1 Crore cover up to 65 years, HDFC Life)",
                    columns: ["Term Premium", "TROP Premium"],
                    rows: [
                        ["₹14,997", "₹34,868"],
                    ],
                },
            },
            {
                id: "vs-term-trop-note",
                type: "note_box",
                data: {
                    label: "Note on TROP",
                    content: "Here, you can clearly see that the premiums for the TROP are almost 125% higher than those of the pure term plan.",
                },
            },
            {
                id: "vs-endowment-premiums",
                type: "comparison_table",
                data: {
                    title: "Endowment Plan Premiums (HDFC Life Sanchay Plus)",
                    columns: ["Plan Option", "Sum Assured", "Policy Term", "Premium Paying Term", "Maturity Benefit"],
                    rows: [
                        ["Guaranteed Maturity", "₹1,00,000", "20 Years", "10 Years", "₹25,63,120 paid as a lump sum at maturity"],
                        ["Guaranteed Income", "₹1,25,000", "13 Years", "12 Years", "Guaranteed income of ₹2,04,000 PA from 14th year to 25th year (12-year payout)"],
                        ["Long Term Income", "₹1,25,000", "11 Years", "10 Years", "Guaranteed income of ₹98,250 PA from 12th to 36th year + ₹10,00,000 at end"],
                        ["Life Long Income", "₹1,05,000", "11 Years", "10 Years", "Guaranteed income of ₹81,250 PA from 12th year till age 99 + ₹1,00,000 at end"],
                    ],
                },
            },
            {
                id: "vs-ulip-premiums",
                type: "comparison_table",
                data: {
                    title: "ULIP Premiums (HDFC Life Sampoorn Nivesh Plus, 30-year-old, ₹20 SA for 30 years)",
                    columns: ["Particulars", "Details"],
                    rows: [
                        ["Plan Option", "Classic Benefit (Extra Life Option)"],
                        ["Policy Term", "30 Years"],
                        ["Premium Payment Term", "10 Years"],
                        ["Annual Premium", "₹1,00,000"],
                        ["Total Premiums Paid", "₹10,00,000"],
                        ["Maturity Benefit at 8% PA", "₹43,45,970"],
                        ["Maturity Benefit at 4% PA", "₹13,94,698"],
                        ["Death Benefit During Term", "₹20,00,000 or fund value, whichever is higher"],
                    ],
                },
            },
            {
                id: "vs-shrehith-take",
                type: "policymine_take",
                data: {
                    title: "Policymine’s Expert Insights on Term Insurance vs Life Insurance",
                    body: "Shrehith, our co-founder, says that term insurance is more important than other types of life insurance. According to him, the idea is simple: 'Insurance should primarily be about protection, not investment. That’s the problem with many other life insurance products. They mix insurance with savings or investments, but often don’t offer enough returns or enough protection. This is where term insurance has a clear advantage. It keeps things clean: you pay a low premium and get a high life cover, ensuring your family has strong financial protection if something happens to you.'",
                },
            },
            {
                id: "vs-how-to-choose",
                type: "rich_text",
                data: {
                    content:
                        "<h2>How to Choose the Right Cover Amount?</h2><p>There’s no fixed term cover that works for everyone. The right term insurance cover depends on your income, expenses, goals, and liabilities. At Policymine, we use the expense and liabilities replacement method to estimate the term cover you require.</p><h2>How to Choose Between Term and Life Insurance?</h2><h4>Choose Term Insurance If:</h4><ul><li>You have dependents who rely on your income: a spouse, children, or aging parents.</li><li>You have outstanding liabilities, such as a home loan.</li><li>You want the maximum possible cover at the lowest possible premium.</li><li>You are under 45, healthy, and buying early to lock in low rates.</li><li>You are disciplined enough to invest the premium difference separately.</li></ul><h4>Consider Traditional Life Insurance Only If:</h4><ul><li>You are extremely risk-averse and will not invest the premium difference yourself.</li><li>You are in a high net worth bracket and need a whole life plan specifically for estate planning or liquidity for heirs.</li><li>You want a small forced savings mechanism alongside a term plan, not instead of one.</li></ul>",
                },
            },
            {
                id: "vs-why-choose-us",
                type: "benefits_list",
                data: {
                    title: "Why Choose Policymine for Term Insurance?",
                    items: [
                        { heading: "No-Spam & No Salesmen", body: "We never spam you or push products you don't need." },
                        { heading: "Rated 4.9/5 on Google Reviews", body: "Trusted by over 15,000+ happy customers." },
                        { heading: "Backed by Zerodha", body: "Part of the Rainmatter fintech ecosystem." },
                        { heading: "Dedicated Claim Support Team", body: "We stand by your family when they need it most." },
                        { heading: "100% Free Consultation", body: "Absolutely free, unbiased advice." },
                    ],
                },
            },
            {
                id: "vs-consultation-cta",
                type: "cta_block",
                data: {
                    title: "You can book a FREE consultation. Slots are running out, so make sure you book a call or chat on WhatsApp now!",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "vs-verdict",
                type: "policymine_take",
                data: {
                    title: "Policymine's Verdict on Term Insurance vs Life Insurance",
                    body: "At Policymine, we recommend pure term insurance as the most efficient choice in the term insurance vs life insurance debate. It offers a large cover at a low premium because it does not mix protection with investment. Traditional plans like endowment, money-back, or ULIPs usually offer lower cover, higher costs, modest returns, and long lock-ins. For most people, it’s smarter to keep both goals separate: use term insurance for protection and options such as mutual funds, the Public Provident Fund (PPF), or Fixed Deposits (FDs) for wealth creation.",
                },
            },
            {
                id: "vs-faq",
                type: "faq",
                data: {
                    items: [
                        {
                            question: "What is the difference between term insurance and life insurance?",
                            answer: "Term insurance is a specific type of life insurance that provides coverage for a set period, such as 20 or 30 years, and pays out a death benefit only. Life insurance is an umbrella category that includes savings, ULIPs, and endowment products that offer both death benefits and maturity/survival returns.",
                        },
                        {
                            question: "Which is better: term insurance or traditional life insurance?",
                            answer: "For individuals seeking affordable financial protection for dependents, pure term insurance is the optimal choice. Traditional life insurance products bundle savings, which increases premium costs by 5 to 10 times while offering much lower coverage.",
                        },
                        {
                            question: "What happens if I outlive my term insurance policy?",
                            answer: "If you survive the coverage duration of a standard term insurance plan, the policy terminates with no maturity benefit paid out. This pure-protection design is why it remains the most economical approach.",
                        },
                    ],
                },
            },
            {
                id: "vs-reviews",
                type: "reviews",
                data: {
                    rating: 4.9,
                    totalCount: 20915,
                    items: [
                        {
                            name: "INDHUMATHI M",
                            initials: "I",
                            body: "Policymine is doing really great. Absolutely spam free- that's the best part. They don't talk to you like they are forced to sell the product. It's more like, helping us buy better. Advisor Nuha was very patient and answered all my questions with clarity. Thanks for the service",
                        },
                        {
                            name: "Ragul Kumar",
                            initials: "RK",
                            body: "Loved the service! Maheta Nidhi Hitesh was incredibly helpful and knowledgeable. She guided me through the whole process and made everything super easy to understand. I really appreciated how patient she was with all my questions—there was no pressure at all, just clear and honest advice. Honestly, I'm very happy with my experience at Policymine so far. Highly recommend!",
                        },
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
                id: "best-hero",
                type: "hero",
                data: {
                    title: "Best Term Insurance Plan: Top 5 Policies 2026",
                    subtitle: "Compare top-rated pure risk protection plans side-by-side. View claim settlement ratios, features, and expert Policymine ratings.",
                    author: { name: "Gargi Thakur", role: "Insurance Writer" },
                    reviewer: { name: "Gaurav Bhat", role: "IRDAI-Certified Expert at Policymine" },
                    certificationId: "SP0738578124",
                },
            },
            {
                id: "best-overview",
                type: "rich_text",
                data: {
                    content:
                        "<p>The 'best' term insurance plan is one tailored to your specific financial liabilities, age, and income, not just the one with the lowest premium.</p><p>Based on IRDAI data and Policymine's proprietary rating framework, which evaluates plans across 15+ factors, our top plan picks for 2026 are:</p><ol><li>Axis Max Life Smart Term Plan Plus (4.7/5)</li><li>HDFC Life Click 2 Protect Supreme Plus (4.4/5)</li><li>ICICI Prudential iProtect Smart Plus (4.3/5)</li><li>Bajaj Life eTouch II (4.2/5)</li><li>Aditya Birla Sun Life Super Term Plan (4.0/5)</li></ol><p>When comparing plans, focus on the Claim Settlement Ratio (≥98%), Amount Settlement Ratio, and Solvency Ratio (IRDAI mandates a minimum of 1.5x). At Policymine, we also recommend considering riders such as Critical Illness Cover, Waiver of Premium, and Disability Benefits on a case-by-case basis for more comprehensive protection.</p><p>Every financial goal you’re working towards, such as your home, your child’s education, and your family’s lifestyle, depends on your income. But what happens to these dreams if something happens to you and that income suddenly stops?</p><p>That’s where term insurance comes in. It acts as a financial safety net for your loved ones even in your absence. In exchange for a relatively small premium, your loved ones receive a substantial payout (or sum assured) should something happen to you during the policy term.</p>",
                },
            },
            {
                id: "best-advisor-cta",
                type: "cta_block",
                data: {
                    title: "India has 20+ term insurance companies. Confused about which one will best suit you? Book a free call or chat over WhatsApp with a Policymine advisor.",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "best-methodology",
                type: "rich_text",
                data: {
                    content:
                        "<h2>Policymine’s Rating Methodology</h2><p>To find the true best term insurance plan, we run them through a proprietary scoring matrix. All plans included in this guide are rated using our transparent policy rating framework, which scores each plan across three dimensions and 15+ factors:</p><ul><li><strong>Insurer Reliability (60%):</strong> We average IRDAI data (CSR, ASR, Solvency, Complaints) over the last 3 years to ensure an insurer performs consistently, so a single good or bad year doesn’t skew the rating.</li><li><strong>Product Features (30%):</strong> We analyze the fine print of policy brochures to measure how comprehensive the policy is. Does the policy offer premium deferment? Is the terminal illness benefit built in or charged extra? Are the terms rigid or flexible?</li><li><strong>Pricing (10%):</strong> We compare quotes across various ages, genders, and smoking habits to see which plans offer the best value for your money.</li></ul>",
                },
            },
            {
                id: "best-plans-table",
                type: "plans_table",
                data: {
                    title: "Best Term Insurance Plan in India: Policymine’s Top 5 Choices",
                    rows: [
                        { plan: "Axis Max Life Smart Term Plan Plus", riders: "Critical Illness (up to 64 illnesses), Cover continuance, Instant payout, Waiver of premium", csr: "99.62%", rating: "4.7/5", policymineRating: 4.7 },
                        { plan: "HDFC Life Click2Protect Supreme Plus", riders: "Waiver of premium, Life Stage Boosts, Smart Exit, Wellness benefits", csr: "99.55%", rating: "4.4/5", policymineRating: 4.4 },
                        { plan: "ICICI Prudential iProtect Smart Plus", riders: "Waiver of premium, Life Stage boosts, Smart Exit, Nominee options", csr: "98.03%", rating: "4.3/5", policymineRating: 4.3 },
                        { plan: "Bajaj Life eTouch II", riders: "Terminal illness waiver, early-exit value, accidental disability waiver", csr: "99.21%", rating: "4.2/5", policymineRating: 4.2 },
                        { plan: "Aditya Birla Sun Life Super Term Plan", riders: "Accelerated critical illness, cover continuance, early exit value", csr: "97.5%", rating: "4.0/5", policymineRating: 4.0 },
                    ],
                },
            },
            {
                id: "best-premium-comparison",
                type: "comparison_table",
                data: {
                    title: "Premium Comparison: Top 5 Term Insurance Plans",
                    columns: ["Profile", "Smart Term Plan Plus", "Click2Protect Supreme Plus", "iProtect Smart Plus", "eTouch II", "Super Term Plan"],
                    rows: [
                        ["25, Male", "₹17,222", "₹19,719", "₹16,111", "₹15,474", "₹18,607"],
                        ["25, Female", "₹14,640", "₹16,761", "₹13,694", "₹14,482", "₹16,343"],
                        ["30, Male", "₹20,656", "₹25,153", "₹19,283", "₹20,132", "₹21,767"],
                        ["30, Female", "₹17,558", "₹21,380", "₹16,391", "₹16,234", "₹18,235"],
                    ],
                },
            },
            {
                id: "best-premium-note",
                type: "note_box",
                data: {
                    label: "Premium Note",
                    content: "For the above example, we’ve considered healthy, non-smoking, salaried individuals living in a tier-1 city such as Delhi (pincode: 110010), covered for a sum assured of ₹2 crore until age 65. The premiums are indicative and can vary based on your age, health conditions, lifestyle choices, and underwriting decisions.",
                },
            },
            {
                id: "best-why-choose-us",
                type: "benefits_list",
                data: {
                    title: "Why Choose Policymine for Term Insurance?",
                    items: [
                        { heading: "No-Spam & No Salesmen", body: "We never spam you or push products you don't need." },
                        { heading: "Rated 4.9/5 on Google Reviews", body: "Trusted by over 15,000+ happy customers." },
                        { heading: "Backed by Zerodha", body: "Part of the Rainmatter fintech ecosystem." },
                        { heading: "Dedicated Claim Support Team", body: "We stand by your family when they need it most." },
                        { heading: "100% Free Consultation", body: "Absolutely free, unbiased advice." },
                    ],
                },
            },
            {
                id: "best-consultation-cta",
                type: "cta_block",
                data: {
                    title: "You can book a FREE consultation. Slots are running out, so make sure you book a call or chat on WhatsApp now!",
                    bookCallText: "Book a Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "best-faq",
                type: "faq",
                data: {
                    items: [
                        {
                            question: "How do I choose the best term insurance plan?",
                            answer: "Focus on the insurer's metrics (CSR >= 98%, ASR >= 90%, and solvency ratio >= 1.5x) and select custom riders (Waiver of Premium, Critical Illness) only if they suit your needs.",
                        },
                        {
                            question: "Is Axis Max Life Smart Term Plan Plus a good choice?",
                            answer: "Yes, it is highly recommended as it consistently secures the top spot with a 3-year average CSR of 99.62%, offering a balanced mix of features and affordable premium rates.",
                        },
                    ],
                },
            },
            {
                id: "best-reviews",
                type: "reviews",
                data: {
                    rating: 4.9,
                    totalCount: 20915,
                    items: [
                        {
                            name: "INDHUMATHI M",
                            initials: "I",
                            body: "Policymine is doing really great. Absolutely spam free- that's the best part. They don't talk to you like they are forced to sell the product. It's more like, helping us buy better. Advisor Nuha was very patient and answered all my questions with clarity. Thanks for the service",
                        },
                        {
                            name: "Ragul Kumar",
                            initials: "RK",
                            body: "Loved the service! Maheta Nidhi Hitesh was incredibly helpful and knowledgeable. She guided me through the whole process and made everything super easy to understand. I really appreciated how patient she was with all my questions—there was no pressure at all, just clear and honest advice. Honestly, I'm very happy with my experience at Policymine so far. Highly recommend!",
                        },
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
            metaDescription: "Buying term insurance in India for NRIs. Understand eligibility rules, NRE/NRO payment details, remote tele-medicals, and GST waiver benefits.",
            keywords: ["nri term insurance", "term plan for nri india", "buy insurance nri", "oci life insurance"],
        },
        blocks: [
            {
                id: "nri-hero",
                type: "hero",
                data: {
                    title: "NRI Term Insurance in India",
                    subtitle: "Comprehensive guide for Non-Resident Indians (NRIs), OCIs, and PIOs seeking term life cover. Save up to 50% on premiums compared to foreign policies.",
                    author: { name: "Subhashish Banerjee", role: "Insurance Writer" },
                    reviewer: { name: "Gaurav Bhat", role: "IRDAI-Certified Expert at Policymine" },
                    certificationId: "SP0738578124",
                },
            },
            {
                id: "nri-overview",
                type: "rich_text",
                data: {
                    content:
                        "<p>Can NRIs buy term insurance in India? Yes, absolutely. In fact, Indian term insurance is often significantly cheaper than similar policies in the UK, USA, or Gulf countries. NRIs can buy policies through online portals with remote tele-medicals, paying premiums directly via NRE, NRO, or foreign bank accounts.</p><p>This guide highlights key rules, documents, GST savings, and step-by-step instructions to buy term insurance online from abroad safely.</p>",
                },
            },
            {
                id: "nri-advisor-cta",
                type: "cta_block",
                data: {
                    title: "Connect with our specialized NRI support desk now. Get free, unbiased guidance from IRDAI-certified advisors.",
                    bookCallText: "Book NRI Call",
                    whatsappText: "Direct Support",
                },
            },
            {
                id: "nri-rules-table",
                type: "features_table",
                data: {
                    title: "Key Rules & Eligibility for NRI Term Insurance",
                    note: "Specific terms may vary based on country of residence and insurer policies.",
                    rows: [
                        { aspect: "Eligibility Status", feature: "Non-Resident Indians (NRIs), Overseas Citizens of India (OCIs), and Persons of Indian Origin (PIOs)." },
                        { aspect: "Age Range", feature: "Minimum 18 years, maximum entry age is usually capped at 60 to 65 years." },
                        { aspect: "Payout Currency", feature: "Settled in Indian Rupees (INR) to bank accounts within India." },
                        { aspect: "Payment Options", feature: "NRE, NRO, or foreign currency remittance channels." },
                        { aspect: "GST Benefit", feature: "18% GST waiver if premium is paid in foreign currency from an NRE/FCNR account." },
                        { aspect: "Global Coverage", feature: "Provides active protection regardless of where you reside globally." },
                    ],
                },
            },
            {
                id: "nri-steps",
                type: "how_it_works_steps",
                data: {
                    title: "How NRIs Can Buy Term Insurance Remotely",
                    steps: [
                        { text: "<strong>Compare & Select:</strong> Choose a plan and premium payment term that aligns with your family goals in India." },
                        { text: "<strong>Submit Status Proof:</strong> Upload copies of your passport, visa, and current country-of-residence proof." },
                        { text: "<strong>Complete Medicals:</strong> Schedule a tele-medical interview (video consultation with a certified doctor) or visit an approved local medical clinic." },
                        { text: "<strong>Pay Premium:</strong> Complete payment via NRE/NRO accounts to leverage applicable GST waiver benefits." },
                        { text: "<strong>Get Issued:</strong> The policy gets verified by underwriters and issued digitally via email." },
                    ],
                },
            },
            {
                id: "nri-benefits",
                type: "benefits_list",
                data: {
                    title: "Key Benefits for NRIs Buying in India",
                    items: [
                        { heading: "Lower Cost", body: "Indian term policies are highly cost-competitive globally, saving up to 50% compared to international covers." },
                        { heading: "GST Waiver Benefits", body: "NRIs paying premiums in foreign currency from NRE/FCNR accounts are eligible for an 18% GST discount on premium payments." },
                        { heading: "Global Coverage", body: "The death benefit is paid out to beneficiaries globally in foreign currency or INR without any legal restrictions." },
                        { heading: "Trustworthy Insurers", body: "Top Indian insurers have high solvency ratios and claim settlement metrics (ASR >= 90%)." },
                    ],
                },
            },
            {
                id: "nri-documents",
                type: "rich_text",
                data: {
                    content:
                        "<h2>Documents Required to Buy Term Insurance Online in India</h2><p>To buy a term insurance policy as an NRI, you need to submit the following documents:</p><ul><li><strong>Identity & Status Proof:</strong> Attested copy of your valid passport and OCI or PIO card (if applicable).</li><li><strong>Income Proof:</strong> Salary slips, employment contract, foreign bank statements, or Income Tax Returns (ITR).</li><li><strong>Address Proof:</strong> Proof of residence in your current country of stay (e.g., utility bill or bank statement).</li><li><strong>Medical Documents:</strong> Proposal forms and copy of recent medical records (if any pre-existing health issues exist).</li></ul>",
                },
            },
            {
                id: "nri-verdict",
                type: "policymine_take",
                data: {
                    title: "Policymine's Verdict on NRI Term Insurance",
                    body: "For NRIs with dependents or liabilities (like home loans) in India, buying a term plan in India is the most cost-effective and secure approach. It ensures your family's lifestyle remains unaffected during emergencies. We recommend choosing Level Term cover and utilizing the GST waiver by paying via an NRE account.",
                },
            },
            {
                id: "nri-faq",
                type: "faq",
                data: {
                    items: [
                        {
                            question: "Can an NRI buy term insurance in India?",
                            answer: "Yes. NRIs, OCIs, and PIOs holding a valid Indian passport or card are fully eligible to buy term insurance from Indian insurers, with options for remote paperless verification and medical checkups.",
                        },
                        {
                            question: "How can NRIs pay term insurance premiums?",
                            answer: "NRIs can pay premiums online using their NRE or NRO bank accounts, credit cards, or foreign currency remittance channels. Paying in foreign currency via NRE accounts allows you to claim an 18% GST discount.",
                        },
                        {
                            question: "Is remote tele-medical examination available for NRIs?",
                            answer: "Yes, most top insurers allow remote video/tele-medicals for standard covers. For higher sum assured, you may have to visit an approved local medical clinic in your country of residence.",
                        },
                    ],
                },
            },
            {
                id: "nri-reviews",
                type: "reviews",
                data: {
                    rating: 4.9,
                    totalCount: 20915,
                    items: [
                        {
                            name: "INDHUMATHI M",
                            initials: "I",
                            body: "Policymine is doing really great. Absolutely spam free- that's the best part. They don't talk to you like they are forced to sell the product. It's more like, helping us buy better. Advisor Nuha was very patient and answered all my questions with clarity. Thanks for the service",
                        },
                        {
                            name: "Ragul Kumar",
                            initials: "RK",
                            body: "Loved the service! Maheta Nidhi Hitesh was incredibly helpful and knowledgeable. She guided me through the whole process and made everything super easy to understand. I really appreciated how patient she was with all my questions—there was no pressure at all, just clear and honest advice. Honestly, I'm very happy with my experience at Policymine so far. Highly recommend!",
                        },
                    ],
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
            metaTitle: "What is Health Insurance? A Simple Guide for Beginners 2026",
            metaDescription: "Learn what health insurance is, how it works, pre-existing waiting periods, cashless hospitalization, co-payment clauses, and how to choose the right plan.",
            keywords: ["what is health insurance", "health insurance basics", "medical insurance guide", "cashless hospitalization"],
        },
        blocks: [
            {
                id: "health-hero",
                type: "hero",
                data: {
                    title: "What is Health Insurance?",
                    subtitle: "A simple guide to healthcare cover. Understand how medical policies shield you from soaring hospital bills and protect your savings.",
                    author: { name: "Pratyusha Chatterjee", role: "Insurance Writer" },
                    reviewer: { name: "Gaurav Bhat", role: "IRDAI-Certified Expert at Policymine" },
                    certificationId: "SP0738578124",
                },
            },
            {
                id: "health-overview",
                type: "rich_text",
                data: {
                    content:
                        "<p>Medical emergencies never send a warning. With hospital room rents and treatment costs growing at 10-15% annually in India, a single hospitalization can wipe out years of savings. Health insurance is a contract between you and an insurer where they pay for your medical and surgical expenses in exchange for an annual premium.</p><p>A good health insurance policy protects your hard-earned savings. Let's look at the essential features of medical covers, how claim settlement works, and tips to pick the right plan.</p>",
                },
            },
            {
                id: "health-advisor-cta",
                type: "cta_block",
                data: {
                    title: "Confused about waiting periods or room rent limits? Book a free, no-spam consultation with a Policymine advisor today.",
                    bookCallText: "Book Free Call",
                    whatsappText: "Chat on WhatsApp",
                },
            },
            {
                id: "health-features-table",
                type: "features_table",
                data: {
                    title: "Essential Health Insurance Features to Evaluate",
                    note: "Specific procedure limits and waiting periods vary by policy.",
                    rows: [
                        { aspect: "Cashless Hospitalization", feature: "Receive treatment at network hospitals where the insurer settles bills directly, removing upfront payments." },
                        { aspect: "Waiting Periods", feature: "The time you must wait (typically 2-4 years) before pre-existing diseases like diabetes or hypertension are covered." },
                        { aspect: "Room Rent Limits", feature: "Caps on the daily hospital room charges. We advise opting for plans with 'No Room Rent Limits'." },
                        { aspect: "Co-payment Clause", feature: "A clause requiring you to pay a percentage of the claim amount. We generally suggest avoiding plans with co-payment." },
                        { aspect: "Pre & Post Hospitalization", feature: "Coverage for medical costs (diagnostics, medicines) incurred before admission (30-60 days) and after discharge (60-90 days)." },
                        { aspect: "Restoration Benefit", feature: "Replenishes your sum insured if it gets exhausted during the policy year, leaving cover available for other illnesses." },
                    ],
                },
            },
            {
                id: "health-steps",
                type: "how_it_works_steps",
                data: {
                    title: "How Health Insurance Claims Work",
                    steps: [
                        { text: "<strong>Cashless Claim:</strong> Get admitted to a network hospital and present your health card at the insurance desk." },
                        { text: "<strong>Pre-Authorization:</strong> The hospital's TPA sends pre-authorization documents to the insurer." },
                        { text: "<strong>Direct Settlement:</strong> The insurer reviews, approves the request, and pays hospital bills directly upon discharge." },
                        { text: "<strong>Reimbursement:</strong> If admitted to a non-network hospital, you pay the bills yourself first." },
                        { text: "<strong>File Refund:</strong> Submit original discharge summary, bills, and payment receipts to get refunded within 30 days." },
                    ],
                },
            },
            {
                id: "health-buying-tips",
                type: "rich_text",
                data: {
                    content:
                        "<h2>Practical Tips for Buying Health Insurance</h2><ul><li><strong>Buy Early:</strong> Purchasing cover while young and healthy locks in lower premiums and completes waiting periods before you actually need the coverage.</li><li><strong>Look Beyond Premiums:</strong> The cheapest plans often carry room rent caps, co-payments, or sub-limits that result in huge out-of-pocket costs during hospitalization.</li><li><strong>Network Size:</strong> Ensure high-quality hospitals in your locality or city are listed in the insurer's cashless hospital network.</li></ul>",
                },
            },
            {
                id: "health-verdict",
                type: "policymine_take",
                data: {
                    title: "Policymine's Verdict on Health Insurance",
                    body: "Health insurance is not a wealth-creation tool; it is a shield for your savings. A single major hospitalization can cost upwards of ₹5 lakhs today. Keeping a comprehensive individual or family health policy ensures you get high-quality healthcare without financial distress.",
                },
            },
            {
                id: "health-faq",
                type: "faq",
                data: {
                    items: [
                        {
                            question: "What is cashless hospitalization?",
                            answer: "It is a facility where you get treated at a network hospital, and the insurer pays the hospital directly for covered expenses. You only pay for non-medical items like gloves, gowns, or registration charges.",
                        },
                        {
                            question: "What are pre-existing diseases (PED)?",
                            answer: "Any condition or ailment (like diabetes, thyroid, or hypertension) diagnosed or treated within 48 months prior to buying the policy. Insurers place a waiting period of 2 to 4 years before covering these.",
                        },
                        {
                            question: "What is the difference between individual and family floater health plans?",
                            answer: "An individual plan covers a single person with a dedicated sum insured. A family floater covers multiple family members under a single shared sum insured.",
                        },
                    ],
                },
            },
            {
                id: "health-reviews",
                type: "reviews",
                data: {
                    rating: 4.9,
                    totalCount: 20915,
                    items: [
                        {
                            name: "INDHUMATHI M",
                            initials: "I",
                            body: "Policymine is doing really great. Absolutely spam free- that's the best part. They don't talk to you like they are forced to sell the product. It's more like, helping us buy better. Advisor Nuha was very patient and answered all my questions with clarity. Thanks for the service",
                        },
                        {
                            name: "Ragul Kumar",
                            initials: "RK",
                            body: "Loved the service! Maheta Nidhi Hitesh was incredibly helpful and knowledgeable. She guided me through the whole process and made everything super easy to understand. I really appreciated how patient she was with all my questions—there was no pressure at all, just clear and honest advice. Honestly, I'm very happy with my experience at Policymine so far. Highly recommend!",
                        },
                    ],
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
