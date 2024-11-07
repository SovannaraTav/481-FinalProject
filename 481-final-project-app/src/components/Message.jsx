import React from 'react'

export default function Message({message}) {
  // still needs to work on: input box positioning, name positioning, input box overflow
  return (
    <div>
      <div style={{
        padding: "5px 10px",
        marginBottom: "10px",
        borderBottom: "1px solid lightgray",
        fontSize: "20px",
        color: "#4b207e",
      }}>
        {message.message[0]}
      </div>
      <div>
        {message.message[1].map(msg => {
          return <div
            style={{
              backgroundColor: msg[1] ? "#98dde2" : "#dad7e5",
              color: "white",
              padding: "10px",
              marginBottom: "5px",
              borderRadius: "5px",
            }}
          >
            <div style={{position: 'sticky',
              top: '0',
              left: '0'}}
            >
              {msg[0]}
            </div>
            <div style={{
              display: "block",
              fontSize: "12px",
              color: "#f6f6f6"
            }}>
              {msg[1] ?
              <span>You </span> :<span>{message.message[0]} </span>}
              on&nbsp;
              {msg[2]}
            </div>
          </div>
        })}
      </div>
      <input style={{
          position: 'sticky',
          bottom: '0',
          left: '0',
          width: '98%',
          height: '30px',
          background: '#fff',
          border: '1px solid lightgray',
          borderRadius: '5px',
          marginTop: '150px'
      }}>
      </input>
    </div>
  )
}
