import { StatBarData } from "@/types/blocks"

export default function StatBar({ data }: { data: StatBarData }) {
    return (
        <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {(data.stats || []).map((stat, i) => (
                <div key={i} className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</p>
                </div>
            ))}
        </div>
    )
}