"use client"

import { MessageCircle } from "lucide-react"
import Link from "next/link"

export default function WhatsAppButton() {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const message = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const href = `https://wa.me/${number}?text=${message}`

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-all"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-6 h-6" />
        </a>
    )
}