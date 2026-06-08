export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Inquiry from "@/lib/models/Inquiry"
import User from "@/lib/models/User"
import { getAuthUser } from "@/lib/auth"

/**
 * GET /api/inquiries/stats
 * Returns employee workload distribution for admin/super_admin.
 * Response: { employees: [{ _id, name, email, total, new, contacted, resolved, not_reachable }], unassigned: number }
 */
export async function GET() {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        await connectDB()

        // Get all active employees
        const employees = await User.find({ role: "employee", status: "active" })
            .select("name email")
            .lean()

        // Aggregate inquiry counts grouped by assignedTo and status
        const pipeline = [
            { $group: {
                _id: { assignedTo: "$assignedTo", status: "$status" },
                count: { $sum: 1 }
            }}
        ]
        const raw = await Inquiry.aggregate(pipeline)

        // Count unassigned
        const unassigned = await Inquiry.countDocuments({ assignedTo: null })

        // Build per-employee stats
        const statsMap = new Map<string, { total: number; new: number; contacted: number; resolved: number; not_reachable: number }>()

        for (const emp of employees) {
            statsMap.set(emp._id.toString(), { total: 0, new: 0, contacted: 0, resolved: 0, not_reachable: 0 })
        }

        for (const row of raw) {
            const empId = row._id.assignedTo?.toString()
            if (!empId) continue
            const entry = statsMap.get(empId)
            if (!entry) continue
            const status = row._id.status as string
            entry.total += row.count
            if (status === "new") entry.new += row.count
            else if (status === "contacted") entry.contacted += row.count
            else if (status === "resolved") entry.resolved += row.count
            else if (status === "not_reachable") entry.not_reachable += row.count
        }

        const result = employees.map(emp => ({
            _id: emp._id.toString(),
            name: emp.name,
            email: emp.email,
            ...statsMap.get(emp._id.toString())!,
        }))

        return NextResponse.json({ employees: result, unassigned })
    } catch (err) {
        console.error("GET /api/inquiries/stats:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
