import { Metadata } from "next"
import { connectDB } from "@/lib/mongodb"
import PageContent from "@/lib/models/PageContent"
import PageRenderer from "@/components/blocks/PageRenderer"
import Testimonial from "@/lib/models/Testimonial"
import HomeHero from "@/components/home/HomeHero"
import HeroContent from "@/lib/models/HeroContent"
import PolicymineExperience from "@/components/home/PmPartnersExperience"
import ComparisonSection from "@/components/home/ComparisonSection"
import InsuranceChecklist from "@/components/home/InsuranceChecklist"
import HomeFaq from "@/components/home/HomeFaq"
import ChoosepolicymineCta from "@/components/home/ChoosePmPartnersCta"
import TrustSection from "@/components/home/TrustSection"
import BrandPositioning from "@/components/home/BrandPositioning"
import AboutSummary from "@/components/home/AboutSummary"
import HomeHighlights from "@/components/home/HomeHighlights"
import HomeVideoSection from "@/components/home/HomeVideoSection"
import { Shield, Heart, ArrowRight, Star, Sparkles, TrendingUp, PiggyBank, GraduationCap, Briefcase } from "lucide-react"
import Link from "next/link"

export const revalidate = 1800 // Cache static page on Edge CDN, revalidate at most every 30 minutes

export const metadata: Metadata = {
    title: "Policymine Insurance — Expert Advice, Free Consultation",
    description:
        "Get expert advice on term life and health insurance. Get a free consultation with our expert advisors. No spam, no pressure.",
}

async function getHomePage() {
    await connectDB()
    const doc = await PageContent.findOne({ pageKey: "home", published: true }).lean()
    return doc ? JSON.parse(JSON.stringify(doc)) : null
}

async function getHeroContent() {
    await connectDB()
    const doc = await HeroContent.findOne({ key: "home_hero" }).lean()
    return doc ? JSON.parse(JSON.stringify(doc)) : null
}

