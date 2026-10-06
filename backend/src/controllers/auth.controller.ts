import { Request, Response } from 'express';
import { Admin } from '../models/Admin';
import { generateToken, setAuthCookie, clearAuthCookie } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthRequest } from '../types';

/**
 * Admin Login
 * POST /api/auth/login
 */
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // 1. Find Admin by lowercase email
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      // Generic error prevents username enumeration
      return sendError(res, 401, 'Invalid email or password.');
    }

    // 2. Compare password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return sendError(res, 401, 'Invalid email or password.');
    }

    // 3. Update lastLogin
    admin.lastLogin = new Date();
    await admin.save();

    // 4. Generate JWT & set HTTP-only cookie
    const token = generateToken({
      id: admin._id.toString(),
      email: admin.email,
      role: 'admin',
    });

    setAuthCookie(res, token);

    return sendSuccess(res, 200, 'Logged in successfully.', {
      admin: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: 'admin',
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    return sendError(res, 500, 'An error occurred while signing in.');
  }
};

/**
 * Admin Logout
 * POST /api/auth/logout
 */
export const logout = async (_req: Request, res: Response): Promise<Response> => {
  try {
    clearAuthCookie(res);
    return sendSuccess(res, 200, 'Logged out successfully.');
  } catch (error) {
    return sendError(res, 500, 'An error occurred while signing out.');
  }
};

/**
 * Get Current Admin Profile
 * GET /api/auth/me
 */
export const getMe = async (req: AuthRequest, res: Response): Promise<Response> => {
  if (!req.admin) {
    return sendError(res, 401, 'Not authenticated.');
  }

  return sendSuccess(res, 200, 'Current session active.', {
    admin: req.admin,
  });
};
