import { ImageBlockData } from "@/types/blocks"
import Image from "next/image"

export default function ImageBlock({ data, isHome = false }: { data: ImageBlockData, isHome?: boolean }) {
    if (!data.image) return null
    return (
        <figure className={isHome ? "py-12" : "my-8"}>
            <div className={isHome ? "max-w-6xl mx-auto px-6 lg:px-8" : "w-full"}>
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <Image
                    src={data.image}
                    alt={data.altText || data.caption || ""}
                    width={900}
                    height={500}
                    className="w-full object-cover"
                />
            </div>
            {data.caption && (
                <figcaption className="text-center text-xs mt-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                    {data.caption}
                </figcaption>
            )}
            </div>
        </figure>
    )
}
