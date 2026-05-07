"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { IPageContent } from "@/types/page"

export function usePageContent(pageKey: string) {
    const [page, setPage] = useState<IPageContent | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!pageKey) return
        const slug = pageKey.replace(/\//g, "__")
        setLoading(true)

        axios
            .get(`/api/cms/pages/${slug}`)
            .then((res) => setPage(res.data.page))
            .catch(() => setError("Failed to load page"))
            .finally(() => setLoading(false))
    }, [pageKey])

    return { page, loading, error, setPage }
}