import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EnterInfo.css";
import SupabaseDatabase from "../classes/SupabaseDatabase";
import supabase from "../../supabaseConfig.js";
import Account from "../classes/Account.js";
import Alumni from "../classes/UWAlumni.js"
import Skill from "../classes/Skill.js";
import Interest from "../classes/Interest.js";
import UWStudent from "../classes/UWStudent.js";
import Experience from "../classes/Experience.js";
import SupabaseAuthentication from '../classes/SupabaseAuthentication';
import SupabaseStorage from '../classes/SupabaseStorage';

/*
* EnterInfo.jsx
* React component representing the page where users can enter their information
* after a successful sign-up. The Info page also allows users to update their profile
* after the edit buttion is clicked in the profile page. 
*/

export default function EnterInfo() {

  // Initialize SupabaseDatabase and SupabaseAuthentication
  const database = new SupabaseDatabase();
  const auth = new SupabaseAuthentication();
  const storage = new SupabaseStorage("profile_pictures");
  const navigate = useNavigate();

  // Initialize state variables
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    about: "",
    education: "",
    gradDate: "",
    profilePic: "",
    company: "",
    jobTitle: "",
    jobType: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    userType: "",
    studentMajor: "",
    currentField: "",
    currentCompany: "",
    currentJobTitle: "",
    experienceField: "",
    interests: [],
    skills: [],
  });

  // Handles input changes for both single-value and multi-select fields
  const handleChange = (event) => {
    const { name, value, type, options, files } = event.target;
    if (type === "select-multiple") {
      // For multi-select fields, gather selected options
      const values = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: values,
      }));
    } else if (type === "file") {
      const file = files[0];
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: file,
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

  };

