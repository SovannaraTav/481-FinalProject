import React, { useState, useEffect } from 'react'
import { Outlet, Link } from "react-router-dom";
import SupabaseAuthentication from '../classes/SupabaseAuthentication';
import logo from "../assets/logo.png"
import defaultPic from "../assets/default.jpg"

export default function Navbar() {

  const[loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    const auth = new SupabaseAuthentication();
    const fetchUser = async () => {
      const user = await auth.retrieveUser()
      setLoggedIn(user)
    };

    fetchUser();
  }, []);

  return (
    <div className="navbar">
      <Link to={loggedIn ? '/home' : `/`}><img id="logo" src={logo}/></Link>
      <div className="navbar-right">
        <a><Link to={loggedIn ? '/home' : `/`}>Explore</Link></a>
        <a><Link to={loggedIn ? '/connections' : "/"}>Connections</Link></a>
        <a><Link to={loggedIn ? '/profile' : "/"}><img id="profile-icon"
        // TODO: replace with profile pic if logged in
        src={defaultPic}
        /></Link></a>
      </div>
    </div>
  )
}
