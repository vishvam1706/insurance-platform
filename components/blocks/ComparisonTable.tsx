import { ComparisonTableData } from "@/types/blocks"

export default function ComparisonTable({ data }: { data: ComparisonTableData }) {
    const columns = data.columns || []
    const rows = data.rows || []
    return (
        <div className="my-10">
            {data.title && (
                <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>{data.title}</h2>
            )}
            <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid var(--border)" }}>
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ background: "var(--surface-muted)", borderBottom: "1px solid var(--border)" }}>
                            {columns.map((col, i) => (
                                <th key={i} className="text-left px-5 py-3.5 font-semibold" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, ri) => (
                            <tr key={ri} style={{ background: ri % 2 === 0 ? "#FFFFFF" : "var(--surface-muted)" }}>
                                {row.map((cell, ci) => (
                                    <td key={ci} className="px-5 py-3.5 leading-relaxed" style={{
                                        borderBottom: ri < rows.length - 1 ? "1px solid var(--border-light)" : "none",
                                        color: ci === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                                        fontWeight: ci === 0 ? 600 : 400,
                                        fontFamily: "var(--font-body)",
                                    }}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
