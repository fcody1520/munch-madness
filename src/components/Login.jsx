import React, {useState} from 'react'
import {biUserCircle} from 'react-icons/bi'

export default function Login() {
    
    const [action, setAction] = useState('Sign Up') 
  
  
    return (
    <>
        <div className='container'></div>
        <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            {action==="Login" ? <div></div>: <div className='input'>
                <img src="" alt="" />
                <input id='Name' type="text" placeholder='Name' />
            </div>}
            
            <div className='input'>
                <img src="" alt="" />
                <input id='Email' type="email" placeholder='Email'/>
            </div>
            <div className='input'>
                <img src="" alt="" />
                <input id='Password' type="password" placeholder='Password'/>
            </div>
        </div>
        {/* <div className="forgot-password">Lost Password? <span>Click Here!</span></div> turn this into ternary also */}
        <div className="submit-container">
            <div className={action==='Login'?'submit gray': "submit"}onClick={() => {setAction('Sign Up')}}>Sign Up</div>
            <div className={action==='Sign Up'?'submit gray': "submit"}
            onClick={() => {setAction('Login')}}>Login</div>
        </div>
    </>
  )
}
