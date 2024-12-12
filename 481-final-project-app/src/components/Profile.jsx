import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SupabaseAuthentication from '../classes/SupabaseAuthentication';
import SupabaseDatabase from '../classes/SupabaseDatabase';
import SupabaseStorage from '../classes/SupabaseStorage';
import defaultBanner from '../assets/banner_default.jpg';
import defaultPic from '../assets/default.jpg';

/*
Profile React component to display further information of the current user as
well as a similar profiles list and the ability to edit the current profile info
and sign out. If the current user is viewing the profile of another user, it will
display the other user's info and the abilty to connect with them or message them
if they are already connected
*/
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
  const [accounts, setAccounts] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationProfilePictures, setRecommendationProfilePictures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const obj = await db.readRecordFromTable("accounts", "accountId", `${id}`);
      if (obj.data) {
        setUserInfo(obj.data[0]);

        /*
        Fetches the profile picture of the user on display and sets it in state based
        on their profile picture field. If it is empty, then a default profile picture
        is used instead
        */
        if (obj.data[0].profilePicture !== "") {
          const profilePictureUrl = await storage
            .generatePublicProfilePictureUrl(obj.data[0].profilePicture);
          setProfilePicture(profilePictureUrl.data.publicUrl);
        }
        else {
          setProfilePicture(defaultPic);
        }

        /*
        If the user on display is a UW alumni, it fetches their experiences and sets
        it in state. Otherwise, it fetches the interests and sets it in state if the
        user on display is a current UW student
        */
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
        // Testing/debugging code
        // console.log("There was an error with the Profile page");
      }
    };

    // Fetches the current logged in user and sets it in the state
    const getUser = async () => {
      const user = await auth.retrieveUser();
      setLoggedInUser(user);
    };

    /*
    Fetches all existing records from the accounts table and sets it in the state
    */
    const getAccounts = async () => {
      const obj2 = await db.readTable("accounts");
      if (obj2.data) {
        setAccounts(obj2.data);
      }
    };

    fetchData();
    getUser();
    getAccounts();
  }, [id]);

  /*
  Fetches the connections of the current logged in user and sets it in the state
  */
  useEffect(() => {
    if (loggedInUser) {
      const getConnections = async () => {
        const obj = await db.readRecordFromTable("accounts", "accountId", `${loggedInUser.id}`);
        if (obj.data[0]) {
          setConnections(obj.data[0].connections);
        }
      };
      getConnections();
    }
  }, [loggedInUser]);

  /*
  If the current logged in user is viewing the profile page of another user and
  that user is a connection, this is set in the state
  */
  useEffect(() => {
    if (connections.includes(id)) {
      setIsConnection(true);
    }
  }, [connections]);


  /*
  If the user on display for the profile picture is a UW alumni, this will return
  other similar UW alumni profiles and set in the state. Otherwise, this will
  return other similar current UW students profiles and set in the state if the
  user on display is a current UW student
  */
  useEffect(() => {
    if(accounts){
      let filteredAccounts = []
      if(userInfo){
        if (userInfo.account_type === "Alumni") {
          filteredAccounts = accounts.filter((account) => {
            return account.account_type == "Alumni" && account.accountId != userInfo.accountId
          })
        } else if (userInfo.account_type === "Student") {
          filteredAccounts = accounts.filter((account) => {
            return account.account_type == "Student" && account.accountId != userInfo.accountId
          })
        }
        setRecommendations(filteredAccounts.slice(0, 5));
      }
    }
  }, [accounts]);

  /*
  Fetches the profile picture for each user set in the recommendations state and
  sets each one in the state to be stored
  */
  useEffect(() => {
    const fetchRecommendationProfilePictures = async () => {
      const profilePictures = {}
      for(let i = 0; i < recommendations.length; i++) {
        const profilePicture =
          await getRecommendationProfilePicture(recommendations[i].profilePicture);
        profilePictures[i] = profilePicture;
      }
      setRecommendationProfilePictures(profilePictures);
    };

    fetchRecommendationProfilePictures();
  }, [recommendations]);

  /*
  Function to retrieve the profile picture of an user and return it to where the
  function was invoked. If the retrieve profile picture is empty, a default picture
  is returned instead
  */
  const getRecommendationProfilePicture = async (profilePicture) => {
    if (profilePicture !== "") {
      const recommendationProfilePicture = await storage
        .generatePublicProfilePictureUrl(profilePicture);
      return recommendationProfilePicture.data.publicUrl;
    }
    else {
      return defaultPic;
    }
  }

  if (!userInfo) {
    return <div className="container">Loading profile information...</div>;
  }

  /*
  Event handler function for when the current logged in user signs out, thus is
  redirected to the sign in page
  */
  function handleSubmit(event) {
    alert("You have signed out!");
    // event.preventDefault();
    auth.signOut();
    navigate('../signin');

    // Testing/debugging code
    // .then(response => {
    //   if(response === null){
    //     console.log("signout successfull")
    //   } else {
    //     console.log("error signup")
    //   }
    // })

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
  }

  /*
  Event handler function for when the current logged in user connects with another
  user, thus updates both of their connections list
  */
  const handleConnect = () => {
    db.updateRecordFromTable(
      "accounts", {connections: [...connections, id]}, "accountId", loggedInUser.id);
    setIsConnection(true);
    db.updateRecordFromTable(
      "accounts", {connections: [...connections, loggedInUser.id]}, "accountId", id);
  };

  return (
    <div style={{ marginTop: '50px' }}>
      {/* Displays the default banner, profile picture, and full name of the user
      on display for the profile page */}
      <img className="banner" src={defaultBanner} alt="banner" />
      <img className="profile-picture" alt="pfp" src={profilePicture} />
      <div className="profile-header">
        <div className="profile-header-top-row">
          <div className="profile-name">
            {`${userInfo.firstName} ${userInfo.lastName}`}
          </div>

          {/* If the profile page display is the current logged in user, then it
          displays the abilty to edit their info and sign out. Otherwise, if the
          profile page display is another user, then it displays the ability to
          connect and message if already connected */}
          {loggedInUser?.id === id ? (
            <div className="profile-buttons">
              <button className="edit-button" onClick = {() => navigate("/enterinfo") }>Edit</button>
              <button className="sign-out-button" onClick = {handleSubmit}>Sign Out</button>
            </div>
          ) : (
            isConnection ? (
              <button
                className="message-button"
                onClick={() => navigate("/connections", { state: { idFrom: id } })}
              >
                Message
              </button>
            ) : (
              <button className="connect-button" onClick={handleConnect}>Connect</button>
            )
          )}
        </div>

        {/* Displays the bio of the user on display for the profile page */}
        <div className="profile-bio">{userInfo.bio}</div>
      </div>

      <div className="profile-container">
        <div className="profile-information">
          <div>
            {userInfo.account_type === "Alumni" ? (
              <div>
                {/* If the profile page display is a UW alumni, it will display each
                each of their experiences and relevant information */}
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
                {/* If the profile page display is a current UW student, it will
                display each each of their interests */}
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

        {/* Displays the profile picture and full name for each user in the similar
        profiles section */}
        <div className="similar-profiles" style={{padding: "50px",}}>
          <div className="similar-profiles-header">Similar profiles</div>
          {recommendations.length > 0 && recommendations.map((profile, index) => (
            <div className="recommendation"
              onClick={() => {navigate(`../profile/${profile.accountId}`)}}>
              <img alt="recommendation" id="profile-icon" src={recommendationProfilePictures[index]}></img>
              <div key={index}>{profile.firstName} {profile.lastName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}