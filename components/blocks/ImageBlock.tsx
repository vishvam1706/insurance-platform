import { ImageBlockData } from "@/types/blocks"
import Image from "next/image"

export default function ImageBlock({ data }: { data: ImageBlockData }) {
    if (!data.image) return null
    return (
        <figure className="my-6">
            <div className="rounded-xl overflow-hidden border border-slate-200">
                <Image
                    src={data.image}
                    alt={data.altText || ""}
                    width={900}
                    height={500}
                    className="w-full object-cover"
                />
            </div>
            {data.caption && (
                <figcaption className="text-center text-xs text-slate-400 mt-2">
                    {data.caption}
                </figcaption>
            )}
        </figure>
    )
}