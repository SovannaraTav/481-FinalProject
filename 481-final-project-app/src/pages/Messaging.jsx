import React, { useState } from "react";
import SupabaseRealtime from "../classes/SupabaseRealtime.js";
import Message from "../classes/Message.js";

export default function Messaging() {
    const messaging = new SupabaseRealtime();
    const [inputs, setInputs] = useState({
        messageId: "",
        senderId: "",
        receiverId: "",
        content: "",
        dateTime: "",
        isMarkAsRead: false
    });
    const [messages, setMessages] = useState([]);

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    function handleSubmit(event) {
        event.preventDefault();
        let message = new Message(
            inputs.messageId, inputs.senderId, inputs.receiverId,
            inputs.content, inputs.dateTime, inputs.isMarkAsRead);
        messaging.sendMessage(message.toObject());
    }

    async function handleDisplayMessages() {
        let data = await messaging
            .displayReceivedMessages("60f92924-3862-4cfb-b4e8-a58689610215");
        setMessages(data);
    }

    function handleListeningForReceivedMessages() {
        messaging.listenForReceivedMessages("60f92924-3862-4cfb-b4e8-a58689610215");
    }

    function handleStopReceivedMessages() {
        messaging.stopListeningForReceivedMessages();
    }

    return (
        <div className="container">
            <div className="title">Subscribe to channel for realtime updates</div>
            <div>
                <input 
                    type="submit" value="Listen for received messages" 
                    onClick={handleListeningForReceivedMessages}></input>
            </div>

            <div className="title">Send Message</div>
            <div className="flex connections-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="senderId">From:</label>
                    <input 
                        type="text" id="senderId" name="senderId" 
                        value={inputs.senderId || ""} onChange={handleChange}></input>

                    <label htmlFor="receiverId">To:</label>
                    <input 
                        type="text" id="receiverId" name="receiverId" 
                        value={inputs.receiverId || ""} onChange={handleChange}></input>

                    <label htmlFor="content">Message content:</label>
                    <textarea 
                        id="content" name="content" 
                        value={inputs.content || ""} onChange={handleChange}></textarea>

                    <input type="submit" value="Send"></input>
                </form>
            </div>

            <div className="title">Unsubscribe to channel for realtime updates</div>
            <div>
                <input 
                    type="submit" value="Stop listening for received messages" 
                    onClick={handleStopReceivedMessages}></input>
            </div>

            <div className="title">Received Messages</div>
            <div>
                <input type="submit" value="Display received messages" onClick={handleDisplayMessages}></input>
                {messages.map(message => {
                    return (
                        <div key={message.messageId}>
                            <p><strong>{message.accounts.firstName} {message.accounts.lastName}</strong> | 
                                &nbsp; {new Date(message.dateTime).toLocaleString()}</p>
                            <p>{message.content}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}