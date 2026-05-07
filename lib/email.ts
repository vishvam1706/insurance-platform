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