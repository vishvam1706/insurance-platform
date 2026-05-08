import { ImageBlockData } from "@/types/blocks"
import Image from "next/image"

export default function ImageBlock({ data }: { data: ImageBlockData }) {
    if (!data.image) return null
    return (
        <figure className="my-8">
            <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid #E5E7EB" }}
            >
                <Image
                    src={data.image}
                    alt={data.altText || ""}
                    width={900}
                    height={500}
                    className="w-full object-cover"
                />
            </div>
            {data.caption && (
                <figcaption
                    className="text-center text-xs mt-2"
                    style={{ color: "#9CA3AF", fontFamily: "var(--font-body)" }}
                >
                    {data.caption}
                </figcaption>
            )}
        </figure>
    )
}