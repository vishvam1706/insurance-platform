import { HeroBlockData } from "@/types/blocks"
import { BadgeCheck, Clock, CalendarDays, UserCheck } from "lucide-react"
import Image from "next/image"

function formatDate(dateStr?: string) {
    if (!dateStr) return null
    const d = new Date(dateStr)
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
}

export default function HeroBlock({ data }: { data: HeroBlockData }) {
    const hasImage = Boolean(data.image)
    const updatedStr = formatDate(data.updatedAt || data.publishedAt)

    return (
        <div className="p-8 sm:p-10" style={{ borderBottom: "1px solid var(--border-light)" }}>
            {/* ── Category badge ── */}
            {data.category && (
                <span className="badge-blue mb-5 inline-flex">
                    {data.category}
                </span>
            )}

            {/* ── Title + Image row ── */}
            <div className={`${hasImage ? "grid sm:grid-cols-[1fr_auto] gap-8 items-start" : ""}`}>
                <div>
                    <h1
                        className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                    >
                        {data.title}
                    </h1>

                    {/* ── Meta row ── */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        {/* Author */}
                        {data.author && (
                            <div
                                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                                style={{ background: "var(--surface-muted)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                            >
                                <UserCheck className="w-3.5 h-3.5" style={{ color: "var(--blue-600)" }} />
                                Written by <span className="font-bold" style={{ color: "var(--text-primary)" }}>{data.author}</span>
                            </div>
                        )}

                        {/* Reviewer */}
                        {data.reviewer && (
                            <div
                                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                                style={{ background: "#ECFDF5", color: "#065F46", border: "1px solid #A7F3D0" }}
                            >
                                <BadgeCheck className="w-3.5 h-3.5 text-green-600" />
                                Reviewed by <span className="font-bold">{data.reviewer}</span>
                            </div>
                        )}

                        {/* Date */}
                        {updatedStr && (
                            <div
                                className="flex items-center gap-1.5 text-xs"
                                style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                            >
                                <CalendarDays className="w-3.5 h-3.5" />
                                Updated {updatedStr}
                            </div>
                        )}

                        {/* Read time */}
                        {data.readTime && (
                            <div
                                className="flex items-center gap-1.5 text-xs"
                                style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                            >
                                <Clock className="w-3.5 h-3.5" />
                                {data.readTime}
                            </div>
                        )}
                    </div>

                    {/* ── Subtitle / lead paragraph ── */}
                    {data.subtitle && (
                        <p
                            className="text-base leading-relaxed p-4 rounded-2xl"
                            style={{
                                color: "var(--text-secondary)",
                                background: "var(--blue-50)",
                                border: "1px solid var(--blue-100)",
                                fontFamily: "var(--font-body)",
                            }}
                        >
                            {data.subtitle}
                        </p>
                    )}
                </div>

                {/* ── Featured image ── */}
                {hasImage && (
                    <div
                        className="rounded-2xl overflow-hidden shrink-0 w-full sm:w-52"
                        style={{ border: "1px solid var(--border)" }}
                    >
                        <Image
                            src={data.image!}
                            alt={data.imageAlt || data.title || ""}
                            width={208}
                            height={156}
                            className="w-full object-cover"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}