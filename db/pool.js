// pool.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Use environment variable or fallback to your connection string
const connectionString = process.env.DATABASE_URL || "postgresql://pokemonmanagement_user:LZPlVzxuJRz2wMtk7BX0t5QC9h3J82UK@dpg-d20kgpeuk2gs73ccallg-a.oregon-postgres.render.com/pokemonmanagement";

console.log("🔍 Using connection string:", connectionString.replace(/:[^:@]*@/, ':****@')); // Hide password in logs

// Use ONLY the connection string to avoid conflicts
const pool = new Pool({
  connectionString: connectionString,
  
  ssl: {
    rejectUnauthorized: false
  },
  
  // Add these for better connection handling
  max: 20, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // return an error after 10 seconds if connection could not be established
});

// Test connection with retry logic
const connectWithRetry = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      console.log('✅ Connected to DB!');
      
      // Test the connection with a simple query
      const result = await client.query('SELECT NOW()');
      console.log('🕐 DB time:', result.rows[0].now);
      
      client.release(); // Important: release the client back to the pool
      return;
    } catch (err) {
      console.error(`❌ DB connection attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) {
        console.error('❌ Failed to connect after all retries');
        throw err; // Throw error so the app can handle it
      }
      console.log(`⏳ Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Handle pool errors
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Initialize connection
connectWithRetry().catch(err => {
  console.error('Failed to establish database connection:', err);
  process.exit(1);
});

export default pool;