"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"

export function useImageUpload() {
    const [uploading, setUploading] = useState(false)

    async function uploadFile(file: File): Promise<string | null> {
        setUploading(true)
        try {
            const form = new FormData()
            form.append("file", file)
            const res = await axios.post("/api/cms/upload", form)
            return res.data.url as string
        } catch {
            toast.error("Image upload failed")
            return null
        } finally {
            setUploading(false)
        }
    }

    return { uploadFile, uploading }
}