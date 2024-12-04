import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SupabaseAuthentication from '../classes/SupabaseAuthentication';
import SupabaseDatabase from '../classes/SupabaseDatabase';
import SupabaseStorage from '../classes/SupabaseStorage';
import defaultBanner from '../assets/banner_default.jpg';
import defaultPic from '../assets/default.jpg';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
  const navigate = useNavigate();
  const auth = new SupabaseAuthentication();
  const db = new SupabaseDatabase();
  const storage = new SupabaseStorage("profile_pictures");
  const suggestions = ["Alice", "Bob", "Charlie", "David", "Eva"];
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [profilePicture, setProfilePicture] = useState(defaultPic);
  const [experiences, setExperiences] = useState([]);
  const [interests, setInterests] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isConnection, setIsConnection] = useState(false);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const obj = await db.readRecordFromTable("accounts", "accountId", `${id}`);
      if (obj.data) {
        setUserInfo(obj.data[0]);

        if (obj.data[0].profilePicture !== "") {
          const profilePictureUrl = await storage
            .generatePublicProfilePictureUrl(obj.data[0].profilePicture);
          setProfilePicture(profilePictureUrl.data.publicUrl);
        }

        if (obj.data[0].account_type === "Alumni") {
          const experiencesData = await db
            .readRecordFromTable("experiences", "alumniId", `${id}`);
          setExperiences(experiencesData.data);
        }
        else {
          const interestsData = await db
            .readRecordFromTable("interests", "studentId", `${id}`);
          setInterests(interestsData.data);
        }
      }
      else if (obj.error) {
        console.log("There was an error with the Profile page");
      }
    };

    const getUser = async () => {
      const user = await auth.retrieveUser();
      setLoggedInUser(user);
    };

    fetchData();
    getUser();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      const getConnections = async () => {
        const obj = await db.readRecordFromTable("accounts", "accountId", `${loggedInUser.id}`);
        if (obj.data) {
          setConnections(obj.data[0].connections)
        }
      };
      getConnections();
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (connections.includes(id)) {
      setIsConnection(true);
    }
  }, [connections])

  if (!userInfo) {
    return <div className="container">Loading profile information...</div>;
  }

  function handleSubmit(event){
    alert("signout button slicked")
    // event.preventDefault();
      auth.signOut();
      navigate('../signin')
      // .then(response => {
      //   if(response === null){
      //     console.log("signout successfull")
      //   } else {
      //     console.log("error signup")
      //   }
      // })
    }
    // auth.signOut()
    // .then(response => {
    //   if (response.error) {
    //     console.log("Error during signout", response.error);
    //     setSignInResult(false);

    //   } else {
    //     console.log("User signout successfully", response.error);
    //     navigate("../Home");
    //     setSignInResult(true);
    //   }
    // })

  const handleConnect = () => {
    const db = new SupabaseDatabase()
    db.updateRecordFromTable("accounts", {connections: [...connections, id]}, "accountId", loggedInUser.id)
    setIsConnection(true)
    db.updateRecordFromTable("accounts", {connections: [...connections, loggedInUser.id]}, "accountId", id)
  };


  return (
    <div style={{ marginTop: '50px' }}>
      <img className="banner" src={defaultBanner} alt="banner" />
      <img className="profile-picture" alt="pfp" src={profilePicture} />
      <div className="profile-header">
        <div className="profile-header-top-row">
          <div className="profile-name">
            {`${userInfo.firstName} ${userInfo.lastName}`}
          </div>
          {loggedInUser?.id === id ? (
            <div className="profile-buttons">
              <button className="edit-button" onClick = {() => navigate("/enterinfo") }>Edit</button>
              <button className="sign-out-button" onClick = {handleSubmit}>Sign Out</button>
            </div>
          ) : (
            isConnection ? (
              <button className="message-button" onClick = {() => navigate("/connections", { state: { id } }) }>Message</button>
            ) : (
              <button className="connect-button" onClick={handleConnect}>Connect</button>
            )
          )}
        </div>
        <div className="profile-bio">{userInfo.bio}</div>
      </div>

      <div className="profile-container">
        <div className="profile-information">
          <div>
            {userInfo.account_type === "Alumni" ? (
              <div>
                <p><strong>Experiences:</strong></p>
                {experiences.map((experience, index) => {
                  return (
                    <div key={experience.experienceId}>
                      <p>
                        <strong>[{index + 1}] {experience.jobTitle} @ {experience.company}</strong>
                        &nbsp;| {experience.jobType} | {experience.field} | {experience.location}
                      </p>
                      <ul>
                        <li><strong>Start date:</strong> {experience.startDate}</li>
                        <li><strong>End date:</strong> {experience.endDate}</li>
                        <li><strong>Description:</strong> {experience.description}</li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <p><strong>Interests:</strong></p>
                {interests.map((interestInfo) => {
                  return (
                  <ul>
                    <li key={interestInfo.interestId}>{interestInfo.interest}</li>
                  </ul>
                  );
                })}
              </div>
            )}
          </div>
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