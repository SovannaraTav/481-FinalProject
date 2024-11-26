import React, { useState, useEffect } from 'react'
import { Outlet, Link } from "react-router-dom";
import SupabaseAuthentication from '../classes/SupabaseAuthentication';

export default function Navbar() {

  const[navTo, setNavTo] = useState("")
  useEffect(() => {
    const auth = new SupabaseAuthentication();
    const fetchUser = async () => {
      const user = await auth.retrieveUser();
      if (user) {
        setNavTo("home")
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="navbar">
      <Link to={`/${navTo}`}><img id="logo"/></Link>
      <div class="navbar-right">
        <a><Link to={`/${navTo}`}>Explore</Link></a>
        <a><Link to="/connections">Connections</Link></a>
        <a><Link to="/profile"><img id="profile-icon"/></Link></a>
      </div>
    </div>
  )
}
