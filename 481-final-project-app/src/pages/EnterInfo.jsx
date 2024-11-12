import React from 'react'
import "../styles/EnterInfo.css"

export default function EnterInfo() {
  return (
    <div className="enterInfoContainer">
      <div> 
        <label htmlFor="firstname"  className="label">First Name </label>
        <input type="text" id="firstname" name="firstname" value="FirstName" className="text-input" />

      </div>
      <div>
        <label htmlFor="lastname" className="label" >Last Name</label>
        <input type="text" id="lastname" name="lastname" value="lastname" className="text-input"/>
      </div>

      <h2>About</h2>
      <textarea 
        id="about" 
        name="about" 
        placeholder="Tell us about yourself..."
        className="textarea">
      </textarea>
      
      <h2>Education</h2>
      <div className="user-type-container">
        <input type="radio" id="seattle" name="schoolType" value="Seattle" />
        <label htmlFor="seattle" className="radio-label">University of Washington, Seattle</label>
        
        <input type="radio" id="bothell" name="schoolType" value="Bothell" />
        <label htmlFor="bothell" className="radio-label">University of Washington, Bothell</label>

        <input type="radio" id="tacoma" name="schoolType" value="Tacoma" />
        <label htmlFor="tacoma" className="radio-label">University of Washington, Tacoma</label>
      </div>
      
      <div className="graduation-section">
        <label htmlFor="grad-year" className="label">Estimated Graduation Year</label>
        <input type="date" id="grad-year" name="grad-year" className="date-input" />
      </div>

      <h2>Experience</h2>
      <div className="experience-section">
        <label htmlFor="company" className="label">Company</label>
        <input type="text" id="company" name="company" className="text-input" />
        
        <label htmlFor="position" className="label">Position</label>
        <input type="text" id="position" name="position" className="text-input" />

        <label htmlFor="description" className="label">Job Description</label>
        <textarea 
          id="description" 
          name="description" 
          placeholder="Describe your role" 
          className="textarea">
        </textarea>

        <label htmlFor="start-date" className="label">Start Date</label>
        <input type="date" id="start-year" name="start-year" className="date-input" />

        <label htmlFor="end-date" className="label">End Date</label>
        <input type="date" id="end-year" name="end-year" className="date-input" />
      </div>

      <h2>Interests</h2>
      <div className="interests-section">
        <label htmlFor="interests" className="interests-label">Select Your Interest</label>
        <select id="interests" name="interests" className="select-input">
          <option value="">--Choose an interest--</option>
          <option value="software-engineering">Software Engineering</option>
          <option value="law">Law</option>
          <option value="project-management">Project Management</option>
          <option value="biology">Biology</option>
          <option value="data-science">Data Science</option>
          <option value="business">Business</option>
          <option value="psychology">Psychology</option>
          <option value="graphic-design">Graphic Design</option>
          <option value="finance">Finance</option>
          <option value="environmental-science">Environmental Science</option>
          <option value="education">Education</option>
          <option value="marketing">Marketing</option>
          <option value="medicine">Medicine</option>
          <option value="engineering">Engineering</option>
          <option value="politics">Politics</option>
          <option value="architecture">Architecture</option>
        </select>
      </div>
    </div>
  )
}
