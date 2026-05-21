import type { Metadata } from "next"
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-heading",
    subsets: ["latin"],
    display: "swap",
})

const dmSans = DM_Sans({
    variable: "--font-body",
    subsets: ["latin"],
    display: "swap",
})

export const metadata: Metadata = {
    title: { default: "Insurance Platform", template: "%s | Insurance Platform" },
    description: "Life & Health Insurance — Expert Advice, Free Consultation",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${plusJakartaSans.variable} ${dmSans.variable} antialiased`}
                style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
                suppressHydrationWarning
            >
                {children}
                <Toaster position="top-right" richColors closeButton />
            </body>
        </html>
    )
}