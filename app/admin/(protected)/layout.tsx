import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"
import AdminSidebar from "@/components/admin/Sidebar"
import AdminHeader from "@/components/admin/Header"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getAuthUser()

    if (!user) redirect("/admin/login")

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <AdminSidebar role={user.role} />

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AdminHeader user={user} />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}