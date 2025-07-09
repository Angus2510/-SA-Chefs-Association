import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Specify that this should run on Node.js runtime
export const runtime = "nodejs";
export const preferredRegion = "auto";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function POST(request: Request) {
  try {
    const { email, title, message } = await request.json();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: title,
      html: message,
    };

    await transporter.verify(); // Verify connection configuration
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
