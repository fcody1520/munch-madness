import React, {useState} from 'react'
// import {biUserCircle} from 'react-icons/bi'
import axios from 'axios'

export default function Login({ setUserData, setLoggedIn }) {
    
    const [action, setAction] = useState('Sign Up') 
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [firstNameInput, setFirstNameInput] = useState('')
    const [lastNameInput, setLastNameInput] = useState('')
    const [verifyPasswordInput, setVerifyPasswordInput] = useState('')

    async function handleLogIn(){
        let logMaBod = {
             email: emailInput,
             password: passwordInput
        }

        try{ 
        const response = await axios.post('/login', logMaBod)
            setUserData(response.data)
            setLoggedIn(true)
        

        } catch (error) {
            console.error('Error during post request:', error.response.data.message)
            alert(error.response.data.message);
        }
    };

    async function handleSignUp(){
        let signMaBod ={
            fname: firstNameInput,
            lname: lastNameInput,
            email: emailInput,
            password: passwordInput
        }

        // logic for password matching here

        if(passwordInput !== verifyPasswordInput){
            alert(`Password fields don't match!`)
            return
        }

        try{ 
            const response = await axios.post('/register', signMaBod)
            setFirstNameInput('')
            setLastNameInput('')
            setEmailInput('')
            setPasswordInput('')
            setVerifyPasswordInput('')
            alert(`User added, please login and let's Munch!`)

            } catch (error) {
                console.error('Error during post request:', error)
            }
    }
  
    return (
    <>
        <div className='container'></div>
        <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            {action==="Login" ? <div></div>: <div className='input'>
                {/* <img src={biUserCircle} alt="" /> */}
                <input 
                id='first-name' 
                value={firstNameInput}
                type="text" 
                placeholder='First Name'
                onChange={(e) => setFirstNameInput(e.target.value)} 
                required />
                <input 
                id='last-name'
                value={lastNameInput} 
                type="text" 
                placeholder='Last Name'
                onChange={(e) => setLastNameInput(e.target.value)} 
                required />
            </div>
            }
            
            <div className='input'>
                <img src="" alt="" />
                <input 
                id='Email' 
                value={emailInput}
                type="email" 
                placeholder='Email'
                onChange={(e) => setEmailInput(e.target.value)} 
                required/>
            </div>
            <div className='input'>
                <img src="" alt="" />
                <input 
                id='Password' 
                value={passwordInput}
                type="password" 
                placeholder='Password'
                onChange={(e) => setPasswordInput(e.target.value)} 
                required/>
            </div>
            {action==="Login" ? <div></div>: 
            <div className="input">
                <input 
                id='verify-password'
                type="password"
                placeholder='Verify Password'
                value={verifyPasswordInput}
                onChange={(e) => setVerifyPasswordInput(e.target.value)}
                />
            </div>}
        </div>
        {/* <div className="forgot-password">Lost Password? <span>Click Here!</span></div> turn this into ternary also */}
        <div className="submit-container">
            <div className={action==='Login'?'submit gray': "submit"}onClick={() => {setAction('Sign Up')}}>Sign Up</div>
            <div className={action==='Sign Up'?'submit gray': "submit"}
            onClick={() => {setAction('Login')}}>Login</div>
        </div>{action === 'Sign Up'?
        <button onClick={handleSignUp}>Let Me Munch!</button>
        :
        <button onClick={handleLogIn}>Let's Munch!</button>}
    </>
  )
}
