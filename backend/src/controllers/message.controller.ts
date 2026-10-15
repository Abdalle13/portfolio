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
 */
export const createPublicMessage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, message, honeypot, website } = req.body;

    // Honeypot check: Bots usually auto-fill hidden input fields
    if (honeypot || website) {
      console.warn('[Message Controller] Honeypot field triggered. Silently ignoring bot submission.');
      return sendSuccess(res, 201, 'Your message has been received! Thank you for reaching out.', {
        id: 'mock-bot-id',
      });
    }

    if (!name || typeof name !== 'string' || !name.trim()) {
      return sendError(res, 400, 'Please provide your name.');
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return sendError(res, 400, 'Please provide your email address.');
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return sendError(res, 400, 'Please provide a message.');
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();

    if (trimmedName.length > 100) {
      return sendError(res, 400, 'Name must be under 100 characters.');
    }

    if (trimmedMessage.length < 5) {
      return sendError(res, 400, 'Message must be at least 5 characters long.');
    }

    if (trimmedMessage.length > 5000) {
      return sendError(res, 400, 'Message cannot exceed 5000 characters.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return sendError(res, 400, 'Please provide a valid email address.');
    }

    // 1. Save message to MongoDB
    const newMessage = await Message.create({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      read: false,
      status: 'unread',
    });

    // 2. Dispatch email notification asynchronously (non-blocking)
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


