import { InfoSectionData } from "@/types/blocks"
import Image from "next/image"

export default function InfoSection({ data }: { data: InfoSectionData }) {
    return (
        <div className="my-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-4">{data.title}</h2>
            )}
            <div className={data.image ? "grid md:grid-cols-2 gap-6 items-start" : ""}>
                <div
                    className="prose prose-slate max-w-none text-slate-700"
                    dangerouslySetInnerHTML={{ __html: data.body || "" }}
                />
                {data.image && (
                    <div className="rounded-xl overflow-hidden border border-slate-200">
                        <Image src={data.image} alt={data.title} width={600} height={400} className="w-full object-cover" />
                    </div>
                )}
            </div>
        </div>
    )
}