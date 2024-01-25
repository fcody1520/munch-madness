import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGear } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function Navbar() {
  
  
    async function handleLogout(){
        await axios.delete('/logout')
    }

    return (
    <>
        <div className="navbar">
            <NavLink><FontAwesomeIcon icon={faUserGear}/></NavLink>
            <button onClick={handleLogout}>Logout</button>
        </div>
    </>
  )
}
