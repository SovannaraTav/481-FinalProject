import React from 'react'
import defaultPic from '../assets/default.jpg'

export default function MessageCard({ message }) {
  return (
    <div className="message-grid">
      <div className="horizontal">
        <img id="profile-icon" alt="pfp" src={defaultPic}></img>
        <div id="grid-item2">
          {message.accounts.firstName} {message.accounts.lastName}
        </div>
        <div id="grid-item3">
          {new Date(message.dateTime).toLocaleString()}
        </div>
      </div>

      <div id="grid-item4">
        {message.accounts.firstName}: {message.content.length > 40 ? message.content.substring(0, 40) + "..." : message.content}
      </div>
    </div>
  );
}
