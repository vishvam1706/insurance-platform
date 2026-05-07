import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export const CreateUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["super_admin", "admin", "employee"]),
    state: z.string().optional(),
    language: z.string().optional(),
})

export const EmployeeSignupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    state: z.string().min(1, "Please select your state"),
    language: z.string().min(1, "Please select your language"),
}).refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export const UpdateUserSchema = z.object({
    name: z.string().min(2).optional(),
    status: z.enum(["active", "pending", "inactive"]).optional(),
    role: z.enum(["super_admin", "admin", "employee"]).optional(),
    state: z.string().optional(),
    language: z.string().optional(),
})

export type LoginInput = z.infer<typeof LoginSchema>
export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type EmployeeSignupInput = z.infer<typeof EmployeeSignupSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>