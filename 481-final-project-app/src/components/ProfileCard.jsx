import React from 'react'

export default function ProfileCard({name, picture, role=null}) {
  return (
    <div className="card">
      <img className="card-image" src={picture}></img>
      <div className="card-description">{name}</div>
    </div>
  )
}
