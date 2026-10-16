/**
 * Vercel Serverless Entry Point
 * ─────────────────────────────
 * This file is the handler for Vercel serverless functions.
 * It connects to MongoDB once (cached across warm invocations)
 * and exports the Express app as the default handler.
 */

import mongoose from 'mongoose';
import { createApp } from '../app';

// Cache the db connection across serverless warm invocations
let isConnected = false;

const connectDB = async (): Promise<void> => {
  if (isConnected && mongoose.connection.readyState === 1) return;

  const uri = process.env.DATABASE_URL;
  if (!uri) {
    throw new Error('[DB] DATABASE_URL environment variable is not set.');
  }

  await mongoose.connect(uri, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000,
  });

  isConnected = true;
  console.log('[DB] Connected to MongoDB Atlas');
};

// Build the Express app
const app = createApp();

// Vercel serverless handler — wraps every request
export default async function handler(req: any, res: any): Promise<void> {
  await connectDB();
  return app(req, res);
}
