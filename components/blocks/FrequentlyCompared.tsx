import { FrequentlyComparedData } from "@/types/blocks"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function FrequentlyCompared({ data }: { data: FrequentlyComparedData }) {
    return (
        <div className="my-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-4">{data.title}</h2>
            )}
            <div className="space-y-2">
                {(data.links || []).map((link, i) => (
                    <Link
                        key={i}
                        href={link.url}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
                    >
                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
                            {link.label}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0" />
                    </Link>
                ))}
            </div>
        </div>
    )
}