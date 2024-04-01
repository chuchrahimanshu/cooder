import React, { useState } from "react";
import { useSelector } from "react-redux";

const EditProfessionalDetails = () => {
  // Hooks Configuration
  const { theme } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  // State Handling Section
  const initialState = {};
  const [formData, setFormData] = useState(initialState);
  const [toggleDisabled, setToggleDisabled] = useState(initialState);

  // Form Handling Section
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleFormSubmit = (event) => {};
  return (
    <div className="profile-form__container">
      <h2 className={`profile-form__heading ${theme}`}>Professional Details</h2>
      <form className="profile-form" onSubmit={handleFormSubmit}>
        <section className="profile-form__section-sub">
          <label
            className={`profile-form__label ${theme}`}
            htmlFor="profile-form__bio">
            Bio
          </label>
          <input
            type="text"
            id="profile-form__bio"
            className={`profile-form__input--full ${theme}`}
            name="bio"
            value={formData?.bio}
            onChange={handleInputChange}
            placeholder="Enter your Bio"
            required
          />
        </section>
        <section className="profile-form__section-sub">
          <label
            className={`profile-form__label ${theme}`}
            htmlFor="profile-form__about">
            About
          </label>
          <textarea
            name="about"
            id=""
            cols="20"
            rows="6"
            spellCheck="false"
            className={`profile-form__input--full ${theme}`}
          />
        </section>
        <section className="profile-form__section">
          <section className="profile-form__section-sub">
            <label
              className={`profile-form__label ${theme}`}
              htmlFor="profile-form__techStack">
              Working Tech. Stack
            </label>
            <input
              type="text"
              id="profile-form__techStack"
              className={`profile-form__input ${theme}`}
              name="techStack"
              value={formData.techStack}
              onChange={handleInputChange}
              placeholder="Enter your Tech Stack"
              required
            />
          </section>
          <section className="profile-form__section-sub">
            <label
              className={`profile-form__label ${theme}`}
              htmlFor="profile-form__resume">
              Upload Resume
            </label>
            <input
              type="file"
              id="profile-form__resume"
              className={`profile-form__input ${theme}`}
              name="resume"
              onChange={handleInputChange}
              required
            />
          </section>
        </section>
        <button
          className={`profile-form__button ${theme}`}
          type="submit"
          disabled={toggleDisabled}>
          Update ✨
        </button>
      </form>
    </div>
  );
};

export { EditProfessionalDetails };
