import { StatBarData } from "@/types/blocks"

export default function StatBar({ data }: { data: StatBarData }) {
    return (
        <div
            className="my-10 rounded-2xl py-8 px-6"
            style={{ background: "#F8F9FA", border: "1px solid #E5E7EB" }}
        >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {(data.stats || []).map((stat, i) => (
                    <div
                        key={i}
                        className="text-center"
                        style={{
                            borderRight: i < (data.stats?.length ?? 0) - 1 ? "1px solid #E5E7EB" : "none",
                        }}
                    >
                        <p
                            className="text-2xl sm:text-3xl font-extrabold"
                            style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                        >
                            {stat.value}
                        </p>
                        <p
                            className="text-xs mt-1.5 font-medium"
                            style={{ color: "#9CA3AF", fontFamily: "var(--font-body)" }}
                        >
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}