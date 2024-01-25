import React, {useState} from 'react'

export default function Edit() {

  const [editFirstNameInput, setEditFirstNameInput] = useState('')
  const [editLastNameInput, setEditLastNameInput] = useState('')
  const [editEmailInput, setEditEmailInput] = useState('')
  const [editPasswordInput, setEditPasswordInput] = useState('')


  //create verify password funcitonality using modals or a window.confirm (if possible)
  // create functionality to only show the edit info if the password is confirmed
  //maybe use useEffect to see if the password has yet been entered

  function onSaveHandler(e) {
    e.preventDefault()
  }

  function onCancelHandler(e) {
    e.preventDefault()
    
  }

  function deleteAcctHandler(e) {
    e.preventDefault()
  }

  return (
    <>
      <h1>Edit-info</h1>
     <form action="Edit-Info">
        <label htmlFor="First-name">First Name:</label>
        <input 
        id='edit-first-name' 
        type="text" 
        placeholder='First Name'
        value={editFirstNameInput}
        onChange={e => setEditFirstNameInput(e.target.value)}
        />
        <label htmlFor="Last-Name">Last Name:</label>
        <input 
        id='edit-last-name' 
        type="text" 
        placeholder='Last-Name'
        value={editLastNameInput}
        onChange={e => setEditLastNameInput(e.target.value)}
        />
        <label htmlFor="Email">Email:</label>
        <input 
        id='edit-email' 
        type="email" 
        placeholder='email'
        value={editEmailInput}
        onChange={e => setEditEmailInput(e.target.value)} 
        />
        <label htmlFor="Password">Password:</label>
        <input 
        id='edit-password' 
        type="password" 
        placeholder='Password'
        value={editPasswordInput}
        onChange={e => setEditPasswordInput(e.target.value)} 
        />
        <button className='edit' onClick={onSaveHandler}>Save Changes</button>
        <button className='edit' onClick={onCancelHandler}>Cancel</button>
     </form>
    <br />
    <br />
    <button className='edit' onClick={deleteAcctHandler}>Delete Account</button>
    </>
  )
}
