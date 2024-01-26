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
          <span className='navbar__welcome'>Welcome, {userData.fname}. Let's Munch!</span>
          <div className='navbar__image'>
            <img src="./public/munch_madness_logo.png" alt="" />
          </div>
            <div className='navbar__button'>
              <NavLink to='/edit-info' className='navbar'><FontAwesomeIcon icon={faUserGear}/></NavLink>
              <button className='navbar' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </>
  )
}
