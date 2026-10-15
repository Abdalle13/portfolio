import { Router } from 'express';
import { getProfile } from '../controllers/profile.controller';
import { getPublicProjects, getPublicProjectBySlug } from '../controllers/project.controller';
import { getPublicSkills } from '../controllers/skill.controller';
import { getPublicEducation } from '../controllers/education.controller';
import { getPublicServices } from '../controllers/service.controller';
import { getSettings } from '../controllers/setting.controller';
import { createPublicMessage } from '../controllers/message.controller';
import { contactLimiter } from '../middleware/rateLimiter';
import { validateContact } from '../validators/contact.validator';

const router = Router();

// Public routes for portfolio website
router.get('/profile', getProfile);
router.get('/projects', getPublicProjects);
router.get('/projects/:slug', getPublicProjectBySlug);
router.get('/skills', getPublicSkills);
router.get('/education', getPublicEducation);
router.get('/services', getPublicServices);
router.get('/settings', getSettings);

// Contact: rate-limit → Zod validation → controller
router.post('/contact', contactLimiter, validateContact, createPublicMessage);

export const publicRoutes = router;
