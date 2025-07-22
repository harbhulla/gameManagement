import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [pokemon, setPokemon] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <CartContext.Provider value={{ pokemon, setPokemon, hasLoaded, setHasLoaded }}>
      {children}
    </CartContext.Provider>
  );
}
