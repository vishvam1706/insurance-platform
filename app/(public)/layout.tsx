import PublicHeader from "@/components/public/Header"
import PublicFooter from "@/components/public/Footer"

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="public-theme min-h-screen flex flex-col bg-white">
            <PublicHeader />
            <main className="flex-1">{children}</main>
            <PublicFooter />
        </div>
    )
}