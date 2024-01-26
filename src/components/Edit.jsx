import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  Button  from 'react-bootstrap/Button'
import  Form  from 'react-bootstrap/Form'
import  Modal  from 'react-bootstrap/Modal'

export default function Edit() {
  const navigate = useNavigate();

  const [editFirstNameInput, setEditFirstNameInput] = useState("");
  const [editLastNameInput, setEditLastNameInput] = useState("");
  const [editEmailInput, setEditEmailInput] = useState("");
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [editPasswordInput, setEditPasswordInput] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function togglePasswordVisibility(e) {
    e.preventDefault();
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  async function onSaveHandler(e) {
    e.preventDefault();

    if (editPasswordInput!==passwordConfirm){
      alert(`New passwords don't match.`)
      return
    }
    const isConfirmed = confirm(
      "Are you sure you want to change your personal info?"
    );
    if (!isConfirmed) return;
    else {
      let editInfoBod = {
        fname: editFirstNameInput,
        lname: editLastNameInput,
        email: editEmailInput,
        oPassword: oldPasswordInput,
        nPassword: editPasswordInput,
      };
      const res = await axios
        .put("/edit-user", editInfoBod)
        .catch((err) => console.error("Error during edit request:", err));
      setEditFirstNameInput("");
      setEditLastNameInput("");
      setEditEmailInput("");
      setOldPasswordInput("");
      setEditPasswordInput("");
      setPasswordConfirm("");
      alert("Your Info has been saved!");
    }
  }

  function onCancelHandler(e) {
    e.preventDefault();
    const isConfirmed = confirm(
      `Are you sure that you don't want to change anything?`
    );
    if (!isConfirmed) return;
    else {
      navigate("/");
    }
  }

  async function deleteAcctHandler(e) {
    e.preventDefault();
  }

  return (
    <>
      <h1>Edit-info</h1>
      <h3>
        Please fill out all information, even if you don't plan on changing it.
      </h3>
      <h5>
        Ex.: if you don't plan on changing your first name, still type your
        current name.{" "}
      </h5>
      <form action="Edit-Info">
        <label htmlFor="First-name">First Name: </label>
        <input
          id="edit-first-name"
          type="text"
          placeholder="First Name"
          value={editFirstNameInput}
          onChange={(e) => setEditFirstNameInput(e.target.value)}
        />
        <br />
        <label htmlFor="Last-Name">Last Name: </label>
        <input
          id="edit-last-name"
          type="text"
          placeholder="Last-Name"
          value={editLastNameInput}
          onChange={(e) => setEditLastNameInput(e.target.value)}
        />
        <br />
        <label htmlFor="Email">Email: </label>
        <input
          id="edit-email"
          type="email"
          placeholder="Email"
          value={editEmailInput}
          onChange={(e) => setEditEmailInput(e.target.value)}
        />
        <br />
        <label htmlFor="Current password">Current Password: </label>
        <input
          type="password"
          placeholder="Current Password"
          value={oldPasswordInput}
          onChange={(e) => setOldPasswordInput(e.target.value)}
        />
        <br />
        <label htmlFor="Password">New Password: </label>
        <input
          id="edit-password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={editPasswordInput}
          onChange={(e) => setEditPasswordInput(e.target.value)}
          required
        />
        <br />
        <button className="smol" onClick={togglePasswordVisibility}>
          {showPassword ? "Hide Password" : "Show Password"}
        </button>
        <br />
        <label htmlFor="Password-confirm">Confirm New Password: </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <br />
        <button className="edit" onClick={onSaveHandler}>
          Save Changes
        </button>
        <button className="edit" onClick={onCancelHandler}>
          Cancel
        </button>
      </form>
      <br />
      <br />
      <Button variant="primary" onClick={handleShow}>
        Delete Account
      </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="deleteAcct.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="deleteAcct.ControlInput2"
            >
              <Form.Label>Please enter password: </Form.Label>
              <Form.Control 
              type='password' 
              placeholder='password'
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="deleteAcct.ControlInput3"
            >
              <Form.Label>Re-enter password: </Form.Label>
              <Form.Control 
              type='password' 
              placeholder='password'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteAcctHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
