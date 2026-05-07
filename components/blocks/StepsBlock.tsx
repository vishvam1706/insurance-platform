import { StepsBlockData } from "@/types/blocks"

export default function StepsBlock({ data }: { data: StepsBlockData }) {
    return (
        <div className="my-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-5">{data.title}</h2>
            )}
            <ol className="space-y-4">
                {(data.steps || []).map((step, i) => (
                    <li key={i} className="flex gap-4">
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                        </div>
                        <p className="text-slate-700 leading-relaxed pt-0.5">{step.text}</p>
                    </li>
                ))}
            </ol>
        </div>
    )
}