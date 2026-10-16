import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { env } from './config/env';
import { apiRoutes } from './routes';
import { notFoundHandler } from './middleware/notFoundHandler';
import { errorHandler } from './middleware/errorHandler';

export const createApp = (): Application => {
  const app = express();

  // 1. Security Headers via Helmet (with CSP tuned for portfolio SPA)
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],        // Vite dev injects inline scripts
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
          imgSrc: ["'self'", 'data:', 'https:', 'blob:'],  // ImageKit CDN + blobs
          connectSrc: ["'self'", env.FRONTEND_URL, 'http://localhost:5173'],
          frameSrc: ["'none'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: env.isProduction ? [] : null,
        },
      },
      crossOriginEmbedderPolicy: false,   // Required for ImageKit thumbnails
      hsts: env.isProduction
        ? { maxAge: 31536000, includeSubDomains: true, preload: true }
        : false,
    })
  );

  // 2. Cross-Origin Resource Sharing (CORS)
  // In production, restrict to the configured FRONTEND_URL; in dev also allow localhost
  const allowedOrigins = env.isProduction
    ? [
        env.FRONTEND_URL,                          // Primary production frontend URL from env
        'https://abdalle.netlify.app',             // Netlify default subdomain (update after deploy)
        /\.netlify\.app$/,                         // Any Netlify preview deploy
        /\.vercel\.app$/,                          // Any Vercel preview deploy
      ]
    : [env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (direct browser visits, server-to-server, health checkers)
        if (!origin) return callback(null, true);

        const isAllowed = (allowedOrigins as Array<string | RegExp>).some((o) =>
          typeof o === 'string' ? o === origin : o.test(origin)
        );
        if (isAllowed) return callback(null, true);
        return callback(new Error(`Origin ${origin} not allowed by CORS policy.`));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      optionsSuccessStatus: 200,
    })
  );

  // 3. Body Parsing & Cookies
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser(env.COOKIE_SECRET));

  // 4. MongoDB Query Sanitization — strips $ and . operators from user input
  //    to prevent NoSQL injection attacks (e.g. { "$gt": "" } in login body)
  app.use(
    mongoSanitize({
      replaceWith: '_',          // Replace $ / . with underscore instead of removing
      onSanitize: ({ req, key }) => {
        console.warn(`[Security] Sanitized suspicious key "${key}" from ${req.method} ${req.path}`);
      },
    })
  );

  // 5. Global Rate Limiter (broad protection; per-route limiters are layered on top)
  const globalLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.method === 'OPTIONS',   // Don't rate-limit preflight
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again later.',
    },
  });
  app.use('/api', globalLimiter);

  // Static Assets (uploads — served before API routes)
  app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

  // Root status endpoint for browser check
  app.get('/', (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'Abdalle Hussein Portfolio API is running smoothly.',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
      healthEndpoint: '/api/health',
    });
  });

  // 6. Mount API Routes
  app.use('/api', apiRoutes);

  // 7. 404 Route Handler
  app.use(notFoundHandler);

  // 8. Centralized Error Handler
  app.use(errorHandler);

  return app;
};
