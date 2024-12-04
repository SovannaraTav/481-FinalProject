import React, { useState, useEffect } from 'react'
import SupabaseRealtime from '../classes/SupabaseRealtime'
import Message from '../classes/Message';
import SupabaseAuthentication from '../classes/SupabaseAuthentication';
import SupabaseDatabase from '../classes/SupabaseDatabase';

export default function MessageBox({ id, thread }) {
  const messaging = new SupabaseRealtime();
  const [messageContent, setMessageContent] = useState("");
  const [user, setUser] = useState(null);
  const[talkingTo, setTalkingTo] = useState(null);
  // TODO: make it so that it actually listens for new messages from the database
  const [updatedThread, setUpdatedThread] = useState(thread);

  useEffect(()=>{
    const auth = new SupabaseAuthentication();
    const getUser = async () => {
      setUser(await auth.retrieveUser());
    }

    getUser()
  }, [])

  useEffect(() => {
    setUpdatedThread(thread);

    const db = new SupabaseDatabase();
    const getTalkingTo = async () => {
      const obj2 = await db.readRecordFromTable("accounts", "accountId", id)
      if (obj2.data) {
        setTalkingTo(obj2.data[0]);
      }
    }

    getTalkingTo()
  }, [id])

  console.log(updatedThread)
  const handleSentMessage = (e) => {
    e.preventDefault();

    if (messageContent.trim() !== "") {
      const messageToSend = new Message(
        "", user.id, id,
        messageContent, "", false
      );
      messaging.sendMessage(messageToSend.toObject()).then(() => {
        const newMessage = {
          ...messageToSend,
          content: messageContent,
          dateTime: new Date().toISOString(),
          senderId: user.id
        };
        setUpdatedThread((prevThread) => [...prevThread, newMessage]);
        setMessageContent("");
      });
    }
  }

  if(!user || !talkingTo){
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
        {talkingTo.firstName} {talkingTo.lastName}
      </div>
      <div>
        {updatedThread.map(msg => {
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
      <div>
        <input
          value={messageContent}
          placeholder="Enter message here to send"
          onChange={(e) => setMessageContent(e.target.value)}
          style={{
            position: "sticky",
            bottom: "0",
            left: "0",
            width: "98%",
            height: "30px",
            background: "#fff",
            border: "1px solid lightgray",
            borderRadius: "5px",
            marginTop: "150px",
        }}
        ></input>
        <button onClick={handleSentMessage}>Send</button>
      </div>
    </div>
  )
}
