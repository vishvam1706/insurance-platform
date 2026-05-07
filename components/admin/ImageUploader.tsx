"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { useImageUpload } from "@/hooks/useImageUpload"
import { cn } from "@/lib/utils"
import { Upload, X, Loader2, Link as LinkIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface ImageUploaderProps {
    value: string
    onChange: (url: string) => void
    label?: string
    compact?: boolean
}

export default function ImageUploader({
    value, onChange, label = "Image", compact = false,
}: ImageUploaderProps) {
    const { uploadFile, uploading } = useImageUpload()

    const onDrop = useCallback(
        async (files: File[]) => {
            if (!files[0]) return
            const url = await uploadFile(files[0])
            if (url) onChange(url)
        },
        [uploadFile, onChange]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"] },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024,
    })

    return (
        <div className="space-y-2">
            {label && (
                <p className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <LinkIcon className="w-3 h-3" /> {label}
                </p>
            )}

            {/* URL input */}
            <Input
                placeholder="Paste image URL or upload below..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="text-xs h-8"
            />

            {/* Dropzone */}
            {!compact && (
                <div
                    {...getRootProps()}
                    className={cn(
                        "border-2 border-dashed rounded-lg transition-all cursor-pointer",
                        compact ? "p-2" : "p-4",
                        isDragActive
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                    )}
                >
                    <input {...getInputProps()} />
                    {uploading ? (
                        <div className="flex items-center justify-center gap-2 text-blue-600">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-xs">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2 text-slate-400">
                            <Upload className="w-4 h-4" />
                            <span className="text-xs">
                                {isDragActive ? "Drop here" : "Click or drag to upload"}
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Preview */}
            {value && (
                <div className="relative group">
                    <div className="relative h-24 w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                        <Image
                            src={value}
                            alt="Preview"
                            fill
                            className="object-contain"
                            onError={() => { }}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            )}
        </div>
    )
}