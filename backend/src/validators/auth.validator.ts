import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

export const validateLoginInput = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || !email.trim()) {
    return sendError(res, 400, 'Email is required.');
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email.trim())) {
    return sendError(res, 400, 'Please provide a valid email address.');
  }

  if (!password || typeof password !== 'string' || !password.trim()) {
    return sendError(res, 400, 'Password is required.');
  }

  return next();
};
