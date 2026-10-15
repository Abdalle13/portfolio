import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

/** Zod v4 schema for the public contact form */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please provide your name.')
    .max(100, 'Name must be under 100 characters.'),

  email: z
    .string()
    .trim()
    .email('Please provide a valid email address.')
    .max(254, 'Email address is too long.'),

  message: z
    .string()
    .trim()
    .min(5, 'Message must be at least 5 characters long.')
    .max(5000, 'Message cannot exceed 5000 characters.'),

  // Honeypot fields — must be absent or empty (bots fill these)
  honeypot: z.string().optional(),
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Express middleware that validates the request body against the contactSchema.
 * Returns 400 with a descriptive error on the first validation failure.
 */
export const validateContact = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    // Zod v4 uses `.issues` (v3 used `.errors`)
    const firstError = result.error.issues[0]?.message ?? 'Invalid request.';
    sendError(res, 400, firstError);
    return;
  }

  // Replace req.body with the sanitised, trimmed values
  req.body = result.data;
  next();
};
