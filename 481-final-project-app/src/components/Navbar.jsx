import React, { useState, useEffect } from 'react'
import { Outlet, Link } from "react-router-dom";
import SupabaseAuthentication from '../classes/SupabaseAuthentication';
import SupabaseDatabase from '../classes/SupabaseDatabase';
import SupabaseStorage from '../classes/SupabaseStorage';
import logo from '../assets/logo.png';
import defaultPic from '../assets/default.jpg';

export default function Navbar() {
  const auth = new SupabaseAuthentication();
  const db = new SupabaseDatabase();
  const storage = new SupabaseStorage("profile_pictures");
  const[loggedIn, setLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(defaultPic);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await auth.retrieveUser();
      setLoggedIn(user);

      const obj = await db.readRecordFromTable("accounts", "accountId", `${user.id}`);
      if (obj.data) {
        if (obj.data[0].profilePicture !== "") {
          const profilePictureUrl = await storage
            .generatePublicProfilePictureUrl(obj.data[0].profilePicture);
          setProfilePicture(profilePictureUrl.data.publicUrl);
        }
      } 
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
        src={profilePicture}
        /></Link></a>
      </div>
    </div>
  )
}
