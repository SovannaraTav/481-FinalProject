import React, { useState, useEffect } from 'react'
import MessageCard from '../components/MessageCard'
import MessageBox from '../components/MessageBox'
import SupabaseAuthentication from '../classes/SupabaseAuthentication'
import SupabaseDatabase from '../classes/SupabaseDatabase'
import SupabaseRealtime from '../classes/SupabaseRealtime'
import SupabaseStorage from '../classes/SupabaseStorage'
import defaultPic from '../assets/default.jpg'
import chatIcon from '../assets/msg.png'
import { useLocation } from 'react-router-dom';

/* A page that displays all a user's connections as well as the messaging system */
export default function Connections({ userFrom = null }) {

  const db = new SupabaseDatabase();
  const messaging = new SupabaseRealtime();
  const storage = new SupabaseStorage("profile_pictures");

  const [messages, setMessages] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [connections, setConnections] = useState([]);
  const [connectionNames, setConnectionNames] = useState({});
  const [connectionProfilePictures, setConnectionProfilePictures] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const { idFrom } = location.state || {};

  // Sets the searh value when the search bar is used
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Filters the connections displayed based on the search bar
  const filteredConnections = connections.filter((connectionId) => {
    const connectionName = connectionNames[connectionId];
    if (!connectionName) return false;
    return connectionName.toLowerCase().startsWith(search.toLowerCase());
  });

  useEffect(() => {
    // Makes sure the page is scrolled to the top when first entering
    window.scrollTo(0, 0);

    // Gets the current user
    const getUser = async () => {
      const auth = new SupabaseAuthentication();
      setUser(await auth.retrieveUser());
    };
    getUser();
  }, []);

  useEffect(() => {
    const getConnections = async () => {
      const msg = new SupabaseRealtime();
      // gets the user's connections
      if (user) {
        const obj = await db.readRecordFromTable("accounts", "accountId", user.id);
        if (obj.data) {
          setConnections(obj.data[0].connections);
        }
        // gets all the messages and filters them out to the ones to and from the user
        const obj2 = await msg.retrieveAllMessages();
        if (obj2) {
          const allMessages = {};
          for (let message of obj2) {
            if (message.senderId === user.id || message.receiverId === user.id) {
              let talkingTo = message.senderId === user.id ? message.receiverId : message.senderId;
              if (allMessages[talkingTo]) {
                allMessages[talkingTo].push(message);
              } else {
                allMessages[talkingTo] = [message];
              }
            }
          }
          setMessages(allMessages);
        }
      }
    };
    getConnections();
  }, [user]);


  useEffect(() => {
    if (user && !isListening) {
      const fetchMessages = async () => {
        let messages = await messaging.displayReceivedMessages(user.id);
        setMessages(messages);
      };
      fetchMessages();

      messaging.listenForReceivedMessages(user.id);
      setIsListening(true);

      return () => {
        if (isListening) {
          messaging.stopListeningForReceivedMessages();
        }
      };
    }
  }, [user, isListening]);

  // in the case that the "message" option is clicked from a profile component
  // the user selected will automatically be displayed as the current message
  useEffect(() => {
    if (idFrom && messages) {
      setSelectedMessage(messages[idFrom]);
      setSelectedMessageId(idFrom);
    }
  }, [messages, idFrom]);

  // sets the names and profile pictures for each connection listed
  useEffect(() => {
    if (user) {
      const fetchNames = async () => {
        const names = {};
        const profilePictures = {}
        for (const connectionId of connections) {
          const name = await getName(connectionId);
          const profilePicture = await getConnectionProfilePicture(connectionId);
          names[connectionId] = name;
          profilePictures[connectionId] = profilePicture;
        }
        setConnectionNames(names);
        setConnectionProfilePictures(profilePictures);
      };

      fetchNames();
    }
  }, [connections, user]);

  // gets the name and profile picture of a connection
  const getName = async (id) => {
    const account = await db.readRecordFromTable("accounts", "accountId", id);
    return `${account.data[0].firstName} ${account.data[0].lastName}`;
  };
  const getConnectionProfilePicture = async (id) => {
    const connectionAcount =
      await db.readRecordFromTable("accounts", "accountId", id);
    if (connectionAcount.data) {
      if (connectionAcount.data[0].profilePicture !== "") {
        const connectionProfilePicture = await storage
          .generatePublicProfilePictureUrl(connectionAcount.data[0].profilePicture);
        return connectionProfilePicture.data.publicUrl;
      }
      else {
        return defaultPic;
      }
    }
    else {
      return defaultPic;
    }
  }

  /*if (selectedMessage) {
    console.log("test2", selectedMessage);
    console.log("test", selectedMessage[selectedMessage.length - 1]);
  }*/

  return (
    <div className="container" style={{ paddingTop: "75px", paddingBottom: "75px", overflowY: "hidden"}}>
      <div className="flex connections-container">
        <div>
          <div className="message-box">
            {/* The list of messages displayed via MessageCard components*/}
            <div className="message-list">
              <div className="title-label">Inbox</div>
              {Object.keys(messages).length === 0 ? (
                <div className="no-messages">No messages yet. Start a new one!</div>
              ) : (
                <>
                  {Object.keys(messages).map((talkingWith) => {
                    return (
                      <div
                        key={talkingWith}
                        className="message-card"
                        onClick={() => {
                          setSelectedMessage(messages[talkingWith]);
                          setSelectedMessageId(talkingWith);
                        }}
                      >
                        <MessageCard
                          latestMessage={
                            messages[talkingWith] ? messages[talkingWith][messages[talkingWith].length - 1] : null
                          }
                          talkingTo={talkingWith}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            {/* The area where the selected message is displayed */}
            <div id="message-area">
              {selectedMessage == null || selectedMessageId == null ? (
                <p style={{ textAlign: "center" }}>No conversation selected</p>
              ) : (
                <MessageBox id={selectedMessageId} thread={selectedMessage} />
              )}
            </div>
          </div>
        </div>

        {/* The list of connections */}
        <div className="connections-box">
          <div className="title-label">Connections</div>
          {/* The search bar */}
          <input
            className="search"
            style={{
              width: "90%",
              margin: "20px 10px 10px 10px",
            }}
            type="text"
            placeholder="Search by name"
            onChange={handleSearch}
          ></input>
          {/* The list of connections displayed after the search filter is applied */}
          <div className="connection-list">
            {filteredConnections.length === 0 ? (
              <div style={{ textAlign: "center" }}>No connection found</div>
            ) : (
              filteredConnections.map((connectionId, index) => {
                const connectionName =
                // in case the name is too long for the box
                  connectionNames[connectionId] && connectionNames[connectionId].length < 27
                    ? connectionNames[connectionId]
                    : connectionNames[connectionId].substring(0, 26) + "...";

                return (
                  <div
                    key={index}
                    className="connection"
                    onClick={() => {
                      setSelectedMessage(messages[connectionId] ? messages[connectionId] : []);
                      setSelectedMessageId(connectionId);
                    }}
                  >
                    <img alt="pfp" id="profile-icon" src={connectionProfilePictures[connectionId]}></img>
                    {connectionName}
                    {/* Optional: add a chat button */}
                    {/* <img alt="chat" style={{ width: "20px", height: "20px" }} src={chatIcon}></img> */}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
