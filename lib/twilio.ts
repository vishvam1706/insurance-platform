/**
 * Twilio Verify Service — OTP via SMS
 * Docs: https://www.twilio.com/docs/verify/api
 *
 * ENV vars required:
 *   TWILIO_ACCOUNT_SID   — from https://console.twilio.com
 *   TWILIO_AUTH_TOKEN    — from https://console.twilio.com
 *   TWILIO_VERIFY_SID    — Verify Service SID (starts with VA…)
 *                          Create at: console.twilio.com → Verify → Services
 */

import twilio from "twilio"

function getClient() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    if (!accountSid || !authToken) {
        throw new Error("Twilio credentials not configured (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN)")
    }
    return twilio(accountSid, authToken)
}

function getVerifySid() {
    const sid = process.env.TWILIO_VERIFY_SID
    if (!sid) throw new Error("TWILIO_VERIFY_SID is not set")
    return sid
}

/** Send an SMS OTP to the given 10-digit Indian mobile number. */
export async function sendSmsOtp(mobile: string): Promise<void> {
    const client = getClient()
    const to = `+91${mobile}`

    const verification = await client.verify.v2
        .services(getVerifySid())
        .verifications.create({ to, channel: "sms" })

    if (verification.status !== "pending") {
        throw new Error(`Twilio: unexpected verification status "${verification.status}"`)
    }
}

/** Verify the OTP entered by the user. Returns true if correct. */
export async function verifySmsOtp(mobile: string, code: string): Promise<boolean> {
    const client = getClient()
    const to = `+91${mobile}`

    try {
        const check = await client.verify.v2
            .services(getVerifySid())
            .verificationChecks.create({ to, code })

        return check.status === "approved"
    } catch {
        // Twilio throws 404 when the code is wrong / expired
        return false
    }
}
