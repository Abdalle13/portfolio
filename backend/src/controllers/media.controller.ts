import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getImageKitClient, isImageKitConfigured } from '../config/imagekit';
import { sendSuccess, sendError } from '../utils/apiResponse';

// --- Multer Memory Storage Configuration --------------------------------------
const storage = multer.memoryStorage();

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
  'application/pdf',
];

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Only JPEG, PNG, WebP, SVG, GIF, and PDF are supported.'));
    }
  },
});

// Local fallback storage directory (use /tmp in serverless environments like Vercel)
const LOCAL_UPLOADS_DIR = process.env.VERCEL
  ? path.join('/tmp', 'uploads')
  : path.resolve(__dirname, '../../uploads');

const ensureLocalUploadsDir = (): void => {
  try {
    if (!fs.existsSync(LOCAL_UPLOADS_DIR)) {
      fs.mkdirSync(LOCAL_UPLOADS_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn('[Storage] Read-only filesystem detected, skipping local folder creation.');
  }
};

/**
 * Admin: Get ImageKit client-side upload authentication parameters
 * GET /api/admin/media/auth
 */
export const getMediaAuth = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const ik = getImageKitClient();
    if (!ik) {
      return sendError(res, 503, 'ImageKit credentials are not configured.');
    }

    const authParams = ik.getAuthenticationParameters();
    return sendSuccess(res, 200, 'Authentication parameters generated.', authParams);
  } catch (error) {
    return sendError(res, 500, 'Failed to generate ImageKit authentication parameters.');
  }
};

/**
 * Admin: Upload media file (ImageKit or local dev fallback)
 * POST /api/admin/media/upload
 */
export const uploadMedia = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!req.file) {
      return sendError(res, 400, 'No file uploaded.');
    }

    const file = req.file;
    const folder = (req.body.folder as string) || '/portfolio';
    const ik = getImageKitClient();

    // 1. Production / Live ImageKit Upload
    if (isImageKitConfigured() && ik) {
      const uploadResponse = await ik.upload({
        file: file.buffer,
        fileName: `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
        folder,
        useUniqueFileName: true,
      });

      return sendSuccess(res, 201, 'Media uploaded to ImageKit successfully.', {
        fileId: uploadResponse.fileId,
        name: uploadResponse.name,
        url: uploadResponse.url,
        thumbnailUrl: uploadResponse.thumbnailUrl || uploadResponse.url,
        size: uploadResponse.size,
        fileType: uploadResponse.fileType,
      });
    }

    // 2. Local Fallback for offline development
    ensureLocalUploadsDir();
    const safeFileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    const localFilePath = path.join(LOCAL_UPLOADS_DIR, safeFileName);
    fs.writeFileSync(localFilePath, file.buffer);

    const localUrl = `/uploads/${safeFileName}`;

    return sendSuccess(res, 201, 'Media saved locally (ImageKit credentials not provided in .env).', {
      fileId: safeFileName,
      name: file.originalname,
      url: localUrl,
      thumbnailUrl: localUrl,
      size: file.size,
      fileType: file.mimetype.split('/')[1] || 'image',
    });
  } catch (error: any) {
    return sendError(res, 500, error.message || 'Failed to upload media file.');
  }
};

/**
 * Admin: Get media list from ImageKit
 * GET /api/admin/media
 */
export const getMediaList = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const ik = getImageKitClient();

    if (isImageKitConfigured() && ik) {
      const files = await ik.listFiles({
        path: '/portfolio',
        limit: 50,
      });
      return sendSuccess(res, 200, 'Media files retrieved from ImageKit.', files);
    }

    // Local fallback file listing
    if (!fs.existsSync(LOCAL_UPLOADS_DIR)) {
      return sendSuccess(res, 200, 'Local media assets retrieved.', []);
    }

    const localFiles = fs.readdirSync(LOCAL_UPLOADS_DIR).map((filename) => {
      const stats = fs.statSync(path.join(LOCAL_UPLOADS_DIR, filename));
      return {
        fileId: filename,
        name: filename,
        url: `/uploads/${filename}`,
        thumbnailUrl: `/uploads/${filename}`,
        size: stats.size,
        fileType: filename.split('.').pop() || 'image',
        createdAt: stats.birthtime,
      };
    });

    return sendSuccess(res, 200, 'Local media assets retrieved.', localFiles);
  } catch (error: any) {
    return sendError(res, 500, error.message || 'Failed to retrieve media files.');
  }
};

/**
 * Admin: Delete media file from ImageKit
 * DELETE /api/admin/media/:fileId
 */
export const deleteMedia = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { fileId } = req.params;
    const ik = getImageKitClient();

    if (isImageKitConfigured() && ik) {
      await ik.deleteFile(fileId);
      return sendSuccess(res, 200, 'Media asset deleted from ImageKit.', { fileId });
    }

    // Local fallback deletion
    const localPath = path.join(LOCAL_UPLOADS_DIR, fileId);
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }

    return sendSuccess(res, 200, 'Media asset deleted successfully.', { fileId });
  } catch (error: any) {
    return sendError(res, 500, error.message || 'Failed to delete media asset.');
  }
};
