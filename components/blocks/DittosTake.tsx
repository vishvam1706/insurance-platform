import { DittosTakeData } from "@/types/blocks"
import { Lightbulb } from "lucide-react"

export default function DittosTake({ data }: { data: DittosTakeData }) {
    return (
        <div className="my-8 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-indigo-900">{data.title || "Ditto's Take"}</h3>
            </div>
            <div
                className="text-indigo-800 text-sm leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: data.body || "" }}
            />
        </div>
    )
}