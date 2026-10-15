import { Router } from 'express';
import { getProfile } from '../controllers/profile.controller';
import { getPublicProjects, getPublicProjectBySlug } from '../controllers/project.controller';
import { getPublicSkills } from '../controllers/skill.controller';
import { getPublicEducation } from '../controllers/education.controller';
import { getPublicServices } from '../controllers/service.controller';
import { getSettings } from '../controllers/setting.controller';
import { createPublicMessage } from '../controllers/message.controller';
import { contactLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public routes for portfolio website
router.get('/profile', getProfile);
router.get('/projects', getPublicProjects);
router.get('/projects/:slug', getPublicProjectBySlug);
router.get('/skills', getPublicSkills);
router.get('/education', getPublicEducation);
router.get('/services', getPublicServices);
router.get('/settings', getSettings);
router.post('/contact', contactLimiter, createPublicMessage);

export const publicRoutes = router;


