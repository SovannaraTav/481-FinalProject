import React from 'react'
import { useParams } from 'react-router-dom';

export default function Profile() {

  const suggestions =  ["Alice", "Bob", "Charlie", "David", "Eva"]
  const { name } = useParams();

  return (
    <div style={{marginTop: '80px'}}>
      <img className="banner" />
      <img className="profile-picture" alt="pfp"/>
      <div className="profile-header">
        <div className="profile-name">
          {name}
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
