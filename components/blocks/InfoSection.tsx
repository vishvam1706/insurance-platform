import { InfoSectionData } from "@/types/blocks"
import Image from "next/image"

export default function InfoSection({ data, isHome = false }: { data: InfoSectionData, isHome?: boolean }) {
    return (
        <div className={isHome ? "py-16 sm:py-20" : "my-10"}>
            <div className={isHome ? "max-w-7xl mx-auto px-6 lg:px-8" : "w-full"}>
                {data.title && (
                <h2 className="font-bold mb-4" style={{ fontSize: "var(--fs-h2)", fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
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
        </div>
    )
}
