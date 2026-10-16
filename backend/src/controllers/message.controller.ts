import { Request, Response } from 'express';
import { Message } from '../models/Message';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { sendContactNotification } from '../services/mail.service';

/**
 * Admin: Get messages with optional filtering
 * GET /api/admin/messages
 */
export const getAdminMessages = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { status, read } = req.query;
    const filter: Record<string, unknown> = {};

    if (status) filter.status = status;
    if (read !== undefined) filter.read = read === 'true';

    const messages = await Message.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, 200, 'Messages retrieved successfully.', messages);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve messages.');
  }
};

/**
 * Admin: Get single message by ID
 * GET /api/admin/messages/:id
 */
export const getAdminMessageById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return sendError(res, 404, 'Message not found.');
    }

    // Auto-mark as read on view if unread
    if (!message.read) {
      message.read = true;
      if (message.status === 'unread') {
        message.status = 'read';
      }
      await message.save();
    }

    return sendSuccess(res, 200, 'Message retrieved.', message);
  } catch (error) {
    return sendError(res, 500, 'Failed to retrieve message.');
  }
};

/**
 * Admin: Toggle message read status
 * PATCH /api/admin/messages/:id/read
 */
export const toggleMessageRead = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { read, status } = req.body;

    const message = await Message.findById(id);
    if (!message) {
      return sendError(res, 404, 'Message not found.');
    }

    if (read !== undefined) {
      message.read = Boolean(read);
      if (message.read && message.status === 'unread') {
        message.status = 'read';
      }
    }

    if (status !== undefined) {
      const validStatuses = ['unread', 'read', 'archived'];
      if (validStatuses.includes(status)) {
        message.status = status;
        message.read = status !== 'unread';
      }
    }

    await message.save();

    return sendSuccess(res, 200, 'Message status updated.', message);
  } catch (error) {
    return sendError(res, 500, 'Failed to update message status.');
  }
};

/**
 * Admin: Delete message
 * DELETE /api/admin/messages/:id
 */
export const deleteMessage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return sendError(res, 404, 'Message not found.');
    }
    return sendSuccess(res, 200, 'Message deleted successfully.', { id });
  } catch (error) {
    return sendError(res, 500, 'Failed to delete message.');
  }
};

/**
 * Public: Send contact message
 * POST /api/contact
 * Body is pre-validated and sanitised by validateContact middleware (Zod).
 */
export const createPublicMessage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, message, honeypot, website } = req.body;

    // Honeypot check: bots usually auto-fill hidden fields
    if (honeypot || website) {
      console.warn('[Message Controller] Honeypot triggered — silently dropping bot submission.');
      return sendSuccess(res, 201, 'Your message has been received! Thank you for reaching out.', {
        id: 'mock-bot-id',
      });
    }

    // Save message to MongoDB (values already trimmed & validated by Zod)
    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      read: false,
      status: 'unread',
    });

    // Dispatch email notification asynchronously (non-blocking)
    sendContactNotification({
      id: newMessage._id.toString(),
      name: newMessage.name,
      email: newMessage.email,
      message: newMessage.message,
      createdAt: newMessage.createdAt,
    }).catch((err) => {
      console.error('[Message Controller] Error dispatching mail notification:', err);
    });

    return sendSuccess(res, 201, 'Your message has been received! Thank you for reaching out.', {
      id: newMessage._id,
    });
  } catch (error) {
    console.error('[Message Controller] Failed to create message:', error);
    return sendError(res, 500, 'Failed to send message. Please try again later.');
  }
};
