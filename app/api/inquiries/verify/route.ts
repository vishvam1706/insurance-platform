export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { generateOtp, setOtp, verifyAndConsumeOtp } from "@/lib/otp-store"
import { sendSmsOtp, verifySmsOtp } from "@/lib/twilio"
import { sendOtpEmail } from "@/lib/email"

/**
 * POST /api/inquiries/verify?type=phone  → sends OTP via Twilio Verify SMS
 * POST /api/inquiries/verify?type=email  → sends OTP via SMTP
 *
 * PUT  /api/inquiries/verify?type=phone  → verifies SMS OTP (Twilio Verify)
 * PUT  /api/inquiries/verify?type=email  → verifies email OTP (our store)
 */

// ── SEND OTP ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    const type = req.nextUrl.searchParams.get("type") ?? "phone"
    try {
        const body = await req.json()

        if (type === "phone") {
            const { phone } = body
            if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
                return NextResponse.json({ error: "Invalid phone number" }, { status: 400 })
            }
            await sendSmsOtp(phone)
            return NextResponse.json({ success: true })
        }

        if (type === "email") {
            const { email } = body
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
            }
            const code = generateOtp()
            setOtp(`email:${email}`, code)            // 5-min TTL (default)
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
            // Mark phone as verified in our store (short-lived, for submit guard)
            setOtp(`verified:phone:${phone}`, "1", 10 * 60 * 1000)
            return NextResponse.json({ verified: true })
        }

        if (type === "email") {
            const { email, code } = body
            if (!email || !code) {
                return NextResponse.json({ error: "Email and code required" }, { status: 400 })
            }
            const valid = verifyAndConsumeOtp(`email:${email}`, String(code))
            if (!valid) {
                return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
            }
            setOtp(`verified:email:${email}`, "1", 10 * 60 * 1000)
            return NextResponse.json({ verified: true })
        }

        return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    } catch (err) {
        console.error("[verify PUT]", err)
        return NextResponse.json({ error: "Verification failed" }, { status: 500 })
    }
}
