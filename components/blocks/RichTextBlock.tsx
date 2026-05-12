import { RichTextBlockData } from "@/types/blocks"
import Image from "next/image"

export default function RichTextBlock({ data }: { data: RichTextBlockData }) {
    return (
        <div className="my-6">
            <div
                className="prose max-w-none"
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
