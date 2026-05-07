"use client"

import { CalculatorEmbedData } from "@/types/blocks"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CalculatorEmbed({ data }: { data: CalculatorEmbedData }) {
    const [age, setAge] = useState("")
    const [income, setIncome] = useState("")
    const [result, setResult] = useState<string | null>(null)

    function calculate() {
        const a = parseInt(age)
        const i = parseInt(income)
        if (!a || !i) return
        // Simple cover calculation: 20x annual income adjusted for age
        const multiplier = a < 30 ? 25 : a < 40 ? 20 : a < 50 ? 15 : 10
        const cover = (i * multiplier).toLocaleString("en-IN")
        setResult(`₹${cover}`)
    }

    return (
        <div className="my-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
            <h2 className="font-bold text-xl mb-1">{data.title}</h2>
            {data.description && (
                <p className="text-blue-100 text-sm mb-6">{data.description}</p>
            )}

            <div className="bg-white/10 rounded-xl p-5 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label className="text-blue-100 text-xs">Your Age</Label>
                        <Input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="e.g. 30"
                            className="bg-white/20 border-white/30 text-white placeholder:text-blue-200"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-blue-100 text-xs">Annual Income (₹)</Label>
                        <Input
                            type="number"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                            placeholder="e.g. 1200000"
                            className="bg-white/20 border-white/30 text-white placeholder:text-blue-200"
                        />
                    </div>
                </div>

                <Button
                    onClick={calculate}
                    className="w-full bg-white text-blue-700 hover:bg-blue-50 font-semibold"
                >
                    Calculate Cover
                </Button>

                {result && (
                    <div className="text-center bg-white/10 rounded-xl p-4">
                        <p className="text-blue-100 text-sm">Recommended Cover</p>
                        <p className="text-3xl font-bold mt-1">{result}</p>
                        <p className="text-blue-200 text-xs mt-1">Based on income replacement method</p>
                    </div>
                )}
            </div>
        </div>
    )
}