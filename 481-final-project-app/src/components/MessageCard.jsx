import React from 'react'

export default function MessageCard({message}) {
  return (
    <div>
      <div className="horizontal">
        <div>{message[0]}</div>
        <div>{message[2][message[1].length-1]}</div>
      </div>
      <div>{message[1][message[1].length-1][0]}</div>
    </div>
  )
}
