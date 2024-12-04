import React, { useState, useEffect } from 'react'
import SupabaseRealtime from '../classes/SupabaseRealtime'
import Message from '../classes/Message';
import SupabaseAuthentication from '../classes/SupabaseAuthentication';

export default function MessageBox({ name = "Test", thread }) {
  const messaging = new SupabaseRealtime();
  const [messageContent, setMessageContent] = useState("");
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const auth = new SupabaseAuthentication();
    const getUser = async () => {
      setUser(await auth.retrieveUser());
      console.log(user)
    }

    getUser()
  }, [])

  /*const handleSentMessage = (e) => {
    e.preventDefault();

    if (messageContent.trim() !== "") {
      const messageToSend = new Message(
        "", message.message.receiverId, message.message.senderId,
        messageContent, "", false
      );
      messaging.sendMessage(messageToSend.toObject());
      setMessageContent("");
    }
  }*/

  if(!user){
    return <div>Start the conversation</div>
  }
  return (
    <div>
      <div style={{
        padding: "5px 10px",
        marginBottom: "10px",
        borderBottom: "1px solid lightgray",
        fontSize: "20px",
        color: "#4b207e",
      }}>
        {name}
      </div>
      <div>
        {thread.map(msg => {
          return <div
            style={{
              backgroundColor: msg.senderId === user.id ? "#98dde2" : "#dad7e5",
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
              {msg.content}
            </div>
            <div style={{
              display: "block",
              fontSize: "12px",
              color: "#f6f6f6"
            }}>
              {msg.senderId === user.id ?
              <span>You </span> :<span>{name} </span>}
              on&nbsp;
              {msg.dateTime}
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
