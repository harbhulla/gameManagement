// db.js (or queries.js)
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = "postgresql://postgres:tMxPihEVFUCXLwuFtygmeuzUStgMtJdN@shinkansen.proxy.rlwy.net:40844/railway"
const pool = new Pool({

  connectionString,
});

pool
  .connect()
  .then(() => console.log('✅ Connected to DB!'))
  .catch(err => console.error('❌ DB connection error:', err.message));

export default pool;
