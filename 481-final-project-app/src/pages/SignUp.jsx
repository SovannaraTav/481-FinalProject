import React, {useState} from 'react'
import "../styles/SignUp.css"

export default function SignUp() {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        userType: "userType"
    })

  
  function handleSubmit(event){
    event.preventDefault(); 
    alert(`Email:  ${inputs.email}\n` + 
           `Password: ${inputs.password}\n` + 
            `User Type: ${inputs.userType}\n`
    );
    
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setInputs(values => ({...values, [name]: value}))  
  }

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: inputs.email,
      password: inputs.password,
      // options: {
      //   emailRedirectTo: 'https://example.com/welcome',
      // },
    })
  }
  
  return (
    <div>
      <form onSubmit ={handleSubmit}>
      <label className='sign'>Sign Up</label>
      <h6>Create your account</h6>
      <div> 
        <label htmlFor='email'></label>
        <input type="email" id ="email" name="email" placeholder="Enter Email" value={inputs.email || ""} onChange={handleChange} ></input>
      </div> 
      <div> 
        <label htmlFor='password'></label>
        <input type="password" id ="password" name="password" placeholder="Password" value={inputs.password || ""} onChange={handleChange} ></input>
      </div> 
      <div>
        <input type="radio" id="alumniType" name="userType" value="Alumni" checked={inputs.userType == "Alumni"} onChange={handleChange} />
        <label for="alumniType" class="radio-label">Alumni</label>
          
        <input type="radio" id="studentType" name="userType" value="Student" checked={inputs.userType == "Student"} onChange={handleChange}/>
        <label for="studentType" class="radio-label">Student</label>
      </div>
      <div>
        <input type="submit" value="Sign Up"></input>
      </div>
    </form>
    </div>
  )
}
