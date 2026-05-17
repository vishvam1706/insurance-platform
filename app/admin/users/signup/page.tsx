import { Metadata } from "next"
import EmployeeSignupForm from "@/components/admin/EmployeeSignupForm"
import { Shield, UserPlus, Clock, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Employee Signup — Insurance Platform",
    description: "Request access to the Insurance Platform admin panel",
}

export default function EmployeeSignupPage() {
    return (
        <div className="min-h-screen flex">
            {/* ── Left panel — branding + how it works ── */}
            <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
                {/* Background effects */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                            backgroundSize: "32px 32px",
                        }}
                    />
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-12 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex flex-col justify-between w-full px-12 xl:px-16 py-10">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white text-lg font-semibold tracking-tight">Insurance Platform</span>
                    </div>

                    {/* Content */}
                    <div className="space-y-10">
                        <div>
                            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                                <span style={{ color: '#ffffff' }}>Join the</span>
                                <br />
                                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    operations team
                                </span>
                            </h1>
                            <p className="text-slate-400 text-lg mt-4 max-w-md leading-relaxed">
                                Get access to inquiries from your assigned state and help convert leads into customers.
                            </p>
                        </div>

                        {/* How it works — steps */}
                        <div className="space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">How it works</p>
                            {[
                                { step: "1", title: "Fill the form", desc: "Enter your details and select your assigned state", icon: UserPlus },
                                { step: "2", title: "Wait for approval", desc: "An admin will review and approve your request", icon: Clock },
                                { step: "3", title: "Start working", desc: "Once approved, log in and access your inquiries", icon: CheckCircle2 },
                            ].map((s, i) => (
                                <div key={s.step} className="flex items-start gap-4 group">
                                    {/* Step line */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-9 h-9 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                            <span className="text-emerald-400 text-sm font-bold">{s.step}</span>
                                        </div>
                                        {i < 2 && <div className="w-px h-8 bg-emerald-500/10" />}
                                    </div>
                                    <div className="pt-1.5 pb-4">
                                        <p className="text-white text-sm font-medium">{s.title}</p>
                                        <p className="text-slate-500 text-xs mt-0.5">{s.desc}</p>
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

            {/* ── Right panel — signup form ── */}
            <div className="w-full lg:w-[45%] flex flex-col">
                {/* Mobile header */}
                <div className="lg:hidden flex items-center gap-3 px-6 py-5 border-b border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
                        <Shield className="w-4.5 h-4.5 text-white" />
                    </div>
                    <span className="text-slate-900 font-semibold">Insurance Platform</span>
                </div>

                <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-10">
                    <div className="w-full max-w-sm">
                        {/* Heading */}
                        <div className="mb-7">
                            <div className="hidden lg:flex w-12 h-12 rounded-xl bg-emerald-50 items-center justify-center mb-5">
                                <UserPlus className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Request access</h2>
                            <p className="text-slate-500 text-sm mt-1.5">
                                Create an employee account — an admin will review and approve your request.
                            </p>
                        </div>

                        {/* Form */}
                        <EmployeeSignupForm />

                        {/* Back to login */}
                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <Link
                                href="/admin/login"
                                className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors group"
                            >
                                Already have an account?
                                <span className="font-semibold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1">
                                    Sign in <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}