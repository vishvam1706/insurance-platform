import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const poppins = Poppins({
    variable: "--font-heading",
    weight: ["700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
})

const inter = Inter({
    variable: "--font-body",
    subsets: ["latin"],
    display: "swap",
})

export const metadata: Metadata = {
    title: { default: "Policymine Insurance", template: "%s | Policymine Insurance" },
    description: "Smarter Insurance Decisions — Expert Guidance, Free Consultation",
    icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${poppins.variable} ${inter.variable} antialiased`}
                style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
                suppressHydrationWarning
            >
                {children}
                <Toaster position="top-right" richColors closeButton />
            </body>
        </html>
    )
}