"use client"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface CsvExportButtonProps {
    filters?: Record<string, string>
}

export default function CsvExportButton({ filters = {} }: CsvExportButtonProps) {
    const [loading, setLoading] = useState(false)

    async function handleExport() {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v) })

            const res = await fetch(`/api/inquiries/export?${params}`)
            if (!res.ok) throw new Error("Export failed")

            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `inquiries-${Date.now()}.csv`
            a.click()
            URL.revokeObjectURL(url)
            toast.success("CSV exported successfully")
        } catch {
            toast.error("Failed to export CSV")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button variant="outline" size="sm" onClick={handleExport} disabled={loading}>
            {loading
                ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                : <Download className="w-4 h-4 mr-2" />
            }
            Export CSV
        </Button>
    )
}