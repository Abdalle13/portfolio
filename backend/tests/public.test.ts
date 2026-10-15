import request from 'supertest';
import { createApp } from '../src/app';
import { setupTestDB } from './setup';
import { Profile } from '../src/models/Profile';
import { Project } from '../src/models/Project';
import { Skill } from '../src/models/Skill';
import { Education } from '../src/models/Education';
import { Service } from '../src/models/Service';
import { SiteSetting } from '../src/models/SiteSetting';

const app = createApp();
setupTestDB();

describe('Public Portfolio Endpoints', () => {
  beforeEach(async () => {
    // Seed sample test records
    await Profile.create({
      name: 'Abdalle Hussein',
      title: 'Full-Stack Developer',
      location: 'Mogadishu, Somalia',
      email: 'contact@abdalle.dev',
      about: 'Passionate developer dedicated to modern web engineering.',
    });

    await Project.create({
      title: 'Real Estate Platform',
      slug: 'real-estate-platform',
      description: 'Comprehensive property listing and management system.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      published: true,
      featured: true,
      order: 1,
    });

    await Skill.create({
      name: 'TypeScript',
      category: 'Frontend',
      active: true,
      order: 1,
    });

    await Education.create({
      institution: 'Jamhuriya University of Science and Technology (JUST)',
      level: 'Undergraduate',
      degree: 'BSc in Computer Science',
      startYear: '2021',
      endYear: '2025',
      order: 1,
    });

    await Service.create({
      title: 'Full-Stack Web Development',
      description: 'Modern, high-performance web applications built from scratch.',
      active: true,
      order: 1,
    });

    await SiteSetting.create({
      siteTitle: 'Abdalle Hussein | Portfolio',
      siteDescription: 'Professional Full-Stack Developer Portfolio',
      contactEmail: 'contact@abdalle.dev',
      socialLinks: {
        github: 'https://github.com/Abdalle13',
        linkedin: 'https://linkedin.com/in/abdalle',
      },
    });
  });

  it('GET /api/profile should return 200 with profile information', async () => {
    const res = await request(app).get('/api/profile');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Abdalle Hussein');
    expect(res.body.data.location).toBe('Mogadishu, Somalia');
  });

  it('GET /api/projects should return 200 with published projects list', async () => {
    const res = await request(app).get('/api/projects');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].slug).toBe('real-estate-platform');
  });

  it('GET /api/projects/:slug should return 200 with project details', async () => {
    const res = await request(app).get('/api/projects/real-estate-platform');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Real Estate Platform');
  });

  it('GET /api/projects/:slug should return 404 for unknown slug', async () => {
    const res = await request(app).get('/api/projects/unknown-slug-xyz');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/skills should return 200 with categorized skills', async () => {
    const res = await request(app).get('/api/skills');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0].name).toBe('TypeScript');
  });

  it('GET /api/education should return 200 with education milestones', async () => {
    const res = await request(app).get('/api/education');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].institution).toMatch(/Jamhuriya/i);
  });

  it('GET /api/services should return 200 with active services', async () => {
    const res = await request(app).get('/api/services');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].title).toBe('Full-Stack Web Development');
  });

  it('GET /api/settings should return 200 with site configuration', async () => {
    const res = await request(app).get('/api/settings');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.siteTitle).toBe('Abdalle Hussein | Portfolio');
  });
});
