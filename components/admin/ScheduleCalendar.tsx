"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { format, addDays, startOfWeek, isWeekend, isToday, isBefore, startOfDay } from "date-fns"
import { ChevronLeft, ChevronRight, Loader2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Slot {
    time: string
    value: string
    available: boolean
    remaining: number
}

interface DaySlots {
    date: Date
    slots: Slot[]
}

export default function ScheduleCalendar() {
    const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }))
    const [weekSlots, setWeekSlots] = useState<DaySlots[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const weekDays = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i))

    useEffect(() => {
        async function loadWeek() {
            setLoading(true)
            try {
                const results = await Promise.all(
                    weekDays.map(async (date) => {
                        if (isBefore(date, startOfDay(new Date())) && !isToday(date)) {
                            return { date, slots: [] }
                        }
                        const res = await axios.get("/api/booking/slots", {
                            params: { date: format(date, "yyyy-MM-dd") },
                        })
                        return { date, slots: res.data.slots }
                    })
                )
                setWeekSlots(results)
                setSelectedDate(weekDays[0])
            } catch {
                // silent
            } finally {
                setLoading(false)
            }
        }
        loadWeek()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weekStart])

    const selectedDaySlots = weekSlots.find(
        (d) => selectedDate && format(d.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
    )

    return (
        <div className="space-y-5">
            {/* Week navigation */}
            <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 p-2 sm:p-4 gap-1 sm:gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setWeekStart((d) => addDays(d, -7))}
                    className="h-9 w-9 p-0"
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto flex-1 justify-center px-1">
                    {weekDays.map((day) => {
                        const daySlots = weekSlots.find((d) => format(d.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd"))
                        const totalSlots = daySlots?.slots.length ?? 0
                        const freeSlots = daySlots?.slots.filter((s) => s.available).length ?? 0
                        const isSelected = selectedDate && format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                        const isPast = isBefore(day, startOfDay(new Date())) && !isToday(day)

                        return (
                            <button
                                key={day.toISOString()}
                                onClick={() => !isPast && setSelectedDate(day)}
                                disabled={isPast}
                                className={cn(
                                    "flex flex-col items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all text-sm min-w-[48px] sm:min-w-[64px] shrink-0",
                                    isSelected
                                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                                        : isPast
                                            ? "opacity-40 cursor-not-allowed text-slate-400"
                                            : "hover:bg-slate-100 text-slate-700"
                                )}
                            >
                                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">
                                    {format(day, "EEE")}
                                </span>
                                <span className={cn("text-base sm:text-lg font-bold", isToday(day) && !isSelected && "text-emerald-600")}>
                                    {format(day, "d")}
                                </span>
                                {!isPast && totalSlots > 0 && (
                                    <span className={cn(
                                        "text-[10px] sm:text-xs mt-0.5",
                                        isSelected ? "text-emerald-100" : freeSlots > 0 ? "text-green-600" : "text-red-400"
                                    )}>
                                        {freeSlots}/{totalSlots}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setWeekStart((d) => addDays(d, 7))}
                    className="h-9 w-9 p-0"
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Slots for selected day */}
            <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-5">
                {selectedDate && (
                    <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">
                        {format(selectedDate, "EEEE, d MMMM yyyy")}
                    </h3>
                )}

                {loading ? (
                    <div className="flex items-center justify-center h-32">
                        <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                    </div>
                ) : !selectedDaySlots || selectedDaySlots.slots.length === 0 ? (
                    <div className="text-center py-10 text-slate-400">
                        <Phone className="w-6 h-6 mx-auto mb-2 opacity-40" />
                        <p className="text-sm">No slots for this day</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {selectedDaySlots.slots.map((slot) => (
                            <div
                                key={slot.value}
                                className={cn(
                                    "rounded-lg border p-3 text-center transition-all",
                                    slot.available
                                        ? "border-green-200 bg-green-50"
                                        : "border-red-200 bg-red-50"
                                )}
                            >
                                <p className="text-sm font-semibold text-slate-900">{slot.time}</p>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "text-xs mt-1",
                                        slot.available
                                            ? "border-green-300 text-green-700"
                                            : "border-red-300 text-red-700"
                                    )}
                                >
                                    {slot.available ? `${slot.remaining} left` : "Full"}
                                </Badge>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}