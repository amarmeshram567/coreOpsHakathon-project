import * as nodemailer from "nodemailer"


if (!process.env.SMTP_HOST) {
    console.warn("⚠ SMTP not configured. Emails will not be sent.")
}

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465, // auto secure
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})


type EmailPayload = {
    to: string
    subject: string
    text: string
}

export const emailService = {
    async send(payload: EmailPayload) {
        const { to, subject, text } = payload

        try {
            await transporter.sendMail({
                from: `"CareOps" <${process.env.SMTP_USER}>`,
                to,
                subject,
                text
            })
        } catch (error) {
            console.error("Email sending failed:", error)
        }
    }
}

