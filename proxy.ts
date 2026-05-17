import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

const ADMIN_PATHS = [
    "/admin/dashboard",
    "/admin/inquiries",
    "/admin/schedule",
    "/admin/users",
    "/admin/cms",
    "/admin/profile",
]

const SUPER_ADMIN_PATHS = ["/admin/users"]

const EMPLOYEE_PATHS = ["/admin/dashboard", "/admin/inquiries", "/admin/schedule", "/admin/profile"]

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Allow login page always
    if (pathname === "/admin/login" || pathname === "/admin/users/signup") {
        return NextResponse.next()
    }

    // Protect admin paths
    const isAdminPath = ADMIN_PATHS.some((p) => pathname.startsWith(p))
    if (!isAdminPath) return NextResponse.next()

    const token = request.cookies.get("auth_token")?.value

    if (!token) {
        return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    const user = verifyToken(token)
    if (!user) {
        const response = NextResponse.redirect(new URL("/admin/login", request.url))
        response.cookies.delete("auth_token")
        return response
    }

    // Role-based path protection
    const isSuperAdminPath = SUPER_ADMIN_PATHS.some((p) => pathname.startsWith(p))
    if (isSuperAdminPath && user.role === "employee") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }

    // Employees can only access limited paths
    if (user.role === "employee") {
        const allowed = EMPLOYEE_PATHS.some((p) => pathname.startsWith(p))
        if (!allowed) {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*"],
}