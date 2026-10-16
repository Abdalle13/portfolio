import dns from 'dns';
import mongoose from 'mongoose';
import { createApp } from '../src/app';

// DNS SRV resolution fallback for serverless environments
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if restricted
}

// Cache the db connection across serverless warm invocations
let isConnected = false;

const connectDB = async (): Promise<void> => {
  if (isConnected && mongoose.connection.readyState === 1) return;

  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error('[DB] DATABASE_URL environment variable is missing.');
    return;
  }

  try {
    await mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('[DB] Connected to MongoDB Atlas');
  } catch (err) {
    console.error('[DB] MongoDB Atlas connection error in serverless handler:', err);
  }
};

// Build the Express app
const app = createApp();

// Vercel serverless handler
export default async function handler(req: any, res: any): Promise<void> {
  await connectDB();
  return app(req, res);
}
