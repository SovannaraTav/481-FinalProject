import React, {useState} from 'react'
import MessageCard from '../components/MessageCard'
import Message from '../components/Message'

export default function Connections() {

  // dummy data
  const connections =  ["Alice", "Bob", "Charlie", "David", "Eva"]
  const messages = [
  ["David", [["hello", true], ["Yo", false], ["thanks for connecting", true], ["Ok", false]],
  ["11-5-2024", "11-5-2024", "11-5-2024", "11-5-2024"]],
  ["Alice", [["hi", true], ["hello?", true], ["bruh", true]],
  ["11-2-2024", "11-3-2024", "11-5-2024",]]]
  const [selectedMessage, setSelectedMessage] = useState(null)

  // move this back to the message component once figured out
  const displayMessage = (message) => {
    const messageArea = document.getElementById("message-area")
    messageArea.innerHTML =
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
  }

  return (
    <div className="container">
      <div className="title">Your Connections</div>
      <div className="flex connections-container">
        <div>
          <div className="message-box">
            <div className="message-list">
              <div className="title-label">Inbox</div>
              {messages.map(message => {
                return <div onClick={()=>displayMessage({message})}>
                  <MessageCard message = {message}></MessageCard>
                </div>
              })}
            </div>
            <div id="message-area">
              No conversation selected
                {/*<Message message = {selectedMessage}></Message>*/}
            </div>
          </div>
        </div>
        <div className="connections-box">
          <div className="title-label">Connections</div>
          <div className="connection-filters">
            <div>Filters</div>
            <input type="checkbox" id="placeholder" name="placeholder" value="placeholder" />
            <label for="placeholder">Placeholder</label><br />
            <input type="checkbox" id="placeholder" name="placeholder" value="placeholder" />
            <label for="placeholder">Placeholder</label><br />
          </div>
          <input className = "search" style={{
            width: '80%',
            margin: '10px'
            }} type="text" placeholder="Search by name"></input>
          <div className="connection-list">
            {connections.map(connection => {
              return <div className="connection">
                <img alt="pfp"></img>
                {connection}
              </div>
            })}
          </div>
        </div>
      </div>
    </div>

  )
}
