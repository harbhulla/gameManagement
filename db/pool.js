// pool.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Use environment variable or fallback to your connection string
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:zIgoCfizwUZtuRWyVeKVfrTdBkFCpYXy@hopper.proxy.rlwy.net:53590/railway?sslmode=require";

console.log("🔍 Using connection string:", connectionString.replace(/:[^:@]*@/, ':****@')); // Hide password in logs

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection with retry logic
const connectWithRetry = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.connect();
      console.log('✅ Connected to DB!');
      return;
    } catch (err) {
      console.error(`❌ DB connection attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) {
        console.error('❌ Failed to connect after all retries');
        return;
      }
      console.log(`⏳ Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

connectWithRetry();

export default pool;