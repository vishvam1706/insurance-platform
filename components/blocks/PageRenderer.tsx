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

export default function PageRenderer({ blocks }: { blocks: Block[] }) {
    if (!blocks || blocks.length === 0) return null

    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMsg = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

    return (
        <>
            {blocks.map((block) => {
                const d = block.data as any
                switch (block.type) {
                    case "hero": return <HeroBlock key={block.id} data={d} />
                    case "rich_text": return <RichTextBlock key={block.id} data={d} />
                    case "image_block": return <ImageBlock key={block.id} data={d} />
                    case "how_it_works_steps": return <StepsBlock key={block.id} data={d} />
                    case "benefits_list": return <BenefitsList key={block.id} data={d} />
                    case "types_list": return <TypesList key={block.id} data={d} />
                    case "info_section": return <InfoSection key={block.id} data={d} />
                    case "note_box": return <NoteBox key={block.id} data={d} />
                    case "dittos_take": return <DittosTake key={block.id} data={d} />
                    case "numbered_cards": return <NumberedCards key={block.id} data={d} />
                    case "final_thoughts": return <FinalThoughts key={block.id} data={d} />
                    case "features_table": return <FeaturesTable key={block.id} data={d} />
                    case "comparison_table": return <ComparisonTable key={block.id} data={d} />
                    case "pros_cons_table": return <ProsConsTable key={block.id} data={d} />
                    case "plans_table": return <PlansTable key={block.id} data={d} />
                    case "insurer_metrics": return <InsurerMetrics key={block.id} data={d} />
                    case "policy_features_list": return <PolicyFeaturesList key={block.id} data={d} />
                    case "real_example_comparison": return <RealExampleComparison key={block.id} data={d} />
                    case "insurer_selector": return <InsurerSelector key={block.id} data={d} />
                    case "calculator_embed": return <CalculatorEmbed key={block.id} data={d} />
                    case "frequently_compared": return <FrequentlyCompared key={block.id} data={d} />
                    case "reviews": return <ReviewsBlock key={block.id} data={d} />
                    case "cta_block": return <CtaBlock key={block.id} data={d} />
                    case "faq": return <FaqBlock key={block.id} data={d} />
                    case "stat_bar": return <StatBar key={block.id} data={d} />
                    case "home_hero": return <HomeHeroBlock key={block.id} data={d} />
                    case "product_cards": return <ProductCardsBlock key={block.id} data={d} />
                    case "ditto_experience": return <DittoExperienceBlock key={block.id} waUrl={waUrl} />
                    case "comparison_section": return <ComparisonSectionBlock key={block.id} />
                    case "insurance_checklist": return <InsuranceChecklistBlock key={block.id} waUrl={waUrl} />
                    case "home_faq": return <HomeFaqBlock key={block.id} items={d?.items} />
                    case "choose_ditto_cta": return <ChooseDittoCtaBlock key={block.id} waUrl={waUrl} />
                    default: return null
                }
            })}
        </>
    )
}