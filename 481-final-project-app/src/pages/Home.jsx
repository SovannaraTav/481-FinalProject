import React from "react";
import ProfileCard from "../components/ProfileCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const profile_list = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Ethan",
    "Fiona",
    "George",
    "Hannah",
    "Isaac",
    "Julia",
  ];
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="title">Make Connections</div>
      <div className="horizontal stacked-block">
        <input type="text" placeholder="Enter a name..." className="search" />
        <input type="radio" id="alumni" name="people" value="alumni" />
        <label for="alumni">Alumni</label>
        <input type="radio" id="students" name="people" value="students" />
        <label for="students">Students</label>
      </div>
      <div className="horizontal">
        <div className="filter">
          <div>Filters</div>
          <input
            type="checkbox"
            id="placeholder"
            name="placeholder"
            value="placeholder"
          />
          <label for="placeholder">Placeholder</label>
          <br />
          <input
            type="checkbox"
            id="placeholder"
            name="placeholder"
            value="placeholder"
          />
          <label for="placeholder">Placeholder</label>
          <br />
          <input
            type="checkbox"
            id="placeholder"
            name="placeholder"
            value="placeholder"
          />
          <label for="placeholder">Placeholder</label>
          <br />
          <input
            type="checkbox"
            id="placeholder"
            name="placeholder"
            value="placeholder"
          />
          <label for="placeholder">Placeholder</label>
          <br />
          <input
            type="checkbox"
            id="placeholder"
            name="placeholder"
            value="placeholder"
          />
          <label for="placeholder">Placeholder</label>
          <br />
          <input
            type="checkbox"
            id="placeholder"
            name="placeholder"
            value="placeholder"
          />
          <label for="placeholder">Placeholder</label>
          <br />
          <input
            type="checkbox"
            id="placeholder"
            name="placeholder"
            value="placeholder"
          />
          <label for="placeholder">Placeholder</label>
          <br />
          <input
            type="checkbox"
            id="placeholder"
            name="placeholder"
            value="placeholder"
          />
          <label for="placeholder">Placeholder</label>
        </div>
        <div className="card-list">
          {profile_list.map((person) => {
            return (
              <div
                onClick={() => {
                  navigate(`/profile/${person}`);
                }}
              >
                <ProfileCard name={person}></ProfileCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
