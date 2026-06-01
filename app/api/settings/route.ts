export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import SystemSettings from "@/lib/models/SystemSettings"
import { getAuthUser } from "@/lib/auth"

export async function GET() {
    try {
        await connectDB()
        
        let settings = await SystemSettings.findOne({ key: "global_settings" }).lean()
        
        // If not initialized yet, seed defaults on the fly
        if (!settings) {
            settings = await SystemSettings.create({
                key: "global_settings",
                formActive: true,
                languages: [
                    { language: "Hindi", visible: true },
                    { language: "English", visible: true },
                    { language: "Bengali", visible: true },
                    { language: "Marathi", visible: true },
                    { language: "Telugu", visible: true },
                    { language: "Tamil", visible: true },
                    { language: "Gujarati", visible: true },
                    { language: "Kannada", visible: true },
                    { language: "Malayalam", visible: true },
                    { language: "Punjabi", visible: true },
                    { language: "Odia", visible: true },
                    { language: "Assamese", visible: true },
                    { language: "Urdu", visible: true },
                    { language: "Maithili", visible: true },
                    { language: "Santali", visible: true },
                    { language: "Kashmiri", visible: true }
                ],
                shifts: [
                    { shiftName: "Morning Shift", startTime: "09:00", endTime: "13:00", frozen: false },
                    { shiftName: "Afternoon Shift", startTime: "13:00", endTime: "17:00", frozen: false },
                    { shiftName: "Evening Shift", startTime: "17:00", endTime: "21:00", frozen: false },
                    { shiftName: "Night Shift", startTime: "21:00", endTime: "09:00", frozen: false }
                ]
            })
        }
        
        return NextResponse.json({ settings })
    } catch (err) {
        console.error("GET /api/settings:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const body = await req.json()
        const { languages, shifts, formActive } = body

        await connectDB()

        const updateObj: Record<string, any> = {}
        if (languages !== undefined) updateObj.languages = languages
        if (shifts !== undefined) updateObj.shifts = shifts
        if (formActive !== undefined) updateObj.formActive = formActive

        const settings = await SystemSettings.findOneAndUpdate(
            { key: "global_settings" },
            { $set: updateObj },
            { new: true, upsert: true }
        )

        return NextResponse.json({ success: true, settings })
    } catch (err) {
        console.error("PUT /api/settings:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
