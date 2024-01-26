import React, { useState } from 'react' 
import Rounds from './Rounds'
import Cards from './Cards'

export default function Bracket() {

  const sampleArr = ['McDonalds', 'Wendys','In n out','Five Guys','Subway','burger king','Mo Bettas','Rancheritos'];

  const [r1Winners, setR1Winners] = useState([])
  const [r2Winners, setR2Winners] = useState([])
  const [winner, setWinner] = useState([])

  const [round, setRound] = useState(1)

// make a useEffect, inside watch r1 winners and r2 winners
// if there's a change, fire a function that checks the length of the sets(winners)
// if r1.length is 4, we need to update the round by one
//  if r2 length is 2, update round to be round 3


  const eachRest = sampleArr.map((rest) => {
    return (
      <Cards 
        rest={rest}
        setR1Winners={setR1Winners}
        setR2Winners={setR2Winners}
        setWinner={setWinner}
        round={round}
        setRound={setRound}
      />
    )
  });

  console.log(r1Winners);
  return (
    <>
      <h1>Munch Madness!</h1>
      <br />
      {eachRest[0]}
      {eachRest[1]}
      <br />
      {eachRest[2]}
      {eachRest[3]}
      <br />
      {eachRest[4]}
      {eachRest[5]}
      <br />
      {eachRest[6]}
      {eachRest[7]}
    </>
  )
}
