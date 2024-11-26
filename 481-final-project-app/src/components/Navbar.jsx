import React, { useState, useEffect } from 'react'
import { Outlet, Link } from "react-router-dom";
import SupabaseAuthentication from '../classes/SupabaseAuthentication';

export default function Navbar() {

  const[loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    const auth = new SupabaseAuthentication();
    const fetchUser = async () => {
      const user = await auth.retrieveUser()
      .then((user) => user ? setLoggedIn(true) : setLoggedIn(false));
      console.log(loggedIn)
    };

    fetchUser();
  }, []);

  return (
    <div className="navbar">
      <Link to={loggedIn ? '/home' : `/`}><img id="logo"/></Link>
      <div class="navbar-right">
        <a><Link to={loggedIn ? '/home' : `/`}>Explore</Link></a>
        <a><Link to={loggedIn ? '/connections' : "/"}>Connections</Link></a>
        <a><Link to={loggedIn ? '/profile' : "/"}><img id="profile-icon"/></Link></a>
      </div>
    </div>
  )
}
