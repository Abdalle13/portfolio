import { Router, Request, Response } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { env } from '../config/env';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const healthData = {
    status: 'healthy',
    environment: env.NODE_ENV,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  };

  return sendSuccess(res, 200, 'Server is running smoothly', healthData);
});

export const healthRoutes = router;
