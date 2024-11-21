import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import SupabaseDatabase from '../classes/SupabaseDatabase'

export default function Profile() {

  const suggestions =  ["Alice", "Bob", "Charlie", "David", "Eva"]
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null)

  useEffect(()=>{
    const fetchData = async () => {
      console.log("id = ", {id})
      const db = new SupabaseDatabase()
      const obj = await db.readRecordFromTable("accounts", "accountId", `${id}`)
      if (obj.data) {
        setUserInfo(obj.data)
        console.log(userInfo)
        /*
        userInfo is structured like this:
        accountId: "f4a7cb12-5fa6-4f7b-a788-fb6fa64491d5"
        bio: "UW alumni with a background in computer science and business administration. 4+ experience working in the tech and finance industries. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        firstName: "Alice"
        lastName: "Doe"
        profilePicture: "profile_pictures/f4a7cb12-5fa6-4f7b-a788-fb6fa64491d5/Alice.jpg"
        */
      } else if (obj.error) {
        console.log("There was an error with the Profile page")
      }
    }

    fetchData()
  }, [id, userInfo]);

  return (
    <div style={{marginTop: '80px'}}>
      <img className="banner" />
      <img className="profile-picture" alt="pfp"/>
      <div className="profile-header">
        <div className="profile-name">
          Tushar
        </div>
        {/*<button className="connect-button">Connect</button>*/}
      </div>
      <div className="profile-container">
        <div className="profile-information">
          <div>
            <div>Experience</div>
            <ul>
              <li> Example place 1 </li>
              <li> Example place 2 </li>
            </ul>
          </div>
          <div>Education</div>
          <ul>
            <li> Example school 1 </li>
            <li> Example school 2 </li>
          </ul>
        </div>
        <div className="similar-profiles">
          <div>Similar profiles</div>
          {suggestions.map(profile => {
            return <div>{profile}</div>
          })}
        </div>
      </div>
    </div>
  )
}
