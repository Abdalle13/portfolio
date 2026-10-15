import nodemailer from 'nodemailer';
import { env } from './env';

/**
 * Check if SMTP settings are configured
 */
export const isSmtpConfigured = (): boolean => {
  return Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);
};

/**
 * Create Nodemailer Transporter
 */
export const createTransporter = () => {
  if (!isSmtpConfigured()) {
    return null;
  }

  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE, // true for 465, false for other ports like 587
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
};

export const mailTransporter = createTransporter();
