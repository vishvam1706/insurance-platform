"use client"

import { Shield } from "lucide-react"

export default function ContactSidebar() {
    return (
        <div
            className="hidden lg:block"
            style={{ position: "sticky", top: "6rem", height: "calc(100vh - 7rem)", maxHeight: 780 }}
        >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-orange-100">
                {/* Full bleed photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/uploads/contact_sidebar_photo.png"
                    alt="Happy family planning their insurance"
                    className="w-full h-full object-cover"
                />

                {/* Gradient overlay — dark at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent pointer-events-none" />

                {/* Top badge */}
                <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1.5 rounded-full border border-white/60 shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Available Now
                    </span>
                </div>

                {/* Bottom badge */}
                <div className="absolute bottom-6 left-5 right-5">
                    <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-white/50">
                        <Shield className="w-4 h-4 text-orange-500 shrink-0" />
                        <div>
                            <p className="text-xs font-black text-slate-900 leading-none">Here to help — not sell</p>
                            <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Free consultation · No spam · Ever</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
