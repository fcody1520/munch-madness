import React, { useState,useEffect } from 'react' 
import Rounds from './Rounds'
import Cards from './Cards'
import axios from 'axios'


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

useEffect(() => {
  const successCallback = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude  
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  
    axios.get(`/restaurants/${latitude}/${longitude}`).then(res => {
      console.log(res)
    }).catch(err => console.log(err))

    // const options = {
    //   method: 'GET',
    //   url: 'https://api.yelp.com/v3/businesses/search',
    //   params: {
    //     latitude: '40.4183173',
    //     longitude: '-111.8687941',
    //     sort_by: 'best_match',
    //     limit: '8'
    //   },
    //   headers: {
    //     accept: 'application/json',
    //     Authorization: 'Bearer Hi4mm6R-ufsQA2bi2_vOrK7lqBWOR88MvEUG_ECje2Vhg23tZZQDAJNjSQ0wpFgtv3_FGbbGGfok8xPqVfcAV5iTqEEwl2S-F25yaOR57gooifE4N3Sc-Xk_L-C3ZXYx'
    //   }
    // };

    // axios
    // .request(options).then(res => {
    //   console.log(res);
    // })

    // 'https://api.yelp.com/v3/businesses/search?latitude=40.4183173&longitude=-111.8687941&sort_by=best_match&limit=20'  
  };

  const errorCallback = (error) => {
    console.log(error);
    
  };

  // Get current position when the component mounts
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  // Clean up any resources or subscriptions if needed when the component unmounts
  return () => {
    // Cleanup logic if necessary
  };
}, []);

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
