import rateLimit from 'express-rate-limit';

/**
 * Dedicated rate limiter for public contact form submissions
 * Prevents spam flooding: maximum 5 messages per 15 minutes per IP
 */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact requests from this IP. Please wait a few minutes before trying again.',
  },
});
