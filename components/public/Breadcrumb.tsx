import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
    label: string
    href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" />
                Home
            </Link>
            {items.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                    {item.href ? (
                        <Link href={item.href} className="hover:text-blue-600 transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-slate-900 font-medium">{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    )
}