import mongoose, { Schema, Document, Model } from "mongoose"

export interface InsurancePlanDocument extends Document {
    slug: string
    insurer: string
    planName: string
    logo?: string
    type: "health" | "term"
    features: Record<string, unknown>
    premium?: Record<string, number>
    dittoRating?: number
    csr?: string
    createdAt: Date
    updatedAt: Date
}

const InsurancePlanSchema = new Schema<InsurancePlanDocument>(
    {
        slug: { type: String, required: true, unique: true, lowercase: true },
        insurer: { type: String, required: true, trim: true },
        planName: { type: String, required: true, trim: true },
        logo: { type: String },
        type: { type: String, enum: ["health", "term"], required: true },
        features: { type: Schema.Types.Mixed, default: {} },
        premium: { type: Schema.Types.Mixed },
        dittoRating: { type: Number, min: 0, max: 5 },
        csr: { type: String },
    },
    { timestamps: true }
)

InsurancePlanSchema.index({ slug: 1 })
InsurancePlanSchema.index({ type: 1 })
InsurancePlanSchema.index({ insurer: 1 })

const InsurancePlan: Model<InsurancePlanDocument> =
    mongoose.models.InsurancePlan ||
    mongoose.model<InsurancePlanDocument>("InsurancePlan", InsurancePlanSchema)

export default InsurancePlan