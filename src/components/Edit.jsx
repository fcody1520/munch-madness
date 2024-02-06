import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../CSS/Edit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faKey,
  faUnlockKeyhole,
  faPaperPlane,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function Edit({ userData }) {
  const navigate = useNavigate();

  const [editFirstNameInput, setEditFirstNameInput] = useState("");
  const [editLastNameInput, setEditLastNameInput] = useState("");
  const [editEmailInput, setEditEmailInput] = useState("");
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [editPasswordInput, setEditPasswordInput] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [deleteAcctPasswordInput, setDeleteAcctPasswordInput] = useState("");

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  function togglePasswordVisibility(e) {
    e.preventDefault();
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  async function onSaveHandler(e) {
    e.preventDefault();

    if (editPasswordInput !== passwordConfirm) {
      Swal.fire("Error", "New passwords don't match.", "error");
      return;
    }
    
    Swal.fire({
      title: "Save Changes?",
      background: "#eeeeee",
      text: "Are you sure you want to save your changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FF0000",
      confirmButtonText: "Yes, save changes!",
    }).then((result) => {
      if (!result.isConfirmed) return;
      else {
        let editInfoBod = {
          fname: editFirstNameInput,
          lname: editLastNameInput,
          email: editEmailInput,
          oPassword: oldPasswordInput,
          nPassword: editPasswordInput,
        };
        const res = axios
          .put("/edit-user", editInfoBod)
          .catch((err) => console.error("Error during edit request:", err));
          
        Swal.fire({
          title: "Changes Saved!",
          text: "Your changes have been saved.",
          icon: "success",
          timer: 2000, // Timer in milliseconds (3 seconds)
          showConfirmButton: true
        });
        navigate("/");
      }
    })
  }

  function onCancelHandler(e) {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      background: "#eeeeee",
      text: "You will lose any unsaved changes.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF0000",
      confirmButtonText: "Yes, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cancelled!", "Your changes have been discarded.", "success");
        navigate("/");
      }
    })
  }

  async function deleteAcctHandler(e) {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      background: "#eeeeee",
      text: "Your account will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF0000",
      confirmButtonText: "Yes, delete my account.", 
    }).then((result) => {
      if (!result.isConfirmed) return;
      else {
        let deleteMaBod = {
          password: deleteAcctPasswordInput,
        };
        const res = axios
          .put(`/delete-user`, deleteMaBod)
          .catch((err) => console.error("Error during edit request:", err));
        Swal.fire({
          title: "Account Deleted!",
          text: "Your account has been deleted.",
          icon: "success",
          timer: 2000, 
          showConfirmButton: true
        });
        navigate("/");
        location.reload();
      }
    })
  }

  return (
    <div className="height">
      <div className="info">
        <h1>Edit-info</h1>
        <h3>
          Please fill out all information, even if you don't plan on changing
          it.
        </h3>
        <h5>
          Ex.: if you don't plan on changing your first name, still type your
          current name.{" "}
        </h5>
      </div>
      <div className="edit__form">
        <form action="Edit-Info">
          <div className="edit__inputs">
            <span>
              <FontAwesomeIcon icon={faCircleUser} />
            </span>
            <input
              autoFocus
              id="edit-first-name"
              type="text"
              placeholder="First Name"
              value={editFirstNameInput}
              onChange={(e) => setEditFirstNameInput(e.target.value)}
              required
            />
            <br />
            <span>
              <FontAwesomeIcon icon={faCircleUser} />
            </span>
            <input
              id="edit-last-name"
              type="text"
              placeholder="Last-Name"
              value={editLastNameInput}
              onChange={(e) => setEditLastNameInput(e.target.value)}
              required
            />
            <br />
            <span>
              <FontAwesomeIcon icon={faPaperPlane} />
            </span>
            <input
              id="edit-email"
              type="email"
              placeholder="Email"
              value={editEmailInput}
              onChange={(e) => setEditEmailInput(e.target.value)}
              required
            />
            <br />
            <span>
              <FontAwesomeIcon icon={faKey} />
            </span>
            <input
              type="password"
              placeholder="Current Password"
              value={oldPasswordInput}
              onChange={(e) => setOldPasswordInput(e.target.value)} 
              required
            />
            <br />
            <span>
              <FontAwesomeIcon icon={faUnlockKeyhole} />
            </span>
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
            <span>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              onKeyDown={(e) => {
                if (e.key === "Enter") onSaveHandler(e);
              }}
            />
          </div>
          <br />
          <button className="edit" onClick={onSaveHandler}>
            Save Changes
          </button>
          <button className="edit" onClick={onCancelHandler}>
            Cancel
          </button>
        </form>
      </div>
      <br />
      <br />
      <div className="delete__acct">
        <Button className="delete__button" onClick={handleShow}>
          Delete Account
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <span className="delete">Delete Account?</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="deleteAcct.ControlInput2">
                <Form.Label>
                  <span className="delete">Please enter password: </span>
                </Form.Label>
                <span className="delete">
                  <Form.Control
                    autoFocus
                    type="password"
                    placeholder="Password"
                    value={deleteAcctPasswordInput}
                    onChange={(e) => setDeleteAcctPasswordInput(e.target.value)}
                    required
                    onKeyDown={(e) => {
                      if (e.key === "Enter") deleteAcctHandler(e);
                    }}
                  />
                </span>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="delete__button" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="delete__button" onClick={deleteAcctHandler}>
              Delete Account
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
