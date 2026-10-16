import dns from 'dns';
import mongoose from 'mongoose';
import { env } from './env';

// Fallback for Windows / ISP environments that reject DNS SRV queries
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore in environments where setServers is restricted
}

export const connectDatabase = async (): Promise<typeof mongoose> => {
  try {
    const conn = await mongoose.connect(env.DATABASE_URL);
    console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('[DATABASE] MongoDB connection error:', error);
    // In production or tests, we may handle retries; rethrow so caller is aware
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('[DATABASE] MongoDB connection closed.');
  } catch (error) {
    console.error('[DATABASE] Error disconnecting from MongoDB:', error);
  }
};
