import { Router } from 'express';
import { healthRoutes } from './health.routes';
import { authRoutes } from './auth.routes';
import { publicRoutes } from './public.routes';
import { adminRoutes } from './admin.routes';

const router = Router();

// Mount subroutes
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/', publicRoutes);

export const apiRoutes = router;
