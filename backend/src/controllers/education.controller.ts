import { Request, Response } from 'express';
import { Education } from '../models/Education';
import { sendSuccess, sendError } from '../utils/apiResponse';

/**
 * Public: Get education timeline
 * GET /api/education
 */
export const getPublicEducation = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const education = await Education.find().sort({ order: 1 });
    return sendSuccess(res, 200, 'Education milestones retrieved.', education);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve education records.');
  }
};

/**
 * Admin: Get all education entries
 * GET /api/admin/education
 */
export const getAdminEducation = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const education = await Education.find().sort({ order: 1 });
    return sendSuccess(res, 200, 'All education records retrieved.', education);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve education records.');
  }
};

/**
 * Admin: Create education entry
 * POST /api/admin/education
 */
export const createEducation = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { institution, level, degree, startYear, endYear, description, order } = req.body;

    if (!institution || !level || !degree || !startYear || !endYear) {
      return sendError(res, 400, 'Institution, level, degree, startYear, and endYear are required.');
    }

    const item = await Education.create({
      institution,
      level,
      degree,
      startYear,
      endYear,
      description: description || '',
      order: Number(order) || 0,
    });

    return sendSuccess(res, 201, 'Education record created successfully.', item);
  } catch (error) {
    return sendError(res, 500, 'Failed to create education record.');
  }
};

/**
 * Admin: Update education entry
 * PUT /api/admin/education/:id
 */
export const updateEducation = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { institution, level, degree, startYear, endYear, description, order } = req.body;

    const item = await Education.findById(id);
    if (!item) {
      return sendError(res, 404, 'Education record not found.');
    }

    if (institution !== undefined) item.institution = institution;
    if (level !== undefined) item.level = level;
    if (degree !== undefined) item.degree = degree;
    if (startYear !== undefined) item.startYear = startYear;
    if (endYear !== undefined) item.endYear = endYear;
    if (description !== undefined) item.description = description;
    if (order !== undefined) item.order = Number(order);

    await item.save();

    return sendSuccess(res, 200, 'Education record updated successfully.', item);
  } catch (error) {
    return sendError(res, 500, 'Failed to update education record.');
  }
};

/**
 * Admin: Delete education entry
 * DELETE /api/admin/education/:id
 */
export const deleteEducation = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const item = await Education.findByIdAndDelete(id);
    if (!item) {
      return sendError(res, 404, 'Education record not found.');
    }
    return sendSuccess(res, 200, 'Education record deleted successfully.', { id });
  } catch (error) {
    return sendError(res, 500, 'Failed to delete education record.');
  }
};
