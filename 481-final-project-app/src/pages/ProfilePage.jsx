import React, { useEffect } from 'react'
import Profile from '../components/Profile'
import { useNavigate } from 'react-router-dom';
import SupabaseAuthentication from '../classes/SupabaseAuthentication';

export default function ProfilePage() {

  const navigate = useNavigate();

  useEffect(() => {
    const auth = new SupabaseAuthentication();
    const fetchUser = async () => {
      const user = await auth.retrieveUser();
      if (user) {
        navigate(`/profile/${user.id}`);
      } else {
        console.log("Profile page broke")
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Profile />
    </div>
  );
}
