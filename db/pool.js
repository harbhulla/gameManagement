// db.js (or queries.js)
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:JuKxISECuqlPYZLTJiyIJxIZsgwzneBx@shinkansen.proxy.rlwy.net:53186/railway',
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // for Railway SSL
});
pool
  .connect()
  .then(() => console.log('✅ Connected to DB!'))
  .catch(err => console.error('❌ DB connection error:', err.message));

export default pool;
