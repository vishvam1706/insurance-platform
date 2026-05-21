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
    let response: NextResponse = NextResponse.next()

    // ── 1. AUTHENTICATION & REDIRECT LOGIC ──────────────────────────────────────
    if (pathname === "/admin" || pathname === "/admin/") {
        response = NextResponse.redirect(new URL("/admin/dashboard", request.url))
    } else if (
        pathname === "/admin/login" ||
        pathname.startsWith("/admin/users/signup")
    ) {
        response = NextResponse.next()
    } else {
        // Only apply auth logic to known admin paths
        const isAdminPath = ADMIN_PATHS.some((p) => pathname.startsWith(p))
        if (isAdminPath) {
            const token = request.cookies.get("auth_token")?.value

            if (!token) {
                const loginUrl = new URL("/admin/login", request.url)
                loginUrl.searchParams.set("from", pathname)
                response = NextResponse.redirect(loginUrl)
            } else {
                const payload = decodeJwtPayload(token)
                if (!payload) {
                    response = NextResponse.redirect(new URL("/admin/login", request.url))
                    response.cookies.delete("auth_token")
                } else if (payload.role === "employee" && RESTRICTED_FROM_EMPLOYEE.some((p) => pathname.startsWith(p))) {
                    response = NextResponse.redirect(new URL("/admin/dashboard", request.url))
                }
            }
        }
    }

    // ── 2. GLOBAL SECURITY HEADERS ──────────────────────────────────────────────
    // Do not apply security headers to dynamic API endpoints or static assets
    const isAsset = pathname.startsWith("/api") || 
                    pathname.startsWith("/_next") || 
                    pathname.startsWith("/uploads") || 
                    pathname.includes(".")

    if (!isAsset) {
        // Content Security Policy (CSP)
        const cspHeader = `
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.twilio.com;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            font-src 'self' data: https://fonts.gstatic.com;
            img-src 'self' data: blob: https://res.cloudinary.com https://*.cloudinary.com;
            connect-src 'self' https://*.twilio.com;
            frame-src 'self';
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
            block-all-mixed-content;
            upgrade-insecure-requests;
        `.replace(/\s{2,}/g, " ").trim()

        response.headers.set("Content-Security-Policy", cspHeader)

        // HTTP Strict Transport Security (HSTS)
        if (process.env.NODE_ENV === "production") {
            response.headers.set(
                "Strict-Transport-Security",
                "max-age=31536000; includeSubDomains; preload"
            )
        }

        // Prevent clickjacking
        response.headers.set("X-Frame-Options", "DENY")

        // Prevent MIME sniffing
        response.headers.set("X-Content-Type-Options", "nosniff")

        // Referrer Policy
        response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

        // Permissions Policy
        response.headers.set(
            "Permissions-Policy",
            "camera=(), microphone=(), geolocation=()"
        )
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all paths except:
         * - api (API routes)
         * - _next/static, _next/image (static files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}