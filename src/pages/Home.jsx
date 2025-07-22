import { BeakerIcon } from '@heroicons/react/24/solid'
import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import useLoadPokemon from './useLoadPokemon';
export default function Home() {
  const {pokemon} = useContext(CartContext)
  const [currentPage, setCurrentPage] = useState(1);
  useLoadPokemon();

  const pokemonsPerPage = 20;
  const indexOfLast = currentPage * pokemonsPerPage;
  const indexOfFirst = indexOfLast - pokemonsPerPage;
  const currentPokemons = pokemon.slice(indexOfFirst, indexOfLast);

  
  return (
    <div className="flex p-4">
      <div className="grid grid-cols-5 gap-4 overflow-hidden bg-[#22252b] text-white p-4 w-full">
        <div className="col-span-5 grid grid-cols-5 gap-4 sticky top-0 z-10 text-lg font-semibold bg-teal-900 text-slate-100 p-3 rounded shadow-md border-b border-teal-800/40">
          <h3 className="text-center">Pokemon</h3>
          <h3 className="text-center">ID</h3>
          <h3 className="text-center">Name</h3>
          <h3 className="text-center">Type</h3>
          <h3 className="text-center">Actions</h3>
        </div>
              

        {/* Rows */}
        {currentPokemons.map((p, index) => (

          <React.Fragment key={index}>
<p className="flex items-center justify-center bg-gray-700 rounded p-2">
  <img
    className="h-10 w-10 object-contain"
    src={p.url}
    alt="Pikachu"
  />
</p>
            <p className="flex items-center justify-center bg-gray-700 rounded p-2">{p.id}</p>
            <p className="flex items-center justify-center bg-gray-700 rounded p-2">{p.pokemon_name}</p>
            <p className="flex items-center justify-center bg-gray-700 rounded p-2">{p.type}</p>

            <div className="grid grid-cols-4 bg-gray-700 rounded p-2">
            <p className="flex items-center justify-center">🔥</p>
            <p className="flex items-center justify-center">🔥</p>
            <p className="flex items-center justify-center">🔥</p>
            <p className="flex items-center justify-center">🔥</p>
            </div>
          </React.Fragment>
        ))}
        <div className='flex w-screen gap-5 justify-center pr-15  text-white'>
        <button className="cursor-pointer" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        </button>

         <span>Page {currentPage}</span>

        <button className='cursor-pointer'
          onClick={() =>
            setCurrentPage(p =>
              p < Math.ceil(pokemon.length / pokemonsPerPage) ? p + 1 : p
            )
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        </button>
        </div>
      </div>
    </div>
  );
}
