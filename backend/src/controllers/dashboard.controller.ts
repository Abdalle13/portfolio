import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { Skill } from '../models/Skill';
import { Education } from '../models/Education';
import { Service } from '../models/Service';
import { Message } from '../models/Message';
import { sendSuccess, sendError } from '../utils/apiResponse';

/**
 * Admin: Get comprehensive dashboard metrics & recent items
 * GET /api/admin/dashboard
 */
export const getDashboardStats = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [
      totalProjects,
      publishedProjects,
      featuredProjects,
      totalSkills,
      activeSkills,
      totalEducation,
      totalServices,
      activeServices,
      totalMessages,
      unreadMessages,
      recentProjects,
      recentMessages,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ published: true }),
      Project.countDocuments({ featured: true }),
      Skill.countDocuments(),
      Skill.countDocuments({ active: true }),
      Education.countDocuments(),
      Service.countDocuments(),
      Service.countDocuments({ active: true }),
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
      Project.find().sort({ createdAt: -1 }).limit(5),
      Message.find().sort({ createdAt: -1 }).limit(5),
    ]);

    const dashboardData = {
      metrics: {
        totalProjects,
        publishedProjects,
        featuredProjects,
        totalSkills,
        activeSkills,
        totalEducation,
        totalServices,
        activeServices,
        totalMessages,
        unreadMessages,
      },
      recentProjects,
      recentMessages,
      status: {
        portfolioOnline: true,
        databaseConnected: true,
        lastUpdated: new Date().toISOString(),
      },
    };

    return sendSuccess(res, 200, 'Dashboard statistics retrieved.', dashboardData);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve dashboard statistics.');
  }
};
