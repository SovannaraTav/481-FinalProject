import React from 'react'
import { Outlet, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div class="navbar">
      <Link to="/"><img id="logo"/></Link>
      <div class="navbar-right">
        <a><Link to="/">Explore</Link></a>
        <a><Link to="/connections">Connections</Link></a>
        <a><Link to="/profile"><img id="profile-icon"/></Link></a>
      </div>
    </div>
  )
}
