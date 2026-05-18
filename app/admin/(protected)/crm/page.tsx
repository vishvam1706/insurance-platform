import { Metadata } from "next"
import { Users2 } from "lucide-react"

export const metadata: Metadata = { title: "CRM" }

export default function CrmPage() {
    return (
        <div className="space-y-5 pt-3 sm:pt-5 lg:pt-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                    <Users2 className="w-6 h-6 text-emerald-600" />
                    CRM
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Customer relationship management — coming soon.
                </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <Users2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm font-medium">CRM module coming soon</p>
                <p className="text-slate-400 text-xs mt-1">Manage contacts, pipelines, and follow-ups here.</p>
            </div>
        </div>
    )
}
