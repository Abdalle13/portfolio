import { Request, Response } from 'express';
import { Skill } from '../models/Skill';
import { sendSuccess, sendError } from '../utils/apiResponse';

/**
 * Public: Get active skills
 * GET /api/skills
 */
export const getPublicSkills = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const skills = await Skill.find({ active: true }).sort({ category: 1, order: 1 });
    return sendSuccess(res, 200, 'Skills retrieved successfully.', skills);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve skills.');
  }
};

/**
 * Admin: Get all skills
 * GET /api/admin/skills
 */
export const getAdminSkills = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    return sendSuccess(res, 200, 'All skills retrieved.', skills);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve skills.');
  }
};

/**
 * Admin: Create skill
 * POST /api/admin/skills
 */
export const createSkill = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, category, icon, order, active } = req.body;

    if (!name || !category) {
      return sendError(res, 400, 'Skill name and category are required.');
    }

    const validCategories = ['Frontend', 'Backend', 'Database', 'Tools & Platforms'];
    if (!validCategories.includes(category)) {
      return sendError(res, 400, `Category must be one of: ${validCategories.join(', ')}`);
    }

    const skill = await Skill.create({
      name,
      category,
      icon: icon || '',
      order: Number(order) || 0,
      active: active !== undefined ? Boolean(active) : true,
    });

    return sendSuccess(res, 201, 'Skill created successfully.', skill);
  } catch (error) {
    return sendError(res, 500, 'Failed to create skill.');
  }
};

/**
 * Admin: Update skill
 * PUT /api/admin/skills/:id
 */
export const updateSkill = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, category, icon, order, active } = req.body;

    const skill = await Skill.findById(id);
    if (!skill) {
      return sendError(res, 404, 'Skill not found.');
    }

    if (name !== undefined) skill.name = name;
    if (category !== undefined) {
      const validCategories = ['Frontend', 'Backend', 'Database', 'Tools & Platforms'];
      if (!validCategories.includes(category)) {
        return sendError(res, 400, `Category must be one of: ${validCategories.join(', ')}`);
      }
      skill.category = category;
    }
    if (icon !== undefined) skill.icon = icon;
    if (order !== undefined) skill.order = Number(order);
    if (active !== undefined) skill.active = Boolean(active);

    await skill.save();

    return sendSuccess(res, 200, 'Skill updated successfully.', skill);
  } catch (error) {
    return sendError(res, 500, 'Failed to update skill.');
  }
};

/**
 * Admin: Delete skill
 * DELETE /api/admin/skills/:id
 */
export const deleteSkill = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return sendError(res, 404, 'Skill not found.');
    }
    return sendSuccess(res, 200, 'Skill deleted successfully.', { id });
  } catch (error) {
    return sendError(res, 500, 'Failed to delete skill.');
  }
};
