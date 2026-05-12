import { Metadata } from "next"
import InquiryForm from "@/components/public/InquiryForm"
import { Phone, MessageCircle, Mail, Clock } from "lucide-react"

export const metadata: Metadata = {
    title: "Contact Us — Book a Free Call",
    description: "Book a free consultation with our insurance advisors.",
}

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
                {/* Left */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">
                        Book a Free Consultation
                    </h1>
                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        Talk to one of our IRDAI-certified advisors. No spam, no pressure —
                        just honest, expert advice to help you choose the right insurance.
                    </p>

                    <div className="space-y-5">
                        {[
                            { icon: <Phone className="w-5 h-5" />, title: "Free Phone Consultation", desc: "30 minutes with a certified advisor" },
                            { icon: <MessageCircle className="w-5 h-5" />, title: "WhatsApp Support", desc: "Chat anytime, we respond quickly" },
                            { icon: <Mail className="w-5 h-5" />, title: "Email Support", desc: "Detailed answers to all your questions" },
                            { icon: <Clock className="w-5 h-5" />, title: "Flexible Timing", desc: "Mon–Sat, 9 AM – 6 PM IST" },
                        ].map((item) => (
                            <div key={item.title} className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                                    <p className="text-slate-500 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — Form */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                    <h2 className="font-semibold text-slate-900 text-lg mb-1">
                        Get in touch
                    </h2>
                    <p className="text-slate-400 text-sm mb-6">
                        Fill in your details and we'll call you back.
                    </p>
                    <InquiryForm />
                </div>
            </div>
        </div>
    )
}