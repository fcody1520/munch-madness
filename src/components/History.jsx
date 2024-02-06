import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/History.css";


export default function History() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    axios.get("/winners").then((response) => {
      // console.log(response.data);

      let newWinners = {};
      for (let i=0; i<response.data.length; i++){
        if (response.data[i].rest_name in newWinners){
          newWinners[response.data[i].rest_name].count += 1;
        } else {
          newWinners[response.data[i].rest_name] = {
            count: 1,
            img: response.data[i].rest_img,
            address: response.data[i].rest_address,
          };
        }
      }

      console.log(Object.entries(newWinners))
      setWinners(Object.entries(newWinners))

    });
  }, []);

  return (
    <>
      <div className="height">
        <h1>Your Munch History:</h1>
        {winners.length > 0 ? (
          winners.map((wArr, idx) => {
            return (
              <div className="winner" key={idx}>
                <h3>Winner: {wArr[0]}</h3>
                <div className="card__images">
                  <img src={wArr[1].img} alt="" />
                </div>
                <p>{wArr[1].address}</p>
                <p>You ate here {wArr[1].count} time(s) within the last month!</p>
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
