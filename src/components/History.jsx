import React, { useEffect,useState } from "react";
import axios from "axios";

export default function History() {

  const [winners, setWinners] = useState([]);

  useEffect(() => {
    axios.get("/winners").then((response) => {
      console.log(response.data);
      setWinners(response.data);
    });
  }, []);

  return (
    <>
      <div className="height">
        <h1>Your Munch History:</h1>
        {winners.length > 0 ? (
          winners.map((winner, idx) => {
            return (
              <div
              className="winner"
              key={idx}
              >
                <h3>Winner: {winner.restName}</h3>
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
