"use client"

import { useState } from "react"
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
import {
    GripVertical, Trash2, ChevronDown,
    ChevronUp, Plus, Eye, EyeOff,
} from "lucide-react"

// Import all 23 block editors
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

// Block metadata
const BLOCK_META: Record<BlockType, { label: string; color: string; defaultData: Record<string, unknown> }> = {
    hero: { label: "Hero", color: "bg-purple-100 text-purple-700", defaultData: { title: "" } },
    rich_text: { label: "Rich Text", color: "bg-slate-100 text-slate-700", defaultData: { content: "" } },
    image_block: { label: "Image", color: "bg-pink-100 text-pink-700", defaultData: { image: "" } },
    how_it_works_steps: { label: "Steps", color: "bg-blue-100 text-blue-700", defaultData: { title: "", steps: [] } },
    benefits_list: { label: "Benefits List", color: "bg-green-100 text-green-700", defaultData: { title: "", items: [] } },
    types_list: { label: "Types List", color: "bg-teal-100 text-teal-700", defaultData: { title: "", items: [] } },
    info_section: { label: "Info Section", color: "bg-cyan-100 text-cyan-700", defaultData: { title: "", body: "" } },
    note_box: { label: "Note Box", color: "bg-amber-100 text-amber-700", defaultData: { label: "Take Note", content: "" } },
    dittos_take: { label: "Ditto's Take", color: "bg-indigo-100 text-indigo-700", defaultData: { title: "Ditto's Take", body: "" } },
    numbered_cards: { label: "Numbered Cards", color: "bg-blue-100 text-blue-700", defaultData: { title: "", cards: [] } },
    final_thoughts: { label: "Final Thoughts", color: "bg-slate-100 text-slate-700", defaultData: { title: "Final Thoughts", body: "" } },
    features_table: { label: "Features Table", color: "bg-orange-100 text-orange-700", defaultData: { title: "", rows: [] } },
    comparison_table: { label: "Comparison Table", color: "bg-red-100 text-red-700", defaultData: { title: "", columns: ["Feature", "Option A", "Option B"], rows: [] } },
    pros_cons_table: { label: "Pros & Cons", color: "bg-lime-100 text-lime-700", defaultData: { title: "", pros: [], cons: [] } },
    plans_table: { label: "Plans Table", color: "bg-emerald-100 text-emerald-700", defaultData: { title: "", rows: [] } },
    insurer_metrics: { label: "Insurer Metrics", color: "bg-violet-100 text-violet-700", defaultData: { title: "", metrics: [] } },
    policy_features_list: { label: "Policy Features", color: "bg-fuchsia-100 text-fuchsia-700", defaultData: { title: "", features: [] } },
    real_example_comparison: { label: "Real Example", color: "bg-rose-100 text-rose-700", defaultData: { title: "", plan1: { insurer: "", planName: "", recommended: true }, plan2: { insurer: "", planName: "", recommended: false }, rows: [] } },
    insurer_selector: { label: "Insurer Selector", color: "bg-sky-100 text-sky-700", defaultData: { label: "Select Insurer", insurers: [] } },
    calculator_embed: { label: "Calculator", color: "bg-yellow-100 text-yellow-700", defaultData: { title: "", calculatorType: "cover" } },
    frequently_compared: { label: "Frequently Compared", color: "bg-orange-100 text-orange-700", defaultData: { title: "", links: [] } },
    reviews: { label: "Reviews", color: "bg-green-100 text-green-700", defaultData: { rating: 4.9, totalCount: 0, items: [] } },
    cta_block: { label: "CTA Block", color: "bg-blue-100 text-blue-700", defaultData: { title: "", bookCallText: "Book a Free Call", whatsappText: "Chat on WhatsApp" } },
    faq: { label: "FAQ", color: "bg-slate-100 text-slate-700", defaultData: { items: [] } },
    stat_bar: { label: "Stat Bar", color: "bg-indigo-100 text-indigo-700", defaultData: { stats: [] } },
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
        default: return <p className="text-xs text-slate-400">Unknown block type</p>
    }
}

// Sortable block card
function SortableBlock({
    block, onUpdate, onRemove,
}: {
    block: Block
    onUpdate: (data: Record<string, unknown>) => void
    onRemove: () => void
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
                "bg-white border border-slate-200 rounded-xl overflow-hidden transition-shadow",
                isDragging && "shadow-xl opacity-80 z-50"
            )}
        >
            {/* Block header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
                {/* Drag handle */}
                <button
                    {...attributes}
                    {...listeners}
                    className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing touch-none"
                    type="button"
                >
                    <GripVertical className="w-4 h-4" />
                </button>

                {/* Label */}
                <Badge className={cn("text-xs font-medium border-0", meta?.color ?? "bg-slate-100 text-slate-600")}>
                    {meta?.label ?? block.type}
                </Badge>

                {/* Actions */}
                <div className="ml-auto flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => setCollapsed((c) => !c)}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded"
                    >
                        {collapsed
                            ? <ChevronDown className="w-4 h-4" />
                            : <ChevronUp className="w-4 h-4" />
                        }
                    </button>
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Editor */}
            {!collapsed && (
                <div className="p-4">
                    <BlockEditorSwitch block={block} onChange={onUpdate} />
                </div>
            )}
        </div>
    )
}

// Add block picker
function AddBlockPicker({ onAdd }: { onAdd: (type: BlockType) => void }) {
    const [open, setOpen] = useState(false)

    const groups: { label: string; types: BlockType[] }[] = [
        { label: "Page Basics", types: ["hero", "rich_text", "image_block", "stat_bar"] },
        { label: "Content", types: ["how_it_works_steps", "benefits_list", "types_list", "info_section", "note_box", "dittos_take", "numbered_cards", "final_thoughts"] },
        { label: "Tables", types: ["features_table", "comparison_table", "pros_cons_table", "plans_table", "insurer_metrics", "policy_features_list", "real_example_comparison"] },
        { label: "Interactive", types: ["insurer_selector", "calculator_embed", "frequently_compared"] },
        { label: "Social & CTAs", types: ["reviews", "cta_block", "faq"] },
    ]

    return (
        <div className="relative">
            <Button
                type="button"
                variant="outline"
                onClick={() => setOpen((o) => !o)}
                className="w-full gap-2 border-dashed border-slate-300 text-slate-500 hover:text-blue-600 hover:border-blue-400"
            >
                <Plus className="w-4 h-4" />
                Add Block
            </Button>

            {open && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-4 space-y-4 max-h-96 overflow-y-auto">
                    {groups.map((group) => (
                        <div key={group.label}>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                {group.label}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {group.types.map((type) => {
                                    const meta = BLOCK_META[type]
                                    return (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => { onAdd(type); setOpen(false) }}
                                            className={cn(
                                                "text-xs px-2.5 py-1.5 rounded-lg font-medium border transition-all hover:scale-105",
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
            )}
        </div>
    )
}

// Main BlockEditor component
interface BlockEditorProps {
    blocks: Block[]
    onChange: (blocks: Block[]) => void
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
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
        onChange(blocks.filter((b) => b.id !== id))
    }

    return (
        <div className="space-y-3">
            {blocks.length === 0 && (
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center">
                    <p className="text-slate-400 text-sm mb-1">No blocks yet</p>
                    <p className="text-slate-300 text-xs">Click "Add Block" below to start building this page</p>
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
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <AddBlockPicker onAdd={addBlock} />
        </div>
    )
}