import { HeroBlockData } from "@/types/blocks"
import { BadgeCheck, CalendarDays, UserCheck } from "lucide-react"
import Image from "next/image"

function formatDate(dateStr?: string) {
    if (!dateStr) return null
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
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

function getPhoto(val: any): string {
    if (!val) return ""
    if (typeof val === "object") return val.photo || val.avatar || ""
    return ""
}

/** Simple circle avatar with initials fallback */
function Avatar({ name, photo, size = 44 }: { name: string; photo?: string; size?: number }) {
    const initials = name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()

    if (photo) {
        return (
            <div
                className="rounded-full overflow-hidden shrink-0 border-2"
                style={{ width: size, height: size, borderColor: "var(--border)" }}
            >
                <Image
                    src={photo}
                    alt={name}
                    width={size}
                    height={size}
                    className="w-full h-full object-cover"
                />
            </div>
        )
    }

    return (
        <div
            className="rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm"
            style={{
                width: size,
                height: size,
                background: "linear-gradient(135deg, var(--brand) 0%, #0097c4 100%)",
                fontSize: size * 0.32,
            }}
        >
            {initials || "?"}
        </div>
    )
}

export default function HeroBlock({ data }: { data: HeroBlockData }) {
    const updatedStr = formatDate(data.publishedDate)
    const authorName = getName(data.author)
    const authorRole = getRole(data.author)
    const authorPhoto = getPhoto(data.author)
    const reviewerName = getName(data.reviewer)
    const reviewerRole = getRole(data.reviewer) || "IRDAI-Certified Expert"
    const reviewerPhoto = getPhoto(data.reviewer)
    const category = (data as any).category

    const hasPersonCards = authorName || reviewerName
    const hasBottomImage = Boolean(data.bottomImage)
    const hasBgImage = Boolean(data.backgroundImage)

    return (
        <div className="pb-8" style={{ borderBottom: "1px solid var(--border-light)" }}>
            {/* Top bar: category + date */}
            <div
                className="flex items-center justify-between px-8 sm:px-10 pt-8 pb-5 flex-wrap gap-2"
            >
                {category ? (
                    <span className="badge-green inline-flex">{category}</span>
                ) : (
                    <span
                        className="text-xs font-semibold"
                        style={{ color: "var(--brand)", fontFamily: "var(--font-body)" }}
                    >
                        Life Insurance
                    </span>
                )}
                {updatedStr && (
                    <div
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                    >
                        <CalendarDays className="w-3.5 h-3.5" />
                        Published on: {updatedStr}
                    </div>
                )}
            </div>

            {/* Title */}
            <div className="px-8 sm:px-10">
                <h1
                    className="text-3xl sm:text-4xl font-extrabold leading-tight mb-6"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                >
                    {data.title}
                </h1>

                {/* Author + Reviewer cards — 2 photos side by side */}
                {hasPersonCards && (
                    <div className="flex flex-wrap gap-4 mb-6">
                        {/* Author card */}
                        {authorName && (
                            <div
                                className="flex items-center gap-3 rounded-xl px-4 py-3 flex-1 min-w-[200px]"
                                style={{
                                    background: "var(--surface-muted)",
                                    border: "1px solid var(--border)",
                                }}
                            >
                                <Avatar name={authorName} photo={authorPhoto} size={44} />
                                <div className="min-w-0">
                                    <p
                                        className="text-[10px] uppercase tracking-wider font-semibold mb-0.5"
                                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                                    >
                                        Written by
                                    </p>
                                    <p
                                        className="text-sm font-bold leading-tight flex items-center gap-1"
                                        style={{ color: "var(--text-primary)", fontFamily: "var(--font-body)" }}
                                    >
                                        {authorName}
                                        <UserCheck
                                            className="w-3.5 h-3.5 shrink-0"
                                            style={{ color: "var(--brand)" }}
                                        />
                                    </p>
                                    {authorRole && (
                                        <p
                                            className="text-xs mt-0.5 truncate"
                                            style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                                        >
                                            {authorRole}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Reviewer card */}
                        {reviewerName && (
                            <div
                                className="flex items-center gap-3 rounded-xl px-4 py-3 flex-1 min-w-[200px]"
                                style={{
                                    background: "#ECFDF5",
                                    border: "1px solid #A7F3D0",
                                }}
                            >
                                <Avatar name={reviewerName} photo={reviewerPhoto} size={44} />
                                <div className="min-w-0">
                                    <p
                                        className="text-[10px] uppercase tracking-wider font-semibold mb-0.5"
                                        style={{ color: "#059669", fontFamily: "var(--font-body)" }}
                                    >
                                        Reviewed by
                                    </p>
                                    <p
                                        className="text-sm font-bold leading-tight flex items-center gap-1"
                                        style={{ color: "#065F46", fontFamily: "var(--font-body)" }}
                                    >
                                        {reviewerName}
                                        <BadgeCheck
                                            className="w-3.5 h-3.5 shrink-0"
                                            style={{ color: "#00B386" }}
                                        />
                                    </p>
                                    <p
                                        className="text-xs mt-0.5 truncate"
                                        style={{ color: "#059669", fontFamily: "var(--font-body)" }}
                                    >
                                        {reviewerRole}
                                    </p>
                                    {data.certificationId && (
                                        <p
                                            className="text-[10px] mt-0.5 font-mono"
                                            style={{ color: "#059669" }}
                                        >
                                            {data.certificationId}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Old-style certificationId outside cards (when no reviewer) */}
                {data.certificationId && !reviewerName && (
                    <div
                        className="inline-flex text-xs px-3 py-1.5 rounded-full font-mono mb-4"
                        style={{ background: "var(--brand-light)", color: "var(--brand)", border: "1px solid var(--brand-100)" }}
                    >
                        {data.certificationId}
                    </div>
                )}

                {/* Subtitle */}
                {data.subtitle && (
                    <p
                        className="text-base leading-relaxed p-4 rounded-2xl mb-6"
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

            {/* Background / top feature image */}
            {hasBgImage && (
                <div className="px-8 sm:px-10 mb-2">
                    <div
                        className="rounded-2xl overflow-hidden w-full"
                        style={{ border: "1px solid var(--border)" }}
                    >
                        <Image
                            src={data.backgroundImage!}
                            alt={data.title || ""}
                            width={900}
                            height={400}
                            className="w-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Bottom image with caption */}
            {hasBottomImage && (
                <div className="px-8 sm:px-10 mt-5">
                    <figure>
                        <div
                            className="rounded-2xl overflow-hidden w-full"
                            style={{ border: "1px solid var(--border)" }}
                        >
                            <Image
                                src={data.bottomImage!}
                                alt={data.bottomCaption || data.title || ""}
                                width={900}
                                height={420}
                                className="w-full object-cover"
                            />
                        </div>
                        {data.bottomCaption && (
                            <figcaption
                                className="text-center text-xs mt-2.5 leading-relaxed prose prose-sm max-w-none"
                                style={{
                                    color: "var(--text-muted)",
                                    fontFamily: "var(--font-body)",
                                }}
                                dangerouslySetInnerHTML={{ __html: data.bottomCaption }}
                            />
                        )}
                    </figure>
                </div>
            )}
        </div>
    )
}
