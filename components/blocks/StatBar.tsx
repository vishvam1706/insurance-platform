import { StatBarData } from "@/types/blocks"

export default function StatBar({ data }: { data: StatBarData }) {
    return (
        <section className="py-10" style={{ background: "#FFFFFF" }}>
            <div className="max-w-7xl mx-auto px-6">
                <div
                    className="rounded-3xl px-8 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8"
                    style={{
                        background: "linear-gradient(135deg, #0F172A 0%, #134E4A 100%)",
                    }}
                >
                    {(data.stats || []).map((stat: any, i: number) => (
                        <div key={i} className="text-center">
                            <p
                                className="text-3xl font-extrabold mb-1"
                                style={{ fontFamily: "var(--font-heading)", color: "var(--brand)" }}
                            >
                                {stat.value}
                            </p>
                            <p
                                className="text-xs font-medium"
                                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)" }}
                            >
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}