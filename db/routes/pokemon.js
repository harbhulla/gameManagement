import express from "express";
import pool from "../pool.js"; // assumes you have DB config here
import { useState } from "react";

const router = express.Router();

router.post('/', async (req, res) => {
  const { pokemonArray } = req.body;
  try {
    const retrieveData = await pool.query("SELECT * FROM pokemon");
    if(retrieveData.rowCount !== pokemonArray.count) {
        for(let i = 0; i < pokemonArray.count; i++) {
            const pokeRes = await fetch(`${pokemonArray.results[i].url}`);
            const pokeData = await pokeRes.json();
            await pool.query(
    'INSERT INTO pokemon (id,pokemon_name,type) VALUES ($1,$2,$3) ON CONFLICT (id) DO NOTHING RETURNING *',
      [pokeData.id,pokeData.name,pokeData.types[0].type.name]
    ) 
}
    }
    res.json(retrieveData.rows);
  } catch (err) {
    console.log("error");
    return res.status(400).json({error: ' inserting user'});
}
});


export default router;