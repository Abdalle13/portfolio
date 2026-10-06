import bcrypt from 'bcrypt';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { env } from '../config/env';
import {
  Admin,
  Profile,
  Project,
  Skill,
  Education,
  Service,
  SiteSetting,
} from '../models';

export const seedDatabase = async () => {
  try {
    console.log('[SEED] Connecting to database...');
    await connectDatabase();

    // 1. Seed or update Admin
    const existingAdmin = await Admin.findOne({ email: env.ADMIN_EMAIL.toLowerCase() });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(env.ADMIN_INITIAL_PASSWORD, 12);
      await Admin.create({
        name: env.ADMIN_NAME,
        email: env.ADMIN_EMAIL.toLowerCase(),
        passwordHash,
      });
      console.log(`[SEED] Created default admin (${env.ADMIN_EMAIL})`);
    } else {
      console.log(`[SEED] Admin already exists (${env.ADMIN_EMAIL})`);
    }

    // 2. Seed Profile
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create({
        name: 'Abdalle Hussein',
        title: 'Full-Stack Developer',
        location: 'Mogadishu, Somalia',
        email: 'contact@abdalle.dev',
        about:
          'I’m a Computer Science graduate and Full-Stack Developer focused on building practical, reliable web applications that solve real-world problems. Passionate about software architecture, clean APIs, and scalable frontends.',
        heroImage: '',
        aboutImage: '',
        cv: '',
      });
      console.log('[SEED] Default profile initialized.');
    }

    // 3. Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      const defaultSkills = [
        // Frontend
        { name: 'HTML', category: 'Frontend', order: 1 },
        { name: 'CSS', category: 'Frontend', order: 2 },
        { name: 'JavaScript', category: 'Frontend', order: 3 },
        { name: 'TypeScript', category: 'Frontend', order: 4 },
        { name: 'React', category: 'Frontend', order: 5 },
        { name: 'Next.js', category: 'Frontend', order: 6 },
        { name: 'Tailwind CSS', category: 'Frontend', order: 7 },
        // Backend
        { name: 'Node.js', category: 'Backend', order: 8 },
        { name: 'Express.js', category: 'Backend', order: 9 },
        { name: 'REST APIs', category: 'Backend', order: 10 },
        // Database
        { name: 'MongoDB', category: 'Database', order: 11 },
        { name: 'Mongoose', category: 'Database', order: 12 },
        // Tools & Platforms
        { name: 'Git', category: 'Tools & Platforms', order: 13 },
        { name: 'GitHub', category: 'Tools & Platforms', order: 14 },
        { name: 'VS Code', category: 'Tools & Platforms', order: 15 },
        { name: 'Postman', category: 'Tools & Platforms', order: 16 },
        { name: 'Vercel', category: 'Tools & Platforms', order: 17 },
        { name: 'ImageKit', category: 'Tools & Platforms', order: 18 },
      ];

      await Skill.insertMany(defaultSkills);
      console.log(`[SEED] Inserted ${defaultSkills.length} default skills.`);
    }

    // 4. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const defaultProjects = [
        {
          title: 'AgriSense',
          slug: 'agrisense',
          description:
            'Agricultural monitoring and data management platform for analyzing soil conditions, crop metrics, and yield forecasting.',
          technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
          githubUrl: 'https://github.com/Abdalle13/agrisense',
          liveUrl: '',
          featured: true,
          published: true,
          order: 1,
        },
        {
          title: 'Al-Hikma School Management System',
          slug: 'al-hikma-school-management-system',
          description:
            'Comprehensive academic operations platform handling student records, attendance tracking, teacher schedules, and fee records.',
          technologies: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB'],
          githubUrl: 'https://github.com/Abdalle13/al-hikma-school',
          liveUrl: '',
          featured: true,
          published: true,
          order: 2,
        },
        {
          title: 'KOBAC Electronics',
          slug: 'kobac-electronics',
          description:
            'Electronics eCommerce and inventory system featuring product catalog filtering, order placement, and real-time stock monitoring.',
          technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'],
          githubUrl: 'https://github.com/Abdalle13/kobac-electronics',
          liveUrl: '',
          featured: true,
          published: true,
          order: 3,
        },
        {
          title: 'SmartClinic',
          slug: 'smartclinic',
          description:
            'Clinical healthcare records and patient appointment booking portal with doctor schedule tracking and visit summaries.',
          technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose'],
          githubUrl: 'https://github.com/Abdalle13/smartclinic',
          liveUrl: '',
          featured: false,
          published: true,
          order: 4,
        },
        {
          title: 'Barwaaqo Restaurant Management System',
          slug: 'barwaaqo-restaurant-management-system',
          description:
            'End-to-end POS, kitchen order management, table tracking, and daily billing operations system.',
          technologies: ['React', 'TypeScript', 'Express.js', 'MongoDB', 'Tailwind CSS'],
          githubUrl: 'https://github.com/Abdalle13/barwaaqo-restaurant',
          liveUrl: '',
          featured: false,
          published: true,
          order: 5,
        },
      ];

      await Project.insertMany(defaultProjects);
      console.log(`[SEED] Inserted ${defaultProjects.length} portfolio projects.`);
    }

    // 5. Seed Education
    const educationCount = await Education.countDocuments();
    if (educationCount === 0) {
      const defaultEducation = [
        {
          institution: 'Ibnu Quzayma Primary and Secondary School',
          level: 'Primary Education',
          degree: 'Primary Certificate',
          startYear: '2015',
          endYear: '2019',
          description: 'Foundational primary education and early academic curriculum.',
          order: 1,
        },
        {
          institution: 'Al-Imra Primary and Secondary School',
          level: 'Secondary Education',
          degree: 'Secondary School Certificate',
          startYear: '2019',
          endYear: '2022',
          description: 'Secondary education with high focus on mathematics and scientific foundations.',
          order: 2,
        },
        {
          institution: 'Jamhuriya University of Science and Technology (JUST)',
          level: 'Undergraduate',
          degree: 'BSc in Computer Science',
          startYear: '2022',
          endYear: '2026',
          description: 'Core focus on software engineering, data structures, algorithms, databases, and web architectures.',
          order: 3,
        },
      ];

      await Education.insertMany(defaultEducation);
      console.log(`[SEED] Inserted ${defaultEducation.length} education entries.`);
    }

    // 6. Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      const defaultServices = [
        {
          title: 'Full-Stack Web Applications',
          description:
            'Building scalable, high-performance web applications with modern frontend frameworks and robust backend REST APIs.',
          icon: 'Layers',
          order: 1,
          active: true,
        },
        {
          title: 'Business Websites',
          description:
            'Developing professional, responsive, and SEO-optimized web presences tailored to corporate identity and conversion.',
          icon: 'Globe',
          order: 2,
          active: true,
        },
        {
          title: 'E-commerce Applications',
          description:
            'Designing secure e-commerce portals with catalog browsing, shopping carts, checkout workflows, and inventory tracking.',
          icon: 'ShoppingBag',
          order: 3,
          active: true,
        },
        {
          title: 'School Management Systems',
          description:
            'Custom academic platforms streamlining student registration, gradebook management, class scheduling, and staff records.',
          icon: 'GraduationCap',
          order: 4,
          active: true,
        },
        {
          title: 'Restaurant Management Systems',
          description:
            'Point of sale (POS) solutions, kitchen ticket management, table reservation, and real-time revenue reporting.',
          icon: 'UtensilsCrossed',
          order: 5,
          active: true,
        },
      ];

      await Service.insertMany(defaultServices);
      console.log(`[SEED] Inserted ${defaultServices.length} service entries.`);
    }

    // 7. Seed Site Settings
    const settingCount = await SiteSetting.countDocuments();
    if (settingCount === 0) {
      await SiteSetting.create({
        siteTitle: 'Abdalle Hussein | Full-Stack Developer',
        siteDescription:
          'Personal portfolio of Abdalle Hussein, a Computer Science graduate and Full-Stack Developer based in Mogadishu, Somalia.',
        socialLinks: {
          github: 'https://github.com/Abdalle13',
          linkedin: 'https://linkedin.com',
          instagram: 'https://instagram.com',
          tiktok: 'https://tiktok.com',
        },
        contactEmail: 'contact@abdalle.dev',
        footerText: '© Abdalle Hussein. All rights reserved.',
        seoTitle: 'Abdalle Hussein | Full-Stack Developer Portfolio',
        seoDescription:
          'BSc in Computer Science graduate from JUST building practical, reliable full-stack web applications.',
      });
      console.log('[SEED] Default site settings initialized.');
    }

    console.log('[SEED] Database seeding completed successfully.');
  } catch (error) {
    console.error('[SEED] Error seeding database:', error);
    throw error;
  } finally {
    await disconnectDatabase();
  }
};

// Allow running directly via CLI (tsx src/utils/seed.ts)
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('[SEED] Seed script exited.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[SEED] Failed to seed database:', err);
      process.exit(1);
    });
}
