import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGears,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Navbar({ userData, setLoggedIn }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios.delete("/logout");
      setLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error during logout request:", error);
    }
  }

  return (
    <>
      <div className="navbar">
        <span className="navbar__welcome">
          Welcome, {userData.fname}. Let's Munch!
        </span>
        {/* <div className="navbar__image"> */}
          <NavLink className="navbar__image" to="/">
            <img src="./public/munch_madness_logo.png" alt="" />
          </NavLink>
        {/* </div> */}
        <div className="navbar__button">
          <div>
            <NavLink to="/history">
              <FontAwesomeIcon
                size="3x"
                style={{ color: "#22B5D7" }}
                icon={faClockRotateLeft}
              />
            </NavLink>
          </div>
          <div>
            <NavLink to="/edit-info" className="navbar__icon">
              <FontAwesomeIcon
                size="3x"
                style={{ color: "#22B5D7" }}
                icon={faGears}
              />
            </NavLink>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
}
