import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { createApp } from '../src/app';
import { setupTestDB } from './setup';
import { Admin } from '../src/models/Admin';

const app = createApp();
setupTestDB();

describe('Authentication API (/api/auth)', () => {
  beforeEach(async () => {
    await Admin.deleteMany({ email: 'admin@abdalle.dev' });
    const passwordHash = await bcrypt.hash('TestAdmin@123', 10);
    await Admin.create({
      name: 'Abdalle Hussein',
      email: 'admin@abdalle.dev',
      passwordHash,
    });
  });

  afterAll(async () => {
    await Admin.deleteMany({ email: 'admin@abdalle.dev' });
  });

  it('POST /api/auth/login should fail with 401 for wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@abdalle.dev',
        password: 'IncorrectPassword',
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/invalid email or password/i);
  });

  it('GET /api/auth/me should return 401 when no token is provided', async () => {
    const res = await request(app).get('/api/auth/me');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/auth/login should succeed with valid credentials and return auth cookie', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@abdalle.dev',
        password: 'TestAdmin@123',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.admin.email).toBe('admin@abdalle.dev');

    const rawCookies = res.headers['set-cookie'];
    expect(rawCookies).toBeDefined();
    const cookies: string[] = Array.isArray(rawCookies) ? rawCookies : [String(rawCookies)];
    expect(cookies.some((c: string) => c.includes('auth_token='))).toBe(true);
  });

  it('POST /api/auth/logout should clear session and return 200', async () => {
    const res = await request(app).post('/api/auth/logout');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
