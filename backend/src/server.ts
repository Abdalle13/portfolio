import http from 'http';
import { createApp } from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';

const startServer = async () => {
  const app = createApp();
  const server = http.createServer(app);

  // Connect to MongoDB
  try {
    await connectDatabase();
  } catch (error) {
    console.error('[DATABASE] Warning: Failed to connect to MongoDB on startup.');
    console.error('[DATABASE] Ensure MongoDB is running locally or check DATABASE_URL in .env');
  }

  server.listen(env.PORT, () => {
    console.log(`[SERVER] Portfolio Backend running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    console.log(`[SERVER] Health check available at: http://localhost:${env.PORT}/api/health`);
  });

  // Graceful shutdown handling
  const handleShutdown = async (signal: string) => {
    console.log(`[SERVER] Received ${signal}. Gracefully shutting down...`);
    await disconnectDatabase();
    server.close(() => {
      console.log('[SERVER] HTTP server closed cleanly.');
      process.exit(0);
    });

    // Force close after 10s timeout
    setTimeout(() => {
      console.error('[SERVER] Forced shutdown due to timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));

  process.on('unhandledRejection', (reason: Error | unknown) => {
    console.error('[SERVER] Unhandled Promise Rejection:', reason);
  });

  process.on('uncaughtException', (error: Error) => {
    console.error('[SERVER] Uncaught Exception:', error);
    process.exit(1);
  });
};

startServer();
