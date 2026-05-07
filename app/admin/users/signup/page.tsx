import { Metadata } from "next"
import EmployeeSignupForm from "@/components/admin/EmployeeSignupForm"
import { Shield } from "lucide-react"

export const metadata: Metadata = { title: "Employee Signup" }

export default function EmployeeSignupPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative w-full max-w-md">
                {/* Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-4 shadow-lg shadow-blue-500/30">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-semibold text-white">Join as Employee</h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Request access to the Insurance Platform
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 p-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-900">Create your account</h2>
                        <p className="text-slate-500 text-sm mt-1">
                            After signing up, an admin will review and approve your account.
                        </p>
                    </div>
                    <EmployeeSignupForm />
                </div>

                <p className="text-center mt-4">
                    <a href="/admin/login" className="text-slate-400 hover:text-white text-sm transition-colors">
                        Already have an account? Sign in
                    </a>
                </p>
            </div>
        </div>
    )
}