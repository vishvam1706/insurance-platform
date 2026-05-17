"use client"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { usePathname } from "next/navigation"

interface AdminShellContextType {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
    toggleSidebar: () => void
}

const AdminShellContext = createContext<AdminShellContextType>({
    sidebarOpen: false,
    setSidebarOpen: () => { },
    toggleSidebar: () => { },
})

export function useAdminShell() {
    return useContext(AdminShellContext)
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()
    const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), [])

    useEffect(() => {
        // Add Tailwind overflow-hidden directly to <html>
        document.documentElement.classList.add("overflow-hidden")
        return () => document.documentElement.classList.remove("overflow-hidden")
    }, [])

    useEffect(() => {
        setSidebarOpen(false)
    }, [pathname])

    return (
        <AdminShellContext.Provider value={{ sidebarOpen, setSidebarOpen, toggleSidebar }}>
            {children}
        </AdminShellContext.Provider>
    )
}