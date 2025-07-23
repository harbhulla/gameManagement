import express from "express";
import cors from "cors";
import pokemonRoute from "./routes/pokemon.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express(); // ✅ define app before using it
app.use(express.json());
const cors = require('cors');

app.use(cors({
  origin: 'shinkansen.proxy.rlwy.net:40844', // Add this
  credentials: true
}));

app.use("/api/pokemon", pokemonRoute);

const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
