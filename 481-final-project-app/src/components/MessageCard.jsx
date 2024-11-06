import React from 'react'

export default function MessageCard({message}) {
  return (
    <div className="message-grid">
      {/* change layout of this once grid is fixed */}
      <div className="horizontal">
        <img id="grid-item1" alt="pfp"></img>
        <div id="grid-item2">{message[0]}</div>
        <div id="grid-item3">{message[2][message[1].length-1]}</div>
      </div>
      <div id="grid-item4">
        {message[1][message[1].length-1][1] ?
        <span>You: </span> :<span>{message[0]}: </span>}
        {message[1][message[1].length-1][0]}
      </div>
    </div>
  )
}
