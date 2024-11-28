import React from "react";
import defaultPic from "../assets/default.jpg";

export default function ProfileCard({ name, picture, role = null }) {
  return (
    <div className="card">
      <img className="card-image" src={defaultPic}></img>
      <div className="card-description">{name}</div>
    </div>
  );
}
