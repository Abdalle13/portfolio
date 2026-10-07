import { Request } from 'express';

export interface AuthenticatedAdmin {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export interface AuthRequest extends Request {
  admin?: AuthenticatedAdmin;
}
