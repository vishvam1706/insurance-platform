import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

interface InquiryEmailProps {
    to: string
    name: string
    insuranceType: string
    preferredSlot?: string
}

export async function sendInquiryConfirmation({
    to, name, insuranceType, preferredSlot,
}: InquiryEmailProps): Promise<void> {
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject: "We received your inquiry — Insurance Platform",
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out. We've received your inquiry for <strong>${insuranceType}</strong> insurance.</p>
        ${preferredSlot ? `<p>Your preferred call time: <strong>${preferredSlot}</strong></p>` : ""}
        <p>One of our advisors will contact you shortly.</p>
        <p>— Insurance Platform Team</p>
      </div>
    `,
    })
}

interface EmployeeApprovalEmailProps {
    to: string
    name: string
    approved: boolean
}

export async function sendEmployeeApprovalEmail({
    to, name, approved,
}: EmployeeApprovalEmailProps): Promise<void> {
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject: approved
            ? "Your account has been approved"
            : "Account status update",
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${name},</h2>
        ${approved
                ? "<p>Your employee account has been <strong>approved</strong>. You can now log in and start managing leads.</p>"
                : "<p>Your account status has been updated. Please contact your administrator for details.</p>"
            }
        <p>— Insurance Platform Admin</p>
      </div>
    `,
    })
}

// ── Email OTP ─────────────────────────────────────────────────────────────────
export async function sendOtpEmail(to: string, otp: string): Promise<void> {
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject: `${otp} is your verification code — Insurance Platform`,
        html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="margin: 0 0 8px; font-size: 20px; color: #0f172a;">Verify your email</h2>
        <p style="color: #475569; margin: 0 0 24px;">Use the code below to verify your email address. It expires in <strong>5 minutes</strong>.</p>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 24px;">
          <p style="margin: 0 0 4px; font-size: 13px; color: #059669; font-weight: 600; letter-spacing: 0.05em;">YOUR OTP CODE</p>
          <p style="margin: 0; font-size: 36px; font-weight: 700; letter-spacing: 0.25em; color: #065f46; font-family: monospace;">${otp}</p>
        </div>
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
    })
}