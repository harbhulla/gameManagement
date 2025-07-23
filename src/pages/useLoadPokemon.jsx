import { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";

export default function useLoadPokemon() {
  const { setPokemon, hasLoaded, setHasLoaded } = useContext(CartContext);

  useEffect(() => {
    if(hasLoaded) return;
    
    async function fetchData() {
      try {
        // Simply GET the Pokemon data from your database
        const response = await fetch("https://gamemanagement.onrender.com/api/pokemon");

        if (!response.ok) {
          const errorText = await response.text(); 
          throw new Error(`Server error: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        setPokemon(data); 
        setHasLoaded(true);
        console.log("✅ Received Pokemon Data!", data.length, "Pokemon loaded");
        
      } catch (error) {
        console.error("❌ Error loading Pokemon:", error);
      }
    }

    fetchData();
  }, [hasLoaded, setHasLoaded, setPokemon]);
}