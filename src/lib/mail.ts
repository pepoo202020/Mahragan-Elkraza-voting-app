import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendResetCode(email: string, code: string) {
  await transporter.sendMail({
    from: `"Church Portal" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Password Reset Code",
    text: `Your password reset code is: ${code}`,
    html: `<p>Your password reset code is: <b>${code}</b></p>`,
  });
}
