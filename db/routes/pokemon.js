import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from "..pool.js";
dotenv.config();
const app = express();


app.use(cors({
  origin: [
    'http://localhost:5173',  
    'http://localhost:3000',  
    'https://game-management-git-main-harbhullas-projects.vercel.app', 
    'https://*.vercel.app'    
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
const router = express.Router();

router.post('/', async (req, res) => {
  const { pokemonArray } = req.body;
  console.log(pokemonArray);
  
  try {

    for(let i = 0; i < pokemonArray.results.length; i++) {
      const pokeRes = await fetch(`${pokemonArray.results[i].url}`);
      const pokeData = await pokeRes.json();
      
      const pokeID = pokeData.id;
      const pokeName = pokeData.name;
      const pokeType = pokeData.types[0].type.name;
      const pokeImage = pokeData.sprites.front_default;
      

      const inDBResult = await pool.query(`SELECT EXISTS (SELECT 1 FROM pokemon WHERE id = $1)`, [pokeID]);
      const exists = inDBResult.rows[0].exists;

    
      if (!pokeID || !pokeName || !pokeType || !pokeImage || exists) {
        console.log(`Skipped Pokemon ${pokeName || 'unknown'} - missing data or already exists`);
        continue;
      }

      // Insert Pokemon
      await pool.query(
        'INSERT INTO pokemon (id, pokemon_name, type, url) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING',
        [pokeID, pokeName, pokeType, pokeImage]
      );
      
      console.log(`✅ Added Pokemon: ${pokeName}`);
    }


    const result = await pool.query("SELECT * FROM pokemon ORDER BY id");
    res.json(result.rows);
    
  } catch (err) {
    console.error("❌ Insertion Error:", err.message);
    return res.status(400).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pokemon ORDER BY id');
    
   
    const cleanedData = result.rows.map(pokemon => ({
      ...pokemon,
      url: pokemon.url || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
    }));
    
    res.json(cleanedData);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch Pokemon' });
  }
});

export default router;