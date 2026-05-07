import { RichTextBlockData } from "@/types/blocks"
import Image from "next/image"

export default function RichTextBlock({ data }: { data: RichTextBlockData }) {
    return (
        <div className="my-6">
            <div
                className="prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: data.content || "" }}
            />
            {data.inlineImage && (
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-200">
                    <Image
                        src={data.inlineImage}
                        alt="Inline image"
                        width={800}
                        height={400}
                        className="w-full object-cover"
                    />
                </div>
            )}
        </div>
    )
}