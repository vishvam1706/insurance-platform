"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { IInquiry } from "@/types/inquiry"
import { useDebounce } from "./useDebounce"

interface Filters {
    status: string
    type: string
    state: string
    search: string
    dateFrom: string
    dateTo: string
}

interface Pagination {
    page: number
    limit: number
    total: number
    pages: number
}

export function useInquiries() {
    const [inquiries, setInquiries] = useState<IInquiry[]>([])
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 })
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState<Filters>({
        status: "", type: "", state: "", search: "", dateFrom: "", dateTo: "",
    })

    const debouncedSearch = useDebounce(filters.search, 400)

    const fetch = useCallback(
        async (page = 1) => {
            setLoading(true)
            try {
                const params: Record<string, string> = { page: String(page), limit: "20" }
                if (filters.status) params.status = filters.status
                if (filters.type) params.type = filters.type
                if (filters.state) params.state = filters.state
                if (debouncedSearch) params.search = debouncedSearch
                if (filters.dateFrom) params.dateFrom = filters.dateFrom
                if (filters.dateTo) params.dateTo = filters.dateTo

                const res = await axios.get("/api/inquiries", { params })
                setInquiries(res.data.inquiries)
                setPagination(res.data.pagination)
            } catch {
                // handled by toast in component
            } finally {
                setLoading(false)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filters.status, filters.type, filters.state, debouncedSearch, filters.dateFrom, filters.dateTo]
    )

    useEffect(() => { fetch(1) }, [fetch])

    function updateFilter(key: keyof Filters, value: string) {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    function resetFilters() {
        setFilters({ status: "", type: "", state: "", search: "", dateFrom: "", dateTo: "" })
    }

    return { inquiries, pagination, loading, filters, updateFilter, resetFilters, refetch: fetch }
}