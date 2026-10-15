import { mailTransporter, isSmtpConfigured } from '../config/mailer';
import { env } from '../config/env';

interface ContactNotificationPayload {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
}

interface MailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  isSimulated?: boolean;
}

/**
 * Generate formatted HTML template for new inquiry notifications
 */
const generateContactNotificationHtml = (data: ContactNotificationPayload): string => {
  const formattedDate = (data.createdAt || new Date()).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Message</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0f172a; padding: 28px 32px; color: #ffffff; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 6px 0 0; color: #94a3b8; font-size: 14px; }
    .content { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px; }
    .value { font-size: 15px; color: #0f172a; font-weight: 500; }
    .message-box { background: #f1f5f9; border-left: 4px solid #2563eb; border-radius: 8px; padding: 16px 20px; font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; word-break: break-word; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 32px; font-size: 12px; color: #64748b; text-align: center; }
    .button { display: inline-block; background-color: #2563eb; color: #ffffff !important; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Portfolio Inquiry</h1>
      <p>Received from abdalle.dev contact portal</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Sender Name</div>
        <div class="value">${escapeHtml(data.name)}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(data.email)}</a></div>
      </div>
      <div class="field">
        <div class="label">Submission Time</div>
        <div class="value">${formattedDate}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${escapeHtml(data.message)}</div>
      </div>
      <a href="mailto:${escapeHtml(data.email)}?subject=Re:%20Portfolio%20Inquiry" class="button">Reply to ${escapeHtml(data.name)}</a>
    </div>
    <div class="footer">
      Abdalle Hussein Portfolio &bull; ID: ${data.id} &bull; Stored in Database
    </div>
  </div>
</body>
</html>
  `;
};

/**
 * Basic HTML escaping utility
 */
const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Dispatch notification email to admin when a new inquiry arrives
 */
export const sendContactNotification = async (data: ContactNotificationPayload): Promise<MailResult> => {
  const recipient = env.NOTIFICATION_EMAIL || env.ADMIN_EMAIL;

  // Graceful fallback for local development or when SMTP is not configured
  if (!isSmtpConfigured() || !mailTransporter) {
    console.log('\n[Mail Service] SMTP is not configured. Simulating email notification:');
    console.log(`  To: ${recipient}`);
    console.log(`  From: ${data.name} <${data.email}>`);
    console.log(`  Message ID: ${data.id}`);
    console.log(`  Message Preview: ${data.message.substring(0, 80)}...\n`);
    return {
      success: true,
      isSimulated: true,
      messageId: `simulated-${Date.now()}`,
    };
  }

  try {
    const htmlContent = generateContactNotificationHtml(data);
    const textContent = `
New Portfolio Inquiry

From: ${data.name} (${data.email})
Date: ${new Date().toISOString()}

Message:
${data.message}

---
Inquiry ID: ${data.id}
    `.trim();

    const info = await mailTransporter.sendMail({
      from: env.SMTP_FROM,
      to: recipient,
      replyTo: `${data.name} <${data.email}>`,
      subject: `New Portfolio Inquiry from ${data.name}`,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Mail Service] Email notification successfully dispatched: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
      isSimulated: false,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown mail error';
    console.error(`[Mail Service] Failed to send email notification:`, errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
};
