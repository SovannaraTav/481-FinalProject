import React from 'react'

export default function Profile() {

  const suggestions =  ["Alice", "Bob", "Charlie", "David", "Eva"]

  return (
    <div>
      <img className="banner" />
      <img className="profile-picture" alt="pfp"/>
      <div className="profile-header">
        <div className="profile-name">
          Tushar Tumopoorani
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
