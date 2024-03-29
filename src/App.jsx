import { useState, useEffect } from 'react'
import './CSS/App.css'
import Login from './components/Login'
import Bracket from './components/Bracket'
import axios from 'axios'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {

  // create state bool type for show Login default value true
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({})
  // useEffect checks for user data on the session
  // if session data set show Login false display bracket instead

  const checkForSession = async () => {
    
    try{
      const response = await axios.get('/user')
      console.log(response.data);
      if(response.data.userId){
        setLoggedIn(true)
        setUserData(response.data)
      }
    } catch {
      console.error('Error during get request:', error)
    }
  };

  useEffect(() => {
    checkForSession();
  }, []);
  
  return (
    <>
    
      {loggedIn ?
        <div style={{overflow: 'auto'}}>
          <Navbar
            setLoggedIn={setLoggedIn}
            userData={userData}
          />
          <Outlet/>
        </div>
        :
        <Login
          setUserData={setUserData}
          setLoggedIn={setLoggedIn}
        />
      }
    </>
  )
}

export default App
