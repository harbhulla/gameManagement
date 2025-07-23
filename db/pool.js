// db.js (or queries.js)
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD
});

pool
  .connect()
  .then(() => console.log('✅ Connected to DB!'))
  .catch(err => console.error('❌ DB connection error:', err.message));

export default pool;
