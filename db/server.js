import express from "express";
import pokemonRoute from "./routes/pokemon.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express(); // ✅ define app before using it
app.use(express.json());


app.use("/api/pokemon", pokemonRoute);

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
