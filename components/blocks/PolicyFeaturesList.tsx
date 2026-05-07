import { PolicyFeaturesListData } from "@/types/blocks"

export default function PolicyFeaturesList({ data }: { data: PolicyFeaturesListData }) {
    return (
        <div className="my-8">
            {data.title && (
                <h2 className="text-xl font-semibold text-slate-900 mb-5">{data.title}</h2>
            )}
            <div className="space-y-6">
                {(data.features || []).map((feature, i) => (
                    <div key={i} id={`feature-${i}`}>
                        <h3 className="font-semibold text-slate-900 mb-1.5 flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">
                                {i + 1}
                            </span>
                            {feature.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed pl-7">{feature.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}