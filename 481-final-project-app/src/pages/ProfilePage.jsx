import React, { useEffect } from 'react'
import Profile from '../components/Profile'
import { useNavigate } from 'react-router-dom';
import SupabaseAuthentication from '../classes/SupabaseAuthentication';


/* The profile page renders the profile component for the current logged in user */
export default function ProfilePage() {

  const navigate = useNavigate();

  useEffect(() => {
    // Makes sure the page is scrolled to the top when first entering
    window.scrollTo(0, 0)

    const auth = new SupabaseAuthentication();

    // Fetches the current user and redirects them to their profile component
    const fetchUser = async () => {
      const user = await auth.retrieveUser();
      if (user) {
        navigate(`/profile/${user.id}`);
        console.log(user)
      } else {
        console.log("Profile page broke")
      }
    };

    fetchUser();
  }, []);

  // Backup code
  return (
    <div>
      There was an error
    </div>
  );
}
