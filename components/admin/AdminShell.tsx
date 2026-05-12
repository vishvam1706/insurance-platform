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
    setSidebarOpen: () => {},
    toggleSidebar: () => {},
})

export function useAdminShell() {
    return useContext(AdminShellContext)
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()

    const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), [])

    // Auto-close sidebar on route change (mobile)
    useEffect(() => {
        setSidebarOpen(false)
    }, [pathname])

    // Lock body scroll when sidebar is open on mobile
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [sidebarOpen])

    return (
        <AdminShellContext.Provider value={{ sidebarOpen, setSidebarOpen, toggleSidebar }}>
            <div className="admin-shell">
                {children}
            </div>
        </AdminShellContext.Provider>
    )
}
