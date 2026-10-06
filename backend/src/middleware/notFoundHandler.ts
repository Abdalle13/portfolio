import { Request, Response } from 'express';
import { sendError } from '../utils/apiResponse';

/**
 * 404 Not Found middleware for undefined routes
 */
export const notFoundHandler = (req: Request, res: Response): Response => {
  return sendError(res, 404, `Cannot ${req.method} ${req.originalUrl} - Route not found`);
};
