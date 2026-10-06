import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import {
  getAdminProjects,
  createProject,
  getAdminProjectById,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import {
  getAdminSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skill.controller';
import {
  getAdminEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/education.controller';
import {
  getAdminServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller';
import {
  getAdminMessages,
  getAdminMessageById,
  toggleMessageRead,
  deleteMessage,
} from '../controllers/message.controller';
import { getProfile, updateProfile } from '../controllers/profile.controller';
import { getSettings, updateSettings } from '../controllers/setting.controller';
import { getDashboardStats } from '../controllers/dashboard.controller';

const router = Router();

// Protect ALL admin routes with requireAuth middleware
router.use(requireAuth);

// 1. Dashboard
router.get('/dashboard', getDashboardStats);

// 2. Projects CRUD
router.get('/projects', getAdminProjects);
router.post('/projects', createProject);
router.get('/projects/:id', getAdminProjectById);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// 3. Skills CRUD
router.get('/skills', getAdminSkills);
router.post('/skills', createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

// 4. Education CRUD
router.get('/education', getAdminEducation);
router.post('/education', createEducation);
router.put('/education/:id', updateEducation);
router.delete('/education/:id', deleteEducation);

// 5. Services CRUD
router.get('/services', getAdminServices);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

// 6. Messages Management
router.get('/messages', getAdminMessages);
router.get('/messages/:id', getAdminMessageById);
router.patch('/messages/:id/read', toggleMessageRead);
router.delete('/messages/:id', deleteMessage);

// 7. Profile
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// 8. Site Settings
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

export const adminRoutes = router;
