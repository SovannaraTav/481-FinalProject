import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SupabaseAuthentication from '../classes/SupabaseAuthentication';
import SupabaseDatabase from '../classes/SupabaseDatabase';
import SupabaseStorage from '../classes/SupabaseStorage';
import logo from '../assets/logo.png';
import defaultPic from '../assets/default.jpg';

/*
NavBar React component to provide navigation links at the top of every page for 
the website application as well as the current user's profile picture icon
*/
export default function Navbar() {
  const auth = new SupabaseAuthentication();
  const db = new SupabaseDatabase();
  const storage = new SupabaseStorage("profile_pictures");
  const[loggedIn, setLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(defaultPic);

  useEffect(() => {
    // Fetches the current user and sets it in the state
    const fetchUser = async () => {
      const user = await auth.retrieveUser();
      setLoggedIn(user);

      /*
      Fetches the profile picture of the current user and sets it in state based 
      on their profile picture field. If it is empty, then a default profile picture 
      is used instead
      */
      const obj = await db.readRecordFromTable("accounts", "accountId", `${user.id}`);
      if (obj.data[0]) {
        if (obj.data[0].profilePicture !== "") {
          const profilePictureUrl = await storage
            .generatePublicProfilePictureUrl(obj.data[0].profilePicture);
          setProfilePicture(profilePictureUrl.data.publicUrl);
        }
      }
    };

    fetchUser();
  }, []);

  /*
  TODO: add back the bring to sign in page when not signed in, there was a bug 
  that automatically navigated you to the sign in page even if you were logged 
  in because it doesn't retrieve if you're logged in immediately but does 
  navigate you immediately
  */
  return (
    <div className="navbar">
      <Link to={'/home'}><img id="logo" src={logo}/></Link>
      <div className="navbar-right">
        <a><Link to={'/home'}>Explore</Link></a>
        <a><Link to={'/connections'}>Connections</Link></a>
        <a><Link to={'/profile'}>
          <img id="profile-icon" src={profilePicture}/>
        </Link></a>
      </div>
    </div>
  );
}
