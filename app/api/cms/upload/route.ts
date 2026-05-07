import { NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { saveUploadedFile, ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/upload"

export async function POST(req: NextRequest) {
    try {
        const user = await getAuthUser()
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        if (user.role === "employee") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const formData = await req.formData()
        const file = formData.get("file") as File | null

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Allowed: JPG, PNG, WebP, GIF, SVG" },
                { status: 400 }
            )
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: "File too large. Maximum size is 5MB" },
                { status: 400 }
            )
        }

        const url = await saveUploadedFile(file)
        return NextResponse.json({ success: true, url })
    } catch (err) {
        console.error("Upload error:", err)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}