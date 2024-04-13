// Import Section
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

// Import Utilities
import {
  FcApproval,
  FcBriefcase,
  FcCommandLine,
  FcGraduationCap,
  FcIdea,
  FcTimeline,
  FcLinux,
} from "react-icons/fc";
import { ToggleTheme } from "../components/global/ToggleTheme";

const EditProfileLayout = () => {
  // Hooks Configuration
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.global);

  useEffect(() => {
    if (user?.username !== params?.id) {
      navigate("/");
    }
  }, [user, params, navigate]);

  return (
    <div className={`edit-profile ${theme}`}>
      <section className="edit-profile__theme">
        <ToggleTheme />
      </section>
      <section className="edit-profile__header">
        <p className="edit-profile__header-text">Edit Profile</p>
        <Link className="edit-profile__header-btn" to={`/`}>
          ❌
        </Link>
      </section>
      <section className="edit-profile__sections">
        <section className={`edit-profile__menu ${theme}`}>
          <img
            src={user?.cover}
            alt="User Cover"
            className="edit-profile__menu-cover"
          />
          <img
            src={user?.avatar}
            alt="User Avatar"
            className="edit-profile__menu-avatar"
          />
          <section className="edit-profile__menu-links">
            <Link
              to={`/profile/${user?.username}`}
              className={`edit-profile__menu-link ${theme}`}>
              <FcLinux className="edit-profile__menu-link--icon" />
              <p className="edit-profile__menu-link--text">Personal Details</p>
            </Link>
            <Link
              to={`/profile/${user?.username}/coming-soon`}
              className={`edit-profile__menu-link ${theme}`}>
              <FcBriefcase className="edit-profile__menu-link--icon" />
              <p className="edit-profile__menu-link--text">
                Professional Details
              </p>
            </Link>
            <Link
              to={`/profile/${user?.username}/coming-soon`}
              className={`edit-profile__menu-link ${theme}`}>
              <FcGraduationCap className="edit-profile__menu-link--icon" />
              <p className="edit-profile__menu-link--text">Education</p>
            </Link>
            <Link
              to={`/profile/${user?.username}/coming-soon`}
              className={`edit-profile__menu-link ${theme}`}>
              <FcTimeline className="edit-profile__menu-link--icon" />
              <p className="edit-profile__menu-link--text">Experience</p>
            </Link>
            <Link
              to={`/profile/${user?.username}/coming-soon`}
              className={`edit-profile__menu-link ${theme}`}>
              <FcIdea className="edit-profile__menu-link--icon" />
              <p className="edit-profile__menu-link--text">Projects</p>
            </Link>
            <Link
              to={`/profile/${user?.username}/coming-soon`}
              className={`edit-profile__menu-link ${theme}`}>
              <FcApproval className="edit-profile__menu-link--icon" />
              <p className="edit-profile__menu-link--text">Certifications</p>
            </Link>
            <Link
              to={`/profile/${user?.username}/coming-soon`}
              className={`edit-profile__menu-link ${theme}`}>
              <FcCommandLine className="edit-profile__menu-link--icon" />
              <p className="edit-profile__menu-link--text">
                Developer Profiles
              </p>
            </Link>
            {/* <Link
              to={`/profile/${user?.username}/edit/profiles/social`}
              className={`edit-profile__menu-link ${theme}`}>
              <FcGlobe className="edit-profile__menu-link--icon" />
              <p className="edit-profile__menu-link--text">Social Profiles</p>
            </Link>
            <Link
              to={`/profile/${user?.username}/edit/websites`}
              className={`edit-profile__menu-link ${theme}`}>
              <FcLink className="edit-profile__menu-link--icon" />
              <p className="edit-profile__menu-link--text">Personal Websites</p>
            </Link> */}
            {/* <Link
              to={`/profile/${user?.username}/edit/account`}
              className={`edit-profile__menu-link ${theme}`}>
              <FcSettings className="edit-profile__menu-link--icon" />
              <p className="edit-profile__menu-link--text">Account Settings</p>
            </Link> */}
          </section>
        </section>
        <section className={`edit-profile__form ${theme}`}>
          <Outlet />
        </section>
      </section>
    </div>
  );
};

export { EditProfileLayout };
