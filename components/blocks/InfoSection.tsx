import { InfoSectionData } from "@/types/blocks"
import Image from "next/image"

export default function InfoSection({ data }: { data: InfoSectionData }) {
    return (
        <div className="my-10">
            {data.title && (
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                    {data.title}
                </h2>
            )}
            <div className={data.image ? "grid md:grid-cols-2 gap-8 items-start" : ""}>
                <div
                    className="prose max-w-none"
                    style={{ fontFamily: "var(--font-body)" }}
                    dangerouslySetInnerHTML={{ __html: data.body || "" }}
                />
                {data.image && (
                    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                        <Image src={data.image} alt={data.title || ""} width={600} height={400} className="w-full object-cover" />
                    </div>
                )}
            </div>
        </div>
    )
}
