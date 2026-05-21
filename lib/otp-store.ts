import { connectDB } from "@/lib/mongodb"
import Otp from "@/lib/models/Otp"

/** Generates a random 6-digit verification code. */
export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/** Saves an OTP for a given key to the database with a specific TTL. */
export async function setOtp(key: string, code: string, ttlMs = 5 * 60 * 1000): Promise<void> {
  await connectDB()
  const expiresAt = new Date(Date.now() + ttlMs)
  await Otp.findOneAndUpdate(
    { key },
    { code, expiresAt },
    { upsert: true, new: true }
  )
}

/** Verifies and consumes the OTP (destroys it immediately upon match). */
export async function verifyAndConsumeOtp(key: string, code: string): Promise<boolean> {
  await connectDB()
  const entry = await Otp.findOne({ key })
  if (!entry) return false
  if (new Date() > entry.expiresAt) {
    await Otp.deleteOne({ key })
    return false
  }
  if (entry.code !== code) return false
  await Otp.deleteOne({ key })
  return true
}

/** Checks if there is an active (unexpired) OTP for the given key. */
export async function hasActiveOtp(key: string): Promise<boolean> {
  await connectDB()
  const entry = await Otp.findOne({ key })
  if (!entry) return false
  if (new Date() > entry.expiresAt) {
    await Otp.deleteOne({ key })
    return false
  }
  return true
}
