import { Metadata } from "next"
import { CalendarClock } from "lucide-react"
import ScheduleCalendar from "@/components/admin/ScheduleCalendar"

export const metadata: Metadata = { title: "Schedule" }

export default function SchedulePage() {
    return (
        <div className="space-y-5 pt-3 sm:pt-5 lg:pt-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                    <CalendarClock className="w-6 h-6 text-emerald-600" />
                    Call Schedule
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    View available call slots and booking capacity for each day
                </p>
            </div>

            <ScheduleCalendar />

            {/* Legend */}
            <div className="flex items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-green-100 border border-green-300 inline-block" />
                    Available slots
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-red-100 border border-red-300 inline-block" />
                    Fully booked
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
                    Selected day
                </div>
            </div>
        </div>
    )
}