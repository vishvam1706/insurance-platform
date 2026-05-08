"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const message = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const href = `https://wa.me/${number}?text=${message}`

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 text-white text-sm font-semibold pl-4 pr-5 py-3 rounded-full transition-all duration-200 group hover:scale-105 active:scale-95"
            style={{
                background: "#25D366",
                boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
                fontFamily: "var(--font-body)",
            }}
        >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span className="hidden sm:inline transition-all">Chat with us</span>
        </a>
    )
}