import { Badge } from "@/components/ui/badge"
import { InquiryStatus } from "@/types/inquiry"
import { cn } from "@/lib/utils"

const CONFIG: Record<InquiryStatus, { label: string; className: string }> = {
    new: { label: "New", className: "bg-emerald-100 text-emerald-700 border-blue-200" },
    contacted: { label: "Contacted", className: "bg-amber-100 text-amber-700 border-amber-200" },
    resolved: { label: "Resolved", className: "bg-green-100 text-green-700 border-green-200" },
    not_reachable: { label: "Not Reachable", className: "bg-red-100 text-red-700 border-red-200" },
}

export default function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
    const cfg = CONFIG[status] ?? CONFIG.new
    return (
        <Badge variant="outline" className={cn("text-xs font-medium", cfg.className)}>
            {cfg.label}
        </Badge>
    )
}