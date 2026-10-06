import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { verifyToken, AUTH_COOKIE_NAME } from '../utils/jwt';
import { Admin } from '../models/Admin';
import { sendError } from '../utils/apiResponse';

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // 1. Check HTTP-only cookie first, then fallback to Bearer header
    let token = req.cookies?.[AUTH_COOKIE_NAME];

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return sendError(res, 401, 'Authentication required. Please sign in.');
    }

    // 2. Verify token
    const decoded = verifyToken(token);

    // 3. Verify admin exists in database
    const admin = await Admin.findById(decoded.id).select('-passwordHash');
    if (!admin) {
      return sendError(res, 401, 'Invalid session or account no longer exists.');
    }

    // 4. Attach authenticated user to request
    req.admin = {
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: 'admin',
    };

    return next();
  } catch (error) {
    return sendError(res, 401, 'Invalid or expired session. Please sign in again.');
  }
};
