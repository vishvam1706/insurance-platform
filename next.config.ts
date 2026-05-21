import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    serverExternalPackages: ["twilio"],
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "res.cloudinary.com" },
        ],
    },
}

export default nextConfig
