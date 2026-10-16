/**
 * Admin Seed Script
 * -----------------
 * Creates the initial admin user in the database using credentials from .env
 * Run with: npm run seed:admin
 */

import dotenv from 'dotenv';
import path from 'path';

// Load .env before anything else
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Admin } from '../models/Admin';

const MONGO_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/abdalle_portfolio';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Abdalle Hussein';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD || 'Admin@123456';

async function seedAdmin(): Promise<void> {
  console.log('\n🌱  Admin Seed Script');
  console.log('─────────────────────────────────────');

  try {
    // 1. Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log(`✅ Connected to MongoDB: ${MONGO_URI}`);

    // 2. Check if admin already exists
    const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });

    if (existing) {
      console.log(`⚠️  Admin already exists with email: ${ADMIN_EMAIL}`);
      console.log('   No changes made. If you want to reset the password, use the CMS or run seed:admin:reset.');
      process.exit(0);
    }

    // 3. Hash the password
    const SALT_ROUNDS = 12;
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);

    // 4. Create admin document
    const admin = await Admin.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL.toLowerCase(),
      passwordHash,
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('─────────────────────────────────────');
    console.log(`   Name  : ${admin.name}`);
    console.log(`   Email : ${admin.email}`);
    console.log(`   ID    : ${admin._id}`);
    console.log('─────────────────────────────────────');
    console.log('🔐 Keep your credentials safe!');
    console.log('   You can now log in to the Admin CMS.\n');

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('\n❌ Seed failed:', error.message);
    } else {
      console.error('\n❌ Seed failed:', error);
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
  }
}

seedAdmin();
