import React, { useEffect } from 'react'
import Profile from '../components/Profile'
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {

  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/profile/Tushar`);
  }, []);

  return (
    <></>
  )
}
