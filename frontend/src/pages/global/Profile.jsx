// Import Section
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  // Hooks Configuration
  const { user } = useSelector((state) => state.auth);

  // JSX Component Return Section
  return (
    <div className="profile">
      <p className="form__text-primary">First Name = {user.firstName}</p>
      <p className="form__text-primary">Last Name = {user.lastName}</p>
      <p className="form__text-primary">Username = {user.username}</p>
      <p className="form__text-primary">Email = {user.email}</p>
      <Link to={`/profile/${user.username}/edit/personal`}>Edit Profile</Link>
    </div>
  );
};

export { Profile };
