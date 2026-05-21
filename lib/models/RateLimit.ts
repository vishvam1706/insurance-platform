import mongoose, { Schema, Document, Model } from "mongoose"

export interface RateLimitDocument extends Document {
    key: string
    count: number
    resetAt: Date
}

const RateLimitSchema = new Schema<RateLimitDocument>(
    {
        key: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        count: {
            type: Number,
            required: true,
            default: 1,
        },
        resetAt: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
)

// TTL Index: Document will automatically delete itself at the `resetAt` time
RateLimitSchema.index({ resetAt: 1 }, { expireAfterSeconds: 0 })

const RateLimit: Model<RateLimitDocument> =
    mongoose.models.RateLimit || mongoose.model<RateLimitDocument>("RateLimit", RateLimitSchema)

export default RateLimit
