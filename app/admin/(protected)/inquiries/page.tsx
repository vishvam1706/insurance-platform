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
        <div className="space-y-3 sm:space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                        Inquiries
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1">
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