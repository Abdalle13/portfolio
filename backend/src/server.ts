import http from 'http';
import { createApp } from './app';
import { env } from './config/env';

const app = createApp();
const server = http.createServer(app);

server.listen(env.PORT, () => {
  console.log(`[SERVER] Portfolio Backend running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  console.log(`[SERVER] Health check available at: http://localhost:${env.PORT}/api/health`);
});

// Graceful shutdown handling
const handleShutdown = (signal: string) => {
  console.log(`[SERVER] Received ${signal}. Gracefully shutting down...`);
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
