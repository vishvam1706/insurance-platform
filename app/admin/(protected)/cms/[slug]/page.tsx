import CmsEditorClient from "@/components/admin/CmsEditorClient"

// Server Component — awaits params (no use() in client needed)
export default async function CmsEditorPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    return <CmsEditorClient slug={slug} />
}