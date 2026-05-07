"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { SafeUser } from "@/types/user"

interface AuthState {
    user: SafeUser | null
    loading: boolean
}

export function useAuth(): AuthState {
    const [user, setUser] = useState<SafeUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get("/api/auth/me")
            .then((res) => setUser(res.data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

    return { user, loading }
}