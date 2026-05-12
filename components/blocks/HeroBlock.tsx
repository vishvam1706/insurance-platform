import { HeroBlockData } from "@/types/blocks"
import { BadgeCheck, Clock, CalendarDays, UserCheck } from "lucide-react"
import Image from "next/image"

function formatDate(dateStr?: string) {
    if (!dateStr) return null
    // Handle both "20 Feb, 2026" and ISO formats
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr // return as-is if not parseable
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
}

function getName(val: any): string {
    if (!val) return ""
    if (typeof val === "string") return val
    if (typeof val === "object") return val.name || ""
    return ""
}

function getRole(val: any): string {
    if (!val) return ""
    if (typeof val === "object") return val.role || ""
    return ""
}

export default function HeroBlock({ data }: { data: HeroBlockData }) {
    const hasImage = Boolean(data.backgroundImage)
    const updatedStr = formatDate(data.publishedDate)
    const authorName = getName(data.author)
    const reviewerName = getName(data.reviewer)
    const reviewerRole = getRole(data.reviewer) || "IRDAI-Certified Expert"
    const category = (data as any).category

    return (
        <div className="p-8 sm:p-10" style={{ borderBottom: "1px solid var(--border-light)" }}>
            {/* Category badge */}
            {category && (
                <span className="badge-green mb-5 inline-flex">
                    {category}
                </span>
            )}

            {/* Title + Image row */}
            <div className={`${hasImage ? "grid sm:grid-cols-[1fr_auto] gap-8 items-start" : ""}`}>
                <div>
                    <h1
                        className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                    >
                        {data.title}
                    </h1>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-6">
                        {authorName && (
                            <div
                                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                                style={{ background: "var(--surface-muted)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                            >
                                <UserCheck className="w-3.5 h-3.5" style={{ color: "var(--brand)" }} />
                                Written by <span className="font-bold" style={{ color: "var(--text-primary)" }}>{authorName}</span>
                            </div>
                        )}

                        {reviewerName && (
                            <div
                                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                                style={{ background: "#ECFDF5", color: "#065F46", border: "1px solid #A7F3D0" }}
                            >
                                <BadgeCheck className="w-3.5 h-3.5" style={{ color: "#00B386" }} />
                                Reviewed by <span className="font-bold">{reviewerName}</span>
                                {reviewerRole && <span className="opacity-60"> · {reviewerRole}</span>}
                            </div>
                        )}

                        {data.certificationId && (
                            <div
                                className="text-xs px-3 py-1.5 rounded-full font-mono"
                                style={{ background: "var(--brand-light)", color: "var(--brand)", border: "1px solid var(--brand-100)" }}
                            >
                                {data.certificationId}
                            </div>
                        )}

                        {updatedStr && (
                            <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                                <CalendarDays className="w-3.5 h-3.5" />
                                {updatedStr}
                            </div>
                        )}
                    </div>

                    {/* Subtitle */}
                    {data.subtitle && (
                        <p
                            className="text-base leading-relaxed p-4 rounded-2xl"
                            style={{
                                color: "var(--text-secondary)",
                                background: "var(--brand-light)",
                                border: "1px solid var(--brand-100)",
                                fontFamily: "var(--font-body)",
                            }}
                        >
                            {data.subtitle}
                        </p>
                    )}
                </div>

                {/* Featured image */}
                {hasImage && (
                    <div
                        className="rounded-2xl overflow-hidden shrink-0 w-full sm:w-52"
                        style={{ border: "1px solid var(--border)" }}
                    >
                        <Image
                            src={data.backgroundImage!}
                            alt={data.title || ""}
                            width={208}
                            height={156}
                            className="w-full object-cover"
                            unoptimized
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
