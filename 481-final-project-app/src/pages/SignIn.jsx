import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/SignIn.css";
import SupabaseAuthentication from "../classes/SupabaseAuthentication";

export default function SignIn() {
  const navigate = useNavigate();
  const auth = new SupabaseAuthentication();
  const [signInResult, setSignInResult] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  function handleSubmit(event) {
    event.preventDefault();
    // alert(`Email:  ${inputs.email}\n` +
    //        `Password: ${inputs.password}\n`
    // );

    auth.signIn(inputs.email, inputs.password).then((response) => {
      if (response.error) {
        console.log("Error during signin", response.error);
        setSignInResult(false);
      } else {
        console.log("User signin successfully", response.error);
        navigate("../Home");
        setSignInResult(true);
      }
    });
  }
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }
  return (
    <div>
      <form className="formSignIn" onSubmit={handleSubmit}>
        <label className="sign">Sign In</label>
        <h6>Enter Credentials to login</h6>
        <div>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={inputs.email || ""}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={inputs.password || ""}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <p>
            If you want to create an account,{" "}
            <Link to={"/signup"}>Sign Up Here</Link>
          </p>
        </div>
        <div>
          <input type="submit" value="Sign In"></input>
        </div>
      </form>
    </div>
  );
}
