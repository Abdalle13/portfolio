import { Router } from 'express';
import { healthRoutes } from './health.routes';
import { authRoutes } from './auth.routes';

const router = Router();

// Mount subroutes
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);

export const apiRoutes = router;
