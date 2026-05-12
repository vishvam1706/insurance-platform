"use client"

import { useState, useRef, useEffect } from "react"
import {
    DndContext, closestCenter, KeyboardSensor,
    PointerSensor, useSensor, useSensors, DragEndEvent,
} from "@dnd-kit/core"
import {
    arrayMove, SortableContext,
    sortableKeyboardCoordinates, verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Block, BlockType } from "@/types/blocks"
import { generateId } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { GripVertical, Trash2, ChevronDown, ChevronUp, Plus, Copy } from "lucide-react"

// Block editors
import HeroBlockEditor from "./blocks/HeroBlockEditor"
import RichTextBlockEditor from "./blocks/RichTextBlockEditor"
import ImageBlockEditor from "./blocks/ImageBlockEditor"
import StepsBlockEditor from "./blocks/StepsBlockEditor"
import BenefitsListEditor from "./blocks/BenefitsListEditor"
import TypesListEditor from "./blocks/TypesListEditor"
import InfoSectionEditor from "./blocks/InfoSectionEditor"
import NoteBoxEditor from "./blocks/NoteBoxEditor"
import DittosTakeEditor from "./blocks/DittosTakeEditor"
import NumberedCardsEditor from "./blocks/NumberedCardsEditor"
import FinalThoughtsEditor from "./blocks/FinalThoughtsEditor"
import FeaturesTableEditor from "./blocks/FeaturesTableEditor"
import ComparisonTableEditor from "./blocks/ComparisonTableEditor"
import ProsConsTableEditor from "./blocks/ProsConsTableEditor"
import PlansTableEditor from "./blocks/PlansTableEditor"
import InsurerMetricsEditor from "./blocks/InsurerMetricsEditor"
import PolicyFeaturesEditor from "./blocks/PolicyFeaturesEditor"
import RealExampleEditor from "./blocks/RealExampleEditor"
import InsurerSelectorEditor from "./blocks/InsurerSelectorEditor"
import CalculatorEmbedEditor from "./blocks/CalculatorEmbedEditor"
import FrequentlyComparedEditor from "./blocks/FrequentlyComparedEditor"
import ReviewsBlockEditor from "./blocks/ReviewsBlockEditor"
import CtaBlockEditor from "./blocks/CtaBlockEditor"
import FaqBlockEditor from "./blocks/FaqBlockEditor"
import StatBarEditor from "./blocks/StatBarEditor"
import HomeHeroBlockEditor from "./blocks/HomeHeroBlockEditor"
import ProductCardsEditor from "./blocks/ProductCardsEditor"
import HomeFaqBlockEditor from "./blocks/HomeFaqBlockEditor"
import ChooseDittoCtaEditor from "./blocks/ChooseDittoCtaEditor"

