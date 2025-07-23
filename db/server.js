import express from "express";
import pokemonRoute from "./routes/pokemon.js";
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();
const app = express(); // ✅ define app before using it
app.use(express.json());


app.use(cors({
  origin: 'https://game-management-mauve.vercel.app',
  credentials: true
}));

app.use("/api/pokemon", pokemonRoute);

const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
