import React, { useEffect, useState } from 'react'
import SupabaseDatabase from '../classes/SupabaseDatabase';
import SupabaseStorage from '../classes/SupabaseStorage';
import defaultPic from '../assets/default.jpg'

export default function MessageCard({talkingTo}) {
  const db = new SupabaseDatabase();
  const storage = new SupabaseStorage("profile_pictures");
  const [profilePicture, setProfilePicture] = useState(defaultPic);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const obj = await db.readRecordFromTable("accounts", "accountId", `${talkingTo}`);
      if (obj.data) {
        setUser(obj.data[0]);
      }
    }
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
      <div className="horizontal">
        <img id="profile-icon" alt="pfp" src={profilePicture}></img>
        <div id="grid-item2">
          {user.firstName} {user.lastName}
        </div>
        <div id="grid-item3">
          {/*new Date(message.dateTime).toLocaleString()*/}
        </div>
      </div>

      <div id="grid-item4">
       {/* {message.accounts.firstName}: {message.content.length > 40 ? message.content.substring(0, 40) + "..." : message.content} */}
      </div>
    </div>
  );
}