// Block metadata
const BLOCK_META: Record<BlockType, { label: string; color: string; defaultData: Record<string, unknown> }> = {
    hero: { label: "Hero", color: "bg-purple-100 text-purple-700", defaultData: { title: "", subtitle: "", author: { name: "", role: "Insurance Writer" }, reviewer: { name: "", role: "IRDAI-Certified Expert" } } },
    rich_text: { label: "Rich Text", color: "bg-slate-100 text-slate-700", defaultData: { content: "" } },
    image_block: { label: "Image", color: "bg-pink-100 text-pink-700", defaultData: { image: "", altText: "", caption: "" } },
    how_it_works_steps: { label: "Steps", color: "bg-emerald-100 text-emerald-700", defaultData: { title: "", steps: [] } },
    benefits_list: { label: "Benefits List", color: "bg-green-100 text-green-700", defaultData: { title: "", items: [] } },
    types_list: { label: "Types List", color: "bg-teal-100 text-teal-700", defaultData: { title: "", items: [] } },
    info_section: { label: "Info Section", color: "bg-cyan-100 text-cyan-700", defaultData: { title: "", body: "" } },
    note_box: { label: "Note Box", color: "bg-amber-100 text-amber-700", defaultData: { label: "Take Note", content: "" } },
    dittos_take: { label: "Ditto's Take", color: "bg-indigo-100 text-indigo-700", defaultData: { title: "Ditto's Take", body: "" } },
    numbered_cards: { label: "Numbered Cards", color: "bg-emerald-100 text-emerald-700", defaultData: { title: "", cards: [] } },
    final_thoughts: { label: "Final Thoughts", color: "bg-slate-100 text-slate-700", defaultData: { title: "Final Thoughts", body: "" } },
    features_table: { label: "Features Table", color: "bg-orange-100 text-orange-700", defaultData: { title: "", rows: [] } },
    comparison_table: { label: "Comparison Table", color: "bg-red-100 text-red-700", defaultData: { title: "", columns: ["Feature", "Option A", "Option B"], rows: [] } },
    pros_cons_table: { label: "Pros & Cons", color: "bg-lime-100 text-lime-700", defaultData: { title: "", pros: [], cons: [] } },
    plans_table: { label: "Plans Table", color: "bg-emerald-100 text-emerald-700", defaultData: { title: "", rows: [] } },
    insurer_metrics: { label: "Insurer Metrics", color: "bg-violet-100 text-violet-700", defaultData: { title: "", metrics: [] } },
    policy_features_list: { label: "Policy Features", color: "bg-fuchsia-100 text-fuchsia-700", defaultData: { title: "", features: [] } },
    real_example_comparison: { label: "Real Example", color: "bg-rose-100 text-rose-700", defaultData: { title: "", plan1: { insurer: "", planName: "", recommended: true }, plan2: { insurer: "", planName: "", recommended: false }, rows: [] } },
    insurer_selector: { label: "Insurer Selector", color: "bg-sky-100 text-sky-700", defaultData: { label: "Select Insurer", helpText: "", insurers: [] } },
    calculator_embed: { label: "Calculator", color: "bg-yellow-100 text-yellow-700", defaultData: { title: "Term Cover Calculator", description: "", calculatorType: "cover" } },
    frequently_compared: { label: "Frequently Compared", color: "bg-orange-100 text-orange-700", defaultData: { title: "Frequently Compared", links: [] } },
    reviews: { label: "Reviews", color: "bg-green-100 text-green-700", defaultData: { rating: 4.9, totalCount: 0, items: [] } },
    cta_block: { label: "CTA Block", color: "bg-emerald-100 text-emerald-700", defaultData: { title: "Confused about which plan to pick?", bookCallText: "Book a Free Call", whatsappText: "Chat on WhatsApp" } },
    faq: { label: "FAQ", color: "bg-slate-100 text-slate-700", defaultData: { items: [] } },
    stat_bar: { label: "Stat Bar", color: "bg-indigo-100 text-indigo-700", defaultData: { stats: [] } },
    home_hero: { label: "Home Hero", color: "bg-emerald-100 text-blue-800", defaultData: { title: "Life & Health Insurance Platform", badge: "IRDAI-Certified Expert Advisors", subtitle: "", primaryCta: { text: "Book Free Call", href: "/contact" }, stats: [], showInquiryForm: true } },
    product_cards: { label: "Product Cards", color: "bg-teal-100 text-teal-800", defaultData: { title: "What we cover", cards: [] } },
    ditto_experience: { label: "Ditto Experience", color: "bg-blue-100 text-blue-700", defaultData: {} },
    comparison_section: { label: "Comparison Section", color: "bg-orange-100 text-orange-700", defaultData: {} },
    insurance_checklist: { label: "Insurance Checklist", color: "bg-yellow-100 text-yellow-700", defaultData: {} },
    home_faq: { label: "Home FAQ", color: "bg-slate-100 text-slate-700", defaultData: { items: [] } },
    choose_ditto_cta: { label: "Choose Ditto CTA", color: "bg-indigo-100 text-indigo-700", defaultData: { headline: "", subtext: "", ctaText: "Book a free call", ctaHref: "/contact" } },
}

