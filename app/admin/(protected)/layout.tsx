import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"
import AdminSidebar from "@/components/admin/Sidebar"
import AdminHeader from "@/components/admin/Header"
import AdminShell from "@/components/admin/AdminShell"

// Inner component that performs the dynamic cookies() access
async function AdminLayoutInner({ children }: { children: React.ReactNode }) {
    const user = await getAuthUser()

    if (!user) redirect("/admin/login")

    return (
        <AdminShell>
            <div className="flex h-screen bg-slate-100 overflow-hidden">
                {/* Sidebar */}
                <AdminSidebar role={user.role} />

                {/* Main content */}
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <AdminHeader user={user} />
                    <main className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
                        {children}
                    </main>
                </div>
            </div>
        </AdminShell>
    )
}

// Outer layout wraps the inner component in Suspense so cookies() doesn't
// block the initial render (required by Next.js dynamic API rules).
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
            </div>
        }>
            <AdminLayoutInner>{children}</AdminLayoutInner>
        </Suspense>
    )
}