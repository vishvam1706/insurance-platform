export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { generateOtp, setOtp, verifyAndConsumeOtp } from "@/lib/otp-store"
import { sendSmsOtp, verifySmsOtp } from "@/lib/twilio"
import { sendOtpEmail } from "@/lib/email"
import { isRateLimited } from "@/lib/rate-limit"

/**
 * POST /api/inquiries/verify?type=phone  → sends OTP via Twilio Verify SMS
 * POST /api/inquiries/verify?type=email  → sends OTP via SMTP
 *
 * PUT  /api/inquiries/verify?type=phone  → verifies SMS OTP (Twilio Verify)
 * PUT  /api/inquiries/verify?type=email  → verifies email OTP (our store)
 */

// Rate Limit configurations
const IP_RATE_LIMIT = { limit: 10, windowMs: 15 * 60 * 1000 } // Max 10 OTP requests per 15 minutes per IP
const TARGET_RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 } // Max 5 OTP requests per 10 minutes per phone/email

// ── SEND OTP ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    const type = req.nextUrl.searchParams.get("type") ?? "phone"
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1"

    try {
        const body = await req.json()

        // 1. Global IP rate-limiting to prevent DDoS/abuse
        const ipLimited = await isRateLimited(`ratelimit:ip:${ip}:otp_send`, IP_RATE_LIMIT)
        if (ipLimited) {
            return NextResponse.json(
                { error: "Too many verification requests. Please try again later." },
                { status: 429 }
            )
        }

        if (type === "phone") {
            const { phone } = body
            if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
                return NextResponse.json({ error: "Invalid phone number" }, { status: 400 })
            }

            // Target-based rate limiting to prevent spamming a single number
            const phoneLimited = await isRateLimited(`ratelimit:phone:${phone}:otp_send`, TARGET_RATE_LIMIT)
            if (phoneLimited) {
                return NextResponse.json(
                    { error: "Too many OTP requests for this number. Please wait a few minutes." },
                    { status: 429 }
                )
            }

            await sendSmsOtp(phone)
            return NextResponse.json({ success: true })
        }

        if (type === "email") {
            const { email } = body
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
            }

            // Target-based rate limiting to prevent spamming a single inbox
            const emailLimited = await isRateLimited(`ratelimit:email:${email}:otp_send`, TARGET_RATE_LIMIT)
            if (emailLimited) {
                return NextResponse.json(
                    { error: "Too many OTP requests for this email. Please wait a few minutes." },
                    { status: 429 }
                )
            }

            const code = generateOtp()
            await setOtp(`email:${email}`, code)            // 5-min TTL (default)
            await sendOtpEmail(email, code)
            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    } catch (err) {
        console.error("[verify POST]", err)
        return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
    }
}

// ── VERIFY OTP ────────────────────────────────────────────────────────────────
export async function PUT(req: NextRequest) {
    const type = req.nextUrl.searchParams.get("type") ?? "phone"
    try {
        const body = await req.json()

        if (type === "phone") {
            const { phone, code } = body
            if (!phone || !code) {
                return NextResponse.json({ error: "Phone and code required" }, { status: 400 })
            }
            // Twilio Verify manages the OTP — verify against their API
            const valid = await verifySmsOtp(phone, String(code))
            if (!valid) {
                return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
            }
            // Mark phone as verified in our store (short-lived, 10 min for submit guard)
            await setOtp(`verified:phone:${phone}`, "1", 10 * 60 * 1000)
            return NextResponse.json({ verified: true })
        }

        if (type === "email") {
            const { email, code } = body
            if (!email || !code) {
                return NextResponse.json({ error: "Email and code required" }, { status: 400 })
            }
            const valid = await verifyAndConsumeOtp(`email:${email}`, String(code))
            if (!valid) {
                return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
            }
            await setOtp(`verified:email:${email}`, "1", 10 * 60 * 1000)
            return NextResponse.json({ verified: true })
        }

        return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    } catch (err) {
        console.error("[verify PUT]", err)
        return NextResponse.json({ error: "Verification failed" }, { status: 500 })
    }
}
