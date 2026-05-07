import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function saveUploadedFile(file: File): Promise<string> {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })

    const timestamp = Date.now()
    const ext = file.name.split(".").pop()
    const filename = `${timestamp}-${Math.random().toString(36).slice(2)}.${ext}`
    const filepath = path.join(uploadDir, filename)

    await writeFile(filepath, buffer)
    return `/uploads/${filename}`
}

export const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
]

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB