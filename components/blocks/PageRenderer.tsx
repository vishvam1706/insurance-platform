import React from "react"
import { Block } from "@/types/blocks"
import HeroBlock from "./HeroBlock"
import RichTextBlock from "./RichTextBlock"
import ImageBlock from "./ImageBlock"
import StepsBlock from "./StepsBlock"
import BenefitsList from "./BenefitsList"
import TypesList from "./TypesList"
import InfoSection from "./InfoSection"
import NoteBox from "./NoteBox"
import PolicymineTake from "./PmPartnersTake"
import NumberedCards from "./NumberedCards"
import FinalThoughts from "./FinalThoughts"
import FeaturesTable from "./FeaturesTable"
import ComparisonTable from "./ComparisonTable"
import ProsConsTable from "./ProsConsTable"
import PlansTable from "./PlansTable"
import InsurerMetrics from "./InsurerMetrics"
import PolicyFeaturesList from "./PolicyFeaturesList"
import RealExampleComparison from "./RealExampleComparison"
import InsurerSelector from "./InsurerSelector"
import CalculatorEmbed from "./CalculatorEmbed"
import FrequentlyCompared from "./FrequentlyCompared"
import ReviewsBlock from "./ReviewsBlock"
import CtaBlock from "./CtaBlock"
import FaqBlock from "./FaqBlock"
import StatBar from "./StatBar"
import HomeHeroBlock from "./HomeHeroBlock"
import ProductCardsBlock from "./ProductCardsBlock"
import PolicymineExperienceBlock from "../home/PmPartnersExperience"
import ComparisonSectionBlock from "../home/ComparisonSection"
import InsuranceChecklistBlock from "../home/InsuranceChecklist"
import HomeFaqBlock from "../home/HomeFaq"
import ChoosepolicymineCtaBlock from "../home/ChoosePmPartnersCta"
import HomeGuidance from "../home/HomeGuidance"
import HomeTrust from "../home/HomeTrust"
import HomeUnderstanding from "../home/HomeUnderstanding"
import HomeProcess from "../home/HomeProcess"

const HOMEPAGE_BLOCKS = new Set([
    "home_hero", 
    "product_cards", 
    "policymine_experience", 
    "comparison_section", 
    "insurance_checklist", 
    "home_faq", 
    "choose_policymine_cta",
    "home_guidance",
    "home_trust",
    "home_understanding",
    "home_process"
])

export default function PageRenderer({ blocks, isHome = false }: { blocks: Block[], isHome?: boolean }) {
    if (!blocks || blocks.length === 0) return null

    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMsg = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    return (
        <>
            {blocks.map((block) => {
                const d = block.data as any
                let rendered: React.ReactNode = null
                switch (block.type) {
                    case "hero": rendered = <HeroBlock data={d} isHome={isHome} />; break
                    case "rich_text": rendered = <RichTextBlock data={d} isHome={isHome} />; break
                    case "image_block": rendered = <ImageBlock data={d} isHome={isHome} />; break
                    case "how_it_works_steps": rendered = <StepsBlock data={d} isHome={isHome} />; break
                    case "benefits_list": rendered = <BenefitsList data={d} isHome={isHome} />; break
                    case "types_list": rendered = <TypesList data={d} isHome={isHome} />; break
                    case "info_section": rendered = <InfoSection data={d} isHome={isHome} />; break
                    case "note_box": rendered = <NoteBox data={d} isHome={isHome} />; break
                    case "policymine_take": rendered = <PolicymineTake data={d} isHome={isHome} />; break
                    case "numbered_cards": rendered = <NumberedCards data={d} isHome={isHome} />; break
                    case "final_thoughts": rendered = <FinalThoughts data={d} isHome={isHome} />; break
                    case "features_table": rendered = <FeaturesTable data={d} isHome={isHome} />; break
                    case "comparison_table": rendered = <ComparisonTable data={d} isHome={isHome} />; break
                    case "pros_cons_table": rendered = <ProsConsTable data={d} isHome={isHome} />; break
                    case "plans_table": rendered = <PlansTable data={d} isHome={isHome} />; break
                    case "insurer_metrics": rendered = <InsurerMetrics data={d} isHome={isHome} />; break
                    case "policy_features_list": rendered = <PolicyFeaturesList data={d} isHome={isHome} />; break
                    case "real_example_comparison": rendered = <RealExampleComparison data={d} isHome={isHome} />; break
                    case "insurer_selector": rendered = <InsurerSelector data={d} isHome={isHome} />; break
                    case "calculator_embed": rendered = <CalculatorEmbed data={d} isHome={isHome} />; break
                    case "frequently_compared": rendered = <FrequentlyCompared data={d} isHome={isHome} />; break
                    case "reviews": rendered = <ReviewsBlock data={d} isHome={isHome} />; break
                    case "cta_block": rendered = <CtaBlock data={d} isHome={isHome} />; break
                    case "faq": rendered = <FaqBlock data={d} isHome={isHome} />; break
                    case "stat_bar": rendered = <StatBar data={d} isHome={isHome} />; break
                    case "home_hero": rendered = <HomeHeroBlock data={d} />; break
                    case "product_cards": rendered = <ProductCardsBlock data={d} />; break
                    case "policymine_experience": rendered = <PolicymineExperienceBlock data={d} waUrl={waUrl} />; break
                    case "comparison_section": rendered = <ComparisonSectionBlock data={d} />; break
                    case "insurance_checklist": rendered = <InsuranceChecklistBlock waUrl={waUrl} />; break
                    case "home_faq": rendered = <HomeFaqBlock items={d?.items} />; break
                    case "choose_policymine_cta": rendered = <ChoosepolicymineCtaBlock waUrl={waUrl} />; break
                    case "home_guidance": rendered = <HomeGuidance data={d} />; break
                    case "home_trust": rendered = <HomeTrust data={d} />; break
                    case "home_understanding": rendered = <HomeUnderstanding data={d} />; break
                    case "home_process": rendered = <HomeProcess data={d} />; break
                    default: rendered = null
                }

                // Determine if this block should be excluded from ToC
                const excludeFromToc = block.tocExclude || HOMEPAGE_BLOCKS.has(block.type)

                if (excludeFromToc) {
                    return <div key={block.id} data-no-toc>{rendered}</div>
                }

                // Apply custom ToC label if set
                if (block.tocLabel) {
                    return <div key={block.id} data-toc-label={block.tocLabel}>{rendered}</div>
                }

                return <React.Fragment key={block.id}>{rendered}</React.Fragment>
            })}
        </>
    )
}