import React, {useState, useEffect} from 'react'
import MessageCard from '../components/MessageCard'
import Message from '../components/Message'
import SupabaseAuthentication from '../classes/SupabaseAuthentication'

export default function Connections() {

  // dummy data
  const connections =  ["Alice", "Bob", "Charlie", "David", "Eva"]
  const messages = [
  ["David", [["hello", true, "11-5-2024"], ["Yo", false, "11-5-2024"],
  ["thanks for connecting", true, "11-5-2024"], ["Ok", false, "11-5-2024"]]],
  ["Alice", [["hi", true, "11-2-2024"], ["hello?", true, "11-3-2024"],
  ["bruh", true, "11-5-2024"]]],
  ["Test", [["testing a long message that would go onto the next line like this"
    , false, "1-1-2000"
  ], ["a", false, "1-1-2000"], ["a", false, "1-1-2000"], ["a", false, "1-1-2000"], ["a", false, "1-1-2000"], ["a", false, "1-1-2000"], ["a", false, "1-1-2000"], ["a", false, "1-1-2000"], ["a", false, "1-1-2000"], ["a", false, "1-1-2000"]]]]
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(()=>{
    const getUser = async () => {
      const auth = new SupabaseAuthentication();
      const user = auth.retrieveUser();
      console.log(user)
    }

    getUser()
  }, []);

  return (
    <div className="container">
      <div className="title">Your Connections</div>
      <div className="flex connections-container">
        <div>
          <div className="message-box">
            <div className="message-list">
              <div className="title-label">Inbox</div>
              {messages.map(message => {
                return <div onClick={()=>setSelectedMessage({message})}>
                  <MessageCard message = {message}></MessageCard>
                </div>
              })}
            </div>
            <div id="message-area">
              {selectedMessage == null ?
              <p style={{textAlign: 'center'}}>No conversation selected</p>
              :
              <Message message = {selectedMessage}></Message>
              }
            </div>
          </div>
        </div>
        <div className="connections-box">
          <div className="title-label">Connections</div>
          <div className="connection-filters">
            <input type="checkbox" id="alumni" name="alumni" value="alumni" />
            <label for="placeholder">Alumni</label><br />
            <input type="checkbox" id="student" name="student" value="student" />
            <label for="placeholder">Student</label><br />
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
