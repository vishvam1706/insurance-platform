"use client"

import { useInquiries } from "@/hooks/useInquiries"
import { useAuth } from "@/hooks/useAuth"
import InquiryFilters from "@/components/admin/InquiryFilters"
import InquiryTable from "@/components/admin/InquiryTable"
import CsvExportButton from "@/components/admin/CsvExportButton"
import { MessageSquare } from "lucide-react"

export default function InquiriesPage() {
    const { user } = useAuth()
    const { inquiries, pagination, loading,
        filters, updateFilter, resetFilters,
        refetch } = useInquiries()

    const activeFilterCount = Object.values(filters).filter(Boolean).length

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-blue-600" />
                        Inquiries
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {user?.role === "employee"
                            ? `Showing leads for ${user.state}`
                            : `All submitted inquiries — ${pagination.total} total`}
                    </p>
                </div>

                {user?.role !== "employee" && (
                    <CsvExportButton
                        filters={{
                            status: filters.status,
                            type: filters.type,
                            state: filters.state,
                        }}
                    />
                )}
            </div>

            {/* Filters */}
            <InquiryFilters
                filters={filters}
                onFilter={updateFilter}
                onReset={resetFilters}
                activeCount={activeFilterCount}
            />

            {/* Table */}
            <InquiryTable
                inquiries={inquiries}
                pagination={pagination}
                loading={loading}
                onPageChange={(page) => refetch(page)}
                onRefetch={() => refetch(pagination.page)}
            />
        </div>
    )
}