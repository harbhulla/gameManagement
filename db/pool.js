// db.js (or queries.js)
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

pool
  .connect()
  .then(() => console.log('✅ Connected to DB!'))
  .catch(err => console.error('❌ DB connection error:', err.message));

export default pool;
