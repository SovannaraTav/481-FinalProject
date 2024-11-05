import React from 'react'

export default function Message({message}) {
  return (
    <div>
      <div>{message[0]}</div>
      <div>
        {message [1] && message[1].map(msg => {
          <div
            style={{
              backgroundColor: msg[1] ? "blue" : "grey",
              textAlign: msg[1] ? "right": "left"
            }}
          >
            {msg[0]}
          </div>
        })}
      </div>
    </div>
  )
}
