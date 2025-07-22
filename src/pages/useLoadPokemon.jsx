import { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";

export default function useLoadPokemon() {
  const { setPokemon, hasLoaded, setHasLoaded } = useContext(CartContext);


  useEffect(() => {
    if(hasLoaded) return;
    async function fetchData() {
      try {
        const pokeRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
        const pokeData = await pokeRes.json();
        const response = await fetch("http://localhost:3000/api/pokemon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pokemonArray: pokeData }),
        });

        const data = await response.json();
        setPokemon(data); // way better than doing for...loop with setPokemon many times
        setHasLoaded(true);
        if (!response.ok) {
          throw new Error(`Error ${data.error}`);
        }

        console.log("✅ Received Data!");
      } catch (error) {
        console.error("❌ Error:", error);
      }
    }

    fetchData();
  }, [hasLoaded, setHasLoaded, setPokemon]);
}
