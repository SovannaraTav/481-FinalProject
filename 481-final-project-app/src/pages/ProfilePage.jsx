import React, { useEffect } from 'react'
import Profile from '../components/Profile'
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {

  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/profile/60f92924-3862-4cfb-b4e8-a58689610215`);
  }, []);

  return (
    <div>
      <Profile></Profile>
    </div>
  )
}
