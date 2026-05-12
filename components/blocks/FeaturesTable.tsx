import { FeaturesTableData } from "@/types/blocks"

export default function FeaturesTable({ data }: { data: FeaturesTableData }) {
    return (
        <div className="my-10">
            {data.title && (
                <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                    {data.title}
                </h2>
            )}
            <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid var(--border)" }}>
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ background: "var(--surface-muted)", borderBottom: "1px solid var(--border)" }}>
                            <th className="text-left px-5 py-3.5 font-semibold" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}>
                                Aspect
                            </th>
                            <th className="text-left px-5 py-3.5 font-semibold" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}>
                                Feature
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data.rows || []).map((row, i) => (
                            <tr key={i} style={{ background: i % 2 === 0 ? "#FFFFFF" : "var(--surface-muted)" }}>
                                <td
                                    className="px-5 py-3.5 font-semibold w-1/3"
                                    style={{ borderBottom: "1px solid var(--border-light)", color: "var(--text-primary)", fontFamily: "var(--font-body)" }}
                                >
                                    {row.aspect}
                                </td>
                                <td
                                    className="px-5 py-3.5 leading-relaxed"
                                    style={{ borderBottom: "1px solid var(--border-light)", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
                                >
                                    {row.feature}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {data.note && (
                <p className="text-xs mt-3 italic" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                    {data.note}
                </p>
            )}
        </div>
    )
}
