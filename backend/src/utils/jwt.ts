import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface TokenPayload {
  id: string;
  email: string;
  role: 'admin';
}

const AUTH_COOKIE_NAME = 'auth_token';

/**
 * Generate a signed JWT token
 */
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

/**
 * Verify and decode a JWT token
 */
export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

/**
 * Set secure HTTP-only cookie with the JWT token
 */
export const setAuthCookie = (res: Response, token: string): void => {
  const isProduction = env.isProduction;

  res.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });
};

/**
 * Clear the authentication cookie on logout
 */
export const clearAuthCookie = (res: Response): void => {
  const isProduction = env.isProduction;

  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/',
  });
};

export { AUTH_COOKIE_NAME };
