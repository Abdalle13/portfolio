import { beforeAll, afterAll, afterEach } from 'vitest';
import mongoose from 'mongoose';
import { connectDatabase } from '../src/config/database';

export const setupTestDB = () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await connectDatabase();
    }
  });

  afterAll(async () => {
    try {
      await mongoose.disconnect();
    } catch (err) {
      console.error('Error tearing down test database:', err);
    }
  });

  afterEach(async () => {
    if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
      const collections = await mongoose.connection.db.collections();
      for (const collection of collections) {
        // Do not delete admin during tests
        if (collection.collectionName !== 'admins') {
          await collection.deleteMany({});
        }
      }
    }
  });
};
