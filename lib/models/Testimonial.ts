import mongoose, { Schema, Document, Model } from "mongoose"

export interface TestimonialDocument extends Document {
    name: string
    role: string
    body: string
    rating: number
    initials: string
    active: boolean
    createdAt: Date
    updatedAt: Date
}

const TestimonialSchema = new Schema<TestimonialDocument>(
    {
        name: { type: String, required: true, trim: true },
        role: { type: String, required: true, trim: true },
        body: { type: String, required: true, trim: true },
        rating: { type: Number, default: 5 },
        initials: { type: String, required: true, trim: true },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
)

const Testimonial: Model<TestimonialDocument> =
    mongoose.models.Testimonial ||
    mongoose.model<TestimonialDocument>("Testimonial", TestimonialSchema)

export default Testimonial
