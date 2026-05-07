import PublicHeader from "@/components/public/Header"
import PublicFooter from "@/components/public/Footer"
import WhatsAppButton from "@/components/public/WhatsAppButton"

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <PublicHeader />
            <main className="flex-1">{children}</main>
            <PublicFooter />
            <WhatsAppButton />
        </div>
    )
}