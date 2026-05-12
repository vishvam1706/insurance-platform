import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        // Allow all hostnames for remote images
        remotePatterns: [
            { protocol: "https", hostname: "**" },
            { protocol: "http", hostname: "**" },
        ],
        // Allow local /uploads/ files served from public/
        unoptimized: false,
        localPatterns: [
            { pathname: "/uploads/**" },
        ],
    },
    // Allow serving files from /public/uploads
    async headers() {
        return [
            {
                source: "/uploads/:path*",
                headers: [
                    { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
                ],
            },
        ]
    },
}

export default nextConfig
