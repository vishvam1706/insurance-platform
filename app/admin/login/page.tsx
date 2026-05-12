
import { Metadata } from "next"
import LoginForm from "@/components/admin/LoginForm"
import { Shield } from "lucide-react"
export const metadata: Metadata = {
    title: "Admin Login",
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`
                }}
            />

            <div className="relative w-full max-w-md">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 mb-4 shadow-lg shadow-blue-500/30">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-semibold text-white">Insurance Platform</h1>
                    <p className="text-slate-400 text-sm mt-1">Admin Panel</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 p-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-900">Sign in</h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Enter your credentials to access the admin panel
                        </p>
                    </div>
                    <LoginForm />
                </div>

                <p className="text-center text-slate-500 text-xs mt-6">
                    Protected area — authorised personnel only
                </p>
            </div>
        </div>
    )
}