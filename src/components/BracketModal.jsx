import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function BracketModal({ show, winnerNode }) {
  // const [show, setShow] = useState(false);

  function handleReset() {
    location.reload();
  }

  function handleSaveRest() {}

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
