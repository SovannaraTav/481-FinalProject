import React, {useState, useEffect} from 'react'
import MessageCard from '../components/MessageCard'
import MessageBox from '../components/MessageBox'
import SupabaseAuthentication from '../classes/SupabaseAuthentication'
import SupabaseDatabase from '../classes/SupabaseDatabase'
import SupabaseRealtime from '../classes/SupabaseRealtime'
import defaultPic from '../assets/default.jpg'

export default function Connections({userFrom = null}) {
  const messaging = new SupabaseRealtime();
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const[connections, setConnections] = useState([]);
  const[connectionNames, setConnectionNames] = useState([]);
  const[user, setUser] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0)
    const getUser = async () => {
      const auth = new SupabaseAuthentication();
      setUser(await auth.retrieveUser());
    }

    getUser()
  }, []);

  useEffect(() => {
    const getConnections = async () => {
      const db = new SupabaseDatabase()
      const msg = new SupabaseRealtime()
      if (user) {
        const obj = await db.readRecordFromTable("accounts", "accountId", user.id)
        if (obj.data) {
          setConnections(obj.data[0].connections)
        }
        const obj2 = await msg.retrieveAllMessages()
        if (obj2) {
          const allMessages = {}
          for (let message of obj2) {
            if (message.senderId == user.id || message.receiverId == user.id) {
              let talkingTo = message.senderId == user.id ? message.receiverId : message.senderId
              if (allMessages[talkingTo]) {
                allMessages[talkingTo].push(message)
              } else {
                allMessages[talkingTo] = [message]
              }
            }
          } setMessages(allMessages)
        }
      }
    }

    getConnections()
  }, [user])

  useEffect(()=>{
    if(connections.length > 0){
      const getConnectionNames = async () => {
        const names = [];
        for (let id of connections) {
          const name = await getName(id);
          names.push(name);
        }
        setConnectionNames(names);
      }

      getConnectionNames()
    }
  }, [connections])

  useEffect(() => {
    if (user && !isListening) {
      const fetchMessages = async () => {
        let messages = await messaging.displayReceivedMessages(user.id);
        setMessages(messages);
      }

      fetchMessages();

      messaging.listenForReceivedMessages(user.id);
      setIsListening(true);

      return () => {
        if (isListening) {
          messaging.stopListeningForReceivedMessages();
        }
      }
    }
  }, [user, isListening]);

  useEffect(() => {
    if (userFrom && messages) {
      setSelectedMessage(messages[userFrom]);
    }
  }, [messages]);

  /*useEffect(() => {
    if(messages){
      if(!messages[selectedMessage]){
        setMessages({...messages}.selectedMessage = null)
      }
    }
  }, [selectedMessage])

  /*
  Message plan:
  - check for selected user
    - create a case if there is a selected user but no message from the user
    - display the message if there is a user
  - on the inbox side, list all of the current conversations
  - in the message area, display the selected conversation
  - on the connections side, add a button by each connection that will select the user
  */

  const getName = async (id) => {
    const db = new SupabaseDatabase()
    const account = await db.readRecordFromTable("accounts", "accountId", `${id}`)
    return `${account.data[0].firstName} ${account.data[0].lastName}`
  }

  return (
    <div className="container">
      <div className="title">Your Connections</div>
      <div className="flex connections-container">
        <div>
          <div className="message-box">
            <div className="message-list">
              <div className="title-label">Inbox</div>
              {Object.keys(messages).length === 0 ? <div className="">No messages yet. Start a new one!</div> :
                <>
                  {Object.keys(messages).map((talkingWith) => {
                    return (
                      <div key={talkingWith} className="message-card" onClick={() =>
                      {setSelectedMessage(messages[talkingWith])
                        setSelectedMessageId(talkingWith)
                      }}>
                        <MessageCard talkingTo={talkingWith} />
                      </div>
                    );
                  })}
                </>
              }
            </div>

            <div id="message-area">
              {(selectedMessage == null || selectedMessageId == null)?
                <p style={{textAlign: 'center'}}>No conversation selected</p>
                :
                <MessageBox id={selectedMessageId} thread={selectedMessage} />
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

          <input className = "search"
            style={{
              width: "80%",
              margin: "10px",
            }}
            type="text" placeholder="Search by name"></input>

          <div className="connection-list">
            {connectionNames.map((connection, index) => {
              return <div key={index} className="connection">
                <img alt="pfp" id="profile-icon" src={defaultPic}></img>
                {connection}
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
