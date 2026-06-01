import fs from "fs";

const pages = [
    {
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
                        { heading: "IRDAI-Compliant Process", body: "Professional and ethical practices aligned with industry standards." },
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
    },
    {
        pageKey: "contact",
        title: "Contact Us",
        section: "support",
        published: true,
        seo: { metaTitle: "Contact Us - Policymine", metaDescription: "Get In Touch With Our Insurance Experts" },
        blocks: [
            {
                id: "c1",
                type: "hero",
                data: {
                    title: "Get In Touch With Our Insurance Experts",
                    subtitle: "Whether you need help understanding plans, comparing policies, or getting claim support — our team is here to guide you."
                }
            },
            {
                id: "c2",
                type: "rich_text",
                data: {
                    content: "<h3>Contact Information</h3><ul><li>support@policymine.in</li><li>+91-XXXXXXXXXX</li><li>Consultation Hours Available based on advisor availability and active support timings.</li></ul>"
                }
            }
        ]
    },
    {
        pageKey: "about",
        title: "About Policymine",
        section: "support",
        published: true,
        seo: { metaTitle: "About Us - Policymine", metaDescription: "Building Trust Through Smarter Insurance Guidance" },
        blocks: [
            {
                id: "a1",
                type: "hero",
                data: {
                    title: "Building Trust Through Smarter Insurance Guidance",
                    subtitle: "Policymine was created with a simple mission — to make insurance easier to understand, transparent, and customer-focused."
                }
            },
            {
                id: "a2",
                type: "rich_text",
                data: {
                    content: "<p>Many people purchase insurance without proper guidance, clear understanding, or long-term support. We aim to change that experience by helping customers make informed financial protection decisions with confidence.</p><p>Our team focuses on simplifying insurance through:</p><ul><li>Transparent plan comparison</li><li>Personalized recommendations</li><li>Practical financial guidance</li><li>End-to-end assistance</li><li>Dedicated claim support</li></ul><p>We believe insurance should never feel confusing or sales-driven. It should feel secure, supportive, and built around your actual life goals.</p>"
                }
            }
        ]
    },
    {
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
    },
    {
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
    },
    {
        pageKey: "wealth",
        title: "Investment & Wealth Plans",
        section: "wealth",
        published: true,
        seo: { metaTitle: "Investment & Wealth - Policymine", metaDescription: "Build Long-Term Financial Growth With Confidence" },
        blocks: [
            { id: "w1", type: "hero", data: { title: "Build Long-Term Financial Growth With Confidence", subtitle: "Investment and wealth plans help create disciplined long-term savings while supporting important financial goals." } },
            { id: "w2", type: "cta_block", data: { title: "Suitable For Wealth creation, Child future planning, Goal-based investing, Financial stability", bookCallText: "Start Wealth Planning", whatsappText: "Connect on WhatsApp" } }
        ]
    },
    {
        pageKey: "retirement",
        title: "Retirement Planning",
        section: "wealth",
        published: true,
        seo: { metaTitle: "Retirement Planning - Policymine", metaDescription: "Plan Today For A Financially Secure Retirement" },
        blocks: [
            { id: "rp1", type: "hero", data: { title: "Plan Today For A Financially Secure Retirement", subtitle: "Retirement planning helps create a stable future income and financial independence after your working years." } },
            { id: "rp2", type: "cta_block", data: { title: "Benefits include Stable retirement income, Long-term wealth protection, Financial independence.", bookCallText: "Plan Your Retirement", whatsappText: "Connect on WhatsApp" } }
        ]
    },
    {
        pageKey: "child-future",
        title: "Child Future Planning",
        section: "wealth",
        published: true,
        seo: { metaTitle: "Child Future Planning - Policymine", metaDescription: "Secure Your Child’s Future Goals" },
        blocks: [
            { id: "cf1", type: "hero", data: { title: "Secure Your Child’s Future Goals", subtitle: "Prepare confidently for your child’s future education, career goals, and important life milestones." } },
            { id: "cf2", type: "cta_block", data: { title: "We Help With Child education planning, Goal-based investment guidance, Protection-linked savings options.", bookCallText: "Start Child Future Planning", whatsappText: "Connect on WhatsApp" } }
        ]
    },
    {
        pageKey: "business",
        title: "Business & Keyman Insurance",
        section: "corporate",
        published: true,
        seo: { metaTitle: "Business Insurance - Policymine", metaDescription: "Protect Your Business Against Financial Risks" },
        blocks: [
            { id: "bi1", type: "hero", data: { title: "Protect Your Business Against Financial Risks", subtitle: "Business insurance solutions help organizations reduce financial uncertainty and maintain stability during unexpected situations." } },
            { id: "bi2", type: "cta_block", data: { title: "Coverage Areas: Keyman insurance, Liability protection, Business continuity support, Financial risk management.", bookCallText: "Explore Business Protection", whatsappText: "Connect on WhatsApp" } }
        ]
    },
    {
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
    },
    {
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
    },
    {
        pageKey: "privacy",
        title: "Privacy Policy",
        section: "company",
        published: true,
        seo: { metaTitle: "Privacy Policy - Policymine", metaDescription: "Your Privacy Matters" },
        blocks: [
            { id: "pp1", type: "rich_text", data: { content: "<h2>Your Privacy Matters</h2><p>We are committed to protecting customer information and maintaining confidentiality.</p><p>Personal details shared through consultations, inquiries, and documentation are handled responsibly and used only for insurance-related assistance and communication purposes. Information is processed in accordance with applicable legal and regulatory requirements.</p>" } }
        ]
    },
    {
        pageKey: "terms",
        title: "Terms & Conditions",
        section: "company",
        published: true,
        seo: { metaTitle: "Terms & Conditions - Policymine", metaDescription: "Terms Of Use" },
        blocks: [
            { id: "tc1", type: "rich_text", data: { content: "<h2>Terms Of Use</h2><p>By accessing this website and using our services, users agree to the applicable terms, policies, and regulatory guidelines.</p><p>Policymine provides insurance-related guidance and assistance services. Final policy issuance, underwriting, premium decisions, and claim settlement are governed by the respective insurer’s terms and conditions. Users are advised to review all policy documents carefully before making purchase decisions.</p>" } }
        ]
    }
];

let fileContent = fs.readFileSync('lib/seeds/seed.ts', 'utf8');

// Replace the `home` page content and append the rest
const homeStartIndex = fileContent.indexOf('pageKey: "home",');
if (homeStartIndex > -1) {
    const createStartIndex = fileContent.lastIndexOf('await PageContent.create({', homeStartIndex);
    const createEndIndex = fileContent.indexOf('})', homeStartIndex) + 2;
    
    const pagesString = pages.map(p => `    await PageContent.create(${JSON.stringify(p, null, 8)});\n`).join('\n');
    
    fileContent = fileContent.substring(0, createStartIndex) + pagesString + fileContent.substring(createEndIndex);
    
    fs.writeFileSync('lib/seeds/seed.ts', fileContent);
    console.log("Successfully appended new pages to seed.ts");
} else {
    console.log("Could not find 'home' page block in seed.ts");
}
