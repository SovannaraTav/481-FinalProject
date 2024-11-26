import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SupabaseDatabase from '../classes/SupabaseDatabase';
import SupabaseAuthentication from '../classes/SupabaseAuthentication';
import defaultBanner from "../assets/banner_default.jpg";
import defaultPic from "../assets/default.jpg";

export default function Profile() {
  const suggestions = ["Alice", "Bob", "Charlie", "David", "Eva"];
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isConnection, setIsConnection] = useState(false);

  useEffect(() => {
    const db = new SupabaseDatabase();
    const auth = new SupabaseAuthentication();

    const fetchData = async () => {
      const obj = await db.readRecordFromTable("accounts", "accountId", `${id}`);
      if (obj.data) {
        setUserInfo(obj.data[0]);
      } else if (obj.error) {
        console.log("There was an error with the Profile page");
      }
    };

    const getUser = async () => {
      const user = await auth.retrieveUser();
      setLoggedInUser(user);
    };

    const getConnections = async () => {
      if (loggedInUser) {
        const obj = await db.readRecordFromTable("accounts", "accountId", `${loggedInUser.id}`);
        if (obj.data) {
          const connections = obj.data[0].connections;
          if (connections.includes(id)) {
            setIsConnection(true);
          }
        }
      }
    };

    fetchData();
    getUser();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      const db = new SupabaseDatabase();
      const getConnections = async () => {
        const obj = await db.readRecordFromTable("accounts", "accountId", `${loggedInUser.id}`);
        if (obj.data) {
          const connections = obj.data[0].connections;
          if (connections.includes(id)) {
            setIsConnection(true);
          }
        }
      };
      getConnections();
    }
  }, [loggedInUser, id]);

  if (!userInfo) {
    return <div className="container">Loading profile information...</div>;
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <img className="banner" src={defaultBanner} alt="banner" />
      <img className="profile-picture" alt="pfp" src={defaultPic} />
      <div className="profile-header">
        <div className="profile-header-top-row">
          <div className="profile-name">
            {`${userInfo.firstName} ${userInfo.lastName}`}
          </div>
          {loggedInUser?.id === id ? (
            <button className="edit-button">Edit</button>
          ) : (
            isConnection ? (
              <button className="message-button">Message</button>
            ) : (
              <button className="connect-button">Connect</button>
            )
          )}
        </div>
        <div className="profile-bio">{userInfo.bio}</div>
      </div>
      <div className="profile-container">
        <div className="profile-information">
          <div>
            <div>Experience</div>
            <ul>
              <li>Example place 1</li>
              <li>Example place 2</li>
            </ul>
          </div>
          <div>Education</div>
          <ul>
            <li>Example school 1</li>
            <li>Example school 2</li>
          </ul>
        </div>
        <div className="similar-profiles">
          <div>Similar profiles</div>
          {suggestions.map((profile, index) => (
            <div key={index}>{profile}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
