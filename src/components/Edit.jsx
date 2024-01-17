import React from 'react'

export default function Edit() {
  return (
    <>
     <form action="Edit-Info">
        <label htmlFor="First-name">First Name:</label>
        <input id='edit-first-name' type="text" placeholder='First Name' />
        <label htmlFor="Last-Name">Last Name:</label>
        <input id='edit-first-name' type="text" placeholder='Last-Name' />
        <label htmlFor="Email">Email:</label>
        <input id='edit-email' type="email" placeholder='email' />
        <label htmlFor="Password">Password</label>
        <input id='edit-password' type="password" placeholder='Password' />
        <button>Save Changes</button>
        <button>Cancel</button>
     </form>
    <br />
    <br />
    <button>Delete Account</button>
    </>
  )
}
