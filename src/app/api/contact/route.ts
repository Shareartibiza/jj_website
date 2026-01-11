import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, interest, message } = await req.json();

        // Log the submission (useful for debugging during deployment)
        console.log('New Contact Inquiry:', { name, email, interest, message });

        // Configure Nodemailer with environment variables
        // Best Practice: Setup these in your Google Cloud Run environment variables or .env file
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER, // Your email service username
                pass: process.env.SMTP_PASS, // Your email service password or app-specific password
            },
        });

        // Check if configuration is present
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn('SMTP credentials not configured. Email will not be sent, but inquiry logged.');
            // For now, we return success so the user doesn't see an error, 
            // but in a production setup, you should have these configured.
            return NextResponse.json({
                success: true,
                message: 'Inquiry received (logged without email delivery).'
            });
        }

        const mailOptions = {
            from: `"JJ Luxury Website" <${process.env.SMTP_USER}>`,
            to: 'jozef@jjluxurylifestyle.com',
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

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ success: false, error: 'Failed to send message.' }, { status: 500 });
    }
}
