import React from 'react'
import "../styles/SignUp.css"


export default function SignUp() {

  return (
    <div className='signUpContainer'>
    <label className='sign'>Sign Up</label>
    <h6>Create your account</h6>
      <div>
        <input type="email" id ="email" placeholder="Enter Email"></input>
        <input type="password" id="password" name="password" placeholder='Enter Password'required></input>
        <input type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm Password'required></input>
        <div class="user-type-container">
        <input type="radio" id="alumniType" name="userType" value="Alumni" />
        <label for="alumniType" class="radio-label">Alumni</label>
        
        <input type="radio" id="studentType" name="userType" value="Student" />
        <label for="studentType" class="radio-label">Student</label>
      </div>
      
        <button>Sign Up</button>

      </div>
    </div>
  )
}
