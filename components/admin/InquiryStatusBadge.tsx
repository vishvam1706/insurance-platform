import { InquiryStatus } from "@/types/inquiry"
import { cn } from "@/lib/utils"
import { CheckCircle2, Phone, AlertCircle, PhoneOff } from "lucide-react"

const CONFIG: Record<InquiryStatus, { label: string; icon: React.ReactNode; dot: string; bg: string; text: string; border: string }> = {
    new:          { label: "New",           icon: <AlertCircle className="w-3 h-3" />,  dot: "bg-blue-500",    bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200" },
    contacted:    { label: "Contacted",     icon: <Phone className="w-3 h-3" />,         dot: "bg-amber-500",   bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200" },
    resolved:     { label: "Resolved",      icon: <CheckCircle2 className="w-3 h-3" />,  dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    not_reachable:{ label: "Not Reachable", icon: <PhoneOff className="w-3 h-3" />,      dot: "bg-red-500",     bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200" },
}

export default function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
    const cfg = CONFIG[status] ?? CONFIG.new
    return (
        <span className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border",
            cfg.bg, cfg.text, cfg.border
        )}>
            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", cfg.dot)} />
            {cfg.label}
        </span>
    )
}