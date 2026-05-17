import { Metadata } from "next"
import Link from "next/link"
import { FileEdit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import PagesList from "@/components/admin/PagesList"

export const metadata: Metadata = { title: "Page CMS" }

export default function CmsPage() {
    return (
        <div className="space-y-5 pt-3 sm:pt-5 lg:pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                        <FileEdit className="w-6 h-6 text-emerald-600" />
                        Page CMS
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Create and edit all public pages — no code required
                    </p>
                </div>
                <Link href="/admin/cms/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                        <Plus className="w-4 h-4" />
                        New Page
                    </Button>
                </Link>
            </div>

            <PagesList />
        </div>
    )
}