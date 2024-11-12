import React, {useState} from 'react'
import "../styles/SignIn.css"


export default function SignIn() {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })
  function handleSubmit(event){
    alert('sbutmit button works')
    event.preventDefault(); 
    alert(`Email:  ${inputs.email}\n` + 
           `Password: ${inputs.password}\n`
    );
  }
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))  
  }

  return (
    <div>
      <form onSubmit ={handleSubmit}>
        <label className='sign'>Sign In</label>
        <h6>Enter Credentials to login</h6>
        <div> 
          <label htmlFor='email'></label>
          <input type="email" id ="email" name="email" placeholder="Enter Email" value={inputs.email || ""} onChange={handleChange} ></input>
        </div> 
        <div> 
          <label htmlFor='password'></label>
          <input type="password" id ="password" name="password" placeholder="Password" value={inputs.password || ""} onChange={handleChange} ></input>
        </div> 
        <div>
          <input type="submit" value="Sign In"></input>
        </div>
      </form>
    </div>
  )
}

