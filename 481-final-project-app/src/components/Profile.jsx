import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SupabaseAuthentication from '../classes/SupabaseAuthentication';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c55c86606c56430cec286311eb5a8f79844125b5
import SupabaseDatabase from '../classes/SupabaseDatabase';
import SupabaseStorage from '../classes/SupabaseStorage';
import defaultBanner from '../assets/banner_default.jpg';
import defaultPic from '../assets/default.jpg';
<<<<<<< HEAD

export default function Profile() {
  const auth = new SupabaseAuthentication();
  const db = new SupabaseDatabase();
  const storage = new SupabaseStorage("profile_pictures");
=======
import defaultBanner from "../assets/banner_default.jpg";
import defaultPic from "../assets/default.jpg";
=======
>>>>>>> c55c86606c56430cec286311eb5a8f79844125b5
import { useNavigate } from 'react-router-dom';


export default function Profile() {
  const navigate = useNavigate();
<<<<<<< HEAD
>>>>>>> 35d4a6b8c3f040b6c63002901b793f1a017d6f6c
=======
  const auth = new SupabaseAuthentication();
  const db = new SupabaseDatabase();
  const storage = new SupabaseStorage("profile_pictures");
>>>>>>> c55c86606c56430cec286311eb5a8f79844125b5
  const suggestions = ["Alice", "Bob", "Charlie", "David", "Eva"];
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [profilePicture, setProfilePicture] = useState(defaultPic);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isConnection, setIsConnection] = useState(false);
  
  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
    const db = new SupabaseDatabase();

>>>>>>> 35d4a6b8c3f040b6c63002901b793f1a017d6f6c
=======
>>>>>>> c55c86606c56430cec286311eb5a8f79844125b5
    const fetchData = async () => {
      const obj = await db.readRecordFromTable("accounts", "accountId", `${id}`);
      if (obj.data) {
        setUserInfo(obj.data[0]);

        if (obj.data[0].profilePicture !== "") {
          const profilePictureUrl = await storage
            .generatePublicProfilePictureUrl(obj.data[0].profilePicture);
          setProfilePicture(profilePictureUrl.data.publicUrl);
        }
      } 
      else if (obj.error) {
        console.log("There was an error with the Profile page");
      }
    };

    const getUser = async () => {
      const user = await auth.retrieveUser();
      setLoggedInUser(user);
    };

    fetchData();
    getUser();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      const getConnections = async () => {
        const obj = await db.readRecordFromTable("accounts", "accountId", `${loggedInUser.id}`);
        if (obj.data) {
          const connections = obj.data[0].connections;
          if (connections.includes(id)) {
            setIsConnection(true);
          }
        }
      };
      getConnections();
    }
  }, [loggedInUser]);

  if (!userInfo) {
    return <div className="container">Loading profile information...</div>;
  }

  function handleSubmit(event){
    alert("signout button slicked")
    // event.preventDefault(); 
      auth.signOut();
      navigate('../signin')
      // .then(response => {
      //   if(response === null){
      //     console.log("signout successfull")
      //   } else {
      //     console.log("error signup")
      //   }
      // }) 
    }
    // auth.signOut()
    // .then(response => {
    //   if (response.error) {
    //     console.log("Error during signout", response.error);
    //     setSignInResult(false);

    //   } else {
    //     console.log("User signout successfully", response.error);
    //     navigate("../Home");
    //     setSignInResult(true);
    //   }
    // })


  return (
    <div style={{ marginTop: '50px' }}>
      <img className="banner" src={defaultBanner} alt="banner" />
      <img className="profile-picture" alt="pfp" src={profilePicture} />
      <div className="profile-header">
        <div className="profile-header-top-row">
          <div className="profile-name">
            {`${userInfo.firstName} ${userInfo.lastName}`}
          </div>
          {loggedInUser?.id === id ? (
            <div className="profile-buttons"> 
              <button className="edit-button" onClick = {() => navigate("/enterinfo") }>Edit</button>
              <button className="sign-out-button" onClick = {handleSubmit}>Sign Out</button>
            </div>
          ) : (
            isConnection ? (
              <button className="message-button">Message</button>
            ) : (
              <button className="connect-button">Connect</button>
            )
          )}
        </div>
        <div className="profile-bio">{userInfo.bio}</div>
      </div>
      
      <div className="profile-container">
        <div className="profile-information">
          <div>
            <div>Experience</div>
            <ul>
              <li>Example place 1</li>
              <li>Example place 2</li>
            </ul>
          </div>
          
          <div>Education</div>
          <ul>
            <li>Example school 1</li>
            <li>Example school 2</li>
          </ul>
        </div>

        <div className="similar-profiles">
          <div>Similar profiles</div>
          {suggestions.map((profile, index) => (
            <div key={index}>{profile}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