// Render the right editor for a block type
function BlockEditorSwitch({ block, onChange }: { block: Block; onChange: (data: Record<string, unknown>) => void }) {
    const d = block.data
    switch (block.type) {
        case "hero": return <HeroBlockEditor data={d as any} onChange={onChange as any} />
        case "rich_text": return <RichTextBlockEditor data={d as any} onChange={onChange as any} />
        case "image_block": return <ImageBlockEditor data={d as any} onChange={onChange as any} />
        case "how_it_works_steps": return <StepsBlockEditor data={d as any} onChange={onChange as any} />
        case "benefits_list": return <BenefitsListEditor data={d as any} onChange={onChange as any} />
        case "types_list": return <TypesListEditor data={d as any} onChange={onChange as any} />
        case "info_section": return <InfoSectionEditor data={d as any} onChange={onChange as any} />
        case "note_box": return <NoteBoxEditor data={d as any} onChange={onChange as any} />
        case "dittos_take": return <DittosTakeEditor data={d as any} onChange={onChange as any} />
        case "numbered_cards": return <NumberedCardsEditor data={d as any} onChange={onChange as any} />
        case "final_thoughts": return <FinalThoughtsEditor data={d as any} onChange={onChange as any} />
        case "features_table": return <FeaturesTableEditor data={d as any} onChange={onChange as any} />
        case "comparison_table": return <ComparisonTableEditor data={d as any} onChange={onChange as any} />
        case "pros_cons_table": return <ProsConsTableEditor data={d as any} onChange={onChange as any} />
        case "plans_table": return <PlansTableEditor data={d as any} onChange={onChange as any} />
        case "insurer_metrics": return <InsurerMetricsEditor data={d as any} onChange={onChange as any} />
        case "policy_features_list": return <PolicyFeaturesEditor data={d as any} onChange={onChange as any} />
        case "real_example_comparison": return <RealExampleEditor data={d as any} onChange={onChange as any} />
        case "insurer_selector": return <InsurerSelectorEditor data={d as any} onChange={onChange as any} />
        case "calculator_embed": return <CalculatorEmbedEditor data={d as any} onChange={onChange as any} />
        case "frequently_compared": return <FrequentlyComparedEditor data={d as any} onChange={onChange as any} />
        case "reviews": return <ReviewsBlockEditor data={d as any} onChange={onChange as any} />
        case "cta_block": return <CtaBlockEditor data={d as any} onChange={onChange as any} />
        case "faq": return <FaqBlockEditor data={d as any} onChange={onChange as any} />
        case "stat_bar": return <StatBarEditor data={d as any} onChange={onChange as any} />
        case "home_hero": return <HomeHeroBlockEditor data={d as any} onChange={onChange as any} />
        case "product_cards": return <ProductCardsEditor data={d as any} onChange={onChange as any} />
        case "ditto_experience": return <p className="text-xs text-slate-500 p-2 bg-blue-50 rounded-lg">📋 Ditto Experience — displays the 3-step experience section. No editable data.</p>
        case "comparison_section": return <p className="text-xs text-slate-500 p-2 bg-orange-50 rounded-lg">📊 Comparison Section — Ditto vs Other Platforms table. No editable data.</p>
        case "insurance_checklist": return <p className="text-xs text-slate-500 p-2 bg-yellow-50 rounded-lg">✅ Insurance Checklist — sticky note visual + checklist links. No editable data.</p>
        case "home_faq": return <HomeFaqBlockEditor data={d as any} onChange={onChange as any} />
        case "choose_ditto_cta": return <ChooseDittoCtaEditor data={d as any} onChange={onChange as any} />
        default: return <p className="text-xs text-slate-400">Unknown block type: {block.type}</p>
    }
}

// Sortable block card
function SortableBlock({
    block, onUpdate, onRemove, onDuplicate,
}: {
    block: Block
    onUpdate: (data: Record<string, unknown>) => void
    onRemove: () => void
    onDuplicate: () => void
}) {
    const [collapsed, setCollapsed] = useState(false)
    const meta = BLOCK_META[block.type]

    const {
        attributes, listeners, setNodeRef,
        transform, transition, isDragging,
    } = useSortable({ id: block.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "bg-white border border-slate-200 rounded-xl overflow-hidden transition-all",
                isDragging && "shadow-2xl opacity-70 scale-[0.98] z-50 border-slate-300"
            )}
        >
            {/* Block header */}
            <div className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 border-b transition-colors",
                collapsed ? "border-transparent" : "border-slate-100",
                "bg-slate-50"
            )}>
                {/* Drag handle */}
                <button
                    {...attributes}
                    {...listeners}
                    className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing touch-none p-0.5 shrink-0"
                    type="button"
                    title="Drag to reorder"
                >
                    <GripVertical className="w-4 h-4" />
                </button>

                {/* Label badge */}
                <Badge className={cn("text-[10px] sm:text-xs font-medium border-0 px-1.5 sm:px-2 py-0.5 shrink-0", meta?.color ?? "bg-slate-100 text-slate-600")}>
                    {meta?.label ?? block.type}
                </Badge>

                {/* Collapse/expand toggle */}
                <button
                    type="button"
                    onClick={() => setCollapsed((c) => !c)}
                    className="ml-auto text-slate-400 hover:text-slate-600 p-1.5 sm:p-1 rounded-md hover:bg-slate-200 transition-colors"
                    title={collapsed ? "Expand" : "Collapse"}
                >
                    {collapsed
                        ? <ChevronDown className="w-3.5 h-3.5" />
                        : <ChevronUp className="w-3.5 h-3.5" />
                    }
                </button>

                {/* Duplicate */}
                <button
                    type="button"
                    onClick={onDuplicate}
                    className="text-slate-400 hover:text-slate-600 p-1.5 sm:p-1 rounded-md hover:bg-slate-200 transition-colors"
                    title="Duplicate block"
                >
                    <Copy className="w-3.5 h-3.5" />
                </button>

                {/* Delete */}
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-slate-400 hover:text-red-500 p-1.5 sm:p-1 rounded-md hover:bg-red-50 transition-colors"
                    title="Remove block"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Editor */}
            {!collapsed && (
                <div className="p-2.5 sm:p-4 bg-white">
                    <BlockEditorSwitch block={block} onChange={onUpdate} />
                </div>
            )}
        </div>
    )
}

