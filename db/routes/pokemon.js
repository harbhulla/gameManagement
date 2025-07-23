import express from "express";
import pool from "../pool.js"; // assumes you have DB config here


const router = express.Router();

router.post('/', async (req, res) => {
  const { pokemonArray } = req.body;
  console.log(pokemonArray);
  try {
        for(let i = 0; i < pokemonArray.count; i++) {
            const pokeRes = await fetch(`${pokemonArray.results[i].url}`);
            const pokeData = await pokeRes.json();
            const pokeID = pokeData.id;
            const pokeName = pokeData.name;
            const pokeType = pokeData.types[0].type.name;
            const pokeImage = pokeData.sprites.front_default;
            const inDB = await pool.query(`SELECT EXISTS (SELECT 1 FROM pokemon WHERE id = ${pokeID})`);

            if(!pokeID || !pokeName || !pokeType || !pokeImage || inDB) {
                console.log("Skipped gang");
                continue;
            }
            await pool.query(
    'INSERT INTO pokemon (id,pokemon_name,type,url) VALUES ($1,$2,$3,$4) ON CONFLICT (id) DO NOTHING RETURNING *',
      [pokeID,pokeName,pokeType,pokeImage]
    ) 
}

    const result = await pool.query("SELECT * FROM pokemon");

    res.json(result.rows);
 } catch (err) {
  console.error("❌ Insertion Error:", err.message);
  return res.status(400).json({ error: err.message });
}

});


export default router;