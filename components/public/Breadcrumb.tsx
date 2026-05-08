import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
    label: string
    href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav
            className="flex items-center gap-1.5 text-xs mb-6 flex-wrap"
            style={{ color: "#9CA3AF", fontFamily: "var(--font-body)" }}
        >
            <Link
                href="/"
                className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
                <Home className="w-3 h-3" />
                Home
            </Link>
            {items.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3" style={{ color: "#D1D5DB" }} />
                    {item.href ? (
                        <Link href={item.href} className="hover:text-blue-600 transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span
                            className="font-semibold"
                            style={{ color: "#111827", fontFamily: "var(--font-body)" }}
                        >
                            {item.label}
                        </span>
                    )}
                </span>
            ))}
        </nav>
    )
}