export default async function HomePage() {
    const page = await getHomePage()
    const heroData = await getHeroContent()

    await connectDB()
    const dbTestimonials = await Testimonial.find({ active: true }).sort({ createdAt: -1 }).lean()
    const testimonialsToRender = dbTestimonials.length > 0 
        ? JSON.parse(JSON.stringify(dbTestimonials)) 
        : [
            { name: "Rahul Shah", role: "Ahmedabad", initials: "RS", body: "The entire process was smooth and professionally handled. Everything was explained clearly before purchase." },
            { name: "Neha Mehta", role: "Surat", initials: "NM", body: "I finally understood the actual difference between plans because of their simple guidance." },
            { name: "Amit Verma", role: "Mumbai", initials: "AV", body: "Very supportive team during medical requirements and policy issuance process." },
            { name: "Priya Sharma", role: "Delhi", initials: "PS", body: "They genuinely focused on what was right for my family instead of pushing expensive plans." },
          ]

    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMsg = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    // If CMS blocks exist, render those — but always use the new HomeHero for the hero section
    if (page && (page as any).blocks?.length > 0) {
        const remainingBlocks = (page as any).blocks.filter((b: any) => b.type !== "home_hero")
        return (
            <div className="max-w-none">
                <HomeHero heroData={heroData} waUrl={waUrl} />
                {remainingBlocks.length > 0 && (
                    <PageRenderer blocks={remainingBlocks} isHome={true} />
                )}
            </div>
        )
    }

    // Otherwise render the hardcoded Policymine-style homepage
    return (
        <>
            {/* 1. HERO */}
            <HomeHero heroData={heroData} waUrl={waUrl} />

            {/* 2. TRUST / ACHIEVEMENT SECTION */}
            <TrustSection />

            {/* 3. VIDEO SECTION — Health & Term explainer videos */}
            <HomeVideoSection />

            {/* 4. BRAND POSITIONING */}
            <BrandPositioning />

            {/* 4. WHY CHOOSE Policymine (Checklist / Comparison) */}
            <ComparisonSection />

            {/* 5. ABOUT US SUMMARY */}
            <AboutSummary />

            {/* 6. HOW WE WORK (The Experience) */}
            <PolicymineExperience waUrl={waUrl} />

            {/* 5. PRODUCTS — Term Life & Health */}
            <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 100%)" }}>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-left mb-10">
                        <span
                            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4 select-none"
                            style={{ background: "#FFF7ED", color: "#EA580C", border: "1px solid #FFEDD5" }}
                        >
                            What we cover
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            Policymine Offers Two Products.<br />
                            <span style={{ color: "#F97316" }}>Expert guidance on both.</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                href: "/term-life",
                                icon: <Shield className="w-6 h-6 text-orange-500" />,
                                title: "Term Insurance",
                                body: "Secure your family’s financial future with high life coverage at affordable premiums.",
                                badge: "Family Protection",
                                cta: "Explore Term Plans",
                                imageUrl: "/uploads/term_life_hero.png",
                            },
                            {
                                href: "/health",
                                icon: <Heart className="w-6 h-6 text-orange-500" />,
                                title: "Health Insurance",
                                body: "Protect yourself against rising medical expenses, hospitalization, and critical illnesses.",
                                badge: "Medical Protection",
                                cta: "Explore Health Plans",
                                imageUrl: "/uploads/1778580730304-wqg8vkb869c.jpg",
                            },
                            {
                                href: "/wealth",
                                icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
                                title: "Investment & Wealth Plans",
                                body: "Build long-term financial growth through market-linked and guaranteed return solutions.",
                                badge: "Wealth Creation",
                                cta: "Explore Wealth Plans",
                                imageUrl: null,
                            },
                            {
                                href: "/retirement",
                                icon: <PiggyBank className="w-6 h-6 text-orange-500" />,
                                title: "Retirement Planning",
                                body: "Create a financially secure retirement with structured income and wealth protection strategies.",
                                badge: "Future Security",
                                cta: "Plan Retirement",
                                imageUrl: null,
                            },
                            {
                                href: "/child-future",
                                icon: <GraduationCap className="w-6 h-6 text-orange-500" />,
                                title: "Child Future Planning",
                                body: "Plan confidently for your child’s education, marriage, and future aspirations.",
                                badge: "Child Security",
                                cta: "Start Planning",
                                imageUrl: null,
                            },
                            {
                                href: "/business-insurance",
                                icon: <Briefcase className="w-6 h-6 text-orange-500" />,
                                title: "Business & Keyman",
                                body: "Protect businesses against financial uncertainties and operational risks.",
                                badge: "Business Protection",
                                cta: "Explore Business Plans",
                                imageUrl: null,
                            },
                        ].map((p) => (
                            <Link
                                key={p.href}
                                href={p.href}
                                className="group relative rounded-[24px] overflow-hidden bg-white transition-all duration-500 hover:-translate-y-2 grid grid-cols-1 sm:grid-cols-[1.3fr_0.7fr] h-full min-h-[240px]"
                                style={{ border: "1.5px solid #F1F5F9", boxShadow: "0 10px 30px rgba(15,23,42,0.02)" }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement
                                    el.style.borderColor = "#F97316"
                                    el.style.boxShadow = "0 20px 40px rgba(249,115,22,0.08)"
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement
                                    el.style.borderColor = "#F1F5F9"
                                    el.style.boxShadow = "0 10px 30px rgba(15,23,42,0.02)"
                                }}
                            >
                                {/* Left Content */}
                                <div className="p-6 sm:p-7 flex flex-col justify-between h-full order-last sm:order-first space-y-4">
                                    <div className="space-y-3.5 text-left">
                                        <div className="flex flex-wrap gap-1.5">
                                            <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 select-none" style={{ background: "#FFF7ED", color: "#EA580C", border: "1px solid #FFEDD5" }}>
                                                <Sparkles className="w-2.5 h-2.5 text-orange-400" />
                                                {p.badge}
                                            </span>
                                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full select-none" style={{ background: "#F8FAFC", color: "#94A3B8", border: "1px solid #F1F5F9" }}>
                                                Expert Guidance
                                            </span>
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-orange-600 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                                            {p.title}
                                        </h3>
                                        <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-3">{p.body}</p>
                                    </div>
                                    <div className="inline-flex items-center justify-between text-[10px] font-black uppercase tracking-widest pt-3 w-full" style={{ color: "#EA580C", borderTop: "1px solid #F1F5F9" }}>
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">{p.cta}</span>
                                        <ArrowRight className="w-4 h-4 text-orange-500 transition-transform duration-200 group-hover:translate-x-1" />
                                    </div>
                                </div>
                                {/* Right Image */}
                                <div className="order-first sm:order-last relative w-full min-h-[160px] sm:min-h-full overflow-hidden bg-slate-50" style={{ borderLeft: "1px solid #F1F5F9" }}>
                                    {p.imageUrl ? (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={p.imageUrl} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm" style={{ border: "1px solid #FFEDD5" }}>
                                                {p.icon}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, #E2E8F0 50%, transparent)" }} />

            {/* 7. HOMEPAGE HIGHLIGHTS */}
            <HomeHighlights />

            {/* 8. TESTIMONIALS */}
            <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 100%)" }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-left mb-12">
                        <span
                            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4 select-none"
                            style={{ background: "#FFF7ED", color: "#EA580C", border: "1px solid #FFEDD5" }}
                        >
                            Customer Feedback
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            People trust us with their families<span style={{ color: "#F97316" }}>.</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {testimonialsToRender.map((r: any) => (
                            <div
                                key={r.name}
                                className="rounded-[24px] p-6 sm:p-7 bg-white flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
                                style={{ border: "1.5px solid #F1F5F9", boxShadow: "0 10px 30px rgba(15,23,42,0.02)" }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement
                                    el.style.borderColor = "#FFEDD5"
                                    el.style.boxShadow = "0 15px 35px rgba(249,115,22,0.06)"
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement
                                    el.style.borderColor = "#F1F5F9"
                                    el.style.boxShadow = "0 10px 30px rgba(15,23,42,0.02)"
                                }}
                            >
                                <div>
                                    <div className="flex gap-0.5 mb-4">
                                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                                    </div>
                                    <p className="text-sm font-medium leading-relaxed mb-6 text-slate-600 italic">&ldquo;{r.body}&rdquo;</p>
                                </div>
                                <div className="flex items-center gap-3 pt-4.5" style={{ borderTop: "1px solid #F1F5F9" }}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shrink-0 relative overflow-hidden select-none" style={{ background: "linear-gradient(135deg, #FFF7ED, #FFEDD5)", color: "#EA580C", border: "1.5px solid #FFDBB5", boxShadow: "0 2px 8px rgba(234,88,12,0.15)" }}>
                                        {r.photo ? (
                                            <img
                                                src={r.photo}
                                                alt={r.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            r.initials
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 leading-none">{r.name}</p>
                                        <p className="text-[11px] font-semibold text-slate-400 mt-1">{r.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, #E2E8F0 50%, transparent)" }} />

            {/* 8. FAQ */}
            <HomeFaq />

            {/* 9. CHOOSE Policymine CTA */}
            <ChoosepolicymineCta waUrl={waUrl} />
        </>
    )
}