import { RichTextBlockData } from "@/types/blocks"
import Image from "next/image"

export default function RichTextBlock({ data, isHome = false }: { data: RichTextBlockData, isHome?: boolean }) {
    return (
        <div className={isHome ? "py-12 sm:py-16 bg-transparent" : "my-6"}>
            <div
                className={`prose ${isHome ? "max-w-4xl mx-auto px-6 lg:px-8" : "max-w-none"}`}
                style={{ fontFamily: "var(--font-body)" }}
                dangerouslySetInnerHTML={{ __html: data.content || "" }}
            />
            {data.inlineImage && (
                <div className="mt-5 rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                    <Image src={data.inlineImage} alt="Inline image" width={800} height={400} className="w-full object-cover" />
                </div>
            )}
        </div>
    )
}

