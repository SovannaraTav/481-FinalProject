import React, {useEffect, useState}  from 'react';
import SupabaseStorage from '../classes/SupabaseStorage';
import defaultPic from '../assets/default.jpg';

/*
ProfileCard React component to display a preview card containing the profile 
picture and full name for an user on the home page of the website application
*/
export default function ProfileCard({name, picture, role=null}) {
  const storage = new SupabaseStorage("profile_pictures");
  const [profilePicture, setProfilePicture] = useState(defaultPic);

  useEffect(() => {
    /*
    Fetches the profile picture of the user and sets it in state based on their 
    profile picture field. If it is empty, then a default profile picture is 
    used instead
    */
    const fetchSenderProfilePicture = async () => {
      if (picture !== "") {
        const profilePictureUrl = await storage
          .generatePublicProfilePictureUrl(picture);
        setProfilePicture(profilePictureUrl.data.publicUrl);
      }
    }

    fetchSenderProfilePicture();
  }, []);

  return (
    // Displays the user's profile card with their profile picture and full name
    <div className="card">
      <img className="card-image" src={profilePicture}></img>
      <div className="card-description">{name.length < 16 ? name :
      name.substring(0, 15) + '...'}</div>
    </div>
  );
}