// Block groups
const BLOCK_GROUPS: { label: string; types: BlockType[] }[] = [
    { label: "Page Basics", types: ["hero", "rich_text", "image_block", "stat_bar"] },
    { label: "Content", types: ["how_it_works_steps", "benefits_list", "types_list", "info_section", "note_box", "dittos_take", "numbered_cards", "final_thoughts"] },
    { label: "Tables", types: ["features_table", "comparison_table", "pros_cons_table", "plans_table", "insurer_metrics", "policy_features_list", "real_example_comparison"] },
    { label: "Interactive", types: ["insurer_selector", "calculator_embed", "frequently_compared"] },
    { label: "Social & CTAs", types: ["reviews", "cta_block", "faq"] },
    { label: "Homepage", types: ["home_hero", "product_cards", "ditto_experience", "comparison_section", "insurance_checklist", "home_faq", "choose_ditto_cta"] },
]

// Add block picker with outside-click close
function AddBlockPicker({ onAdd }: { onAdd: (type: BlockType) => void }) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        function handler(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [open])

    // Lock scroll when open on mobile
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [open])

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-500 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all active:scale-[0.98]"
            >
                <Plus className="w-4 h-4" />
                Add Block
            </button>

            {open && (
                <>
                    {/* Mobile: full-screen overlay */}
                    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm sm:hidden" onClick={() => setOpen(false)} />
                    <div className={cn(
                        "z-50 bg-white border border-slate-200 shadow-2xl overflow-y-auto",
                        // Mobile: fixed bottom sheet
                        "fixed inset-x-0 bottom-0 top-16 rounded-t-2xl p-4 space-y-4 sm:top-auto",
                        // Desktop: absolute popup above the button
                        "sm:absolute sm:bottom-full sm:left-0 sm:right-0 sm:mb-2 sm:rounded-2xl sm:max-h-[70vh] sm:inset-x-auto sm:p-4"
                    )}>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-slate-700">Choose a block type</p>
                            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1 rounded hover:bg-slate-100">
                                ✕ Close
                            </button>
                        </div>
                        {BLOCK_GROUPS.map((group) => (
                            <div key={group.label}>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                    {group.label}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {group.types.map((type) => {
                                        const meta = BLOCK_META[type]
                                        return (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => { onAdd(type); setOpen(false) }}
                                                className={cn(
                                                    "text-xs px-2.5 py-2 sm:py-1.5 rounded-lg font-medium border-0 transition-all hover:scale-105 hover:shadow-sm active:scale-95",
                                                    meta?.color ?? "bg-slate-100 text-slate-600"
                                                )}
                                            >
                                                {meta?.label ?? type}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

// Main BlockEditor
interface BlockEditorProps {
    blocks: Block[]
    onChange: (blocks: Block[]) => void
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (over && active.id !== over.id) {
            const oldIndex = blocks.findIndex((b) => b.id === active.id)
            const newIndex = blocks.findIndex((b) => b.id === over.id)
            onChange(arrayMove(blocks, oldIndex, newIndex))
        }
    }

    function addBlock(type: BlockType) {
        const meta = BLOCK_META[type]
        const newBlock: Block = {
            id: generateId(),
            type,
            data: { ...meta.defaultData },
        }
        onChange([...blocks, newBlock])
    }

    function updateBlock(id: string, data: Record<string, unknown>) {
        onChange(blocks.map((b) => b.id === id ? { ...b, data } : b))
    }

    function removeBlock(id: string) {
        if (!window.confirm("Remove this block?")) return
        onChange(blocks.filter((b) => b.id !== id))
    }

    function duplicateBlock(id: string) {
        const idx = blocks.findIndex((b) => b.id === id)
        if (idx === -1) return
        const orig = blocks[idx]
        const dupe: Block = { ...orig, id: generateId(), data: JSON.parse(JSON.stringify(orig.data)) }
        const next = [...blocks]
        next.splice(idx + 1, 0, dupe)
        onChange(next)
    }

    return (
        <div className="space-y-3">
            {blocks.length === 0 && (
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 sm:p-14 text-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                        <Plus className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-1">No blocks yet</p>
                    <p className="text-slate-400 text-xs">Tap &ldquo;Add Block&rdquo; below to start building this page</p>
                </div>
            )}

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                    {blocks.map((block) => (
                        <SortableBlock
                            key={block.id}
                            block={block}
                            onUpdate={(data) => updateBlock(block.id, data)}
                            onRemove={() => removeBlock(block.id)}
                            onDuplicate={() => duplicateBlock(block.id)}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <AddBlockPicker onAdd={addBlock} />
        </div>
    )
}
