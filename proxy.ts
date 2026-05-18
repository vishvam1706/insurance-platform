import { NextRequest, NextResponse } from "next/server"

// All protected admin paths
const ADMIN_PATHS = [
    "/admin/dashboard",
    "/admin/inquiries",
    "/admin/schedule",
    "/admin/users",
    "/admin/cms",
    "/admin/nav",
    "/admin/profile",
    "/admin/crm",
]

// Paths employees cannot access
const RESTRICTED_FROM_EMPLOYEE = ["/admin/users", "/admin/cms", "/admin/nav", "/admin/crm"]

/**
 * Lightweight JWT decode — reads the payload without verifying the signature.
 * Signature verification happens server-side in getAuthUser(). In the proxy
 * we just need the role to enforce redirects. Tampered tokens will still be
 * rejected by the actual API/page handlers.
 */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
    try {
        const parts = token.split(".")
        if (parts.length !== 3) return null
        // Base64url → Base64 → JSON
        const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/")
        const json = atob(base64)
        const payload = JSON.parse(json)
        // Check expiry
        if (payload.exp && payload.exp * 1000 < Date.now()) return null
        return payload
    } catch {
        return null
    }
}

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Redirect bare /admin → /admin/dashboard
    if (pathname === "/admin" || pathname === "/admin/") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }

    // Public admin paths — always allow
    if (
        pathname === "/admin/login" ||
        pathname.startsWith("/admin/users/signup")
    ) {
        return NextResponse.next()
    }

    // Only apply auth logic to known admin paths
    const isAdminPath = ADMIN_PATHS.some((p) => pathname.startsWith(p))
    if (!isAdminPath) return NextResponse.next()

    const token = request.cookies.get("auth_token")?.value

    if (!token) {
        const loginUrl = new URL("/admin/login", request.url)
        loginUrl.searchParams.set("from", pathname)
        return NextResponse.redirect(loginUrl)
    }

    const payload = decodeJwtPayload(token)
    if (!payload) {
        const response = NextResponse.redirect(new URL("/admin/login", request.url))
        response.cookies.delete("auth_token")
        return response
    }

    // Employees can't access restricted paths
    if (payload.role === "employee") {
        const isRestricted = RESTRICTED_FROM_EMPLOYEE.some((p) => pathname.startsWith(p))
        if (isRestricted) {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*"],
}