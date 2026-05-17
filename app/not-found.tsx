import Link from "next/link"
import { Shield, ArrowLeft, Heart, Phone } from "lucide-react"

export default function NotFound() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
            style={{ background: "#FFFFFF" }}
        >
            {/* Dot grid background */}
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

            {/* Soft green radial glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(0,179,134,0.08) 0%, transparent 70%)" }}
            />

            <div className="relative text-center max-w-lg mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-8">
                    <span className="badge-green">
                        <Shield className="w-3 h-3" />
                        Page Not Found
                    </span>
                </div>

                {/* 404 number */}
                <h1
                    className="text-[120px] sm:text-[160px] font-extrabold leading-none mb-2 gradient-text"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    404
                </h1>

                {/* Heading */}
                <h2
                    className="text-2xl sm:text-3xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                >
                    Oops! This page doesn&apos;t exist.
                </h2>

                <p
                    className="text-base leading-relaxed mb-10"
                    style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
                >
                    The page you&apos;re looking for may have been moved, renamed, or might never have existed.
                    Let&apos;s get you back on track.
                </p>

                {/* Primary CTA */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
                    <Link href="/" className="btn-primary gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <Link href="/contact" className="btn-outline gap-2">
                        <Phone className="w-3.5 h-3.5" />
                        Talk to an Advisor
                    </Link>
                </div>

                {/* Quick links */}
                <div
                    className="rounded-2xl p-6 text-left"
                    style={{ background: "var(--surface-muted)", border: "1px solid var(--border)" }}
                >
                    {/* eslint-disable-next-line react/no-danger */}
                    <style dangerouslySetInnerHTML={{ __html: ".quick-link:hover { border-color: var(--brand) !important; color: var(--brand) !important; }" }} />
                    <p
                        className="text-xs font-semibold uppercase tracking-widest mb-4"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                    >
                        Explore popular pages
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                            { label: "Term Life Insurance", href: "/term-life", icon: Shield },
                            { label: "Health Insurance", href: "/health", icon: Heart },
                            { label: "Best Term Plans 2026", href: "/term-life/best-term-insurance-plans", icon: Shield },
                            { label: "Family Health Plans", href: "/health/family-health-insurance", icon: Heart },
                        ].map(({ label, href, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="quick-link flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
                                style={{
                                    color: "var(--text-secondary)",
                                    background: "#FFFFFF",
                                    border: "1px solid var(--border)",
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--brand)" }} />
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}