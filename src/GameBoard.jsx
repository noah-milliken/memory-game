import  React, { useState, useEffect } from 'react';
import Card from './Card';

function GameBoard() {
  const [cardAmount, setCardAmount] = useState(4)
  const [pokemon, setPokemon] = useState([])
  const [isChosen, setIsChosen] = useState([])
  const [isFlipped, setIsFlipped] = useState(false)
  const [key, setKey] = useState(0)
 
  console.log(isChosen)
 
  useEffect(() => {
    const getRandomPokemon = async () => {
      const pokemonIds = [];
      while (pokemonIds.length < cardAmount) {
        const randomId = Math.floor(Math.random() * 150) + 1;
        if (!pokemonIds.includes(randomId)) {
          pokemonIds.push(randomId);
        }
      }

      const pokemonData = await Promise.all(
        pokemonIds.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await response.json();
          return {
            name: data.name,
            imageUrl: data.sprites.front_default,
          };
        })
      );
      setPokemon(pokemonData);
    };
    getRandomPokemon();
  }, [cardAmount, key]);


  const handleClick = (name) => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.classList.add('flipped');
    })


    setIsChosen([...isChosen, name])
    console.log(isChosen.length, cardAmount)
    if(isChosen.length === cardAmount){
      console.log('Level Up!')
      console.log(pokemon.length, cardAmount)
      setIsChosen([])
      setCardAmount((prevAmount) => prevAmount + 2)
      setKey((prevKey)=> prevKey + 1)
      setTimeout(() => {
        shuffleArray(pokemon)
        cards.forEach((card) => {
          card.classList.remove('flipped');
        })
      }, 2000);
      
    }else if(checkDuplicate(isChosen, name)){
      console.log('You Loose')
      setIsChosen([])
      setCardAmount(4)
      setKey((prevKey) => prevKey + 1)
      setTimeout(() => {
        shuffleArray(pokemon)
        cards.forEach((card) => {
          card.classList.remove('flipped');
        })
      }, 2000);
    }else{
      shuffleArray(pokemon)
      setTimeout(() => {
        cards.forEach((card) => {
          card.classList.remove('flipped');
        })
      }, 2000);
    }
  }

  const shuffleArray = () => {
  const shuffledArray = [...pokemon].sort(() => Math.random() - 0.5)
  setPokemon(shuffledArray)
  }

  const checkDuplicate = (array, name)=>{
    if(array.includes(name)){
      return true
    }else{
       return false
    }
  }

  return (
    <>
    <h1>PokeMem</h1>
    <div className="game-board">
      
      {pokemon.map((p) => (
       <Card 
        key={p.name}
        src={p.imageUrl}
        pokemon={p.name}
        onClick={()=> handleClick(p.name)}
        isFlipped={isFlipped}
       />
       
      ))}
    </div>
    </>
  );
}

export default GameBoard;