import { TypesListData } from "@/types/blocks"

export default function TypesList({ data }: { data: TypesListData }) {
    return (
        <div className="my-12">
            {data.title && (
                <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                    {data.title}
                </h2>
            )}
            <div className="overflow-x-auto rounded-2xl shadow-sm border border-[var(--border)] bg-white">
                <table className="w-full border-collapse">
                    <thead>
                        <tr style={{ background: "var(--surface-muted)", borderBottom: "1px solid var(--border)" }}>
                            <th className="text-left px-6 py-4.5 font-bold text-sm md:text-base tracking-wide" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>Type</th>
                            <th className="text-left px-6 py-4.5 font-bold text-sm md:text-base tracking-wide" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>Feature</th>
                            <th className="text-left px-6 py-4.5 font-bold text-sm md:text-base tracking-wide" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data.items || []).map((item, i) => (
                            <tr key={i} className="transition-colors hover:bg-[var(--surface-muted)]" style={{ background: i % 2 === 0 ? "#FFFFFF" : "var(--surface-muted)" }}>
                                <td className="px-6 py-4 md:py-4.5 font-semibold text-sm md:text-base align-top" style={{ borderBottom: "1px solid var(--border-light)", color: "var(--text-primary)", fontFamily: "var(--font-body)" }}>{item.type}</td>
                                <td className="px-6 py-4 md:py-4.5 leading-relaxed text-sm md:text-base align-top" style={{ borderBottom: "1px solid var(--border-light)", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>{item.feature}</td>
                                <td className="px-6 py-4 md:py-4.5 text-xs md:text-sm align-top" style={{ borderBottom: "1px solid var(--border-light)", color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>{item.example}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {data.note && (
                <p className="text-xs md:text-sm mt-4 italic" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>* {data.note}</p>
            )}
        </div>
    )
}

