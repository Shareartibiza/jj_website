import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase-admin';

export async function POST(req: Request) {
    try {
        const { name, email, interest, message } = await req.json();

        // Log the submission (useful for debugging during deployment)
        console.log('New Contact Inquiry:', { name, email, interest, message });

        // Save to Firestore
        try {
            await db.collection('contacts').add({
                name,
                email,
                interest,
                message,
                timestamp: new Date().toISOString(),
                status: 'new'
            });
        } catch (dbError) {
            console.error('Firestore save error:', dbError);
            // We continue to send the email even if DB save fails
        }

        // Configure Nodemailer with environment variables
        const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
        const smtpPort = Number(process.env.SMTP_PORT) || 465;
        const smtpSecure = smtpPort === 465;

        console.log(`Configuring SMTP: ${smtpHost}:${smtpPort} (Secure: ${smtpSecure})`);

        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn('SMTP credentials not configured. Email will not be sent, but inquiry logged/stored.');
            return NextResponse.json({
                success: true,
                message: 'Inquiry received and stored.',
                debug: {
                    emailSent: false,
                    reason: 'Missing SMTP credentials (SMTP_USER or SMTP_PASS)'
                }
            });
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"JJ Luxury Website" <${process.env.SMTP_USER}>`,
            to: 'jozef@jjluxurylifestyle.com', // Verified receiver email
            subject: `New Inquiry from ${name} - ${interest}`,
            text: `
        Name: ${name}
        Email: ${email}
        Interest: ${interest}
        Message: ${message}
      `,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; line-height: 1.6;">
          <h2 style="color: #fc036b;">New Consultation Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Interest:</strong> ${interest}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.messageId);
            return NextResponse.json({
                success: true,
                message: 'Message sent and stored successfully.',
                messageId: info.messageId
            });
        } catch (mailError: any) {
            console.error('Nodemailer error:', mailError);
            return NextResponse.json({
                success: true,
                message: 'Inquiry stored, but email delivery failed.',
                debug: {
                    emailSent: false,
                    error: mailError.message,
                    code: mailError.code
                }
            });
        }
    } catch (error: any) {
        console.error('Contact form error:', error);
        return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
    }
}
