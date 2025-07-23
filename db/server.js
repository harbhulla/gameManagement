import express from "express";
import pokemonRoute from "./routes/pokemon.js";
import dotenv from 'dotenv';
import cors from 'cors';  // ✅ Import CORS

dotenv.config();
const app = express();

// ✅ Add CORS middleware FIRST
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://game-management-mauve.vercel.app',
    'https://game-management-git-main-harbhullas-projects.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/api/pokemon", pokemonRoute);

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});