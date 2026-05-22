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
        } catch (error: unknown) {
            let errMsg = "Image upload failed"
            if (axios.isAxiosError(error)) {
                errMsg = error.response?.data?.error || errMsg
            } else if (error instanceof Error) {
                errMsg = error.message
            }
            toast.error(errMsg)
            return null
        } finally {
            setUploading(false)
        }
    }

    return { uploadFile, uploading }
}