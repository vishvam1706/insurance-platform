"use client"

import { HeroBlockData } from "@/types/blocks"
import { BadgeCheck, CalendarDays, UserCheck } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

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
                background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%)",
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
    const reviewerRole = getRole(data.reviewer) || "Insurance Expert"
    const reviewerPhoto = getPhoto(data.reviewer)
    const category = (data as any).category

    const hasPersonCards = authorName || reviewerName
    const hasBottomImage = Boolean(data.bottomImage)
    const hasBgImage = Boolean(data.backgroundImage)

    // Framer motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            }
        }
    } as const

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    } as const

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    } as const

    return (
        <motion.div 
            className="pb-8" 
            style={{ borderBottom: "1px solid var(--border-light)" }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Top bar: category + date */}
            <motion.div
                className="flex items-center justify-between px-8 sm:px-10 pt-8 pb-5 flex-wrap gap-2"
                variants={itemVariants}
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
            </motion.div>

            {/* Title */}
            <div className="px-8 sm:px-10">
                <motion.h1
                    variants={itemVariants}
                    style={{
                        fontSize: "var(--fs-hero)",
                        fontFamily: "var(--font-heading)",
                        color: "var(--text-primary)",
                        fontWeight: 800,
                        lineHeight: 1.15,
                        marginBottom: "1.25rem",
                    }}
                >
                    {data.title}
                </motion.h1>

                {/* Author + Reviewer cards — 2 photos side by side */}
                {hasPersonCards && (
                    <motion.div className="flex flex-wrap gap-4 mb-6" variants={itemVariants}>
                        {/* Author card */}
                        {authorName && (
                            <motion.div
                                className="flex items-center gap-3 rounded-xl px-4 py-3 flex-1 min-w-[200px] transition-all hover:shadow-md hover:border-emerald-500/20"
                                style={{
                                    background: "var(--surface-muted)",
                                    border: "1px solid var(--border)",
                                }}
                                whileHover={{ y: -3 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                            </motion.div>
                        )}

                        {/* Reviewer card */}
                        {reviewerName && (
                            <motion.div
                                className="flex items-center gap-3 rounded-xl px-4 py-3 flex-1 min-w-[200px] transition-all hover:shadow-md hover:border-emerald-500/30"
                                style={{
                                    background: "var(--brand-light)",
                                    border: "1px solid var(--brand-200)",
                                }}
                                whileHover={{ y: -3 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <Avatar name={reviewerName} photo={reviewerPhoto} size={44} />
                                <div className="min-w-0">
                                    <p
                                        className="text-[10px] uppercase tracking-wider font-semibold mb-0.5"
                                        style={{ color: "var(--brand-dark)", fontFamily: "var(--font-body)" }}
                                    >
                                        Reviewed by
                                    </p>
                                    <p
                                        className="text-sm font-bold leading-tight flex items-center gap-1"
                                        style={{ color: "var(--text-primary)", fontFamily: "var(--font-body)" }}
                                    >
                                        {reviewerName}
                                        <BadgeCheck
                                            className="w-3.5 h-3.5 shrink-0"
                                            style={{ color: "var(--brand)" }}
                                        />
                                    </p>
                                    <p
                                        className="text-xs mt-0.5 truncate"
                                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                                    >
                                        {reviewerRole}
                                    </p>
                                    {data.certificationId && (
                                        <p
                                            className="text-[10px] mt-0.5 font-mono"
                                            style={{ color: "var(--brand-dark)" }}
                                        >
                                            {data.certificationId}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Old-style certificationId outside cards (when no reviewer) */}
                {data.certificationId && !reviewerName && (
                    <motion.div
                        className="inline-flex text-xs px-3 py-1.5 rounded-full font-mono mb-4"
                        style={{ background: "var(--brand-light)", color: "var(--brand)", border: "1px solid var(--brand-100)" }}
                        variants={itemVariants}
                    >
                        {data.certificationId}
                    </motion.div>
                )}

                {/* Subtitle */}
                {data.subtitle && (
                    <motion.p
                        className="text-base leading-relaxed p-4 rounded-2xl mb-6"
                        style={{
                            color: "var(--text-secondary)",
                            background: "var(--brand-light)",
                            border: "1px solid var(--brand-100)",
                            fontFamily: "var(--font-body)",
                        }}
                        variants={itemVariants}
                    >
                        {data.subtitle}
                    </motion.p>
                )}
            </div>

            {/* Background / top feature image */}
            {hasBgImage && (
                <motion.div className="px-8 sm:px-10 mb-2" variants={imageVariants}>
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
                </motion.div>
            )}

            {/* Bottom image with caption */}
            {hasBottomImage && (
                <motion.div className="px-8 sm:px-10 mt-5" variants={imageVariants}>
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
                </motion.div>
            )}
        </motion.div>
    )
}
