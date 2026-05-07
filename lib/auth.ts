import jwt from "jsonwebtoken"
import { JWTPayload } from "@/types/user"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"

if (!JWT_SECRET) {
    throw new Error("Please define JWT_SECRET in .env.local")
}

export function signToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions)
}

export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload
    } catch {
        return null
    }
}

export async function getAuthUser(): Promise<JWTPayload | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value
    if (!token) return null
    return verifyToken(token)
}

export async function requireAuth(): Promise<JWTPayload> {
    const user = await getAuthUser()
    if (!user) throw new Error("Unauthorized")
    return user
}

export async function requireRole(
    roles: JWTPayload["role"][]
): Promise<JWTPayload> {
    const user = await requireAuth()
    if (!roles.includes(user.role)) throw new Error("Forbidden")
    return user
}

export function setAuthCookie(token: string): void {
    // Used in API routes via NextResponse
}

export const COOKIE_NAME = "auth_token"
export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
}