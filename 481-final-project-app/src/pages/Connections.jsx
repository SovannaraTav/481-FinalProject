import React, {useState, useEffect} from 'react'
import MessageCard from '../components/MessageCard'
import MessageBox from '../components/MessageBox'
import SupabaseAuthentication from '../classes/SupabaseAuthentication'
import SupabaseDatabase from '../classes/SupabaseDatabase'
import SupabaseRealtime from '../classes/SupabaseRealtime'
import defaultPic from '../assets/default.jpg'

export default function Connections() {
  const messaging = new SupabaseRealtime();
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
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
      if (user) {
        const obj = await db.readRecordFromTable("accounts", "accountId", `${user.id}`)
        if (obj.data) {
          setConnections(obj.data[0].connections);
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
              {messages.length == 0 ? <div className="">No messages yet. Start a new one!</div> :
                <>
                  {messages.map(message => {
                    return (
                      <div key={message.messageId} className="message-card" onClick={()=>setSelectedMessage({message})}>
                        <MessageCard message={message} />
                      </div>
                    );
                  })}
                </>
              }
            </div>

            <div id="message-area">
              {selectedMessage == null ?
                <p style={{textAlign: 'center'}}>No conversation selected</p>
                :
                <MessageBox message={selectedMessage} />
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
