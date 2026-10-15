import request from 'supertest';
import { createApp } from '../src/app';
import { setupTestDB } from './setup';
import { Message } from '../src/models/Message';

const app = createApp();
setupTestDB();

describe('Contact Submission API (POST /api/contact)', () => {
  it('should return 400 if name is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        email: 'visitor@example.com',
        message: 'Hello Abdalle, would love to connect!',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/name|string|expected/i);
  });

  it('should return 400 if email is invalid', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'invalid-email-address',
        message: 'Hello Abdalle, this is a test message.',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/valid email/i);
  });

  it('should return 400 if message is shorter than 5 characters', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'visitor@example.com',
        message: 'Hi',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/at least 5 characters/i);
  });

  it('should silently handle honeypot bot submissions without creating database records', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Spam Bot',
        email: 'spambot@example.com',
        message: 'Buy our fake products now!',
        honeypot: 'http://spam-link.com',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    const count = await Message.countDocuments({ email: 'spambot@example.com' });
    expect(count).toBe(0);
  });

  it('should successfully accept valid contact inquiry and save to database', async () => {
    const validData = {
      name: 'Sarah Connor',
      email: 'sarah@skynet-research.org',
      message: 'Hi Abdalle, I saw your full-stack portfolio and would like to discuss an opportunity.',
    };

    const res = await request(app)
      .post('/api/contact')
      .send(validData);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');

    const saved = await Message.findOne({ email: 'sarah@skynet-research.org' });
    expect(saved).not.toBeNull();
    expect(saved?.name).toBe('Sarah Connor');
    expect(saved?.read).toBe(false);
    expect(saved?.status).toBe('unread');
  });
});
