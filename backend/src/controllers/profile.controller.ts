import { Request, Response } from 'express';
import { Profile } from '../models/Profile';
import { sendSuccess, sendError } from '../utils/apiResponse';

/**
 * Public & Admin: Get profile data
 * GET /api/profile or GET /api/admin/profile
 */
export const getProfile = async (_req: Request, res: Response): Promise<Response> => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    return sendSuccess(res, 200, 'Profile retrieved successfully.', profile);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve profile data.');
  }
};

/**
 * Admin: Update profile data
 * PUT /api/admin/profile
 */
export const updateProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, title, location, email, about, heroImage, aboutImage, cv } = req.body;

    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile();
    }

    if (name !== undefined) profile.name = name;
    if (title !== undefined) profile.title = title;
    if (location !== undefined) profile.location = location;
    if (email !== undefined) profile.email = email;
    if (about !== undefined) profile.about = about;
    if (heroImage !== undefined) profile.heroImage = heroImage;
    if (aboutImage !== undefined) profile.aboutImage = aboutImage;
    if (cv !== undefined) profile.cv = cv;

    await profile.save();

    return sendSuccess(res, 200, 'Profile updated successfully.', profile);
  } catch (error) {
    return sendError(res, 500, 'Failed to update profile data.');
  }
};
