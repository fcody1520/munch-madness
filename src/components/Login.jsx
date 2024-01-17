import React, {useState} from 'react'
// import {biUserCircle} from 'react-icons/bi'

export default function Login() {
    
    const [action, setAction] = useState('Sign Up') 
  


    function handleLogIn(){
        
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
                <input id='First Name' type="text" placeholder='First Name' required />
                <input id='Last Name' type="text" placeholder='Last Name' required />
            </div>
            }
            
            <div className='input'>
                <img src="" alt="" />
                <input id='Email' type="email" placeholder='Email' required/>
            </div>
            <div className='input'>
                <img src="" alt="" />
                <input id='Password' type="password" placeholder='Password' required/>
            </div>
        </div>
        {/* <div className="forgot-password">Lost Password? <span>Click Here!</span></div> turn this into ternary also */}
        <div className="submit-container">
            <div className={action==='Login'?'submit gray': "submit"}onClick={() => {setAction('Sign Up')}}>Sign Up</div>
            <div className={action==='Sign Up'?'submit gray': "submit"}
            onClick={() => {setAction('Login')}}>Login</div>
        </div>
        <button onClick={handleLogIn}>Let's Munch!</button>
    </>
  )
}
