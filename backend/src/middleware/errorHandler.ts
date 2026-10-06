import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { sendError } from '../utils/apiResponse';
import { env } from '../config/env';

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message);
  }

  // Handle generic / unexpected internal errors
  const statusCode = 500;
  const message = env.isProduction ? 'Internal server error occurred' : err.message;
  return sendError(res, statusCode, message, err.stack);
};
