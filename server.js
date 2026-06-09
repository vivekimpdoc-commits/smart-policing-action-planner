import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Load Environment Variables
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || '';

const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || ''; // App Password for Gmail

// Initialize Twilio client if keys exist
let twilioClient = null;
if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

// Initialize Nodemailer transporter if keys exist
let transporter = null;
if (EMAIL_USER && EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
}

// POST endpoint to handle notifications
app.post('/api/send-notification', async (req, res) => {
  const { owner, phones, emails, taskTitle, timeline } = req.body;

  let smsStatus = 'Not Configured';
  let emailStatus = 'Not Configured';

  const messageText = `URGENT POLICE TASK: ${taskTitle}\nOwner: ${owner}\nTimeline: ${timeline}\nPlease execute SOP immediately.`;

  try {
    // 1. Send SMS if configured
    if (twilioClient && phones && phones.length > 0) {
      for (const phone of phones) {
        // Simple regex to ensure it has country code if possible, or append it
        // Note: Real implementation would need precise phone number formatting (+91...)
        try {
          await twilioClient.messages.create({
            body: messageText,
            from: TWILIO_PHONE_NUMBER,
            to: phone.trim()
          });
          smsStatus = 'Sent';
        } catch (smsErr) {
          console.error("SMS Error:", smsErr.message);
          smsStatus = `Failed: ${smsErr.message}`;
        }
      }
    }

    // 2. Send Email
    if (emails && emails.length > 0) {
      try {
        let activeTransporter = transporter;
        let fromEmail = EMAIL_USER;

        // Fallback to Ethereal Email if Gmail is not configured
        if (!activeTransporter) {
          const testAccount = await nodemailer.createTestAccount();
          activeTransporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
              user: testAccount.user,
              pass: testAccount.pass,
            },
          });
          fromEmail = testAccount.user;
          console.log("Using Ethereal Test Account:", testAccount.user);
        }

        const info = await activeTransporter.sendMail({
          from: `"Smart Policing Control Room" <${fromEmail}>`,
          to: emails.join(', '),
          subject: `Urgent Task Assigned: ${taskTitle}`,
          text: messageText,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #4f46e5;">Smart Policing Action Planner</h2>
              <p>You have been assigned a critical administrative task.</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Task:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${taskTitle}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Assigned To:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${owner}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Deadline:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${timeline}</td>
                </tr>
              </table>
              <p style="margin-top: 20px; font-size: 12px; color: #64748b;">This is an automated message from the Smart Policing Action Planner.</p>
            </div>
          `
        });

        emailStatus = 'Sent';
        
        // If using Ethereal, generate the preview URL
        if (!transporter) {
          const etherealUrl = nodemailer.getTestMessageUrl(info);
          console.log("Ethereal Preview URL:", etherealUrl);
          emailStatus = `Sent (Test Mode). URL: ${etherealUrl}`;
        }

      } catch (emailErr) {
        console.error("Email Error:", emailErr.message);
        emailStatus = `Failed: ${emailErr.message}`;
      }
    }

    res.json({
      success: true,
      message: 'Notification processing complete',
      details: {
        sms: smsStatus,
        email: emailStatus
      }
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
