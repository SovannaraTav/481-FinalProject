import React, { useEffect, useState } from 'react'
import SupabaseDatabase from '../classes/SupabaseDatabase';
import SupabaseStorage from '../classes/SupabaseStorage';
import defaultPic from '../assets/default.jpg'

/*
MessageCard React component meant for the built-in messaging service in the 
Connections page to display the profile picture and full name of each user in 
the inbox section
*/
export default function MessageCard({latestMessage = null, talkingTo}) {
  const db = new SupabaseDatabase();
  const storage = new SupabaseStorage("profile_pictures");
  const [profilePicture, setProfilePicture] = useState(defaultPic);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetches the info of the user in the inbox section and sets it in state
    const getUser = async () => {
      const obj = await db.readRecordFromTable("accounts", "accountId", talkingTo);
      if (obj.data) {
        setUser(obj.data[0]);
      }
    }

    /*
    Fetches the profile picture of the user in the inbox section and sets it in 
    state based on their profile picture field. If it is empty, then a default
    profile picture is used instead
    */
    const fetchSenderProfilePicture = async () => {
      const obj = await db
        .readRecordFromTable("accounts", "accountId", talkingTo);
      if (obj.data) {
        if (obj.data[0].profilePicture !== "") {
          const profilePictureUrl = await storage
            .generatePublicProfilePictureUrl(obj.data[0].profilePicture);
          setProfilePicture(profilePictureUrl.data.publicUrl);
        }
      }
    }

    fetchSenderProfilePicture();
    getUser();
  }, []);

  if (user === null) {
    return null;
  }

  return (
    <div className="message-grid">
      {/* Displays the profile picture and full name of the user in the inbox 
      section */}
      <div className="grid-top">
        <img id="profile-icon" alt="pfp" src={profilePicture}></img>
        <div id="grid-item2" style={{marginLeft: "25px"}}>
          {(user.firstName + " " + user.lastName).length < 20
            ? (user.firstName + " " + user.lastName)
            : (user.firstName + " " + user.lastName).substring(0, 19) + "..."}
        </div>

        <div id="grid-item3">
          {/*
          TODO: incorporate latest message display
          latestMessage && latestMessage.dateTime.substring(0, 10)*/}
        </div>
      </div>

      <div id="grid-item4">
       {/* {message.accounts.firstName}: {message.content.length > 40 ? message.content.substring(0, 40) + "..." : message.content} */}
      </div>
    </div>
  );
}
