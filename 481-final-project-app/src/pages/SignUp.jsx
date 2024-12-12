import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import "../styles/SignUp.css"
import SupabaseAuthentication from '../classes/SupabaseAuthentication';


/*
*
* SignUp.jsx
* React component representing the page where users can create a new account
*/
export default function SignUp() { 
  
  // Supabase Authentication  
  const auth = new SupabaseAuthentication(); 
  const navigate = useNavigate();

  // declaring states
  const [signUpResult, setSignUpResult] = useState(true);
  

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

  
    // handleSubmit() is a function that handles the submission of the sign up form
  function handleSubmit(event){
    event.preventDefault(); 
    auth.signUp(inputs.email, inputs.password)
    .then(response => {
      if (response.error) {
        console.log("Error during signup", response.error);
        setSignUpResult(false);
      } else {
        console.log("User signed up successfully", response.error);
        navigate('../enterinfo');
        setSignUpResult(true);
      }
    })
  }
  

  // handleChange() is a function that handles the change of input values
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setInputs(values => ({...values, [name]: value}))  
  }


  // signUpNewUser() is a function that signs up a new user and inserts them into the database
  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: inputs.email,
      password: inputs.password,
    })
  }
  

  // returning the JSX for the sign up page
  return (
    <div>
    {/* sign up form */}
      <form className = 'formSignUp' onSubmit ={handleSubmit}>
      <label className='sign'>Sign Up</label>
      <h6>Create your account</h6>

      {/* input fields for email and password */}
      <div> 
        <label htmlFor='email'></label>
        <input type="email" id ="email" name="email" placeholder="Enter Email" value={inputs.email || ""} onChange={handleChange} ></input>
      </div> 
      <div> 
        <label htmlFor='password'></label>
        <input type="password" id ="password" name="password" placeholder="Password" value={inputs.password || ""} onChange={handleChange} ></input>
      </div> 
 

      {/* error message */}
      <div>
      {signUpResult === false && (
        <p style={{ color: 'red' }}>
          Sign-up failed. Please re-enter your email and password. 
        </p>
      )}
    </div>

      <div>
        <input type="submit" value="Sign Up"></input>
      </div>
    </form>
    </div>
  )
}
