import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"
import LoginForm from "@/components/admin/LoginForm"
import { Shield, ShieldCheck, Lock, BarChart3, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
    title: "Admin Login — Insurance Platform",
    description: "Sign in to the Insurance Platform admin panel",
}

export default async function LoginPage() {
    const user = await getAuthUser()
    if (user) redirect("/admin/dashboard")
    return (
        <div className="min-h-screen flex">
            {/* ── Left panel — branding + features ── */}
            <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    {/* Dot grid */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                            backgroundSize: "32px 32px",
                        }}
                    />
                    {/* Gradient orbs */}
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-emerald-400/5 rounded-full blur-2xl" />
                </div>

                <div className="relative z-10 flex flex-col justify-between w-full px-12 xl:px-16 py-10">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white text-lg font-semibold tracking-tight">Insurance Platform</span>
                    </div>

                    {/* Hero text + feature list */}
                    <div className="space-y-10">
                        <div>
                            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                                <span style={{ color: '#ffffff' }}>Manage your</span>
                                <br />
                                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    insurance platform
                                </span>
                            </h1>
                            <p className="text-slate-400 text-lg mt-4 max-w-md leading-relaxed">
                                A centralised admin panel for managing inquiries, CMS content, users, and scheduling — all in one place.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: BarChart3, label: "Live Dashboard", desc: "Real-time analytics" },
                                { icon: FileText, label: "Page CMS", desc: "Visual page builder" },
                                { icon: Users, label: "User Management", desc: "Roles & permissions" },
                                { icon: ShieldCheck, label: "Secure Access", desc: "JWT authentication" },
                            ].map((f) => (
                                <div key={f.label} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm">
                                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <f.icon className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium">{f.label}</p>
                                        <p className="text-slate-500 text-xs">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-slate-600 text-xs">
                        © {new Date().getFullYear()} Insurance Platform. All rights reserved.
                    </p>
                </div>
            </div>

            {/* ── Right panel — login form ── */}
            <div className="w-full lg:w-[45%] flex flex-col">
                {/* Mobile header */}
                <div className="lg:hidden flex items-center gap-3 px-6 py-5 border-b border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
                        <Shield className="w-4.5 h-4.5 text-white" />
                    </div>
                    <span className="text-slate-900 font-semibold">Insurance Platform</span>
                </div>

                <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-12">
                    <div className="w-full max-w-sm">
                        {/* Icon + Heading */}
                        <div className="mb-8">
                            <div className="hidden lg:flex w-12 h-12 rounded-xl bg-emerald-50 items-center justify-center mb-5">
                                <Lock className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
                            <p className="text-slate-500 text-sm mt-1.5">
                                Sign in to your admin account to continue
                            </p>
                        </div>

                        {/* Form */}
                        <LoginForm />

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-px bg-slate-200" />
                            <span className="text-xs text-slate-400 font-medium">SECURE LOGIN</span>
                            <div className="flex-1 h-px bg-slate-200" />
                        </div>

                        {/* Trust signals */}
                        <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>256-bit encrypted</span>
                            </div>
                            <span className="text-slate-300">·</span>
                            <div className="flex items-center gap-1.5">
                                <Lock className="w-3.5 h-3.5" />
                                <span>Secure session</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile footer */}
                <div className="lg:hidden text-center pb-6">
                    <p className="text-slate-400 text-xs">Protected area — authorised personnel only</p>
                </div>
            </div>
        </div>
    )
}