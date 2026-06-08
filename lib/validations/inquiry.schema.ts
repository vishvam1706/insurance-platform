import { z } from "zod"

export const InquirySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
    email: z.string().email("Enter a valid email address").optional().or(z.literal("")),
    insuranceType: z.enum(["term", "health"], {
        message: "Please select insurance type",
    }),
    state: z.string().min(1, "Please select your state"),
    language: z.string().min(1, "Please select your preferred language"),
    pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit Pincode"),
    preferredSlot: z.string().optional(),
    message: z.string().max(500).optional(),
})

export const UpdateInquirySchema = z.object({
    status: z.enum(["new", "contacted", "resolved", "not_reachable"]).optional(),
    notes: z.string().max(1000).optional(),
    assignedTo: z.string().optional(),
})

export type InquiryInput = z.infer<typeof InquirySchema>
export type UpdateInquiryInput = z.infer<typeof UpdateInquirySchema>