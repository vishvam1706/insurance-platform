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
import DittosTake from "./DittosTake"
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
import DittoExperienceBlock from "../home/DittoExperience"
import ComparisonSectionBlock from "../home/ComparisonSection"
import InsuranceChecklistBlock from "../home/InsuranceChecklist"
import HomeFaqBlock from "../home/HomeFaq"
import ChooseDittoCtaBlock from "../home/ChooseDittoCta"

const HOMEPAGE_BLOCKS = new Set(["home_hero", "product_cards", "ditto_experience", "comparison_section", "insurance_checklist", "home_faq", "choose_ditto_cta"])

export default function PageRenderer({ blocks }: { blocks: Block[] }) {
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
                    case "hero": rendered = <HeroBlock data={d} />; break
                    case "rich_text": rendered = <RichTextBlock data={d} />; break
                    case "image_block": rendered = <ImageBlock data={d} />; break
                    case "how_it_works_steps": rendered = <StepsBlock data={d} />; break
                    case "benefits_list": rendered = <BenefitsList data={d} />; break
                    case "types_list": rendered = <TypesList data={d} />; break
                    case "info_section": rendered = <InfoSection data={d} />; break
                    case "note_box": rendered = <NoteBox data={d} />; break
                    case "dittos_take": rendered = <DittosTake data={d} />; break
                    case "numbered_cards": rendered = <NumberedCards data={d} />; break
                    case "final_thoughts": rendered = <FinalThoughts data={d} />; break
                    case "features_table": rendered = <FeaturesTable data={d} />; break
                    case "comparison_table": rendered = <ComparisonTable data={d} />; break
                    case "pros_cons_table": rendered = <ProsConsTable data={d} />; break
                    case "plans_table": rendered = <PlansTable data={d} />; break
                    case "insurer_metrics": rendered = <InsurerMetrics data={d} />; break
                    case "policy_features_list": rendered = <PolicyFeaturesList data={d} />; break
                    case "real_example_comparison": rendered = <RealExampleComparison data={d} />; break
                    case "insurer_selector": rendered = <InsurerSelector data={d} />; break
                    case "calculator_embed": rendered = <CalculatorEmbed data={d} />; break
                    case "frequently_compared": rendered = <FrequentlyCompared data={d} />; break
                    case "reviews": rendered = <ReviewsBlock data={d} />; break
                    case "cta_block": rendered = <CtaBlock data={d} />; break
                    case "faq": rendered = <FaqBlock data={d} />; break
                    case "stat_bar": rendered = <StatBar data={d} />; break
                    case "home_hero": rendered = <HomeHeroBlock data={d} />; break
                    case "product_cards": rendered = <ProductCardsBlock data={d} />; break
                    case "ditto_experience": rendered = <DittoExperienceBlock waUrl={waUrl} />; break
                    case "comparison_section": rendered = <ComparisonSectionBlock />; break
                    case "insurance_checklist": rendered = <InsuranceChecklistBlock waUrl={waUrl} />; break
                    case "home_faq": rendered = <HomeFaqBlock items={d?.items} />; break
                    case "choose_ditto_cta": rendered = <ChooseDittoCtaBlock waUrl={waUrl} />; break
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