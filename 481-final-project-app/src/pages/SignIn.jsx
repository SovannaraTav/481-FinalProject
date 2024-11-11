import React, {useState} from 'react'
import "../styles/SignIn.css"


export default function SignIn() {
  return (
    <div className='signInContainer signup'>
      <form action="">

        <label className='sign'>Sign In</label>

        <h6>Enter Credentials to login</h6>
        <div>
            <input type="email" id="email" name="email" placeholder="Enter Email Address" required></input>
        </div>
        <div>
            <input type="password" id="password" name="password" placeholder='Password' required></input>
        </div>
        <button>Sign In</button>
        <a> No Account, Sign up </a>
      </form>        
    </div>
  )
}

