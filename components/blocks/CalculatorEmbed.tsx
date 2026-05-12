"use client"

import { CalculatorEmbedData } from "@/types/blocks"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator } from "lucide-react"

export default function CalculatorEmbed({ data }: { data: CalculatorEmbedData }) {
    const [age, setAge] = useState("")
    const [income, setIncome] = useState("")
    const [result, setResult] = useState<string | null>(null)

    function calculate() {
        const a = parseInt(age)
        const i = parseInt(income)
        if (!a || !i) return
        const multiplier = a < 30 ? 25 : a < 40 ? 20 : a < 50 ? 15 : 10
        const cover = (i * multiplier).toLocaleString("en-IN")
        setResult(`₹${cover}`)
    }

    return (
        <div className="my-8 rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "#FFFFFF" }}>
            {/* Header bar */}
            <div className="px-6 py-4 flex items-center gap-3" style={{ background: "#1A1A2E", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--brand)" }}>
                    <Calculator className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-heading)" }}>{data.title}</h2>
                    {data.description && (
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>{data.description}</p>
                    )}
                </div>
            </div>

            <div className="p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label className="text-xs font-semibold" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>Your Age</Label>
                        <Input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="e.g. 30"
                            className="rounded-xl"
                            style={{ border: "1px solid var(--border)", fontFamily: "var(--font-body)" }}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs font-semibold" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>Annual Income (₹)</Label>
                        <Input
                            type="number"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                            placeholder="e.g. 1200000"
                            className="rounded-xl"
                            style={{ border: "1px solid var(--border)", fontFamily: "var(--font-body)" }}
                        />
                    </div>
                </div>

                <Button
                    onClick={calculate}
                    className="w-full font-semibold rounded-full"
                    style={{ background: "var(--brand)", color: "#FFFFFF", fontFamily: "var(--font-body)" }}
                >
                    Calculate Cover
                </Button>

                {result && (
                    <div className="text-center rounded-2xl p-5" style={{ background: "var(--brand-light)", border: "1px solid var(--brand-100)" }}>
                        <p className="text-xs font-medium mb-1" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>Recommended Cover</p>
                        <p className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-heading)", color: "var(--brand)" }}>{result}</p>
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>Based on income replacement method</p>
                    </div>
                )}
            </div>
        </div>
    )
}
