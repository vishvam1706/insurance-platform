import { TypesListData } from "@/types/blocks"

export default function TypesList({ data }: { data: TypesListData }) {
    return (
        <div className="my-10">
            {data.title && (
                <h2
                    className="text-2xl font-bold mb-5"
                    style={{ fontFamily: "var(--font-heading)", color: "#111827" }}
                >
                    {data.title}
                </h2>
            )}
            <div
                className="overflow-x-auto rounded-2xl"
                style={{ border: "1px solid #E5E7EB" }}
            >
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr style={{ background: "#F8F9FA", borderBottom: "1px solid #E5E7EB" }}>
                            <th
                                className="text-left px-5 py-3.5 font-semibold"
                                style={{ color: "#374151", fontFamily: "var(--font-heading)" }}
                            >
                                Type
                            </th>
                            <th
                                className="text-left px-5 py-3.5 font-semibold"
                                style={{ color: "#374151", fontFamily: "var(--font-heading)" }}
                            >
                                Feature
                            </th>
                            <th
                                className="text-left px-5 py-3.5 font-semibold"
                                style={{ color: "#374151", fontFamily: "var(--font-heading)" }}
                            >
                                Example
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data.items || []).map((item, i) => (
                            <tr
                                key={i}
                                style={{ background: i % 2 === 0 ? "#FFFFFF" : "#F8F9FA" }}
                            >
                                <td
                                    className="px-5 py-3.5 font-semibold"
                                    style={{ borderBottom: "1px solid #F3F4F6", color: "#111827", fontFamily: "var(--font-body)" }}
                                >
                                    {item.type}
                                </td>
                                <td
                                    className="px-5 py-3.5 leading-relaxed"
                                    style={{ borderBottom: "1px solid #F3F4F6", color: "#6B7280", fontFamily: "var(--font-body)" }}
                                >
                                    {item.feature}
                                </td>
                                <td
                                    className="px-5 py-3.5 text-xs"
                                    style={{ borderBottom: "1px solid #F3F4F6", color: "#9CA3AF", fontFamily: "var(--font-body)" }}
                                >
                                    {item.example}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {data.note && (
                <p
                    className="text-xs mt-3 italic"
                    style={{ color: "#9CA3AF", fontFamily: "var(--font-body)" }}
                >
                    {data.note}
                </p>
            )}
        </div>
    )
}