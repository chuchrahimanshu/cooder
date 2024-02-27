import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { FcBusinessContact, FcNews, FcSettings } from "react-icons/fc";

const EditProfileLayout = () => {
  // Hooks Configuration
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="edit-profile">
      <section className="edit-profile__header">
        <p className="edit-profile__header-text">Edit Profile</p>
      </section>
      <section className="edit-profile__sections body-format">
        <section className="edit-profile__menu">
          <img
            src={user.cover}
            alt="User Cover"
            className="edit-profile__menu-cover"
          />
          <img
            src={user.avatar}
            alt="User Avatar"
            className="edit-profile__menu-avatar"
          />
          <section className="edit-profile__menu-links">
            <Link
              to={`/profile/${user.username}/edit/personal`}
              className="edit-profile__menu-link">
              <FcBusinessContact className="edit-profile__menu-link--icon" />
              <p className="edit-profile__menu-link--text">Personal Details</p>
            </Link>
            <Link
              to={`/profile/${user.username}/edit/bio-about`}
              className="edit-profile__menu-link">
              <FcNews className="edit-profile__menu-link--icon" />
              <p className="edit-profile__menu-link--text">Bio and About</p>
            </Link>
            <Link
              to={`/profile/${user.username}/edit/account`}
              className="edit-profile__menu-link">
              <FcSettings className="edit-profile__menu-link--icon" />
              <p className="edit-profile__menu-link--text">Account Settings</p>
            </Link>
          </section>
        </section>
        <section className="edit-profile__form">
          <Outlet />
        </section>
      </section>
    </div>
  );
};

export { EditProfileLayout };
