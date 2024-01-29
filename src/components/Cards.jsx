import React from 'react'

export default function Cards(props) {
    const { rest, setR1Winners, setR2Winners,  round, setRound, setWinner} = props

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

  return (
    <div onClick={handleSelection}>
        {rest}
    </div>
  )
}

