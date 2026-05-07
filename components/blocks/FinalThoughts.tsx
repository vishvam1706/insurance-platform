import { FinalThoughtsData } from "@/types/blocks"

export default function FinalThoughts({ data }: { data: FinalThoughtsData }) {
    return (
        <div className="my-8 border-t border-slate-200 pt-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-4">{data.title}</h2>
            )}
            <div
                className="prose prose-slate max-w-none text-slate-700"
                dangerouslySetInnerHTML={{ __html: data.body || "" }}
            />
        </div>
    )
}