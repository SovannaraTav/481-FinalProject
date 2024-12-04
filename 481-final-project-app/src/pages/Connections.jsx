import React, {useState, useEffect} from 'react'
import MessageCard from '../components/MessageCard'
import MessageBox from '../components/MessageBox'
import SupabaseAuthentication from '../classes/SupabaseAuthentication'
import SupabaseDatabase from '../classes/SupabaseDatabase'
import SupabaseRealtime from '../classes/SupabaseRealtime'
import defaultPic from '../assets/default.jpg'
import chatIcon from '../assets/msg.png'

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

  useEffect(() => {
    if (user) {
      const fetchNames = async () => {
        const names = {};
        for (const connectionId of connections) {
          const name = await getName(connectionId);
          names[connectionId] = name;
        }
        setConnectionNames(names);
      }

      fetchNames();
    }
  }, [connections, user]);

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
    const account = await db.readRecordFromTable("accounts", "accountId", id)
    return `${account.data[0].firstName} ${account.data[0].lastName}`
  }

  if(selectedMessage){
    console.log("test2", selectedMessage)
    console.log("test", selectedMessage[selectedMessage.length-1])
  }

  return (
    <div className="container" style={{paddingTop: "100px"}}>
      {/*<div className="title">Your Connections</div>*/}
      <div className="flex connections-container">
        <div>
          <div className="message-box">
            <div className="message-list">
              <div className="title-label">Inbox</div>
              {Object.keys(messages).length === 0 ? <div className="no-messages">No messages yet. Start a new one!</div> :
                <>
                  {Object.keys(messages).map((talkingWith) => {
                    return (
                      <div key={talkingWith} className="message-card" onClick={() =>
                      {setSelectedMessage(messages[talkingWith])
                        setSelectedMessageId(talkingWith)
                      }}>
                        <MessageCard latestMessage={messages[talkingWith] ?
                          messages[talkingWith][messages[talkingWith].length - 1]:
                          null} talkingTo={talkingWith} />
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
          <input className = "search"
            style={{
              width: "90%",
              margin: "20px 10px 10px 10px",
            }}
            type="text" placeholder="Search by name"></input>

          <div className="connection-list">
          {connections.map((connection, index) => {
            const connectionName = connectionNames[connection]
              ? (connectionNames[connection].length < 27
                  ? connectionNames[connection]
                  : connectionNames[connection].substring(0, 26) + "..."):""
              return (
                <div key={index} className="connection" onClick={() => {
                  (setSelectedMessage(messages[connection] ? messages[connection] : []))
                  setSelectedMessageId(connection)
                }}>
                  <><img alt="pfp" id="profile-icon" src={defaultPic}></img>
                  {connectionName}</>
                  {/*
                  TODO: add a chat button for more clarity
                  <img alt="chat" style={{width: "20px", height: "20px"}} src={chatIcon}></img>*/}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
