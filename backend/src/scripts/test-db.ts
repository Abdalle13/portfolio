import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

// Load .env from backend root
import dns from 'dns';

// Fix for Windows / ISP router refusing DNS SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // ignore
}

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const dbUrl = process.env.DATABASE_URL;

async function testConnection() {
  console.log('\n🔍 Testing MongoDB Connection...');
  console.log('────────────────────────────────────────');
  
  if (!dbUrl) {
    console.error('❌ Error: DATABASE_URL is not set in backend/.env');
    process.exit(1);
  }

  // Hide password in logs
  const maskedUrl = dbUrl.replace(/:([^@]+)@/, ':****@');
  console.log(`Connecting to: ${maskedUrl}`);

  try {
    const startTime = Date.now();
    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000
    });

    const elapsed = Date.now() - startTime;
    console.log(`\n✅ Connection SUCCESSFUL! (took ${elapsed}ms)`);
    console.log(`   Database Name: ${mongoose.connection.name}`);
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Ready State: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Other'}`);
    
    await mongoose.disconnect();
    console.log('\n🔒 Disconnected cleanly.');
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Connection FAILED!');
    console.error(`   Message: ${error.message}`);
    if (error.code) {
      console.error(`   Error Code: ${error.code}`);
    }
    process.exit(1);
  }
}

testConnection();
