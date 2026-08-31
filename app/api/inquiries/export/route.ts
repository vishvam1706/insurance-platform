export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Inquiry from "@/lib/models/Inquiry"
import { getAuthUser } from "@/lib/auth"

export async function GET(req: NextRequest) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        await connectDB()

        const { searchParams } = new URL(req.url)
        const status = searchParams.get("status")
        const type = searchParams.get("type")
        const state = searchParams.get("state")

        const filter: Record<string, unknown> = {}
        if (status) filter.status = status
        if (type) filter.insuranceType = type
        if (state) filter.state = state

        const inquiries = await Inquiry.find(filter)
            .sort({ createdAt: -1 })
            .lean()

        // Build CSV
        const headers = [
            "Name", "Phone", "Email",
            "Insurance Type", "State", "Language",
            "Preferred Slot", "Status", "Notes",
            "Created At",
        ]

        // Sanitize a cell: neutralise CSV formula injection (Excel/Sheets)
        // Values starting with =, +, -, @ are treated as formulas by spreadsheet apps.
        const sanitizeCell = (value: unknown): string => {
            const s = String(value ?? "")
            return /^[=+\-@\t\r]/.test(s) ? `'${s}` : s
        }

        const rows = inquiries.map((inq: any) => [
            sanitizeCell(inq.name),
            sanitizeCell(inq.phone),
            sanitizeCell(inq.email),
            sanitizeCell(inq.insuranceType),
            sanitizeCell(inq.state),
            sanitizeCell(inq.language),
            sanitizeCell(inq.preferredSlot || ""),
            sanitizeCell(inq.status),
            sanitizeCell((inq.notes || "").replace(/,/g, ";")),
            sanitizeCell(new Date(inq.createdAt).toLocaleString("en-IN")),
        ])

        const csv = [headers, ...rows]
            .map((row) => row.map((cell) => `"${cell}"`).join(","))
            .join("\n")

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="inquiries-${Date.now()}.csv"`,
            },
        })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}