import { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";

export default function useLoadPokemon() {
  const { setPokemon, hasLoaded, setHasLoaded } = useContext(CartContext);


  useEffect(() => {
    if(hasLoaded) return;
    async function fetchData() {
      try {
        const pokeRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0");
        const pokeData = await pokeRes.json();
        const response = await fetch("https://gamemanagement.onrender.com/api/pokemon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pokemonArray: pokeData }),
        });

        if (!response.ok) {
            const errorText = await response.text(); 
          throw new Error(`Server error: ${response.status} ${errorText}`);
        }
        const data = await response.json();
        setPokemon(data); 
        setHasLoaded(true);
        console.log("✅ Received Data!");
      } catch (error) {
        console.error("❌ Error:", error);
      }
    }

    fetchData();
  }, [hasLoaded, setHasLoaded, setPokemon]);
}
