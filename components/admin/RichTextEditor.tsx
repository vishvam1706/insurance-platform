"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { cn } from "@/lib/utils"
import {
    Bold, Italic, Strikethrough,
    Heading1, Heading2, Heading3,
    List, ListOrdered, Link as LinkIcon,
    Undo, Redo, Minus,
} from "lucide-react"

interface RichTextEditorProps {
    value: string
    onChange: (html: string) => void
    placeholder?: string
    minHeight?: string
}

export default function RichTextEditor({
    value, onChange, placeholder = "Start typing...", minHeight = "120px",
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder }),
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: "outline-none prose prose-sm max-w-none",
                style: `min-height: ${minHeight}`,
            },
        },
    })

    if (!editor) return null

    const ToolBtn = ({
        action, active = false, children,
    }: {
        action: () => void; active?: boolean; children: React.ReactNode
    }) => (
        <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); action() }}
            className={cn(
                "p-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors",
                active && "bg-slate-200 text-slate-900"
            )}
        >
            {children}
        </button>
    )

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden tiptap-editor">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-200 bg-slate-50">
                <ToolBtn action={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
                    <Bold className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn action={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
                    <Italic className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn action={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}>
                    <Strikethrough className="w-3.5 h-3.5" />
                </ToolBtn>

                <div className="w-px h-4 bg-slate-300 mx-1" />

                <ToolBtn
                    action={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editor.isActive("heading", { level: 1 })}
                >
                    <Heading1 className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn
                    action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive("heading", { level: 2 })}
                >
                    <Heading2 className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn
                    action={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive("heading", { level: 3 })}
                >
                    <Heading3 className="w-3.5 h-3.5" />
                </ToolBtn>

                <div className="w-px h-4 bg-slate-300 mx-1" />

                <ToolBtn action={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
                    <List className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn action={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
                    <ListOrdered className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn action={() => editor.chain().focus().setHorizontalRule().run()}>
                    <Minus className="w-3.5 h-3.5" />
                </ToolBtn>

                <div className="w-px h-4 bg-slate-300 mx-1" />

                <ToolBtn action={() => editor.chain().focus().undo().run()}>
                    <Undo className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn action={() => editor.chain().focus().redo().run()}>
                    <Redo className="w-3.5 h-3.5" />
                </ToolBtn>
            </div>

            {/* Editor */}
            <div className="p-3">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}