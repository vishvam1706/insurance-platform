import mongoose, { Schema, Document, Model } from "mongoose"
import { InsuranceType, InquiryStatus } from "@/types/inquiry"

export interface StatusHistoryEntry {
    status: InquiryStatus
    changedBy: string          // user name or email
    changedAt: Date
    note?: string              // optional note at time of change
}

export interface InquiryDocument extends Document {
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
    assignedTo?: mongoose.Types.ObjectId
    statusHistory: StatusHistoryEntry[]
    createdAt: Date
    updatedAt: Date
}

const InquirySchema = new Schema<InquiryDocument>(
    {
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        insuranceType: {
            type: String,
            enum: ["term", "health"],
            required: true,
        },
        state: { type: String, required: true, trim: true },
        language: { type: String, required: true, trim: true },
        preferredSlot: { type: String },
        message: { type: String, trim: true },
        status: {
            type: String,
            enum: ["new", "contacted", "resolved", "not_reachable"],
            default: "new",
        },
        notes: { type: String, trim: true },
        assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
        statusHistory: [
            {
                status: { type: String, enum: ["new", "contacted", "resolved", "not_reachable"] },
                changedBy: { type: String },
                changedAt: { type: Date, default: Date.now },
                note: { type: String },
            }
        ],
    },
    { timestamps: true }
)

InquirySchema.index({ state: 1, status: 1 })
InquirySchema.index({ insuranceType: 1 })
InquirySchema.index({ createdAt: -1 })
InquirySchema.index({ assignedTo: 1 })

const Inquiry: Model<InquiryDocument> =
    mongoose.models.Inquiry ||
    mongoose.model<InquiryDocument>("Inquiry", InquirySchema)

export default Inquiry