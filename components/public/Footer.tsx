import Link from "next/link"
import { Shield } from "lucide-react"
import CopyrightYear from "./CopyrightYear"

const LINKS = {
    "Term Life": [
        { label: "What is Term Insurance?", href: "/term-life/what-is-term-insurance" },
        { label: "Term vs Life Insurance", href: "/term-life/term-vs-life-insurance" },
        { label: "Best Term Plans", href: "/term-life/best-term-insurance-plans" },
        { label: "1 Crore Term Plan", href: "/term-life/1-crore-term-insurance" },
        { label: "NRI Term Insurance", href: "/term-life/nri-term-insurance" },
    ],
    "Health Insurance": [
        { label: "What is Health Insurance?", href: "/health/what-is-health-insurance" },
        { label: "Compare Plans", href: "/health/compare-plans" },
        { label: "Best Health Plans", href: "/health/best-health-insurance-plans" },
        { label: "Family Health Insurance", href: "/health/family-health-insurance" },
    ],
    "Company": [
        { label: "About Us", href: "/about" },
        { label: "Articles", href: "/articles" },
        { label: "Contact", href: "/contact" },
        { label: "Book Free Call", href: "/book-call" },
    ],
}

export default function PublicFooter() {
    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-white text-sm">Insurance Platform</span>
                        </div>
                        <p className="text-sm leading-relaxed">
                            Expert advice on life and health insurance. Free consultations, no spam.
                        </p>
                        <div className="mt-4 flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <span key={i} className="text-amber-400 text-sm">★</span>
                            ))}
                            <span className="text-xs ml-1">4.9/5 · 15,000+ reviews</span>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(LINKS).map(([group, links]) => (
                        <div key={group}>
                            <h3 className="text-white font-medium text-sm mb-4">{group}</h3>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs">
                        © <CopyrightYear /> Insurance Platform. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                        <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}