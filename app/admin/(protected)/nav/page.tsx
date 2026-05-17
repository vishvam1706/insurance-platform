import { Metadata } from "next"
import { FolderTree } from "lucide-react"
import NavTreeManager from "@/components/admin/NavTreeManager"

export const metadata: Metadata = { title: "Navigation Manager" }

export default function NavTreePage() {
    return (
        <div className="space-y-5 pt-3 sm:pt-5 lg:pt-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                    <FolderTree className="w-6 h-6 text-emerald-600" />
                    Navigation Manager
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Organize your site navigation — drag to reorder, nest categories, and auto-sync CMS pages
                </p>
            </div>

            <NavTreeManager />
        </div>
    )
}
