import React, { useEffect, useRef, useState } from 'react';
import './pokemonSearchbar.css';

export const PokemonSearchbar = () => {
    const [pokemon, setPokemon] = useState<any[] | null>(null);
    const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
    const [selectedPokemonImage, setSelectedPokemonImage] = useState<string | null>(null);
    const userInput = useRef<string>('');
    useEffect(() => {
      const getPokemon = async () => {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
        const data = await res.json();
        setPokemon(data.results);
        console.log(data.results)
      }
      getPokemon();
    
    }, [])
    
    const handleSearch = async (e) => {
        e.preventDefault();
        userInput.current = e.target.value;
        // console.log(userInput.current);
        if (userInput.current.toLocaleLowerCase() === 'user-reset') {
            setSelectedPokemon(null);
            setSelectedPokemonImage(null);
        } else {
            pokemon?.forEach((p) => {
                if (userInput.current.toLocaleLowerCase() === p.name) {
                    getImage(p.name);
                    setSelectedPokemon(p.name);
                }
            })
        }
    }

    const getImage = async (name: string) => {
        const pokemonRequest = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonData = await pokemonRequest.json();
        console.log(pokemonData)
        setSelectedPokemonImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`);
    }

    return (
        <div className='searchbarContainer'>
            <input type="text" className='inputBox' placeholder='Type a Pokemon...' onChange={handleSearch}/>
            {selectedPokemon && <div>{selectedPokemon}</div>}
            {selectedPokemonImage && <img src={selectedPokemonImage} alt="" />}
            
        </div>
    )
}
