export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Inquiry from "@/lib/models/Inquiry"
import { getAuthUser } from "@/lib/auth"
import { subDays, startOfDay } from "date-fns"

export async function GET() {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        await connectDB()

        const filter: Record<string, unknown> =
            user.role === "employee" && user.state ? { state: user.state } : {}

        // Daily counts for last 7 days
        const days = Array.from({ length: 7 }, (_, i) => {
            const date = subDays(new Date(), 6 - i)
            const start = startOfDay(date)
            const end = new Date(start.getTime() + 86400000)
            return { date, start, end }
        })

        const dailyCounts = await Promise.all(
            days.map(async ({ date, start, end }) => {
                const count = await Inquiry.countDocuments({
                    ...filter,
                    createdAt: { $gte: start, $lt: end },
                })
                return {
                    date: date.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
                    count,
                }
            })
        )

        // By state (top 8)
        const byState = await Inquiry.aggregate([
            { $match: filter },
            { $group: { _id: "$state", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 8 },
        ])

        // By type
        const byType = await Inquiry.aggregate([
            { $match: filter },
            { $group: { _id: "$insuranceType", count: { $sum: 1 } } },
        ])

        return NextResponse.json({ dailyCounts, byState, byType })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}