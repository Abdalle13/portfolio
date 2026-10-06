import { Request, Response } from 'express';
import { SiteSetting } from '../models/SiteSetting';
import { sendSuccess, sendError } from '../utils/apiResponse';

/**
 * Public & Admin: Get site settings
 * GET /api/settings or GET /api/admin/settings
 */
export const getSettings = async (_req: Request, res: Response): Promise<Response> => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create({});
    }
    return sendSuccess(res, 200, 'Site settings retrieved.', settings);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve site settings.');
  }
};

/**
 * Admin: Update site settings
 * PUT /api/admin/settings
 */
export const updateSettings = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      siteTitle,
      siteDescription,
      socialLinks,
      contactEmail,
      footerText,
      seoTitle,
      seoDescription,
    } = req.body;

    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = new SiteSetting();
    }

    if (siteTitle !== undefined) settings.siteTitle = siteTitle;
    if (siteDescription !== undefined) settings.siteDescription = siteDescription;
    if (socialLinks !== undefined) settings.socialLinks = { ...settings.socialLinks, ...socialLinks };
    if (contactEmail !== undefined) settings.contactEmail = contactEmail;
    if (footerText !== undefined) settings.footerText = footerText;
    if (seoTitle !== undefined) settings.seoTitle = seoTitle;
    if (seoDescription !== undefined) settings.seoDescription = seoDescription;

    await settings.save();

    return sendSuccess(res, 200, 'Site settings updated successfully.', settings);
  } catch (error) {
    return sendError(res, 500, 'Failed to update site settings.');
  }
};
