"use client"

const year = new Date().getFullYear() // ✅ evaluated at module load, not render

export default function CopyrightYear() {
    return <>{year}</>
}