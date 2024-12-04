import React, { useState } from 'react'
import SupabaseRealtime from '../classes/SupabaseRealtime'
import Message from '../classes/Message';

export default function MessageBox({ message }) {
  const messaging = new SupabaseRealtime();
  const [messageContent, setMessageContent] = useState("");

  const handleSentMessage = (e) => {
    e.preventDefault();

    if (messageContent.trim() !== "") {
      const messageToSend = new Message(
        "", message.message.receiverId, message.message.senderId,
        messageContent, "", false
      );
      messaging.sendMessage(messageToSend.toObject());
      setMessageContent("");
    }
  }

  return (
    <div>
      <div style={{
        padding: "5px 10px",
        marginBottom: "10px",
        borderBottom: "1px solid lightgray",
        fontSize: "20px",
        color: "#4b207e",
        }}
      >
        {message.message.accounts.firstName} {message.message.accounts.lastName}
      </div>

      <div>
          <div
            key={message.message.messageId}
            style={{
              backgroundColor: "#4b207e",
              color: "white",
              padding: "10px",
              marginBottom: "5px",
              borderRadius: "5px",
            }}
          >
            <div style={{
                position: "sticky",
                top: "0",
                left: "0",
              }}
            >
              {message.message.content}
            </div>

            <div style={{
              display: "block",
              fontSize: "12px",
              color: "#f6f6f6",
              }}
            >
              <span>
                {message.message.accounts.firstName} on&nbsp;
                {new Date(message.message.dateTime).toLocaleString()}
              </span>
            </div>
          </div>
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
  );
}
