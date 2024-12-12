import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import "../styles/SignIn.css"
import SupabaseAuthentication from '../classes/SupabaseAuthentication'


/* 
* signIn.jsx
* React component representing the page where users can sign in to their existing accounts. 
*/
export default function SignIn() {

  
  // declaring variables
  // - navigate: useNavigate() is a hook that lets you access the navigate function from the history stack
  // - auth: create a new instance of SupabaseAuthentication class
  const navigate = useNavigate();
  const auth = new SupabaseAuthentication();

  // declaring states
  // - signInResult: a boolean state to track whether the signin is successful or not
  // - inputs: an object state to store the input values of email and password
  //  - email: string
  //  - password: string
  const [signInResult, setSignInResult] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  
  

  //handleSubmit() is a function that handles the submission of the sign in form
  function handleSubmit(event){
    event.preventDefault();
 

    // calling the signIn() method from the SupabaseAuthentication class
    auth.signIn(inputs.email, inputs.password)
    .then(response => {
      if (response.error) {
        console.log("Error during signin", response.error);
        setSignInResult(false);

      } else {
        console.log("User signin successfully", response.error);
        navigate("../Home");
        setSignInResult(true);
      }
    })
  }

  //handleChange() is a function that handles the change of input values
  function handleChange(event) {
    // getting the name and value of the input
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  // returning the JSX for the SignIn component
  return (
    <div style={{margin: 'auto'}}>
      <form  className='formSignIn' onSubmit ={handleSubmit}>
        <label className='sign'>Sign In</label>
        <h6>Enter Credentials to login</h6>
        {/* input fields for email and password */}
        <div>
          <label htmlFor='email'></label>
          <input type="email" id ="email" name="email" placeholder="Enter Email" value={inputs.email || ""} onChange={handleChange} ></input>
        </div>
        <div>
          <label htmlFor='password'></label>
          <input type="password" id ="password" name="password" placeholder="Password" value={inputs.password || ""} onChange={handleChange} ></input>
        </div>

        {/* link to sign up page */}
        <div>
          <p>If you want to create an account, <Link to={"/signup"}>Sign Up Here</Link></p>
        </div>

        {/* error message */}
        <div>
          {signInResult !== true && (
            <p style={{ color: 'red' }}>
             Sign-in failed. Please check your email and password.
            </p>
          )}
        </div>
        <div>
          <input type="submit" value="Sign In"></input>
        </div>
      </form>
    </div>
  )
}

