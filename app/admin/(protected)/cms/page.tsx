import { Metadata } from "next"
import Link from "next/link"
import { FileEdit, Plus, Home, Video } from "lucide-react"
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
                <div className="flex items-center gap-2">
                    <Link href="/admin/cms/video-section">
                        <Button variant="outline" className="gap-2 border-slate-300 hover:border-orange-500 hover:text-orange-600">
                            <Video className="w-4 h-4" />
                            Video Section
                        </Button>
                    </Link>
                    <Link href="/admin/cms/home">
                        <Button variant="outline" className="gap-2 border-slate-300 hover:border-emerald-600 hover:text-emerald-700">
                            <Home className="w-4 h-4" />
                            Edit Homepage
                        </Button>
                    </Link>
                    <Link href="/admin/cms/new">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                            <Plus className="w-4 h-4" />
                            New Page
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Video Section Help Tip */}
            <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-4 text-left flex items-start gap-3">
                <Video className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-xs font-bold text-slate-800">Looking to edit the Homepage Video Section?</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        The Health &amp; Term video grid section is managed separately. Click the <strong className="text-orange-600">Video Section</strong> button in the top action bar to change videos, titles, badges, and cover thumbnails.
                    </p>
                </div>
            </div>

            <PagesList />
        </div>
    )
}