"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import {
    Bold, Italic, Strikethrough,
    Heading2, Heading3,
    List, ListOrdered, Link as LinkIcon,
    Undo, Redo, Minus, Quote,
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
    const lastValue = useRef(value)
    const isFocused = useRef(false)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ link: false }),
            Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-emerald-600 underline cursor-pointer" } }),
            Placeholder.configure({ placeholder }),
        ],
        content: value,
        immediatelyRender: false,
        onFocus: () => { isFocused.current = true },
        onBlur: () => { isFocused.current = false },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            lastValue.current = html
            onChange(html)
        },
        editorProps: {
            attributes: {
                class: "outline-none prose prose-sm max-w-none prose-headings:font-bold prose-a:text-emerald-600",
                style: `min-height: ${minHeight}`,
            },
        },
    })

    // Sync content from props when not focused (e.g. when block data loads from server)
    useEffect(() => {
        if (!editor) return
        if (isFocused.current) return
        if (value === lastValue.current) return
        // Only update if content truly differs to avoid cursor jumps
        if (value !== editor.getHTML()) {
            editor.commands.setContent(value || "", { emitUpdate: false })
            lastValue.current = value
        }
    }, [value, editor])

    if (!editor) return null

    function setLink() {
        const url = window.prompt("Enter URL")
        if (url === null) return
        if (url === "") {
            editor?.chain().focus().extendMarkRange("link").unsetLink().run()
        } else {
            editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
        }
    }

    const ToolBtn = ({
        action, active = false, title, children,
    }: {
        action: () => void; active?: boolean; title?: string; children: React.ReactNode
    }) => (
        <button
            type="button"
            title={title}
            onMouseDown={(e) => { e.preventDefault(); action() }}
            className={cn(
                "p-1.5 rounded text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors",
                active && "bg-slate-200 text-slate-900"
            )}
        >
            {children}
        </button>
    )

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden tiptap-editor focus-within:border-emerald-400 transition-colors">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-200 bg-slate-50">
                <ToolBtn title="Bold" action={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
                    <Bold className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn title="Italic" action={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
                    <Italic className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn title="Strikethrough" action={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}>
                    <Strikethrough className="w-3.5 h-3.5" />
                </ToolBtn>

                <div className="w-px h-4 bg-slate-200 mx-1" />

                <ToolBtn title="Heading 2" action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
                    <Heading2 className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn title="Heading 3" action={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>
                    <Heading3 className="w-3.5 h-3.5" />
                </ToolBtn>

                <div className="w-px h-4 bg-slate-200 mx-1" />

                <ToolBtn title="Bullet list" action={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
                    <List className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn title="Numbered list" action={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
                    <ListOrdered className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn title="Blockquote" action={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
                    <Quote className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn title="Horizontal rule" action={() => editor.chain().focus().setHorizontalRule().run()}>
                    <Minus className="w-3.5 h-3.5" />
                </ToolBtn>

                <div className="w-px h-4 bg-slate-200 mx-1" />

                <ToolBtn title="Add link" action={setLink} active={editor.isActive("link")}>
                    <LinkIcon className="w-3.5 h-3.5" />
                </ToolBtn>

                <div className="w-px h-4 bg-slate-200 mx-1" />

                <ToolBtn title="Undo" action={() => editor.chain().focus().undo().run()}>
                    <Undo className="w-3.5 h-3.5" />
                </ToolBtn>
                <ToolBtn title="Redo" action={() => editor.chain().focus().redo().run()}>
                    <Redo className="w-3.5 h-3.5" />
                </ToolBtn>
            </div>

            {/* Editor area */}
            <div className="p-3 bg-white">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}
