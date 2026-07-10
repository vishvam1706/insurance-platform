export type InsuranceType = "term" | "health" | "retirement" | "child" | "wealth" | "business"
export type InquiryStatus = "new" | "contacted" | "resolved" | "not_reachable"

export interface StatusHistoryEntry {
    status: InquiryStatus
    changedBy: string
    changedAt: string | Date
    note?: string
}

export interface IInquiry {
    _id: string
    name: string
    phone: string
    email: string
    insuranceType: InsuranceType
    state: string
    language: string
    pincode: string
    preferredSlot?: string
    message?: string
    status: InquiryStatus
    notes?: string
    assignedTo?: { _id: string; name: string; email: string } | string
    statusHistory?: StatusHistoryEntry[]
    createdAt: Date
    updatedAt: Date
}