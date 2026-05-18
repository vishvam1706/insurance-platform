import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary from env vars
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function saveUploadedFile(file: File): Promise<string> {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary as a data URI
    const base64 = buffer.toString("base64")
    const mime = file.type || "image/png"
    const dataUri = `data:${mime};base64,${base64}`

    const result = await cloudinary.uploader.upload(dataUri, {
        folder: "insurance-platform",
        resource_type: "image",
    })

    return result.secure_url
}

export const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
]

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB