import type { NextConfig } from "next"

// Security headers applied to every response.
// NOTE: A Content-Security-Policy (CSP) is intentionally omitted here —
// it must be tuned to match all CDN/font/inline-script origins before enabling.
const securityHeaders = [
    {
        key: "X-Frame-Options",
        value: "DENY", // Block clickjacking (iframes)
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff", // Prevent MIME-type sniffing
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    },
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
]

const nextConfig: NextConfig = {
    serverExternalPackages: ["twilio"],
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "res.cloudinary.com" },
        ],
    },
    headers: async () => [
        {
            // Apply to all routes
            source: "/(.*)",
            headers: securityHeaders,
        },
    ],
}

export default nextConfig
