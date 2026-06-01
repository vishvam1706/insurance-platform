import mongoose, { Schema, Document, Model } from "mongoose"

export interface LanguageVisibility {
    language: string
    visible: boolean
}

export interface ShiftTiming {
    shiftName: string      // e.g. "Morning", "Afternoon", "Evening", "Night"
    startTime: string      // e.g. "09:00"
    endTime: string        // e.g. "13:00"
    frozen: boolean
}

export interface SystemSettingsDocument extends Document {
    key: string // e.g. "global_settings"
    languages: LanguageVisibility[]
    shifts: ShiftTiming[]
    formActive: boolean   // controls whether the public contact form is visible
    createdAt: Date
    updatedAt: Date
}

const SystemSettingsSchema = new Schema<SystemSettingsDocument>(
    {
        key: { type: String, default: "global_settings", unique: true },
        formActive: { type: Boolean, default: true },
        languages: [
            {
                language: { type: String, required: true },
                visible: { type: Boolean, default: true }
            }
        ],
        shifts: [
            {
                shiftName: { type: String, required: true },
                startTime: { type: String, required: true },
                endTime: { type: String, required: true },
                frozen: { type: Boolean, default: false }
            }
        ]
    },
    { timestamps: true }
)

const SystemSettings: Model<SystemSettingsDocument> =
    mongoose.models.SystemSettings ||
    mongoose.model<SystemSettingsDocument>("SystemSettings", SystemSettingsSchema)

export default SystemSettings
