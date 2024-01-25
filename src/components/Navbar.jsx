import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGear } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


export default function Navbar({userData, setLoggedIn}) {
  const navigate = useNavigate()
  
    async function handleLogout(){
        try{    
        await axios.delete('/logout')
        setLoggedIn(false)
        navigate('/')
        } catch (error){
            console.error('Error during logout request:', error)
        }
    }

    return (
    <>
        <div className="navbar">
            <NavLink to='/edit-info' className='navBar'><FontAwesomeIcon icon={faUserGear}/></NavLink>
            <button className='navBar' onClick={handleLogout}>Logout</button>
        </div>
    </>
  )
}
