"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { 
    Bell, 
    Check, 
    CheckCheck, 
    Clock, 
    Shield, 
    Heart, 
    ExternalLink, 
    Sparkles 
} from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { IInquiry } from "@/types/inquiry"
import { JWTPayload } from "@/types/user"

interface NotificationsDropdownProps {
    user: JWTPayload
}

function formatTimeAgo(dateInput: string | Date) {
    const date = new Date(dateInput)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return "just now"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
}

export default function NotificationsDropdown({ user }: NotificationsDropdownProps) {
    const router = useRouter()
    const [notifications, setNotifications] = useState<IInquiry[]>([])
    const [readIds, setReadIds] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const esRef = useRef<EventSource | null>(null)

    // Fetch initial notifications
    const fetchNotifications = useCallback(async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api/inquiries", { params: { limit: 10 } })
            setNotifications(res.data.inquiries || [])
        } catch (err) {
            console.error("Failed to fetch notifications:", err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchNotifications()
    }, [fetchNotifications])

    // Load read notifications from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("readInquiryIds")
        if (stored) {
            try {
                setReadIds(JSON.parse(stored))
            } catch {
                // ignore
            }
        }
    }, [])

    // SSE connection
    useEffect(() => {
        const es = new EventSource("/api/inquiries/stream")
        esRef.current = es

        es.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data)
                if (data.type === "new_inquiry") {
                    const inquiry = data.inquiry as IInquiry
                    
                    // Filter based on employee state if restricted
                    if (user.role === "employee" && user.state && inquiry.state !== user.state) {
                        return
                    }

                    // Prepend new notification
                    setNotifications((prev) => {
                        const exists = prev.some((n) => n._id === inquiry._id)
                        if (exists) return prev
                        return [inquiry, ...prev.slice(0, 9)]
                    })

                    // Show toast notification if they are not already on the inquiries page
                    const isAlreadyOnInquiriesPage = typeof window !== "undefined" && window.location.pathname === "/admin/inquiries"
                    if (!isAlreadyOnInquiriesPage) {
                        toast.success(`🔔 New inquiry from ${inquiry.name}`, {
                            description: `${inquiry.insuranceType === "health" ? "Health" : "Term"} Insurance · ${inquiry.state}`,
                            action: {
                                label: "View",
                                onClick: () => {
                                    // Mark as read locally and navigate
                                    setReadIds((prev) => {
                                        if (prev.includes(inquiry._id)) return prev
                                        const next = [...prev, inquiry._id]
                                        localStorage.setItem("readInquiryIds", JSON.stringify(next))
                                        return next
                                    })
                                    router.push(`/admin/inquiries/${inquiry._id}`)
                                },
                            },
                            duration: 5000,
                        })
                    }
                }
            } catch {
                // ignore
            }
        }

        es.onerror = () => {
            es.close()
            esRef.current = null
        }

        return () => {
            es.close()
            esRef.current = null
        }
    }, [user.role, user.state, router])

    // Get only the unread notifications
    const unreadNotifications = notifications.filter(
        (n) => n.status === "new" && !readIds.includes(n._id)
    )
    const unreadCount = unreadNotifications.length

    const handleMarkAsRead = useCallback((id: string, e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation()
            e.preventDefault()
        }
        setReadIds((prev) => {
            if (prev.includes(id)) return prev
            const next = [...prev, id]
            localStorage.setItem("readInquiryIds", JSON.stringify(next))
            return next
        })
    }, [])

    const handleMarkAllAsRead = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        const idsToMark = notifications.map((n) => n._id)
        setReadIds((prev) => {
            const next = Array.from(new Set([...prev, ...idsToMark]))
            localStorage.setItem("readInquiryIds", JSON.stringify(next))
            return next
        })
        toast.success("All notifications marked as read")
    }, [notifications])

    const handleNotificationClick = useCallback((id: string) => {
        handleMarkAsRead(id)
        setIsOpen(false)
        router.push(`/admin/inquiries/${id}`)
    }, [handleMarkAsRead, router])

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button 
                    className={cn(
                        "relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-all text-slate-500 active:scale-95",
                        unreadCount > 0 && "text-slate-700 bg-slate-50"
                    )}
                    aria-label="View notifications"
                >
                    <Bell className={cn("w-4 h-4", unreadCount > 0 && "animate-[swing_1s_ease-in-out_infinite]")} />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in">
                            {unreadCount}
                        </span>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent 
                align="end" 
                sideOffset={8}
                className="w-[320px] sm:w-[380px] p-0 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50"
            >
                {/* Header */}
                <div className="bg-slate-50/80 border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 text-sm">Notifications</span>
                        {unreadCount > 0 && (
                            <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                {unreadCount} new
                            </span>
                        )}
                    </div>
                    {unreadCount > 0 && (
                        <button 
                            onClick={handleMarkAllAsRead}
                            className="text-xs font-medium text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors group"
                        >
                            <CheckCheck className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                            Mark all read
                        </button>
                    )}
                </div>

                {/* List Container */}
                <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100">
                    {loading ? (
                        <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                            <div className="w-6 h-6 border-2 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
                            <p className="text-xs">Loading notifications...</p>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                <Bell className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-700 text-xs">No inquiries yet</p>
                                <p className="text-[11px] text-slate-400 mt-0.5">Submitted leads will appear here.</p>
                            </div>
                        </div>
                    ) : (
                        notifications.map((inquiry) => {
                            const isUnread = inquiry.status === "new" && !readIds.includes(inquiry._id)
                            const isHealth = inquiry.insuranceType === "health"

                            return (
                                <div 
                                    key={inquiry._id}
                                    onClick={() => handleNotificationClick(inquiry._id)}
                                    className={cn(
                                        "p-3.5 flex gap-3 text-left relative cursor-pointer group transition-all hover:bg-slate-50",
                                        isUnread && "bg-emerald-50/30 hover:bg-emerald-50/50"
                                    )}
                                >
                                    {/* Icon */}
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-sm border",
                                        isHealth 
                                            ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                                            : "bg-blue-50 border-blue-100 text-blue-600"
                                    )}>
                                        {isHealth ? <Shield className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                                    </div>

                                    {/* Text Info */}
                                    <div className="flex-1 min-w-0 pr-4">
                                        <div className="flex items-center gap-1.5 justify-between">
                                            <p className="font-semibold text-slate-800 text-xs sm:text-sm leading-snug truncate">
                                                {isHealth ? "Health Insurance" : "Term Insurance"}
                                            </p>
                                            {isUnread && (
                                                <span className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-bold">
                                                    <Sparkles className="w-2 h-2 text-amber-500 animate-pulse" />
                                                    New
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-slate-600 text-xs mt-1 font-medium leading-none truncate">
                                            {inquiry.name}
                                        </p>
                                        <p className="text-slate-400 text-[11px] mt-1 truncate">
                                            {inquiry.state} · {inquiry.phone}
                                        </p>
                                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1.5 font-medium">
                                            <Clock className="w-3 h-3 text-slate-300" />
                                            {formatTimeAgo(inquiry.createdAt)}
                                        </div>
                                    </div>

                                    {/* Actions / Status Indicators */}
                                    <div className="absolute right-3.5 top-3.5 flex items-center">
                                        {isUnread ? (
                                            <>
                                                {/* Mark as read tick button on hover */}
                                                <button
                                                    onClick={(e) => handleMarkAsRead(inquiry._id, e)}
                                                    className="w-5 h-5 rounded bg-slate-100 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-slate-500 opacity-0 group-hover:opacity-100 transition-all shadow-xs"
                                                    title="Mark as read"
                                                >
                                                    <Check className="w-3.5 h-3.5" />
                                                </button>
                                                {/* Pulsing red/orange dot when not hovered */}
                                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 group-hover:opacity-0 transition-opacity absolute right-1.5 top-1.5" />
                                            </>
                                        ) : (
                                            <ExternalLink className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="bg-slate-50 border-t border-slate-100 px-4 py-2.5 text-center">
                    <button 
                        onClick={() => {
                            setIsOpen(false)
                            router.push("/admin/inquiries")
                        }}
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline inline-flex items-center gap-1 transition-all"
                    >
                        View all inquiries
                        <ExternalLink className="w-3 h-3" />
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
