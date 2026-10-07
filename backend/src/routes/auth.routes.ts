import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { login, logout, getMe } from '../controllers/auth.controller';
import { validateLoginInput } from '../validators/auth.validator';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Dedicated brute-force rate limiter for authentication
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
});

router.post('/login', loginLimiter, validateLoginInput, login);
router.post('/logout', logout);
router.get('/me', requireAuth, getMe);

export const authRoutes = router;
