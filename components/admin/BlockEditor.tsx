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
import { GripVertical, Trash2, ChevronDown, ChevronUp, Plus, Copy, Eye, ArrowUp, ArrowDown, List } from "lucide-react"
import BlockPreview from "./BlockPreview"

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
    block, index, total, onUpdate, onRemove, onDuplicate, onMoveUp, onMoveDown, onMoveTo, onTocChange,
}: {
    block: Block
    index: number
    total: number
    onUpdate: (data: Record<string, unknown>) => void
    onRemove: () => void
    onDuplicate: () => void
    onMoveUp: () => void
    onMoveDown: () => void
    onMoveTo: (pos: number) => void
    onTocChange: (tocExclude?: boolean, tocLabel?: string) => void
}) {
    const [collapsed, setCollapsed] = useState(false)
    const [previewing, setPreviewing] = useState(false)
    const [showPositionPicker, setShowPositionPicker] = useState(false)
    const [tocSettingsOpen, setTocSettingsOpen] = useState(false)
    const posRef = useRef<HTMLDivElement>(null)
    const meta = BLOCK_META[block.type]

    const {
        attributes, listeners, setNodeRef,
        transform, transition, isDragging,
    } = useSortable({ id: block.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    // Close position picker on outside click
    useEffect(() => {
        if (!showPositionPicker) return
        function handler(e: MouseEvent) {
            if (posRef.current && !posRef.current.contains(e.target as Node)) {
                setShowPositionPicker(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [showPositionPicker])

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
                collapsed && !previewing ? "border-transparent" : "border-slate-100",
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

                {/* Position badge + jump-to dropdown */}
                <div className="relative" ref={posRef}>
                    <button
                        type="button"
                        onClick={() => setShowPositionPicker((p) => !p)}
                        className="flex items-center gap-0.5 text-[10px] font-mono text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded hover:bg-slate-200 transition-colors"
                        title="Jump to position"
                    >
                        <span className="font-bold text-slate-600">{index + 1}</span>
                        <span>/</span>
                        <span>{total}</span>
                    </button>
                    {showPositionPicker && (
                        <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-slate-200 rounded-lg shadow-xl p-1.5 max-h-48 overflow-y-auto min-w-[120px]">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1 mb-0.5">Move to</p>
                            {Array.from({ length: total }, (_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => { onMoveTo(i); setShowPositionPicker(false) }}
                                    className={cn(
                                        "w-full text-left px-2.5 py-1.5 text-xs rounded-md transition-colors",
                                        i === index
                                            ? "bg-emerald-50 text-emerald-700 font-bold cursor-default"
                                            : "hover:bg-slate-100 text-slate-600"
                                    )}
                                    disabled={i === index}
                                >
                                    Position {i + 1} {i === index && "(current)"}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Move up / down */}
                <div className="flex items-center gap-0 shrink-0">
                    <button
                        type="button"
                        onClick={onMoveUp}
                        disabled={index === 0}
                        className={cn("p-1 rounded-md transition-colors", index === 0 ? "text-slate-200 cursor-not-allowed" : "text-slate-400 hover:text-slate-600 hover:bg-slate-200")}
                        title="Move up"
                    >
                        <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                        type="button"
                        onClick={onMoveDown}
                        disabled={index === total - 1}
                        className={cn("p-1 rounded-md transition-colors", index === total - 1 ? "text-slate-200 cursor-not-allowed" : "text-slate-400 hover:text-slate-600 hover:bg-slate-200")}
                        title="Move down"
                    >
                        <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Preview toggle */}
                <button
                    type="button"
                    onClick={() => setPreviewing((p) => !p)}
                    className={cn(
                        "p-1.5 sm:p-1 rounded-md transition-colors",
                        previewing ? "text-blue-600 bg-blue-100" : "text-slate-400 hover:text-blue-500 hover:bg-blue-50"
                    )}
                    title={previewing ? "Hide preview" : "Preview block"}
                >
                    <Eye className="w-3.5 h-3.5" />
                </button>

                {/* ToC settings toggle */}
                <button
                    type="button"
                    onClick={() => setTocSettingsOpen((o) => !o)}
                    className={cn(
                        "p-1.5 sm:p-1 rounded-md transition-colors",
                        tocSettingsOpen ? "text-amber-600 bg-amber-100" : block.tocExclude ? "text-slate-300" : "text-slate-400 hover:text-amber-500 hover:bg-amber-50"
                    )}
                    title={tocSettingsOpen ? "Close ToC settings" : "Table of Contents settings"}
                >
                    <List className="w-3.5 h-3.5" />
                </button>

                {/* Collapse/expand toggle */}
                <button
                    type="button"
                    onClick={() => setCollapsed((c) => !c)}
                    className="text-slate-400 hover:text-slate-600 p-1.5 sm:p-1 rounded-md hover:bg-slate-200 transition-colors"
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

            {/* ToC settings panel */}
            {tocSettingsOpen && (
                <div className="px-3 sm:px-4 py-2.5 bg-amber-50/60 border-b border-amber-100 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                        <List className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="text-xs font-semibold text-amber-800">Table of Contents</span>
                    </div>
                    <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                        <input
                            type="checkbox"
                            checked={!block.tocExclude}
                            onChange={(e) => onTocChange(!e.target.checked, block.tocLabel)}
                            className="rounded border-amber-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                        />
                        <span className={block.tocExclude ? "text-slate-400 line-through" : "text-amber-700"}>Show in ToC</span>
                    </label>
                    <input
                        value={block.tocLabel || ""}
                        onChange={(e) => onTocChange(block.tocExclude, e.target.value || undefined)}
                        placeholder="Custom label (leave empty for auto)"
                        className="text-xs h-7 px-2 border border-amber-200 rounded-md bg-white flex-1 min-w-0 w-full sm:w-auto focus:border-emerald-400 outline-none"
                    />
                </div>
            )}

            {/* Editor */}
            {!collapsed && (
                <div className="p-2.5 sm:p-4 bg-white">
                    <BlockEditorSwitch block={block} onChange={onUpdate} />
                </div>
            )}

            {/* Preview panel */}
            {previewing && (
                <BlockPreview block={block} onClose={() => setPreviewing(false)} />
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
                    {/* Shared backdrop */}
                    <div
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
                        onClick={() => setOpen(false)}
                    />

                    {/* Mobile: bottom sheet — anchored to bottom, max-height prevents overflow */}
                    <div className="sm:hidden fixed inset-x-0 bottom-0 z-50 flex flex-col bg-white rounded-t-2xl shadow-2xl"
                        style={{ maxHeight: "75vh" }}
                    >
                        <div className="pt-3 pb-0 flex justify-center flex-shrink-0">
                            <div className="w-10 h-1 bg-slate-200 rounded-full" />
                        </div>
                        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 border-b border-slate-100">
                            <p className="text-sm font-semibold text-slate-700">Choose a block type</p>
                            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1 rounded-lg hover:bg-slate-100">
                                ✕ Close
                            </button>
                        </div>
                        <div className="overflow-y-auto overscroll-contain flex-1 p-4 space-y-4">
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
                                                        "text-xs px-2.5 py-2 rounded-lg font-medium border-0 transition-all active:scale-95",
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
                    </div>

                    {/* Desktop: absolute popup above the button */}
                    <div className="hidden sm:block absolute bottom-full left-0 right-0 mb-2 z-50 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 space-y-4 max-h-[65vh] overflow-y-auto overscroll-contain">
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
                                                    "text-xs px-2.5 py-1.5 rounded-lg font-medium border-0 transition-all hover:scale-105 hover:shadow-sm active:scale-95",
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

    function moveBlock(fromIndex: number, toIndex: number) {
        if (toIndex < 0 || toIndex >= blocks.length || fromIndex === toIndex) return
        onChange(arrayMove(blocks, fromIndex, toIndex))
    }

    function updateBlockToc(id: string, tocExclude?: boolean, tocLabel?: string) {
        onChange(blocks.map((b) => b.id === id ? { ...b, tocExclude, tocLabel } : b))
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
                    {blocks.map((block, idx) => (
                        <SortableBlock
                            key={block.id}
                            block={block}
                            index={idx}
                            total={blocks.length}
                            onUpdate={(data) => updateBlock(block.id, data)}
                            onRemove={() => removeBlock(block.id)}
                            onDuplicate={() => duplicateBlock(block.id)}
                            onMoveUp={() => moveBlock(idx, idx - 1)}
                            onMoveDown={() => moveBlock(idx, idx + 1)}
                            onMoveTo={(pos) => moveBlock(idx, pos)}
                            onTocChange={(tocExclude, tocLabel) => updateBlockToc(block.id, tocExclude, tocLabel)}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <AddBlockPicker onAdd={addBlock} />
        </div>
    )
}
