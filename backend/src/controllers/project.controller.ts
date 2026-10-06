import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { slugify } from '../utils/slugify';

/**
 * Public: Get all published projects
 * GET /api/projects
 */
export const getPublicProjects = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const projects = await Project.find({ published: true }).sort({ order: 1, createdAt: -1 });
    return sendSuccess(res, 200, 'Projects retrieved successfully.', projects);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve projects.');
  }
};

/**
 * Public: Get published project by slug
 * GET /api/projects/:slug
 */
export const getPublicProjectBySlug = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug, published: true });
    if (!project) {
      return sendError(res, 404, 'Project not found.');
    }
    return sendSuccess(res, 200, 'Project details retrieved.', project);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve project details.');
  }
};

/**
 * Admin: Get all projects (including unpublished)
 * GET /api/admin/projects
 */
export const getAdminProjects = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    return sendSuccess(res, 200, 'All projects retrieved.', projects);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve projects.');
  }
};

/**
 * Admin: Get single project by ID
 * GET /api/admin/projects/:id
 */
export const getAdminProjectById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return sendError(res, 404, 'Project not found.');
    }
    return sendSuccess(res, 200, 'Project retrieved.', project);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve project.');
  }
};

/**
 * Admin: Create project
 * POST /api/admin/projects
 */
export const createProject = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      title,
      slug: customSlug,
      description,
      image,
      technologies,
      githubUrl,
      liveUrl,
      featured,
      published,
      order,
    } = req.body;

    if (!title || !description) {
      return sendError(res, 400, 'Title and description are required.');
    }

    const slug = customSlug ? slugify(customSlug) : slugify(title);

    // Check slug uniqueness
    const existing = await Project.findOne({ slug });
    if (existing) {
      return sendError(res, 409, 'A project with this slug already exists.');
    }

    const project = await Project.create({
      title,
      slug,
      description,
      image: image || '',
      technologies: Array.isArray(technologies) ? technologies : [],
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      featured: Boolean(featured),
      published: published !== undefined ? Boolean(published) : true,
      order: Number(order) || 0,
    });

    return sendSuccess(res, 201, 'Project created successfully.', project);
  } catch (error) {
    return sendError(res, 500, 'Failed to create project.');
  }
};

/**
 * Admin: Update project
 * PUT /api/admin/projects/:id
 */
export const updateProject = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const {
      title,
      slug: customSlug,
      description,
      image,
      technologies,
      githubUrl,
      liveUrl,
      featured,
      published,
      order,
    } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return sendError(res, 404, 'Project not found.');
    }

    if (customSlug && customSlug !== project.slug) {
      const slug = slugify(customSlug);
      const existing = await Project.findOne({ slug, _id: { $ne: id } });
      if (existing) {
        return sendError(res, 409, 'A project with this slug already exists.');
      }
      project.slug = slug;
    }

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (image !== undefined) project.image = image;
    if (technologies !== undefined) {
      project.technologies = Array.isArray(technologies) ? technologies : [];
    }
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (featured !== undefined) project.featured = Boolean(featured);
    if (published !== undefined) project.published = Boolean(published);
    if (order !== undefined) project.order = Number(order);

    await project.save();

    return sendSuccess(res, 200, 'Project updated successfully.', project);
  } catch (error) {
    return sendError(res, 500, 'Failed to update project.');
  }
};

/**
 * Admin: Delete project
 * DELETE /api/admin/projects/:id
 */
export const deleteProject = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return sendError(res, 404, 'Project not found.');
    }
    return sendSuccess(res, 200, 'Project deleted successfully.', { id });
  } catch (error) {
    return sendError(res, 500, 'Failed to delete project.');
  }
};
