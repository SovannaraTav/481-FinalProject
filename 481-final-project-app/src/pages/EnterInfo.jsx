import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EnterInfo.css";
import SupabaseDatabase from "../classes/SupabaseDatabase";
export default function EnterInfo() {
  const database = new SupabaseDatabase();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    about: "",
    education: "",
    gradDate: "",
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
    userType: "",
    interests: [],
    skills: [],
  });

  // Handles input changes for both single-value and multi-select fields
  const handleChange = (event) => {
    const { name, value, type, options } = event.target;

    if (type === "select-multiple") {
      // For multi-select fields, gather selected options
      const values = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: values,
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
    console.log(inputs);
  };

  function handleSubmit(event) {
    event.preventDefault();
    // alert(
    //   `First Name: ${inputs.firstName}` +
    //     `Last Name: ${inputs.lastName}` +
    //     `About: ${inputs.about}` +
    //     `Educatioon: ${inputs.education}` +
    //     `Grad Date: ${inputs.gradDate}` +
    //     `Company: ${inputs.company}` +
    //     `Position: ${inputs.position}` +
    //     `Description: ${inputs.description}` +
    //     `Start Date: ${inputs.startDate}` +
    //     `End date: ${inputs.endDate}` +
    //     `User Type: ${inputs.userType}` +
    //     `Interests: ${inputs.interests}` +
    //     `Skills: ${inputs.skills}`
    // );

    const accountObject = {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      profilePicture: "IMAGE 1",
      bio: inputs.about,
      account_type: inputs.userType,
    };

    /*
       Major
       field


    */

    // const alumniObject = {
    //   currentJobTitle: inputs.position,
    //   currentField: "Software Eng",
    //   currentCompany: inputs.company,
    // };

    const accountResult = database.createRecordToTable(
      "accounts",
      accountObject
    );

    // const alumniResult = database.createRecordToTable(
    //   "uw_alumni",
    //   alumniObject
    // );

    navigate("../home");
  }

  return (
    <div className="enterInfoContainer">
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="text-input"
            placeholder="Enter First Name"
            value={inputs.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="text-input"
            placeholder="Enter Last Name"
            value={inputs.lastName}
            onChange={handleChange}
          />
        </div>

        {/* User Type */}
        <div>
          <input
            type="radio"
            id="alumniType"
            name="userType"
            value="Alumni"
            checked={inputs.userType === "Alumni"}
            onChange={handleChange}
          />
          <label htmlFor="alumniType" className="radio-label">
            Alumni
          </label>

          <input
            type="radio"
            id="studentType"
            name="userType"
            value="Student"
            checked={inputs.userType === "Student"}
            onChange={handleChange}
          />
          <label htmlFor="studentType" className="radio-label">
            Student
          </label>
        </div>

        {/* About */}
        <h2>About</h2>
        <textarea
          id="about"
          name="about"
          placeholder="Tell us about yourself..."
          className="textarea"
          value={inputs.about}
          onChange={handleChange}
        ></textarea>

        {/* Education */}
        <h2>Education</h2>
        <div className="user-type-container">
          <input
            type="radio"
            id="seattle"
            name="education"
            value="University of Washington, Seattle"
            checked={inputs.education === "University of Washington, Seattle"}
            onChange={handleChange}
          />
          <label htmlFor="seattle" className="radio-label">
            University of Washington, Seattle
          </label>

          <input
            type="radio"
            id="bothell"
            name="education"
            value="University of Washington, Bothell"
            checked={inputs.education === "University of Washington, Bothell"}
            onChange={handleChange}
          />
          <label htmlFor="bothell" className="radio-label">
            University of Washington, Bothell
          </label>

          <input
            type="radio"
            id="tacoma"
            name="education"
            value="University of Washington, Tacoma"
            checked={inputs.education === "University of Washington, Tacoma"}
            onChange={handleChange}
          />
          <label htmlFor="tacoma" className="radio-label">
            University of Washington, Tacoma
          </label>
        </div>

        <div>
          <label htmlFor="gradDate" className="label">
            Graduation Date
          </label>
          <input
            type="date"
            id="gradDate"
            name="gradDate"
            className="date-input"
            value={inputs.gradDate}
            onChange={handleChange}
          />
        </div>

        {/* Experience */}
        <h2>Experience</h2>
        <div className="experience-section">
          <label htmlFor="company" className="label">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="text-input"
            value={inputs.company}
            onChange={handleChange}
          />

          <label htmlFor="position" className="label">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            className="text-input"
            value={inputs.position}
            onChange={handleChange}
          />

          <label htmlFor="description" className="label">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your role"
            className="textarea"
            value={inputs.description}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="startDate" className="label">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="date-input"
            value={inputs.startDate}
            onChange={handleChange}
          />

          <div>
            <label htmlFor="endDate" className="label">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="date-input"
              value={inputs.endDate}
              onChange={handleChange}
            />
          </div>

          {/* Interests */}
          <h2>Interests</h2>
          <div className="interests-section">
            <label htmlFor="interests" className="interests-label">
              Choose Your Interests
            </label>
            <select
              id="interests"
              name="interests"
              className="select-input"
              value={inputs.interests}
              onChange={handleChange}
              multiple
            >
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
              <option value="environmental-science">
                Environmental Science
              </option>
              <option value="education">Education</option>
              <option value="marketing">Marketing</option>
              <option value="medicine">Medicine</option>
              <option value="engineering">Engineering</option>
              <option value="politics">Politics</option>
              <option value="architecture">Architecture</option>
            </select>
          </div>

          {/* Skills */}
          <h2>Skills</h2>
          <div className="skills-section">
            <label htmlFor="skills" className="skills-label">
              Choose Your Skills
            </label>
            <select
              id="skills"
              name="skills"
              className="select-input"
              value={inputs.skills}
              onChange={handleChange}
              multiple
            >
              <option value="">--Choose a skill--</option>
              <option value="leadership">Leadership</option>
              <option value="team-management">Team Management</option>
              <option value="problem-solving">Problem Solving</option>
              <option value="communication">Communication</option>
              <option value="time-management">Time Management</option>
              <option value="critical-thinking">Critical Thinking</option>
              <option value="collaboration">Collaboration</option>
              <option value="creativity">Creativity</option>
              <option value="adaptability">Adaptability</option>
              <option value="conflict-resolution">Conflict Resolution</option>
              <option value="decision-making">Decision Making</option>
              <option value="project-management">Project Management</option>
              <option value="organizational-skills">
                Organizational Skills
              </option>
              <option value="negotiation">Negotiation</option>
              <option value="empathy">Empathy</option>
            </select>
          </div>
          <div>
            <input type="submit" value="Sign Up"></input>
          </div>
        </div>
      </form>
    </div>
  );
}
