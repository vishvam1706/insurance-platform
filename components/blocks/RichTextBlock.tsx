import { RichTextBlockData } from "@/types/blocks"
import Image from "next/image"

export default function RichTextBlock({ data }: { data: RichTextBlockData }) {
    return (
        <div className="my-6">
            <div
                className="prose max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-li:text-gray-600 prose-strong:text-gray-900"
                style={{ fontFamily: "var(--font-body)" }}
                dangerouslySetInnerHTML={{ __html: data.content || "" }}
            />
            {data.inlineImage && (
                <div
                    className="mt-5 rounded-2xl overflow-hidden"
                    style={{ border: "1px solid #E5E7EB" }}
                >
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