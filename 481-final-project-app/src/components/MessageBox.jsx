import React, { useState, useEffect, useRef } from 'react';
import SupabaseAuthentication from '../classes/SupabaseAuthentication';
import SupabaseDatabase from '../classes/SupabaseDatabase';
import SupabaseRealtime from '../classes/SupabaseRealtime';
import Message from '../classes/Message';

/*
New MessageBox React component meant for the built-in messaging service in the 
Connections page to display the messages sent and received between the current 
user and the user they are messaging
*/
export default function MessageBox({ id, thread }) {
  const auth = new SupabaseAuthentication();
  const db = new SupabaseDatabase();
  const messaging = new SupabaseRealtime();
  const [messageContent, setMessageContent] = useState("");
  const [user, setUser] = useState(null);
  const [talkingTo, setTalkingTo] = useState(null);
  const [updatedThread, setUpdatedThread] = useState(thread);

  // TODO: automatically scroll to the bottom of each message thread
  const messagesEndRef = useRef(null);

  // Fetches the current user and sets it in the state
  useEffect(() => {
    const getUser = async () => {
      setUser(await auth.retrieveUser());
    };

    getUser();
  }, []);

  // Updates the messages thread and fetches the user being messaged
  useEffect(() => {
    setUpdatedThread(thread);

    const getTalkingTo = async () => {
      const obj2 = await db.readRecordFromTable("accounts", "accountId", id);
      if (obj2.data) {
        setTalkingTo(obj2.data[0]);
      }
    };

    getTalkingTo();
  }, [id]);

  // Testing/debugging code
  /*useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [updatedThread]);*/

  const handleSentMessage = (e) => {
    e.preventDefault();

    // Ensures the current user can't send an empty message to another user
    if (messageContent.trim() !== "") {
      const messageToSend = new Message(
        "", user.id, id,
        messageContent, "", false
      );

      // Appends the new message to the thread and clears the input text field
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

  // Sends the message when the "Enter" key is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSentMessage(e);
    }
  };

  // Renders nothing if user state or talkingTo state is not set
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
      {/* Displays the full name of the user that the current user is messaging */}
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

      {/* Displays the content, the user who sent the message, and at what date 
      and time it was sent for each message in the thread */}
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
          );
        })}
      </div>

      {/* <div ref={messagesEndRef} />  {/* This div will act as the target for scrolling */}
      {/* Displays an input text field and send button for the current user to 
      send a new message to another user*/}
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
          onKeyDown={handleKeyPress}
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
