import React from 'react'

export default function ProfileCard({name}) {
  console.log("here")
  return (
    <div className="card">
      <img className="card-image"></img>
      <div className="card-description">{name}</div>
    </div>
  )
}
