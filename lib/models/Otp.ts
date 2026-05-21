import mongoose, { Schema, Document, Model } from "mongoose"

export interface OtpDocument extends Document {
    key: string
    code: string
    expiresAt: Date
}

const OtpSchema = new Schema<OtpDocument>(
    {
        key: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        code: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
)

// TTL Index: Document will automatically delete itself at the `expiresAt` time
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const Otp: Model<OtpDocument> =
    mongoose.models.Otp || mongoose.model<OtpDocument>("Otp", OtpSchema)

export default Otp
