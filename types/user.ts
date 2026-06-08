export type UserRole = "super_admin" | "admin" | "employee"
export type UserStatus = "active" | "pending" | "inactive"

export interface IUser {
    _id: string
    name: string
    email: string
    passwordHash: string
    role: UserRole
    state?: string
    language?: string
    states?: string[]
    languages?: string[]
    pincodes?: string[]
    status: UserStatus
    createdBy?: string
    createdAt: Date
    updatedAt: Date
}

export interface JWTPayload {
    userId: string
    email: string
    role: UserRole
    name: string
    state?: string
    language?: string
    states?: string[]
    languages?: string[]
    pincodes?: string[]
}

export interface SafeUser {
    _id: string
    name: string
    email: string
    role: UserRole
    state?: string
    language?: string
    states?: string[]
    languages?: string[]
    pincodes?: string[]
    status: UserStatus
    createdAt: Date
}