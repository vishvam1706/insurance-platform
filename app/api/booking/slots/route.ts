import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Inquiry from "@/lib/models/Inquiry"
import { addDays, format, setHours, setMinutes, isWeekend } from "date-fns"

const SLOT_HOURS = [9, 10, 11, 12, 14, 15, 16, 17]
const MAX_PER_SLOT = 3

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const dateStr = searchParams.get("date")

        if (!dateStr) {
            return NextResponse.json({ error: "Date is required" }, { status: 400 })
        }

        await connectDB()

        const date = new Date(dateStr)
        if (isWeekend(date)) {
            return NextResponse.json({ slots: [] })
        }

        const slots = await Promise.all(
            SLOT_HOURS.map(async (hour) => {
                const slotTime = setMinutes(setHours(date, hour), 0)
                const slotLabel = format(slotTime, "hh:mm a")
                const slotKey = format(slotTime, "yyyy-MM-dd'T'HH:mm")

                const booked = await Inquiry.countDocuments({
                    preferredSlot: slotKey,
                })

                return {
                    time: slotLabel,
                    value: slotKey,
                    available: booked < MAX_PER_SLOT,
                    remaining: Math.max(0, MAX_PER_SLOT - booked),
                }
            })
        )

        return NextResponse.json({ slots })
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}