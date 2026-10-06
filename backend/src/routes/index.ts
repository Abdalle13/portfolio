import { Router } from 'express';
import { healthRoutes } from './health.routes';

const router = Router();

// Mount subroutes
router.use('/health', healthRoutes);

export const apiRoutes = router;
