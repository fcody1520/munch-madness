import React from 'react'

export default function Cards(props) {
    const { rest, setR1Winners, setR2Winners,  round, setRound, setWinner, rests} = props

    function handleSelection(){
        
    }

    function addWinners(){ 
        switch(round){
            case 1:
                return setR1Winners(( r1Winners) => [...new Set(r1Winners, rest)]);
            case 2: 
                return () => setR2Winners(() => []);
            default:
                return () => setWinner(rest);

        }
    }
    const address = rest.address.join(' ')

    
  return (
    <div className='cards' onClick={handleSelection}>
        {/* {rest} */}
        <h4>{rest.name}</h4>
        <div className='card__images'><img src={rest.img} alt="" /></div>
        <p>{address}</p>
    </div>
  )
}

