import { Request, Response } from 'express';
import { Service } from '../models/Service';
import { sendSuccess, sendError } from '../utils/apiResponse';

/**
 * Public: Get active services
 * GET /api/services
 */
export const getPublicServices = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const services = await Service.find({ active: true }).sort({ order: 1 });
    return sendSuccess(res, 200, 'Services retrieved successfully.', services);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve services.');
  }
};

/**
 * Admin: Get all services
 * GET /api/admin/services
 */
export const getAdminServices = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const services = await Service.find().sort({ order: 1 });
    return sendSuccess(res, 200, 'All services retrieved.', services);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve services.');
  }
};

/**
 * Admin: Create service
 * POST /api/admin/services
 */
export const createService = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description, icon, order, active } = req.body;

    if (!title || !description) {
      return sendError(res, 400, 'Title and description are required.');
    }

    const service = await Service.create({
      title,
      description,
      icon: icon || '',
      order: Number(order) || 0,
      active: active !== undefined ? Boolean(active) : true,
    });

    return sendSuccess(res, 201, 'Service created successfully.', service);
  } catch (error) {
    return sendError(res, 500, 'Failed to create service.');
  }
};

/**
 * Admin: Update service
 * PUT /api/admin/services/:id
 */
export const updateService = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, description, icon, order, active } = req.body;

    const service = await Service.findById(id);
    if (!service) {
      return sendError(res, 404, 'Service not found.');
    }

    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (icon !== undefined) service.icon = icon;
    if (order !== undefined) service.order = Number(order);
    if (active !== undefined) service.active = Boolean(active);

    await service.save();

    return sendSuccess(res, 200, 'Service updated successfully.', service);
  } catch (error) {
    return sendError(res, 500, 'Failed to update service.');
  }
};

/**
 * Admin: Delete service
 * DELETE /api/admin/services/:id
 */
export const deleteService = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return sendError(res, 404, 'Service not found.');
    }
    return sendSuccess(res, 200, 'Service deleted successfully.', { id });
  } catch (error) {
    return sendError(res, 500, 'Failed to delete service.');
  }
};
