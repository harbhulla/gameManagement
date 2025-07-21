import { BeakerIcon } from '@heroicons/react/24/solid'
import React from 'react';
import AddPokemonAPI from './addPokemonAPI';
export default function Home() {

    const pokemons = [
  {
    id: "#001",
    name: "Sparky",
    type: "Electric",
    icons: ["⚡", "⚡", "⚡", "⚡"]
  },
  {
    id: "#002",
    name: "Flamy",
    type: "Fire",
    icons: ["🔥", "🔥", "🔥", "🔥"]
  }
];
  return (
    <div className="flex p-4">
      <div className="grid grid-cols-5 gap-4 overflow-hidden bg-[#22252b] text-white p-4 w-full">
        {/* Header */}
        <div className="col-span-5 grid grid-cols-5 gap-4 sticky top-0 z-10 text-lg font-semibold bg-teal-900 text-slate-100 p-3 rounded shadow-md border-b border-teal-800/40">
          <h3 className="text-center">Pokemon</h3>
          <h3 className="text-center">ID</h3>
          <h3 className="text-center">Name</h3>
          <h3 className="text-center">Type</h3>
          <h3 className="text-center">Actions</h3>
        </div>

        {/* Rows */}
        {pokemons.map((p, index) => (
          <React.Fragment key={index}>
<p className="flex items-center justify-center bg-gray-700 rounded p-2">
  <img
    className="h-10 w-10 object-contain"
    src={p.image}
    alt="Pikachu"
  />
</p>
            <p className="flex items-center justify-center bg-gray-700 rounded p-2">{p.id}</p>
            <p className="flex items-center justify-center bg-gray-700 rounded p-2">{p.name}</p>
            <p className="flex items-center justify-center bg-gray-700 rounded p-2">{p.type}</p>

            <div className="grid grid-cols-4 bg-gray-700 rounded p-2">
            <p className="flex items-center justify-center">🔥</p>
            <p className="flex items-center justify-center">🔥</p>
            <p className="flex items-center justify-center">🔥</p>
            <p className="flex items-center justify-center">🔥</p>
            </div>
          </React.Fragment>
        ))}
      </div>
      <AddPokemonAPI />
    </div>
  );
}
