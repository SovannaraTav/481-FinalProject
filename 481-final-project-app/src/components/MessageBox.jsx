import React, { useState, useEffect, useRef } from 'react'
import SupabaseRealtime from '../classes/SupabaseRealtime'
import Message from '../classes/Message';
import SupabaseAuthentication from '../classes/SupabaseAuthentication';
import SupabaseDatabase from '../classes/SupabaseDatabase';

export default function MessageBox({ id, thread }) {
  const messaging = new SupabaseRealtime();
  const [messageContent, setMessageContent] = useState("");
  const [user, setUser] = useState(null);
  const [talkingTo, setTalkingTo] = useState(null);
  const [updatedThread, setUpdatedThread] = useState(thread);

  // TODO: automatically scroll to the bottom of each message thread
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const auth = new SupabaseAuthentication();
    const getUser = async () => {
      setUser(await auth.retrieveUser());
    };
    getUser();
  }, []);

  useEffect(() => {
    setUpdatedThread(thread);

    const db = new SupabaseDatabase();
    const getTalkingTo = async () => {
      const obj2 = await db.readRecordFromTable("accounts", "accountId", id);
      if (obj2.data) {
        setTalkingTo(obj2.data[0]);
      }
    };
    getTalkingTo();
  }, [id]);

  /*useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [updatedThread]);*/

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
  };

  if (!user || !talkingTo) {
    return <div></div>;
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      maxHeight: "500px",
      backgroundColor: "#fff",
      position: "relative",
      overflowX: "hidden"
    }}>
      <div style={{
        position: "sticky",
        top: "0",
        backgroundColor: "#fff",
        fontSize: "20px",
        zIndex: "10",
        textAlign: "center",
        padding: "5px 10px",
        marginBottom: "10px",
        borderBottom: "1px solid lightgray",
        color: "#4b207e",
      }}>
        {talkingTo.firstName} {talkingTo.lastName}
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        padding: "10px",
        overflowY: "auto",
        marginBottom: "50px",
        scrollbarWidth: "none"
      }}>
        {updatedThread.map((msg, idx) => {
          return (
            <div
              key={idx}
              style={{
                backgroundColor: msg.senderId === user.id ? "#0078FE" : "#989898",
                color: "white",
                padding: "10px",
                marginBottom: "5px",
                borderRadius: "5px",
              }}
            >
              <div>{msg.content}</div>
              <div style={{
                fontSize: "12px",
                color: "#f6f6f6",
              }}>
                {msg.senderId === user.id ? <span>You</span> : <span>{talkingTo.firstName}</span>}
                &nbsp;on {msg.dateTime.substring(0, 10) + " " + msg.dateTime.substring(11, 16)}
              </div>
            </div>
          )
        })}
      </div>
      {/* <div ref={messagesEndRef} />  {/* This div will act as the target for scrolling */}
      <div style={{
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "100%",
        padding: "10px",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <input
          value={messageContent}
          placeholder="Enter message here to send"
          onChange={(e) => setMessageContent(e.target.value)}
          style={{
            width: "85%",
            padding: "8px",
            border: "1px solid lightgray",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleSentMessage}
          style={{
            padding: "0px",
            backgroundColor: "#4b207e",
            color: "white",
            border: "none",
            borderRadius: "5px",
            maxWidth: "50px",
            maxHeight: "30px",
            margin: "0 20px 0 10px",
            fontSize: "15px"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
