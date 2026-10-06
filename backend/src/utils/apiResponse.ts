import { Response } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
}

/**
 * Standard API success response sender
 */
export const sendSuccess = <T>(
  res: Response,
  statusCode: number = 200,
  message: string,
  data?: T
): Response => {
  const payload: ApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
  };
  return res.status(statusCode).json(payload);
};

/**
 * Standard API error response sender
 */
export const sendError = (
  res: Response,
  statusCode: number = 500,
  message: string,
  errors?: unknown
): Response => {
  const payload: ApiResponse = {
    success: false,
    message,
    ...(errors !== undefined && process.env.NODE_ENV !== 'production' && { errors }),
  };
  return res.status(statusCode).json(payload);
};
