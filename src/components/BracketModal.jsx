import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function BracketModal({ show, winnerNode }) {

  function handleReset() {
    location.reload();
  }

  function handleSaveRest() {
    axios.post("/restaurants", {
        name: winnerNode.value.name,
        img: winnerNode.value.img,
        address: winnerNode.value.address.join(" "),
      })
      .then((response) => {
        console.log("response", response);
        location.reload();
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>
            <span className="delete">WE HAVE A WINNER!</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h3 className="delete">{winnerNode.value.name}</h3>
            <div className="card__images">
              <img src={winnerNode.value.img} alt="" />
            </div>
            <br />
            <p className="delete">{winnerNode.value.address.join(" ")}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="delete__button" onClick={handleReset}>
            Reset
          </Button>
          <Button className="delete__button" onClick={handleSaveRest}>
            Let's Munch Here!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
