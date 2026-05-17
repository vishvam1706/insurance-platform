export type InsuranceType = "term" | "health"
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
    preferredSlot?: string
    message?: string
    status: InquiryStatus
    notes?: string
    assignedTo?: string
    statusHistory?: StatusHistoryEntry[]
    createdAt: Date
    updatedAt: Date
}