// Handles form submission and updates user information accordingly
  function handleSubmit(event) {
    event.preventDefault();
    let user = "";
    auth.retrieveUser().then(fetchedUser => {
      //current user
      user = fetchedUser;

      storage.uploadFileToBucket(inputs.profilePic.name, inputs.profilePic).
        then(uploadResult => {
          inputs.profilePic = uploadResult.data.fullPath;
          //create and insert account information
          const account = new Account(
            user.id,
            inputs.firstName,
            inputs.lastName,
            inputs.profilePic,
            inputs.about,
            inputs.userType,
            []
          );
          // Testing/debugging code
          // console.log("account", account);

          const accountResult =
            database.createRecordToTable("accounts", account.toObject());
        }).then(() => {

        
       if(inputs.userType === "Alumni") {
        //create and insert alumni information
        const alumni = new Alumni(
          user.id,
          inputs.firstName,
          inputs.lastName,
          inputs.profilePic,
          inputs.about,
          inputs.currentJobTitle,
          inputs.currentField,
          inputs.currentCompany
        )

        const alumniResult = database.createRecordToTable(
          "uw_alumni",
          alumni.toObject()
        ).then(result => {
          //create and insert skill information
          for(let i = 0; i < inputs.skills.length; i++) {
            const skills = new Skill(
              "",
              user.id,
              inputs.skills[i]
            );
            const skillResult = database.createRecordToTable(
              "skills",
              skills.toObject()
            );
          }

          //create and insert experience information
          const experience = new Experience(
            "", 
            user.id,
            inputs.jobTitle,
            inputs.jobType,
            inputs.experienceField,
            inputs.company,
            inputs.location,
            inputs.startDate,
            inputs.endDate,
            inputs.description
          )

          const experienceResult = database.createRecordToTable(
            "experiences",
            experience.toObject()
          )
        });
      }

      if(inputs.userType === "Student") {
        //create and insert student information
        const student = new UWStudent(
          user.id,
          inputs.firstName,
          inputs.lastName,
          inputs.profilePic,
          inputs.about,
          inputs.studentMajor
        )
      
        const studentResult = database.createRecordToTable(
          "uw_students",
          student.toObject()
        ).then(result => {
          //create and insert interest information
          for(let i = 0; i < inputs.interests.length; i++) {
            const interest = new Interest(
              "",
              user.id,
              "Field",
              inputs.interests[i]
            );
            const interestResult = database.createRecordToTable(
              "interests",
              interest.toObject()
            );

            // Testing/debugging code
            // console.log("interest", interest)
            // console.log("interest result", interestResult);
          }
        });
      }
    });
  });

    navigate("../home");
  }

  // Render the form
  return (
    <div className="enterInfoContainer">
      <h2 className="enterInfoHeader" style={{ textAlign: "center" }}> Enter Information </h2>
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

        {/* Conditionally Render Student Fields */}
        {inputs.userType === "Student" && (
          <div className="student-details">
            <div>
              <label htmlFor="studentMajor" className="label">
                Student Major
              </label>
              <input
                type="text"
                id="studentMajor"
                name="studentMajor"
                className="text-input"
                placeholder="Enter your major"
                value={inputs.studentMajor || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* Conditionally Render Alumni Fields (Current Field) */}
        {inputs.userType === "Alumni" && (
          <div>
            <label htmlFor="currentField" className="label">
              Current Field
            </label>
            <input
              type="text"
              id="currentField"
              name="currentField"
              className="text-input"
              placeholder="Enter Current Field"
              value={inputs.currentField}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Conditionally Render Alumni Fields (Current Job Title) */}
        {inputs.userType === "Alumni" && (
          <div>
            <label htmlFor="currentJobTitle" className="label">
              Current Job Title
            </label>
            <input
              type="text"
              id="currentJobTitle"
              name="currentJobTitle"
              className="text-input"
              placeholder="Enter Current Job Title"
              value={inputs.currentJobTitle}
              onChange={handleChange}
            />
          </div>
        )}


        {/* Conditionally Render Alumni Fields (Current Company) */}
        {inputs.userType === "Alumni" && (
          <div>
            <label htmlFor="currentCompany" className="label">
              Current Company
            </label>
            <input
              type="text"
              id="currentCompany"
              name="currentCompany"
              className="text-input"
              placeholder="Enter Current Company"
              value={inputs.currentCompany}
              onChange={handleChange}
            />
          </div>
        )}

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

        {/* Profile Picture */}
        <div>
          <label for="myfile">Select a profile picture: </label>
          <input
            type="file" id="profilePic" name="profilePic" accept="image/jpeg"
            max={1} onChange={handleChange} className="file-input"/>
        </div>

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

        {/* Graduation Date */}
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
        {inputs.userType === "Alumni" && (

          <div>
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

              <label htmlFor="jobTitle" className="label">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                className="text-input"
                value={inputs.jobTitle}
                onChange={handleChange}
              />

              <label htmlFor="experienceField" className="label">
                Field
              </label>
              <input
                type="text"
                id="experienceField"
                name="experienceField"
                className="text-input"
                value={inputs.experienceField}
                onChange={handleChange}
              />

              <label htmlFor="location" className="label">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="text-input"
                value={inputs.location}
                onChange={handleChange}
              />

            <div>
              <input
                type="radio"
                id="partTimeType"
                name="jobType"
                value="Part-time"
                checked={inputs.jobType === "Part-time"}
                onChange={handleChange}
              />
              <label htmlFor="partTimeType" className="radio-label">
                Part-Time
              </label>

              <input
                type="radio"
                id="fullTimeType"
                name="jobType"
                value="Full-time"
                checked={inputs.jobType === "Full-time"}
                onChange={handleChange}
              />
              <label htmlFor="fullTimeType" className="radio-label">
                Full-Time
              </label>

              <input
                type="radio"
                id="internshipType"
                name="jobType"
                value="Internship"
                checked={inputs.jobType === "Internship"}
                onChange={handleChange}
              />
              <label htmlFor="internshipType" className="radio-label">
                Internship
              </label>
            </div>

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
            </div>
          </div>
        )}

          {/* Interests */}
          {/* Conditionally render Interests section for Students */}
          {inputs.userType === "Student" && (
            <div>
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
            </div>
          )}

          {/* Skills */}
          {/* Conditionally render Skills section for Alumni */}
          {inputs.userType === "Alumni" && (
          <div>
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
          </div>
          )}
          <div>
            <input type="submit" value="Sign Up"></input>
          </div>
      </form>
    </div>
  );
}