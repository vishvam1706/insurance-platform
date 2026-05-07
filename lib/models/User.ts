import mongoose, { Schema, Document, Model } from "mongoose"
import { UserRole, UserStatus } from "@/types/user"

export interface UserDocument extends Document {
    name: string
    email: string
    passwordHash: string
    role: UserRole
    state?: string
    language?: string
    status: UserStatus
    createdBy?: mongoose.Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

const UserSchema = new Schema<UserDocument>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, required: true },
        role: {
            type: String,
            enum: ["super_admin", "admin", "employee"],
            required: true,
        },
        state: { type: String, trim: true },
        language: { type: String, trim: true },
        status: {
            type: String,
            enum: ["active", "pending", "inactive"],
            default: "active",
        },
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
)

UserSchema.index({ email: 1 })
UserSchema.index({ role: 1, status: 1 })
UserSchema.index({ state: 1 })

const User: Model<UserDocument> =
    mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema)

export default User