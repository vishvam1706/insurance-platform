import { NoteBoxData } from "@/types/blocks"
import { Info } from "lucide-react"

export default function NoteBox({ data }: { data: NoteBoxData }) {
    return (
        <div className="my-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                    {data.label && (
                        <p className="text-sm font-bold text-blue-800 mb-1">{data.label}</p>
                    )}
                    <p className="text-sm text-blue-700 leading-relaxed">{data.content}</p>
                </div>
            </div>
        </div>
    )
}