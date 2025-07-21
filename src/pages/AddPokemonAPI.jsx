import { useEffect, useRef, useState } from "react";

export default function AddPokemonAPI() {
    const hasRun = useRef(false); // 👈 create a persistent flag
    const [pokemon,setPokemon] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const pokeRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
        const pokeData = await pokeRes.json();
        const response = await fetch("http://localhost:3000/api/pokemon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pokemonArray: pokeData
          }),
        });
         const data = await response.json();
         for(const item of data) {
            setPokemon((prev) => [...prev,item]);
         }
        if (!response.ok) {
          throw new Error(`Error ${data.error}`)
        }
        console.log("✅ Received Data!");
      } catch (error) {
        console.error("❌ Error:", error);
      }

    }
    fetchData();
  }, []);
  return (
    null
  );
}
