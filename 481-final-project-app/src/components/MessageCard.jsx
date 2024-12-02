import React from 'react'

export default function MessageCard({ message }) {
  return (
    <div className="message-grid">
      <div className="horizontal">
        <img id="grid-item1" alt="pfp"></img>
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
