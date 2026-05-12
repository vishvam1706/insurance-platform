"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useImageUpload } from "@/hooks/useImageUpload"
import { cn } from "@/lib/utils"
import { Upload, X, Loader2, Link as LinkIcon, ImageOff, CheckCircle2 } from "lucide-react"
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
    const [imgError, setImgError] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)

    const onDrop = useCallback(
        async (files: File[]) => {
            if (!files[0]) return
            setImgError(false)
            setUploadSuccess(false)
            const url = await uploadFile(files[0])
            if (url) {
                onChange(url)
                setUploadSuccess(true)
                setTimeout(() => setUploadSuccess(false), 2000)
            }
        },
        [uploadFile, onChange]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"] },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024,
        disabled: uploading,
    })

    // Determine if the src is a local upload path
    const isLocalUpload = value.startsWith("/uploads/")

    return (
        <div className="space-y-2">
            {label && (
                <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                    <LinkIcon className="w-3 h-3" /> {label}
                </p>
            )}

            {/* URL input */}
            <Input
                placeholder="Paste image URL or upload below..."
                value={value}
                onChange={(e) => { onChange(e.target.value); setImgError(false) }}
                className="text-xs h-8 font-mono"
            />

            {/* Dropzone */}
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-xl transition-all cursor-pointer select-none",
                    compact ? "p-2" : "p-4",
                    isDragActive
                        ? "border-emerald-500 bg-emerald-50"
                        : uploading
                        ? "border-slate-200 bg-slate-50 cursor-not-allowed"
                        : uploadSuccess
                        ? "border-emerald-400 bg-emerald-50"
                        : "border-slate-200 hover:border-emerald-400 hover:bg-slate-50"
                )}
            >
                <input {...getInputProps()} />
                {uploading ? (
                    <div className="flex items-center justify-center gap-2" style={{ color: "var(--brand)" }}>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-xs font-medium">Uploading...</span>
                    </div>
                ) : uploadSuccess ? (
                    <div className="flex items-center justify-center gap-2 text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs font-medium">Uploaded!</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                        <Upload className="w-4 h-4" />
                        <span className="text-xs">
                            {isDragActive ? "Drop here" : "Click or drag image to upload"}
                        </span>
                    </div>
                )}
            </div>

            {/* Preview */}
            {value && (
                <div className="relative group">
                    <div className="relative h-28 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                        {imgError ? (
                            <div className="flex flex-col items-center gap-1.5 text-slate-400">
                                <ImageOff className="w-6 h-6" />
                                <span className="text-xs">Could not load image</span>
                                <span className="text-[10px] font-mono text-slate-300 max-w-full overflow-hidden text-ellipsis px-2">{value}</span>
                            </div>
                        ) : (
                            <Image
                                src={value}
                                alt="Preview"
                                fill
                                className="object-contain"
                                unoptimized={isLocalUpload}
                                onError={() => setImgError(true)}
                            />
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => { onChange(""); setImgError(false) }}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                    >
                        <X className="w-3 h-3" />
                    </button>
                    {!imgError && isLocalUpload && (
                        <div className="absolute bottom-1.5 left-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-md" style={{ background: "var(--brand)", color: "#fff" }}>
                            local
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
