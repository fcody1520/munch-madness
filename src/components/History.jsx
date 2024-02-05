import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/History.css";


export default function History() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    axios.get("/winners").then((response) => {
      console.log(response.data);
      setWinners(response.data);

      
        // create an object to store the count of each winner
        // if the winner occurs more than once, increment the count by 1
        // return the object
      
    });
  }, []);

  return (
    <>
      <div className="height">
        <h1>Your Munch History:</h1>
        {winners.length > 0 ? (
          winners.map((winner, idx) => {
            return (
              <div className="winner" key={idx}>
                <h3>Winner: {winner.rest_name}</h3>
                <div className="card__images">
                  <img src={winner.rest_img} alt="" />
                </div>
                <p>{winner.rest_address}</p>
                <p>You ate here [x] times within the last month!</p>
              </div>
            );
          })
        ) : (
          <h3>No winners yet</h3>
        )}
      </div>
    </>
  );
}
