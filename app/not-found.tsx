import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-6xl font-bold text-slate-900 mb-2">404</h1>
                <p className="text-xl font-semibold text-slate-700 mb-3">Page not found</p>
                <p className="text-slate-500 text-sm mb-8">
                    The page you're looking for doesn't exist or may have been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>
        </div>
    )
}