import { CtaBlockData } from "@/types/blocks"
import Link from "next/link"
import { Phone, MessageCircle } from "lucide-react"

export default function CtaBlock({ data }: { data: CtaBlockData }) {
    const waNumber = data.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
    const waMessage = encodeURIComponent("Hi! I'd like to learn more about insurance options.")
    const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`

    return (
        <div className="my-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white">
            {data.title && (
                <p className="text-lg font-semibold mb-6 max-w-lg">{data.title}</p>
            )}
            <div className="flex flex-wrap gap-3">
                <Link
                    href="/book-call"
                    className="flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
                >
                    <Phone className="w-4 h-4" />
                    {data.bookCallText || "Book a Free Call"}
                </Link>
                <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
                >
                    <MessageCircle className="w-4 h-4" />
                    {data.whatsappText || "Chat on WhatsApp"}
                </a>
            </div>
        </div >
    )
}