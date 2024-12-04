import React, {useEffect, useState}  from 'react';
import SupabaseStorage from '../classes/SupabaseStorage';
import defaultPic from '../assets/default.jpg';

export default function ProfileCard({name, picture, role=null}) {
  const storage = new SupabaseStorage("profile_pictures");
  const [profilePicture, setProfilePicture] = useState(defaultPic);

  useEffect(() => {
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
    <div className="card">
      <img className="card-image" src={profilePicture}></img>
      <div className="card-description">{name.length < 16 ? name :
      name.substring(0, 15) + '...'}</div>
    </div>
  )
}
