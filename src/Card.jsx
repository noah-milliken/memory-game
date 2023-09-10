// Card.js
import React from 'react';

const Card = ({src, pokemon, onClick, isFlipped}) => {
 
  
  return (
    <div 
    className={`card ${isFlipped ? 'flipped': ''}`}  
    onClick={onClick}
    >
      <div className='card-front'>
      <img src={src} alt='Pokemon'/>
      <h4>{pokemon}</h4>
      </div>
      <div className='card-back'>
          <img src="src/assets/pokemonback.png" alt="" />
      </div>
    </div>
  )
}

export default Card
