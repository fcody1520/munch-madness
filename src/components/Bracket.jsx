import React, { useState,useEffect } from 'react' 
import Rounds from './Rounds'
import Cards from './Cards'
import axios from 'axios'


export default function Bracket() {

  

  const [r1Winners, setR1Winners] = useState([])
  const [r2Winners, setR2Winners] = useState([])
  const [winner, setWinner] = useState([])
  const [rests, setRests] = useState([])

  const [round, setRound] = useState(1)

// make a useEffect, inside watch r1 winners and r2 winners
// if there's a change, fire a function that checks the length of the sets(winners)
// if r1.length is 4, we need to update the round by one
//  if r2 length is 2, update round to be round 3


useEffect(() => {
  const successCallback = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude  
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  
    axios.get(`/restaurants/${latitude}/${longitude}`).then(res => {
       setRests(res.data.restInfo)
    }).catch(err => console.log(err))
  };

  const errorCallback = (error) => {
    console.log(error);
    
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


  return () => {
    // Cleanup logic if necessary
  };
}, []);


  const eachRest = rests.map((rest) => {
    return (
      <Cards 
        rest={rest}
        rests={rests}
        setR1Winners={setR1Winners}
        setR2Winners={setR2Winners}
        setWinner={setWinner}
        round={round}
        setRound={setRound}
      />
    )
  });

  // console.log(r1Winners);
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
